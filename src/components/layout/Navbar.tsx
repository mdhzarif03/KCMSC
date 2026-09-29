import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { prisma } from "@/lib/db";

async function getNavItems(
  locale: Locale,
  fallback: Array<{ href: string; label: string }>
): Promise<Array<{ href: string; label: string }>> {
  try {
    const rows = await prisma.navigationItem.findMany({
      where: { isVisible: true, parentId: null },
      orderBy: { order: "asc" }
    });
    if (rows.length === 0) return fallback;
    return rows.map((r) => ({
      href: r.href.replace(/^\//, ""),
      label: locale === "bn" ? r.labelBn : r.labelEn
    }));
  } catch {
    // DB not reachable in this environment — fall back to the static
    // list rather than rendering an empty nav bar.
    return fallback;
  }
}

/**
 * Phase 3: nav items now come from the NavigationItem model (admins can
 * add/rename/reorder/hide from /admin, once a navigation-editor screen
 * is built — that UI itself is still pending). The array below only
 * survives as the fallback for an empty/unreachable database.
 */
export async function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const fallbackItems: Array<{ href: string; label: string }> = [
    { href: "about", label: dict.nav.about },
    { href: "academics", label: dict.nav.academics },
    { href: "admissions", label: dict.nav.admissions },
    { href: "student-life", label: dict.nav.studentLife },
    { href: "clubs", label: dict.nav.clubs },
    { href: "achievements", label: dict.nav.achievements },
    { href: "facilities", label: dict.nav.facilities },
    { href: "notices", label: dict.nav.notices },
    { href: "careers", label: dict.nav.careers },
    { href: "contact", label: dict.nav.contact }
  ];
  const items = await getNavItems(locale, fallbackItems);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="font-heading text-lg font-semibold text-primary-dark">
          {dict.site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              className="text-sm text-ink transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/admissions/apply`}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:inline-block"
          >
            {dict.hero.ctaPrimary}
          </Link>
        </div>
      </div>
    </header>
  );
}
