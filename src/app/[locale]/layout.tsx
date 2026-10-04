import type { Metadata } from "next";
import { isLocale, defaultLocale, getDictionary, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";

const banglaSans = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla"
});

const banglaSerif = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla-heading"
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.site.name,
    description: dict.about.body
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <div
      lang={locale}
      className={locale === "bn" ? `font-bangla ${banglaSans.variable} ${banglaSerif.variable}` : "font-sans"}
    >
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
