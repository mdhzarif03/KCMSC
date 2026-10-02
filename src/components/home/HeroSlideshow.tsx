"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";

const slides = [
  {
    image: "/kcmsc/media/kcmsc1.jpg",
    alt: "K C Model School and College building",
    kicker: "K C MODEL SCHOOL & COLLEGE · EST. 2014",
    title: "A school built around everyday learning.",
    body: "From Play Group to Grade Twelve, KCMSC brings teaching, discipline, culture and student life together.",
    caption: "The campus · Dakshinkhan, Dhaka",
    number: "01",
  },
  {
    image: "/kcmsc/media/teacher_taking_class.jpg",
    alt: "A teacher leading a class at KCMSC",
    kicker: "ACADEMICS · ATTENTION",
    title: "Learning starts in the classroom.",
    body: "Bangla and English Versions of the National Curriculum are supported by dedicated teaching and practical facilities.",
    caption: "Classroom learning",
    number: "02",
  },
  {
    image: "/kcmsc/media/students_at_bookfair.jpg",
    alt: "Students at a KCMSC book fair",
    kicker: "STUDENT LIFE · CURIOSITY",
    title: "School life extends beyond the timetable.",
    body: "Reading, cultural programmes, trips and shared events give students space to participate and discover.",
    caption: "Students at a book fair",
    number: "03",
  },
  {
    image: "/kcmsc/media/kc_team_representing_at_AIUB.jpg",
    alt: "KCMSC students representing the school in sport",
    kicker: "SPORT · TEAMWORK",
    title: "Learning also happens together.",
    body: "Sport and co-curricular activities help make school life active, social and purposeful.",
    caption: "KCMSC students in sport",
    number: "04",
  },
];

const bengaliSlides = [
  { kicker: "কে সি মডেল স্কুল অ্যান্ড কলেজ · প্রতিষ্ঠিত ২০১৪", title: "প্রতিদিনের শেখাকে ঘিরে গড়ে ওঠা একটি স্কুল।", body: "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত পাঠদান, শৃঙ্খলা, সংস্কৃতি ও শিক্ষাজীবন একসঙ্গে এগিয়ে চলে।", caption: "ক্যাম্পাস · দক্ষিণখান, ঢাকা" },
  { kicker: "একাডেমিক · মনোযোগ", title: "শেখার শুরু শ্রেণিকক্ষে।", body: "বাংলা ও ইংরেজি ভার্সনের জাতীয় শিক্ষাক্রমের সঙ্গে রয়েছে নিবেদিত শিক্ষক ও ব্যবহারিক শিক্ষার সুবিধা।", caption: "শ্রেণিকক্ষে পাঠদান" },
  { kicker: "শিক্ষাজীবন · কৌতূহল", title: "স্কুলের জীবন রুটিনের চেয়েও বড়।", body: "বই পড়া, সাংস্কৃতিক অনুষ্ঠান, শিক্ষা সফর ও বিভিন্ন আয়োজনে শিক্ষার্থীরা অংশ নেয়।", caption: "বইমেলায় শিক্ষার্থীরা" },
  { kicker: "খেলাধুলা · দলগত কাজ", title: "একসঙ্গেও শেখা যায়।", body: "খেলাধুলা ও সহশিক্ষা কার্যক্রম স্কুলজীবনকে সক্রিয়, সামাজিক ও উদ্দেশ্যপূর্ণ করে।", caption: "খেলাধুলায় KCMSC শিক্ষার্থীরা" },
];

export function HeroSlideshow({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * Keep the slideshow on a valid index.
   * This protects the component even if the slide
   * arrays are changed in the future.
   */
  const currentSlide = slides[active] ?? slides[0];
  const currentBengaliSlide = bengaliSlides[active] ?? bengaliSlides[0];

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  /*
   * The arrays are defined with six entries, but the
   * fallback above makes the component safe even if
   * that changes later.
   */
  if (!currentSlide || !currentBengaliSlide) {
    return null;
  }

  return (
    <section
      className="relative isolate h-[min(76svh,720px)] min-h-[500px] overflow-hidden bg-[#183d2e] text-white"
      aria-label="KCMSC featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
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

          {/* Main dark overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,22,.82)_0%,rgba(9,31,22,.58)_35%,rgba(9,31,22,.18)_72%,rgba(9,31,22,.3)_100%)]" />

          {/* Bottom readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091f16]/70 via-transparent to-[#091f16]/10" />
        </div>
      ))}

      {/* Stable hero content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-6 pt-12 sm:px-10 sm:pb-10 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="max-w-3xl">
          {/* Kicker */}
          <div className="mb-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.22em] text-[#dbc887]">
            <span>
              {locale === "bn"
                ? currentBengaliSlide.kicker
                : currentSlide.kicker}
            </span>

            <span className="h-px w-12 bg-[#dbc887]/70" />
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl min-h-[3.5em] font-heading text-[clamp(2.65rem,12vw,8.2rem)] sm:text-[clamp(3.4rem,7.4vw,8.2rem)] leading-[.88] tracking-[-.05em] text-[#fbf7ec]">
            {locale === "bn" ? currentBengaliSlide.title : currentSlide.title}
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
            {locale === "bn" ? currentBengaliSlide.body : currentSlide.body}
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/admissions`}
              className="kc-classic-button kc-classic-button-light"
            >
              {locale === "bn" ? "ভর্তি" : "Admissions"}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="kc-classic-button kc-classic-button-ghost-light"
            >
              {locale === "bn" ? "KCMSC সম্পর্কে" : "Discover KCMSC"}
            </Link>
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-7 border-t border-white/25 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="flex items-end gap-5">
            <span className="font-heading text-4xl text-[#fbf7ec]">
              {currentSlide.number}
            </span>

            <span className="max-w-md text-[11px] uppercase tracking-[.17em] text-white/65">
              {locale === "bn"
                ? currentBengaliSlide.caption
                : currentSlide.caption}
            </span>
          </div>

          {/* Slide indicators */}
          <div
            className="flex items-center gap-2"
            aria-label="Choose hero slide"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.number}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={`h-1.5 transition-all duration-300 ${
                  index === active
                    ? "w-12 bg-[#dbc887]"
                    : "w-5 bg-white/45 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Previous / next controls */}
      <div className="absolute bottom-24 right-6 z-20 hidden gap-2 sm:flex lg:right-10">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous slide"
          className="kc-hero-arrow"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="kc-hero-arrow"
        >
          →
        </button>
      </div>
    </section>
  );
}
