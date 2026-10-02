"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary, type Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const bn = locale === "bn";
  const links = [
    ["about", bn ? "পরিচিতি" : "About"],
    ["academics", bn ? "একাডেমিক" : "Academics"],
    ["student-life", bn ? "শিক্ষার্থী জীবন" : "Student life"],
    ["facilities", bn ? "ক্যাম্পাস" : "Campus"],
  ] as const;
  const extra = [
    ["achievements", bn ? "ফলাফল ও অর্জন" : "Results & achievements"],
    ["clubs", bn ? "ক্লাব ও কার্যক্রম" : "Clubs & activities"],
    ["notices", bn ? "নোটিশ" : "Notices"],
    ["contact", bn ? "যোগাযোগ" : "Contact"],
    ["careers", bn ? "ক্যারিয়ার" : "Careers"],
  ] as const;

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className="kc-header">
      <div className="kc-header-top">
        <div className="kc-header-top-inner">
          <span>{bn ? "২৭৫ প্রেমবাগান · দক্ষিণখান · ঢাকা" : "275 Prembagan · Dakshinkhan · Dhaka"}</span>
          <span>{bn ? "রবি–বৃহস্পতি · ৭:৪৫–২:৩০" : "Sun–Thu · 7:45 AM–2:30 PM"}</span>
        </div>
      </div>
      <div className="kc-header-main">
        <Link href={`/${locale}`} className="kc-logo" aria-label={dict.site.name} onClick={() => setOpen(false)}>
          <span className="kc-logo-mark">KC</span>
          <span className="kc-logo-text"><strong>K C Model School</strong><small>&amp; College</small></span>
        </Link>

        <nav className="kc-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={`/${locale}/${href}`} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>

        <div className="kc-header-actions">
          <LanguageSwitcher current={locale} />
          <button type="button" className={`kc-menu-button ${open ? "active" : ""}`} onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="kc-drawer">
            <span>{bn ? "মেনু" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
          </button>
          <Link href={`/${locale}/admissions/apply`} className="kc-apply-button" onClick={() => setOpen(false)}>{bn ? "ভর্তি" : "Admissions"}<span>↗</span></Link>
        </div>
      </div>

      <div className={`kc-drawer-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside id="kc-drawer" className={`kc-drawer ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="kc-drawer-head">
          <div><span className="kc-overline">KCMSC</span><h2>{bn ? "বিদ্যালয় ঘুরে দেখুন" : "Explore KCMSC"}</h2></div>
          <button type="button" onClick={() => setOpen(false)} aria-label={bn ? "বন্ধ" : "Close"}>×</button>
        </div>
        <div className="kc-drawer-grid">
          <div><span className="kc-overline">{bn ? "প্রধান পাতা" : "School"}</span>{links.map(([href, label], i) => <Link key={href} href={`/${locale}/${href}`} onClick={() => setOpen(false)}><em>0{i + 1}</em><span>{label}</span><b>↗</b></Link>)}</div>
          <div><span className="kc-overline">{bn ? "আরও" : "More"}</span>{extra.map(([href, label], i) => <Link key={href} href={`/${locale}/${href}`} onClick={() => setOpen(false)}><em>0{i + 1}</em><span>{label}</span><b>↗</b></Link>)}</div>
        </div>
        <div className="kc-drawer-bottom"><span>{bn ? "প্রশ্ন আছে?" : "Need to reach us?"}</span><Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>{bn ? "যোগাযোগ →" : "Contact →"}</Link></div>
      </aside>
    </header>
  );
}
