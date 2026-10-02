import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

export default function StudentLifePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound(); const locale: Locale = params.locale; const bn = locale === "bn";
  const cards = bn ? [
    ["01", "সংস্কৃতি", "সাংস্কৃতিক অনুষ্ঠান, শিল্প ও সৃজনশীল কার্যক্রম শিক্ষাজীবনের অংশ।", "/kcmsc/media/vibrant_art_culture.jpg"],
    ["02", "পড়া", "বইমেলা ও লাইব্রেরি শিক্ষার্থীদের পড়া ও খোঁজার জায়গা তৈরি করে।", "/kcmsc/media/students_at_bookfair.jpg"],
    ["03", "খেলাধুলা", "খেলাধুলা ও প্রতিযোগিতায় শিক্ষার্থীরা দল হিসেবে অংশ নেয়।", "/kcmsc/media/kc_team_representing_at_AIUB.jpg"],
    ["04", "শিক্ষা সফর", "স্কুলের বাইরের অভিজ্ঞতাও শিক্ষার্থীদের শেখার অংশ।", "/kcmsc/media/student_trip1.jpg"],
  ] : [
    ["01", "Culture", "Cultural programmes, art and creative activities are part of everyday student life.", "/kcmsc/media/vibrant_art_culture.jpg"],
    ["02", "Reading", "Book fairs and the library give students room to read, explore and build a habit.", "/kcmsc/media/students_at_bookfair.jpg"],
    ["03", "Sport", "Students take part in sport and competitions, including opportunities to represent the school together.", "/kcmsc/media/kc_team_representing_at_AIUB.jpg"],
    ["04", "Trips", "Educational trips and activities outside school bring new experiences beyond the routine.", "/kcmsc/media/student_trip1.jpg"],
  ];
  const clubs = bn ? ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"] : ["ICT · Robotics · Coding", "Music", "Scout", "Language", "Sports", "Cultural Activities"];
  return <main className="kc-subpage">
    <section className="kc-life-hero kc-section-wide"><div><span className="kc-overline">01 · {bn ? "শিক্ষার্থী জীবন" : "Student life"}</span><h1>{bn ? "ক্লাসের সময়ের চেয়েও স্কুলজীবন বড়।" : "School life is bigger than the hours in class."}</h1><p>{bn ? "সংস্কৃতি, খেলাধুলা, বই, শিক্ষা সফর, প্রতিযোগিতা ও সহশিক্ষা কার্যক্রম প্রতিদিনের জীবনের অংশ।" : "Culture, sport, books, educational trips, competitions and co-curricular activities are part of everyday life at KCMSC."}</p><Link href={`/${locale}/clubs`} className="kc-text-link">{bn ? "ক্লাব ও কার্যক্রম" : "Clubs & activities"}<span>↗</span></Link></div><div className="kc-life-hero-image"><Image src="/kcmsc/media/vibrant_student_life.jpg" alt="KCMSC students" fill priority sizes="(min-width:900px) 50vw, 100vw" className="object-cover" /></div></section>
    <section className="kc-life-cards"><div className="kc-section-wide"><div className="kc-section-heading"><div><span className="kc-overline">02 · {bn ? "চারটি দৃশ্য" : "Four snapshots"}</span><h2>{bn ? "একটি সাধারণ স্কুলদিনের ভেতরেও অনেক কিছু ঘটে।" : "A normal school day has more going on than the timetable suggests."}</h2></div></div><div className="kc-life-grid">{cards.map(([n,title,text,image])=><article key={n}><div><Image src={image} alt={title} fill sizes="(min-width:900px) 30vw, 100vw" className="object-cover" /></div><section><span>{n}</span><h3>{title}</h3><p>{text}</p></section></article>)}</div></div></section>
    <section className="kc-club-band"><div className="kc-section-wide"><div><span className="kc-overline">03 · {bn ? "ক্লাব ও সহশিক্ষা" : "Clubs & co-curricular"}</span><h2>{bn ? "সিলেবাসের বাইরেও আগ্রহের জায়গা আছে।" : "There is room for interests beyond the syllabus."}</h2></div><div className="kc-club-list">{clubs.map((club,i)=><div key={club}><span>0{i+1}</span><strong>{club}</strong></div>)}</div></div></section>
    <section className="kc-life-garden kc-section-wide"><div className="kc-garden-image"><Image src="/kcmsc/media/rooftop_garden.jpg" alt="KCMSC rooftop garden" fill sizes="(min-width:900px) 55vw, 100vw" className="object-cover" /></div><div><span className="kc-overline">04 · {bn ? "ক্যাম্পাস" : "Campus"}</span><h2>{bn ? "ছাদবাগানও স্কুলজীবনের অংশ।" : "The rooftop gardens are part of campus life."}</h2><p>{bn ? "চারটি দশতলা ভবনের ছাদবাগান শিক্ষার্থীদের গাছ লাগানো ও পরিচর্যার সঙ্গে যুক্ত হওয়ার সুযোগ দেয়।" : "Rooftop gardens sit on four ten-storied buildings, giving students opportunities to take part in planting and caring for trees."}</p><Link href={`/${locale}/facilities`} className="kc-text-link">{bn ? "ক্যাম্পাস ও সুবিধা" : "Campus & facilities"}<span>↗</span></Link></div></section>
    <section className="kc-life-end"><div className="kc-section-wide"><span className="kc-overline">KCMSC</span><h2>{bn ? "স্কুলের স্মৃতি শুধু ক্লাসরুমে তৈরি হয় না।" : "School memories are not made in classrooms alone."}</h2><Link href={`/${locale}/admissions`} className="kc-solid-button">{bn ? "ভর্তি" : "Admissions"}<span>↗</span></Link></div></section>
  </main>;
}
