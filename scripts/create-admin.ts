import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { stdin, stdout } from "node:process";
const db=new PrismaClient();
const ask=(prompt:string)=>new Promise<string>(resolve=>{stdout.write(prompt);stdin.resume();stdin.once("data",chunk=>{stdin.pause();resolve(String(chunk).trim())})});
async function main(){
  const name=await ask("Super Admin full name: ");
  const email=(await ask("Super Admin email: ")).toLowerCase();
  const password=await ask("Strong password (min. 14 characters): ");
  const valid=z.object({name:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(14).max(200)}).safeParse({name,email,password});
  if(!valid.success) throw new Error("Please enter a valid name, email, and password of at least 14 characters.");
  const passwordHash=await bcrypt.hash(password,12);
  await db.adminUser.upsert({where:{email},update:{name,passwordHash,role:RoleName.SUPER_ADMIN,active:true},create:{name,email,passwordHash,role:RoleName.SUPER_ADMIN}});
  console.log(`Super Admin provisioned for ${email}.`);
}
main().catch(error=>{console.error(error.message);process.exitCode=1}).finally(()=>db.$disconnect());
