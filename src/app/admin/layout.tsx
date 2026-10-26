import { getAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Menu } from "lucide-react";
export const metadata = {
  title: "Admin workspace | YAP",
  robots: { index: false, follow: false },
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) return <>{children}</>;
  return (
    <div className="min-h-screen bg-[#f7f9f6] lg:flex">
      <div className="lg:fixed lg:inset-y-0 lg:left-0">
        <AdminSidebar name={admin.name} role={admin.role} />
      </div>
      <div className="min-w-0 flex-1 lg:ml-[260px]">
        <div className="sticky top-0 z-20 flex h-[60px] items-center justify-between border-b border-[#e7ece7] bg-white/90 px-5 backdrop-blur lg:hidden">
          <span className="text-sm font-extrabold">YAP Studio</span>
          <Menu size={19} />
        </div>
        {children}
      </div>
    </div>
  );
}
