import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main(){
  const settings=[{key:"site_name",value:"Youth Association of Pakistan"},{key:"demo_content_notice",value:"Sample development content only. Replace with verified organizational information before publication."},{key:"contact_email",value:""}];
  for(const setting of settings) await db.siteSetting.upsert({where:{key:setting.key},update:{},create:setting});
  const sections=[{key:"hero",title:"Young energy. Lasting change.",subtitle:"A youth-led movement across Pakistan",sortOrder:0},{key:"about",title:"A generation ready to make a difference.",sortOrder:1},{key:"work",title:"Change grows in many ways.",sortOrder:2},{key:"projects",title:"The work is already growing.",sortOrder:3},{key:"join",title:"Big change begins with showing up.",sortOrder:4}];
  for(const section of sections) await db.homepageSection.upsert({where:{key:section.key},update:{},create:section});
  const category=await db.projectCategory.upsert({where:{slug:"community-development"},update:{},create:{name:"Community development",slug:"community-development"}});
  const projects=[{title:"Learning without limits (sample)",slug:"learning-without-limits-sample",description:"DEVELOPMENT DEMO: Replace with a verified project description before publishing.",status:"PLANNED" as const,categoryId:category.id},{title:"Youth shaping tomorrow (sample)",slug:"youth-shaping-tomorrow-sample",description:"DEVELOPMENT DEMO: Replace with verified objectives, outcomes, and beneficiary information.",status:"PLANNED" as const,categoryId:category.id}];
  for(const project of projects) await db.project.upsert({where:{slug:project.slug},update:{},create:project});
  await db.blogCategory.upsert({where:{slug:"updates"},update:{},create:{name:"Updates",slug:"updates"}});
}
main().finally(()=>db.$disconnect());
