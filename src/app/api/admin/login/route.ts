import { NextResponse } from "next/server";
import { z } from "zod";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
    const bucket = Math.floor(Date.now() / 600000);
    const key = `${parsed.data.email.toLowerCase()}:${bucket}`;
    const attempts = await db.siteSetting.findUnique({ where: { key } });
    if (Number((attempts?.value as { count?: number } | undefined)?.count ?? 0) >= 10) return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
    const ok = await signIn(parsed.data.email, parsed.data.password);
    if (!ok) {
      await db.siteSetting.upsert({ where: { key }, update: { value: { count: Number((attempts?.value as { count?: number } | undefined)?.count ?? 0) + 1 } }, create: { key, value: { count: 1 } } });
      return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
    }
    await db.siteSetting.deleteMany({ where: { key } });
    return NextResponse.redirect(new URL("/admin", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin/login?error=1&reason=database", request.url), 303);
  }
}
