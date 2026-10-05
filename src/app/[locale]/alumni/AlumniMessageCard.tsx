"use client";

import AlumniExperienceDialog from "./AlumniExperienceDialog";

type AlumniMessageCardProps = {
  name: string;
  message: string;
  label: string;
  locale: "en" | "bn";
};

export default function AlumniMessageCard({
  name,
  message,
  label,
  locale,
}: AlumniMessageCardProps) {
  return (
    <article className="group rounded-2xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="flex h-full flex-col">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            Alumni Experience
          </p>

          <h3 className="mt-3 font-heading text-2xl leading-tight text-ink sm:text-3xl">
            {name}
          </h3>

          <p className="mt-4 line-clamp-5 text-sm leading-7 text-ink-muted sm:text-base">
            {message}
          </p>
        </div>

        <div className="mt-6">
          <AlumniExperienceDialog
            name={name}
            message={message}
            label={label}
            locale={locale}
          />
        </div>
      </div>
    </article>
  );
}
