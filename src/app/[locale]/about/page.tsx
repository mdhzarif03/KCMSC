import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/i18n/config";

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale; const bn = locale === "bn"; const dict = getDictionary(locale);
  const milestones = bn ? [
    ["২০১৪", "প্রতিষ্ঠা", "আল-হাজ্জ মো. খসরু চৌধুরী (সিআইপি), নিপা গ্রুপের প্রতিষ্ঠাতা, KCMSC প্রতিষ্ঠা করেন।"],
    ["১ জানুয়ারি ২০১৫", "যাত্রা শুরু", "প্রায় ২,২০০ শিক্ষার্থী নিয়ে শিক্ষা কার্যক্রম শুরু হয়।"],
    ["বর্তমান", "Play Group → Grade XII", "বাংলা ও ইংরেজি ভার্সনে জাতীয় শিক্ষাক্রম অনুসরণ করে Play Group থেকে Grade Twelve পর্যন্ত শিক্ষা কার্যক্রম পরিচালিত হয়."],
  ] : [
    ["2014", "Founded", "KCMSC was founded by Al-Hajj Md. Khashru Chowdhury (CIP), founder of Nipa Group."],
    ["1 January 2015", "The first day", "The school began its journey with around 2,200 students."],
    ["Today", "Play Group → Grade XII", "KCMSC serves students from Play Group through Grade Twelve in Bangla and English Versions of the National Curriculum."],
  ];
  return <main className="kc-subpage">
    <section className="kc-about-hero kc-section-wide"><div><span className="kc-overline">{bn ? "০১ · পরিচিতি" : "01 · About"}</span><h1>{bn ? "একটি স্কুলের গল্প, মানুষ ও প্রতিদিনের কাজ দিয়ে তৈরি।" : "A school story built from people, place and everyday work."}</h1><p>{dict.about.body}</p></div><div className="kc-about-hero-image"><Image src="/kcmsc/media/20250722_090917.jpg" alt="KCMSC campus" fill priority sizes="(min-width:900px) 45vw, 100vw" className="object-cover" /><span>Prembagan · Dakshinkhan · Dhaka</span></div></section>
    <section className="kc-about-timeline"><div className="kc-section-wide"><div className="kc-about-section-head"><span className="kc-overline">{bn ? "০২ · যাত্রাপথ" : "02 · Timeline"}</span><h2>{bn ? "সময়, একটি জায়গা এবং একটি স্পষ্ট উদ্দেশ্য।" : "A date, a place and a clear direction."}</h2></div><div className="kc-timeline">{milestones.map(([year,title,text],i)=><article key={year}><span>0{i+1}</span><b>{year}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="kc-about-purpose"><div className="kc-section-wide"><div><span className="kc-overline">{bn ? "০৩ · লক্ষ্য" : "03 · Mission"}</span><h2>{dict.about.mission}</h2></div><div><span className="kc-overline">{bn ? "দৃষ্টিভঙ্গি" : "Vision"}</span><h2>{dict.about.vision}</h2></div></div></section>
    <section className="kc-about-people kc-section-wide"><div className="kc-people-image"><Image src="/kcmsc/media/20230123_124320.jpg" alt="KCMSC school community" fill sizes="(min-width:900px) 55vw, 100vw" className="object-cover" /></div><div><span className="kc-overline">{bn ? "০৪ · নেতৃত্ব" : "04 · Leadership"}</span><h2>{bn ? "প্রতিষ্ঠানটি পরিচালনার পেছনে থাকা মানুষগুলো।" : "The people behind the institution."}</h2><p>{bn ? "প্রতিষ্ঠাতা, প্রশাসন ও একাডেমিক নেতৃত্ব KCMSC-এর শিক্ষা-পরিবেশ পরিচালনায় ভূমিকা রাখে।" : "The founder, administration and academic leadership guide the institution and its educational environment."}</p><div className="kc-leadership-list">{dict.leadership.map((person,i)=><div key={person.name}><span>0{i+1}</span><strong>{person.name}</strong><small>{person.role}</small></div>)}</div></div></section>
    <section className="kc-about-end"><div className="kc-section-wide"><div><span className="kc-overline">KCMSC</span><h2>{bn ? "স্কুলজীবনের বাকি অংশটাও দেখুন।" : "There is more to school than its history."}</h2></div><Link href={`/${locale}/student-life`} className="kc-solid-button">{bn ? "শিক্ষার্থী জীবন" : "Student life"}<span>↗</span></Link></div></section>
  </main>;
}
