import Link from "next/link";
import { requireOfficer } from "@/lib/session";
import { SignOutButton } from "../../admin/(dashboard)/SignOutButton";

const NAV = [
  {
    href: "/officer",
    label: "Dashboard",
  },
  {
    href: "/officer/applications",
    label: "Applications",
  },
  {
    href: "/officer/cycles",
    label: "Admission Cycles",
  },
  {
    href: "/officer/settings",
    label: "My Account",
  },
];

export default async function OfficerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireOfficer();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col bg-primary-dark text-white">
        <div className="border-b border-white/10 p-6">
          <p className="font-heading text-lg">Admissions</p>

          <p className="mt-1 text-xs text-white/60">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-white/85 transition hover:bg-white/10"
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
