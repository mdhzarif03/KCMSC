"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

const FALLBACK_IMAGES = [
  "/assets/pictures/landing-page/1.jpg",
  "/assets/pictures/landing-page/2.jpg",
];

const LOCAL_CANDIDATES = Array.from(
  { length: 12 },
  (_, i) => `/assets/pictures/landing-page/${i + 1}.jpg`,
);

const captions = [
  {
    kicker: "K C MODEL SCHOOL & COLLEGE",
    title: "A place to learn, discover, and become.",
    body: "A school community built around knowledge, discipline, morality, and the curiosity to go further.",
  },
  {
    kicker: "ACADEMICS",
    title: "Learning that reaches beyond the textbook.",
    body: "Strong academic foundations, practical learning, and room for students to ask better questions.",
  },
  {
    kicker: "STUDENT LIFE",
    title: "There is more to school than the timetable.",
    body: "Sports, culture, clubs, competitions, friendships, and the experiences that shape a student.",
  },
  {
    kicker: "SCIENCE & TECHNOLOGY",
    title: "Curiosity belongs in the laboratory too.",
    body: "Spaces and activities that turn concepts into experiments, projects, and things students can actually build.",
  },
  {
    kicker: "CAMPUS",
    title: "A campus designed for everyday life.",
    body: "From classrooms and laboratories to libraries and open spaces, the campus is part of the learning experience.",
  },
  {
    kicker: "CHARACTER",
    title: "Knowledge with character.",
    body: "Education is not only what students know. It is also how they think, act, collaborate, and contribute.",
  },
];

