import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteAlumniAction } from "./actions";

export default async function AlumniAdminPage() {
  const alumni = await prisma.alumniMessage.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return <div>
    <div className="flex items-center justify-between"><h1 className="font-heading text-2xl text-ink">Alumni messages</h1><Link href="/admin/alumni/new" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark">New message</Link></div>
    {alumni.length === 0 ? <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">No alumni messages yet. Add the first one.</p> : <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-white">{alumni.map((a) => <li key={a.id} className="flex items-center justify-between gap-4 p-4"><div className="min-w-0"><p className="truncate font-medium text-ink">{a.nameEn}{a.graduationYear ? ` — ${a.graduationYear}` : ""}</p><p className="mt-1 flex gap-2 text-xs text-ink-muted"><span>{a.isPublished ? "Published" : "Draft"}</span>{a.isFeatured ? <span className="text-primary">Featured</span> : null}</p></div><div className="flex shrink-0 items-center gap-4"><Link href={`/admin/alumni/${a.id}/edit`} className="text-sm text-primary hover:underline">Edit</Link><form action={deleteAlumniAction}><input type="hidden" name="id" value={a.id} /><button type="submit" className="text-sm text-brick hover:underline">Delete</button></form></div></li>)}</ul>}
  </div>;
}
