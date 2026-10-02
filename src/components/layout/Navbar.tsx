import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavGroup = {
  label: string;
  links: Array<{ href: string; label: string }>;
};

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const groups: NavGroup[] = [
    {
      label: locale === "bn" ? "পরিচিতি" : "About",
      links: [
        { href: "about", label: locale === "bn" ? "আমাদের গল্প" : "Our Story" },
        { href: "about#leadership", label: locale === "bn" ? "নেতৃত্ব" : "Leadership" },
      ],
    },
    {
      label: locale === "bn" ? "একাডেমিক" : "Academics",
      links: [
        { href: "academics", label: locale === "bn" ? "একাডেমিক কাঠামো" : "Academic Structure" },
        { href: "achievements", label: locale === "bn" ? "ফলাফল ও অর্জন" : "Results & Achievements" },
      ],
    },
    {
      label: locale === "bn" ? "শিক্ষাজীবন" : "Student Life",
      links: [
        { href: "student-life", label: locale === "bn" ? "শিক্ষাজীবন" : "Student Life" },
        { href: "clubs", label: locale === "bn" ? "ক্লাব ও কার্যক্রম" : "Clubs & Activities" },
      ],
    },
    {
      label: locale === "bn" ? "ক্যাম্পাস" : "Campus",
      links: [
        { href: "facilities", label: locale === "bn" ? "সুবিধাসমূহ" : "Facilities" },
      ],
    },
    {
      label: locale === "bn" ? "তথ্য" : "Information",
      links: [
        { href: "notices", label: locale === "bn" ? "নোটিশ" : "Notices" },
        { href: "careers", label: locale === "bn" ? "ক্যারিয়ার" : "Careers" },
        { href: "contact", label: locale === "bn" ? "যোগাযোগ" : "Contact" },
      ],
    },
  ];

  const admissionsLabel = locale === "bn" ? "ভর্তি" : dict.nav.admissions;

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8d1c3] bg-[#f6f2e9]/95 text-[#183d2e] backdrop-blur">
      <div className="hidden border-b border-[#285340] bg-[#183d2e] text-[#eee8da] md:block">
        <div className="mx-auto flex h-7 max-w-[1320px] items-center justify-between px-6 text-[9px] font-semibold uppercase tracking-[.15em] lg:px-8">
          <span>275 Prembagan · Dakshinkhan · Dhaka</span>
          <span>Sun–Thu · 7:45 AM–2:30 PM</span>
        </div>
      </div>

      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:h-[74px] lg:px-8">
        <Link href={`/${locale}`} className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label={dict.site.name}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#183d2e] text-white">
            <span className="font-heading text-base leading-none">KC</span>
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate font-heading text-[16px] font-semibold leading-tight sm:text-[17px]">K C Model School</span>
            <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-[.18em] text-[#7c827b]">& College</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {groups.map((group) => (
            <details key={group.label} className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-[11px] font-bold text-[#4f5c54] transition hover:bg-[#ebe5d9] hover:text-[#183d2e] [&::-webkit-details-marker]:hidden">
                {group.label}
                <span className="text-[10px] text-[#9a7d37] transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="absolute left-0 top-full mt-1 min-w-[210px] overflow-hidden rounded-md border border-[#d3cbbb] bg-[#fbf8f1] p-1.5 shadow-[0_18px_45px_rgba(24,61,46,.12)]">
                {group.links.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}/${item.href}`}
                    className="block rounded px-3 py-2.5 text-[11px] font-semibold text-[#56625a] transition hover:bg-[#eee8dc] hover:text-[#183d2e]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/admissions/apply`}
            className="hidden rounded-md bg-[#183d2e] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#b69b54] sm:inline-flex"
          >
            {admissionsLabel}
          </Link>

          <details className="relative lg:hidden">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-[#cfc7b8] bg-[#f8f4eb] text-[#183d2e] [&::-webkit-details-marker]:hidden">
              <span className="flex w-4 flex-col gap-1" aria-hidden="true">
                <i className="h-px w-full bg-current" />
                <i className="h-px w-full bg-current" />
                <i className="h-px w-full bg-current" />
              </span>
              <span className="sr-only">Menu</span>
            </summary>
            <div className="absolute right-0 top-12 z-50 w-[min(92vw,360px)] overflow-hidden rounded-lg border border-[#d3cbbb] bg-[#fbf8f1] p-2 shadow-[0_20px_55px_rgba(24,61,46,.16)]">
              <Link href={`/${locale}`} className="block rounded-md px-3 py-3 text-sm font-semibold text-[#183d2e] hover:bg-[#eee8dc]">
                {dict.nav.home}
              </Link>
              {groups.map((group) => (
                <details key={group.label} className="border-t border-[#e0d9cd]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 text-sm font-semibold text-[#4f5c54] [&::-webkit-details-marker]:hidden">
                    {group.label}<span className="text-[#9a7d37]">⌄</span>
                  </summary>
                  <div className="pb-2 pl-3">
                    {group.links.map((item) => (
                      <Link key={item.href} href={`/${locale}/${item.href}`} className="block rounded-md px-3 py-2 text-xs text-[#68716a] hover:bg-[#eee8dc] hover:text-[#183d2e]">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
              <Link href={`/${locale}/admissions/apply`} className="mt-2 block rounded-md bg-[#183d2e] px-3 py-3 text-center text-[10px] font-bold uppercase tracking-[.12em] text-white">
                {admissionsLabel}
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
