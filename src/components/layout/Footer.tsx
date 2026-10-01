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
  ] as const;

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-xs font-bold">KC</span>
              <div>
                <p className="font-heading text-xl">{dict.site.name}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[.25em] text-white/45">{dict.site.tagline}</p>
              </div>
            </div>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60">
              Rooted in heritage, ready for the future. A bilingual learning community serving students from Play Group to Grade Twelve in Dakshinkhan, Dhaka.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {links.map(([label, href]) => (
              <Link key={href} href={`/${locale}/${href}`} className="text-xs text-white/65 transition hover:text-brass">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-6 text-xs text-white/45 sm:grid-cols-2 lg:grid-cols-3">
          <address className="not-italic leading-6">
            {dict.footer.address}<br />
            {dict.footer.phone} · {dict.footer.mobile}<br />
            <a href={`mailto:${dict.footer.email}`} className="transition hover:text-brass">{dict.footer.email}</a>
          </address>
          <div className="sm:text-center">
            <p>{dict.footer.website}</p>
            <Link href="/admin/login" className="mt-2 inline-block transition hover:text-brass">{dict.footer.adminLogin}</Link>
          </div>
          <p className="lg:text-right">© {new Date().getFullYear()} {dict.site.shortName}. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
