"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";

const slides = [
  {
    image: "/kcmsc/hero/kcmsc-building.jpg",
    alt: "K C Model School & College building",
    kicker: "K C MODEL SCHOOL & COLLEGE · EST. 2014",
    title: "A place to learn. A place to belong.",
    body: "Purposeful teaching, disciplined learning and a lively school community from Play Group to Grade Twelve.",
    caption: "The KCMSC campus · Dakshinkhan, Dhaka",
    number: "01",
  },
  {
    image: "/kcmsc/facilities/teacher_taking_class.jpg",
    alt: "Students learning in a KCMSC classroom",
    kicker: "LEARNING · EVERY DAY",
    title: "Good teaching begins with attention.",
    body: "Classroom learning remains at the heart of school life, supported by experienced teachers and purposeful facilities.",
    caption: "Classroom learning",
    number: "02",
  },
  {
    image: "/kcmsc/facilities/students_at_library.jpg",
    alt: "KCMSC students reading in the library",
    kicker: "READING · DISCOVERY",
    title: "Room to read, think and grow.",
    body: "A school library gives students a quieter place to read, study and explore beyond the day's lessons.",
    caption: "Students in the library",
    number: "03",
  },
  {
    image: "/kcmsc/facilities/rooftop_garden.jpg",
    alt: "KCMSC students in the rooftop garden",
    kicker: "CAMPUS · COMMUNITY",
    title: "A school that feels lived in.",
    body: "From classrooms to rooftop gardens, everyday spaces become part of the experience of growing up together.",
    caption: "Rooftop garden",
    number: "04",
  },
  {
    image: "/kcmsc/student-life/vibrant_art_culture.jpg",
    alt: "KCMSC students taking part in a cultural activity",
    kicker: "CULTURE · EXPRESSION",
    title: "There is more to school than a timetable.",
    body: "Art, culture and shared school occasions give students space to participate, create and celebrate together.",
    caption: "Student culture and creativity",
    number: "05",
  },
  {
    image: "/kcmsc/sports/kc_team_representing_at_AIUB.jpg",
    alt: "KCMSC student sports team",
    kicker: "SPORT · TEAMWORK",
    title: "Learning also happens together.",
    body: "Sport builds habits of teamwork, discipline and participation, on the field and beyond it.",
    caption: "KCMSC students representing the school in sport",
    number: "06",
  },
];

const bengaliSlides = [
  {
    kicker: "কে সি মডেল স্কুল অ্যান্ড কলেজ · প্রতিষ্ঠিত ২০১৪",
    title: "শেখার জায়গা। আপন হয়ে ওঠার জায়গা।",
    body: "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত উদ্দেশ্যপূর্ণ পাঠদান, শৃঙ্খলাবদ্ধ শিক্ষা ও প্রাণবন্ত স্কুলজীবন।",
    caption: "KCMSC ক্যাম্পাস · দক্ষিণখান, ঢাকা",
  },
  {
    kicker: "শেখা · প্রতিদিন",
    title: "মনোযোগ দিয়েই ভালো পাঠদান শুরু হয়।",
    body: "অভিজ্ঞ শিক্ষক ও প্রয়োজনীয় সুবিধার সহায়তায় শ্রেণিকক্ষের শিক্ষাই স্কুলজীবনের মূল ভিত্তি।",
    caption: "শ্রেণিকক্ষে পাঠদান",
  },
  {
    kicker: "পড়া · আবিষ্কার",
    title: "পড়া, ভাবা ও বেড়ে ওঠার জায়গা।",
    body: "লাইব্রেরি শিক্ষার্থীদের পড়া, অধ্যয়ন ও পাঠ্যবইয়ের বাইরের বিষয় আবিষ্কারের সুযোগ দেয়।",
    caption: "লাইব্রেরিতে শিক্ষার্থীরা",
  },
  {
    kicker: "ক্যাম্পাস · সম্প্রদায়",
    title: "যে স্কুলে প্রতিদিনের জীবনও গুরুত্বপূর্ণ।",
    body: "শ্রেণিকক্ষ থেকে ছাদবাগান পর্যন্ত স্কুলের প্রতিটি স্থান একসঙ্গে বেড়ে ওঠার অভিজ্ঞতার অংশ।",
    caption: "ছাদবাগান",
  },
  {
    kicker: "সংস্কৃতি · প্রকাশ",
    title: "স্কুল শুধু একটি রুটিনের নাম নয়।",
    body: "শিল্প, সংস্কৃতি ও বিভিন্ন আয়োজন শিক্ষার্থীদের অংশ নিতে, সৃষ্টি করতে ও একসঙ্গে উদযাপন করতে সুযোগ দেয়।",
    caption: "শিক্ষার্থীদের সংস্কৃতি ও সৃজনশীলতা",
  },
  {
    kicker: "খেলাধুলা · দলগত কাজ",
    title: "একসঙ্গেও শেখা যায়।",
    body: "খেলাধুলা মাঠের ভেতরে ও বাইরে দলগত কাজ, শৃঙ্খলা ও অংশগ্রহণের অভ্যাস গড়ে তোলে।",
    caption: "খেলাধুলায় KCMSC শিক্ষার্থীরা",
  },
];

export function HeroSlideshow({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section
      className="relative isolate min-h-[calc(100svh-104px)] overflow-hidden bg-[#183d2e] text-white"
      aria-label="KCMSC featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,22,.82)_0%,rgba(9,31,22,.58)_35%,rgba(9,31,22,.18)_72%,rgba(9,31,22,.3)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091f16]/70 via-transparent to-[#091f16]/10" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-104px)] max-w-[1440px] flex-col justify-between px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.22em] text-[#dbc887]">
            <span>{locale === "bn" ? bengaliSlides[active].kicker : slides[active].kicker}</span>
            <span className="h-px w-12 bg-[#dbc887]/70" />
          </div>

          <h1 className="max-w-4xl font-heading text-[clamp(3.4rem,7.4vw,8.2rem)] leading-[.88] tracking-[-.05em] text-[#fbf7ec]">
            {locale === "bn" ? bengaliSlides[active].title : slides[active].title}
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            {locale === "bn" ? bengaliSlides[active].body : slides[active].body}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${locale}/admissions`} className="kc-classic-button kc-classic-button-light">
              {locale === "bn" ? "ভর্তি" : "Admissions"}
            </Link>
            <Link href={`/${locale}/about`} className="kc-classic-button kc-classic-button-ghost-light">
              {locale === "bn" ? "KCMSC সম্পর্কে" : "Discover KCMSC"}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-7 border-t border-white/25 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="flex items-end gap-5">
            <span className="font-heading text-4xl text-[#fbf7ec]">{slides[active].number}</span>
            <span className="max-w-md text-[11px] uppercase tracking-[.17em] text-white/65">
              {locale === "bn" ? bengaliSlides[active].caption : slides[active].caption}
            </span>
          </div>

          <div className="flex items-center gap-2" aria-label="Choose hero slide">
            {slides.map((slide, index) => (
              <button
                key={slide.number}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={`h-1.5 transition-all duration-300 ${index === active ? "w-12 bg-[#dbc887]" : "w-5 bg-white/45 hover:bg-white/75"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-6 z-20 hidden gap-2 sm:flex lg:right-10">
        <button type="button" onClick={previous} aria-label="Previous slide" className="kc-hero-arrow">
          ←
        </button>
        <button type="button" onClick={next} aria-label="Next slide" className="kc-hero-arrow">
          →
        </button>
      </div>
    </section>
  );
}
