import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  try {
    await db.contactMessage.create({ data: { name: parsed.data.name, email: parsed.data.email, subject: parsed.data.subject, message: parsed.data.message } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "We couldn't submit your message. Please try again later." }, { status: 503 }); }
}
