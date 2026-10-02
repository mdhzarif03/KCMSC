"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

const data = {
  en: {
    heroKicker: "K C MODEL SCHOOL & COLLEGE · DHAKA",
    heroTitle: "A school with room to learn, grow and take part.",
    heroBody: "From Play Group to Grade XII, KCMSC brings classroom learning together with books, sport, culture, technology and everyday school life.",
    heroButton: "Discover the school",
    heroNote: "Established 2014 · Journey began 1 January 2015",
    glance: "The school at a glance",
    students: "Students", range: "Range", versions: "Versions", hours: "School day",
    studentValue: "2,336", rangeValue: "Play Group–XII", versionsValue: "Bangla + English", hoursValue: "7:45–2:30",
    storyKicker: "01 · The story",
    storyTitle: "Built around a simple idea: education should continue beyond the lesson.",
    storyBody: "Founded in 2014 by Al-Hajj Md. Khashru Chowdhury (CIP), KCMSC began its educational journey on 1 January 2015 with around 2,200 students. Today, the school serves students from Play Group through Grade Twelve.",
    storyLink: "Read our story",
    frameKicker: "02 · Four parts of school life",
    frames: [
      ["Learning", "Classrooms, teachers and a structured academic journey.", "/kcmsc/media/teacher_taking_class.jpg", "academics"],
      ["Reading", "A library and book-focused activities create space to explore.", "/kcmsc/media/students_at_library.jpg", "facilities"],
      ["Participation", "Culture, sport, trips and competitions make the week bigger than the timetable.", "/kcmsc/media/vibrant_student_culture.jpg", "student-life"],
      ["Making", "ICT, Robotics & Coding and other activities connect students with practical interests.", "/kcmsc/media/ict_olympiad_at_kc.jpg", "clubs"],
    ],
    resultsKicker: "03 · The record",
    resultsTitle: "2024 results, clearly presented.",
    resultsBody: "A quick view of the reported SSC and HSC results.",
    ssc: "SSC 2024", hsc: "HSC 2024", candidates: "candidates", passed: "passed", gpa: "GPA 5",
    missionKicker: "04 · Purpose",
    missionTitle: "Developing physical, mental and spiritual potential while preparing responsible global citizens.",
    visionTitle: "A capable and responsible generation for the 21st century.",
    mission: "Mission", vision: "Vision",
    endKicker: "05 · Start here",
    endTitle: "Looking for admission, a notice or simply the right person to contact?",
    endBody: "Keep the practical information close: admissions, notices and contact details are all one step away.",
    admission: "Admissions", contact: "Contact",
  },
  bn: {
    heroKicker: "কে সি মডেল স্কুল অ্যান্ড কলেজ · ঢাকা",
    heroTitle: "শেখা, বেড়ে ওঠা ও অংশ নেওয়ার জন্য জায়গা আছে এমন একটি স্কুল।",
    heroBody: "Play Group থেকে Grade XII পর্যন্ত KCMSC শ্রেণিকক্ষের পাঠের সঙ্গে বই, খেলাধুলা, সংস্কৃতি, প্রযুক্তি ও প্রতিদিনের স্কুলজীবনকে একসঙ্গে রাখে।",
    heroButton: "স্কুলটি দেখুন", heroNote: "প্রতিষ্ঠা ২০১৪ · যাত্রা শুরু ১ জানুয়ারি ২০১৫",
    glance: "এক নজরে স্কুল", students: "শিক্ষার্থী", range: "পরিসর", versions: "ভার্সন", hours: "স্কুলের সময়",
    studentValue: "২,৩৩৬", rangeValue: "Play Group–XII", versionsValue: "বাংলা + ইংরেজি", hoursValue: "৭:৪৫–২:৩০",
    storyKicker: "০১ · গল্প", storyTitle: "একটি সহজ ভাবনা: শেখা যেন পাঠ শেষ হওয়ার সঙ্গে শেষ না হয়।",
    storyBody: "আল-হাজ্জ মো. খসরু চৌধুরী (সিআইপি), নিপা গ্রুপের প্রতিষ্ঠাতা, ২০১৪ সালে KCMSC প্রতিষ্ঠা করেন। ১ জানুয়ারি ২০১৫-তে প্রায় ২,২০০ শিক্ষার্থী নিয়ে যাত্রা শুরু হয়। বর্তমানে Play Group থেকে Grade Twelve পর্যন্ত শিক্ষা কার্যক্রম পরিচালিত হয়।",
    storyLink: "আমাদের গল্প", frameKicker: "০২ · স্কুলজীবনের চার দিক",
    frames: [["শেখা", "শ্রেণিকক্ষ, শিক্ষক ও একটি ধারাবাহিক একাডেমিক যাত্রা।", "/kcmsc/media/teacher_taking_class.jpg", "academics"], ["পড়া", "লাইব্রেরি ও বইকেন্দ্রিক কার্যক্রমে পড়ার জায়গা তৈরি হয়।", "/kcmsc/media/students_at_library.jpg", "facilities"], ["অংশগ্রহণ", "সংস্কৃতি, খেলাধুলা, সফর ও প্রতিযোগিতা স্কুলজীবনকে বড় করে।", "/kcmsc/media/vibrant_student_culture.jpg", "student-life"], ["তৈরি করা", "ICT, Robotics & Coding এবং অন্যান্য কার্যক্রম আগ্রহকে বাস্তব কাজে আনে।", "/kcmsc/media/ict_olympiad_at_kc.jpg", "clubs"]],
    resultsKicker: "০৩ · ফলাফল", resultsTitle: "২০২৪ সালের ফলাফল, এক নজরে।", resultsBody: "প্রকাশিত SSC ও HSC ফলাফলের সংক্ষিপ্ত চিত্র।", ssc: "SSC ২০২৪", hsc: "HSC ২০২৪", candidates: "পরীক্ষার্থী", passed: "উত্তীর্ণ", gpa: "GPA 5",
    missionKicker: "০৪ · উদ্দেশ্য", missionTitle: "শারীরিক, মানসিক ও আধ্যাত্মিক সম্ভাবনা বিকশিত করে দায়িত্বশীল বিশ্বনাগরিক হিসেবে গড়ে তোলা।", visionTitle: "২১শ শতকের জন্য সক্ষম ও দায়িত্বশীল প্রজন্ম তৈরি করা।", mission: "লক্ষ্য", vision: "দৃষ্টিভঙ্গি",
    endKicker: "০৫ · এখান থেকে শুরু করুন", endTitle: "ভর্তি, নোটিশ বা যোগাযোগের প্রয়োজন?", endBody: "প্রয়োজনীয় তথ্য সহজে খুঁজে নিন: ভর্তি, নোটিশ ও যোগাযোগের পাতা এক ধাপ দূরে।", admission: "ভর্তি", contact: "যোগাযোগ",
  },
} as const;

