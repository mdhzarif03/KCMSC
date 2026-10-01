import Link from "next/link";
import type { Locale } from "@/i18n/config";

const content = {
  en: {
    heroEyebrow: "K C MODEL SCHOOL & COLLEGE · EST. 2014",
    heroTitle: "Rooted in heritage. Ready for the future.",
    heroBody:
      "A modern learning community in Dakshinkhan, bringing together strong academics, practical learning, character, culture, and student life from Play Group to Grade Twelve.",
    explore: "Explore KCMSC",
    admissions: "Admissions",
    scroll: "Scroll to discover",
    storyLabel: "01 / THE KC STORY",
    storyTitle: "A school built for more than the next examination.",
    storyBody:
      "Founded by Al-Hajj Md. Khashru Chowdhury (CIP), KC Model School and College began its journey on 1 January 2015 with approximately 2,200 students. Today, the institution continues that original ambition: give young people the knowledge, discipline, values, and confidence to meet the challenges of the 21st century.",
    heritage: "Read our story",
    glanceLabel: "02 / AT A GLANCE",
    students: "Students",
    grades: "Grades",
    versions: "Curriculum versions",
    hours: "School hours",
    studentsValue: "2,336",
    gradesValue: "Play Group → XII",
    versionsValue: "Bangla + English",
    hoursValue: "7:45 AM → 2:30 PM",
    wingsLabel: "03 / ONE COMMUNITY, TWO WINGS",
    wingsTitle: "Every stage of learning has its own rhythm.",
    wingsBody:
      "The Junior Wing builds the foundations. The Senior Wing deepens academic rigour and prepares students for the next chapter. Both sit under one school identity, one leadership structure, and one commitment to holistic development.",
    junior: "Junior Wing",
    juniorText: "Pre-Primary & Primary · Play Group to Class 5",
    senior: "Senior Wing",
    seniorText: "Secondary & Higher Secondary · Class 6 to XII",
    academics: "See academics",
    lifeLabel: "04 / LIFE BEYOND THE BELL",
    lifeTitle: "The timetable is only the beginning.",
    lifeBody:
      "Culture, sport, competitions, clubs, trips, creativity, and service give students room to discover what they can do with what they learn.",
    viewLife: "Explore student life",
    facilitiesLabel: "05 / THE CAMPUS",
    facilitiesTitle: "Spaces that make learning tangible.",
    facilitiesBody:
      "From science laboratories and computer labs to libraries, sports spaces, and the rooftop garden, KCMSC gives students places to investigate, practise, collaborate, and grow.",
    facilities: "Explore facilities",
    rooftop: "Rooftop garden",
    library: "Library",
    lab: "Learning spaces",
    sports: "Sport & teamwork",
    resultsLabel: "06 / PERFORMANCE",
    resultsTitle: "Achievement is part of the story, not the whole story.",
    resultsBody:
      "The 2024 academic profile records a 98.48% SSC pass rate and a 100% HSC pass rate, alongside continued participation in national academic and co-curricular competitions.",
    ssc: "SSC 2024",
    hsc: "HSC 2024",
    pass: "Pass rate",
    awards: "View achievements",
    closingLabel: "07 / THE NEXT CHAPTER",
    closingTitle: "Give a young mind somewhere to begin.",
    closingBody:
      "Discover admissions, meet the school, and see how KCMSC brings academic learning and everyday student life together.",
    contact: "Contact the school",
  },
  bn: {
    heroEyebrow: "কে সি মডেল স্কুল অ্যান্ড কলেজ · প্রতিষ্ঠিত ২০১৪",
    heroTitle: "ঐতিহ্যে শিকড়, ভবিষ্যতের জন্য প্রস্তুত।",
    heroBody:
      "দক্ষিণখানে প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত এক আধুনিক শিক্ষাঙ্গন, যেখানে একাডেমিক শিক্ষা, বাস্তবভিত্তিক শেখা, শৃঙ্খলা, মূল্যবোধ, সংস্কৃতি ও শিক্ষার্থীদের জীবন একসঙ্গে এগিয়ে চলে।",
    explore: "KCMSC ঘুরে দেখুন",
    admissions: "ভর্তি",
    scroll: "আরও দেখতে স্ক্রল করুন",
    storyLabel: "০১ / KC-এর গল্প",
    storyTitle: "শুধু পরবর্তী পরীক্ষার জন্য নয়, জীবনের জন্য একটি বিদ্যালয়।",
    storyBody:
      "আলহাজ্ব মো. খসরু চৌধুরী (সিআইপি)-এর উদ্যোগে প্রতিষ্ঠিত KC Model School and College ১ জানুয়ারি ২০১৫ সালে প্রায় ২,২০০ শিক্ষার্থী নিয়ে যাত্রা শুরু করে। সেই স্বপ্নের ধারাবাহিকতায় প্রতিষ্ঠানটি ২১শ শতকের চ্যালেঞ্জ মোকাবিলায় জ্ঞান, শৃঙ্খলা, মূল্যবোধ ও আত্মবিশ্বাস গড়ে তুলতে কাজ করে যাচ্ছে।",
    heritage: "আমাদের গল্প",
    glanceLabel: "০২ / এক নজরে",
    students: "শিক্ষার্থী",
    grades: "শ্রেণি",
    versions: "কারিকুলাম",
    hours: "শিক্ষার সময়",
    studentsValue: "২,৩৩৬",
    gradesValue: "প্লে গ্রুপ → XII",
    versionsValue: "বাংলা + ইংরেজি",
    hoursValue: "৭:৪৫ → ২:৩০",
    wingsLabel: "০৩ / এক সম্প্রদায়, দুই উইং",
    wingsTitle: "শেখার প্রতিটি পর্যায়ের নিজস্ব ছন্দ আছে।",
    wingsBody:
      "জুনিয়র উইং ভিত্তি তৈরি করে, আর সিনিয়র উইং একাডেমিক গভীরতা ও পরবর্তী ধাপের প্রস্তুতি জোরদার করে। উভয় উইং একই পরিচয়, নেতৃত্ব ও সামগ্রিক বিকাশের অঙ্গীকারে যুক্ত।",
    junior: "জুনিয়র উইং",
    juniorText: "প্রি-প্রাইমারি ও প্রাইমারি · প্লে গ্রুপ থেকে পঞ্চম",
    senior: "সিনিয়র উইং",
    seniorText: "মাধ্যমিক ও উচ্চমাধ্যমিক · ষষ্ঠ থেকে দ্বাদশ",
    academics: "একাডেমিক দেখুন",
    lifeLabel: "০৪ / ঘণ্টার বাইরের জীবন",
    lifeTitle: "ক্লাসের সময়সূচিই সবকিছু নয়।",
    lifeBody:
      "সংস্কৃতি, খেলাধুলা, প্রতিযোগিতা, ক্লাব, ভ্রমণ, সৃজনশীলতা ও সামাজিক কাজ শিক্ষার্থীদের শেখা জ্ঞানকে কাজে রূপ দেওয়ার সুযোগ দেয়।",
    viewLife: "শিক্ষার্থী জীবন দেখুন",
    facilitiesLabel: "০৫ / ক্যাম্পাস",
    facilitiesTitle: "যে স্থানগুলো শেখাকে বাস্তব করে।",
    facilitiesBody:
      "বিজ্ঞান ল্যাব, কম্পিউটার ল্যাব, লাইব্রেরি, খেলাধুলার স্থান এবং ছাদবাগান শিক্ষার্থীদের অনুসন্ধান, অনুশীলন, সহযোগিতা ও বিকাশের জন্য বাস্তব পরিবেশ তৈরি করে।",
    facilities: "সুবিধাসমূহ দেখুন",
    rooftop: "ছাদবাগান",
    library: "লাইব্রেরি",
    lab: "লার্নিং স্পেস",
    sports: "খেলাধুলা ও দলগত কাজ",
    resultsLabel: "০৬ / ফলাফল",
    resultsTitle: "সাফল্য গল্পের অংশ, পুরো গল্প নয়।",
    resultsBody:
      "২০২৪ সালের প্রাতিষ্ঠানিক প্রোফাইলে SSC-তে ৯৮.৪৮% এবং HSC-তে ১০০% পাসের হার উল্লেখ আছে। পাশাপাশি শিক্ষার্থীরা জাতীয় পর্যায়ের একাডেমিক ও সহশিক্ষা কার্যক্রমে অংশগ্রহণ করেছে।",
    ssc: "SSC ২০২৪",
    hsc: "HSC ২০২৪",
    pass: "পাসের হার",
    awards: "অর্জন দেখুন",
    closingLabel: "০৭ / পরবর্তী অধ্যায়",
    closingTitle: "একটি তরুণ মনের শুরুর জন্য একটি জায়গা দিন।",
    closingBody:
      "ভর্তি, প্রতিষ্ঠান ও শিক্ষার্থীদের দৈনন্দিন অভিজ্ঞতা সম্পর্কে জানুন এবং KCMSC-কে কাছ থেকে দেখুন।",
    contact: "যোগাযোগ",
  },
} as const;

