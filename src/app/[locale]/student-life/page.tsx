import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export default function StudentLifePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.studentLifePage;

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{page.coCurricularHeading}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.coCurricular.map((c) => (
            <li key={c.title} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-medium text-primary-dark">{c.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{c.items}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{page.culturalEducationHeading}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {page.culturalEducation.map((c) => (
              <div key={c.title} className="rounded-lg border border-border bg-white p-6">
                <h3 className="font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{page.highlightsHeading}</h2>
        <ul className="mt-6 space-y-3">
          {page.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-ink-muted">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{page.rooftopGarden.heading}</h2>
          <p className="mt-4 max-w-3xl text-ink-muted">{page.rooftopGarden.body}</p>
        </div>
      </section>
    </>
  );
}
