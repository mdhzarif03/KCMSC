import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/db";

type ClubEntry = { name: string; description: string };

const clubImages = [
  {
    src: "/kcmsc/media/team2.jpg",
    alt: "KCMSC students gathered on a sports field",
  },
  {
    src: "/kcmsc/media/vibrant_student_culture.jpg",
    alt: "KCMSC students taking part in a school activity",
  },
  {
    src: "/kcmsc/media/vibrant_art_culture.jpg",
    alt: "KCMSC students presenting creative work",
  },
  {
    src: "/kcmsc/media/student_trip2.jpg",
    alt: "KCMSC students together outdoors",
  },
  {
    src: "/kcmsc/media/students_at_bookfair.jpg",
    alt: "KCMSC students browsing books at a book fair",
  },
  {
    src: "/kcmsc/media/students_having_fun_after_sports.jpg",
    alt: "KCMSC students spending time together after sports",
  },
];

async function getClubEntries(
  locale: Locale,
  fallback: ClubEntry[],
): Promise<ClubEntry[]> {
  try {
    const rows = await prisma.club.findMany({ orderBy: { createdAt: "asc" } });
    if (rows.length === 0) return fallback;

    return rows.map((club) => ({
      name: locale === "bn" ? club.nameBn : club.nameEn,
      description: locale === "bn" ? club.descriptionBn : club.descriptionEn,
    }));
  } catch {
    return fallback;
  }
}