export function LandingExperience({ locale }: { locale: Locale }) {
  const t = data[locale];
  return <main className="kc-home">
    <section className="kc-home-hero">
      <div className="kc-home-hero-copy">
        <span className="kc-overline">{t.heroKicker}</span>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroBody}</p>
        <div className="kc-home-actions"><Link href={`/${locale}/about`} className="kc-solid-button">{t.heroButton}<span>↗</span></Link><span className="kc-home-note">{t.heroNote}</span></div>
      </div>
      <div className="kc-home-visual">
        <div className="kc-image-main"><Image src="/kcmsc/media/kcmsc1.jpg" alt="KCMSC campus" fill priority sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" /></div>
        <div className="kc-image-float"><Image src="/kcmsc/media/teacher_taking_class.jpg" alt="KCMSC classroom" fill sizes="260px" className="object-cover" /><span>01 / 04</span></div>
        <div className="kc-hero-stamp">KC<br /><small>2014</small></div>
      </div>
    </section>

    <section className="kc-glance"><div className="kc-section-wide"><div className="kc-section-label"><span>{t.glance}</span><i /></div><div className="kc-glance-grid">{[[t.students,t.studentValue],[t.range,t.rangeValue],[t.versions,t.versionsValue],[t.hours,t.hoursValue]].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></div></section>

    <section className="kc-story kc-section-wide"><div className="kc-story-copy"><span className="kc-overline">{t.storyKicker}</span><h2>{t.storyTitle}</h2><p>{t.storyBody}</p><Link href={`/${locale}/about`} className="kc-text-link">{t.storyLink}<span>↗</span></Link></div><div className="kc-story-image"><Image src="/kcmsc/media/IMG-20260113-WA0005.jpg" alt="KCMSC school community" fill sizes="(min-width: 900px) 52vw, 100vw" className="object-cover" /></div></section>

    <section className="kc-frames"><div className="kc-section-wide"><div className="kc-section-heading"><div><span className="kc-overline">{t.frameKicker}</span><h2>What makes an ordinary school day feel full.</h2></div><span className="kc-heading-mark">04</span></div><div className="kc-frame-grid">{t.frames.map(([title,body,image,href],i)=><Link href={`/${locale}/${href}`} key={title} className={`kc-frame-card card-${i+1}`}><div className="kc-frame-image"><Image src={image} alt={title} fill sizes="(min-width: 900px) 30vw, 100vw" className="object-cover" /></div><div className="kc-frame-copy"><span>0{i+1}</span><h3>{title}</h3><p>{body}</p><b>Explore ↗</b></div></Link>)}</div></div></section>

    <section className="kc-results kc-section-wide"><div><span className="kc-overline">{t.resultsKicker}</span><h2>{t.resultsTitle}</h2><p>{t.resultsBody}</p><Link href={`/${locale}/achievements`} className="kc-text-link">Results &amp; achievements <span>↗</span></Link></div><div className="kc-result-table"><div><span>{t.ssc}</span><strong>98.48%</strong><p>130 {t.candidates} · 128 {t.passed} · 67 {t.gpa}</p></div><div><span>{t.hsc}</span><strong>100%</strong><p>47 {t.candidates} · 47 {t.passed} · 13 {t.gpa}</p></div></div></section>

    <section className="kc-purpose"><div className="kc-purpose-grid"><article><span className="kc-overline">{t.mission}</span><h2>{t.missionTitle}</h2></article><article><span className="kc-overline">{t.vision}</span><h2>{t.visionTitle}</h2></article></div></section>

    <section className="kc-home-end kc-section-wide"><div><span className="kc-overline">{t.endKicker}</span><h2>{t.endTitle}</h2></div><div><p>{t.endBody}</p><div className="kc-end-actions"><Link href={`/${locale}/admissions`} className="kc-solid-button">{t.admission}<span>↗</span></Link><Link href={`/${locale}/contact`} className="kc-outline-button">{t.contact}</Link></div></div></section>
  </main>;
}
