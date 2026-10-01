import Image from "next/image";
import { HeroSlideshow } from "./HeroSlideshow";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

const content = {
  en: {
    heroKicker: "K C MODEL SCHOOL & COLLEGE · EST. 2014",
    heroTitle: "A place to learn. A place to belong.",
    heroBody:
      "K C Model School & College brings together purposeful teaching, disciplined learning, culture, sport and everyday school life from Play Group to Grade Twelve.",
    heroPrimary: "Admissions",
    heroSecondary: "Discover KCMSC",
    heroCaption: "K C Model School & College · Dakshinkhan, Dhaka",
    introKicker: "OUR SCHOOL",
    introTitle: "Education with purpose, character and a sense of community.",
    introBody:
      "Founded by Al-Hajj Md. Khashru Chowdhury (CIP), KC Model School and College began its journey in January 2015. The school was established to give young people a strong academic foundation while helping them grow in discipline, values, confidence and responsibility.",
    introLink: "Read the school's story",
    glanceKicker: "AT A GLANCE",
    students: "Students",
    grades: "Learning journey",
    medium: "Versions",
    hours: "School hours",
    studentsValue: "2,336",
    gradesValue: "Play Group – XII",
    mediumValue: "Bangla + English",
    hoursValue: "7:45 AM – 2:30 PM",
    academicsKicker: "01 · ACADEMICS",
    academicsTitle: "One school, with a clear path from the early years to higher secondary.",
    academicsBody:
      "The Junior Wing focuses on strong foundations in the early years and primary classes. The Senior Wing carries students through secondary and higher secondary education with the same school-wide emphasis on learning, discipline and development.",
    junior: "Junior Wing",
    juniorBody: "Pre-Primary & Primary · Play Group to Class 5",
    senior: "Senior Wing",
    seniorBody: "Secondary & Higher Secondary · Class 6 to XII",
    academicsLink: "Explore academics",
    lifeKicker: "02 · SCHOOL LIFE",
    lifeTitle: "What students learn beyond the textbook matters too.",
    lifeBody:
      "School life at KCMSC extends into culture, sport, competitions, reading, trips and shared celebrations. These are not decorations around education. They are part of growing up in a school community.",
    culture: "Culture & creativity",
    cultureBody: "Students take part in art, cultural programmes and shared school events.",
    sports: "Sport & teamwork",
    sportsBody: "Teams represent the school in sporting activities and competitions.",
    olympiad: "Competitions",
    olympiadBody: "Students participate in academic and technology-focused competitions.",
    lifeLink: "See student life",
    campusKicker: "03 · THE CAMPUS",
    campusTitle: "A campus made for everyday learning.",
    campusBody:
      "Classrooms, libraries, laboratories, computer facilities, sports spaces and rooftop gardens give students places to study, practise, collaborate and take part in school life.",
    library: "Library",
    libraryBody: "A dedicated space for reading, study and exploration.",
    garden: "Rooftop garden",
    gardenBody: "Students take part in caring for greenery on the school's rooftop gardens.",
    facilitiesLink: "Explore facilities",
    achievementKicker: "04 · ACHIEVEMENT",
    achievementTitle: "A strong record, built one student at a time.",
    achievementBody:
      "The school's 2024 academic profile records a 98.48% SSC pass rate and a 100% HSC pass rate. Students have also represented KCMSC in national academic and co-curricular competitions.",
    ssc: "SSC 2024",
    hsc: "HSC 2024",
    passRate: "Pass rate",
    achievementLink: "View achievements",
    admissionKicker: "ADMISSIONS",
    admissionTitle: "The next chapter starts here.",
    admissionBody:
      "Learn about admission, meet the school and find the information you need for your child's next stage of education.",
    admissionButton: "Admissions",
    contactButton: "Contact the school",
  },
  bn: {
    heroKicker: "কে সি মডেল স্কুল অ্যান্ড কলেজ · প্রতিষ্ঠিত ২০১৪",
    heroTitle: "শেখার জায়গা। আপন হয়ে ওঠার জায়গা।",
    heroBody:
      "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত KC Model School & College-এ পাঠদান, শৃঙ্খলা, সংস্কৃতি, খেলাধুলা ও দৈনন্দিন শিক্ষাজীবন একসঙ্গে এগিয়ে চলে।",
    heroPrimary: "ভর্তি",
    heroSecondary: "KCMSC সম্পর্কে",
    heroCaption: "K C Model School & College · দক্ষিণখান, ঢাকা",
    introKicker: "আমাদের স্কুল",
    introTitle: "উদ্দেশ্য, মূল্যবোধ ও সম্প্রদায়বোধ নিয়ে শিক্ষা।",
    introBody:
      "আলহাজ্ব মো. খসরু চৌধুরী (সিআইপি)-এর উদ্যোগে KC Model School and College ২০১৫ সালের জানুয়ারিতে যাত্রা শুরু করে। একাডেমিক ভিত্তির পাশাপাশি শৃঙ্খলা, মূল্যবোধ, আত্মবিশ্বাস ও দায়িত্ববোধ গড়ে তোলাই এর শিক্ষাদর্শের গুরুত্বপূর্ণ অংশ।",
    introLink: "স্কুলের গল্প পড়ুন",
    glanceKicker: "এক নজরে",
    students: "শিক্ষার্থী",
    grades: "শিক্ষার পরিসর",
    medium: "ভার্সন",
    hours: "শিক্ষার সময়",
    studentsValue: "২,৩৩৬",
    gradesValue: "প্লে গ্রুপ – দ্বাদশ",
    mediumValue: "বাংলা + ইংরেজি",
    hoursValue: "৭:৪৫ – ২:৩০",
    academicsKicker: "০১ · একাডেমিক",
    academicsTitle: "শুরুর বছর থেকে উচ্চমাধ্যমিক পর্যন্ত একটি পরিষ্কার শিক্ষাপথ।",
    academicsBody:
      "জুনিয়র উইং প্রাথমিক বছর ও প্রাইমারি পর্যায়ে শক্ত ভিত্তি তৈরি করে। সিনিয়র উইং মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ে একই শিক্ষা, শৃঙ্খলা ও বিকাশের ধারাকে এগিয়ে নিয়ে যায়।",
    junior: "জুনিয়র উইং",
    juniorBody: "প্রি-প্রাইমারি ও প্রাইমারি · প্লে গ্রুপ থেকে পঞ্চম",
    senior: "সিনিয়র উইং",
    seniorBody: "মাধ্যমিক ও উচ্চমাধ্যমিক · ষষ্ঠ থেকে দ্বাদশ",
    academicsLink: "একাডেমিক দেখুন",
    lifeKicker: "০২ · শিক্ষাজীবন",
    lifeTitle: "বইয়ের বাইরের শেখাটাও গুরুত্বপূর্ণ।",
    lifeBody:
      "সংস্কৃতি, খেলাধুলা, প্রতিযোগিতা, বইপড়া, শিক্ষা সফর ও বিভিন্ন অনুষ্ঠান KCMSC-এর শিক্ষাজীবনের অংশ। এগুলো শিক্ষার বাইরের কিছু নয়, বরং একটি স্কুল সম্প্রদায়ে বেড়ে ওঠার অংশ।",
    culture: "সংস্কৃতি ও সৃজনশীলতা",
    cultureBody: "শিক্ষার্থীরা শিল্প, সাংস্কৃতিক অনুষ্ঠান ও বিভিন্ন স্কুল আয়োজনে অংশ নেয়।",
    sports: "খেলাধুলা ও দলগত কাজ",
    sportsBody: "দলগুলো বিভিন্ন খেলাধুলা ও প্রতিযোগিতায় স্কুলকে প্রতিনিধিত্ব করে।",
    olympiad: "প্রতিযোগিতা",
    olympiadBody: "শিক্ষার্থীরা একাডেমিক ও প্রযুক্তিভিত্তিক প্রতিযোগিতায় অংশগ্রহণ করে।",
    lifeLink: "শিক্ষাজীবন দেখুন",
    campusKicker: "০৩ · ক্যাম্পাস",
    campusTitle: "দৈনন্দিন শেখার জন্য তৈরি একটি ক্যাম্পাস।",
    campusBody:
      "শ্রেণিকক্ষ, লাইব্রেরি, ল্যাবরেটরি, কম্পিউটার সুবিধা, খেলাধুলার স্থান ও ছাদবাগান শিক্ষার্থীদের পড়াশোনা, অনুশীলন, সহযোগিতা ও অংশগ্রহণের সুযোগ দেয়।",
    library: "লাইব্রেরি",
    libraryBody: "পড়া, অধ্যয়ন ও অনুসন্ধানের জন্য নির্দিষ্ট স্থান।",
    garden: "ছাদবাগান",
    gardenBody: "শিক্ষার্থীরা স্কুলের ছাদবাগানের সবুজায়ন ও পরিচর্যায় অংশ নেয়।",
    facilitiesLink: "সুবিধাসমূহ দেখুন",
    achievementKicker: "০৪ · অর্জন",
    achievementTitle: "প্রতিটি শিক্ষার্থীর ধারাবাহিক প্রচেষ্টায় গড়ে ওঠা সাফল্য।",
    achievementBody:
      "স্কুলের ২০২৪ সালের একাডেমিক প্রোফাইলে SSC-তে ৯৮.৪৮% এবং HSC-তে ১০০% পাসের হার উল্লেখ রয়েছে। পাশাপাশি শিক্ষার্থীরা জাতীয় পর্যায়ের একাডেমিক ও সহশিক্ষা কার্যক্রমে অংশগ্রহণ করেছে।",
    ssc: "SSC ২০২৪",
    hsc: "HSC ২০২৪",
    passRate: "পাসের হার",
    achievementLink: "অর্জন দেখুন",
    admissionKicker: "ভর্তি",
    admissionTitle: "পরবর্তী অধ্যায়ের শুরু এখান থেকেই।",
    admissionBody:
      "ভর্তি সম্পর্কে জানুন, স্কুলকে কাছ থেকে দেখুন এবং সন্তানের পরবর্তী শিক্ষাধাপের জন্য প্রয়োজনীয় তথ্য খুঁজে নিন।",
    admissionButton: "ভর্তি",
    contactButton: "যোগাযোগ",
  },
} as const;

