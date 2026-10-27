import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ applicationNo: string }> }) {
  const user = await requirePermission("membership");
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const { applicationNo } = await params;
  const application = await db.membershipApplication.findUnique({
    where: { applicationNo },
    select: { paymentScreenshot: true, paymentScreenshotMime: true },
  });
  if (!application?.paymentScreenshot || !application.paymentScreenshotMime) return NextResponse.json({ error: "Receipt not found." }, { status: 404 });

  return new Response(new Uint8Array(application.paymentScreenshot), {
    headers: {
      "Content-Type": application.paymentScreenshotMime,
      "Content-Disposition": 'inline; filename="payment-receipt"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
