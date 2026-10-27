export const maxAdminImageBytes = 5 * 1024 * 1024;

export async function readAdminImage(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return { image: null, error: null };
  if (value.size > maxAdminImageBytes) return { image: null, error: "Choose an image smaller than 5 MB." };

  const bytes = new Uint8Array(await value.arrayBuffer());
  const mimeType = value.type;
  const isPng = mimeType === "image/png" && bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  const isJpeg = mimeType === "image/jpeg" && bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isWebp = mimeType === "image/webp" && bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (!isPng && !isJpeg && !isWebp) return { image: null, error: "Upload a valid JPG, PNG, or WebP image." };

  const fileName = value.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-180) || "upload";
  return { image: { bytes, mimeType, fileName }, error: null };
}
