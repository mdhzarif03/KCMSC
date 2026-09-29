import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { SignOutButton } from "./SignOutButton";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/clubs", label: "Clubs" },
  { href: "/admin/facilities", label: "Facilities" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/admissions", label: "Admissions" },
  { href: "/admin/officers", label: "Admission Officers" },
  { href: "/admin/administrators", label: "Administrators" }
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Real server-side enforcement — see src/lib/session.ts for why this
  // exists in addition to the middleware's edge-level check.
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col bg-primary-dark text-white">
        <div className="border-b border-white/10 p-6">
          <p className="font-heading text-lg">KCMSC Admin</p>
          <p className="mt-1 text-xs text-white/60">{user.email}</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 bg-background p-8">{children}</main>
    </div>
  );
}
