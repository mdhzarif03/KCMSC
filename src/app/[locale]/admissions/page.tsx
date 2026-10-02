import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getActiveCycleSafe } from "@/lib/admissions";

// Whether applications are open depends on the current time and on an
// admin toggling a cycle — it must never be frozen at build time.
export const dynamic = "force-dynamic";

export default async function AdmissionsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.admissionsPage;
  const cycle = await getActiveCycleSafe();

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />

      <section className="mx-auto max-w-content px-6 py-16">
        <div
          className={`rounded-lg border p-6 ${
            cycle ? "border-primary/30 bg-primary/5" : "border-border bg-surface"
          }`}
        >
          <p className="font-medium text-ink">{cycle ? page.openBanner : page.closedBanner}</p>
          {cycle ? (
            <p className="mt-1 text-sm text-ink-muted">
              {locale === "bn" ? cycle.nameBn : cycle.nameEn}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3">
            {cycle ? (
              <Link
                href={`/${locale}/admissions/apply`}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
              >
                {page.applyCta}
              </Link>
            ) : null}
            <Link
              href={`/${locale}/admissions/track`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-white"
            >
              {page.trackCta}
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-medium text-ink">
            {locale === "bn" ? "শ্রেণি নির্ধারণ" : "Class Placement"}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{page.ageGroupsNote}</p>
          <Link
            href={`/${locale}/academics`}
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
            {locale === "bn" ? "শিক্ষাক্রম পাতা দেখুন →" : "See the Academics page →"}
          </Link>
        </div>

        {/* Keep this section explicit until the missing admission details are available. */}
        <div className="mt-8 rounded-lg border-2 border-dashed border-border p-6">
          <h2 className="font-medium text-ink">{page.pendingHeading}</h2>
          <p className="mt-2 text-sm text-ink-muted">{page.pendingBody}</p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-primary-dark p-6 text-white">
          <p className="text-sm text-white/80">{page.onlinePortalNote}</p>
          <a
            href={`mailto:${dict.footer.email}`}
            className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary-dark hover:bg-brass hover:text-white"
          >
            {page.contactCta}
          </a>
        </div>
      </section>
    </>
  );
}
