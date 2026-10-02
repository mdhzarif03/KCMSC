import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const groups = [
    {
      title: locale === "bn" ? "পরিচিতি" : "About",
      links: [[locale === "bn" ? "আমাদের গল্প" : "Our Story", "about"], [locale === "bn" ? "নেতৃত্ব" : "Leadership", "about#leadership"]] as const,
    },
    {
      title: locale === "bn" ? "শিক্ষাজীবন" : "School life",
      links: [[locale === "bn" ? "একাডেমিক" : "Academics", "academics"], [locale === "bn" ? "শিক্ষাজীবন" : "Student Life", "student-life"], [locale === "bn" ? "সুবিধাসমূহ" : "Facilities", "facilities"]] as const,
    },
    {
      title: locale === "bn" ? "তথ্য" : "Information",
      links: [[locale === "bn" ? "ভর্তি" : "Admissions", "admissions"], [locale === "bn" ? "নোটিশ" : "Notices", "notices"], [locale === "bn" ? "যোগাযোগ" : "Contact", "contact"]] as const,
    },
  ];

  return (
    <footer className="bg-[#102f24] text-[#eee8da]">
      <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-sm border border-white/25 text-white">
                <span className="font-heading text-base">KC</span>
              </span>
              <span>
                <span className="block font-heading text-lg text-white">{dict.site.name}</span>
                <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[.2em] text-white/40">{dict.site.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
              {locale === "bn"
                ? "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত বাংলা ও ইংরেজি ভার্সনে শিক্ষার পরিবেশ।"
                : "Education from Play Group to Grade Twelve in Bangla and English Versions."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#d6bd72]">{group.title}</p>
                <div className="mt-3 space-y-2">
                  {group.links.map(([label, href]) => (
                    <Link key={href} href={`/${locale}/${href}`} className="block text-xs text-white/55 transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 pt-6 text-[11px] leading-5 text-white/40 sm:grid-cols-2 lg:grid-cols-3">
          <address className="not-italic">
            {dict.footer.address}<br />
            {dict.footer.phone} · {dict.footer.mobile}<br />
            <a href={`mailto:${dict.footer.email}`} className="transition hover:text-white">{dict.footer.email}</a>
          </address>
          <p className="sm:text-center">{dict.footer.website}</p>
          <p className="lg:text-right">© {new Date().getFullYear()} {dict.site.shortName}. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
