import { RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { stdin, stdout } from "node:process";
import { db } from "@/lib/db";

const ask = (prompt: string) => new Promise<string>((resolve) => {
  stdout.write(prompt);
  stdin.resume();
  stdin.once("data", (chunk) => {
    stdin.pause();
    resolve(String(chunk).trim());
  });
});

function askPassword(prompt: string): Promise<string> {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    return Promise.reject(new Error("Run pnpm admin:create in an interactive terminal so the password can be hidden."));
  }
  return new Promise((resolve, reject) => {
    stdout.write(prompt);
    const wasRaw = stdin.isRaw;
    stdin.setRawMode(true);
    stdin.resume();
    let password = "";
    const restore = () => {
      stdin.removeListener("data", onData);
      stdin.setRawMode(wasRaw ?? false);
      stdin.pause();
      stdout.write("\n");
    };
    const onData = (chunk: Buffer) => {
      for (const char of chunk.toString("utf8")) {
        if (char === "\u0003") {
          restore();
          reject(new Error("Admin setup cancelled."));
          return;
        }
        if (char === "\r" || char === "\n") {
          restore();
          resolve(password);
          return;
        }
        if (char === "\u007f" || char === "\b") {
          if (password.length) {
            password = password.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }
        if (char >= " ") {
          password += char;
          stdout.write("*");
        }
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const name = await ask("Super Admin full name: ");
  const email = (await ask("Super Admin email: ")).toLowerCase();
  const password = await askPassword("Strong password (min. 14 characters; input hidden): ");
  const valid = z.object({ name: z.string().min(2).max(100), email: z.string().email(), password: z.string().min(14).max(200) }).safeParse({ name, email, password });
  if (!valid.success) throw new Error("Please enter a valid name, email, and password of at least 14 characters.");
  const passwordHash = await bcrypt.hash(password, 12);
  await db.adminUser.upsert({ where: { email }, update: { name, passwordHash, role: RoleName.SUPER_ADMIN, active: true }, create: { name, email, passwordHash, role: RoleName.SUPER_ADMIN } });
  console.log(`Super Admin provisioned for ${email}.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unable to create the administrator.";
  console.error(message);
  process.exitCode = 1;
}).finally(() => db.$disconnect());
