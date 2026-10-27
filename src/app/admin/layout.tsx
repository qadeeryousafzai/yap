import { Suspense } from "react";
import { getAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SiteLoader } from "@/components/site-loader";
export const metadata = {
  title: "Admin workspace | YAP",
  robots: { index: false, follow: false },
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<SiteLoader />}><AdminContent>{children}</AdminContent></Suspense>;
}

async function AdminContent({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  if (!admin) return <>{children}</>;
  return (
    <div className="min-h-screen bg-[#f7f9f6]">
      <AdminSidebar name={admin.name} role={admin.role} />
      <div className="min-w-0 pt-[60px] lg:ml-[260px] lg:pt-0">
        {children}
      </div>
    </div>
  );
}
