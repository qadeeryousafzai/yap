import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const adapter = process.env.DATABASE_URL ? new PrismaMariaDb(process.env.DATABASE_URL) : undefined;
export const db = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
