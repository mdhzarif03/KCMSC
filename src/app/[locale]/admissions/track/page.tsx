import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";
import { APPLICATION_STATUSES } from "@/lib/admissions";

async function lookupApplication(referenceCode: string, guardianPhone: string) {
  try {
    return await prisma.admissionApplication.findFirst({
      where: {
        referenceCode: referenceCode.trim().toUpperCase(),
        guardianPhone: guardianPhone.trim()
      },
      include: {
        // Only ever read applicantMessage, never internalNote — see
        // schema comment on AdmissionReview for why the split exists.
        reviews: {
          where: { applicantMessage: { not: null } },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });
  } catch {
    return undefined; // DB unreachable — distinct from "not found" (null)
  }
}

export default async function TrackPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { ref?: string; phone?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.admissionsTrackPage;

  const hasQuery = Boolean(searchParams.ref && searchParams.phone);
  const application = hasQuery
    ? await lookupApplication(searchParams.ref!, searchParams.phone!)
    : null;

  const statusIndex = application
    ? APPLICATION_STATUSES.indexOf(application.status)
    : -1;

  return (
    <>
      <PageHeader heading={page.heading} intro={page.intro} />
      <section className="mx-auto max-w-content px-6 py-16">
        <form method="GET" className="flex max-w-xl flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink">{page.referenceLabel}</label>
            <input
              name="ref"
              required
              defaultValue={searchParams.ref}
              placeholder="KCMSC-2026-XXXXXX"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm uppercase"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink">
              {page.guardianPhoneLabel}
            </label>
            <input
              name="phone"
              required
              defaultValue={searchParams.phone}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
            >
              {page.submit}
            </button>
          </div>
        </form>

        {hasQuery ? (
          application === undefined ? (
            <p className="mt-8 text-sm text-ink-muted">
              {locale === "bn"
                ? "এই মুহূর্তে অবস্থা যাচাই করা যাচ্ছে না। পরে আবার চেষ্টা করুন।"
                : "Status lookup isn't available right now. Please try again shortly."}
            </p>
          ) : application === null ? (
            <p className="mt-8 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
              {page.notFound}
            </p>
          ) : (
            <div className="mt-8 max-w-xl rounded-lg border border-border bg-surface p-6">
              <p className="text-sm text-ink-muted">
                {page.submittedOn}{" "}
                {new Date(application.createdAt).toLocaleDateString(
                  locale === "bn" ? "bn-BD" : "en-US"
                )}
              </p>
              <p className="mt-3 font-heading text-xl text-primary-dark">
                {page.statusLabels[application.status as keyof typeof page.statusLabels]}
              </p>

              <ol className="mt-6 flex flex-wrap gap-2">
                {APPLICATION_STATUSES.filter((s) => s !== "NOT_ELIGIBLE").map((s, i) => (
                  <li
                    key={s}
                    className={`rounded-full px-3 py-1 text-xs ${
                      i <= statusIndex
                        ? "bg-primary text-white"
                        : "bg-white text-ink-muted"
                    }`}
                  >
                    {page.statusLabels[s as keyof typeof page.statusLabels]}
                  </li>
                ))}
              </ol>

              {application.reviews[0]?.applicantMessage ? (
                <div className="mt-6 rounded-md border border-border bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    {page.latestUpdateLabel}
                  </p>
                  <p className="mt-1 text-sm text-ink">{application.reviews[0].applicantMessage}</p>
                </div>
              ) : null}
            </div>
          )
        ) : null}
      </section>
    </>
  );
}
