import Image from "next/image";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const bn = locale === "bn";

  const milestones = bn
    ? [
        { year: "২০১৪", title: "প্রতিষ্ঠা", text: "আল-হাজ্জ মো. খসরু চৌধুরী (সিআইপি), নিপা গ্রুপের প্রতিষ্ঠাতা, KCMSC প্রতিষ্ঠা করেন।" },
        { year: "১ জানুয়ারি ২০১৫", title: "যাত্রা শুরু", text: "প্রতিষ্ঠানটির শিক্ষা কার্যক্রম শুরু হয় প্রায় ২,২০০ শিক্ষার্থী নিয়ে।" },
        { year: "বর্তমান", title: "Play Group থেকে Grade XII", text: "বাংলা ও ইংরেজি ভার্সনে জাতীয় শিক্ষাক্রম অনুসরণ করে Play Group থেকে Grade Twelve পর্যন্ত শিক্ষা কার্যক্রম পরিচালিত হয়।" },
      ]
    : [
        { year: "2014", title: "Founded", text: "KCMSC was founded by Al-Hajj Md. Khashru Chowdhury (CIP), founder of Nipa Group." },
        { year: "1 January 2015", title: "The first day", text: "The school began its journey with around 2,200 students in a ten-storied campus at Prembagan, Dakshinkhan." },
        { year: "Today", title: "Play Group to Grade Twelve", text: "KCMSC serves students from Play Group through Grade Twelve in Bangla and English Versions of the National Curriculum." },
      ];

  return (
    <main className="bg-[#f5f1e8] text-[#23352c]">
      {/* Opening: the institution first, not a generic page header. */}
      <section className="border-b border-[#d9d1c2]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.03fr_.97fr]">
          <div className="flex min-h-[560px] flex-col justify-end px-6 pb-14 pt-20 sm:px-10 lg:px-16 lg:pb-20">
            <span className="kc-classic-kicker">{bn ? "পরিচয় ও ঐতিহ্য" : "Our beginning"}</span>
            <h1 className="mt-5 max-w-[760px] font-heading text-[clamp(3.6rem,6.5vw,6.8rem)] leading-[.88] tracking-[-.055em] text-[#173e2f]">
              {bn ? "একটি বিদ্যালয়ের গল্প, তার শিকড় থেকে।" : "The story of a school, from its roots."}
            </h1>
            <p className="mt-8 max-w-[650px] text-[15px] leading-7 text-[#68716a] sm:text-[16px]">
              {dict.about.body}
            </p>
          </div>

          <div className="relative min-h-[480px] overflow-hidden border-l border-[#d9d1c2] lg:min-h-[560px]">
            <Image
              src="/kcmsc/media/20250722_090917.jpg"
              alt={bn ? "KC Model School and College campus" : "KC Model School and College campus"}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
              quality={88}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102e23]/80 via-[#102e23]/10 to-transparent p-7 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d5bd75]">K C Model School & College</p>
              <p className="mt-2 font-heading text-2xl text-white">{bn ? "প্রেমবাগান · দক্ষিণখান · ঢাকা" : "Prembagan · Dakshinkhan · Dhaka"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* A short institutional timeline. */}
      <section className="kc-classic-section bg-[#f8f5ed]">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <span className="kc-classic-kicker">{bn ? "যাত্রাপথ" : "A short history"}</span>
              <h2 className="mt-4 max-w-md font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-5xl">
                {bn ? "সময়, জায়গা ও একটি স্পষ্ট উদ্দেশ্য।" : "A beginning, a place and a clear purpose."}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#707770]">
                {bn ? "KCMSC-এর পরিচয় তার প্রতিষ্ঠার গল্প, শিক্ষার্থীদের পরিসর এবং প্রতিদিনের শিক্ষা-জীবনের সঙ্গে যুক্ত।" : "KCMSC’s identity is tied to its founding, the students it serves, and the ordinary work of teaching and learning."}
              </p>
            </div>
            <div className="divide-y divide-[#d8d1c3] border-y border-[#d8d1c3]">
              {milestones.map((item, index) => (
                <article key={item.year} className="grid gap-5 py-7 sm:grid-cols-[150px_1fr] sm:items-start">
                  <div className="text-xs font-bold uppercase tracking-[.15em] text-[#9a7d37]">{item.year}</div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] text-[#9a7d37]">0{index + 1}</span>
                      <h3 className="font-heading text-2xl text-[#173e2f]">{item.title}</h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68716a]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and vision, treated as statements rather than cards. */}
      <section className="border-y border-[#d9d1c2] bg-[#173e2f] text-[#f5f1e8]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="border-b border-white/15 px-6 py-14 sm:px-10 lg:border-b-0 lg:border-r lg:px-16 lg:py-20">
            <span className="kc-light-kicker">{bn ? "লক্ষ্য" : "Mission"}</span>
            <p className="mt-7 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3.7rem)] leading-[1.02] tracking-[-.03em]">
              “{dict.about.mission}”
            </p>
          </div>
          <div className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <span className="kc-light-kicker">{bn ? "দৃষ্টিভঙ্গি" : "Vision"}</span>
            <p className="mt-7 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3.7rem)] leading-[1.02] tracking-[-.03em]">
              “{dict.about.vision}”
            </p>
          </div>
        </div>
      </section>

      {/* Leadership and community photograph. */}
      <section className="kc-classic-section bg-[#ebe7dc]">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="grid overflow-hidden border border-[#d4ccbd] bg-[#f7f4ec] lg:grid-cols-[1.18fr_.82fr]">
            <div className="relative min-h-[390px] lg:min-h-[560px]">
              <Image
                src="/kcmsc/media/20230123_124320.jpg"
                alt={bn ? "KCMSC leadership and school community gathering" : "KCMSC leadership and school community gathering"}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center"
                quality={90}
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="kc-classic-kicker">{bn ? "মানুষ ও নেতৃত্ব" : "People behind the school"}</span>
              <h2 className="mt-5 font-heading text-4xl leading-[.98] tracking-[-.035em] text-[#173e2f] sm:text-5xl">
                {bn ? "একটি প্রতিষ্ঠানের পরিচয় তার মানুষের মধ্যেও থাকে।" : "A school is shaped by the people who serve it."}
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#68716a]">
                {bn ? "প্রতিষ্ঠাতা, প্রশাসন ও শিক্ষক নেতৃত্ব KCMSC-এর শিক্ষা-পরিবেশকে পরিচালনা করে।" : "The founders, administration and academic leadership form the people responsible for guiding KCMSC’s educational environment."}
              </p>
              <div className="mt-8 border-t border-[#d4ccbd] pt-5 text-[10px] font-semibold uppercase tracking-[.13em] text-[#8a8d87]">
                {bn ? "KCMSC · নেতৃত্ব ও সম্প্রদায়" : "KCMSC · leadership and community"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership list without fake avatar placeholders. */}
      <section className="kc-classic-section bg-[#f8f5ed]">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="flex flex-col justify-between gap-6 border-b border-[#d8d1c3] pb-8 md:flex-row md:items-end">
            <div>
              <span className="kc-classic-kicker">{bn ? "নেতৃত্ব" : "Leadership"}</span>
              <h2 className="mt-4 font-heading text-4xl tracking-[-.03em] text-[#173e2f] sm:text-5xl">{bn ? "যারা প্রতিষ্ঠানটি পরিচালনা করেন।" : "The people who lead the institution."}</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#727970]">{bn ? "প্রতিষ্ঠানের নেতৃত্বের প্রধান দায়িত্বগুলো।" : "The institution’s principal leadership roles."}</p>
          </div>

          <div className="mt-2 divide-y divide-[#d8d1c3]">
            {dict.leadership.map((person, index) => (
              <div key={person.name} className="grid gap-3 py-6 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                <span className="text-xs font-bold tracking-[.14em] text-[#9a7d37]">0{index + 1}</span>
                <div>
                  <p className="font-heading text-2xl text-[#173e2f]">{person.name}</p>
                  <p className="mt-1 text-sm text-[#747b74]">{person.role}</p>
                </div>
                <span className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-[#9a7d37] sm:block">KCMSC</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustee board, kept compact because it is governance information. */}
      <section className="border-t border-[#d9d1c2] bg-[#e9e5da] py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <span className="kc-classic-kicker">{bn ? "ট্রাস্টি বোর্ড" : "Trustee board"}</span>
              <h2 className="mt-4 font-heading text-4xl leading-[.98] tracking-[-.03em] text-[#173e2f] sm:text-5xl">{dict.trusteeBoard.heading}</h2>
            </div>
            <div className="grid border-t border-[#cfc7b8] sm:grid-cols-2">
              {dict.trusteeBoard.members.map((member, index) => (
                <div key={member.name} className="border-b border-[#cfc7b8] py-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-6 sm:[&:nth-child(even)]:pl-6">
                  <span className="text-[10px] font-bold tracking-[.14em] text-[#9a7d37]">0{index + 1}</span>
                  <p className="mt-2 font-medium text-[#26382f]">{member.name}</p>
                  <p className="mt-1 text-sm text-[#727970]">{member.designation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#173e2f] px-6 py-14 text-[#f5f1e8] sm:px-10 sm:py-16">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="kc-light-kicker">{bn ? "আরও জানুন" : "Continue exploring"}</span>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl leading-[.98] tracking-[-.03em] sm:text-5xl">
              {bn ? "KCMSC-কে তার শিক্ষা ও দৈনন্দিন জীবনের মাধ্যমে দেখুন।" : "See KCMSC through its teaching and everyday school life."}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/academics`} className="kc-classic-button kc-classic-button-light">{bn ? "একাডেমিক" : "Academics"}</Link>
            <Link href={`/${locale}/student-life`} className="kc-classic-button kc-classic-button-ghost-light">{bn ? "শিক্ষার্থী জীবন" : "Student life"}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
