"use client";

import { useEffect, useState } from "react";
import { AlumniExperienceDialog } from "./AlumniExperienceDialog";

export function AlumniMessageCard({
  name,
  preview,
  message,
  readMore,
  closeLabel,
  label,
}: {
  name: string;
  preview: string;
  message: string;
  readMore: string;
  closeLabel: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("kcmsc-close-alumni-dialog", close);
    return () => window.removeEventListener("kcmsc-close-alumni-dialog", close);
  }, []);

  return (
    <>
      <div>
        <span className="font-heading text-5xl leading-none text-[#b59a4a]">“</span>
        <p className="-mt-2 max-w-3xl whitespace-pre-line font-heading text-[clamp(1.7rem,3vw,2.65rem)] leading-[1.16] tracking-[-.025em] text-[#124c36]">{preview}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#176b45] transition hover:text-[#124c36]"
        >
          {readMore}<span aria-hidden="true">→</span>
        </button>
      </div>
      <AlumniExperienceDialog open={open} name={name} message={message} label={label} closeLabel={closeLabel} />
    </>
  );
}
