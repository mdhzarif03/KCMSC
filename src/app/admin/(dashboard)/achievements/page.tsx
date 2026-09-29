import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteAchievementAction } from "./actions";

export default async function AchievementsListPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }]
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-ink">Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          New achievement
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
          No achievements yet. Add the first one.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-white">
          {achievements.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {a.year} — {a.titleEn}
                </p>
                <p className="mt-1 flex gap-2 text-xs text-ink-muted">
                  <span>{a.category}</span>
                  {a.isFeatured ? <span className="text-primary">Featured</span> : null}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/achievements/${a.id}/edit`}
                  className="text-sm text-primary hover:underline"
                >
                  Edit
                </Link>
                <form action={deleteAchievementAction}>
                  <input type="hidden" name="id" value={a.id} />
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
