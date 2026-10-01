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
    academicsTitle:
      "One school, with a clear path from the early years to higher secondary.",
    academicsBody:
      "The Junior Wing focuses on strong foundations in the early years and primary classes. The Senior Wing carries students through secondary and higher secondary education with the same school-wide emphasis on learning, discipline and development.",
    junior: "Junior Wing",
    juniorBody: "Pre-Primary & Primary · Play Group to Class 5",
    senior: "Senior Wing",
    seniorBody: "Secondary & Higher Secondary · Class 6 to XII",
    academicsLink: "Explore academics",

    lifeKicker: "02 · SCHOOL LIFE",
    lifeTitle: "Student life beyond the classroom.",
    lifeBody:
      "Students take part in cultural programmes, sports, competitions, reading, educational trips and school events alongside their regular classes.",
    culture: "Culture & creativity",
    cultureBody:
      "Students take part in art, cultural programmes and shared school events.",
    sports: "Sport & teamwork",
    sportsBody:
      "Teams represent the school in sporting activities and competitions.",
    olympiad: "Competitions",
    olympiadBody:
      "Students participate in academic and technology-focused competitions.",
    lifeLink: "See student life",

    campusKicker: "03 · CAMPUS & FACILITIES",
    campusTitle: "Facilities on campus.",
    campusBody:
      "KCMSC provides the practical facilities used throughout the school day, including classrooms, libraries, science and computer laboratories, sports spaces, water purification, transport and other student services.",
    library: "Library",
    libraryBody:
      "Students use the library for reading, class work and independent study.",
    garden: "Rooftop garden",
    gardenBody:
      "Rooftop gardens are maintained across the school buildings, with students taking part in planting and caring for the greenery.",
    facilitiesLink: "Explore facilities",

    achievementKicker: "04 · ACADEMIC RESULTS",
    achievementTitle: "Academic results, clearly recorded.",
    achievementBody:
      "The 2024 academic profile records 130 SSC candidates, with 128 passing and 67 achieving GPA 5. At HSC level, all 47 candidates passed, including 13 GPA 5 holders.",
    ssc: "SSC · 2024",
    hsc: "HSC · 2024",
    passRate: "Pass rate",
    achievementLink: "See academic results",

    admissionKicker: "ADMISSIONS & INFORMATION",
    admissionTitle: "Admission information for families.",
    admissionBody:
      "For admission requirements, procedures and current notices, visit the Admissions section or contact the school directly. The school serves students from Play Group through Grade Twelve in Bangla and English Versions of the National Curriculum.",
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
    academicsTitle:
      "শুরুর বছর থেকে উচ্চমাধ্যমিক পর্যন্ত একটি পরিষ্কার শিক্ষাপথ।",
    academicsBody:
      "জুনিয়র উইং প্রাথমিক বছর ও প্রাইমারি পর্যায়ে শক্ত ভিত্তি তৈরি করে। সিনিয়র উইং মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ে একই শিক্ষা, শৃঙ্খলা ও বিকাশের ধারাকে এগিয়ে নিয়ে যায়।",
    junior: "জুনিয়র উইং",
    juniorBody: "প্রি-প্রাইমারি ও প্রাইমারি · প্লে গ্রুপ থেকে পঞ্চম",
    senior: "সিনিয়র উইং",
    seniorBody: "মাধ্যমিক ও উচ্চমাধ্যমিক · ষষ্ঠ থেকে দ্বাদশ",
    academicsLink: "একাডেমিক দেখুন",

    lifeKicker: "০২ · শিক্ষাজীবন",
    lifeTitle: "শ্রেণিকক্ষের বাইরের শিক্ষাজীবন।",
    lifeBody:
      "নিয়মিত ক্লাসের পাশাপাশি শিক্ষার্থীরা সাংস্কৃতিক অনুষ্ঠান, খেলাধুলা, প্রতিযোগিতা, বই পড়া, শিক্ষা সফর ও বিভিন্ন স্কুল আয়োজনে অংশ নেয়।",
    culture: "সংস্কৃতি ও সৃজনশীলতা",
    cultureBody:
      "শিক্ষার্থীরা শিল্প, সাংস্কৃতিক অনুষ্ঠান ও বিভিন্ন স্কুল আয়োজনে অংশ নেয়।",
    sports: "খেলাধুলা ও দলগত কাজ",
    sportsBody:
      "দলগুলো বিভিন্ন খেলাধুলা ও প্রতিযোগিতায় স্কুলকে প্রতিনিধিত্ব করে।",
    olympiad: "প্রতিযোগিতা",
    olympiadBody:
      "শিক্ষার্থীরা একাডেমিক ও প্রযুক্তিভিত্তিক প্রতিযোগিতায় অংশগ্রহণ করে।",
    lifeLink: "শিক্ষাজীবন দেখুন",

    campusKicker: "০৩ · ক্যাম্পাস ও সুবিধা",
    campusTitle: "ক্যাম্পাসের সুবিধাসমূহ।",
    campusBody:
      "KCMSC-তে শ্রেণিকক্ষ, লাইব্রেরি, বিজ্ঞান ও কম্পিউটার ল্যাব, খেলাধুলার স্থানসহ শিক্ষার্থীদের দৈনন্দিন ব্যবহারের বিভিন্ন সুবিধা রয়েছে।",
    library: "লাইব্রেরি",
    libraryBody:
      "পড়াশোনা, বই পড়া ও ব্যক্তিগত অধ্যয়নের জন্য শিক্ষার্থীরা লাইব্রেরি ব্যবহার করে।",
    garden: "ছাদবাগান",
    gardenBody:
      "চারটি দশতলা ভবনের ছাদবাগানে শিক্ষার্থীরা গাছ লাগানো ও পরিচর্যার কাজে অংশ নেয়।",
    facilitiesLink: "সুবিধাসমূহ দেখুন",

    achievementKicker: "০৪ · একাডেমিক ফলাফল",
    achievementTitle: "একাডেমিক ফলাফল, স্পষ্ট তথ্যের ভিত্তিতে।",
    achievementBody:
      "২০২৪ সালের একাডেমিক প্রোফাইল অনুযায়ী SSC-তে ১৩০ জন পরীক্ষার্থীর মধ্যে ১২৮ জন উত্তীর্ণ এবং ৬৭ জন GPA 5 পেয়েছে। HSC-তে ৪৭ জনের সবাই উত্তীর্ণ হয়েছে এবং ১৩ জন GPA 5 পেয়েছে।",
    ssc: "SSC · ২০২৪",
    hsc: "HSC · ২০২৪",
    passRate: "পাসের হার",
    achievementLink: "একাডেমিক ফলাফল দেখুন",

    admissionKicker: "ভর্তি ও তথ্য",
    admissionTitle: "পরিবারের জন্য ভর্তি-সংক্রান্ত তথ্য।",
    admissionBody:
      "ভর্তির যোগ্যতা, প্রক্রিয়া ও বর্তমান নোটিশের জন্য Admissions বিভাগ দেখুন অথবা সরাসরি স্কুলের সঙ্গে যোগাযোগ করুন। KCMSC-তে প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত বাংলা ও ইংরেজি ভার্সনে জাতীয় শিক্ষাক্রম অনুসরণ করা হয়।",
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
              className={`px-6 py-8 sm:px-10 lg:px-12 lg:py-10 ${
                index > 0
                  ? "border-t border-white/15 sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <p className="kc-light-kicker">{label}</p>

              <p className="mt-3 font-heading text-2xl leading-tight text-[#f4eee1] sm:text-3xl">
                {value}
              </p>
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
              {t.introLink}
              <span aria-hidden="true">↗</span>
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

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">
              {t.introBody}
            </p>
          </div>
        </div>
      </section>

      {/* Academics */}
      <section className="border-y border-[#d7d1c4] bg-[#ece7dc]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="kc-classic-kicker">{t.academicsKicker}</p>

              <h2 className="kc-classic-title mt-5 max-w-2xl">
                {t.academicsTitle}
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-[#667068] sm:text-base">
                {t.academicsBody}
              </p>

              <Link
                href={`/${locale}/academics`}
                className="kc-classic-link mt-7"
              >
                {t.academicsLink}
                <span aria-hidden="true">↗</span>
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
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">
                  01
                </p>

                <h3 className="mt-4 font-heading text-3xl text-[#183d2e]">
                  {t.junior}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#69716a]">
                  {t.juniorBody}
                </p>
              </article>

              <article className="border-t border-[#cfc7b8] py-8 md:border-l md:border-t-0 md:pl-8 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">
                  02
                </p>

                <h3 className="mt-4 font-heading text-3xl text-[#183d2e]">
                  {t.senior}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#69716a]">
                  {t.seniorBody}
                </p>
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

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">
              {t.lifeBody}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                src: images.culture,
                title: t.culture,
                body: t.cultureBody,
              },
              {
                src: images.sports,
                title: t.sports,
                body: t.sportsBody,
              },
              {
                src: images.olympiad,
                title: t.olympiad,
                body: t.olympiadBody,
              },
            ].map((card, index) => (
              <article
                key={card.title}
                className="group border border-[#d3ccbf] bg-[#faf8f2]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a28742]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-3 font-heading text-2xl text-[#183d2e]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#69716a]">
                    {card.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Link
            href={`/${locale}/student-life`}
            className="kc-classic-link mt-8"
          >
            {t.lifeLink}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Campus & facilities */}
      <section className="border-y border-[#d7d1c4] bg-[#e9e4d9]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-20">
            <div>
              <p className="kc-classic-kicker">{t.campusKicker}</p>

              <h2 className="kc-classic-title mt-5 max-w-xl">
                {t.campusTitle}
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-sm leading-7 text-[#59645d] sm:text-base">
                {t.campusBody}
              </p>

              <Link
                href={`/${locale}/facilities`}
                className="kc-classic-link mt-7"
              >
                {t.facilitiesLink}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid border-y border-[#c8c0b1] lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-[#c8c0b1] py-8 sm:border-r sm:pr-10 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9b7e39]">
                  01
                </p>

                <h3 className="mt-4 font-heading text-2xl text-[#183d2e]">
                  {t.library}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#69716a]">
                  {t.libraryBody}
                </p>
              </div>

              <div className="border-b border-[#c8c0b1] py-8 sm:pl-10 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9b7e39]">
                  02
                </p>

                <h3 className="mt-4 font-heading text-2xl text-[#183d2e]">
                  Science & computer facilities
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#69716a]">
                  Air-conditioned computer laboratories and science laboratories
                  support classroom learning and practical work.
                </p>
              </div>

              <div className="border-b border-[#c8c0b1] py-8 sm:border-r sm:pr-10 lg:border-b-0 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9b7e39]">
                  03
                </p>

                <h3 className="mt-4 font-heading text-2xl text-[#183d2e]">
                  {t.garden}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#69716a]">
                  {t.gardenBody}
                </p>
              </div>

              <div className="py-8 sm:pl-10 lg:py-10">
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9b7e39]">
                  04
                </p>

                <h3 className="mt-4 font-heading text-2xl text-[#183d2e]">
                  Student services
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#69716a]">
                  The profile lists transport, residential facilities,
                  childcare, CCTV, generator backup and water purification among
                  the school's facilities and services.
                </p>
              </div>
            </div>

            <div className="relative min-h-[340px] border-t border-[#c8c0b1] sm:min-h-[420px] lg:border-l lg:border-t-0">
              <Image
                src={images.library}
                alt="KCMSC students reading together in the library"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-[#183d2e]/90 px-6 py-5 text-[#f5f0e4] sm:px-7">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d8bf72]">
                  KCMSC
                </p>

                <p className="mt-1 font-heading text-xl">School library</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic results */}
      <section className="kc-classic-section bg-[#183d2e] text-white">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:gap-20">
            <div>
              <p className="kc-light-kicker">{t.achievementKicker}</p>

              <h2 className="mt-5 max-w-2xl font-heading text-[clamp(2.4rem,4vw,4.2rem)] leading-[1.02] tracking-[-.025em] text-[#f5f0e4]">
                {t.achievementTitle}
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                {t.achievementBody}
              </p>

              <Link
                href={`/${locale}/achievements`}
                className="kc-classic-link kc-classic-link-light mt-8"
              >
                {t.achievementLink}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="border-t border-white/20">
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-white/20 py-8 sm:border-r sm:pr-10 sm:py-10">
                  <p className="kc-light-kicker">{t.ssc}</p>

                  <p className="mt-4 font-heading text-5xl text-[#f5f0e4]">
                    98.48%
                  </p>

                  <p className="mt-2 text-xs text-white/50">
                    {t.passRate} · 130 candidates · 128 passed · 67 GPA 5
                  </p>
                </div>

                <div className="border-b border-white/20 py-8 sm:pl-10 sm:py-10">
                  <p className="kc-light-kicker">{t.hsc}</p>

                  <p className="mt-4 font-heading text-5xl text-[#f5f0e4]">
                    100%
                  </p>

                  <p className="mt-2 text-xs text-white/50">
                    {t.passRate} · 47 candidates · 47 passed · 13 GPA 5
                  </p>
                </div>
              </div>

              <div className="grid border-b border-white/20 sm:grid-cols-2">
                <div className="py-7 sm:border-r sm:pr-10">
                  <p className="text-xs uppercase tracking-[.18em] text-white/45">
                    SSC · GPA 5
                  </p>

                  <p className="mt-2 font-heading text-3xl text-[#f5f0e4]">
                    67 students
                  </p>
                </div>

                <div className="py-7 sm:pl-10">
                  <p className="text-xs uppercase tracking-[.18em] text-white/45">
                    HSC · GPA 5
                  </p>

                  <p className="mt-2 font-heading text-3xl text-[#f5f0e4]">
                    13 students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <Rule />

          <div className="grid gap-10 py-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="kc-classic-kicker">{t.admissionKicker}</p>

              <h2 className="kc-classic-title mt-5 max-w-xl">
                {t.admissionTitle}
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">
                {t.admissionBody}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/admissions`}
                  className="kc-classic-button kc-classic-button-primary"
                >
                  {t.admissionButton}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="kc-classic-button kc-classic-button-outline"
                >
                  {t.contactButton}
                </Link>
              </div>
            </div>
          </div>

          <Rule />
        </div>
      </section>
    </div>
  );
}
