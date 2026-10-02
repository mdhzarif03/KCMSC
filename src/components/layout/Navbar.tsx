"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type LinkItem = { href: string; label: string; note?: string };

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const text = (en: string, bn: string) => (locale === "bn" ? bn : en);

  const mainLinks: LinkItem[] = [
    { href: "about", label: text("About", "পরিচিতি") },
    { href: "academics", label: text("Academics", "একাডেমিক") },
    { href: "student-life", label: text("Student life", "শিক্ষার্থী জীবন") },
    { href: "facilities", label: text("Campus", "ক্যাম্পাস") },
  ];

  const menuGroups = [
    {
      title: text("School", "বিদ্যালয়"),
      links: [
        { href: "about", label: text("Our story", "আমাদের গল্প"), note: text("Who we are", "আমাদের পরিচয়") },
        { href: "academics", label: text("Academics", "একাডেমিক"), note: text("Learning & teaching", "পাঠদান ও শিক্ষা") },
        { href: "achievements", label: text("Results & achievements", "ফলাফল ও অর্জন"), note: text("Recent results", "সাম্প্রতিক ফলাফল") },
      ],
    },
    {
      title: text("Campus life", "ক্যাম্পাস জীবন"),
      links: [
        { href: "student-life", label: text("Student life", "শিক্ষার্থী জীবন"), note: text("Everyday school life", "দৈনন্দিন স্কুলজীবন") },
        { href: "clubs", label: text("Clubs & activities", "ক্লাব ও কার্যক্রম"), note: text("Beyond the classroom", "শ্রেণিকক্ষের বাইরেও") },
        { href: "facilities", label: text("Facilities", "সুবিধাসমূহ"), note: text("Spaces & resources", "ক্যাম্পাস ও সুবিধা") },
      ],
    },
    {
      title: text("Information", "তথ্য"),
      links: [
        { href: "notices", label: text("Notices", "নোটিশ"), note: text("Latest announcements", "সাম্প্রতিক ঘোষণা") },
        { href: "careers", label: text("Careers", "ক্যারিয়ার"), note: text("Work with KCMSC", "KCMSC-এ কাজ") },
        { href: "contact", label: text("Contact", "যোগাযোগ"), note: text("Find & reach us", "যোগাযোগের তথ্য") },
      ],
    },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="kc-site-header">
        <div className="kc-header-inner">
          <Link href={`/${locale}`} className="kc-brand" onClick={close} aria-label={dict.site.name}>
            <span className="kc-brand-mark">KC</span>
            <span className="kc-brand-copy">
              <strong>K C Model School</strong>
              <small>&amp; College</small>
            </span>
          </Link>

          <nav className="kc-desktop-nav" aria-label="Primary">
            {mainLinks.map((item) => (
              <Link key={item.href} href={`/${locale}/${item.href}`} className="kc-header-link" onClick={close}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="kc-header-actions">
            <LanguageSwitcher current={locale} />
            <button
              type="button"
              className={`kc-menu-trigger ${menuOpen ? "is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="kc-main-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span>{text("Menu", "মেনু")}</span>
              <i aria-hidden="true"><b /><b /></i>
            </button>
            <Link href={`/${locale}/admissions/apply`} className="kc-admissions-link" onClick={close}>
              {locale === "bn" ? "ভর্তি" : dict.nav.admissions}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <div className={`kc-menu-backdrop ${menuOpen ? "is-open" : ""}`} aria-hidden="true" onClick={close} />

      <aside id="kc-main-menu" className={`kc-menu-panel ${menuOpen ? "is-open" : ""}`} aria-label={text("Site menu", "সাইট মেনু")} aria-hidden={!menuOpen}>
        <div className="kc-menu-panel-top">
          <div>
            <span className="kc-menu-eyebrow">{text("KCMSC", "কেসিএমএসসি")}</span>
            <h2>{text("Explore the school", "বিদ্যালয় সম্পর্কে জানুন")}</h2>
          </div>
          <button type="button" className="kc-menu-close" onClick={close} aria-label={text("Close menu", "মেনু বন্ধ করুন")}>×</button>
        </div>

        <div className="kc-menu-groups">
          {menuGroups.map((group) => (
            <section key={group.title} className="kc-menu-group">
              <p>{group.title}</p>
              {group.links.map((item) => (
                <Link key={item.href} href={`/${locale}/${item.href}`} onClick={close} className="kc-menu-item">
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                  </span>
                  <em aria-hidden="true">↗</em>
                </Link>
              ))}
            </section>
          ))}
        </div>

        <div className="kc-menu-footer">
          <Link href={`/${locale}/admissions`} onClick={close}>{text("Admissions", "ভর্তি")}</Link>
          <Link href={`/${locale}/contact`} onClick={close}>{text("Contact", "যোগাযোগ")}</Link>
        </div>
      </aside>
    </>
  );
}
