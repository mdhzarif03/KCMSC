import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createCycleAction, updateCycleAction } from "./actions";

const ERRORS: Record<string, string> = {
  invalid_cycle: "Fill in every cycle field.",
  invalid_dates: "The closing date and time must be after the opening date and time.",
  overlap: "This cycle overlaps another cycle. Keep admission windows separate."
};

function inputDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

function formatDhaka(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "medium", timeStyle: "short" }).format(date);
}

function cycleState(opensAt: Date, closesAt: Date) {
  const now = Date.now();
  if (now < opensAt.getTime()) return "Upcoming";
  if (now <= closesAt.getTime()) return "Running";
  return "Closed";
}

export default async function AdminAdmissionsPage({ searchParams }: { searchParams: { error?: string; edit?: string } }) {
  await requireAdmin();
  const [cycles, applications, officers] = await Promise.all([
    prisma.admissionCycle.findMany({ orderBy: { opensAt: "desc" }, include: { _count: { select: { applications: true } } } }),
    prisma.admissionApplication.findMany({ orderBy: { createdAt: "desc" }, take: 30, select: { id: true, fullName: true, applyingClass: true, status: true, createdAt: true, cycle: { select: { nameEn: true } } } }),
    prisma.user.findMany({ where: { role: "ADMISSION_OFFICER" }, select: { id: true, name: true }, orderBy: { name: "asc" } })
  ]);
  const running = cycles.find((c) => cycleState(c.opensAt, c.closesAt) === "Running");
  const editCycle = searchParams.edit ? cycles.find((c) => c.id === searchParams.edit) : null;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-ink">Admissions</h1>
          <p className="mt-1 text-sm text-ink-muted">Admission cycles and submitted applications.</p>
        </div>
        <div className="rounded-lg border border-border bg-white px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-wide text-ink-muted">Current cycle</p>
          <p className="mt-1 text-sm font-medium text-primary-dark">{running?.nameEn ?? "No cycle running"}</p>
        </div>
      </div>

      {searchParams.error ? <p className="mt-4 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">{ERRORS[searchParams.error] ?? "Something went wrong."}</p> : null}

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Admission cycles</h2>
            <p className="mt-1 text-xs text-ink-muted">Applications are accepted only while the current time falls inside a cycle window.</p>
          </div>
          <a href="#new-cycle" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">New cycle</a>
        </div>

        <div className="mt-4 space-y-3">
          {cycles.map((cycle) => {
            const state = cycleState(cycle.opensAt, cycle.closesAt);
            const editing = editCycle?.id === cycle.id;
            return (
              <div key={cycle.id} className="rounded-lg border border-border bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-ink">{cycle.nameEn}</h3>
                      <span className={`rounded-full px-2.5 py-1 text-xs ${state === "Running" ? "bg-primary/10 text-primary-dark" : "bg-surface text-ink-muted"}`}>{state}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">{cycle.nameBn}</p>
                    <p className="mt-3 text-sm text-ink-muted">{formatDhaka(cycle.opensAt)} → {formatDhaka(cycle.closesAt)} · {cycle._count.applications} applications</p>
                  </div>
                  <Link href={`/admin/admissions?edit=${cycle.id}`} className="text-sm text-primary hover:underline">{editing ? "Editing" : "Edit cycle"}</Link>
                </div>
                {editing ? (
                  <form action={updateCycleAction.bind(null, cycle.id)} className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                    <input name="nameEn" required defaultValue={cycle.nameEn} className="rounded-md border border-border px-3 py-2 text-sm" />
                    <input name="nameBn" required defaultValue={cycle.nameBn} className="rounded-md border border-border px-3 py-2 text-sm font-bangla" />
                    <label className="text-xs text-ink-muted">Starts<input name="opensAt" type="datetime-local" required defaultValue={inputDate(cycle.opensAt)} className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" /></label>
                    <label className="text-xs text-ink-muted">Ends<input name="closesAt" type="datetime-local" required defaultValue={inputDate(cycle.closesAt)} className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" /></label>
                    <div className="flex gap-3 sm:col-span-2"><SubmitButton label="Save cycle" pendingLabel="Saving…" /><Link href="/admin/admissions" className="rounded-full border border-border px-5 py-2 text-sm text-ink">Cancel</Link></div>
                  </form>
                ) : null}
              </div>
            );
          })}
          {cycles.length === 0 ? <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-ink-muted">No admission cycles yet.</div> : null}
        </div>

        <form id="new-cycle" action={createCycleAction} className="mt-5 grid max-w-3xl gap-3 rounded-lg border border-border bg-surface p-5 sm:grid-cols-2">
          <h3 className="sm:col-span-2 font-medium text-ink">Create a cycle</h3>
          <input name="nameEn" required placeholder="Cycle name (English)" className="rounded-md border border-border px-3 py-2 text-sm" />
          <input name="nameBn" required placeholder="চক্রের নাম (বাংলা)" className="rounded-md border border-border px-3 py-2 text-sm font-bangla" />
          <label className="text-xs text-ink-muted">Starts<input name="opensAt" type="datetime-local" required className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" /></label>
          <label className="text-xs text-ink-muted">Ends<input name="closesAt" type="datetime-local" required className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm text-ink" /></label>
          <div className="sm:col-span-2"><SubmitButton label="Create cycle" pendingLabel="Creating…" /></div>
        </form>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between"><div><h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Applications</h2><p className="mt-1 text-xs text-ink-muted">Latest submissions appear here. No public tracking number is generated.</p></div></div>
        <div className="mt-3 overflow-hidden rounded-lg border border-border bg-white">
          {applications.length === 0 ? <p className="p-8 text-center text-sm text-ink-muted">No applications yet.</p> : <ul className="divide-y divide-border">
            {applications.map((app) => <li key={app.id}><Link href={`/admin/admissions/${app.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-surface"><div><p className="font-medium text-ink">{app.fullName}</p><p className="text-xs text-ink-muted">{app.applyingClass} · {app.cycle.nameEn} · {app.createdAt.toLocaleDateString()}</p></div><p className="text-xs font-medium text-primary-dark">{app.status.replaceAll("_", " ")}</p></Link></li>)}
          </ul>}
        </div>
      </section>
    </div>
  );
}
