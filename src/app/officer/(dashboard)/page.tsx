import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";

export default async function OfficerOverviewPage() {
  const officer = await requireOfficer();
  const [unassigned, mine, awaiting, eligible, notEligible, examEligible, total] =
    await Promise.all([
      prisma.admissionApplication.count({ where: { status: "UNASSIGNED" } }),
      prisma.admissionApplication.count({
        where: { assignedOfficerId: officer.id, status: { in: ["ASSIGNED", "UNDER_REVIEW"] } }
      }),
      prisma.admissionApplication.count({ where: { status: "AWAITING_APPLICANT" } }),
      prisma.admissionApplication.count({ where: { status: "ELIGIBLE" } }),
      prisma.admissionApplication.count({ where: { status: "NOT_ELIGIBLE" } }),
      prisma.admissionApplication.count({ where: { status: "EXAM_ELIGIBLE" } }),
      prisma.admissionApplication.count()
    ]);

  const cards = [
    { label: "New (unassigned)", value: unassigned, href: "/officer/applications?view=new" },
    { label: "Assigned to me, in progress", value: mine, href: "/officer/applications?view=mine" },
    { label: "Awaiting applicant", value: awaiting, href: "/officer/applications?status=AWAITING_APPLICANT" },
    { label: "Eligible", value: eligible, href: "/officer/applications?status=ELIGIBLE" },
    { label: "Not eligible", value: notEligible, href: "/officer/applications?status=NOT_ELIGIBLE" },
    { label: "Exam eligible", value: examEligible, href: "/officer/applications?status=EXAM_ELIGIBLE" },
    { label: "All applications", value: total, href: "/officer/applications" }
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">Your workload</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg border border-border bg-white p-5 hover:border-primary"
          >
            <p className="text-sm text-ink-muted">{c.label}</p>
            <p className="mt-1 font-heading text-3xl text-primary-dark">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
