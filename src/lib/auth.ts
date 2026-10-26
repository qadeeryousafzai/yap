import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const COOKIE = "yap_admin_session";
const ttlMs = 1000 * 60 * 60 * 24 * 7;
const digest = (value: string) => createHash("sha256").update(value).digest("hex");

export async function signIn(email: string, password: string) {
  const user = await db.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user?.active || !(await bcrypt.compare(password, user.passwordHash))) return false;
  const token = randomBytes(32).toString("base64url");
  await db.adminSession.create({ data: { tokenHash: digest(token), userId: user.id, expiresAt: new Date(Date.now() + ttlMs) } });
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: ttlMs / 1000 });
  return true;
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await db.adminSession.deleteMany({ where: { tokenHash: digest(token) } });
  jar.delete(COOKIE);
}

export async function getAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await db.adminSession.findUnique({ where: { tokenHash: digest(token) }, include: { user: true } });
  if (!session || session.expiresAt < new Date() || !session.user.active) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email, role: session.user.role };
}

const permissions: Record<string, string[]> = {
  SUPER_ADMIN: ["*"], ADMIN: ["content", "applications", "events", "projects", "gallery", "blog", "settings"],
  EDITOR: ["content", "events", "projects", "gallery", "blog"], MEMBERSHIP: ["membership"], FINANCE: ["finance"], HR: ["careers"],
};
export async function requirePermission(permission: string) {
  const user = await getAdmin();
  if (!user || !(permissions[user.role]?.includes("*") || permissions[user.role]?.includes(permission))) return null;
  return user;
}
