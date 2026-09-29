"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ============================================================
   DATA
============================================================ */

const mediumData = [
  {
    label: "Bangla",
    value: 53,
    students: "1,240",
  },
  {
    label: "English",
    value: 47,
    students: "1,096",
  },
];

const classData = [
  {
    age: "3.5–4.5",
    className: "Playgroup",
  },
  {
    age: "4.5–5.5",
    className: "Nursery / KG",
  },
  {
    age: "5.5–6.5",
    className: "Class 1",
  },
  {
    age: "6.5–7.5",
    className: "Class 2",
  },
  {
    age: "7.5–8.5",
    className: "Class 3",
  },
  {
    age: "8.5–9.5",
    className: "Class 4",
  },
  {
    age: "9.5–10.5",
    className: "Class 5",
  },
];

const wingData = [
  {
    number: "01",
    title: "Junior Wing",
    eyebrow: "FOUNDATION",
    description:
      "The Junior Wing covers Pre-Primary and Primary education, providing the foundation for students' academic journey.",
    sections:
      "Pre-Primary (English Version) and Primary (Bangla & English Versions)",
    administration: "1 Vice Principal · 1 Coordinator · 2 Acting Coordinators",
    staff: "76 teachers",
  },
  {
    number: "02",
    title: "Senior Wing",
    eyebrow: "PROGRESSION",
    description:
      "The Senior Wing carries students through Secondary and Higher Secondary education.",
    sections:
      "Secondary (Bangla & English Versions) and Higher Secondary (Bangla & English Versions)",
    administration: "1 Vice Principal · 2 Coordinators · 2 Acting Coordinators",
    staff: "22 Lecturers · 20 Senior Teachers · 22 Assistant Teachers",
  },
];

const resultData = [
  {
    exam: "SSC",
    year: "2024",
    appeared: 130,
    passed: 128,
    rate: 98.48,
    gpa: 67,
  },
  {
    exam: "HSC",
    year: "2024",
    appeared: 47,
    passed: 47,
    rate: 100,
    gpa: 13,
  },
];

/* ============================================================
   INTERSECTION OBSERVER HOOK
============================================================ */

function useReveal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-academic-reveal]");

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return visible;
}

/* ============================================================
   DONUT CHART
============================================================ */

function MediumDonut() {
  return (
    <div className="relative mx-auto aspect-square w-[240px] sm:w-[280px]">
      <div
        className="
          absolute
          inset-0
          rounded-full
          transition-transform
          duration-[1400ms]
          ease-out
          hover:scale-[1.025]
        "
        style={{
          background:
            "conic-gradient(#0d6246 0deg 190.8deg, #c6a15b 190.8deg 360deg)",
        }}
      />

      <div className="absolute inset-[16px] rounded-full bg-background" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
          2025
        </span>

        <span className="mt-2 font-heading text-5xl tracking-[-0.04em] text-ink">
          2,336
        </span>

        <span className="mt-1 text-xs text-ink-muted">students</span>
      </div>
    </div>
  );
}

/* ============================================================
   RESULT RING
============================================================ */

