import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Youth Association of Pakistan | Youth-powered change", template: "%s | YAP" },
  description: "A youth-led movement building opportunity, stronger communities, and a more hopeful future across Pakistan.",
  openGraph: { type: "website", title: "Youth Association of Pakistan", description: "Youth-powered change across Pakistan." },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
