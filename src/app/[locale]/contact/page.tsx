import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.contactPage;

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />
      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <address className="not-italic">
            <dl className="space-y-4 text-ink">
              <div>
                <dt className="text-sm text-ink-muted">
                  {locale === "bn" ? "ঠিকানা" : "Address"}
                </dt>
                <dd>{dict.footer.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">
                  {locale === "bn" ? "ফোন" : "Phone"}
                </dt>
                <dd>{dict.footer.phone}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">
                  {locale === "bn" ? "মোবাইল" : "Mobile"}
                </dt>
                <dd>{dict.footer.mobile}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Email</dt>
                <dd>
                  <a href={`mailto:${dict.footer.email}`} className="text-primary hover:underline">
                    {dict.footer.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Website</dt>
                <dd>{dict.footer.website}</dd>
              </div>
            </dl>
          </address>

          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-sm text-ink-muted">
              {locale === "bn"
                ? "উত্তরার নিকটে দক্ষিণখানে অবস্থিত ক্যাম্পাসটি গুগল ম্যাপে দেখুন।"
                : "See the campus location — near Uttara, Dakshinkhan — on Google Maps."}
            </p>
            <a
              href={page.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
            >
              {page.mapLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