function ResultRing({ rate }: { rate: number }) {
  const degrees = Math.min(rate, 100) * 3.6;

  return (
    <div className="relative h-32 w-32 shrink-0">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#0d6246 0deg ${degrees}deg, #e8e4d9 ${degrees}deg 360deg)`,
        }}
      />

      <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-background">
        <span className="font-heading text-2xl text-ink">{rate}%</span>

        <span className="mt-1 text-[9px] uppercase tracking-[0.15em] text-ink-muted">
          pass rate
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function AcademicsPage() {
  useReveal();

  return (
    <main className="overflow-hidden bg-background text-ink">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative border-b border-border bg-background">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            pb-20
            pt-28
            sm:px-10
            sm:pb-28
            sm:pt-36
            lg:px-14
            lg:pt-40
          "
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div
              data-academic-reveal
              className="
                academic-reveal
                max-w-4xl
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brass">
                Academics
              </p>

              <h1
                className="
                  mt-5
                  max-w-4xl
                  font-heading
                  text-5xl
                  leading-[0.94]
                  tracking-[-0.035em]
                  text-ink
                  sm:text-7xl
                  lg:text-[7.5rem]
                "
              >
                Learning with
                <br />
                direction.
              </h1>
            </div>

            <div
              data-academic-reveal
              className="
                academic-reveal
                max-w-xl
                lg:pb-2
              "
            >
              <p className="text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
                KCMSC follows a dual-wing structure under unified leadership,
                bringing together foundational learning, secondary education,
                and higher secondary education.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-ink-muted">
                  Junior Wing
                </span>

                <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-ink-muted">
                  Senior Wing
                </span>

                <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-ink-muted">
                  Bangla & English
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          QUICK OVERVIEW
      ====================================================== */}

      <section className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            grid-cols-2
            lg:grid-cols-4
          "
        >
          {[
            ["2,336", "Students", "2025"],
            ["53%", "Bangla medium", "1,240 students"],
            ["47%", "English medium", "1,096 students"],
            ["2", "Academic wings", "Junior + Senior"],
          ].map(([value, label, detail]) => (
            <div
              key={label}
              className="
                border-r
                border-border
                px-6
                py-8
                last:border-r-0
                sm:px-10
                sm:py-10
                lg:px-12
              "
            >
              <p className="font-heading text-3xl tracking-[-0.025em] text-ink sm:text-4xl">
                {value}
              </p>

              <p className="mt-2 text-xs font-semibold text-ink">{label}</p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
          MEDIUM OF INSTRUCTION
      ====================================================== */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-16
            px-6
            py-20
            sm:px-10
            sm:py-28
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:px-14
          "
        >
          {/* LEFT */}

          <div data-academic-reveal className="academic-reveal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              Medium of instruction
            </p>

            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl">
              Two languages.
              <br />
              One academic community.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-ink-muted sm:text-base">
              In 2025, the student population was distributed across Bangla and
              English versions of the curriculum.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {mediumData.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === 0 ? "bg-primary" : "bg-brass"
                      }`}
                    />

                    <span className="text-xs font-semibold text-ink">
                      {item.label}
                    </span>
                  </div>

                  <p className="mt-4 font-heading text-3xl text-ink">
                    {item.value}%
                  </p>

                  <p className="mt-1 text-xs text-ink-muted">
                    {item.students} students
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div
            data-academic-reveal
            className="
              academic-reveal
              relative
              rounded-[2rem]
              border
              border-border
              bg-surface
              p-8
              sm:p-12
            "
          >
            <div className="absolute right-8 top-8 text-[9px] uppercase tracking-[0.2em] text-ink-muted">
              2025
            </div>

            <MediumDonut />

            <div className="mx-auto mt-8 max-w-sm space-y-3">
              {mediumData.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-t border-border pt-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index === 0 ? "bg-primary" : "bg-brass"
                      }`}
                    />

                    <span className="text-xs text-ink-muted">
                      {item.label} Version
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-ink">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          WINGS
      ====================================================== */}

      <section className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-20
            sm:px-10
            sm:py-28
            lg:px-14
          "
        >
          <div data-academic-reveal className="academic-reveal mb-12 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              Academic structure
            </p>

            <h2 className="mt-4 font-heading text-4xl tracking-[-0.025em] text-ink sm:text-5xl">
              One institution.
              <br />
              Two stages of growth.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {wingData.map((wing) => (
              <article
                key={wing.title}
                data-academic-reveal
                className="
                  academic-reveal
                  group
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-border
                  bg-background
                  p-7
                  transition
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_20px_60px_rgba(15,45,35,0.07)]
                  sm:p-10
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brass">
                      {wing.eyebrow}
                    </p>

                    <h3 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">
                      {wing.title}
                    </h3>
                  </div>

                  <span className="font-heading text-5xl text-border transition duration-500 group-hover:text-primary/20">
                    {wing.number}
                  </span>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-ink-muted">
                  {wing.description}
                </p>

                <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                      Sections
                    </p>

                    <p className="mt-2 text-xs leading-5 text-ink-muted">
                      {wing.sections}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                      Administration
                    </p>

                    <p className="mt-2 text-xs leading-5 text-ink-muted">
                      {wing.administration}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    Teaching staff
                  </span>

                  <span className="text-xs font-semibold text-primary">
                    {wing.staff}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          CLASS JOURNEY
      ====================================================== */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-16
            px-6
            py-20
            sm:px-10
            sm:py-28
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-start
            lg:px-14
          "
        >
          <div
            data-academic-reveal
            className="academic-reveal lg:sticky lg:top-24"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              The academic journey
            </p>

            <h2 className="mt-4 max-w-md font-heading text-4xl leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl">
              From the first classroom to the next chapter.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-ink-muted">
              Age-appropriate class placement creates a clear progression
              through the early years of schooling.
            </p>

            <div className="mt-8 rounded-2xl bg-primary p-6 text-white">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                School hours
              </p>

              <p className="mt-3 font-heading text-2xl">7:45 AM – 2:30 PM</p>

              <p className="mt-1 text-xs text-white/65">Sunday–Thursday</p>
            </div>
          </div>

          <div data-academic-reveal className="academic-reveal">
            <div className="relative">
              {/* Vertical line */}

              <div className="absolute bottom-6 left-[7px] top-6 w-px bg-border" />

              <div className="space-y-2">
                {classData.map((item, index) => (
                  <div
                    key={item.className}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-6
                      rounded-2xl
                      p-4
                      transition
                      duration-300
                      hover:bg-surface
                    "
                  >
                    <div
                      className="
                        relative
                        z-10
                        h-4
                        w-4
                        shrink-0
                        rounded-full
                        border-[3px]
                        border-background
                        bg-primary
                        ring-1
                        ring-primary/30
                        transition
                        group-hover:scale-125
                      "
                    />

                    <div className="grid flex-1 gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                      <span className="text-xs font-medium text-ink-muted">
                        {item.age} years
                      </span>

                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="font-heading text-xl text-ink sm:text-2xl">
                          {item.className}
                        </span>

                        <span className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          RESULTS
      ====================================================== */}

      <section className="border-b border-border bg-surface">
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-20
            sm:px-10
            sm:py-28
            lg:px-14
          "
        >
          <div
            data-academic-reveal
            className="academic-reveal flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Academic results
              </p>

              <h2 className="mt-4 font-heading text-4xl tracking-[-0.025em] text-ink sm:text-5xl">
                Results that tell a story.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-ink-muted">
                2024 SSC and HSC results show the number of students appearing,
                passing, and achieving GPA 5.
              </p>
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              2024
            </span>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {resultData.map((result) => (
              <article
                key={result.exam}
                data-academic-reveal
                className="
                  academic-reveal
                  rounded-[1.75rem]
                  border
                  border-border
                  bg-background
                  p-7
                  sm:p-10
                "
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-brass">
                      {result.year}
                    </p>

                    <h3 className="mt-2 font-heading text-3xl text-ink">
                      {result.exam}
                    </h3>
                  </div>

                  <ResultRing rate={result.rate} />
                </div>

                <div className="mt-8 grid grid-cols-3 border-t border-border pt-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      Appeared
                    </p>

                    <p className="mt-2 font-heading text-2xl text-ink">
                      {result.appeared}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      Passed
                    </p>

                    <p className="mt-2 font-heading text-2xl text-ink">
                      {result.passed}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      GPA 5
                    </p>

                    <p className="mt-2 font-heading text-2xl text-primary">
                      {result.gpa}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-surface px-4 py-3">
                  <span className="text-xs text-ink-muted">
                    Students achieving GPA 5
                  </span>

                  <span className="text-xs font-semibold text-primary">
                    {result.gpa}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          ACADEMIC PHILOSOPHY
      ====================================================== */}

      <section className="border-b border-border bg-background">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-12
            px-6
            py-20
            sm:px-10
            sm:py-28
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:px-14
          "
        >
          <div data-academic-reveal className="academic-reveal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              Beyond the numbers
            </p>

            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl">
              Academic structure should create room to grow.
            </h2>
          </div>

          <div
            data-academic-reveal
            className="academic-reveal grid gap-8 sm:grid-cols-2"
          >
            <div className="border-t border-border pt-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                01
              </span>

              <h3 className="mt-3 font-heading text-2xl text-ink">
                Foundation
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Early education and primary learning establish the foundation
                for students' academic progression.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                02
              </span>

              <h3 className="mt-3 font-heading text-2xl text-ink">
                Progression
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Secondary and higher secondary education continue the academic
                journey toward the next stage.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                03
              </span>

              <h3 className="mt-3 font-heading text-2xl text-ink">Choice</h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Students can study through Bangla and English versions within
                the institution's academic structure.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass">
                04
              </span>

              <h3 className="mt-3 font-heading text-2xl text-ink">Results</h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Examination outcomes provide one measurable view of student
                achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="bg-primary-dark text-white">
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            gap-8
            px-6
            py-16
            sm:px-10
            sm:py-20
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:px-14
          "
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">
              Academics
            </p>

            <h2 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">
              A clearer path through school.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              Explore admissions, student life, and the wider KCMSC experience.
            </p>
          </div>

          <Link
            href="/admissions"
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

      {/* ======================================================
          PAGE ANIMATION STYLES
      ====================================================== */}

      <style jsx global>{`
        [data-academic-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        [data-academic-reveal][data-visible="true"] {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          [data-academic-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
