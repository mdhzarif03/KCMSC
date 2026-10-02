"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";

const slides = [
  {
    image: "/kcmsc/media/kcmsc1.jpg",
    alt: "K C Model School and College building",
    kicker: "K C MODEL SCHOOL & COLLEGE",
    title: "A place to learn, grow and take part.",
    body: "From Play Group to Grade XII, KCMSC brings learning and everyday school life together.",
    caption: "Campus · Dakshinkhan, Dhaka",
  },
  {
    image: "/kcmsc/media/teacher_taking_class.jpg",
    alt: "A teacher leading a class at KCMSC",
    kicker: "ACADEMICS",
    title: "Learning begins with attention.",
    body: "Bangla and English Versions of the National Curriculum are supported by dedicated teaching and practical facilities.",
    caption: "Classroom learning",
  },
  {
    image: "/kcmsc/media/students_at_bookfair.jpg",
    alt: "Students at a KCMSC book fair",
    kicker: "STUDENT LIFE",
    title: "There is more to school than lessons.",
    body: "Reading, cultural programmes, trips and shared events give students space to participate and discover.",
    caption: "Students at a book fair",
  },
  {
    image: "/kcmsc/media/kc_team_representing_at_AIUB.jpg",
    alt: "KCMSC students representing the school in sport",
    kicker: "SPORT & ACTIVITIES",
    title: "Learning happens together, too.",
    body: "Sport and co-curricular activities add another dimension to everyday school life.",
    caption: "KCMSC students in sport",
  },
];

const bn = [
  {
    kicker: "কে সি মডেল স্কুল অ্যান্ড কলেজ",
    title: "শেখা, বেড়ে ওঠা ও অংশ নেওয়ার একটি জায়গা।",
    body: "প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত KCMSC-তে পড়াশোনা ও দৈনন্দিন স্কুলজীবন পাশাপাশি এগিয়ে চলে।",
    caption: "ক্যাম্পাস · দক্ষিণখান, ঢাকা",
  },
  {
    kicker: "একাডেমিক",
    title: "মনোযোগ দিয়ে শেখার শুরু।",
    body: "বাংলা ও ইংরেজি ভার্সনের জাতীয় শিক্ষাক্রমের সঙ্গে রয়েছে নিবেদিত শিক্ষক ও ব্যবহারিক শিক্ষার সুবিধা।",
    caption: "শ্রেণিকক্ষে পাঠদান",
  },
  {
    kicker: "শিক্ষার্থী জীবন",
    title: "স্কুল শুধু ক্লাসের মধ্যে সীমাবদ্ধ নয়।",
    body: "বই পড়া, সাংস্কৃতিক অনুষ্ঠান, শিক্ষা সফর ও বিভিন্ন আয়োজনে শিক্ষার্থীরা অংশ নেয়।",
    caption: "বইমেলায় শিক্ষার্থীরা",
  },
  {
    kicker: "খেলাধুলা ও কার্যক্রম",
    title: "একসঙ্গেও শেখা যায়।",
    body: "খেলাধুলা ও সহশিক্ষা কার্যক্রম দৈনন্দিন স্কুলজীবনে আরেকটি মাত্রা যোগ করে।",
    caption: "খেলাধুলায় KCMSC শিক্ষার্থীরা",
  },
];

export function HeroSlideshow({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active] ?? slides[0]!;
  const copy = locale === "bn" ? (bn[active] ?? bn[0]!) : slide;

  return (
    <section
      className="bg-[#f7f5ef] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto grid min-h-[560px] max-w-[1320px] overflow-hidden rounded-[18px] bg-[#176b45] lg:grid-cols-[.78fr_1.22fr] lg:min-h-[620px]">
        <div className="relative z-10 flex flex-col justify-between px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div>
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[.18em] text-white/70">
              <span>{copy.kicker}</span>
              <span className="h-px w-8 bg-white/40" />
            </div>
            <h1 className="mt-7 max-w-xl font-heading text-[clamp(2.7rem,5vw,5.8rem)] font-normal leading-[.96] tracking-[-.04em]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-md text-[14px] leading-7 text-white/75">
              {copy.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href={`/${locale}/about`}
                className="kc-classic-button kc-classic-button-light"
              >
                {locale === "bn" ? "KCMSC সম্পর্কে" : "Discover KCMSC"}
              </Link>
              <Link
                href={`/${locale}/admissions`}
                className="kc-classic-button kc-classic-button-ghost-light"
              >
                {locale === "bn" ? "ভর্তি" : "Admissions"}
              </Link>
            </div>
          </div>
          <div className="mt-12 flex items-end justify-between gap-6 border-t border-white/20 pt-5">
            <p className="text-[10px] uppercase tracking-[.12em] text-white/55">
              {copy.caption}
            </p>
            <div className="flex gap-1.5" aria-label="Hero slides">
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                  className={`h-1 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-3 bg-white/35"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-0">
          {slides.map((item, index) => (
            <div
              key={item.image}
              className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={index !== active}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123f2e]/35 via-transparent to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-8 sm:right-8">
            <button
              type="button"
              onClick={() =>
                setActive(
                  (value) => (value - 1 + slides.length) % slides.length,
                )
              }
              aria-label="Previous slide"
              className="kc-hero-arrow"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActive((value) => (value + 1) % slides.length)}
              aria-label="Next slide"
              className="kc-hero-arrow"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
