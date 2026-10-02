import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { HeroSlideshow } from "./HeroSlideshow";

const copy = {
  en: {
    glance: "At a glance",
    students: "Students",
    range: "Range",
    versions: "Versions",
    hours: "School day",
    studentsValue: "2,336",
    rangeValue: "Play Group – XII",
    versionsValue: "Bangla + English",
    hoursValue: "Sun–Thu · 7:45–2:30",
    storyKicker: "THE SCHOOL",
    storyTitle: "A clear purpose, from the first classroom to higher secondary.",
    storyBody: "Founded in 2014 and opened on 1 January 2015, KC Model School & College was established to help students develop their academic ability alongside discipline, values and responsibility.",
    storyLink: "Our story",
    focusKicker: "EXPLORE",
    focusTitle: "Three parts of school life, one shared direction.",
    academics: "Academics",
    academicsBody: "Junior and Senior Wings follow the Bangla and English Versions of the National Curriculum from the early years through Grade XII.",
    life: "Student life",
    lifeBody: "Culture, reading, sport, trips and school events give students ways to learn and participate beyond regular lessons.",
    campus: "Campus",
    campusBody: "Libraries, science and computer labs, sports spaces and rooftop gardens support learning throughout the school day.",
    academicsLink: "Explore academics",
    lifeLink: "See student life",
    campusLink: "View facilities",
    missionKicker: "MISSION & VISION",
    mission: "To help students discover and develop their physical, mental and spiritual potential while growing into responsible global citizens.",
    vision: "To nurture capable, responsible global citizens equipped to excel in the 21st century.",
    resultsKicker: "ACADEMIC RESULTS",
    resultsTitle: "Recent results, without the clutter.",
    resultsBody: "The 2024 board-examination results are summarised below.",
    ssc: "SSC 2024",
    hsc: "HSC 2024",
    candidates: "candidates",
    passed: "passed",
    gpa5: "GPA 5",
    resultsLink: "Results & achievements",
    admissionKicker: "ADMISSIONS",
    admissionTitle: "Information for families starts here.",
    admissionBody: "Find admission information, notices and contact details in one place.",
    admissionLink: "Admissions",
    contactLink: "Contact",
  },
  bn: {
    glance: "এক নজরে",
    students: "শিক্ষার্থী",
    range: "শিক্ষার পরিসর",
    versions: "ভার্সন",
    hours: "স্কুলের সময়",
    studentsValue: "২,৩৩৬",
    rangeValue: "প্লে গ্রুপ – দ্বাদশ",
    versionsValue: "বাংলা + ইংরেজি",
    hoursValue: "রবি–বৃহস্পতি · ৭:৪৫–২:৩০",
    storyKicker: "স্কুল",
    storyTitle: "প্রথম শ্রেণিকক্ষ থেকে উচ্চমাধ্যমিক পর্যন্ত একটি স্পষ্ট শিক্ষাপথ।",
    storyBody: "২০১৪ সালে প্রতিষ্ঠিত এবং ১ জানুয়ারি ২০১৫-তে যাত্রা শুরু করা KC Model School & College একাডেমিক শিক্ষার পাশাপাশি শৃঙ্খলা, মূল্যবোধ ও দায়িত্ববোধ গড়ে তোলার লক্ষ্য নিয়ে এগিয়ে চলে।",
    storyLink: "আমাদের গল্প",
    focusKicker: "দেখুন",
    focusTitle: "স্কুলজীবনের তিনটি দিক, একটি অভিন্ন লক্ষ্য।",
    academics: "একাডেমিক",
    academicsBody: "জুনিয়র ও সিনিয়র উইং বাংলা ও ইংরেজি ভার্সনে প্রাথমিক পর্যায় থেকে দ্বাদশ শ্রেণি পর্যন্ত জাতীয় শিক্ষাক্রম অনুসরণ করে।",
    life: "শিক্ষাজীবন",
    lifeBody: "সংস্কৃতি, বই পড়া, খেলাধুলা, শিক্ষা সফর ও বিভিন্ন আয়োজনে নিয়মিত ক্লাসের বাইরেও শেখার সুযোগ থাকে।",
    campus: "ক্যাম্পাস",
    campusBody: "লাইব্রেরি, বিজ্ঞান ও কম্পিউটার ল্যাব, খেলাধুলার স্থান এবং ছাদবাগান দৈনন্দিন শিক্ষাকে সহায়তা করে।",
    academicsLink: "একাডেমিক দেখুন",
    lifeLink: "শিক্ষাজীবন দেখুন",
    campusLink: "সুবিধা দেখুন",
    missionKicker: "লক্ষ্য ও দৃষ্টিভঙ্গি",
    mission: "শিক্ষার্থীদের শারীরিক, মানসিক ও আধ্যাত্মিক সম্ভাবনা বিকশিত করে দায়িত্বশীল বিশ্বনাগরিক হিসেবে গড়ে তোলা।",
    vision: "২১শ শতকে উৎকর্ষের জন্য সক্ষম ও দায়িত্বশীল বিশ্বনাগরিক গড়ে তোলা।",
    resultsKicker: "একাডেমিক ফলাফল",
    resultsTitle: "ফলাফল, অপ্রয়োজনীয় জটিলতা ছাড়া।",
    resultsBody: "২০২৪ সালের বোর্ড পরীক্ষার ফলাফল সংক্ষেপে নিচে দেখানো হয়েছে।",
    ssc: "SSC ২০২৪",
    hsc: "HSC ২০২৪",
    candidates: "পরীক্ষার্থী",
    passed: "উত্তীর্ণ",
    gpa5: "GPA 5",
    resultsLink: "ফলাফল ও অর্জন",
    admissionKicker: "ভর্তি",
    admissionTitle: "পরিবারের জন্য প্রয়োজনীয় তথ্য এক জায়গায়।",
    admissionBody: "ভর্তি, নোটিশ ও যোগাযোগের তথ্য সহজে খুঁজে নিন।",
    admissionLink: "ভর্তি",
    contactLink: "যোগাযোগ",
  },
} as const;

