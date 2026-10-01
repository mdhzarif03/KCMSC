import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { LandingExperience } from "@/components/home/LandingExperience";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;

  return <LandingExperience locale={locale} />;
}
