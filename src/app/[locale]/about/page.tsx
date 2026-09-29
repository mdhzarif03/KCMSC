import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader heading={dict.about.heading} intro={dict.about.body} />

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              {locale === "bn" ? "লক্ষ্য" : "Mission"}
            </h2>
            <p className="mt-3 text-ink-muted">{dict.about.mission}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              {locale === "bn" ? "উদ্দেশ্য" : "Vision"}
            </h2>
            <p className="mt-3 text-ink-muted">{dict.about.vision}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{dict.about.messagesHeading}</h2>
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {dict.about.messages.map((m) => (
              <li key={m.name} className="rounded-lg border border-border bg-white p-6">
                <blockquote className="text-ink-muted">&ldquo;{m.quote}&rdquo;</blockquote>
                <p className="mt-4 font-medium text-ink">{m.name}</p>
                <p className="text-sm text-ink-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-heading text-2xl text-ink">
          {locale === "bn" ? "নেতৃত্ব" : "Leadership"}
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.leadership.map((person) => (
            <li key={person.name} className="rounded-lg border border-border p-5">
              <div aria-hidden className="mb-4 h-16 w-16 rounded-full bg-soft-green/30" />
              <p className="font-medium text-ink">{person.name}</p>
              <p className="text-sm text-ink-muted">{person.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-heading text-2xl text-ink">{dict.trusteeBoard.heading}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.trusteeBoard.members.map((m) => (
              <li key={m.name} className="rounded-lg border border-border bg-white p-4">
                <p className="font-medium text-ink">{m.name}</p>
                <p className="text-sm text-ink-muted">{m.designation}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
