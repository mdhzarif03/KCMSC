"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

/*
|--------------------------------------------------------------------------
| IMAGES
|--------------------------------------------------------------------------
|
| Physical files:
| F:\KCMSC\public\assets\pictures\landing-page\
|
| Browser paths:
| /assets/pictures/landing-page/1.jpg
|
*/

const FALLBACK_IMAGES = [
  "/assets/pictures/landing-page/1.jpg",
  "/assets/pictures/landing-page/2.jpg",
];

const LOCAL_CANDIDATES = Array.from(
  { length: 12 },
  (_, i) => `/assets/pictures/landing-page/${i + 1}.jpg`,
);

/*
|--------------------------------------------------------------------------
| HERO CAPTIONS
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

export function LandingExperience({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [localImages, setLocalImages] = useState<string[]>([]);

  const railRef = useRef<HTMLDivElement>(null);

  /*
  |--------------------------------------------------------------------------
  | FIND AVAILABLE IMAGES
  |--------------------------------------------------------------------------
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
      if (cancelled) return;

      setLocalImages(results.filter((src): src is string => Boolean(src)));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | IMAGE LIST
  |--------------------------------------------------------------------------
  */

  const images = useMemo(() => {
    if (localImages.length > 0) {
      return localImages;
    }

    return FALLBACK_IMAGES;
  }, [localImages]);

  /*
  |--------------------------------------------------------------------------
  | KEEP ACTIVE INDEX VALID
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (active >= images.length) {
      setActive(0);
    }
  }, [active, images.length]);

  /*
  |--------------------------------------------------------------------------
  | AUTOMATIC HERO SLIDESHOW
  |--------------------------------------------------------------------------
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
  |--------------------------------------------------------------------------
  | IMPORTANT:
  | ONLY SCROLL THE THUMBNAIL RAIL.
  |
  | DO NOT USE:
  | item.scrollIntoView()
  |
  | That can scroll the ENTIRE PAGE vertically.
  |--------------------------------------------------------------------------
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
  |--------------------------------------------------------------------------
  | CURRENT CAPTION
  |--------------------------------------------------------------------------
  */

  const caption = captions[active % captions.length] ?? captions[0];

  return (
    <div className="kcmsc-landing bg-background">
      {/* =========================================================
          HERO
      ========================================================== */}

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
        {/* -------------------------------------------------------
            TOP GRADIENT FOR TRANSPARENT NAVBAR
        -------------------------------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-44
            bg-gradient-to-b
            from-black/55
            via-black/20
            to-transparent
          "
        />

        {/* -------------------------------------------------------
            HERO IMAGES
        -------------------------------------------------------- */}

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

          {/* Left-side readability */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-black/65
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
              h-72
              bg-gradient-to-t
              from-black/60
              via-black/20
              to-transparent
            "
          />
        </div>

        {/* -------------------------------------------------------
            HERO CONTENT
        -------------------------------------------------------- */}

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
            {/* =================================================
                HERO TEXT
            ================================================== */}

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

              {/* HERO CTAs */}

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

            {/* =================================================
                SLIDE COUNTER
            ================================================== */}

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

          {/* =====================================================
              THUMBNAIL RAIL
          ====================================================== */}

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

      {/* =========================================================
          THE STORY
      ========================================================== */}

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

      {/* =========================================================
          CAMPUS LIFE
      ========================================================== */}

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
                from-black/60
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

      {/* =========================================================
          BEYOND THE CLASSROOM
      ========================================================== */}

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

      {/* =========================================================
          HORIZONTAL STORY GALLERY
      ========================================================== */}

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
                    {captions[index % captions.length]?.kicker}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DISCOVER KCMSC
      ========================================================== */}

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

      {/* =========================================================
          ADMISSIONS CTA
      ========================================================== */}

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
