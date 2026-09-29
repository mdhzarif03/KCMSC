import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

export default function AcademicsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.academicsPage;

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{page.mediumTable.heading}</h2>
        <div className="mt-6">
          <DataTable columns={page.mediumTable.columns} rows={page.mediumTable.rows} />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{page.wingsHeading}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {page.wings.map((wing) => (
              <div key={wing.name} className="rounded-lg border border-border bg-white p-6">
                <h3 className="font-heading text-xl text-primary-dark">{wing.name}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-ink">
                      {locale === "bn" ? "বিভাগ" : "Sections"}
                    </dt>
                    <dd className="text-ink-muted">{wing.sections}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">
                      {locale === "bn" ? "প্রশাসন" : "Administration"}
                    </dt>
                    <dd className="text-ink-muted">{wing.administration}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">
                      {locale === "bn" ? "শিক্ষক সংখ্যা" : "Teaching staff"}
                    </dt>
                    <dd className="text-ink-muted">{wing.teachingStaff}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">{page.ageGroupsHeading}</h2>
        <div className="mt-6 max-w-md">
          <DataTable columns={page.ageGroups.columns} rows={page.ageGroups.rows} />
        </div>
        <p className="mt-4 text-sm text-ink-muted">{page.operatingHours}</p>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{page.resultsHeading}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {page.results.map((r) => (
              <div key={r.label} className="rounded-lg border border-border bg-white p-6">
                <h3 className="font-heading text-lg text-primary-dark">{r.label}</h3>
                <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <dt className="text-xs text-ink-muted">
                      {locale === "bn" ? "অংশগ্রহণকারী" : "Appeared"}
                    </dt>
                    <dd className="mt-1 font-heading text-xl text-ink">{r.appeared}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">
                      {locale === "bn" ? "উত্তীর্ণ" : "Passed"}
                    </dt>
                    <dd className="mt-1 font-heading text-xl text-ink">{r.passed}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">
                      {locale === "bn" ? "পাসের হার" : "Pass rate"}
                    </dt>
                    <dd className="mt-1 font-heading text-xl text-primary">{r.passRate}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-center text-sm text-ink-muted">
                  {r.gpa5} {locale === "bn" ? "জন শিক্ষার্থী জিপিএ ৫ অর্জন করেছে" : "students achieved GPA 5"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
