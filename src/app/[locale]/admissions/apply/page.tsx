import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getActiveCycleSafe } from "@/lib/admissions";
import { ApplicationForm } from "./ApplicationForm";
import { createApplicationAction } from "./actions";

// Cycle open/closed is live state — never prerender this page.
export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { error?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.admissionsApplyPage;
  const activeCycle = await getActiveCycleSafe();

  if (!activeCycle) {
    return (
      <>
        <PageHeader heading={page.heading} />
        <section className="mx-auto max-w-content px-6 py-16">
          <div className="rounded-lg border-2 border-dashed border-border p-10 text-center">
            <h2 className="font-medium text-ink">{page.closedHeading}</h2>
            <p className="mt-2 text-sm text-ink-muted">{page.closedBody}</p>
          </div>
        </section>
      </>
    );
  }

  const boundAction = createApplicationAction.bind(null, locale);

  return (
    <>
      <PageHeader
        heading={page.heading}
        intro={locale === "bn" ? activeCycle.nameBn : activeCycle.nameEn}
      />
      <section className="mx-auto max-w-content px-6 py-16">
        {searchParams.error === "invalid" ? (
          <p className="mb-6 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
            {locale === "bn"
              ? "একটি ত্রুটি হয়েছে। অনুগ্রহ করে সমস্ত ক্ষেত্র পূরণ করে আবার চেষ্টা করুন।"
              : "Something was missing or invalid. Please check every field and try again."}
          </p>
        ) : null}
        <ApplicationForm
          action={boundAction}
          sections={page.sections}
          fields={page.fields}
          submitLabel={page.submit}
          submittingLabel={page.submitting}
        />
      </section>
    </>
  );
}
