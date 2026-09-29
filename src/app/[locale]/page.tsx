import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { LandingExperience } from "@/components/home/LandingExperience";

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
      <LandingExperience locale={locale} />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">At a glance</p>
          <h2 className="mt-2 font-heading text-3xl text-ink">{dict.quickFacts.heading}</h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {dict.quickFacts.items.map((item) => (
              <div key={item.label} className="bg-background p-6 sm:p-7">
                <dt className="text-xs uppercase tracking-[0.12em] text-ink-muted">{item.label}</dt>
                <dd className="mt-3 font-heading text-xl leading-snug text-primary-dark">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">Recognition</p>
              <h2 className="mt-3 max-w-xl font-heading text-3xl leading-tight text-ink sm:text-4xl">
                What students carry beyond the campus.
              </h2>
            </div>
            <ul className="grid gap-2">
              {achievementItems.map((item, index) => (
                <li key={item} className="flex items-center gap-4 border-t border-border py-4">
                  <span className="font-heading text-sm text-brass">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">The campus</p>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-ink sm:text-4xl">
              Spaces for study, practice, curiosity, and community.
            </h2>
            <Link href={`/${locale}/facilities`} className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline">
              Explore facilities →
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {facilityItems.map((item) => (
              <div key={item} className="border-t border-border px-1 py-4 text-sm leading-6 text-ink-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-primary-dark text-white">
        <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">Admissions</p>
            <h2 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">Ready to begin the journey?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Explore the admission process, available classes, and the next steps for joining KCMSC.
            </p>
          </div>
          <Link href={`/${locale}/admissions`} className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-dark transition hover:bg-background">
            Explore admissions
          </Link>
        </div>
      </section>
    </>
  );
}
