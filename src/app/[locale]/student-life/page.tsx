import Image from "next/image";
import Link from "next/link";

const photos = {
  hero: "/kcmsc/student-life/vibrant_student_life.jpg",
  culture: "/kcmsc/student-life/vibrant_art_culture.jpg",
  reading: "/kcmsc/student-life/students_at_bookfair.jpg",
  sport: "/kcmsc/sports/kc_team_representing_at_AIUB.jpg",
  trip: "/kcmsc/student-life/student_trip1.jpg",
  garden: "/kcmsc/facilities/rooftop_garden.jpg",
};

export default async function StudentLifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const bn = locale === "bn";

  const copy = bn
    ? {
        kicker: "শিক্ষাজীবন",
        title: "শ্রেণিকক্ষের বাইরের দিনগুলোও স্কুলের অংশ।",
        body: "সংস্কৃতি, খেলাধুলা, বই, শিক্ষা সফর, প্রতিযোগিতা ও বিভিন্ন সহশিক্ষা কার্যক্রমের মধ্য দিয়ে KCMSC-এর শিক্ষার্থীরা স্কুলজীবনের নানা অভিজ্ঞতা অর্জন করে।",
        explore: "KCMSC সম্পর্কে",
        introKicker: "শিক্ষার্থীদের দৈনন্দিন জীবন",
        introTitle: "পড়াশোনার পাশাপাশি সময় কাটে নানা কাজে।",
        introBody: "একটি স্কুলের জীবন শুধু ক্লাসের সময়সূচিতে সীমাবদ্ধ থাকে না। KCMSC-এ শিক্ষার্থীরা সাংস্কৃতিক অনুষ্ঠান, খেলাধুলা, বইমেলা, শিক্ষা সফর, ক্লাব ও বিভিন্ন প্রতিযোগিতায় অংশ নেওয়ার সুযোগ পায়।",
        culture: "সংস্কৃতি ও সৃজনশীলতা",
        cultureBody: "সাংস্কৃতিক অনুষ্ঠান, শিল্প ও সৃজনশীল কার্যক্রম শিক্ষার্থীদের স্কুলের নিয়মিত জীবনের একটি অংশ।",
        reading: "বই ও পাঠাভ্যাস",
        readingBody: "বইমেলা ও লাইব্রেরির মাধ্যমে শিক্ষার্থীরা পাঠাভ্যাস গড়ে তোলার সুযোগ পায়।",
        sport: "খেলাধুলা",
        sportBody: "বিভিন্ন খেলাধুলা ও প্রতিযোগিতায় অংশ নিয়ে শিক্ষার্থীরা দলগতভাবে স্কুলকে প্রতিনিধিত্ব করে।",
        trip: "শিক্ষা সফর",
        tripBody: "শিক্ষা সফর ও স্কুলের বাইরের আয়োজন শিক্ষার্থীদের পরিচিত পরিবেশের বাইরে নতুন অভিজ্ঞতা দেয়।",
        activitiesKicker: "ক্লাব ও সহশিক্ষা কার্যক্রম",
        activitiesTitle: "নিজের আগ্রহের জায়গা খুঁজে নেওয়ার সুযোগ",
        activitiesBody: "KCMSC-এর প্রোফাইলে ICT, Robotics ও Coding, Music, Scout, Language, Sports এবং সাংস্কৃতিক কার্যক্রমসহ বিভিন্ন ক্লাব ও সহশিক্ষা কার্যক্রমের উল্লেখ রয়েছে।",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        campusKicker: "ক্যাম্পাস",
        campusTitle: "ছাদবাগানও ক্যাম্পাস জীবনের অংশ।",
        campusBody: "স্কুলের প্রোফাইল অনুযায়ী চারটি দশতলা ভবনে ছাদবাগান রয়েছে। শিক্ষার্থীরা গাছ লাগানো ও পরিচর্যার সঙ্গে যুক্ত থাকে।",
        campusLink: "ক্যাম্পাস ও সুবিধা দেখুন",
        finalKicker: "KCMSC",
        finalTitle: "স্কুলজীবনের প্রতিটি দিনই একটি অভিজ্ঞতা।",
        finalBody: "ক্লাস, বন্ধু, খেলাধুলা, সংস্কৃতি ও স্কুলের নানা আয়োজন মিলেই তৈরি হয় শিক্ষার্থীদের দৈনন্দিন জীবন।",
        admissions: "ভর্তি সম্পর্কে জানুন",
      }
    : {
        kicker: "STUDENT LIFE",
        title: "School days are more than classroom hours.",
        body: "Culture, sport, books, educational trips, competitions and co-curricular activities all form part of everyday life at KCMSC.",
        explore: "Discover KCMSC",
        introKicker: "LIFE AT SCHOOL",
        introTitle: "There is more to the school day than lessons.",
        introBody: "School life continues through cultural programmes, sport, reading, educational trips, clubs and competitions. These activities give students opportunities to take part, work with others and enjoy the ordinary moments of school.",
        culture: "Culture & creativity",
        cultureBody: "Cultural programmes, art and creative activities are part of the school's regular student life.",
        reading: "Books & reading",
        readingBody: "Book fairs and library spaces give students opportunities to spend time with books and develop a reading habit.",
        sport: "Sport",
        sportBody: "Students take part in sporting activities and competitions, including opportunities to represent the school as a team.",
        trip: "Educational trips",
        tripBody: "Trips and activities outside the usual school setting give students experiences beyond their everyday surroundings.",
        activitiesKicker: "CLUBS & CO-CURRICULAR ACTIVITIES",
        activitiesTitle: "Room for interests beyond the syllabus",
        activitiesBody: "The KCMSC profile lists clubs and co-curricular activities including ICT, Robotics & Coding, Music, Scout, Language, Sports and cultural activities.",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        campusKicker: "CAMPUS",
        campusTitle: "The rooftop gardens are part of campus life.",
        campusBody: "The school profile records rooftop gardens on four ten-storied buildings, with students taking part in planting and caring for trees.",
        campusLink: "View campus & facilities",
        finalKicker: "KCMSC",
        finalTitle: "The school day does not end with the last class.",
        finalBody: "Lessons, friends, sport, culture and school events all become part of the everyday experience of being a student.",
        admissions: "Admission information",
      };

  return (
    <main className="bg-[#f6f2e9] text-[#1c3d30]">
      {/* Hero: one photograph, one clear introduction. */}
      <section className="relative overflow-hidden border-b border-[#d8d1c3]">
        <div className="relative h-[62vh] min-h-[520px] w-full">
          <Image
            src={photos.hero}
            alt="KCMSC students taking part in school life"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102f25]/75 via-[#102f25]/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1440px] px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
              <p className="kc-light-kicker">{copy.kicker}</p>
              <h1 className="mt-4 max-w-4xl font-heading text-[clamp(3rem,6.5vw,6.5rem)] leading-[.91] tracking-[-.045em] text-[#f7f2e8]">
                {copy.title}
              </h1>
              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{copy.body}</p>
                <Link href={`/${locale}/about`} className="kc-classic-link kc-classic-link-light shrink-0">{copy.explore} <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short introduction, deliberately quiet. */}
      <section className="border-b border-[#d8d1c3] bg-[#f6f2e9]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-24">
          <div>
            <p className="kc-classic-kicker">{copy.introKicker}</p>
          </div>
          <div>
            <h2 className="max-w-4xl font-heading text-[clamp(2.4rem,4.5vw,4.7rem)] leading-[.96] tracking-[-.035em] text-[#183d2e]">{copy.introTitle}</h2>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#68716a] sm:text-base">{copy.introBody}</p>
          </div>
        </div>
      </section>

      {/* Four activities, presented as an editorial image spread rather than four cards. */}
      <section className="bg-[#eee9df] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd6c8]">
                <Image src={photos.culture} alt="KCMSC students taking part in a cultural activity" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </div>
              <div className="border-t border-[#cfc7b8] pt-5">
                <p className="kc-classic-kicker">01</p>
                <h2 className="mt-2 font-heading text-3xl text-[#183d2e]">{copy.culture}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68716a]">{copy.cultureBody}</p>
              </div>
            </article>

            <div className="grid gap-5 lg:col-span-5">
              <article>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#ddd6c8]">
                  <Image src={photos.reading} alt="Students visiting a book fair at KCMSC" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
                </div>
                <div className="border-t border-[#cfc7b8] pt-4">
                  <p className="kc-classic-kicker">02</p>
                  <h2 className="mt-2 font-heading text-2xl text-[#183d2e]">{copy.reading}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#68716a]">{copy.readingBody}</p>
                </div>
              </article>

              <article className="grid gap-4 sm:grid-cols-[1.05fr_.95fr] sm:items-start">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd6c8]">
                  <Image src={photos.sport} alt="KCMSC students representing their school in sport" fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
                </div>
                <div>
                  <p className="kc-classic-kicker">03</p>
                  <h2 className="mt-2 font-heading text-2xl text-[#183d2e]">{copy.sport}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#68716a]">{copy.sportBody}</p>
                </div>
              </article>
            </div>

            <article className="mt-1 lg:col-span-12 lg:grid lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-8">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#ddd6c8] lg:aspect-[2/1]">
                <Image src={photos.trip} alt="KCMSC students on an educational trip" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
              <div className="border-t border-[#cfc7b8] pt-5 lg:pb-1">
                <p className="kc-classic-kicker">04</p>
                <h2 className="mt-2 font-heading text-3xl text-[#183d2e]">{copy.trip}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#68716a]">{copy.tripBody}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Clubs: typography and list, no unnecessary photograph. */}
      <section className="border-y border-[#d8d1c3] bg-[#f6f2e9]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-24">
          <div>
            <p className="kc-classic-kicker">{copy.activitiesKicker}</p>
            <h2 className="mt-5 max-w-xl font-heading text-[clamp(2.5rem,4.5vw,4.6rem)] leading-[.97] tracking-[-.035em] text-[#183d2e]">{copy.activitiesTitle}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-[#68716a] sm:text-base">{copy.activitiesBody}</p>
            <div className="mt-9 border-t border-[#cfc7b8]">
              {copy.clubs.map((club, index) => (
                <div key={club} className="grid grid-cols-[52px_1fr] border-b border-[#cfc7b8] py-4 text-sm text-[#33483f] sm:grid-cols-[64px_1fr] sm:py-5">
                  <span className="font-mono text-xs text-[#a28742]">0{index + 1}</span>
                  <span>{club}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One campus photograph, used only for the garden story. */}
      <section className="bg-[#183d2e] text-white">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative h-[52vh] min-h-[430px] overflow-hidden">
            <Image src={photos.garden} alt="KCMSC rooftop garden and students on campus" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#102f25]/35" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102f25]/90 to-transparent px-6 pb-10 pt-24 sm:px-10 lg:px-16 lg:pb-14">
              <p className="kc-light-kicker">{copy.campusKicker}</p>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_.75fr] lg:items-end">
                <h2 className="max-w-3xl font-heading text-[clamp(2.8rem,5vw,5rem)] leading-[.95] tracking-[-.035em] text-[#f7f2e8]">{copy.campusTitle}</h2>
                <div>
                  <p className="max-w-xl text-sm leading-7 text-white/75">{copy.campusBody}</p>
                  <Link href={`/${locale}/facilities`} className="kc-classic-link kc-classic-link-light mt-6">{copy.campusLink} <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2e9]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-8 border-y border-[#d8d1c3] py-10 sm:py-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="kc-classic-kicker">{copy.finalKicker}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.6rem,4.5vw,4.6rem)] leading-[.96] tracking-[-.035em] text-[#183d2e]">{copy.finalTitle}</h2>
            </div>
            <div>
              <p className="max-w-xl text-sm leading-7 text-[#68716a] sm:text-base">{copy.finalBody}</p>
              <Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-primary mt-7">{copy.admissions}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
