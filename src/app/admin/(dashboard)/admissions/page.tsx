import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { APPLICATION_STATUSES } from "@/lib/admissions";
import { statusText } from "@/components/admin/ApplicationDetail";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createCycleAction, setCycleActiveAction } from "./actions";

const ERRORS: Record<string, string> = {
  invalid_cycle: "Fill in every cycle field.",
  invalid_dates: "The closing date must be after the opening date."
};

export default async function AdminAdmissionsPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  await requireAdmin();
  const [cycles, grouped, recent] = await Promise.all([
    prisma.admissionCycle.findMany({ orderBy: { opensAt: "desc" } }),
    prisma.admissionApplication.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.admissionApplication.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
      include: { assignedOfficer: { select: { name: true } } }
    })
  ]);
  const rows: Array<{ status: string; _count: { _all: number } }> = grouped;
  const counts = new Map<string, number>(rows.map((g) => [g.status, g._count._all]));
  const total = rows.reduce((n, g) => n + g._count._all, 0);

  return (
    <div className="max-w-5xl">
      <h1 className="font-heading text-2xl text-ink">Admissions</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {total} applications · <Link href="/admin/officers" className="text-primary hover:underline">Manage officers</Link>
      </p>

      {searchParams.error ? (
        <p className="mt-4 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
          {ERRORS[searchParams.error]}
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {APPLICATION_STATUSES.map((s) => (
          <div key={s} className="rounded-lg border border-border bg-white p-4">
            <p className="text-xs text-ink-muted">{statusText(s)}</p>
            <p className="mt-1 font-heading text-2xl text-primary-dark">{counts.get(s) ?? 0}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Admission cycles
        </h2>
        <p className="mt-1 text-xs text-ink-muted">
          The public application form is open only while a cycle is marked active AND today is
          within its dates.
        </p>
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-white">
          {cycles.length === 0 ? (
            <li className="p-6 text-center text-sm text-ink-muted">
              No cycles yet — create one below to open applications.
            </li>
          ) : (
            cycles.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-ink">{c.nameEn}</p>
                  <p className="text-xs text-ink-muted">
                    {c.opensAt.toLocaleDateString()} – {c.closesAt.toLocaleDateString()} ·{" "}
                    <span className={c.isActive ? "text-primary" : ""}>
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
                <form action={setCycleActiveAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="activate" value={c.isActive ? "0" : "1"} />
                  <button type="submit" className="text-sm text-primary hover:underline">
                    {c.isActive ? "Deactivate" : "Activate"}
                  </button>
                </form>
              </li>
            ))
          )}
        </ul>

        <form action={createCycleAction} className="mt-4 grid max-w-2xl gap-3 sm:grid-cols-2">
          <input name="nameEn" required placeholder="Cycle name (English)" className="rounded-md border border-border px-3 py-2 text-sm" />
          <input name="nameBn" required placeholder="চক্রের নাম (বাংলা)" className="rounded-md border border-border px-3 py-2 text-sm font-bangla" />
          <label className="text-xs text-ink-muted">
            Opens
            <input name="opensAt" type="date" required className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" />
          </label>
          <label className="text-xs text-ink-muted">
            Closes
            <input name="closesAt" type="date" required className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" />
          </label>
          <div className="sm:col-span-2">
            <SubmitButton label="Create cycle" pendingLabel="Creating…" />
          </div>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Recent applications
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-white">
          {recent.length === 0 ? (
            <li className="p-6 text-center text-sm text-ink-muted">No applications yet.</li>
          ) : (
            recent.map((a) => (
              <li key={a.id}>
                <Link href={`/admin/admissions/${a.id}`} className="flex items-center justify-between p-4 hover:bg-surface">
                  <div>
                    <p className="font-medium text-ink">{a.applicantName}</p>
                    <p className="text-xs text-ink-muted">{a.referenceCode} · {a.applyingClass}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-medium text-primary-dark">{statusText(a.status)}</p>
                    <p className="text-ink-muted">{a.assignedOfficer?.name ?? "Unassigned"}</p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
