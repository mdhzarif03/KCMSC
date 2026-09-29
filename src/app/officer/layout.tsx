import type { Metadata } from "next";
import { Providers } from "../admin/providers";

export const metadata: Metadata = {
  title: "KCMSC Admissions",
  robots: { index: false, follow: false }
};

export default function OfficerRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      <Providers>{children}</Providers>
    </div>
  );
}
