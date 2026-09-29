import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { prisma } from "@/lib/db";

type NavItem = {
  href: string;
  label: string;
};

async function getNavItems(
  locale: Locale,
  fallback: NavItem[],
): Promise<NavItem[]> {
  try {
    const rows = await prisma.navigationItem.findMany({
      where: {
        isVisible: true,
        parentId: null,
      },
      orderBy: {
        order: "asc",
      },
    });

    if (rows.length === 0) {
      return fallback;
    }

    return rows.map((row) => ({
      href: row.href.replace(/^\//, ""),
      label: locale === "bn" ? row.labelBn : row.labelEn,
    }));
  } catch {
    return fallback;
  }
}

export async function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const fallbackItems: NavItem[] = [
    {
      href: "about",
      label: dict.nav.about,
    },
    {
      href: "academics",
      label: dict.nav.academics,
    },
    {
      href: "admissions",
      label: dict.nav.admissions,
    },
    {
      href: "student-life",
      label: dict.nav.studentLife,
    },
    {
      href: "facilities",
      label: "Campus",
    },
    {
      href: "clubs",
      label: dict.nav.clubs,
    },
    {
      href: "achievements",
      label: dict.nav.achievements,
    },
    {
      href: "notices",
      label: dict.nav.notices,
    },
    {
      href: "careers",
      label: dict.nav.careers,
    },
    {
      href: "contact",
      label: dict.nav.contact,
    },
  ];

  const items = await getNavItems(locale, fallbackItems);

  /*
   * Keep the visible navbar intentionally minimal.
   *
   * Visible:
   * About
   * Academics
   * Admissions
   * Student Life
   * Campus
   * More
   *
   * Secondary pages go inside More.
   */

  const moreRoutes = new Set([
    "clubs",
    "achievements",
    "notices",
    "careers",
    "contact",
  ]);

  const primaryItems = items.filter((item) => !moreRoutes.has(item.href));

  const moreItems = items.filter((item) => moreRoutes.has(item.href));

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center px-6 lg:px-10">
        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          href={`/${locale}`}
          className="
            shrink-0
            font-heading
            text-[24px]
            font-semibold
            tracking-[-0.04em]
            text-white
          "
        >
          {dict.site.shortName}
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          aria-label="Primary navigation"
          className="
            hidden
            flex-1
            items-center
            justify-center
            lg:flex
          "
        >
          <div className="flex items-center gap-7">
            {primaryItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="
                  text-[13px]
                  font-medium
                  text-white/85
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                {item.label}
              </Link>
            ))}

            {/* =================================================
                MORE MENU
            ================================================== */}

            {moreItems.length > 0 && (
              <details className="group relative">
                <summary
                  className="
                    flex
                    cursor-pointer
                    list-none
                    items-center
                    gap-1
                    text-[13px]
                    font-medium
                    text-white/85
                    transition-colors
                    hover:text-white
                  "
                >
                  More
                  <span
                    className="
                      text-[10px]
                      transition-transform
                      duration-200
                      group-open:rotate-180
                    "
                  >
                    ▾
                  </span>
                </summary>

                <div
                  className="
                    absolute
                    right-0
                    top-8
                    w-48
                    rounded-xl
                    border
                    border-white/10
                    bg-[#103f31]/95
                    p-2
                    shadow-2xl
                    backdrop-blur-xl
                  "
                >
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}/${item.href}`}
                      className="
                        block
                        rounded-lg
                        px-3
                        py-2.5
                        text-[13px]
                        text-white/80
                        transition-colors
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            )}
          </div>
        </nav>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="ml-auto flex items-center gap-3">
          {/* Language */}
          <div className="text-white">
            <LanguageSwitcher current={locale} />
          </div>

          {/*

            IMPORTANT:

            NO "Explore Admissions" BUTTON HERE.

            The admissions CTA belongs to the HERO,
            not the navbar.

          */}
        </div>
      </div>
    </header>
  );
}
