import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";

type Entry = { year: string; category: string; title: string; details: string };

async function getAchievementEntries(locale: Locale, fallback: Entry[]): Promise<Entry[]> {
  try {
    const rows = await prisma.achievement.findMany({
      orderBy: [{ year: "desc" }, { createdAt: "desc" }]
    });
    if (rows.length === 0) return fallback;
    return rows.map((r) => ({
      year: String(r.year),
      category: r.category,
      title: locale === "bn" ? r.titleBn : r.titleEn,
      details: locale === "bn" ? r.descriptionBn : r.descriptionEn
    }));
  } catch {
    // DB not reachable in this environment — show the same real content
    // from the static dictionary rather than an empty/broken page.
    return fallback;
  }
}

export default async function AchievementsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.achievementsPage;
  const entries = await getAchievementEntries(locale, page.entries);

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />
      <section className="mx-auto max-w-content px-6 py-16">
        <ol className="space-y-6">
          {entries.map((entry, i) => (
            <li
              key={i}
              className="grid gap-4 rounded-lg border border-border bg-surface p-6 sm:grid-cols-[5rem_1fr]"
            >
              <div>
                <p className="font-heading text-2xl text-primary-dark">{entry.year}</p>
                <p className="text-xs uppercase tracking-wide text-ink-muted">{entry.category}</p>
              </div>
              <div>
                <h2 className="font-medium text-ink">{entry.title}</h2>
                <p className="mt-2 text-sm text-ink-muted">{entry.details}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