export function LandingExperience({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [graphVisible, setGraphVisible] = useState(false);

  const railRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLElement>(null);

  /*
   * ------------------------------------------------------------
   * FIND AVAILABLE LANDING IMAGES
   * ------------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      LOCAL_CANDIDATES.map(
        (src) =>
          new Promise<string | null>((resolve) => {
            const image = new Image();

            image.onload = () => resolve(src);
            image.onerror = () => resolve(null);

            image.src = src;
          }),
      ),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setLocalImages(results.filter((src): src is string => Boolean(src)));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * IMAGE LIST
   * ------------------------------------------------------------
   */

  const images = useMemo(() => {
    if (localImages.length > 0) {
      return localImages;
    }

    return FALLBACK_IMAGES;
  }, [localImages]);

  /*
   * ------------------------------------------------------------
   * KEEP ACTIVE SLIDE VALID
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (active >= images.length) {
      setActive(0);
    }
  }, [active, images.length]);

  /*
   * ------------------------------------------------------------
   * AUTOMATIC HERO SLIDESHOW
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [images.length]);

  /*
   * ------------------------------------------------------------
   * MOVE ONLY THE THUMBNAIL RAIL
   *
   * DO NOT USE scrollIntoView()
   * because that can move the entire webpage vertically.
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const item = rail.children[active] as HTMLElement | undefined;

    if (!item) {
      return;
    }

    const targetLeft =
      item.offsetLeft - rail.clientWidth / 2 + item.clientWidth / 2;

    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [active]);

  /*
   * ------------------------------------------------------------
   * ANIMATED GRAPH OBSERVER
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const element = graphRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setGraphVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * CURRENT HERO CAPTION
   * ------------------------------------------------------------
   */

  const caption = captions[active % captions.length]!;

  return (
    <div className="kcmsc-landing bg-background">
      {/* ========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative
          isolate
          min-h-[100svh]
          overflow-hidden
          bg-black
          text-white
        "
      >
        {/* Navigation readability gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-44
            bg-gradient-to-b
            from-black/60
            via-black/25
            to-transparent
          "
        />

        {/* Hero images */}

        <div className="absolute inset-0">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden={index !== active}
              className={`
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-all
                duration-[1400ms]
                ease-out
                ${
                  index === active
                    ? "scale-100 opacity-100"
                    : "scale-[1.045] opacity-0"
                }
              `}
            />
          ))}

          {/* Left readability */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-black/70
              via-black/30
              to-black/5
            "
          />

          {/* Bottom readability */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-80
              bg-gradient-to-t
              from-black/65
              via-black/20
              to-transparent
            "
          />
        </div>

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[100svh]
            max-w-[1500px]
            flex-col
            justify-end
            px-6
            pb-8
            pt-28
            sm:px-10
            sm:pb-10
            lg:px-14
            lg:pb-12
          "
        >
          <div
            className="
              grid
              items-end
              gap-10
              lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)]
            "
          >
            {/* Hero text */}

            <div className="max-w-3xl">
              <p
                key={`kicker-${active}`}
                className="
                  landing-reveal
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white/70
                  sm:text-xs
                "
              >
                {caption.kicker}
              </p>

              <h1
                key={`title-${active}`}
                className="
                  landing-reveal
                  mt-4
                  max-w-3xl
                  font-heading
                  text-4xl
                  leading-[0.96]
                  tracking-[-0.025em]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                {caption.title}
              </h1>

              <p
                key={`body-${active}`}
                className="
                  landing-reveal
                  mt-5
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/80
                  sm:text-base
                "
              >
                {caption.body}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/admissions`}
                  className="
                    rounded-full
                    bg-white
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    text-primary-dark
                    transition
                    hover:bg-white/90
                  "
                >
                  Explore admissions
                </Link>

                <Link
                  href={`/${locale}/about`}
                  className="
                    rounded-full
                    border
                    border-white/35
                    bg-white/10
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white/15
                  "
                >
                  Discover KCMSC
                </Link>
              </div>
            </div>

            {/* Slide counter */}

            <div className="hidden lg:block">
              <p
                className="
                  mb-4
                  text-right
                  text-[10px]
                  uppercase
                  tracking-[0.24em]
                  text-white/55
                "
              >
                Scroll to explore
              </p>

              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-3
                  text-xs
                  text-white/75
                "
              >
                <span>{String(active + 1).padStart(2, "0")}</span>

                <div className="h-px w-28 bg-white/25">
                  <div
                    className="
                      h-px
                      bg-white
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${((active + 1) / images.length) * 100}%`,
                    }}
                  />
                </div>

                <span>{String(images.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail rail */}

          <div
            ref={railRef}
            className="
              landing-rail
              mt-10
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show landing image ${index + 1}`}
                className={`
                  group
                  relative
                  h-16
                  w-28
                  shrink-0
                  snap-center
                  overflow-hidden
                  rounded-lg
                  border
                  transition
                  sm:h-20
                  sm:w-36
                  ${
                    index === active
                      ? "border-white"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }
                `}
              >
                <img
                  src={src}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />

                <span className="absolute inset-0 bg-black/20" />

                <span
                  className="
                    absolute
                    bottom-2
                    left-2
                    text-[10px]
                    font-medium
                    text-white
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          STORY
      ========================================================= */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-content
            gap-10
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
            lg:px-14
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              The story
            </p>

            <h2
              className="
                mt-3
                max-w-xl
                font-heading
                text-3xl
                leading-tight
                text-ink
                sm:text-5xl
              "
            >
              A school where the next chapter is still being written.
            </h2>
          </div>

          <p
            className="
              max-w-2xl
              text-sm
              leading-7
              text-ink-muted
              sm:text-base
            "
          >
            K C Model School and College brings together academic learning,
            practical experience, student activities, and a community that
            values knowledge, discipline, and morality.
          </p>
        </div>
      </section>

      {/* ========================================================
          LARGE CAMPUS IMAGE
      ========================================================= */}

      <section className="bg-surface py-6 sm:py-10">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            sm:px-10
            lg:px-14
          "
        >
          <div
            className="
              relative
              aspect-[16/8.5]
              overflow-hidden
              rounded-2xl
              sm:rounded-3xl
            "
          >
            <img
              src={images[0]}
              alt="KCMSC campus life"
              className="h-full w-full object-cover"
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/65
                via-transparent
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                max-w-xl
                p-6
                text-white
                sm:p-10
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.24em]
                  text-white/60
                "
              >
                Campus life
              </p>

              <p
                className="
                  mt-2
                  font-heading
                  text-2xl
                  sm:text-4xl
                "
              >
                The everyday moments become part of the education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BEYOND THE CLASSROOM
      ========================================================= */}

      <section className="border-y border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-10
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
            lg:px-14
          "
        >
          <div
            className="
              aspect-[4/3]
              overflow-hidden
              rounded-2xl
              sm:rounded-3xl
            "
          >
            <img
              src={images[1 % images.length]}
              alt="Students at KCMSC"
              className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                hover:scale-[1.02]
              "
            />
          </div>

          <div className="max-w-xl lg:pl-8">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              Beyond the classroom
            </p>

            <h2
              className="
                mt-3
                font-heading
                text-3xl
                leading-tight
                text-ink
                sm:text-4xl
              "
            >
              Learning happens when students get to do things.
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-ink-muted
                sm:text-base
              "
            >
              Science, technology, sports, culture, clubs, competitions, and
              practical projects give students places to turn curiosity into
              experience.
            </p>

            <Link
              href={`/${locale}/student-life`}
              className="
                mt-6
                inline-flex
                text-sm
                font-semibold
                text-primary
                hover:underline
              "
            >
              See student life →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          HORIZONTAL IMAGE STORY
      ========================================================= */}

      <section className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-10
            sm:px-10
            sm:py-14
            lg:px-14
          "
        >
          <div
            className="
              flex
              items-end
              justify-between
              gap-6
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-brass
                "
              >
                Keep scrolling
              </p>

              <h2
                className="
                  mt-2
                  font-heading
                  text-3xl
                  text-ink
                "
              >
                A moving picture of school life.
              </h2>
            </div>

            <span
              className="
                hidden
                text-xs
                text-ink-muted
                sm:block
              "
            >
              Drag sideways →
            </span>
          </div>

          <div
            className="
              mt-8
              flex
              snap-x
              snap-mandatory
              gap-4
              overflow-x-auto
              pb-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {images.map((src, index) => (
              <div
                key={`story-${src}`}
                className="
                  relative
                  aspect-[16/10]
                  w-[82vw]
                  shrink-0
                  snap-start
                  overflow-hidden
                  rounded-2xl
                  sm:w-[52vw]
                  lg:w-[38vw]
                "
              >
                <img
                  src={src}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-[1.025]
                  "
                />

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-black/70
                    to-transparent
                    p-5
                    pt-20
                    text-white
                  "
                >
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/60
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-1 font-heading text-xl">
                    {captions[index % captions.length]!.kicker}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          DISCOVER KCMSC
      ========================================================= */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-10
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:px-14
          "
        >
          <div className="max-w-xl">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              Discover KCMSC
            </p>

            <h2
              className="
                mt-3
                font-heading
                text-3xl
                leading-tight
                text-ink
                sm:text-4xl
              "
            >
              Knowledge, discipline, morality. Then everything students make of
              it.
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-ink-muted
                sm:text-base
              "
            >
              The campus is more than a collection of buildings. It is where
              classrooms, laboratories, activities, friendships, competition,
              and curiosity come together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((src, index) => (
              <div
                key={`mosaic-${src}`}
                className={`
                  overflow-hidden
                  rounded-xl
                  ${index === 0 ? "col-span-2 aspect-[2/1]" : "aspect-[4/3]"}
                `}
              >
                <img
                  src={src}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-[1.03]
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          ANIMATED STUDENT GROWTH GRAPH
      ========================================================= */}

      <section ref={graphRef} className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:px-14
          "
        >
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[0.72fr_1.28fr]
              lg:items-center
            "
          >
            {/* Graph introduction */}

            <div className="max-w-md">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-brass
                "
              >
                Our growth
              </p>

              <h2
                className="
                  mt-3
                  font-heading
                  text-3xl
                  leading-tight
                  text-ink
                  sm:text-5xl
                "
              >
                Growing with every generation.
              </h2>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-sm
                  leading-7
                  text-ink-muted
                  sm:text-base
                "
              >
                From more than 2,200 students in 2015 to 2,336 students in 2025,
                KC Model School and College continues to grow while keeping its
                focus on learning and character.
              </p>

              <div className="mt-8 flex items-end gap-8">
                <div>
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-ink-muted
                    "
                  >
                    2015
                  </p>

                  <p
                    className="
                      mt-1
                      font-heading
                      text-3xl
                      text-ink
                      sm:text-4xl
                    "
                  >
                    2,200+
                  </p>

                  <p className="mt-1 text-xs text-ink-muted">Students</p>
                </div>

                <div className="h-12 w-px bg-border" />

                <div>
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-ink-muted
                    "
                  >
                    2025
                  </p>

                  <p
                    className="
                      mt-1
                      font-heading
                      text-3xl
                      text-primary
                      sm:text-4xl
                    "
                  >
                    2,336
                  </p>

                  <p className="mt-1 text-xs text-ink-muted">Students</p>
                </div>
              </div>
            </div>

            {/* Graph */}

            <div className="relative min-w-0">
              <div
                className="
                  relative
                  h-[300px]
                  w-full
                  overflow-hidden
                  sm:h-[360px]
                "
              >
                {/* Horizontal grid */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-between
                    py-5
                  "
                >
                  <div className="h-px w-full bg-border/70" />
                  <div className="h-px w-full bg-border/50" />
                  <div className="h-px w-full bg-border/50" />
                  <div className="h-px w-full bg-border/70" />
                </div>

                {/* Y axis */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-5
                    left-0
                    top-2
                    flex
                    flex-col
                    justify-between
                    text-[10px]
                    text-ink-muted
                  "
                >
                  <span>2,400</span>
                  <span>2,300</span>
                  <span>2,200</span>
                  <span>2,100</span>
                </div>

                {/* Graph SVG */}

                <svg
                  viewBox="0 0 800 360"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    overflow-visible
                    pl-8
                  "
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Student population growth from more than 2200 students in 2015 to 2336 students in 2025"
                >
                  {/* Area */}

                  <path
                    d="
                      M 60 260
                      L 740 205
                      L 740 320
                      L 60 320
                      Z
                    "
                    fill="currentColor"
                    className={`
                      text-primary/5
                      transition-opacity
                      duration-1000
                      ${graphVisible ? "opacity-100" : "opacity-0"}
                    `}
                  />

                  {/* Main line */}

                  <path
                    d="M 60 260 L 740 205"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="
                      text-primary
                      transition-all
                      duration-[1800ms]
                      ease-out
                    "
                    style={{
                      strokeDasharray: 700,
                      strokeDashoffset: graphVisible ? 0 : 700,
                    }}
                  />

                  {/* Start point */}

                  <circle
                    cx="60"
                    cy="260"
                    r="7"
                    fill="currentColor"
                    className="
                      text-primary
                      transition-all
                      duration-500
                    "
                    style={{
                      opacity: graphVisible ? 1 : 0,
                      transform: graphVisible ? "scale(1)" : "scale(0)",
                      transformOrigin: "60px 260px",
                    }}
                  />

                  {/* End point */}

                  <circle
                    cx="740"
                    cy="205"
                    r="9"
                    fill="currentColor"
                    className="
                      text-primary
                      transition-all
                      duration-500
                    "
                    style={{
                      opacity: graphVisible ? 1 : 0,
                      transform: graphVisible ? "scale(1)" : "scale(0)",
                      transformOrigin: "740px 205px",
                      transitionDelay: "1500ms",
                    }}
                  />

                  {/* End pulse */}

                  <circle
                    cx="740"
                    cy="205"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/30"
                    style={{
                      opacity: graphVisible ? 1 : 0,
                      transitionDelay: "1800ms",
                    }}
                  />
                </svg>

                {/* Start label */}

                <div
                  className="
                    absolute
                    bottom-[47px]
                    left-[8%]
                    -translate-x-1/2
                  "
                >
                  <div
                    className="
                      rounded-full
                      border
                      border-border
                      bg-background
                      px-3
                      py-1.5
                      text-xs
                      text-ink
                    "
                  >
                    2,200+
                  </div>
                </div>

                {/* End label */}

                <div
                  className="
                    absolute
                    right-[4%]
                    top-[43%]
                  "
                >
                  <div
                    className="
                      rounded-xl
                      bg-primary
                      px-4
                      py-3
                      text-white
                      shadow-sm
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-white/60
                      "
                    >
                      2025
                    </p>

                    <p className="mt-0.5 font-heading text-2xl">2,336</p>

                    <p className="text-[10px] text-white/70">students</p>
                  </div>
                </div>

                {/* X axis */}

                <div
                  className="
                    absolute
                    inset-x-[8%]
                    bottom-0
                    flex
                    justify-between
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-ink-muted
                  "
                >
                  <span>2015</span>
                  <span>2025</span>
                </div>
              </div>

              {/* Graph footer */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-border
                  pt-4
                "
              >
                <p className="text-xs text-ink-muted">Student population</p>

                <p className="text-xs font-medium text-primary">
                  10-year growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ACHIEVEMENTS
      ========================================================= */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-10
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:px-14
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              Recognition
            </p>

            <h2
              className="
                mt-3
                max-w-lg
                font-heading
                text-3xl
                leading-tight
                text-ink
                sm:text-4xl
              "
            >
              What students carry beyond the campus.
            </h2>
          </div>

          <div className="divide-y divide-border">
            <div className="flex items-center gap-5 py-4">
              <span
                className="
                  text-[10px]
                  font-semibold
                  text-brass
                "
              >
                01
              </span>

              <span className="text-sm text-ink">
                National ICT Olympiad Award Winner
              </span>
            </div>

            <div className="flex items-center gap-5 py-4">
              <span
                className="
                  text-[10px]
                  font-semibold
                  text-brass
                "
              >
                02
              </span>

              <span className="text-sm text-ink">
                National IQ Olympiad Winner
              </span>
            </div>

            <div className="flex items-center gap-5 py-4">
              <span
                className="
                  text-[10px]
                  font-semibold
                  text-brass
                "
              >
                03
              </span>

              <span className="text-sm text-ink">
                PBGS Government Grant Recipient
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CAMPUS & FACILITIES
      ========================================================= */}

      <section className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-10
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:px-14
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              The campus
            </p>

            <h2
              className="
                mt-3
                max-w-lg
                font-heading
                text-3xl
                leading-tight
                text-ink
                sm:text-4xl
              "
            >
              Spaces for study, practice, curiosity, and community.
            </h2>

            <Link
              href={`/${locale}/campus`}
              className="
                mt-5
                inline-flex
                text-xs
                font-semibold
                text-primary
                hover:underline
              "
            >
              Explore facilities →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-0">
            <div
              className="
                border-t
                border-border
                py-4
                text-xs
                leading-5
                text-ink-muted
              "
            >
              Air-conditioned computer lab
              <br />
              50+ PCs · high-speed internet
            </div>

            <div
              className="
                border-t
                border-border
                py-4
                text-xs
                leading-5
                text-ink-muted
              "
            >
              Library
              <br />
              10,000+ books and digital resources
            </div>

            <div
              className="
                border-t
                border-border
                py-4
                text-xs
                leading-5
                text-ink-muted
              "
            >
              Rooftop garden
              <br />
              Botany projects
            </div>

            <div
              className="
                border-t
                border-border
                py-4
                text-xs
                leading-5
                text-ink-muted
              "
            >
              Science labs
              <br />
              Physics, Chemistry, Biology & Mathematics
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ADMISSIONS CTA
      ========================================================= */}

      <section className="border-b border-border bg-primary-dark text-white">
        <div
          className="
            mx-auto
            flex
            max-w-content
            flex-col
            gap-8
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-brass
              "
            >
              Admissions
            </p>

            <h2
              className="
                mt-3
                font-heading
                text-4xl
                leading-tight
                sm:text-5xl
              "
            >
              Ready to begin the journey?
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-white/70
              "
            >
              Explore the admission process, available classes, and the next
              steps for joining KCMSC.
            </p>
          </div>

          <Link
            href={`/${locale}/admissions`}
            className="
              inline-flex
              w-fit
              rounded-full
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-primary-dark
              transition
              hover:bg-background
            "
          >
            Explore admissions
          </Link>
        </div>
      </section>
    </div>
  );
}
