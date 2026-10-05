"use client";

import { useEffect } from "react";

export function AlumniExperienceDialog({
  open,
  name,
  message,
  label,
  closeLabel,
}: {
  open: boolean;
  name: string;
  message: string;
  label: string;
  closeLabel: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.dispatchEvent(new CustomEvent("kcmsc-close-alumni-dialog"));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10251b]/60 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          window.dispatchEvent(new CustomEvent("kcmsc-close-alumni-dialog"));
        }
      }}
    >
      <div className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#d9d8cf] bg-[#fffdf8] shadow-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-[#d9d8cf] px-5 py-5 sm:px-7">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b59a4a]">{label}</p>
            <h2 className="mt-2 font-heading text-2xl leading-tight text-[#124c36] sm:text-3xl">{name}</h2>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("kcmsc-close-alumni-dialog"))}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d9d8cf] text-xl text-[#69716b] transition hover:bg-[#f0eee7] hover:text-[#124c36]"
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>
        <div className="max-h-[calc(88vh-96px)] overflow-y-auto px-5 py-7 sm:px-7 sm:py-9">
          <span className="font-heading text-5xl leading-none text-[#b59a4a]">“</span>
          <p className="mt-1 whitespace-pre-line font-heading text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.55] tracking-[-.015em] text-[#124c36]">{message}</p>
        </div>
      </div>
    </div>
  );
}
