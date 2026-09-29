import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";

type FacilityEntry = { title: string; description: string };

async function getFacilityEntries(locale: Locale): Promise<FacilityEntry[] | null> {
  try {
    const rows = await prisma.facility.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "asc" }]
    });
    if (rows.length === 0) return null;
    return rows.map((f) => ({
      title: locale === "bn" ? f.titleBn : f.titleEn,
      description: locale === "bn" ? f.descriptionBn : f.descriptionEn
    }));
  } catch {
    return null;
  }
}

export default async function FacilitiesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.facilitiesPage;
  const dbFacilities = await getFacilityEntries(locale);

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />

      {dbFacilities ? (
        <section className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{page.generalHeading}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dbFacilities.map((f) => (
              <li key={f.title} className="rounded-lg border border-border bg-surface p-5 text-sm text-ink-muted">
                <p className="font-medium text-ink">{f.title}</p>
                {f.description ? <p className="mt-1">{f.description}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        // DB not reachable/empty in this environment — same real content
        // from the static dictionary, in its original two-list shape.
        <>
          <section className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-heading text-2xl text-ink">{page.generalHeading}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.general.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-surface p-5 text-sm text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="border-y border-border bg-surface">
            <div className="mx-auto max-w-content px-6 py-16">
              <h2 className="font-heading text-2xl text-ink">{page.studentFacilitiesHeading}</h2>
              <ul className="mt-6 space-y-3">
                {page.studentFacilities.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Rooftop garden is an editorial narrative, not a CRUD list item —
          left as static bilingual copy; not yet modeled in the Phase 3 CMS. */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{page.rooftopGarden.heading}</h2>
        <p className="mt-4 max-w-3xl text-ink-muted">{page.rooftopGarden.body}</p>
      </section>
    </>
  );
}
