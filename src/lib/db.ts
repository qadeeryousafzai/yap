import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const adapter = (() => {
  if (!process.env.DATABASE_URL) return undefined;
  const connectionUrl = new URL(process.env.DATABASE_URL);
  connectionUrl.searchParams.set("connectionLimit", process.env.DB_CONNECTION_LIMIT ?? "1");
  return new PrismaMariaDb(connectionUrl.toString());
})();
export const db = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
