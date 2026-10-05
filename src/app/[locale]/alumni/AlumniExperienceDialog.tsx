"use client";

import { useEffect, useState } from "react";

export function AlumniExperienceDialog({
  text,
  bn,
}: {
  text: string;
  bn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const needsExpansion = text.trim().length > 280;

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
      <p className="max-w-3xl font-heading text-[clamp(1.7rem,3vw,2.65rem)] leading-[1.16] tracking-[-.025em] text-[#124c36] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
        {text}
      </p>

      {needsExpansion ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#176b45] transition hover:text-[#124c36]"
        >
          {bn ? "পুরো অভিজ্ঞতা পড়ুন" : "Read full experience"}
          <span aria-hidden="true">→</span>
        </button>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10251c]/55 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={bn ? "পূর্ণ অভিজ্ঞতা" : "Full alumni experience"}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#d9d8cf] bg-[#fffdf8] shadow-[0_30px_90px_rgba(18,76,54,0.22)]"
          >
            <div className="flex items-center justify-between border-b border-[#d9d8cf] px-5 py-4 sm:px-7">
              <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#b59a4a]">
                {bn ? "প্রাক্তন শিক্ষার্থীর অভিজ্ঞতা" : "Alumni experience"}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={bn ? "বন্ধ করুন" : "Close"}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#d9d8cf] text-lg leading-none text-[#69716b] transition hover:border-[#176b45] hover:bg-[#f3f1e9] hover:text-[#124c36]"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(88vh-74px)] overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
              <span className="font-heading text-5xl leading-none text-[#b59a4a]">“</span>
              <p className="mt-1 whitespace-pre-wrap font-heading text-[clamp(1.45rem,2.5vw,2.2rem)] leading-[1.35] tracking-[-.02em] text-[#124c36]">
                {text}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
