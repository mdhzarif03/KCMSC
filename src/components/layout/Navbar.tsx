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
    <header className="relative z-50 border-b border-border/80 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1500px] items-center gap-6 px-5 sm:px-8 lg:px-12">
        <Link href={`/${locale}`} className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary text-xs font-bold tracking-tight text-white shadow-sm">
            KC
          </span>
          <span className="min-w-0">
            <span className="block truncate font-heading text-base font-semibold leading-none text-primary-dark sm:text-lg">K C Model School</span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.23em] text-ink-muted">& College</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-5 xl:flex">
          {items.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              className="text-[12px] font-medium text-ink-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-5">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/admissions/apply`}
            className="hidden rounded-full bg-primary px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-primary-dark sm:inline-flex"
          >
            {dict.hero.ctaPrimary}
          </Link>
        </div>
      </div>
    </header>
  );
}
