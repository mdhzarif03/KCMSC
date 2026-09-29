import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";

type ClubEntry = { name: string; description: string };

async function getClubEntries(locale: Locale, fallback: ClubEntry[]): Promise<ClubEntry[]> {
  try {
    const rows = await prisma.club.findMany({ orderBy: { createdAt: "asc" } });
    if (rows.length === 0) return fallback;
    return rows.map((c) => ({
      name: locale === "bn" ? c.nameBn : c.nameEn,
      description: locale === "bn" ? c.descriptionBn : c.descriptionEn
    }));
  } catch {
    return fallback;
  }
}

export default async function ClubsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.clubsPage;
  const clubs = await getClubEntries(locale, page.clubs);

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />
      <section className="mx-auto max-w-content px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <li key={club.name} className="rounded-lg border border-border bg-surface p-6">
              <div aria-hidden className="mb-4 h-12 w-12 rounded-full bg-primary/10" />
              <h2 className="font-medium text-ink">{club.name}</h2>
              {club.description ? (
                <p className="mt-2 text-sm text-ink-muted">{club.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
