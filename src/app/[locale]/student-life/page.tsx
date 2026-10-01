import Image from "next/image";
import Link from "next/link";

const photos = {
  hero: "/kcmsc/student-life/vibrant_student_life.jpg",
  culture: "/kcmsc/student-life/vibrant_art_culture.jpg",
  students: "/kcmsc/student-life/vibrant_student_culture.jpg",
  bookfair: "/kcmsc/student-life/students_at_bookfair.jpg",
  sports: "/kcmsc/student-life/students_having_fun_after_sports.jpg",
  team: "/kcmsc/sports/kc_team_representing_at_AIUB.jpg",
  trip: "/kcmsc/student-life/student_trip1.jpg",
  garden: "/kcmsc/facilities/rooftop_garden.jpg",
};

export default async function StudentLifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const bn = locale === "bn";

  const copy = bn
    ? {
        kicker: "শিক্ষাজীবন",
        title: "শ্রেণিকক্ষের বাইরেও স্কুল জীবন গড়ে ওঠে।",
        body: "সংস্কৃতি, খেলাধুলা, প্রতিযোগিতা, বইপড়া, শিক্ষা সফর এবং বিভিন্ন ক্লাব ও সহশিক্ষা কার্যক্রম KCMSC-এর শিক্ষাজীবনের অংশ।",
        discover: "KCMSC সম্পর্কে",
        introKicker: "একটি স্কুল সম্প্রদায়",
        introTitle: "শেখা শুধু একটি সময়সূচির মধ্যে সীমাবদ্ধ নয়।",
        introBody: "শিক্ষার্থীরা নিজেদের আগ্রহ ও দক্ষতা প্রকাশের সুযোগ পায় সংস্কৃতি, খেলাধুলা, একাডেমিক প্রতিযোগিতা, পাঠাভ্যাস ও বিভিন্ন আয়োজনে। এই অভিজ্ঞতাগুলো বিদ্যালয়ের দৈনন্দিন জীবনকে সমৃদ্ধ করে।",
        culture: "সংস্কৃতি ও সৃজনশীলতা",
        cultureBody: "শিক্ষার্থীরা সাংস্কৃতিক অনুষ্ঠান, শিল্প ও বিভিন্ন সৃজনশীল কার্যক্রমে অংশ নেয়।",
        sport: "খেলাধুলা ও দলগত কাজ",
        sportBody: "খেলাধুলা শিক্ষার্থীদের দলগত অংশগ্রহণ, নিয়মানুবর্তিতা ও স্কুলকে প্রতিনিধিত্ব করার সুযোগ দেয়।",
        reading: "বই ও পাঠাভ্যাস",
        readingBody: "বইমেলা ও লাইব্রেরির মতো পরিবেশ শিক্ষার্থীদের পড়া ও বইয়ের সঙ্গে সময় কাটাতে উৎসাহিত করে।",
        trips: "শিক্ষা সফর ও অভিজ্ঞতা",
        tripsBody: "স্কুলের বাইরে একসঙ্গে সময় কাটানো শিক্ষার্থীদের অভিজ্ঞতা ও বন্ধুত্বের পরিসর বাড়ায়।",
        clubsKicker: "ক্লাব ও কার্যক্রম",
        clubsTitle: "আগ্রহের জায়গাগুলোও শিক্ষার অংশ।",
        clubsBody: "KCMSC-এর প্রোফাইলে ICT, Robotics ও Coding, Music, Scout, Language, Sports এবং সাংস্কৃতিক কার্যক্রমসহ বিভিন্ন ক্লাব ও সহশিক্ষা কার্যক্রমের উল্লেখ রয়েছে।",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        gardenKicker: "ক্যাম্পাস জীবন",
        gardenTitle: "সবুজের যত্নও শেখার অংশ।",
        gardenBody: "স্কুলের প্রোফাইল অনুযায়ী দশতলা ভবনগুলোর চারটিতে ছাদবাগান রয়েছে এবং শিক্ষার্থীরা গাছ লাগানো ও পরিচর্যায় অংশ নেয়।",
        gardenLink: "ক্যাম্পাস দেখুন",
        finalKicker: "KCMSC",
        finalTitle: "একটি স্কুল শুধু ক্লাসের জায়গা নয়।",
        finalBody: "এখানে পড়াশোনার পাশাপাশি সংস্কৃতি, বন্ধুত্ব, দলগত কাজ ও প্রতিদিনের অভিজ্ঞতা মিলেই শিক্ষাজীবন তৈরি হয়।",
        admissions: "ভর্তি সম্পর্কে জানুন",
      }
    : {
        kicker: "STUDENT LIFE",
        title: "School life is built beyond the classroom too.",
        body: "Culture, sport, competitions, reading, educational trips and a range of clubs and co-curricular activities are part of everyday life at KCMSC.",
        discover: "Discover KCMSC",
        introKicker: "ONE SCHOOL COMMUNITY",
        introTitle: "Learning does not end when the lesson does.",
        introBody: "Students have opportunities to express interests and abilities through culture, sport, academic competitions, reading, school events and shared experiences. Together, these moments give school life its character.",
        culture: "Culture & creativity",
        cultureBody: "Students take part in cultural programmes, art and creative school activities.",
        sport: "Sport & teamwork",
        sportBody: "Sport gives students opportunities to work as teams, practise discipline and represent their school.",
        reading: "Books & reading",
        readingBody: "Book fairs and library spaces give students reasons to spend time with books beyond the timetable.",
        trips: "Trips & shared experiences",
        tripsBody: "Time outside the usual school setting expands students' experiences and the friendships they build.",
        clubsKicker: "CLUBS & ACTIVITIES",
        clubsTitle: "Interests have a place in education too.",
        clubsBody: "The KCMSC profile lists clubs and co-curricular activities including ICT, Robotics & Coding, Music, Scout, Language, Sports and cultural activities.",
        clubs: ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"],
        gardenKicker: "CAMPUS LIFE",
        gardenTitle: "Caring for green spaces is learning too.",
        gardenBody: "The school profile records rooftop gardens on four ten-storied buildings, with students taking part in planting and caring for trees.",
        gardenLink: "Explore the campus",
        finalKicker: "KCMSC",
        finalTitle: "A school is more than a timetable.",
        finalBody: "Academic work, culture, friendship, teamwork and ordinary daily moments all become part of growing up at school.",
        admissions: "Explore admissions",
      };

  return (
    <main className="bg-[#f5f1e8] text-[#20362d]">
      <section className="border-b border-[#d7d1c4]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-end px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <p className="kc-classic-kicker">{copy.kicker}</p>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(3.2rem,6.5vw,6.7rem)] leading-[.92] tracking-[-.045em] text-[#183d2e]">{copy.title}</h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#69716a] sm:text-base">{copy.body}</p>
            <Link href={`/${locale}/about`} className="kc-classic-link mt-8">{copy.discover} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="relative min-h-[500px] border-t border-[#d7d1c4] lg:border-l lg:border-t-0">
            <Image src={photos.hero} alt="Students taking part in school life at KCMSC" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#183d2e] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.75fr_1.25fr]">
          <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <p className="kc-light-kicker">{copy.introKicker}</p>
            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1] tracking-[-.03em] text-[#f5f0e4] sm:text-5xl">{copy.introTitle}</h2>
          </div>
          <div className="border-t border-white/15 px-6 py-12 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:py-16">
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{copy.introBody}</p>
          </div>
        </div>
      </section>

      <section className="kc-classic-section">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="border border-[#d3ccbf] bg-[#faf8f2]">
              <div className="relative aspect-[4/3]"><Image src={photos.culture} alt="Students participating in a cultural activity at KCMSC" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
              <div className="p-7"><p className="kc-classic-kicker">01</p><h2 className="mt-3 font-heading text-2xl text-[#183d2e]">{copy.culture}</h2><p className="mt-3 text-sm leading-6 text-[#69716a]">{copy.cultureBody}</p></div>
            </article>
            <article className="border border-[#d3ccbf] bg-[#faf8f2]">
              <div className="relative aspect-[4/3]"><Image src={photos.sports} alt="Students enjoying a sports activity at KCMSC" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
              <div className="p-7"><p className="kc-classic-kicker">02</p><h2 className="mt-3 font-heading text-2xl text-[#183d2e]">{copy.sport}</h2><p className="mt-3 text-sm leading-6 text-[#69716a]">{copy.sportBody}</p></div>
            </article>
            <article className="border border-[#d3ccbf] bg-[#faf8f2]">
              <div className="relative aspect-[4/3]"><Image src={photos.bookfair} alt="Students at a book fair at KCMSC" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
              <div className="p-7"><p className="kc-classic-kicker">03</p><h2 className="mt-3 font-heading text-2xl text-[#183d2e]">{copy.reading}</h2><p className="mt-3 text-sm leading-6 text-[#69716a]">{copy.readingBody}</p></div>
            </article>
            <article className="border border-[#d3ccbf] bg-[#faf8f2]">
              <div className="relative aspect-[4/3]"><Image src={photos.trip} alt="KCMSC students on an educational trip" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
              <div className="p-7"><p className="kc-classic-kicker">04</p><h2 className="mt-3 font-heading text-2xl text-[#183d2e]">{copy.trips}</h2><p className="mt-3 text-sm leading-6 text-[#69716a]">{copy.tripsBody}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7d1c4] bg-[#ece7dc]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[460px]">
            <Image src={photos.team} alt="KCMSC student team representing the school at a sporting event" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
            <p className="kc-classic-kicker">{copy.clubsKicker}</p>
            <h2 className="kc-classic-title mt-5">{copy.clubsTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#69716a] sm:text-base">{copy.clubsBody}</p>
            <div className="mt-9 grid grid-cols-2 border-y border-[#cfc7b8] sm:grid-cols-3">
              {copy.clubs.map((club, index) => (
                <div key={club} className="border-b border-[#cfc7b8] px-3 py-5 text-xs font-semibold text-[#4f5b53] sm:px-4">
                  <span className="mr-2 text-[#a28742]">0{index + 1}</span>{club}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#183d2e] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <p className="kc-light-kicker">{copy.gardenKicker}</p>
            <h2 className="mt-5 max-w-2xl font-heading text-[clamp(2.8rem,5vw,5.2rem)] leading-[.96] tracking-[-.035em] text-[#f5f0e4]">{copy.gardenTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">{copy.gardenBody}</p>
            <Link href={`/${locale}/facilities`} className="kc-classic-link kc-classic-link-light mt-8">{copy.gardenLink} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[600px]">
            <Image src={photos.garden} alt="Students caring for plants in the KCMSC rooftop garden" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="border-y border-[#d7d1c4] py-10 sm:py-14">
            <p className="kc-classic-kicker">{copy.finalKicker}</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <h2 className="kc-classic-title">{copy.finalTitle}</h2>
              <div><p className="text-sm leading-7 text-[#69716a] sm:text-base">{copy.finalBody}</p><Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-primary mt-7">{copy.admissions}</Link></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
