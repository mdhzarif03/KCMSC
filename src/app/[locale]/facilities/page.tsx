import Image from "next/image";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type FacilityEntry = { title: string; description: string };

async function getFacilityEntries(locale: Locale): Promise<FacilityEntry[]> {
  try {
    const rows = await prisma.facility.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "asc" }],
    });
    if (rows.length > 0) {
      return rows.map((f) => ({
        title: locale === "bn" ? f.titleBn : f.titleEn,
        description: locale === "bn" ? f.descriptionBn : f.descriptionEn,
      }));
    }
  } catch {
    // Fall back to the published profile content below when the CMS is unavailable.
  }
  return [];
}

const fallback = {
  en: {
    kicker: "THE CAMPUS",
    title: "Spaces made for school life.",
    intro:
      "KCMSC's campus brings classrooms, laboratories, libraries, student activities and everyday support together under one school environment, serving students from Play Group to Grade Twelve.",
    heroCaption: "K C Model School & College · Dhakshin Khan, Dhaka",
    spacesKicker: "LEARNING SPACES",
    spacesTitle: "The places students use every day.",
    spacesBody:
      "The school profile describes classrooms with natural light and ventilation, projector- and laptop-supported teaching, computer laboratories, science laboratories and separate library rooms for primary and secondary students.",
    libraryTitle: "Classrooms for focused learning.",
    libraryBody:
      "The school profile describes classrooms designed for regular teaching, with natural light, ventilation and technology-supported lessons. Separate library facilities are also available for primary and secondary students.",
    classroomTitle: "Sports and activity spaces.",
    classroomBody:
      "Sports are part of KCMSC's co-curricular programme, giving students opportunities to train, practise teamwork and represent the school in competitions.",
    facilitiesKicker: "ON CAMPUS",
    facilitiesTitle: "What the school provides.",
    facilitiesBody:
      "The following facilities are listed in the KCMSC profile and school content. They are presented here as a reference for students and families, rather than as decorative marketing claims.",
    gardenKicker: "ICT & TECHNOLOGY",
    gardenTitle: "Technology has a place in everyday school life.",
    gardenBody:
      "KCMSC's profile lists air-conditioned computer laboratories with 50+ PCs and high-speed internet, alongside ICT, robotics and coding activities. The school also participates in ICT competitions.",
    supportKicker: "STUDENT SUPPORT",
    supportTitle: "The practical details matter too.",
    supportBody:
      "Beyond teaching spaces, the profile records transportation, residential facilities for students from remote areas, childcare, water purification, backup power, cleaned toilets and CCTV-supported security.",
    supportItems: ["Transportation", "Residential facilities", "Childcare centre", "Water purification", "Backup generator", "CCTV security"],
    facilities: [
      "Air-conditioned computer labs with 50+ PCs and high-speed internet",
      "Science laboratories for Physics, Chemistry, Biology and Agricultural Science",
      "Library with 10,000+ books and digital resources",
      "Sports facilities and Sports Club activities",
      "KC Information and Communication Club activities including robotics and coding",
      "Music Club",
      "Scout Troop",
      "Language Club",
      "Day care room",
      "Conference room",
      "Alumni Association",
    ],
    contactKicker: "VISIT KCMSC",
    contactTitle: "A school campus is best understood in context.",
    contactBody: "For admission information, notices and school-office enquiries, use the relevant sections of the website.",
    admissions: "Admissions",
    contact: "Contact the school",
  },
  bn: {
    kicker: "ক্যাম্পাস",
    title: "স্কুলজীবনের জন্য তৈরি জায়গাগুলো।",
    intro:
      "কেসিএমএসসি-র ক্যাম্পাসে শ্রেণিকক্ষ, ল্যাবরেটরি, লাইব্রেরি, শিক্ষার্থী কার্যক্রম ও দৈনন্দিন সহায়তা—সবই প্লে গ্রুপ থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য একই স্কুল পরিবেশে রয়েছে।",
    heroCaption: "কে সি মডেল স্কুল অ্যান্ড কলেজ · দক্ষিণখান, ঢাকা",
    spacesKicker: "শিক্ষার জায়গা",
    spacesTitle: "যেসব জায়গা শিক্ষার্থীরা প্রতিদিন ব্যবহার করে।",
    spacesBody:
      "স্কুলের প্রোফাইলে প্রাকৃতিক আলো ও বায়ু চলাচলসমৃদ্ধ শ্রেণিকক্ষ, প্রজেক্টর ও ল্যাপটপ-সহায়ক পাঠদান, কম্পিউটার ও বিজ্ঞান ল্যাব এবং প্রাইমারি ও সেকেন্ডারি শিক্ষার্থীদের জন্য পৃথক লাইব্রেরির কথা উল্লেখ রয়েছে।",
    libraryTitle: "মনোযোগী শেখার জন্য শ্রেণিকক্ষ।",
    libraryBody:
      "স্কুলের প্রোফাইলে প্রাকৃতিক আলো, বায়ু চলাচল ও প্রযুক্তি-সহায়ক পাঠদানের উপযোগী শ্রেণিকক্ষের কথা উল্লেখ রয়েছে। পাশাপাশি প্রাইমারি ও সেকেন্ডারি শিক্ষার্থীদের জন্য পৃথক লাইব্রেরি সুবিধা রয়েছে।",
    classroomTitle: "খেলাধুলা ও কার্যক্রমের জায়গা।",
    classroomBody:
      "খেলাধুলা KCMSC-এর সহশিক্ষা কার্যক্রমের অংশ। শিক্ষার্থীরা অনুশীলন, দলগত কাজ এবং বিভিন্ন প্রতিযোগিতায় স্কুলকে প্রতিনিধিত্ব করার সুযোগ পায়।",
    facilitiesKicker: "ক্যাম্পাসে",
    facilitiesTitle: "স্কুলের উল্লেখিত সুবিধাগুলো।",
    facilitiesBody:
      "কেসিএমএসসি-র প্রোফাইল ও স্কুলের প্রকাশিত তথ্যের ভিত্তিতে নিচের সুবিধাগুলো দেওয়া হলো। এগুলো সাজানো হয়েছে শিক্ষার্থী ও অভিভাবকদের তথ্যের জন্য, অলঙ্কার হিসেবে নয়।",
    gardenKicker: "আইসিটি ও প্রযুক্তি",
    gardenTitle: "প্রতিদিনের স্কুলজীবনেও প্রযুক্তির ব্যবহার।",
    gardenBody:
      "কেসিএমএসসি-র প্রোফাইলে ৫০+ পিসি ও হাই-স্পিড ইন্টারনেটসহ শীতাতপনিয়ন্ত্রিত কম্পিউটার ল্যাবের কথা বলা হয়েছে। ICT, রোবোটিক্স ও কোডিং কার্যক্রমও রয়েছে।",
    supportKicker: "শিক্ষার্থী সহায়তা",
    supportTitle: "দৈনন্দিন প্রয়োজনের বিষয়গুলোও গুরুত্বপূর্ণ।",
    supportBody:
      "শিক্ষার জায়গার পাশাপাশি প্রোফাইলে পরিবহন, দূরবর্তী এলাকার শিক্ষার্থীদের আবাসিক সুবিধা, চাইল্ডকেয়ার, পানি বিশুদ্ধকরণ, ব্যাকআপ বিদ্যুৎ, পরিচ্ছন্ন টয়লেট ও সিসিটিভি-ভিত্তিক নিরাপত্তার উল্লেখ রয়েছে।",
    supportItems: ["পরিবহন", "আবাসিক সুবিধা", "চাইল্ডকেয়ার সেন্টার", "পানি বিশুদ্ধকরণ", "ব্যাকআপ জেনারেটর", "সিসিটিভি নিরাপত্তা"],
    facilities: [
      "৫০+ পিসি ও হাই-স্পিড ইন্টারনেটসহ শীতাতপনিয়ন্ত্রিত কম্পিউটার ল্যাব",
      "পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও কৃষিবিজ্ঞানের ল্যাবরেটরি",
      "১০,০০০+ বই ও ডিজিটাল রিসোর্সসহ লাইব্রেরি",
      "স্পোর্টস সুবিধা ও স্পোর্টস ক্লাব কার্যক্রম",
      "রোবোটিক্স ও কোডিংসহ কে সি তথ্য ও যোগাযোগ ক্লাব কার্যক্রম",
      "মিউজিক ক্লাব",
      "স্কাউট দল",
      "ল্যাঙ্গুয়েজ ক্লাব",
      "ডে কেয়ার রুম",
      "কনফারেন্স রুম",
      "অ্যালামনাই অ্যাসোসিয়েশন",
    ],
    contactKicker: "কেসিএমএসসি",
    contactTitle: "একটি স্কুলের ক্যাম্পাসকে তার দৈনন্দিন ব্যবহারেই বোঝা যায়।",
    contactBody: "ভর্তি, নোটিশ ও স্কুল অফিস-সংক্রান্ত তথ্যের জন্য ওয়েবসাইটের সংশ্লিষ্ট বিভাগ ব্যবহার করুন।",
    admissions: "ভর্তি",
    contact: "যোগাযোগ",
  },
} as const;

