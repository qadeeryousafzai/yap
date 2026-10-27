"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, ArrowLeft, BookOpen, BriefcaseBusiness, CalendarDays, CircleDollarSign, FileText, FolderKanban, Images, LayoutDashboard, LogOut, Mail, Menu, Settings, Users, UsersRound, X } from "lucide-react";

const items = [
  ["Overview", "/admin", LayoutDashboard, "overview"],
  ["Pages & homepage", "/admin/pages", FileText, "content"],
  ["Projects", "/admin/projects", FolderKanban, "projects"],
  ["Events", "/admin/events", CalendarDays, "events"],
  ["Membership", "/admin/membership", UsersRound, "membership"],
  ["Team", "/admin/team", Users, "content"],
  ["Stories", "/admin/stories", BookOpen, "blog"],
  ["Careers", "/admin/careers", BriefcaseBusiness, "careers"],
  ["Donations", "/admin/donations", CircleDollarSign, "finance"],
  ["Media library", "/admin/media", Images, "content"],
  ["Messages", "/admin/messages", Mail, "applications"],
  ["Activity", "/admin/activity", Activity, "settings"],
  ["Settings", "/admin/settings", Settings, "settings"],
] as const;
const rolePermissions: Record<string, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: ["content", "applications", "events", "projects", "gallery", "blog", "settings"],
  EDITOR: ["content", "events", "projects", "gallery", "blog"],
  MEMBERSHIP: ["membership"],
  FINANCE: ["finance"],
  HR: ["careers"],
};

export function AdminSidebar({ name, role }: { name: string; role: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const visibleItems = items.filter(([, , , permission]) => permission === "overview" || rolePermissions[role]?.includes("*") || rolePermissions[role]?.includes(permission));
  const close = () => setOpen(false);

  return <>
    <header className="fixed inset-x-0 top-0 z-30 flex h-[60px] items-center justify-between border-b border-[#e7ece7] bg-white/95 px-5 backdrop-blur lg:hidden">
      <Link href="/admin" className="text-sm font-extrabold text-[#10241d]">YAP Studio</Link>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open admin navigation" aria-expanded={open} aria-controls="admin-mobile-navigation" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5ebe6] text-[#173c2b]"><Menu size={20} /></button>
    </header>
    <div onClick={close} aria-hidden="true" className={`fixed inset-0 z-40 bg-[#071b12]/50 transition-opacity lg:hidden ${open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`} />
    <aside id="admin-mobile-navigation" aria-label="Admin navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[min(84vw,300px)] flex-col border-r border-[#e5ebe6] bg-white transition-transform duration-300 lg:z-20 lg:w-[260px] lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-[76px] items-center justify-between gap-3 border-b border-[#edf0ed] px-5">
        <Link href="/admin" onClick={close} className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f3df] text-sm font-black text-[#147344]">Y</div><div><b className="block text-sm text-[#10241d]">YAP Studio</b><span className="text-[10px] font-bold uppercase tracking-widest text-[#8a968e]">Content workspace</span></div></Link>
        <button type="button" onClick={close} aria-label="Close admin navigation" className="flex h-9 w-9 items-center justify-center rounded-xl text-[#68756d] hover:bg-[#f5f8f4] lg:hidden"><X size={19} /></button>
      </div>
      <div className="flex items-center gap-3 border-b border-[#edf0ed] px-5 py-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#073d2c] text-sm font-bold text-lime-300">{name.slice(0, 1).toUpperCase()}</div><div className="min-w-0"><b className="block truncate text-sm">{name}</b><span className="text-xs capitalize text-[#8a968e]">{role.toLowerCase().replace("_", " ")}</span></div></div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">{visibleItems.map(([label, href, Icon]) => <Link key={href} href={href} onClick={close} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${path === href ? "bg-[#e9f3e7] text-[#12603d]" : "text-[#6e7a72] hover:bg-[#f5f8f4] hover:text-[#183d2b]"}`}><Icon size={17} />{label}</Link>)}</nav>
      <div className="space-y-2 border-t border-[#edf0ed] p-3"><Link href="/" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#6e7a72] hover:bg-[#f5f8f4]"><ArrowLeft size={16} /> View website</Link><form action="/api/admin/logout" method="post"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#6e7a72] hover:bg-red-50 hover:text-red-700"><LogOut size={16} /> Sign out</button></form><p className="px-3 pb-1 text-[10px] text-[#9aa49c]">YAP · Admin</p></div>
    </aside>
  </>;
}