const images = {
  atrium: "/kcmsc/kc/kcmsc3.jpg",
  classroom: "/kcmsc/facilities/teacher_taking_class.jpg",
  culture: "/kcmsc/student-life/vibrant_art_culture.jpg",
  sports: "/kcmsc/sports/kc_team_representing_at_AIUB.jpg",
  olympiad: "/kcmsc/facilities/ict_olympiad_at_kc.jpg",
  library: "/kcmsc/facilities/students_at_library.jpg",
  garden: "/kcmsc/facilities/rooftop_garden.jpg",
} as const;

function Rule() {
  return <div className="h-px w-full bg-[#d7d1c4]" aria-hidden="true" />;
}

export function LandingExperience({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <div className="kc-home bg-[#f5f1e8] text-[#20362d]">
      <HeroSlideshow locale={locale} />

      {/* At a glance */}
      <section className="bg-[#183d2e] text-white">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t.students, t.studentsValue],
            [t.grades, t.gradesValue],
            [t.medium, t.mediumValue],
            [t.hours, t.hoursValue],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`px-6 py-8 sm:px-10 lg:px-12 lg:py-10 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="kc-light-kicker">{label}</p>
              <p className="mt-3 font-heading text-2xl leading-tight text-[#f4eee1] sm:text-3xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="kc-classic-section">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-12">
          <div className="lg:pt-6">
            <p className="kc-classic-kicker">{t.introKicker}</p>
            <h2 className="kc-classic-title mt-5">{t.introTitle}</h2>
            <Link href={`/${locale}/about`} className="kc-classic-link mt-8">
              {t.introLink} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-[#d0c9bb] bg-white p-3 sm:p-4">
              <Image
                src={images.atrium}
                alt="Interior atrium of K C Model School & College"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">{t.introBody}</p>
          </div>
        </div>
      </section>

      {/* Academics */}
      <section className="border-y border-[#d7d1c4] bg-[#ece7dc]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="kc-classic-kicker">{t.academicsKicker}</p>
              <h2 className="kc-classic-title mt-5 max-w-2xl">{t.academicsTitle}</h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-[#667068] sm:text-base">{t.academicsBody}</p>
              <Link href={`/${locale}/academics`} className="kc-classic-link mt-7">
                {t.academicsLink} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
            <div className="relative min-h-[300px] overflow-hidden border border-[#cfc7b8] bg-white p-2">
              <Image
                src={images.classroom}
                alt="Teacher taking a class at K C Model School & College"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid border-y border-[#cfc7b8] md:grid-cols-2">
              <article className="py-8 md:pr-8 lg:py-10">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">01</p>
              <h3 className="mt-4 font-heading text-3xl text-[#183d2e]">{t.junior}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#69716a]">{t.juniorBody}</p>
              </article>
              <article className="border-t border-[#cfc7b8] py-8 md:border-l md:border-t-0 md:pl-8 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">02</p>
                <h3 className="mt-4 font-heading text-3xl text-[#183d2e]">{t.senior}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#69716a]">{t.seniorBody}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Student life */}
      <section className="kc-classic-section bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="kc-classic-kicker">{t.lifeKicker}</p>
            <h2 className="kc-classic-title mt-5">{t.lifeTitle}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">{t.lifeBody}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [images.culture, t.culture, t.cultureBody, "object-center"],
              [images.sports, t.sports, t.sportsBody, "object-center"],
              [images.olympiad, t.olympiad, t.olympiadBody, "object-center"],
            ].map(([src, title, body, objectPosition], index) => (
              <article key={title} className="group border border-[#d3ccbf] bg-[#faf8f2]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover ${objectPosition} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">0{index + 1}</p>
                  <h3 className="mt-3 font-heading text-2xl text-[#183d2e]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#69716a]">{body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href={`/${locale}/student-life`} className="kc-classic-link mt-8">
            {t.lifeLink} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Campus */}
      <section className="border-y border-[#d7d1c4] bg-[#e8e2d6]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[480px] lg:min-h-[620px]">
            <Image
              src={images.garden}
              alt="Students at the rooftop garden of K C Model School & College"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <p className="kc-classic-kicker">{t.campusKicker}</p>
            <h2 className="kc-classic-title mt-5">{t.campusTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#69716a] sm:text-base">{t.campusBody}</p>

            <div className="mt-10 border-t border-[#c8c0b1]">
              <div className="grid gap-8 border-b border-[#c8c0b1] py-7 sm:grid-cols-2">
                <div>
                  <h3 className="font-heading text-2xl text-[#183d2e]">{t.library}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#69716a]">{t.libraryBody}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden border border-[#cfc7b8] bg-white p-2">
                  <Image
                    src={images.library}
                    alt="KCMSC students reading in the library"
                    fill
                    sizes="(min-width: 640px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="py-7">
                <h3 className="font-heading text-2xl text-[#183d2e]">{t.garden}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#69716a]">{t.gardenBody}</p>
              </div>
            </div>
            <Link href={`/${locale}/facilities`} className="kc-classic-link mt-2">
              {t.facilitiesLink} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievement */}
      <section className="kc-classic-section bg-[#183d2e] text-white">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:px-12">
          <div>
            <p className="kc-light-kicker">{t.achievementKicker}</p>
            <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.035em] text-[#f5f0e4]">
              {t.achievementTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{t.achievementBody}</p>
            <Link href={`/${locale}/achievements`} className="kc-classic-link kc-classic-link-light mt-8">
              {t.achievementLink} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 border-y border-white/20">
            <div className="px-5 py-8 sm:px-8 sm:py-10">
              <p className="kc-light-kicker">{t.ssc}</p>
              <p className="mt-5 font-heading text-5xl text-[#f5f0e4] sm:text-6xl">98.48%</p>
              <p className="mt-2 text-xs text-white/45">{t.passRate}</p>
            </div>
            <div className="border-l border-white/20 px-5 py-8 sm:px-8 sm:py-10">
              <p className="kc-light-kicker">{t.hsc}</p>
              <p className="mt-5 font-heading text-5xl text-[#f5f0e4] sm:text-6xl">100%</p>
              <p className="mt-2 text-xs text-white/45">{t.passRate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <Rule />
          <div className="grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="kc-classic-kicker">{t.admissionKicker}</p>
              <h2 className="kc-classic-title mt-5 max-w-3xl">{t.admissionTitle}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">{t.admissionBody}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-primary">
                {t.admissionButton}
              </Link>
              <Link href={`/${locale}/contact`} className="kc-classic-button kc-classic-button-outline">
                {t.contactButton}
              </Link>
            </div>
          </div>
          <Rule />
        </div>
      </section>
    </div>
  );
}
