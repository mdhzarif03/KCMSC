import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/db";

type Entry = {
  year: string;
  category: string;
  title: string;
  details: string;
};

async function getAchievementEntries(
  locale: Locale,
  fallback: Entry[],
): Promise<Entry[]> {
  try {
    const rows = await prisma.achievement.findMany({
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    });

    if (rows.length === 0) return fallback;

    return rows.map((row) => ({
      year: String(row.year),
      category: row.category,
      title: locale === "bn" ? row.titleBn : row.titleEn,
      details: locale === "bn" ? row.descriptionBn : row.descriptionEn,
    }));
  } catch {
    return fallback;
  }
}

function isBangla(locale: Locale) {
  return locale === "bn";
}

export default async function AchievementsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;
  const bn = isBangla(locale);
  const dict = getDictionary(locale);
  const page = dict.achievementsPage;
  const entries = await getAchievementEntries(locale, page.entries);

  const ssc = entries.find((entry) =>
    entry.title.toLowerCase().includes("ssc"),
  );
  const hsc = entries.find((entry) =>
    entry.title.toLowerCase().includes("hsc"),
  );
  const ict = entries.find((entry) =>
    entry.category.toLowerCase().includes("ict"),
  );
  const iq = entries.find((entry) =>
    entry.category.toLowerCase().includes("iq"),
  );
  const scholarship = entries.find(
    (entry) => entry.year === "2022" || entry.year === "২০২২",
  );
  const institutional = entries.find(
    (entry) =>
      entry.category.toLowerCase().includes("institutional") ||
      entry.category.includes("প্রাতিষ্ঠানিক"),
  );

  const copy = bn
    ? {
        eyebrow: "সাফল্যের পথ",
        heroTitle: "ফলাফল শুধু সংখ্যা নয়।",
        heroText:
          "শ্রেণিকক্ষের পরিশ্রম, প্রতিযোগিতার মঞ্চে আত্মবিশ্বাস এবং বছরের পর বছর ধরে গড়ে ওঠা শিক্ষার্থীদের অগ্রগতিই KCMSC-এর অর্জনের গল্প।",
        record: "সাম্প্রতিক রেকর্ড",
        recordTitle: "যে ফলাফলগুলো মনে রাখার মতো।",
        recordText:
          "এক নজরে ২০২৪-এর বোর্ড ফলাফল এবং ২০২৫-এর জাতীয় পর্যায়ের অর্জন।",
        sscLabel: "এসএসসি ২০২৪",
        hscLabel: "এইচএসসি ২০২৪",
        passRate: "পাসের হার",
        gpaFive: "জিপিএ ৫",
        highlights: "উল্লেখযোগ্য অর্জন",
        competition: "প্রতিযোগিতা ও স্বীকৃতি",
        scholarshipTitle: "বৃত্তি ও প্রাতিষ্ঠানিক স্বীকৃতি",
        schoolStory: "একটি স্কুলের অর্জন",
        schoolStoryText:
          "কেসিএমএসসি-র শিক্ষার্থীদের সাফল্য শুধু পরীক্ষার ফলাফলে সীমাবদ্ধ নয়। অলিম্পিয়াড, বৃত্তি এবং বিভিন্ন প্রতিযোগিতায় তাদের অংশগ্রহণ স্কুলজীবনের বিস্তৃত অভিজ্ঞতার অংশ।",
        viewAcademics: "একাডেমিকস দেখুন",
        viewStudentLife: "স্টুডেন্ট লাইফ দেখুন",
        years: "বছর",
      }
    : {
        eyebrow: "A record of progress",
        heroTitle: "Results worth remembering.",
        heroText:
          "Behind every result are classrooms, teachers, practice, competition days and students who kept showing up. This is a record of what KCMSC students have achieved.",
        record: "The record",
        recordTitle: "Numbers with a story behind them.",
        recordText:
          "A clear look at the 2024 board results and the school's recent national-level achievements.",
        sscLabel: "SSC 2024",
        hscLabel: "HSC 2024",
        passRate: "Pass rate",
        gpaFive: "GPA 5",
        highlights: "Highlights",
        competition: "Competition & recognition",
        scholarshipTitle: "Scholarship & institutional recognition",
        schoolStory: "Achievement is part of school life.",
        schoolStoryText:
          "KCMSC's record includes board examinations, national Olympiads, scholarships and institutional recognition. Together, they show several different ways students and the school have progressed.",
        viewAcademics: "View academics",
        viewStudentLife: "View student life",
        years: "years",
      };

  return (
    <main className="bg-[#f7f5ef] text-[#242824]">
      {/* HERO */}
      <section className="border-b border-[#d9d8cf] bg-[#eeeae0]">
        <div className="mx-auto grid max-w-[80rem] gap-0 px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
          <div className="flex min-h-[590px] flex-col justify-center py-20 pr-0 lg:pr-16">
            <span className="mb-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#9c7f34]">
              <span className="h-px w-10 bg-[#b59a4a]" />
              {copy.eyebrow}
            </span>

            <h1 className="max-w-3xl font-heading text-[clamp(4rem,7vw,7.4rem)] leading-[.88] tracking-[-.055em] text-[#124c36]">
              {copy.heroTitle}
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#69716b] sm:text-lg">
              {copy.heroText}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/academics`}
                className="inline-flex min-h-11 items-center justify-center bg-[#124c36] px-6 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#176b45]"
              >
                {copy.viewAcademics}
              </Link>
              <Link
                href={`/${locale}/student-life`}
                className="inline-flex min-h-11 items-center justify-center border border-[#b8b5aa] px-6 text-[10px] font-bold uppercase tracking-[.18em] text-[#124c36] transition hover:border-[#124c36]"
              >
                {copy.viewStudentLife}
              </Link>
            </div>
          </div>

          <div className="relative min-h-[590px] overflow-hidden lg:border-l lg:border-[#d9d8cf]">
            <Image
              src="/kcmsc/media/ict_olympiad_at_kc.jpg"
              alt={
                bn
                  ? "কেসিএমএসসি শিক্ষার্থীদের আইসিটি অলিম্পিয়াড কার্যক্রম"
                  : "KCMSC students at an ICT Olympiad activity"
              }
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082b20]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <p className="max-w-lg font-heading text-2xl leading-tight text-white sm:text-3xl">
                {bn
                  ? "শ্রেণিকক্ষের বাইরে শেখারও একটি মঞ্চ আছে।"
                  : "There is another classroom beyond the classroom."}
              </p>
              <p className="mt-3 max-w-md text-xs leading-5 text-white/75">
                {bn
                  ? "জাতীয় পর্যায়ের প্রতিযোগিতায় শিক্ষার্থীদের অংশগ্রহণ।"
                  : "Students representing KCMSC in national-level competition."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS INTRO */}
      <section className="border-b border-[#d9d8cf] bg-[#f7f5ef]">
        <div className="mx-auto max-w-[80rem] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9c7f34]">
                {copy.record}
              </span>
              <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[.95] tracking-[-.035em] text-[#124c36] sm:text-5xl">
                {copy.recordTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#69716b] lg:justify-self-end">
              {copy.recordText}
            </p>
          </div>

          <div className="mt-14 grid border-y border-[#d9d8cf] md:grid-cols-2">
            <div className="border-b border-[#d9d8cf] py-9 md:border-b-0 md:border-r md:pr-10 lg:py-12">
              <div className="flex items-end justify-between gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9c7f34]">
                    {copy.sscLabel}
                  </p>
                  <p className="mt-4 font-heading text-7xl leading-none tracking-[-.05em] text-[#124c36]">
                    98.48%
                  </p>
                </div>
                <span className="pb-1 text-right text-xs text-[#69716b]">
                  {copy.passRate}
                </span>
              </div>
              <div className="mt-7 grid grid-cols-2 border-t border-[#d9d8cf] pt-5 text-sm">
                <div>
                  <span className="block text-[9px] uppercase tracking-[.18em] text-[#9c7f34]">
                    {bn ? "অংশগ্রহণ" : "Appeared"}
                  </span>
                  <strong className="mt-2 block text-xl font-normal text-[#242824]">
                    {ssc ? "130" : "130"}
                  </strong>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-[.18em] text-[#9c7f34]">
                    {copy.gpaFive}
                  </span>
                  <strong className="mt-2 block text-xl font-normal text-[#176b45]">
                    67
                  </strong>
                </div>
              </div>
            </div>

            <div className="py-9 md:pl-10 lg:py-12">
              <div className="flex items-end justify-between gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9c7f34]">
                    {copy.hscLabel}
                  </p>
                  <p className="mt-4 font-heading text-7xl leading-none tracking-[-.05em] text-[#124c36]">
                    100%
                  </p>
                </div>
                <span className="pb-1 text-right text-xs text-[#69716b]">
                  {copy.passRate}
                </span>
              </div>
              <div className="mt-7 grid grid-cols-2 border-t border-[#d9d8cf] pt-5 text-sm">
                <div>
                  <span className="block text-[9px] uppercase tracking-[.18em] text-[#9c7f34]">
                    {bn ? "অংশগ্রহণ" : "Appeared"}
                  </span>
                  <strong className="mt-2 block text-xl font-normal text-[#242824]">
                    47
                  </strong>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-[.18em] text-[#9c7f34]">
                    {copy.gpaFive}
                  </span>
                  <strong className="mt-2 block text-xl font-normal text-[#176b45]">
                    13
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-[#124c36] text-white">
        <div className="mx-auto max-w-[80rem] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.62fr_1.38fr]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#dbc887]">
                {copy.highlights}
              </span>
              <h2 className="mt-5 max-w-md font-heading text-4xl leading-[.96] tracking-[-.035em] sm:text-5xl">
                {copy.competition}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
                {bn
                  ? "অলিম্পিয়াডের অর্জনগুলো শিক্ষার্থীদের প্রতিযোগিতামূলক শেখার অংশকে তুলে ধরে।"
                  : "National Olympiad results give a glimpse of how students take classroom learning into competitive settings."}
              </p>
            </div>

            <div className="divide-y divide-white/15 border-y border-white/15">
              {ict && (
                <article className="grid gap-6 py-7 sm:grid-cols-[6rem_1fr_auto] sm:items-start">
                  <span className="font-heading text-3xl text-[#dbc887]">
                    {ict.year}
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#dbc887]">
                      {ict.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl leading-tight">
                      {ict.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                      {ict.details}
                    </p>
                  </div>
                  <span className="hidden text-[9px] uppercase tracking-[.16em] text-white/40 sm:block">
                    01
                  </span>
                </article>
              )}

              {iq && (
                <article className="grid gap-6 py-7 sm:grid-cols-[6rem_1fr_auto] sm:items-start">
                  <span className="font-heading text-3xl text-[#dbc887]">
                    {iq.year}
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#dbc887]">
                      {iq.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl leading-tight">
                      {iq.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                      {iq.details}
                    </p>
                  </div>
                  <span className="hidden text-[9px] uppercase tracking-[.16em] text-white/40 sm:block">
                    02
                  </span>
                </article>
              )}

              {institutional && (
                <article className="grid gap-6 py-7 sm:grid-cols-[6rem_1fr_auto] sm:items-start">
                  <span className="font-heading text-3xl text-[#dbc887]">
                    {institutional.year}
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#dbc887]">
                      {institutional.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl leading-tight">
                      {institutional.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                      {institutional.details}
                    </p>
                  </div>
                  <span className="hidden text-[9px] uppercase tracking-[.16em] text-white/40 sm:block">
                    03
                  </span>
                </article>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL BREAK */}
      <section className="bg-[#eeeae0]">
        <div className="mx-auto grid max-w-[80rem] lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[430px] overflow-hidden">
            <Image
              src="/kcmsc/media/winner.jpg"
              alt={
                bn
                  ? "কেসিএমএসসি শিক্ষার্থীর পুরস্কার অর্জন"
                  : "KCMSC student with a competition award"
              }
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 lg:px-14">
            <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9c7f34]">
              {copy.schoolStory}
            </span>
            <h2 className="mt-5 max-w-lg font-heading text-4xl leading-[.95] tracking-[-.035em] text-[#124c36] sm:text-5xl">
              {copy.schoolStory}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#69716b]">
              {copy.schoolStoryText}
            </p>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP + TIMELINE */}
      <section className="bg-[#f7f5ef]">
        <div className="mx-auto max-w-[80rem] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9c7f34]">
                {copy.scholarshipTitle}
              </span>
              <h2 className="mt-4 max-w-md font-heading text-4xl leading-[.96] tracking-[-.035em] text-[#124c36] sm:text-5xl">
                {bn
                  ? "পুরোনো অর্জনও গল্পের অংশ।"
                  : "The record extends beyond one year."}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#69716b]">
                {bn
                  ? "বৃত্তি ও প্রাতিষ্ঠানিক স্বীকৃতিগুলোও KCMSC-এর দীর্ঘমেয়াদি অগ্রগতির অংশ।"
                  : "Scholarships and institutional recognition add another layer to KCMSC's longer record of progress."}
              </p>
            </div>

            <div className="border-t border-[#d9d8cf]">
              {scholarship && (
                <article className="grid gap-5 border-b border-[#d9d8cf] py-7 sm:grid-cols-[5rem_1fr]">
                  <span className="font-heading text-2xl text-[#124c36]">
                    {scholarship.year}
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#9c7f34]">
                      {scholarship.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl text-[#124c36]">
                      {scholarship.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#69716b]">
                      {scholarship.details}
                    </p>
                  </div>
                </article>
              )}

              {entries
                .filter(
                  (entry) =>
                    entry !== scholarship &&
                    entry !== ict &&
                    entry !== iq &&
                    entry !== institutional &&
                    entry !== ssc &&
                    entry !== hsc,
                )
                .map((entry, index) => (
                  <article
                    key={`${entry.year}-${entry.title}-${index}`}
                    className="grid gap-5 border-b border-[#d9d8cf] py-7 sm:grid-cols-[5rem_1fr]"
                  >
                    <span className="font-heading text-2xl text-[#124c36]">
                      {entry.year}
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#9c7f34]">
                        {entry.category}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl text-[#124c36]">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#69716b]">
                        {entry.details}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#d9d8cf] bg-[#eeeae0]">
        <div className="mx-auto flex max-w-[80rem] flex-col gap-8 px-6 py-16 sm:flex-row sm:items-end sm:justify-between lg:px-10 lg:py-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9c7f34]">
              K C Model School & College
            </span>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl leading-[.95] tracking-[-.035em] text-[#124c36] sm:text-5xl">
              {bn
                ? "অর্জনের পেছনের শিক্ষাজীবনটি দেখুন।"
                : "See the school life behind the results."}
            </h2>
          </div>
          <Link
            href={`/${locale}/student-life`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center bg-[#124c36] px-7 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#176b45]"
          >
            {copy.viewStudentLife}
          </Link>
        </div>
      </section>
    </main>
  );
}
