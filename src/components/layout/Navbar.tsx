import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { prisma } from "@/lib/db";

async function getNavItems(
  locale: Locale,
  fallback: Array<{ href: string; label: string }>,
): Promise<Array<{ href: string; label: string }>> {
  try {
    const rows = await prisma.navigationItem.findMany({
      where: { isVisible: true, parentId: null },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return fallback;
    return rows.map((r) => ({
      href: r.href.replace(/^\//, ""),
      label: locale === "bn" ? r.labelBn : r.labelEn,
    }));
  } catch {
    return fallback;
  }
}

export async function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const fallbackItems: Array<{ href: string; label: string }> = [
    { href: "about", label: dict.nav.about },
    { href: "academics", label: dict.nav.academics },
    { href: "admissions", label: dict.nav.admissions },
    { href: "student-life", label: dict.nav.studentLife },
    { href: "facilities", label: dict.nav.facilities },
    { href: "achievements", label: dict.nav.achievements },
    { href: "notices", label: dict.nav.notices },
    { href: "contact", label: dict.nav.contact },
  ];
  const items = await getNavItems(locale, fallbackItems);

  return (
    <header className="relative z-50 bg-[#f5f1e8] text-[#183d2e]">
      <div className="border-b border-[#d7d1c4] bg-[#183d2e] text-[#eee8da]">
        <div className="mx-auto flex min-h-8 max-w-[1440px] items-center justify-between gap-4 px-6 text-[9px] font-semibold uppercase tracking-[.16em] sm:px-10 lg:px-12">
          <span className="hidden sm:inline">275 Prembagan · Dakshinkhan · Dhaka</span>
          <span className="sm:hidden">Dakshinkhan · Dhaka</span>
          <span>Sun–Thu · 7:45 AM–2:30 PM</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-[88px] items-center border-b border-[#d7d1c4]">
          <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#183d2e] text-[#183d2e]">
              <span className="font-heading text-lg leading-none">KC</span>
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-[17px] font-semibold leading-tight text-[#183d2e] sm:text-[19px]">K C Model School</span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.2em] text-[#7a8179]">& College</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-5 lg:flex xl:gap-7">
            {items.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="text-[11px] font-semibold text-[#58625a] transition-colors hover:text-[#183d2e]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-6">
            <LanguageSwitcher current={locale} />
            <Link href={`/${locale}/admissions/apply`} className="hidden border border-[#183d2e] bg-[#183d2e] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#b69b54] hover:border-[#b69b54] sm:inline-flex">
              {dict.hero.ctaPrimary}
            </Link>
            <details className="relative lg:hidden">
              <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center border border-[#cfc7b8] text-[#183d2e] [&::-webkit-details-marker]:hidden">
                <span className="flex w-4 flex-col gap-1" aria-hidden="true"><i className="h-px w-full bg-current" /><i className="h-px w-full bg-current" /><i className="h-px w-full bg-current" /></span>
                <span className="sr-only">Menu</span>
              </summary>
              <div className="absolute right-0 top-12 w-64 border border-[#cfc7b8] bg-[#f5f1e8] p-3 shadow-xl">
                {items.map((item) => (
                  <Link key={item.href} href={`/${locale}/${item.href}`} className="block border-b border-[#ded8cc] px-3 py-3 text-xs font-semibold text-[#4e5a51] last:border-b-0 hover:text-[#183d2e]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
