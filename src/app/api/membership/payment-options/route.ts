import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseMembershipPaymentSettings } from "@/lib/membership-payment";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const record = await db.siteSetting.findUnique({ where: { key: "membership_payment_options" }, select: { value: true } });
    const settings = parseMembershipPaymentSettings(record?.value);
    if (!settings || Number(settings.fixedAmount) <= 0) return NextResponse.json({ configured: false, settings: null });
    const publicSettings = {
      fixedAmount: settings.fixedAmount,
      bank: settings.bank.enabled ? settings.bank : null,
      wallet: settings.wallet.enabled ? settings.wallet : null,
    };
    return NextResponse.json({ configured: true, settings: publicSettings }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ configured: false, settings: null }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