export default async function FacilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Locale = locale;
  const dict = getDictionary(lang);
  const dbFacilities = await getFacilityEntries(lang);
  const copy = fallback[lang];
  const facilityItems = dbFacilities.length ? dbFacilities.map((item) => item.title + (item.description ? ` — ${item.description}` : "")) : copy.facilities;

  return (
    <main className="bg-[#f5f1e8] text-[#193d2f]">
      <section className="relative min-h-[72vh] overflow-hidden bg-[#102f24] text-white">
        <Image
          src="/kcmsc/kc/kcmsc2.JPG"
          alt="K C Model School & College campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0b2b21]/50" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2b21]/95 via-[#0b2b21]/35 to-transparent">
          <div className="mx-auto max-w-[1320px] px-6 pb-12 sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
            <p className="kc-light-kicker">{copy.kicker}</p>
            <h1 className="mt-4 max-w-5xl font-heading text-[clamp(3.5rem,7vw,7.5rem)] leading-[.88] tracking-[-.055em] text-[#f8f2e7]">
              {copy.title}
            </h1>
            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{copy.intro}</p>
              <p className="border-l border-[#d0b76e]/60 pl-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#d9c77e]">{copy.heroCaption}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8d1c3] bg-[#f5f1e8]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.45fr_1.55fr] lg:px-12 lg:py-24">
          <p className="kc-classic-kicker">{copy.spacesKicker}</p>
          <div>
            <h2 className="max-w-4xl font-heading text-[clamp(2.7rem,5vw,5.2rem)] leading-[.94] tracking-[-.045em]">{copy.spacesTitle}</h2>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#68716a] sm:text-base">{copy.spacesBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ebe5da] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
            <article className="bg-[#f8f4eb]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/kcmsc/student-life/students_under_proper_guideline.jpg" alt="KCMSC students in a classroom setting" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <p className="kc-classic-kicker">01</p>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl">{copy.libraryTitle}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68716a]">{copy.libraryBody}</p>
              </div>
            </article>
            <article className="bg-[#193d2f] text-[#f8f2e7]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/kcmsc/sports/team1.jpg" alt="KCMSC students participating in school sports" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <p className="kc-light-kicker">02</p>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl">{copy.classroomTitle}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{copy.classroomBody}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="kc-classic-kicker">{copy.facilitiesKicker}</p>
              <h2 className="mt-5 max-w-xl font-heading text-[clamp(2.8rem,4.8vw,5rem)] leading-[.94] tracking-[-.045em]">{copy.facilitiesTitle}</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#68716a]">{copy.facilitiesBody}</p>
            </div>
            <div className="border-t border-[#cfc7b8]">
              {facilityItems.map((item, index) => (
                <div key={`${item}-${index}`} className="grid grid-cols-[56px_1fr] border-b border-[#cfc7b8] py-5 sm:grid-cols-[72px_1fr]">
                  <span className="font-mono text-[11px] tracking-[.12em] text-[#a28742]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="max-w-3xl text-sm leading-6 text-[#33483f] sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#193d2f] text-[#f8f2e7]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[520px] lg:min-h-[620px]">
            <Image src="/kcmsc/facilities/ict_olympiad_at_kc.jpg" alt="KCMSC students taking part in ICT activities" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="kc-light-kicker">{copy.gardenKicker}</p>
              <h2 className="mt-5 font-heading text-[clamp(2.8rem,5vw,5rem)] leading-[.94] tracking-[-.045em]">{copy.gardenTitle}</h2>
              <p className="mt-7 text-sm leading-7 text-white/72 sm:text-base">{copy.gardenBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d1c3] bg-[#ebe5da]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-24">
          <div>
            <p className="kc-classic-kicker">{copy.supportKicker}</p>
            <h2 className="mt-5 max-w-xl font-heading text-[clamp(2.6rem,4.4vw,4.5rem)] leading-[.96] tracking-[-.04em]">{copy.supportTitle}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-[#68716a] sm:text-base">{copy.supportBody}</p>
            <div className="mt-9 grid border-t border-[#cfc7b8] sm:grid-cols-2">
              {copy.supportItems.map((item, index) => (
                <div key={item} className="grid grid-cols-[44px_1fr] border-b border-[#cfc7b8] py-4 text-sm">
                  <span className="font-mono text-[10px] text-[#a28742]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-8 border-y border-[#d8d1c3] py-10 sm:py-14 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <div>
              <p className="kc-classic-kicker">{copy.contactKicker}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.96] tracking-[-.04em]">{copy.contactTitle}</h2>
            </div>
            <div>
              <p className="max-w-xl text-sm leading-7 text-[#68716a]">{copy.contactBody}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-primary">{copy.admissions}</Link>
                <Link href={`/${locale}/contact`} className="kc-classic-button kc-classic-button-outline">{copy.contact}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
