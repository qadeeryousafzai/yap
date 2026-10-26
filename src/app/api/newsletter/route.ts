import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = newsletterSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  try {
    await db.newsletterSubscriber.upsert({ where: { email: parsed.data.email.toLowerCase() }, update: {}, create: { email: parsed.data.email.toLowerCase() } });
    return NextResponse.redirect(new URL("/?subscribed=1", request.url), 303);
  } catch { return NextResponse.json({ error: "Subscription is temporarily unavailable." }, { status: 503 }); }
}
