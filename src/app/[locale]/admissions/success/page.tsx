import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ApplicationSuccessPage({ params, searchParams }: { params: { locale: string }; searchParams: { application?: string; download?: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale; const page = getDictionary(locale).admissionsSuccessPage;
  return <><PageHeader heading={page.heading} intro={locale === "bn" ? "আপনার আবেদন সফলভাবে জমা হয়েছে। আবেদন ফর্মটি ডাউনলোড করে সংরক্ষণ করুন।" : "Your application has been submitted successfully. Download and keep a copy of your application form."}/><section className="mx-auto max-w-content px-6 py-16"><div className="max-w-md rounded-lg border border-primary/30 bg-primary/5 p-6 text-center"><p className="text-sm text-ink-muted">Your application has been submitted successfully.</p>{searchParams.application && searchParams.download ? <a href={`/api/admissions/${encodeURIComponent(searchParams.application)}/form?token=${encodeURIComponent(searchParams.download)}`} className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark">Download application form</a> : null}</div></section></>;
}
