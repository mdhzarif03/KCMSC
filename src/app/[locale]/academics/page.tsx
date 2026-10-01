import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

const content = {
  en: {
    kicker: "Academics",
    heroTitle: "A clear path through school.",
    heroBody:
      "K C Model School & College brings together early learning, primary education, secondary education and higher secondary education within one school community.",
    heroNote: "Play Group → Grade XII · Bangla & English Versions",
    heroImageAlt: "Students learning in a KC Model School & College classroom",
    overview: "At a glance",
    students: "Students",
    studentsDetail: "2025 school profile",
    bangla: "Bangla Version",
    banglaDetail: "1,240 students · 53%",
    english: "English Version",
    englishDetail: "1,096 students · 47%",
    wings: "Academic structure",
    wingsTitle: "One school, different stages of learning.",
    wingsBody:
      "The school is organised into Junior and Senior Wings, giving each stage of a student's education its own academic structure and leadership.",
    junior: "Junior Wing",
    juniorEyebrow: "Play Group · Primary",
    juniorBody:
      "The Junior Wing covers Pre-Primary and Primary education, providing the foundation for students' academic journey.",
    juniorSections: "Pre-Primary and Primary",
    juniorMedium: "Bangla & English Versions",
    juniorStaff: "76 teachers",
    senior: "Senior Wing",
    seniorEyebrow: "Secondary · Higher Secondary",
    seniorBody:
      "The Senior Wing carries students through Secondary and Higher Secondary education.",
    seniorSections: "Secondary and Higher Secondary",
    seniorMedium: "Bangla & English Versions",
    seniorStaff: "22 Lecturers · 20 Senior Teachers · 22 Assistant Teachers",
    classroomKicker: "Inside the classroom",
    classroomTitle: "The everyday work of learning.",
    classroomBody:
      "Academic life at KCMSC is not only about examination results. It is built around regular classroom teaching, experienced teachers and a structured progression from one stage to the next.",
    classroomAlt: "KCMSC students attending a classroom lesson",
    journeyKicker: "The academic journey",
    journeyTitle: "From the first classroom to the next chapter.",
    journeyBody:
      "Students move through a clear sequence of classes from Play Group through Grade XII.",
    schoolHours: "School hours",
    schoolHoursValue: "7:45 AM – 2:30 PM",
    schoolHoursDetail: "Sunday – Thursday",
    resultsKicker: "Academic results",
    resultsTitle: "A record worth putting in context.",
    resultsBody:
      "The 2024 SSC and HSC results recorded strong pass rates, alongside students achieving GPA 5.",
    appeared: "Appeared",
    passed: "Passed",
    gpa5: "GPA 5",
    passRate: "Pass rate",
    resultNote: "Source: KCMSC profile · 2024 academic results",
    curriculumKicker: "Curriculum",
    curriculumTitle: "National curriculum, two language versions.",
    curriculumBody:
      "KCMSC follows the National Curriculum and offers both Bangla and English Versions across its academic structure.",
    curriculumItems: [
      [
        "01",
        "National Curriculum",
        "The school follows the national curriculum from Play Group through Grade Twelve.",
      ],
      [
        "02",
        "Bangla Version",
        "The Bangla Version serves 1,240 students according to the 2025 profile.",
      ],
      [
        "03",
        "English Version",
        "The English Version serves 1,096 students according to the 2025 profile.",
      ],
      [
        "04",
        "Continuous progression",
        "Junior and Senior Wings provide a structured progression through school.",
      ],
    ],
    ctaKicker: "Continue",
    ctaTitle: "See how school life continues beyond the timetable.",
    ctaBody:
      "Explore student life, clubs, activities and the wider KCMSC community.",
    studentLife: "Student life",
    admissions: "Admissions",
  },
  bn: {
    kicker: "একাডেমিক",
    heroTitle: "স্কুলজীবনের একটি স্পষ্ট পথ।",
    heroBody:
      "কে সি মডেল স্কুল অ্যান্ড কলেজে প্রাথমিক শিক্ষা থেকে মাধ্যমিক ও উচ্চমাধ্যমিক পর্যন্ত একটি ধারাবাহিক একাডেমিক কাঠামোর মধ্যে শিক্ষার্থীরা এগিয়ে যায়।",
    heroNote: "Play Group → Grade XII · বাংলা ও ইংরেজি ভার্সন",
    heroImageAlt: "KCMSC শ্রেণিকক্ষে শিক্ষার্থীরা",
    overview: "এক নজরে",
    students: "শিক্ষার্থী",
    studentsDetail: "২০২৫ সালের প্রোফাইল",
    bangla: "বাংলা ভার্সন",
    banglaDetail: "১,২৪০ শিক্ষার্থী · ৫৩%",
    english: "ইংরেজি ভার্সন",
    englishDetail: "১,০৯৬ শিক্ষার্থী · ৪৭%",
    wings: "একাডেমিক কাঠামো",
    wingsTitle: "একটি স্কুল, শিক্ষার বিভিন্ন ধাপ।",
    wingsBody:
      "শিক্ষার্থীদের বয়স ও শিক্ষার স্তর অনুযায়ী প্রতিষ্ঠানটি Junior ও Senior Wing-এ সংগঠিত।",
    junior: "Junior Wing",
    juniorEyebrow: "Play Group · Primary",
    juniorBody:
      "Junior Wing-এ Pre-Primary ও Primary শিক্ষা পরিচালিত হয়, যা শিক্ষার্থীদের একাডেমিক যাত্রার ভিত্তি তৈরি করে।",
    juniorSections: "Pre-Primary ও Primary",
    juniorMedium: "বাংলা ও ইংরেজি ভার্সন",
    juniorStaff: "৭৬ জন শিক্ষক",
    senior: "Senior Wing",
    seniorEyebrow: "Secondary · Higher Secondary",
    seniorBody:
      "Senior Wing-এ Secondary ও Higher Secondary পর্যায়ের শিক্ষা পরিচালিত হয়।",
    seniorSections: "Secondary ও Higher Secondary",
    seniorMedium: "বাংলা ও ইংরেজি ভার্সন",
    seniorStaff:
      "২২ জন Lecturer · ২০ জন Senior Teacher · ২২ জন Assistant Teacher",
    classroomKicker: "শ্রেণিকক্ষের ভেতরে",
    classroomTitle: "প্রতিদিনের শেখার কাজ।",
    classroomBody:
      "KCMSC-এর একাডেমিক জীবন শুধু পরীক্ষার ফলাফলের মধ্যে সীমাবদ্ধ নয়। নিয়মিত শ্রেণিকক্ষের পাঠদান, অভিজ্ঞ শিক্ষক এবং ধাপে ধাপে অগ্রসর হওয়ার কাঠামো এর মূল অংশ।",
    classroomAlt: "KCMSC শ্রেণিকক্ষে পাঠদান",
    journeyKicker: "একাডেমিক যাত্রা",
    journeyTitle: "প্রথম শ্রেণিকক্ষ থেকে পরবর্তী অধ্যায় পর্যন্ত।",
    journeyBody:
      "Play Group থেকে Grade XII পর্যন্ত শিক্ষার্থীরা একটি ধারাবাহিক শ্রেণি কাঠামোর মধ্য দিয়ে এগিয়ে যায়।",
    schoolHours: "স্কুলের সময়",
    schoolHoursValue: "সকাল ৭:৪৫ – দুপুর ২:৩০",
    schoolHoursDetail: "রবিবার – বৃহস্পতিবার",
    resultsKicker: "একাডেমিক ফলাফল",
    resultsTitle: "একটি ফলাফল, তার প্রেক্ষাপটসহ।",
    resultsBody:
      "২০২৪ সালের SSC ও HSC পরীক্ষার ফলাফলে উচ্চ পাসের হার এবং GPA 5 অর্জনকারী শিক্ষার্থীদের ফলাফল রয়েছে।",
    appeared: "পরীক্ষার্থী",
    passed: "উত্তীর্ণ",
    gpa5: "GPA 5",
    passRate: "পাসের হার",
    resultNote: "উৎস: KCMSC Profile · ২০২৪ সালের ফলাফল",
    curriculumKicker: "শিক্ষাক্রম",
    curriculumTitle: "জাতীয় শিক্ষাক্রম, দুটি ভাষার ভার্সন।",
    curriculumBody:
      "KCMSC Play Group থেকে Grade XII পর্যন্ত জাতীয় শিক্ষাক্রম অনুসরণ করে এবং বাংলা ও ইংরেজি উভয় ভার্সনে শিক্ষা প্রদান করে।",
    curriculumItems: [
      [
        "০১",
        "জাতীয় শিক্ষাক্রম",
        "Play Group থেকে Grade XII পর্যন্ত জাতীয় শিক্ষাক্রম অনুসরণ করা হয়।",
      ],
      [
        "০২",
        "বাংলা ভার্সন",
        "২০২৫ সালের প্রোফাইল অনুযায়ী বাংলা ভার্সনে ১,২৪০ জন শিক্ষার্থী রয়েছে।",
      ],
      [
        "০৩",
        "ইংরেজি ভার্সন",
        "২০২৫ সালের প্রোফাইল অনুযায়ী ইংরেজি ভার্সনে ১,০৯৬ জন শিক্ষার্থী রয়েছে।",
      ],
      [
        "০৪",
        "ধারাবাহিক অগ্রগতি",
        "Junior ও Senior Wing-এর মাধ্যমে শিক্ষার্থীদের একাডেমিক অগ্রগতি একটি কাঠামোর মধ্যে এগোয়।",
      ],
    ],
    ctaKicker: "আরও দেখুন",
    ctaTitle: "ক্লাসরুমের বাইরের স্কুলজীবনও দেখুন।",
    ctaBody:
      "শিক্ষার্থী জীবন, ক্লাব, কার্যক্রম ও KCMSC-এর বৃহত্তর কমিউনিটি সম্পর্কে জানুন।",
    studentLife: "শিক্ষার্থী জীবন",
    admissions: "ভর্তি",
  },
} as const;