const images = {
  hero: "/kcmsc/kc/kcmsc1.jpg",
  campus: "/kcmsc/kc/kcmsc3.jpg",
  life: "/kcmsc/student-life/vibrant_student_life2.jpg",
  culture: "/kcmsc/student-life/vibrant_art_culture.jpg",
  sports: "/kcmsc/sports/kc_team_representing_at_AIUB.jpg",
  library: "/kcmsc/facilities/students_at_library.jpg",
  lab: "/kcmsc/facilities/teacher_taking_class.jpg",
  garden: "/kcmsc/facilities/rooftop_garden.jpg",
  olympiad: "/kcmsc/facilities/ict_olympiad_at_kc.jpg",
} as const;

export function LandingExperience({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <div className="kc-home overflow-hidden bg-background">
      <section className="relative min-h-[calc(100svh-72px)] bg-[#102f24] text-white">
        <img
          src={images.hero}
          alt="K C Model School & College campus"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,13,.88)_0%,rgba(6,18,13,.62)_42%,rgba(6,18,13,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#06120d]/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1500px] items-end px-6 pb-8 pt-24 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
          <div className="grid w-full gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="kc-eyebrow text-white/70">{t.heroEyebrow}</p>
              <h1 className="mt-5 max-w-4xl font-heading text-5xl leading-[.93] tracking-[-.04em] sm:text-7xl lg:text-[7.1rem]">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
                {t.heroBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/admissions`} className="kc-button kc-button-light">
                  {t.admissions}
                </Link>
                <Link href={`/${locale}/about`} className="kc-button kc-button-glass">
                  {t.explore}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="border-l border-white/20 pl-6">
                <p className="text-[10px] uppercase tracking-[.28em] text-white/50">{t.scroll}</p>
                <div className="mt-5 h-px w-full bg-white/20">
                  <div className="h-px w-1/3 bg-brass" />
                </div>
                <p className="mt-4 font-heading text-2xl text-white/90">01 — 07</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kc-section bg-background">
        <div className="mx-auto grid max-w-content gap-12 px-6 sm:px-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:px-14">
          <div>
            <p className="kc-eyebrow">{t.storyLabel}</p>
            <h2 className="kc-display mt-5 max-w-2xl">{t.storyTitle}</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-8 text-ink-muted sm:text-lg">{t.storyBody}</p>
            <Link href={`/${locale}/about`} className="kc-text-link mt-7">
              {t.heritage} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 pb-4 sm:px-8 sm:pb-8 lg:px-10">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[1.75rem] bg-primary-dark text-white">
          <img src={images.campus} alt="KCMSC interior campus space" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-primary-dark/75" />
          <div className="relative grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t.students, t.studentsValue],
              [t.grades, t.gradesValue],
              [t.versions, t.versionsValue],
              [t.hours, t.hoursValue],
            ].map(([label, value]) => (
              <div key={label} className="min-h-40 border-white/10 p-7 sm:border-r sm:p-9 lg:min-h-48">
                <p className="text-[10px] uppercase tracking-[.25em] text-brass">{label}</p>
                <p className="mt-6 max-w-[13rem] font-heading text-2xl leading-tight sm:text-3xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kc-section bg-background">
        <div className="mx-auto max-w-content px-6 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="kc-eyebrow">{t.wingsLabel}</p>
              <h2 className="kc-display mt-5">{t.wingsTitle}</h2>
            </div>
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <p className="max-w-xl text-sm leading-7 text-ink-muted sm:text-base">{t.wingsBody}</p>
              <Link href={`/${locale}/academics`} className="kc-text-link shrink-0">
                {t.academics} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Link href={`/${locale}/academics`} className="kc-feature-card group">
              <img src={images.life} alt="Students at KCMSC" className="kc-feature-image" />
              <div className="kc-feature-overlay" />
              <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-end p-7 text-white sm:p-10">
                <span className="kc-card-number">01</span>
                <h3 className="mt-4 font-heading text-4xl">{t.junior}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{t.juniorText}</p>
              </div>
            </Link>
            <Link href={`/${locale}/academics`} className="kc-feature-card group">
              <img src={images.lab} alt="Teacher and students in a classroom" className="kc-feature-image" />
              <div className="kc-feature-overlay" />
              <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-end p-7 text-white sm:p-10">
                <span className="kc-card-number">02</span>
                <h3 className="mt-4 font-heading text-4xl">{t.senior}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{t.seniorText}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-20 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="kc-eyebrow">{t.lifeLabel}</p>
              <h2 className="kc-display mt-5">{t.lifeTitle}</h2>
            </div>
            <div>
              <p className="max-w-xl text-sm leading-7 text-ink-muted sm:text-base">{t.lifeBody}</p>
              <Link href={`/${locale}/student-life`} className="kc-text-link mt-7">
                {t.viewLife} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [images.culture, "01", "Arts & culture"],
              [images.sports, "02", "Sport & teamwork"],
              [images.olympiad, "03", "Competitions"],
              [images.library, "04", "Reading & research"],
            ].map(([src, number, title]) => (
              <Link href={`/${locale}/student-life`} key={src} className="group relative overflow-hidden rounded-2xl bg-black">
                <img src={src} alt={title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-[10px] uppercase tracking-[.25em] text-white/55">{number}</span>
                  <p className="mt-2 font-heading text-xl">{title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="kc-section bg-background">
        <div className="mx-auto grid max-w-content gap-12 px-6 sm:px-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-14">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <img src={images.garden} alt="Students in the KCMSC rooftop garden" className="aspect-[1.15/1] w-full object-cover" />
            <div className="absolute left-5 top-5 rounded-full bg-background/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.22em] text-primary-dark backdrop-blur">
              {t.rooftop}
            </div>
          </div>
          <div>
            <p className="kc-eyebrow">{t.facilitiesLabel}</p>
            <h2 className="kc-display mt-5">{t.facilitiesTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-ink-muted sm:text-base">{t.facilitiesBody}</p>
            <div className="mt-8 grid grid-cols-2 border-y border-border">
              {[
                [t.rooftop, "01"],
                [t.library, "02"],
                [t.lab, "03"],
                [t.sports, "04"],
              ].map(([label, number]) => (
                <div key={label} className="flex items-center justify-between border-b border-border px-0 py-4 text-sm text-ink last:border-0 even:border-l even:pl-5">
                  <span>{label}</span><span className="font-heading text-xs text-brass">{number}</span>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/facilities`} className="kc-text-link mt-7">
              {t.facilities} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-content px-6 py-20 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="kc-eyebrow text-brass">{t.resultsLabel}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-4xl leading-tight sm:text-6xl">{t.resultsTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{t.resultsBody}</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                [t.ssc, "98.48%"],
                [t.hsc, "100%"],
              ].map(([label, value]) => (
                <div key={label} className="bg-primary-dark p-6 sm:p-8">
                  <p className="text-[10px] uppercase tracking-[.25em] text-white/45">{label}</p>
                  <p className="mt-6 font-heading text-4xl sm:text-5xl">{value}</p>
                  <p className="mt-2 text-xs text-white/45">{t.pass}</p>
                </div>
              ))}
            </div>
          </div>
          <Link href={`/${locale}/achievements`} className="mt-10 inline-flex items-center gap-3 border-b border-brass pb-2 text-sm font-semibold text-white">
            {t.awards} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-24 sm:px-10 lg:px-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#ebe8dc] px-7 py-14 sm:px-12 sm:py-20 lg:px-20">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-primary/10" />
            <div className="absolute -right-4 -top-8 h-40 w-40 rounded-full border border-brass/30" />
            <div className="relative max-w-3xl">
              <p className="kc-eyebrow">{t.closingLabel}</p>
              <h2 className="kc-display mt-5">{t.closingTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">{t.closingBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/admissions`} className="kc-button kc-button-dark">{t.admissions}</Link>
                <Link href={`/${locale}/contact`} className="kc-button kc-button-outline">{t.contact}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