export default async function ClubsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.clubsPage;
  const clubs = await getClubEntries(locale, page.clubs);
  const bn = locale === "bn";

  const copy = bn
    ? {
        eyebrow: "শিক্ষার্থী জীবন",
        title: "স্কুলের দিন শুধু ক্লাসে শেষ হয় না।",
        intro:
          "কেসিএমএসসি-তে খেলাধুলা, প্রযুক্তি, সংস্কৃতি, ভাষা ও সামাজিক কার্যক্রম শিক্ষার্থীদের দৈনন্দিন স্কুলজীবনেরই অংশ।",
        explore: "কার্যক্রমগুলো দেখুন",
        clubsEyebrow: "ক্লাবসমূহ",
        clubsTitle: "যে আগ্রহগুলো স্কুলজীবনকে আরও সমৃদ্ধ করে।",
        clubsIntro:
          "কেসিএমএসসি-র ক্লাব ও সংগঠনগুলো শিক্ষার্থীদের বিভিন্ন আগ্রহ ও অংশগ্রহণের সুযোগ দেয়।",
        alumniEyebrow: "অ্যালামনাই",
        alumniTitle: "স্কুলের সঙ্গে সম্পর্ক এখানেই শেষ নয়।",
        alumniText:
          "অ্যালামনাই অ্যাসোসিয়েশন পুনর্মিলনী, ক্যারিয়ার আলোচনা ও মেন্টরশিপের মাধ্যমে প্রাক্তন ও বর্তমান শিক্ষার্থীদের সংযুক্ত রাখে।",
        contact: "কেসিএমএসসি সম্পর্কে জানুন",
      }
    : {
        eyebrow: "Student life",
        title: "School life does not end when the lesson does.",
        intro:
          "At KCMSC, sport, technology, culture, language and service are part of the everyday rhythm of school.",
        explore: "Explore activities",
        clubsEyebrow: "The clubs",
        clubsTitle: "Interests have a place here.",
        clubsIntro:
          "KCMSC’s clubs and organisations give students room to take part in activities that interest them.",
        alumniEyebrow: "Alumni",
        alumniTitle: "The school community continues beyond the classroom.",
        alumniText:
          "The Alumni Association connects former and current students through reunions, career talks and mentorship programmes.",
        contact: "Learn about KCMSC",
      };

  const studentClubs = clubs.filter(
    (club) =>
      !club.name.toLowerCase().includes("alumni") &&
      !club.name.includes("অ্যালামনাই"),
  );
  const alumni = clubs.find(
    (club) =>
      club.name.toLowerCase().includes("alumni") ||
      club.name.includes("অ্যালামনাই"),
  );

  return (
    <main className="bg-background text-ink">
      <section className="border-b border-[#d9d4c8] bg-[#eeece3]">
        <div className="mx-auto grid max-w-[88rem] lg:min-h-[38rem] lg:grid-cols-[1.12fr_.88fr]">
          <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-10 lg:order-1 lg:px-16 lg:py-20">
            <p className="kc-classic-kicker">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-[46rem] font-heading text-[clamp(3.2rem,6.4vw,6.5rem)] leading-[.9] tracking-[-.045em] text-[#173d2e]">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#687068] sm:text-lg">
              {copy.intro}
            </p>
            <div className="mt-9">
              <a href="#clubs" className="kc-classic-link">
                {copy.explore} <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <div className="relative order-1 min-h-[23rem] lg:order-2 lg:min-h-0">
            <Image
              src="/kcmsc/media/students_having_fun_after_sports.jpg"
              alt="KCMSC students spending time together after sports"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2e21]/65 to-transparent px-6 pb-6 pt-24 sm:px-10">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e1cb8b]">
                K C Model School &amp; College
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="clubs" className="kc-classic-section bg-[#f7f5ee]">
        <div className="mx-auto max-w-[82rem] px-6 sm:px-10">
          <div className="grid gap-8 border-b border-[#d8d3c7] pb-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="kc-classic-kicker">{copy.clubsEyebrow}</p>
              <h2 className="mt-4 max-w-md font-heading text-[clamp(2.4rem,4vw,4.4rem)] leading-[.96] tracking-[-.035em] text-[#173d2e]">
                {copy.clubsTitle}
              </h2>
            </div>
            <p className="max-w-2xl self-end text-base leading-7 text-[#687068] sm:text-lg">
              {copy.clubsIntro}
            </p>
          </div>

          <div className="mt-12 border-t border-[#d8d3c7]">
            {studentClubs.map((club, index) => {
              const image = clubImages[index % clubImages.length]!;
              const reverse = index % 2 === 1;

              return (
                <article
                  key={club.name}
                  className="grid border-b border-[#d8d3c7] lg:grid-cols-[5.5rem_1fr_24rem]"
                >
                  <div className="hidden border-r border-[#d8d3c7] py-8 pr-6 lg:block">
                    <span className="font-heading text-2xl text-[#9a8350]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="grid items-center gap-6 py-9 sm:grid-cols-[7rem_1fr] lg:px-10">
                    <div className="relative aspect-square overflow-hidden bg-[#deddd4] sm:aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 7rem, 8rem"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#a28742]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-heading text-[clamp(1.65rem,2.6vw,2.5rem)] leading-[1.02] tracking-[-.025em] text-[#173d2e]">
                        {club.name}
                      </h3>
                      {club.description ? (
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6b716b]">
                          {club.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="relative hidden min-h-[12rem] lg:block">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="24rem"
                      className="object-cover"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#173f30] text-[#f5efe3]">
        <div className="mx-auto grid max-w-[88rem] lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[25rem]">
            <Image
              src="/kcmsc/media/student_trip2.jpg"
              alt="KCMSC students together outdoors"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
            <p className="kc-light-kicker">{copy.alumniEyebrow}</p>
            <h2 className="mt-4 max-w-xl font-heading text-[clamp(2.5rem,4vw,4.7rem)] leading-[.96] tracking-[-.035em]">
              {copy.alumniTitle}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#d0d7d0]">
              {alumni?.description || copy.alumniText}
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/about`}
                className="kc-classic-link kc-classic-link-light"
              >
                {copy.contact} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeece3]">
        <div className="mx-auto max-w-[82rem] px-6 py-16 sm:px-10 sm:py-20">
          <div className="grid gap-8 border-y border-[#d5d0c4] py-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="kc-classic-kicker">KCMSC</p>
              <p className="mt-3 max-w-2xl font-heading text-[clamp(1.9rem,3vw,3.1rem)] leading-tight tracking-[-.025em] text-[#173d2e]">
                {bn
                  ? "খেলাধুলা, সংস্কৃতি, প্রযুক্তি ও অংশগ্রহণ স্কুলজীবনের অংশ।"
                  : "Sport, culture, technology and participation all have a place in school life."}
              </p>
            </div>
            <Link
              href={`/${locale}/admissions`}
              className="kc-classic-button kc-classic-button-primary whitespace-nowrap"
            >
              {bn ? "ভর্তি তথ্য" : "Admissions"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
