"use client";

import { useState } from "react";
import { emptyMembershipPaymentSettings, type MembershipPaymentSettings } from "@/lib/membership-payment";

const input = "mt-1.5 w-full rounded-xl border border-[#dfe7df] bg-white px-4 py-3 text-sm outline-none focus:border-[#16834a] focus:ring-2 focus:ring-[#16834a]/15";

type OptionKey = "bank" | "wallet";
type OptionProps = { title: string; kind: OptionKey; value: MembershipPaymentSettings[OptionKey]; onChange: (value: MembershipPaymentSettings[OptionKey]) => void };

function PaymentOptionEditor({ title, kind, value, onChange }: OptionProps) {
  const set = (key: keyof typeof value, next: string | boolean) => onChange({ ...value, [key]: next });
  return <section className="rounded-2xl border border-[#e7ece7] bg-white p-5 sm:p-6">
    <label className="flex items-center justify-between gap-4"><span><b className="block text-base">{title}</b><small className="mt-1 block text-xs text-[#819087]">{kind === "bank" ? "Display organization bank transfer details" : "Display mobile or other wallet details"}</small></span><input type="checkbox" checked={value.enabled} onChange={(event) => set("enabled", event.target.checked)} className="h-5 w-5 accent-[#16834a]" aria-label={`Enable ${title}`} /></label>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold">Dropdown label<input className={input} value={value.label} onChange={(event) => set("label", event.target.value)} maxLength={80} required /></label>
      <label className="text-sm font-bold">{kind === "bank" ? "Bank name" : "Wallet provider"}<input className={input} value={value.provider} onChange={(event) => set("provider", event.target.value)} maxLength={120} required={value.enabled} placeholder={kind === "bank" ? "Bank name" : "JazzCash, Easypaisa, etc."} /></label>
      <label className="text-sm font-bold">Account holder<input className={input} value={value.accountHolder} onChange={(event) => set("accountHolder", event.target.value)} maxLength={120} required={value.enabled} /></label>
      <label className="text-sm font-bold">{kind === "bank" ? "Account number / IBAN" : "Wallet number / account"}<input className={input} value={value.accountNumber} onChange={(event) => set("accountNumber", event.target.value)} maxLength={120} required={value.enabled} /></label>
      <label className="text-sm font-bold sm:col-span-2">Optional instructions<textarea className={input} value={value.instructions} onChange={(event) => set("instructions", event.target.value)} maxLength={500} rows={2} placeholder="Optional payment instructions" /></label>
    </div>
  </section>;
}

export function AdminPaymentSettingsForm({ initialSettings }: { initialSettings: MembershipPaymentSettings | null }) {
  const [settings, setSettings] = useState<MembershipPaymentSettings>(initialSettings ?? emptyMembershipPaymentSettings);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/settings/payment-options", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      setMessage(response.ok ? "Payment instructions saved. The membership form will show the updated options." : data.error ?? "Could not save payment settings.");
    } catch {
      setMessage("Could not save settings. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={save} className="space-y-5">
    {message && <p role="status" className="rounded-xl bg-[#edf5e9] p-4 text-sm font-semibold text-[#235b3b]">{message}</p>}
    <section className="rounded-2xl border border-[#e7ece7] bg-white p-5 sm:p-6">
      <label className="block max-w-sm text-sm font-bold">Fixed membership fee (PKR)<input className={input} type="number" min="0.01" max="99999999.99" step="0.01" required value={settings.fixedAmount} onChange={(event) => setSettings({ ...settings, fixedAmount: event.target.value })} /></label>
      <p className="mt-2 text-xs leading-5 text-[#819087]">Applicants see this fee as read-only. The server uses this configured amount when saving their application.</p>
    </section>
    <PaymentOptionEditor title="Organization bank account" kind="bank" value={settings.bank} onChange={(bank) => setSettings({ ...settings, bank })} />
    <PaymentOptionEditor title="Other wallet" kind="wallet" value={settings.wallet} onChange={(wallet) => setSettings({ ...settings, wallet })} />
    <button disabled={busy} className="rounded-xl bg-[#073d2c] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">{busy ? "Saving…" : "Save payment settings"}</button>
  </form>;
}
