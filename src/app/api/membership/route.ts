import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { membershipSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = membershipSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: "Please review the required fields." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  const data = parsed.data;
  try {
    const duplicate = await db.membershipApplication.findFirst({ where: { email: data.email.toLowerCase(), status: { in: ["PENDING", "REVIEWING", "APPROVED"] } } });
    if (duplicate) return NextResponse.json({ error: "An application with this email is already under review." }, { status: 409 });
    const application = await db.membershipApplication.create({ data: {
      applicationNo: `YAP-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`,
      name: data.name, email: data.email.toLowerCase(), phone: data.phone, city: data.city, province: data.province,
      education: data.education, profession: data.profession, interests: data.interests?.split(",").map(s => s.trim()).filter(Boolean),
      skills: data.skills, category: data.category, motivation: data.motivation,
    }, select: { applicationNo: true } });
    return NextResponse.json({ success: true, applicationNo: application.applicationNo }, { status: 201 });
  } catch { return NextResponse.json({ error: "Applications are temporarily unavailable." }, { status: 503 }); }
}
