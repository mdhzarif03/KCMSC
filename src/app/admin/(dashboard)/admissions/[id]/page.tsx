import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { reassignApplicationAction } from "../actions";

export default async function AdminApplicationPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const [app, officers] = await Promise.all([
    prisma.admissionApplication.findUnique({ where: { id: params.id }, include: { cycle: { select: { nameEn: true } }, assignedOfficer: { select: { id: true, name: true } }, guardians: true } }),
    prisma.user.findMany({ where: { role: "ADMISSION_OFFICER" }, orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);
  if (!app) notFound();
  const bound = reassignApplicationAction.bind(null, app.id);

  return <div className="max-w-5xl"><Link href="/admin/admissions" className="text-sm text-primary hover:underline">← Admissions</Link><div className="mt-4"><ApplicationDetail app={app} /></div><div className="mt-6 flex flex-wrap gap-3"><a href={`/api/admissions/${app.id}/certificate`} className="rounded-full border border-border px-5 py-2 text-sm text-ink">Download certificate</a><a href={`/api/admissions/${app.id}/form`} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark">Download application form</a></div><form action={bound} className="mt-6 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-surface p-6"><label className="text-sm font-medium text-ink">Assign to officer<select name="officerId" defaultValue={app.assignedOfficer?.id ?? ""} className="mt-1 block rounded-md border border-border bg-white px-3 py-2 text-sm"><option value="">— Unassigned —</option>{officers.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></label><SubmitButton label="Save assignment" pendingLabel="Saving…" /></form></div>;
}
