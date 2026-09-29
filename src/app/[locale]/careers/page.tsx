import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";

async function getPublishedCareers() {
  try {
    return await prisma.career.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return null;
  }
}

export default async function CareersPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.careersPage;
  const careers = await getPublishedCareers();

  return (
    <>
      <PageHeader heading={page.heading} />
      <section className="mx-auto max-w-content px-6 py-16">
        {!careers || careers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-ink-muted">
            {page.empty}
          </div>
        ) : (
          <ul className="space-y-4">
            {careers.map((c) => (
              <li key={c.id} className="rounded-lg border border-border bg-surface p-6">
                <h2 className="font-medium text-ink">{locale === "bn" ? c.titleBn : c.titleEn}</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  {locale === "bn" ? c.descriptionBn : c.descriptionEn}
                </p>
                {c.deadline ? (
                  <p className="mt-3 text-xs text-ink-muted">
                    {locale === "bn" ? "আবেদনের শেষ তারিখ" : "Application deadline"}:{" "}
                    {new Date(c.deadline).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
