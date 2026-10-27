import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { membershipSchema } from "@/lib/validation";
import { parseMembershipPaymentSettings } from "@/lib/membership-payment";

export async function POST(request: Request) {
  const form = await request.formData();
  const screenshot = form.get("paymentScreenshot");
  const values = Object.fromEntries([...form.entries()].filter(([key]) => key !== "paymentScreenshot"));
  const parsed = membershipSchema.safeParse(values);
  if (!parsed.success) return NextResponse.json({ error: "Please review the required fields." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  if (!(screenshot instanceof File) || screenshot.size === 0) return NextResponse.json({ error: "Upload a payment screenshot." }, { status: 400 });
  if (screenshot.size > 5 * 1024 * 1024) return NextResponse.json({ error: "The payment screenshot must be 5 MB or smaller." }, { status: 413 });
  const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!acceptedTypes.has(screenshot.type)) return NextResponse.json({ error: "Upload a JPG, PNG, or WebP screenshot." }, { status: 400 });
  const screenshotBytes = new Uint8Array(await screenshot.arrayBuffer());
  const isPng = screenshot.type === "image/png" && screenshotBytes.length >= 8 && screenshotBytes[0] === 0x89 && screenshotBytes[1] === 0x50 && screenshotBytes[2] === 0x4e && screenshotBytes[3] === 0x47;
  const isJpeg = screenshot.type === "image/jpeg" && screenshotBytes.length >= 3 && screenshotBytes[0] === 0xff && screenshotBytes[1] === 0xd8 && screenshotBytes[2] === 0xff;
  const isWebp = screenshot.type === "image/webp" && screenshotBytes.length >= 12 && String.fromCharCode(...screenshotBytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...screenshotBytes.slice(8, 12)) === "WEBP";
  if (!isPng && !isJpeg && !isWebp) return NextResponse.json({ error: "The uploaded file is not a valid JPG, PNG, or WebP image." }, { status: 400 });
  const data = parsed.data;
  try {
    const paymentRecord = await db.siteSetting.findUnique({ where: { key: "membership_payment_options" }, select: { value: true } });
    const paymentSettings = parseMembershipPaymentSettings(paymentRecord?.value);
    const paymentOption = paymentSettings?.[data.paymentMethod];
    if (!paymentSettings || Number(paymentSettings.fixedAmount) <= 0 || !paymentOption?.enabled) {
      return NextResponse.json({ error: "The selected payment method is not currently available. Refresh the form and try again." }, { status: 400 });
    }
    const duplicate = await db.membershipApplication.findFirst({ where: { email: data.email.toLowerCase(), status: { in: ["PENDING", "REVIEWING", "APPROVED"] } } });
    if (duplicate) return NextResponse.json({ error: "An application with this email is already under review." }, { status: 409 });
    const application = await db.membershipApplication.create({ data: {
      applicationNo: `YAP-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`,
      name: data.name, email: data.email.toLowerCase(), phone: data.phone, city: data.city, province: data.province,
      education: data.education, profession: data.profession, interests: data.interests?.split(",").map(s => s.trim()).filter(Boolean),
      skills: data.skills, category: data.category, motivation: data.motivation,
      paymentMethod: data.paymentMethod, bankName: paymentOption.provider, senderAccountName: data.senderAccountName,
      transactionReference: data.transactionReference, amountPaid: paymentSettings.fixedAmount,
      paymentScreenshot: screenshotBytes, paymentScreenshotMime: screenshot.type,
    }, select: { applicationNo: true } });
    return NextResponse.json({ success: true, applicationNo: application.applicationNo }, { status: 201 });
  } catch { return NextResponse.json({ error: "Applications are temporarily unavailable." }, { status: 503 }); }
}
