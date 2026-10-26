import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const contentTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };
const allowed = new Set(["ceo_about_image.jpg", "banner_01.jpeg", "banner_02.jpeg", "banner_03.jpeg", "Project_01.jpg", "ceo_dp_icon.png", "logo.png", "FAVICON.png", "facebook.svg", "instagram.svg", "linkedin.svg", "tiktok.svg", "whatsapp.svg", "youtube.svg", "gmail.svg", "phone.svg"]);
export async function GET(_request: Request, { params }: { params: Promise<{ asset: string[] }> }) {
  const { asset } = await params;
  if (asset.length !== 1 || !allowed.has(asset[0])) return new NextResponse("Not found", { status: 404 });
  const filePath = path.join(process.cwd(), "assets", asset[0]);
  try {
    const content = await readFile(filePath);
    return new NextResponse(content, { headers: { "Content-Type": contentTypes[path.extname(filePath)] ?? "application/octet-stream", "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800", "X-Content-Type-Options": "nosniff" } });
  } catch { return new NextResponse("Not found", { status: 404 }); }
}
