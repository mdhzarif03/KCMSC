import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ApplicationSuccessPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { ref?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.admissionsSuccessPage;

  return (
    <>
      <PageHeader heading={page.heading} intro={page.body} />
      <section className="mx-auto max-w-content px-6 py-16">
        <div className="max-w-md rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-sm text-ink-muted">{page.referenceLabel}</p>
          <p className="mt-2 font-heading text-2xl tracking-wide text-primary-dark">
            {searchParams.ref ?? "—"}
          </p>
          <p className="mt-4 text-xs text-ink-muted">{page.guardianPhoneNote}</p>
          <Link
            href={`/${locale}/admissions/track`}
            className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
          >
            {page.trackCta}
          </Link>
        </div>
      </section>
    </>
  );
}