const images = {
  story: "/kcmsc/media/IMG-20260113-WA0005.jpg",
  academics: "/kcmsc/media/teacher_taking_class.jpg",
  life: "/kcmsc/media/vibrant_student_culture.jpg",
  campus: "/kcmsc/media/IMG-20230807-WA0034.jpg",
} as const;

export function LandingExperience({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className="bg-[#f6f2e9] text-[#20362d]">
      <HeroSlideshow locale={locale} />

      <section className="border-b border-[#d8d1c3] bg-[#183d2e] text-white">
        <div className="mx-auto grid max-w-[1320px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t.students, t.studentsValue],
            [t.range, t.rangeValue],
            [t.versions, t.versionsValue],
            [t.hours, t.hoursValue],
          ].map(([label, value], index) => (
            <div key={label} className={`px-5 py-6 sm:px-7 lg:px-8 lg:py-7 ${index ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""}`}>
              <p className="kc-light-kicker">{label}</p>
              <p className="mt-2 font-heading text-xl leading-tight text-[#f4eee1] sm:text-2xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kc-classic-section">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 lg:px-10">
          <div>
            <p className="kc-classic-kicker">{t.storyKicker}</p>
            <h2 className="kc-classic-title mt-4 max-w-xl text-[clamp(2.5rem,4.5vw,4.7rem)]">{t.storyTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#69716a] sm:text-base">{t.storyBody}</p>
            <Link href={`/${locale}/about`} className="kc-classic-link mt-7">{t.storyLink}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#ddd7ca]">
            <Image src={images.story} alt="KCMSC students and staff on campus" fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d1c3] bg-[#ece7dc]">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="kc-classic-kicker">{t.focusKicker}</p>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,4.6vw,4.7rem)] leading-[.96] tracking-[-.035em] text-[#183d2e]">{t.focusTitle}</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: t.academics, body: t.academicsBody, image: images.academics, href: "academics", link: t.academicsLink },
              { title: t.life, body: t.lifeBody, image: images.life, href: "student-life", link: t.lifeLink },
              { title: t.campus, body: t.campusBody, image: images.campus, href: "facilities", link: t.campusLink },
            ].map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-sm border border-[#d2cabb] bg-[#f9f6ef]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-2xl text-[#183d2e]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#69716a]">{item.body}</p>
                  <Link href={`/${locale}/${item.href}`} className="kc-classic-link mt-5">{item.link}<span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8d1c3] bg-[#183d2e] text-[#f6f2e9]">
        <div className="mx-auto grid max-w-[1240px] lg:grid-cols-2">
          <div className="border-b border-white/15 px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-16">
            <p className="kc-light-kicker">{t.missionKicker}</p>
            <h2 className="mt-5 font-heading text-[clamp(2.1rem,4vw,4rem)] leading-[1.02] tracking-[-.03em]">{t.mission}</h2>
          </div>
          <div className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
            <p className="kc-light-kicker">{locale === "bn" ? "দৃষ্টিভঙ্গি" : "Vision"}</p>
            <h2 className="mt-5 font-heading text-[clamp(2.1rem,4vw,4rem)] leading-[1.02] tracking-[-.03em]">{t.vision}</h2>
          </div>
        </div>
      </section>

      <section className="kc-classic-section">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="kc-classic-kicker">{t.resultsKicker}</p>
              <h2 className="kc-classic-title mt-4 max-w-xl text-[clamp(2.5rem,4.4vw,4.6rem)]">{t.resultsTitle}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#69716a]">{t.resultsBody}</p>
              <Link href={`/${locale}/achievements`} className="kc-classic-link mt-6">{t.resultsLink}<span aria-hidden="true">↗</span></Link>
            </div>

            <div className="grid overflow-hidden rounded-sm border border-[#d3ccbf] bg-[#f9f6ef] sm:grid-cols-2">
              <div className="border-b border-[#d3ccbf] p-6 sm:border-b-0 sm:border-r sm:p-8">
                <p className="kc-classic-kicker">{t.ssc}</p>
                <p className="mt-4 font-heading text-5xl text-[#183d2e]">98.48%</p>
                <p className="mt-3 text-xs leading-5 text-[#69716a]">130 {t.candidates} · 128 {t.passed} · 67 {t.gpa5}</p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="kc-classic-kicker">{t.hsc}</p>
                <p className="mt-4 font-heading text-5xl text-[#183d2e]">100%</p>
                <p className="mt-3 text-xs leading-5 text-[#69716a]">47 {t.candidates} · 47 {t.passed} · 13 {t.gpa5}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8d1c3] bg-[#ece7dc]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
          <div>
            <p className="kc-classic-kicker">{t.admissionKicker}</p>
            <h2 className="mt-4 max-w-3xl font-heading text-[clamp(2.4rem,4.3vw,4.4rem)] leading-[.98] tracking-[-.035em] text-[#183d2e]">{t.admissionTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#69716a]">{t.admissionBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-primary">{t.admissionLink}</Link>
            <Link href={`/${locale}/contact`} className="kc-classic-button kc-classic-button-outline">{t.contactLink}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
