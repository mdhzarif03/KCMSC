
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

type Item = { href: string; label: string };

export function MobileNav({
  locale,
  items,
  ctaLabel
}: {
  locale: Locale;
  items: Item[];
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary-dark"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="flex w-4 flex-col gap-1.5">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg"
        >
          <nav className="mx-auto max-w-content px-6 py-4" aria-label="Mobile">
            <div className="grid gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    pathname === `/${locale}/${item.href}`
                      ? "bg-surface font-medium text-primary-dark"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/admissions/apply`}
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
