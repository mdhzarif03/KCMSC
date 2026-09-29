"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${locale}/${rest}`);
  }

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={`rounded-full px-3 py-1 transition-colors ${
            locale === current
              ? "bg-primary text-white"
              : "text-ink-muted hover:bg-surface"
          }`}
        >
          {locale === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}
