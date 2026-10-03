import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getActiveCycleSafe } from "@/lib/admissions";

export const dynamic = "force-dynamic";

function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export default async function AdmissionsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.admissionsPage;
  const cycle = await getActiveCycleSafe();

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />

      <section className="kc-page-shell border-b border-[var(--kc-line)]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
            <div>
              <p className="kc-classic-kicker">{locale === "bn" ? "বর্তমান ভর্তি" : "Current admissions"}</p>
              <h2 className="mt-4 kc-section-title">
                {locale === "bn" ? "একটি ভর্তি চক্র নির্বাচন করুন" : "Choose an admission cycle"}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[var(--kc-muted)] sm:text-[15px]">
                {locale === "bn"
                  ? "আবেদন শুরু করার আগে যে ভর্তি চক্রে আবেদন করতে চান সেটি নির্বাচন করুন।"
                  : "Select the admission cycle you want to apply to before starting an application."}
              </p>
            </div>

            <div>
              {cycle ? (
                <article className="kc-card overflow-hidden">
                  <div className="border-b border-[var(--kc-line)] bg-[var(--kc-paper)] px-6 py-6 sm:px-8 sm:py-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="kc-section-label">{locale === "bn" ? "আবেদন চলছে" : "Applications open"}</p>
                        <h3 className="mt-2 font-heading text-3xl leading-tight text-[var(--kc-green-dark)] sm:text-4xl">
                          {locale === "bn" ? cycle.nameBn : cycle.nameEn}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(23,107,69,.25)] bg-[rgba(23,107,69,.05)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.12em] text-[var(--kc-green-dark)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--kc-green)]" />
                        {locale === "bn" ? "চলমান" : "Running"}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8 sm:py-7">
                    <div>
                      <p className="kc-section-label">{locale === "bn" ? "শুরু" : "Opens"}</p>
                      <p className="mt-2 text-sm text-[var(--kc-ink)]">{formatDate(cycle.opensAt, locale)}</p>
                    </div>
                    <div>
                      <p className="kc-section-label">{locale === "bn" ? "শেষ" : "Closes"}</p>
                      <p className="mt-2 text-sm text-[var(--kc-ink)]">{formatDate(cycle.closesAt, locale)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[var(--kc-line)] bg-[var(--kc-cream)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p className="text-xs leading-6 text-[var(--kc-muted)]">
                      {locale === "bn" ? "আবেদন ফর্মে যাওয়ার আগে এই চক্রের তথ্য নিশ্চিত করুন।" : "Review the cycle details before beginning your application."}
                    </p>
                    <Link href={`/${locale}/admissions/apply/${cycle.id}`} className="kc-classic-button kc-classic-button-primary shrink-0">
                      {page.applyCta} <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              ) : (
                <div className="kc-card border-dashed px-6 py-12 sm:px-8">
                  <p className="kc-section-label">{locale === "bn" ? "বর্তমানে বন্ধ" : "Currently closed"}</p>
                  <h3 className="mt-3 font-heading text-3xl text-[var(--kc-green-dark)]">
                    {page.closedBanner}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--kc-muted)]">
                    {locale === "bn"
                      ? "এই মুহূর্তে কোনো ভর্তি চক্র আবেদন গ্রহণ করছে না। নতুন চক্র প্রকাশিত হলে এখানেই দেখা যাবে।"
                      : "No admission cycle is accepting applications at the moment. A new cycle will appear here when the school opens admissions."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--kc-line)] bg-[var(--kc-paper)]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-20">
          <div>
            <p className="kc-classic-kicker">{locale === "bn" ? "শ্রেণি নির্ধারণ" : "Class placement"}</p>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-[var(--kc-green-dark)] sm:text-4xl">
              {locale === "bn" ? "সঠিক শ্রেণি সম্পর্কে জানুন" : "Understand class placement"}
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[var(--kc-muted)] sm:text-[15px]">{page.ageGroupsNote}</p>
            <Link href={`/${locale}/academics`} className="kc-classic-link mt-5">
              {locale === "bn" ? "শিক্ষাক্রম দেখুন" : "See the Academics page"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--kc-green-dark)] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-7 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <p className="kc-light-kicker">{locale === "bn" ? "সহায়তা" : "Need help"}</p>
            <h2 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">{page.onlinePortalNote}</h2>
          </div>
          <a href={`mailto:${dict.footer.email}`} className="kc-classic-button kc-classic-button-light shrink-0">
            {page.contactCta}
          </a>
        </div>
      </section>
    </>
  );
}