const classes = [
  ["Play Group", "3.5–4.5 years"],
  ["Nursery / KG", "4.5–5.5 years"],
  ["Class 1", "5.5–6.5 years"],
  ["Class 2", "6.5–7.5 years"],
  ["Class 3", "7.5–8.5 years"],
  ["Class 4", "8.5–9.5 years"],
  ["Class 5", "9.5–10.5 years"],
  ["Class 6–8", "Junior / secondary progression"],
  ["Class 9–10", "Secondary"],
  ["Class 11–12", "Higher Secondary"],
] as const;

const results = [
  {
    exam: "SSC",
    year: "2024",
    appeared: "130",
    passed: "128",
    rate: 98.48,
    gpa: "67",
  },
  {
    exam: "HSC",
    year: "2024",
    appeared: "47",
    passed: "47",
    rate: 100,
    gpa: "13",
  },
] as const;

function PassRate({ rate }: { rate: number }) {
  const degrees = rate * 3.6;

  return (
    <div
      className="relative h-28 w-28 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(#176b45 0deg ${degrees}deg, #d9d4c9 ${degrees}deg 360deg)`,
      }}
    >
      <div className="absolute inset-[8px] flex flex-col items-center justify-center rounded-full bg-[#f8f5ed]">
        <span className="font-heading text-2xl text-[#173e2f]">{rate}%</span>
        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[.14em] text-[#747b74]">
          pass rate
        </span>
      </div>
    </div>
  );
}

