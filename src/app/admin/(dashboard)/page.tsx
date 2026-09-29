import { prisma } from "@/lib/db";

export default async function DashboardOverviewPage() {
  const [notices, achievements, clubs, facilities, careers, admins] = await Promise.all([
    prisma.notice.count(),
    prisma.achievement.count(),
    prisma.club.count(),
    prisma.facility.count(),
    prisma.career.count({ where: { isPublished: true } }),
    prisma.user.count({ where: { role: "ADMIN" } })
  ]);

  const cards = [
    { label: "Notices", value: notices, href: "/admin/notices" },
    { label: "Achievements", value: achievements, href: "/admin/achievements" },
    { label: "Clubs", value: clubs, href: "/admin/clubs" },
    { label: "Facilities", value: facilities, href: "/admin/facilities" },
    { label: "Open Careers", value: careers, href: "/admin/careers" },
    { label: "Administrators", value: admins, href: "/admin/administrators" }
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-lg border border-border bg-white p-5 hover:border-primary"
          >
            <p className="text-sm text-ink-muted">{c.label}</p>
            <p className="mt-1 font-heading text-3xl text-primary-dark">{c.value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
