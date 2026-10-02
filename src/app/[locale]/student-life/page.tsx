import Image from "next/image";
import Link from "next/link";

const photos = {
  hero: "/kcmsc/media/vibrant_student_life.jpg",
  culture: "/kcmsc/media/vibrant_art_culture.jpg",
  reading: "/kcmsc/media/students_at_bookfair.jpg",
  sport: "/kcmsc/media/kc_team_representing_at_AIUB.jpg",
  trip: "/kcmsc/media/student_trip1.jpg",
  garden: "/kcmsc/media/rooftop_garden.jpg",
};

export default async function StudentLifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const bn = locale === "bn";

  const c = bn
    ? {
        kicker: "শিক্ষাজীবন",
        title: "স্কুলের জীবন শুধু ক্লাসের সময় নয়।",
        body: "সংস্কৃতি, খেলাধুলা, বই, শিক্ষা সফর, প্রতিযোগিতা ও সহশিক্ষা কার্যক্রম মিলেই KCMSC-এর দৈনন্দিন শিক্ষাজীবন।",
        explore: "ক্লাব ও কার্যক্রম",
        snapshot: "এক নজরে",
        culture: "সংস্কৃতি",
        sport: "খেলাধুলা",
        reading: "পাঠাভ্যাস",
        trips: "শিক্ষা সফর",
        cultureTitle: "নিজেকে প্রকাশ করার জায়গা",
        cultureBody: "সাংস্কৃতিক অনুষ্ঠান, শিল্প ও সৃজনশীল আয়োজন শিক্ষার্থীদের স্কুলজীবনের স্বাভাবিক অংশ।",
        readingTitle: "বইয়ের সঙ্গে সময়",
        readingBody: "বইমেলা ও লাইব্রেরি শিক্ষার্থীদের পড়ার অভ্যাস গড়ে তোলার সুযোগ দেয়।",
        sportTitle: "দলের হয়ে মাঠে",
        sportBody: "খেলাধুলা ও প্রতিযোগিতায় শিক্ষার্থীরা দল হিসেবে অংশ নেয় এবং স্কুলকে প্রতিনিধিত্ব করে।",
        tripTitle: "ক্লাসরুমের বাইরে",
        tripBody: "শিক্ষা সফর ও বিভিন্ন আয়োজন পরিচিত পরিবেশের বাইরে নতুন অভিজ্ঞতা তৈরি করে।",
        clubsKicker: "ক্লাব ও সহশিক্ষা",
        clubsTitle: "আগ্রহের জায়গা খুঁজে নেওয়ার সুযোগ",
        clubsBody: "ICT, Robotics & Coding, Music, Scout, Language, Sports এবং সাংস্কৃতিক কার্যক্রমসহ বিভিন্ন ক্লাব ও সহশিক্ষা কার্যক্রম রয়েছে।",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        gardenKicker: "ক্যাম্পাস",
        gardenTitle: "ছাদবাগানও শিক্ষাজীবনের অংশ।",
        gardenBody: "চারটি দশতলা ভবনের ছাদবাগানে গাছ লাগানো ও পরিচর্যার সঙ্গে শিক্ষার্থীদের যুক্ত থাকার সুযোগ রয়েছে।",
        facilities: "ক্যাম্পাস ও সুবিধা",
        finalKicker: "KCMSC",
        finalTitle: "একটি স্কুলের স্মৃতি ক্লাসরুমের বাইরেও তৈরি হয়।",
        finalBody: "বন্ধু, মাঠ, বই, অনুষ্ঠান, সফর ও প্রতিদিনের ছোট ছোট মুহূর্ত মিলেই তৈরি হয় স্কুলজীবন।",
        admission: "ভর্তি সম্পর্কে জানুন",
      }
    : {
        kicker: "STUDENT LIFE",
        title: "School is more than the hours spent in class.",
        body: "Culture, sport, books, educational trips, competitions and co-curricular activities are part of everyday life at KCMSC.",
        explore: "Explore clubs & activities",
        snapshot: "AT A GLANCE",
        culture: "Culture",
        sport: "Sport",
        reading: "Reading",
        trips: "Trips",
        cultureTitle: "A place to take part",
        cultureBody: "Cultural programmes, art and creative activities are a natural part of everyday student life.",
        readingTitle: "Time with books",
        readingBody: "Book fairs and the library give students space to read, explore and build a reading habit.",
        sportTitle: "Playing as a team",
        sportBody: "Students take part in sport and competitions, including opportunities to represent the school together.",
        tripTitle: "Beyond the classroom",
        tripBody: "Educational trips and activities outside school bring new experiences beyond the familiar routine.",
        clubsKicker: "CLUBS & CO-CURRICULAR",
        clubsTitle: "Room for interests beyond the syllabus",
        clubsBody: "KCMSC offers clubs and activities including ICT, Robotics & Coding, Music, Scout, Language, Sports and cultural activities.",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        gardenKicker: "CAMPUS",
        gardenTitle: "The rooftop gardens are part of school life.",
        gardenBody: "Rooftop gardens sit on four ten-storied buildings, giving students opportunities to take part in planting and caring for trees.",
        facilities: "View campus & facilities",
        finalKicker: "KCMSC",
        finalTitle: "School memories are made beyond the timetable.",
        finalBody: "Friends, sport, books, events, trips and ordinary school days all become part of the student experience.",
        admission: "Admission information",
      };

  return (
    <main className="kc-page-shell">
      <section className="kc-page-intro">
        <div className="kc-page-intro-inner">
          <div className="kc-page-intro-grid">
            <div>
              <p className="kc-page-kicker">{c.kicker}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[c.culture, c.sport, c.reading, c.trips].map((item) => (
                  <span key={item} className="rounded-full border border-[#dedbd3] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#647069]">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h1 className="kc-page-title">{c.title}</h1>
              <p className="kc-page-lede mt-6">{c.body}</p>
              <Link href={`/${locale}/clubs`} className="kc-modern-link mt-7">{c.explore}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-28px,1240px)] py-6 sm:py-8">
        <div className="relative overflow-hidden rounded-[18px] bg-[#173c2d]">
          <div className="relative aspect-[16/8.5] min-h-[300px]">
            <Image src={photos.hero} alt="KCMSC students taking part in school life" fill priority sizes="(max-width: 1240px) 100vw, 1240px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102f25]/80 via-[#102f25]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-xl p-6 sm:p-10">
              <p className="kc-light-kicker">{c.snapshot}</p>
              <p className="mt-3 font-heading text-3xl leading-tight text-white sm:text-5xl">{bn ? "প্রতিদিনের স্কুলজীবনে অংশ নেওয়ার অনেক পথ আছে।" : "There are many ways to be part of an ordinary school day."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-28px,1240px)] py-12 sm:py-16 lg:py-20">
        <div className="grid gap-4 md:grid-cols-12">
          <article className="kc-life-card md:col-span-7">
            <div className="relative aspect-[1.25] overflow-hidden">
              <Image src={photos.culture} alt="KCMSC cultural activity" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover transition duration-500 hover:scale-[1.025]" />
            </div>
            <div className="p-6 sm:p-8">
              <span className="kc-card-number">01</span>
              <h2>{c.cultureTitle}</h2>
              <p>{c.cultureBody}</p>
            </div>
          </article>

          <div className="grid gap-4 md:col-span-5">
            <article className="kc-life-card">
              <div className="relative aspect-[1.8] overflow-hidden">
                <Image src={photos.reading} alt="Students at a KCMSC book fair" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover transition duration-500 hover:scale-[1.025]" />
              </div>
              <div className="p-5 sm:p-6"><span className="kc-card-number">02</span><h2>{c.readingTitle}</h2><p>{c.readingBody}</p></div>
            </article>
            <article className="kc-life-card grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[210px] overflow-hidden"><Image src={photos.sport} alt="KCMSC students taking part in sport" fill sizes="(max-width: 768px) 100vw, 21vw" className="object-cover transition duration-500 hover:scale-[1.025]" /></div>
              <div className="p-5 sm:p-6"><span className="kc-card-number">03</span><h2>{c.sportTitle}</h2><p>{c.sportBody}</p></div>
            </article>
          </div>

          <article className="kc-life-card md:col-span-12 md:grid md:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[250px] overflow-hidden"><Image src={photos.trip} alt="KCMSC students on an educational trip" fill sizes="(max-width: 768px) 100vw, 62vw" className="object-cover transition duration-500 hover:scale-[1.025]" /></div>
            <div className="flex flex-col justify-end p-6 sm:p-9"><span className="kc-card-number">04</span><h2>{c.tripTitle}</h2><p>{c.tripBody}</p></div>
          </article>
        </div>
      </section>

      <section className="border-y border-[#e2ded5] bg-white">
        <div className="mx-auto grid w-[min(100%-28px,1240px)] gap-10 py-14 sm:py-18 lg:grid-cols-[.8fr_1.2fr] lg:py-24">
          <div>
            <p className="kc-page-kicker">{c.clubsKicker}</p>
            <h2 className="mt-4 max-w-xl font-heading text-[clamp(2.5rem,5vw,4.7rem)] leading-[.96] tracking-[-.04em] text-[#173c2d]">{c.clubsTitle}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-[#68716b] sm:text-base">{c.clubsBody}</p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {c.clubs.map((club, index) => (
                <div key={club} className="flex items-center gap-3 rounded-xl border border-[#e3e0d8] bg-[#faf9f6] px-4 py-4">
                  <span className="font-mono text-[10px] text-[#a28742]">0{index + 1}</span>
                  <span className="text-sm font-semibold text-[#33453d]">{club}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-28px,1240px)] py-12 sm:py-16">
        <div className="overflow-hidden rounded-[18px] bg-[#173c2d] text-white">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[360px]">
              <Image src={photos.garden} alt="KCMSC rooftop garden" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#173c2d]/30" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="kc-light-kicker">{c.gardenKicker}</p>
              <h2 className="mt-4 font-heading text-[clamp(2.3rem,4vw,4rem)] leading-[.98] tracking-[-.035em]">{c.gardenTitle}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">{c.gardenBody}</p>
              <Link href={`/${locale}/facilities`} className="kc-modern-link kc-modern-link-light mt-7">{c.facilities}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e3dfd6] bg-[#f8f7f3]">
        <div className="mx-auto grid w-[min(100%-28px,1240px)] gap-7 py-16 sm:py-20 lg:grid-cols-[1fr_.7fr] lg:items-end lg:py-24">
          <div><p className="kc-page-kicker">{c.finalKicker}</p><h2 className="mt-4 max-w-3xl font-heading text-[clamp(2.5rem,5vw,4.8rem)] leading-[.96] tracking-[-.04em] text-[#173c2d]">{c.finalTitle}</h2></div>
          <div><p className="text-sm leading-7 text-[#68716b] sm:text-base">{c.finalBody}</p><Link href={`/${locale}/admissions`} className="kc-modern-button mt-7">{c.admission}<span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </main>
  );
}
