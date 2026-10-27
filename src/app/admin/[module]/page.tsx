import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowLeft, Plus } from "lucide-react";
import { AdminMediaUploadForm } from "@/components/admin-media-upload-form";

const configs: Record<string, { title: string; permission: string; model: string; columns: string[]; rows: () => Promise<Record<string, unknown>[]> }> = {
  projects: { title: "Projects", permission: "projects", model: "Project", columns: ["title", "status", "location", "createdAt"], rows: async () => db.project.findMany({ take: 100, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, status: true, location: true, createdAt: true } }) },
  events: { title: "Events", permission: "events", model: "Event", columns: ["title", "startsAt", "city", "status"], rows: async () => db.event.findMany({ take: 100, orderBy: { startsAt: "desc" }, select: { id: true, title: true, startsAt: true, city: true, status: true } }) },
  membership: { title: "Membership applications", permission: "membership", model: "MembershipApplication", columns: ["applicationNo", "name", "email", "city", "paymentMethod", "bankName", "transactionReference", "amountPaid", "paymentScreenshot", "status", "createdAt"], rows: async () => db.membershipApplication.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, applicationNo: true, name: true, email: true, city: true, paymentMethod: true, bankName: true, transactionReference: true, amountPaid: true, paymentScreenshotMime: true, status: true, createdAt: true } }) },
  team: { title: "Team members", permission: "content", model: "TeamMember", columns: ["name", "designation", "category", "active"], rows: async () => db.teamMember.findMany({ take: 100, orderBy: { sortOrder: "asc" }, select: { id: true, name: true, designation: true, category: true, active: true } }) },
  stories: { title: "Stories", permission: "blog", model: "BlogPost", columns: ["title", "author", "status", "publishedAt"], rows: async () => db.blogPost.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, title: true, author: true, status: true, publishedAt: true } }) },
  careers: { title: "Careers & applications", permission: "careers", model: "Career", columns: ["title", "department", "location", "status", "deadline"], rows: async () => db.career.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, title: true, department: true, location: true, status: true, deadline: true } }) },
  donations: { title: "Donations", permission: "finance", model: "Donation", columns: ["donorName", "amount", "currency", "status", "createdAt"], rows: async () => db.donation.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, donorName: true, amount: true, currency: true, status: true, createdAt: true } }) },
  messages: { title: "Contact messages", permission: "applications", model: "ContactMessage", columns: ["name", "email", "subject", "createdAt"], rows: async () => db.contactMessage.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, subject: true, createdAt: true } }) },
  media: { title: "Media library", permission: "content", model: "MediaAsset", columns: ["fileName", "mimeType", "size", "createdAt"], rows: async () => db.mediaAsset.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, fileName: true, mimeType: true, size: true, createdAt: true } }) },
  activity: { title: "Activity log", permission: "settings", model: "ActivityLog", columns: ["action", "entity", "createdAt"], rows: async () => db.activityLog.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, action: true, entity: true, createdAt: true } }) },
  pages: { title: "Homepage & pages", permission: "content", model: "HomepageSection", columns: ["key", "title", "enabled", "sortOrder"], rows: async () => db.homepageSection.findMany({ take: 100, orderBy: { sortOrder: "asc" }, select: { id: true, key: true, title: true, enabled: true, sortOrder: true } }) },
};
const creatableModules = new Set(["projects", "events", "team", "stories", "careers"]);

export default async function AdminModule({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const config = configs[module];
  if (!config) notFound();
  const user = await requirePermission(config.permission);
  if (!user) redirect("/admin");

  let records: Record<string, unknown>[] = [];
  let loadError = false;
  try {
    records = await config.rows();
  } catch {
    loadError = true;
  }
  const canCreate = creatableModules.has(module);

  return <main className="mx-auto max-w-[1400px] p-5 md:p-9">
    <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-[#718078]"><ArrowLeft size={14} /> Dashboard</Link>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-[#16834a]">Management workspace</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.055em]">{config.title}</h1><p className="mt-2 text-sm text-[#819087]">Manage and review your organization’s {config.title.toLowerCase()}.</p></div>{canCreate && <Link href={`/admin/${module}/new`} className="inline-flex items-center gap-2 rounded-xl bg-[#073d2c] px-4 py-3 text-sm font-bold text-white"><Plus size={16} /> Add {config.model}</Link>}</div>
    {module === "media" && <div className="mt-7"><AdminMediaUploadForm /></div>}
    <section className="mt-7 overflow-hidden rounded-2xl border border-[#e7ece7] bg-white"><div className="flex items-center justify-between border-b border-[#edf0ed] px-5 py-4"><span className="text-sm font-extrabold">All records <span className="ml-2 rounded-full bg-[#eef4eb] px-2 py-1 text-[10px] text-[#16834a]">{records.length}</span></span><span className="text-xs text-[#919b93]">Showing latest 100</span></div>
      {loadError ? <div role="alert" className="p-8 text-sm text-red-700">Could not load these records. Check the database connection and that all migrations have been applied.</div> : records.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#fafbf9] text-[10px] uppercase tracking-widest text-[#909b92]"><tr>{config.columns.map((column) => <th key={column} className="whitespace-nowrap px-5 py-3 font-bold">{column.replace(/[A-Z]/g, (letter) => ` ${letter}`).toUpperCase()}</th>)}</tr></thead><tbody className="divide-y divide-[#f0f2ef]">{records.map((row, index) => <tr key={String(row.id ?? index)} className="hover:bg-[#fbfcfa]">{config.columns.map((column) => <td key={column} className="max-w-xs whitespace-nowrap px-5 py-4 text-[#4d5b52]">{column === "paymentScreenshot" && module === "membership" ? <a className="font-bold text-[#16834a] underline" href={`/api/admin/membership/${encodeURIComponent(String(row.applicationNo))}/receipt`} target="_blank" rel="noreferrer">View receipt</a> : row[column] instanceof Date ? (row[column] as Date).toLocaleDateString() : String(row[column] ?? "—")}</td>)}</tr>)}</tbody></table></div> : <div className="p-14 text-center"><p className="text-base font-extrabold">Nothing here just yet</p><p className="mt-2 text-sm text-[#859087]">{canCreate ? `Create the first ${config.title.toLowerCase()} using the button above.` : "Records will appear here when available."}</p></div>}
    </section>
  </main>;
}