export default function AcademicsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;
  const t = content[locale];

  return (
    <main className="bg-[#f8f5ed] text-[#25362e]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#173e2f] text-[#f8f5ed]">
        <div className="relative min-h-[690px] lg:min-h-[760px]">
          <Image
            src="/kcmsc/facilities/teacher_taking_class.jpg"
            alt={t.heroImageAlt}
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,32,22,.92)_0%,rgba(7,32,22,.74)_34%,rgba(7,32,22,.27)_72%,rgba(7,32,22,.38)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071f15]/80 via-transparent to-[#071f15]/10" />

          <div className="relative mx-auto flex min-h-[690px] max-w-[1440px] flex-col justify-end px-6 pb-10 pt-32 sm:px-10 sm:pb-14 lg:min-h-[760px] lg:px-16 lg:pb-16">
            <div className="max-w-4xl">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#d3b96c]">
                {t.kicker}
              </p>

              <h1 className="mt-5 max-w-4xl font-heading text-[clamp(4rem,8.5vw,8.5rem)] leading-[.86] tracking-[-.055em] text-[#fbf7ec]">
                {t.heroTitle}
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
                {t.heroBody}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/admissions`}
                  className="inline-flex items-center justify-center bg-[#f8f5ed] px-6 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#173e2f] transition hover:bg-white"
                >
                  {t.admissions}
                </Link>

                <span className="border border-white/25 px-5 py-3 text-[10px] uppercase tracking-[.16em] text-white/75">
                  {t.heroNote}
                </span>
              </div>
            </div>

            <div className="mt-16 flex items-end justify-between border-t border-white/20 pt-5">
              <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/55">
                K C Model School & College · Est. 2014
              </span>

              <span className="hidden text-[9px] uppercase tracking-[.18em] text-white/55 sm:block">
                Academic life
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="border-b border-[#d7d1c4] bg-[#f0ede4]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
          {[
            ["2,336", t.students, t.studentsDetail],
            ["53%", t.bangla, t.banglaDetail],
            ["47%", t.english, t.englishDetail],
            ["2", t.wings, "Junior + Senior"],
          ].map(([value, label, detail], index) => (
            <div
              key={label}
              className={`px-6 py-7 sm:px-10 sm:py-9 lg:px-12 ${
                index < 3 ? "border-r border-[#d7d1c4]" : ""
              } ${index > 1 ? "border-t lg:border-t-0" : ""}`}
            >
              <p className="font-heading text-4xl tracking-[-.03em] text-[#173e2f] sm:text-5xl">
                {value}
              </p>
              <p className="mt-2 text-xs font-semibold text-[#25362e]">
                {label}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[.14em] text-[#7a8079]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="border-b border-[#d7d1c4] bg-[#f8f5ed]">
        <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a28742]">
                {t.wings}
              </p>
              <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-6xl">
                {t.wingsTitle}
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#6d756e] sm:text-base">
              {t.wingsBody}
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {[
              {
                number: "01",
                title: t.junior,
                eyebrow: t.juniorEyebrow,
                body: t.juniorBody,
                section: t.juniorSections,
                medium: t.juniorMedium,
                staff: t.juniorStaff,
                image: "/kcmsc/student-life/vibrant_student_life2.jpg",
                alt: "KCMSC students during school life",
              },
              {
                number: "02",
                title: t.senior,
                eyebrow: t.seniorEyebrow,
                body: t.seniorBody,
                section: t.seniorSections,
                medium: t.seniorMedium,
                staff: t.seniorStaff,
                image: "/kcmsc/facilities/teacher_taking_class.jpg",
                alt: "KCMSC students in a classroom",
              },
            ].map((wing) => (
              <article
                key={wing.title}
                className="group overflow-hidden border border-[#d6d0c3] bg-[#f1eee5]"
              >
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={wing.image}
                    alt={wing.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={88}
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[#0e3325]/15" />
                </div>

                <div className="p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#a28742]">
                        {wing.eyebrow}
                      </p>
                      <h3 className="mt-3 font-heading text-3xl text-[#173e2f] sm:text-4xl">
                        {wing.title}
                      </h3>
                    </div>
                    <span className="font-heading text-5xl text-[#d5d0c4]">
                      {wing.number}
                    </span>
                  </div>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[#6d756e]">
                    {wing.body}
                  </p>

                  <div className="mt-7 grid gap-5 border-t border-[#d4cec0] pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a28742]">
                        Classes
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#68716a]">
                        {wing.section}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a28742]">
                        Versions
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#68716a]">
                        {wing.medium}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#d4cec0] pt-4 text-[10px] font-semibold uppercase tracking-[.12em] text-[#176b45]">
                    {wing.staff}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSROOM */}
      <section className="bg-[#173e2f] text-[#f8f5ed]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[480px] lg:min-h-[620px]">
            <Image
              src="/kcmsc/facilities/teacher_taking_class.jpg"
              alt={t.classroomAlt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={92}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#09271b]/20" />
          </div>

          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#d3b96c]">
              {t.classroomKicker}
            </p>

            <h2 className="mt-5 max-w-xl font-heading text-4xl leading-[.96] tracking-[-.035em] sm:text-6xl">
              {t.classroomTitle}
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
              {t.classroomBody}
            </p>

            <div className="mt-9 grid grid-cols-2 border-t border-white/15 pt-6">
              <div>
                <p className="text-[9px] uppercase tracking-[.16em] text-white/45">
                  School hours
                </p>
                <p className="mt-2 font-heading text-xl">7:45 AM – 2:30 PM</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[.16em] text-white/45">
                  Days
                </p>
                <p className="mt-2 font-heading text-xl">Sunday – Thursday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC JOURNEY */}
      <section className="border-b border-[#d7d1c4] bg-[#ebe7dc]">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a28742]">
              {t.journeyKicker}
            </p>
            <h2 className="mt-4 max-w-md font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-5xl">
              {t.journeyTitle}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#6d756e]">
              {t.journeyBody}
            </p>

            <div className="mt-8 bg-[#173e2f] p-6 text-[#f8f5ed]">
              <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#d3b96c]">
                {t.schoolHours}
              </p>
              <p className="mt-3 font-heading text-2xl">{t.schoolHoursValue}</p>
              <p className="mt-1 text-xs text-white/55">
                {t.schoolHoursDetail}
              </p>
            </div>
          </div>

          <div className="border-t border-[#cbc4b5]">
            {classes.map(([name, age], index) => (
              <div
                key={name}
                className="grid grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-[#cbc4b5] py-5 sm:grid-cols-[55px_1fr_170px]"
              >
                <span className="text-[9px] font-bold tracking-[.15em] text-[#a28742]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xl text-[#173e2f] sm:text-2xl">
                  {locale === "bn" && name === "Play Group"
                    ? "Play Group"
                    : name}
                </span>
                <span className="text-right text-[10px] uppercase tracking-[.12em] text-[#7a8079]">
                  {age}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-[#f8f5ed]">
        <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a28742]">
                {t.resultsKicker}
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-5xl">
                {t.resultsTitle}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6d756e]">
              {t.resultsBody}
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {results.map((result) => (
              <article
                key={result.exam}
                className="border border-[#d5cec0] bg-[#efebe2] p-7 sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#a28742]">
                      {result.year}
                    </p>
                    <h3 className="mt-2 font-heading text-4xl text-[#173e2f]">
                      {result.exam}
                    </h3>
                  </div>
                  <PassRate rate={result.rate} />
                </div>

                <div className="mt-8 grid grid-cols-3 border-t border-[#d5cec0] pt-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[.14em] text-[#7a8079]">
                      {t.appeared}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-[#173e2f]">
                      {result.appeared}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.14em] text-[#7a8079]">
                      {t.passed}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-[#173e2f]">
                      {result.passed}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.14em] text-[#7a8079]">
                      {t.gpa5}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-[#176b45]">
                      {result.gpa}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-[9px] uppercase tracking-[.12em] text-[#858a83]">
            {t.resultNote}
          </p>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="border-t border-[#d7d1c4] bg-[#173e2f] text-[#f8f5ed]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[.7fr_1.3fr] lg:py-28">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#d3b96c]">
              {t.curriculumKicker}
            </p>
            <h2 className="mt-4 max-w-md font-heading text-4xl leading-[.98] tracking-[-.035em] sm:text-5xl">
              {t.curriculumTitle}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              {t.curriculumBody}
            </p>
          </div>

          <div className="border-t border-white/15">
            {t.curriculumItems.map(([number, title, body]) => (
              <div
                key={number}
                className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[50px_190px_1fr] sm:items-start"
              >
                <span className="text-[9px] font-bold tracking-[.16em] text-[#d3b96c]">
                  {number}
                </span>
                <h3 className="font-heading text-xl">{title}</h3>
                <p className="text-sm leading-6 text-white/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f5ed]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-8 border-y border-[#d5cec0] py-10 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a28742]">
                {t.ctaKicker}
              </p>
              <h2 className="mt-4 max-w-2xl font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-5xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#6d756e]">
                {t.ctaBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/student-life`}
                className="inline-flex bg-[#173e2f] px-6 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#f8f5ed] transition hover:bg-[#0f3023]"
              >
                {t.studentLife}
              </Link>
              <Link
                href={`/${locale}/admissions`}
                className="inline-flex border border-[#173e2f] px-6 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#173e2f] transition hover:bg-[#173e2f] hover:text-[#f8f5ed]"
              >
                {t.admissions}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
