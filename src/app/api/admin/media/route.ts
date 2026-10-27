import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { readAdminImage } from "@/lib/uploaded-image";

export async function POST(request: Request) {
  const admin = await requirePermission("content");
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const form = await request.formData();
  const { image, error } = await readAdminImage(form.get("image"));
  if (error) return NextResponse.json({ error }, { status: 400 });
  if (!image) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });

  try {
    const id = randomUUID();
    const url = `/api/media/${id}`;
    await db.$transaction([
      db.mediaAsset.create({ data: { id, url, fileName: image.fileName, mimeType: image.mimeType, size: image.bytes.byteLength, data: image.bytes } }),
      db.activityLog.create({ data: { userId: admin.id, action: "UPLOAD", entity: "media", entityId: id } }),
    ]);
    return NextResponse.json({ success: true, url }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The image could not be saved." }, { status: 503 });
  }
}
