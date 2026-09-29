import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { APPLICATION_STATUSES } from "@/lib/admissions";
import { statusText } from "@/components/admin/ApplicationDetail";

export default async function OfficerApplicationsPage({
  searchParams
}: {
  searchParams: { view?: string; status?: string; q?: string };
}) {
  const officer = await requireOfficer();
  const { view, status, q } = searchParams;

  const where: Record<string, unknown> = {};
  if (view === "mine") where.assignedOfficerId = officer.id;
  if (view === "new") where.status = "UNASSIGNED";
  if (status && (APPLICATION_STATUSES as readonly string[]).includes(status)) where.status = status;
  if (q) {
    where.OR = [
      { applicantName: { contains: q, mode: "insensitive" } },
      { referenceCode: { contains: q.toUpperCase() } },
      { guardianPhone: { contains: q } }
    ];
  }

  const applications = await prisma.admissionApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { assignedOfficer: { select: { id: true, name: true } } }
  });

  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">Applications</h1>

      <form method="GET" className="mt-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, reference or phone"
          className="w-64 rounded-md border border-border px-3 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-md border border-border bg-white px-3 py-2 text-sm"
        >
          <option value="">Any status</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusText(s)}
            </option>
          ))}
        </select>
        <select
          name="view"
          defaultValue={view ?? ""}
          className="rounded-md border border-border bg-white px-3 py-2 text-sm"
        >
          <option value="">Everyone&apos;s</option>
          <option value="mine">Assigned to me</option>
          <option value="new">Unassigned only</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Filter
        </button>
      </form>

      {applications.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
          No applications match.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-white">
          {applications.map((a) => (
            <li key={a.id}>
              <Link
                href={`/officer/applications/${a.id}`}
                className="flex items-center justify-between gap-4 p-4 hover:bg-surface"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{a.applicantName}</p>
                  <p className="text-xs text-ink-muted">
                    {a.referenceCode} · {a.applyingClass} · {a.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-medium text-primary-dark">{statusText(a.status)}</p>
                  <p className="text-xs text-ink-muted">
                    {a.assignedOfficer
                      ? a.assignedOfficer.id === officer.id
                        ? "You"
                        : a.assignedOfficer.name
                      : "Unassigned"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
