import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/db";
import { applyForCareerAction } from "./actions";

async function getPublishedCareers() {
  try {
    return await prisma.career.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    return null;
  }
}

export default async function CareersPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: {
    applied?: string;
    error?: string;
  };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.careersPage;

  const careers = await getPublishedCareers();

  const isBangla = locale === "bn";

  return (
    <>
      <PageHeader heading={page.heading} />

      <section className="mx-auto max-w-content px-6 py-16">
        {searchParams?.applied === "1" ? (
          <div className="mb-8 rounded-xl border border-[#b9d9c7] bg-[#edf8f1] px-5 py-4 text-sm text-[#176b45]">
            {isBangla
              ? "আপনার চাকরির আবেদন সফলভাবে জমা হয়েছে।"
              : "Your career application has been submitted successfully."}
          </div>
        ) : null}

        {searchParams?.error === "closed" ? (
          <div className="mb-8 rounded-xl border border-[#ead6c8] bg-[#fff6ef] px-5 py-4 text-sm text-[#9b4d28]">
            {isBangla
              ? "এই পদটির আবেদন বর্তমানে বন্ধ রয়েছে।"
              : "Applications for this position are currently closed."}
          </div>
        ) : null}

        {searchParams?.error === "invalid" ? (
          <div className="mb-8 rounded-xl border border-[#ead6c8] bg-[#fff6ef] px-5 py-4 text-sm text-[#9b4d28]">
            {isBangla
              ? "অনুগ্রহ করে ফর্মের তথ্যগুলো সঠিকভাবে পূরণ করুন।"
              : "Please check the application form and try again."}
          </div>
        ) : null}

        {!careers || careers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-ink-muted">
            {page.empty}
          </div>
        ) : (
          <div className="space-y-8">
            {careers.map((career) => {
              const deadlinePassed =
                career.deadline &&
                new Date() >
                  new Date(
                    new Date(career.deadline).setUTCHours(23, 59, 59, 999),
                  );

              return (
                <article
                  key={career.id}
                  className="overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="font-heading text-2xl text-ink">
                          {isBangla ? career.titleBn : career.titleEn}
                        </h2>

                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink-muted">
                          {isBangla
                            ? career.descriptionBn
                            : career.descriptionEn}
                        </p>
                      </div>

                      {career.deadline ? (
                        <div className="shrink-0 rounded-lg border border-border px-4 py-3 text-xs text-ink-muted">
                          <span className="block uppercase tracking-[0.14em]">
                            {isBangla ? "শেষ তারিখ" : "Deadline"}
                          </span>

                          <span className="mt-1 block font-medium text-ink">
                            {new Date(career.deadline).toLocaleDateString(
                              isBangla ? "bn-BD" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {deadlinePassed ? (
                      <div className="mt-8 rounded-lg border border-border bg-[#f4f3ee] px-4 py-3 text-sm text-ink-muted">
                        {isBangla
                          ? "এই পদের আবেদনের সময়সীমা শেষ হয়েছে।"
                          : "The application deadline for this position has passed."}
                      </div>
                    ) : (
                      <form
                        action={applyForCareerAction}
                        className="mt-8 border-t border-border pt-8"
                      >
                        <input
                          type="hidden"
                          name="careerId"
                          value={career.id}
                        />

                        <input type="hidden" name="locale" value={locale} />

                        <div className="mb-6">
                          <h3 className="font-heading text-xl text-ink">
                            {isBangla
                              ? "এই পদে আবেদন করুন"
                              : "Apply for this position"}
                          </h3>

                          <p className="mt-1 text-sm text-ink-muted">
                            {isBangla
                              ? "আপনার তথ্য পূরণ করে আবেদন জমা দিন।"
                              : "Complete the form below to submit your application."}
                          </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`fullName-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              {isBangla ? "পূর্ণ নাম" : "Full name"}
                            </label>

                            <input
                              id={`fullName-${career.id}`}
                              name="fullName"
                              required
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`email-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              Email
                            </label>

                            <input
                              id={`email-${career.id}`}
                              name="email"
                              type="email"
                              required
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`phone-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              {isBangla ? "মোবাইল নম্বর" : "Phone number"}
                            </label>

                            <input
                              id={`phone-${career.id}`}
                              name="phone"
                              required
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`qualification-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              {isBangla ? "শিক্ষাগত যোগ্যতা" : "Qualification"}
                            </label>

                            <input
                              id={`qualification-${career.id}`}
                              name="qualification"
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor={`experience-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              {isBangla ? "অভিজ্ঞতা" : "Experience"}
                            </label>

                            <textarea
                              id={`experience-${career.id}`}
                              name="experience"
                              rows={3}
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor={`coverLetter-${career.id}`}
                              className="block text-sm font-medium text-ink"
                            >
                              {isBangla
                                ? "কভার লেটার / অতিরিক্ত তথ্য"
                                : "Cover letter / additional information"}
                            </label>

                            <textarea
                              id={`coverLetter-${career.id}`}
                              name="coverLetter"
                              rows={5}
                              maxLength={5000}
                              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-dark"
                        >
                          {isBangla ? "আবেদন জমা দিন" : "Submit application"}
                        </button>
                      </form>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
