"use client";

import { useState } from "react";

export function AdminMediaUploadForm() {
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage("");
    setUploadedUrl("");
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) setMessage(result.error ?? "Upload failed.");
      else {
        setMessage("Image uploaded and ready to use.");
        setUploadedUrl(result.url);
        form.reset();
      }
    } catch {
      setMessage("Upload failed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} encType="multipart/form-data" className="mb-6 rounded-2xl border border-[#e7ece7] bg-white p-5">
    <h2 className="text-base font-extrabold">Upload from this device</h2>
    <p className="mt-1 text-xs text-[#819087]">JPG, PNG, or WebP up to 5 MB. Uploaded images can be selected in content forms.</p>
    <div className="mt-4 flex flex-wrap items-center gap-3"><input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className="min-w-0 flex-1 text-sm" /><button disabled={busy} className="rounded-xl bg-[#073d2c] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Uploading…" : "Upload image"}</button></div>
    {message && <p role="status" className="mt-3 text-sm font-semibold text-[#235b3b]">{message}</p>}
    {uploadedUrl && <p className="mt-1 break-all text-xs text-[#718078]">Image URL: {uploadedUrl}</p>}
  </form>;
}
