import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

function cycleState(opensAt: Date, closesAt: Date) {
  const now = Date.now();
  if (now < opensAt.getTime()) return "Upcoming";
  if (now <= closesAt.getTime()) return "Running";
  return "Closed";
}

function statusText(status: string) {
  return status.replaceAll("_", " ").replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

export default async function DashboardOverviewPage() {
  await requireAdmin();
  const [applications, cycles, officers, recent] = await Promise.all([
    prisma.admissionApplication.count(),
    prisma.admissionCycle.findMany({ orderBy: { opensAt: "desc" }, include: { _count: { select: { applications: true } } } }),
    prisma.user.count({ where: { role: "ADMISSION_OFFICER" } }),
    prisma.admissionApplication.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, fullName: true, applyingClass: true, status: true, createdAt: true, cycle: { select: { nameEn: true } } },
    }),
  ]);

  const running = cycles.find((c) => cycleState(c.opensAt, c.closesAt) === "Running");

  return (
    <div className="max-w-[1280px]">
      <header className="flex flex-col gap-4 border-b border-[#d9d8cf] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#176b45]">Administration</p>
          <h1 className="mt-2 font-heading text-3xl font-normal tracking-tight text-[#124c36]">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69716b]">A quick view of admissions activity, current cycles and applications being processed.</p>
        </div>
        <Link href="/admin/admissions?view=applications" className="kc-classic-button kc-classic-button-primary">Open admissions</Link>
      </header>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total applications", String(applications), "All submitted applications"],
          ["Current cycle", running?.nameEn ?? "None", running ? "Accepting applications" : "No active window"],
          ["Admission officers", String(officers), "Active officer accounts"],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-[14px] border border-[#d9d8cf] bg-[#fffdf8] p-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#8a918b]">{label}</p>
            <p className="mt-3 truncate font-heading text-2xl font-normal text-[#124c36]">{value}</p>
            <p className="mt-1 text-xs text-[#69716b]">{note}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_.8fr]">
        <section className="rounded-[14px] border border-[#d9d8cf] bg-[#fffdf8]">
          <div className="flex items-end justify-between gap-4 border-b border-[#d9d8cf] px-5 py-5">
            <div><p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#176b45]">Admissions</p><h2 className="mt-1 font-heading text-xl text-[#124c36]">Recent applications</h2></div>
            <Link href="/admin/admissions?view=applications" className="text-xs font-medium text-[#176b45] hover:text-[#124c36]">View all</Link>
          </div>
          <div className="divide-y divide-[#d9d8cf]">
            {recent.length ? recent.map((app) => (
              <Link key={app.id} href={`/admin/admissions/${app.id}`} className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[#efeee7] sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0"><p className="truncate text-sm font-medium text-[#242824]">{app.fullName}</p><p className="mt-1 text-xs text-[#69716b]">{app.applyingClass} · {app.cycle.nameEn} · {app.createdAt.toLocaleDateString("en-GB")}</p></div>
                <span className="w-fit rounded-full bg-[#efeee7] px-2.5 py-1 text-[10px] font-medium text-[#176b45]">{statusText(app.status)}</span>
              </Link>
            )) : <p className="p-8 text-center text-sm text-[#69716b]">No applications yet.</p>}
          </div>
        </section>

        <section className="rounded-[14px] border border-[#d9d8cf] bg-[#fffdf8]">
          <div className="border-b border-[#d9d8cf] px-5 py-5"><p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#176b45]">Admission windows</p><h2 className="mt-1 font-heading text-xl text-[#124c36]">Cycles</h2></div>
          <div className="divide-y divide-[#d9d8cf]">
            {cycles.slice(0, 5).map((cycle) => { const state = cycleState(cycle.opensAt, cycle.closesAt); return <Link key={cycle.id} href="/admin/admissions?view=cycles" className="block px-5 py-4 hover:bg-[#efeee7]"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-medium text-[#242824]">{cycle.nameEn}</p><span className="text-[10px] text-[#176b45]">{state}</span></div><p className="mt-1 text-xs text-[#69716b]">{cycle._count.applications} applications</p></Link>; })}
            {!cycles.length && <p className="p-8 text-center text-sm text-[#69716b]">No admission cycles yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
