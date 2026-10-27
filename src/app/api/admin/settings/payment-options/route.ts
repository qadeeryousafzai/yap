import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { membershipPaymentSettingsSchema } from "@/lib/membership-payment";

export async function GET() {
  const admin = await requirePermission("settings");
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const record = await db.siteSetting.findUnique({ where: { key: "membership_payment_options" }, select: { value: true } });
  return NextResponse.json({ settings: record?.value ?? null }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function PUT(request: Request) {
  const admin = await requirePermission("settings");
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const body: unknown = await request.json().catch(() => null);
  const parsed = membershipPaymentSettingsSchema.safeParse(body);
  if (!parsed.success || Number(parsed.data?.fixedAmount ?? 0) <= 0) {
    return NextResponse.json({ error: "Enter a valid fixed fee and complete details for every enabled payment method." }, { status: 400 });
  }

  try {
    await db.siteSetting.upsert({
      where: { key: "membership_payment_options" },
      update: { value: parsed.data },
      create: { key: "membership_payment_options", value: parsed.data },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Payment settings could not be saved." }, { status: 503 });
  }
}
