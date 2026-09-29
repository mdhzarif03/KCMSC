import { getDictionary, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

async function getFeaturedAchievements(locale: Locale, fallback: string[]): Promise<string[]> {
  try {
    const rows = await prisma.achievement.findMany({
      where: { isFeatured: true },
      orderBy: { year: "desc" },
      take: 4
    });
    if (rows.length === 0) return fallback;
    return rows.map((r) => (locale === "bn" ? r.titleBn : r.titleEn));
  } catch {
    return fallback;
  }
}

async function getFeaturedFacilities(locale: Locale, fallback: string[]): Promise<string[]> {
  try {
    const rows = await prisma.facility.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "asc" },
      take: 6
    });
    if (rows.length === 0) return fallback;
    return rows.map((r) => (locale === "bn" ? r.titleBn : r.titleEn));
  } catch {
    return fallback;
  }
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const achievementItems = await getFeaturedAchievements(locale, dict.achievementsTeaser.items);
  const facilityItems = await getFeaturedFacilities(locale, dict.facilitiesTeaser.items);

  return (
    <>
      {/* HERO
          Phase 2 note: this is the structural/content skeleton only.
          The immersive depth/3D treatment described in the brief
          (§6) belongs here once real campus photography and the
          animation system land in Phase 2 — keep this section's DOM
          shape stable so that upgrade doesn't require a rewrite. */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-wide text-brass">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {dict.hero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">{dict.hero.subheading}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/admissions`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink hover:bg-white"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{dict.quickFacts.heading}</h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.quickFacts.items.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-surface p-5">
              <dt className="text-sm text-ink-muted">{item.label}</dt>
              <dd className="mt-1 font-heading text-xl text-primary-dark">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ABOUT / MISSION / VISION */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl text-ink">{dict.about.heading}</h2>
            <p className="mt-4 text-ink-muted">{dict.about.body}</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Mission
              </h3>
              <p className="mt-2 text-ink-muted">{dict.about.mission}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Vision
              </h3>
              <p className="mt-2 text-ink-muted">{dict.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS TEASER — featured Achievement rows, falling back
          to the static dictionary if the database is empty/unreachable. */}
      <section className="mx-auto max-w-content px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl text-ink">{dict.achievementsTeaser.heading}</h2>
          <Link href={`/${locale}/achievements`} className="text-sm text-primary hover:underline">
            {locale === "bn" ? "সব দেখুন" : "View all"}
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {achievementItems.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-white p-5 text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* FACILITIES TEASER */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{dict.facilitiesTeaser.heading}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilityItems.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-white p-5 text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LEADERSHIP SNAPSHOT */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">
          {locale === "bn" ? "নেতৃত্ব" : "Leadership"}
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.leadership.map((person) => (
            <li key={person.name} className="rounded-lg border border-border p-5">
              {/* Media placeholder — real portraits replace this in Phase 2/3
                  via the Media model, once photography is available. */}
              <div
                aria-hidden
                className="mb-4 h-16 w-16 rounded-full bg-soft-green/30"
              />
              <p className="font-medium text-ink">{person.name}</p>
              <p className="text-sm text-ink-muted">{person.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
