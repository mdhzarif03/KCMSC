"use client";

import { useEffect, useState } from "react";

export default function AlumniExperienceDialog({
  name,
  message,
  label,
  locale,
}: {
  name: string;
  message: string;
  label: string;
  locale: "en" | "bn";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 border-b border-[#176b45] pb-1 text-sm font-medium text-[#176b45] transition hover:border-[#b59a4a] hover:text-[#124c36]"
      >
        {label}<span aria-hidden="true">↗</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10251c]/65 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={name}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-[#d9d8cf] bg-[#fffdf8] px-6 py-8 shadow-2xl sm:px-10 sm:py-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={locale === "bn" ? "বন্ধ করুন" : "Close"}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#d9d8cf] text-lg text-[#69716b] transition hover:bg-[#f1eee5] hover:text-[#124c36]"
            >
              ×
            </button>
            <span className="kc-classic-kicker">{locale === "bn" ? "সম্পূর্ণ অভিজ্ঞতা" : "Full experience"}</span>
            <h2 className="mt-4 pr-10 font-heading text-3xl tracking-[-.03em] text-[#124c36] sm:text-4xl">{name}</h2>
            <div className="mt-7 border-t border-[#d9d8cf] pt-7">
              <p className="whitespace-pre-line font-heading text-lg leading-8 text-[#424a45] sm:text-xl sm:leading-9">{message}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
