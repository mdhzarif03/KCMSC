import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const groups = [
    { title: locale === "bn" ? "পরিচিতি" : "About", links: [[locale === "bn" ? "আমাদের গল্প" : "Our story", "about"], [locale === "bn" ? "একাডেমিক" : "Academics", "academics"]] as const },
    { title: locale === "bn" ? "ক্যাম্পাস" : "Campus", links: [[locale === "bn" ? "শিক্ষার্থী জীবন" : "Student life", "student-life"], [locale === "bn" ? "সুবিধাসমূহ" : "Facilities", "facilities"]] as const },
    { title: locale === "bn" ? "তথ্য" : "Information", links: [[locale === "bn" ? "ফলাফল" : "Results", "achievements"], [locale === "bn" ? "যোগাযোগ" : "Contact", "contact"]] as const },
  ];

  return (
    <footer className="border-t border-[#d9d8cf] bg-[#efeee7] text-[#69716b]">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 border-b border-[#d9d8cf] pb-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 text-[#124c36]">
              <span className="grid h-9 w-9 place-items-center rounded-[2px] bg-[#176b45] font-heading text-sm text-white">KC</span>
              <span className="font-heading text-[18px] font-normal">{dict.site.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-[13px] leading-6">{locale === "bn" ? "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত বাংলা ও ইংরেজি ভার্সনে শিক্ষা।" : "Education from Play Group to Grade Twelve in Bangla and English Versions."}</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {groups.map((group) => <div key={group.title}>
              <p className="text-[9px] uppercase tracking-[.16em] text-[#176b45]">{group.title}</p>
              <div className="mt-3 space-y-2">{group.links.map(([label, href]) => <Link key={href} href={`/${locale}/${href}`} className="block text-[12px] transition hover:text-[#176b45]">{label}</Link>)}</div>
            </div>)}
          </div>
        </div>
        <div className="grid gap-4 pt-6 text-[11px] leading-5 text-[#858b84] sm:grid-cols-2 lg:grid-cols-3">
          <address className="not-italic">{dict.footer.address}<br />{dict.footer.phone} · {dict.footer.mobile}<br /><a href={`mailto:${dict.footer.email}`} className="hover:text-[#176b45]">{dict.footer.email}</a></address>
          <p className="sm:text-center">{dict.footer.website}</p>
          <p className="lg:text-right">© {new Date().getFullYear()} {dict.site.shortName}. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
