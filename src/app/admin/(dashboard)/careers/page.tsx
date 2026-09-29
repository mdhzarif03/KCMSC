import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteCareerAction } from "./actions";

export default async function CareersListPage() {
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-ink">Careers</h1>
        <Link
          href="/admin/careers/new"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          New vacancy
        </Link>
      </div>

      {careers.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
          No vacancies yet. Post the first one.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-white">
          {careers.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{c.titleEn}</p>
                <p className="mt-1 flex gap-2 text-xs text-ink-muted">
                  <span className={c.isPublished ? "text-primary" : ""}>
                    {c.isPublished ? "Published" : "Draft"}
                  </span>
                  {c.deadline ? <span>Deadline {c.deadline.toLocaleDateString()}</span> : null}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link href={"/admin/careers/" + c.id + "/edit"} className="text-sm text-primary hover:underline">
                  Edit
                </Link>
                <form action={deleteCareerAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className="text-sm text-brick hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
