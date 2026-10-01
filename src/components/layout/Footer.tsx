import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const links = [
    ["About", "about"],
    ["Academics", "academics"],
    ["Admissions", "admissions"],
    ["Student Life", "student-life"],
    ["Facilities", "facilities"],
    ["Achievements", "achievements"],
    ["Notices", "notices"],
    ["Contact", "contact"],
  ] as const;

  return (
    <footer className="bg-[#102f24] text-[#eee8da]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-12 lg:py-18">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center border border-white/30 text-white">
                <span className="font-heading text-lg">KC</span>
              </span>
              <div>
                <p className="font-heading text-xl text-white">{dict.site.name}</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[.22em] text-white/45">{dict.site.tagline}</p>
              </div>
            </div>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60">
              Rooted in heritage and prepared for the future, KCMSC serves students from Play Group to Grade Twelve in Bangla and English versions of the national curriculum.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 lg:grid-cols-2">
            {links.map(([label, href]) => (
              <Link key={href} href={`/${locale}/${href}`} className="text-xs text-white/60 transition hover:text-[#d6bd72]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-7 pt-7 text-xs text-white/45 sm:grid-cols-2 lg:grid-cols-3">
          <address className="not-italic leading-6">
            {dict.footer.address}<br />
            {dict.footer.phone} · {dict.footer.mobile}<br />
            <a href={`mailto:${dict.footer.email}`} className="transition hover:text-[#d6bd72]">{dict.footer.email}</a>
          </address>
          <div className="sm:text-center">
            <p>{dict.footer.website}</p>
            <Link href="/admin/login" className="mt-2 inline-block transition hover:text-[#d6bd72]">{dict.footer.adminLogin}</Link>
          </div>
          <p className="lg:text-right">© {new Date().getFullYear()} {dict.site.shortName}. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
