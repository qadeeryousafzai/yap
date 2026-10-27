import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { readAdminImage } from "@/lib/uploaded-image";
import { optionalImageUrl } from "@/lib/validation";

const schemas = {
  projects: z.object({ title: z.string().trim().min(3).max(160), description: z.string().trim().min(10).max(15000), location: z.string().max(160).optional(), status: z.enum(["PLANNED", "ONGOING", "COMPLETED", "ARCHIVED"]), imageUrl: optionalImageUrl }),
  events: z.object({ title: z.string().trim().min(3).max(160), description: z.string().trim().min(10).max(15000), category: z.string().trim().min(2).max(100), startsAt: z.string().min(1), venue: z.string().trim().min(2).max(200), city: z.string().trim().min(2).max(100), capacity: z.string().optional(), imageUrl: optionalImageUrl, status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]) }),
  team: z.object({ name: z.string().trim().min(2).max(120), designation: z.string().trim().min(2).max(120), department: z.string().max(120).optional(), biography: z.string().trim().min(5).max(15000), imageUrl: optionalImageUrl, category: z.string().max(100).optional() }),
  stories: z.object({ title: z.string().trim().min(3).max(180), excerpt: z.string().trim().min(10).max(1000), content: z.string().trim().min(10).max(30000), author: z.string().trim().min(2).max(120), imageUrl: optionalImageUrl, status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]) }),
  careers: z.object({ title: z.string().trim().min(3).max(160), department: z.string().trim().min(2).max(120), location: z.string().trim().min(2).max(160), employmentType: z.string().trim().min(2).max(80), description: z.string().trim().min(10).max(15000), requirements: z.string().trim().min(10).max(15000), responsibilities: z.string().trim().min(10).max(15000), deadline: z.string().optional(), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]) }),
};
const config = { projects: { permission: "projects" }, events: { permission: "events" }, team: { permission: "content" }, stories: { permission: "blog" }, careers: { permission: "careers" } } as const;
const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 150);

export async function POST(request: Request, { params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!(module in config)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const key = module as keyof typeof config;
  const user = await requirePermission(config[key].permission);
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const form = await request.formData();
  const { image, error: imageError } = await readAdminImage(form.get("image"));
  if (imageError) return NextResponse.json({ error: imageError }, { status: 400 });
  const formValues = Object.fromEntries([...form.entries()].filter(([name]) => name !== "image"));
  const parsed = schemas[key].safeParse(formValues);
  if (!parsed.success) return NextResponse.json({ error: "Some fields are missing or invalid." }, { status: 400 });
  const values = parsed.data as Record<string, string | undefined>;
  const slug = slugify(values.title ?? values.name ?? "");
  if (!slug) return NextResponse.json({ error: "Enter a valid title." }, { status: 400 });
  if (key === "events" && (!values.startsAt || Number.isNaN(new Date(values.startsAt).getTime()))) {
    return NextResponse.json({ error: "Choose a valid event date." }, { status: 400 });
  }
  if (key === "events" && values.capacity && (!Number.isInteger(Number(values.capacity)) || Number(values.capacity) < 1)) {
    return NextResponse.json({ error: "Enter a valid registration capacity." }, { status: 400 });
  }

  try {
    const recordId = await db.$transaction(async (tx) => {
      let imageUrl = values.imageUrl || null;
      if (image) {
        const mediaId = randomUUID();
        imageUrl = `/api/media/${mediaId}`;
        await tx.mediaAsset.create({ data: { id: mediaId, url: imageUrl, fileName: image.fileName, mimeType: image.mimeType, size: image.bytes.byteLength, altText: values.title ?? values.name ?? null, data: image.bytes } });
      }

      let createdId = "";
      if (key === "projects") {
        const record = await tx.project.create({ data: { title: values.title!, slug, description: values.description!, location: values.location || null, status: values.status as "PLANNED" | "ONGOING" | "COMPLETED" | "ARCHIVED", imageUrl } });
        createdId = record.id;
      } else if (key === "events") {
        const record = await tx.event.create({ data: { title: values.title!, slug, description: values.description!, category: values.category!, startsAt: new Date(values.startsAt!), venue: values.venue!, city: values.city!, capacity: values.capacity ? Number(values.capacity) : null, imageUrl, status: values.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
        createdId = record.id;
      } else if (key === "team") {
        const record = await tx.teamMember.create({ data: { name: values.name!, slug, designation: values.designation!, department: values.department || null, biography: values.biography!, imageUrl, category: values.category || "Leadership" } });
        createdId = record.id;
      } else if (key === "stories") {
        const record = await tx.blogPost.create({ data: { title: values.title!, slug, excerpt: values.excerpt!, content: values.content!, author: values.author!, imageUrl, status: values.status as "DRAFT" | "PUBLISHED" | "ARCHIVED", publishedAt: values.status === "PUBLISHED" ? new Date() : null } });
        createdId = record.id;
      } else {
        const record = await tx.career.create({ data: { title: values.title!, slug, department: values.department!, location: values.location!, employmentType: values.employmentType!, description: values.description!, requirements: values.requirements!, responsibilities: values.responsibilities!, deadline: values.deadline ? new Date(values.deadline) : null, status: values.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
        createdId = record.id;
      }
      await tx.activityLog.create({ data: { userId: user.id, action: "CREATE", entity: key, entityId: createdId } });
      return createdId;
    });

    const publicPath = { projects: "/projects", events: "/events", team: "/team", stories: "/stories", careers: "/careers" }[key];
    revalidatePath(publicPath);
    revalidatePath(`${publicPath}/${slug}`);
    revalidatePath("/");
    return NextResponse.json({ success: true, id: recordId, slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save this record. Check for a duplicate title or slug." }, { status: 409 });
  }
}
