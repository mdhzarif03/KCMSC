import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export default function TrackPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const page = getDictionary(locale).admissionsTrackPage;
  return <><PageHeader heading={page.heading} intro={locale === "bn" ? "এই ভর্তি ব্যবস্থায় কোনো ট্র্যাকিং নম্বর বা ফোন-ভিত্তিক স্ট্যাটাস সিস্টেম নেই।" : "This admission system does not use tracking numbers or phone-based status lookup."}/><section className="mx-auto max-w-content px-6 py-16"><div className="max-w-xl rounded-lg border border-border bg-surface p-6"><p className="text-sm text-ink-muted">{locale === "bn" ? "আবেদন জমা দেওয়ার পর আপনার আবেদন ফর্ম ডাউনলোড করে সংরক্ষণ করুন।" : "After submitting, download and keep your application form."}</p></div></section></>;
}
