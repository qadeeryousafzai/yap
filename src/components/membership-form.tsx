"use client";

import { useEffect, useState } from "react";
import type { MembershipPaymentSettings } from "@/lib/membership-payment";

const input = "mt-2 w-full rounded-xl border border-[#dfe7df] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#16834a] focus:ring-2 focus:ring-[#16834a]/15";
type PublicSettings = { fixedAmount: string; bank: MembershipPaymentSettings["bank"] | null; wallet: MembershipPaymentSettings["wallet"] | null };

export function MembershipForm() {
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    fetch("/api/membership/payment-options", { cache: "no-store" })
      .then(async (response) => response.ok ? response.json() : null)
      .then((data) => {
        const available = data?.configured && data.settings ? data.settings as PublicSettings : null;
        setSettings(available);
        setPaymentMethod(available?.bank ? "bank" : available?.wallet ? "wallet" : "");
      })
      .catch(() => setSettings(null))
      .finally(() => setSettingsLoading(false));
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setResult("");
    try {
      const response = await fetch("/api/membership", { method: "POST", body: new FormData(form) });
      const data = await response.json();
      if (response.ok) {
        setResult(`Thanks for applying. Your reference number is ${data.applicationNo}.`);
        form.reset();
        setPaymentMethod(settings?.bank ? "bank" : settings?.wallet ? "wallet" : "");
      } else {
        setResult(data.error ?? "Please review the form and try again.");
      }
    } catch {
      setResult("Your application could not be sent. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const selectedPayment = paymentMethod ? settings?.[paymentMethod as "bank" | "wallet"] : null;

  return <form onSubmit={submit} encType="multipart/form-data" className="space-y-7">
    {result && <p role="status" className="rounded-xl bg-[#edf5e9] p-4 text-sm font-semibold text-[#235b3b]">{result}</p>}
    <section aria-labelledby="membership-details-heading">
      <h2 id="membership-details-heading" className="text-xl font-extrabold tracking-tight">Your details</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
        <Field label="Phone number" name="phone" type="tel" required />
        <Field label="City" name="city" required />
        <Field label="Province / territory" name="province" required />
        <label className="block text-sm font-bold">Membership category *<select name="category" required className={input}><option value="">Select a category</option><option>Youth member</option><option>Volunteer</option><option>Professional member</option></select></label>
        <Field label="Education" name="education" />
        <Field label="Profession" name="profession" />
      </div>
      <div className="mt-5"><Field label="Areas of interest (comma-separated)" name="interests" /></div>
      <label className="mt-5 block text-sm font-bold">Skills and experience<textarea name="skills" rows={3} className={input} /></label>
      <label className="mt-5 block text-sm font-bold">Why would you like to join? *<textarea name="motivation" required minLength={20} rows={4} className={input} /></label>
    </section>

    <section aria-labelledby="payment-details-heading" className="rounded-2xl border border-[#dfe7df] bg-[#f7faf6] p-5 sm:p-6">
      <p className="eyebrow text-[#16834a]">Payment verification</p>
      <h2 id="payment-details-heading" className="mt-2 text-xl font-extrabold tracking-tight">Membership payment</h2>
      {settingsLoading ? <p className="mt-3 text-sm text-[#65736b]">Loading payment options…</p> : !settings ? <p className="mt-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">Payment options are not configured yet. Please contact YAP before submitting an application.</p> : <>
        <div className="mt-5 rounded-xl border border-[#dfe7df] bg-white p-4"><span className="text-xs font-bold uppercase tracking-wider text-[#819087]">Fixed membership fee</span><p className="mt-1 text-2xl font-extrabold text-[#123b2c]">PKR {Number(settings.fixedAmount).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>
        <label className="mt-5 block text-sm font-bold">Choose payment method *<select name="paymentMethod" required value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className={input}><option value="">Select how you paid</option>{settings.bank && <option value="bank">{settings.bank.label}</option>}{settings.wallet && <option value="wallet">{settings.wallet.label}</option>}</select></label>
        {selectedPayment && <div className="mt-4 rounded-xl border border-[#dfe7df] bg-white p-4 sm:p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-[#16834a]">Send PKR {Number(settings.fixedAmount).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to this account</p><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[150px_1fr]"><dt className="font-semibold text-[#819087]">{paymentMethod === "bank" ? "Bank" : "Wallet"}</dt><dd className="font-bold text-[#10241d]">{selectedPayment.provider}</dd><dt className="font-semibold text-[#819087]">Account holder</dt><dd className="font-bold text-[#10241d]">{selectedPayment.accountHolder}</dd><dt className="font-semibold text-[#819087]">Account / IBAN</dt><dd className="break-all font-bold text-[#10241d]">{selectedPayment.accountNumber}</dd>{selectedPayment.instructions && <><dt className="font-semibold text-[#819087]">Instructions</dt><dd className="whitespace-pre-wrap text-[#47564d]">{selectedPayment.instructions}</dd></>}</dl></div>}
        <div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Name on your sending account" name="senderAccountName" required /><Field label="Transaction / reference number" name="transactionReference" required /></div>
        <label className="mt-5 block text-sm font-bold">Payment screenshot *<input name="paymentScreenshot" type="file" accept="image/jpeg,image/png,image/webp" required className={`${input} file:mr-3 file:rounded-full file:border-0 file:bg-[#e8f4dd] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#12583b]`} /><span className="mt-2 block text-xs font-normal leading-5 text-[#748078]">JPG, PNG, or WebP; maximum 5 MB. Your receipt is visible only to authorized membership staff.</span></label>
      </>}
    </section>

    <label className="flex gap-3 text-xs leading-5 text-[#65736b]"><input type="checkbox" name="consent" required className="mt-1 accent-[#16834a]" />I agree to the membership terms and privacy policy and consent to YAP processing this information to review my application.</label>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button disabled={busy || settingsLoading || !settings} className="rounded-full bg-[#073d2c] px-7 py-4 text-sm font-extrabold text-white disabled:opacity-50">{busy ? "Submitting…" : "Submit application"}</button>
  </form>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-sm font-bold">{label}{required && " *"}<input name={name} type={type} required={required} className={input} /></label>;
}
