import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const media = await db.mediaAsset.findUnique({ where: { id }, select: { data: true, mimeType: true, fileName: true } });
    if (!media?.data || !["image/jpeg", "image/png", "image/webp"].includes(media.mimeType)) {
      return new NextResponse("Not found", { status: 404 });
    }
    return new Response(new Uint8Array(media.data), {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Disposition": `inline; filename="${media.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image unavailable." }, { status: 503 });
  }
}
