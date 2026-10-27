import { redirect } from "next/navigation";
import { AdminPaymentSettingsForm } from "@/components/admin-payment-settings-form";
import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseMembershipPaymentSettings } from "@/lib/membership-payment";

export const metadata = { title: "Payment settings | YAP Studio", robots: { index: false, follow: false } };

export default async function AdminSettingsPage() {
  const admin = await requirePermission("settings");
  if (!admin) redirect("/admin");

  let initialSettings = null;
  try {
    const record = await db.siteSetting.findUnique({ where: { key: "membership_payment_options" }, select: { value: true } });
    initialSettings = parseMembershipPaymentSettings(record?.value);
  } catch {
    // The form still allows first-time configuration if no payment setting exists.
  }

  return <main className="mx-auto max-w-4xl p-5 md:p-9">
    <p className="eyebrow text-[#16834a]">Admin configuration</p>
    <h1 className="mt-2 text-3xl font-extrabold tracking-[-.055em]">Membership payment settings</h1>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#819087]">Set the fixed membership fee and payment destinations. Enabled details are displayed on the public membership form. Verify all account information before saving.</p>
    <div className="mt-7"><AdminPaymentSettingsForm initialSettings={initialSettings} /></div>
  </main>;
}
