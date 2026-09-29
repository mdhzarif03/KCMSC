import Link from "next/link";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const activities = [
  {
    number: "01",
    title: "Performing Arts",
    description:
      "Dance, music, poetry recitation, acting, and performances that give students a stage for expression.",
    image: "/photos/student-life/performing-arts.jpg",
    // IMAGE TO ADD:
    // File: public/photos/student-life/performing-arts.jpg
    // Show: Students performing dance, music, drama, or poetry on a school stage.
    // Alt: "Students performing on stage during a school cultural programme",
  },
  {
    number: "02",
    title: "Speech & Expression",
    description:
      "Extempore and prepared speeches, debates, presentations, and activities that develop confidence in communication.",
    image: "/photos/student-life/speech-debate.jpg",
    // IMAGE TO ADD:
    // File: public/photos/student-life/speech-debate.jpg
    // Show: A student giving a speech, debate, or presentation.
    // Alt: "Student delivering a speech during a school programme",
  },
  {
    number: "03",
    title: "Cultural Traditions",
    description:
      "Traditional celebrations, music, dance, and cultural activities that connect students with Bangladeshi heritage.",
    image: "/photos/student-life/cultural-traditions.jpg",
    // IMAGE TO ADD:
    // File: public/photos/student-life/cultural-traditions.jpg
    // Show: Students participating in a Bengali cultural celebration.
    // Alt: "Students participating in a traditional Bengali cultural celebration",
  },
  {
    number: "04",
    title: "Visual Arts",
    description:
      "Drawing, painting, creative projects, and seasonal or historical themes explored through visual expression.",
    image: "/photos/student-life/visual-arts.jpg",
    // IMAGE TO ADD:
    // File: public/photos/student-life/visual-arts.jpg
    // Show: Students drawing, painting, or displaying artwork.
    // Alt: "Students creating artwork during a school art activity",
  },
  {
    number: "05",
    title: "Practical Skills",
    description:
      "Craft making, paper work, cooking, and hands-on activities where students learn by making things themselves.",
    image: "/photos/student-life/practical-skills.jpg",
    // IMAGE TO ADD:
    // File: public/photos/student-life/practical-skills.jpg
    // Show: Students doing crafts or practical cooking activities.
    // Alt: "Students participating in a hands-on practical skills activity",
  },
];

const culturalSections = [
  {
    eyebrow: "01 / NATIONAL LEGACY",
    title: "Celebrating where we come from.",
    text: "International Mother Language Day, Independence Day, Victory Day, Pahela Baishakh, and other occasions become opportunities for students to experience culture through music, dance, drama, and poetry.",
    image: "/photos/student-life/cultural-traditions.jpg",
    // IMAGE:
    // File: public/photos/student-life/cultural-traditions.jpg
    // Show: School cultural programme or national celebration.
    // Alt: "Students celebrating a national or cultural occasion at KCMSC",
  },
  {
    eyebrow: "02 / LITERARY LIFE",
    title: "Words become performances.",
    text: "Rabindra-Nazrul Jayanti celebrations, recitation competitions, musical performances, and literary activities bring language and literature beyond the textbook.",
    image: "/photos/student-life/literary-activities.jpg",
    // IMAGE:
    // File: public/photos/student-life/literary-activities.jpg
    // Show: Recitation, literary event, music or poetry programme.
    // Alt: "Students taking part in a literary and cultural programme",
  },
  {
    eyebrow: "03 / HERITAGE",
    title: "Culture is something you experience.",
    text: "Cultural fairs, Pitha Utsab, traditional games, handicrafts, food, music, and folk activities allow students to experience Bengali heritage directly.",
    image: "/photos/student-life/heritage-immersion.jpg",
    // IMAGE:
    // File: public/photos/student-life/heritage-immersion.jpg
    // Show: Pitha festival, cultural fair, traditional games, handicrafts, etc.
    // Alt: "Students experiencing traditional Bengali food and cultural activities",
  },
];

export default async function StudentLifePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="overflow-hidden bg-background text-ink">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[78svh] overflow-hidden bg-ink text-white">
        {/* IMAGE:
            File: public/photos/student-life/student-life-hero.jpg

            Show:
            A strong wide photograph of students participating in
            school life. Ideally a real KCMSC photo with people,
            movement, colour and depth.

            Alt:
            "Students participating in school activities at KCMSC"
        */}
        <img
          src="/photos/student-life/student-life-hero.jpg"
          alt="Students participating in school activities at KCMSC"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-[1500px] flex-col justify-end px-6 pb-10 pt-32 sm:px-10 sm:pb-14 lg:px-14">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65">
              Student Life
            </p>

            <h1 className="mt-5 max-w-4xl font-heading text-5xl leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-[7.5rem]">
              More than
              <br />
              the classroom.
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              School life at KCMSC extends into culture, creativity,
              communication, practical skills, sport, community activities, and
              the everyday experiences that help students grow.
            </p>
          </div>

          <div className="mt-12 flex items-end justify-between gap-6">
            <Link
              href={`/${locale}/about`}
              className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-primary-dark transition hover:bg-white/90"
            >
              Discover KCMSC
            </Link>

            <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/55 sm:block">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO / LARGE IMAGE
      ===================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Life at KCMSC
              </p>

              <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                The moments between lessons matter too.
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">
              Co-curricular activities are directed by the school's Cultural
              Department and integrated into the academic framework across both
              wings. Students learn to perform, communicate, create,
              collaborate, compete, and participate.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem]">
            {/* IMAGE:
                File: public/photos/student-life/campus-life.jpg

                Show:
                A wide photograph showing students together on campus,
                during an event, sports activity, assembly, or similar.

                Alt:
                "Students taking part in school life and activities at KCMSC"
            */}
            <img
              src="/photos/student-life/campus-life.jpg"
              alt="Students taking part in school life and activities at KCMSC"
              className="h-[50vh] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[65vh]"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MOVING PHOTO STRIP
      ===================================================== */}

      <section className="overflow-hidden border-y border-border bg-surface py-5">
        <div className="student-life-marquee flex w-max gap-4">
          {[...activities, ...activities].map((activity, index) => (
            <div
              key={`${activity.title}-${index}`}
              className="relative h-48 w-72 shrink-0 overflow-hidden rounded-2xl sm:h-60 sm:w-96"
            >
              {/* IMAGE:
                  Uses the activity-specific image declared above.
              */}
              <img
                src={activity.image}
                alt={activity.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 text-white">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                  {activity.number}
                </span>

                <p className="mt-1 font-heading text-xl">{activity.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CO-CURRICULAR ACTIVITIES
      ===================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Co-curricular
              </p>

              <h2 className="mt-4 max-w-md font-heading text-4xl leading-[1.03] tracking-[-0.03em] sm:text-5xl">
                Find a way
                <br />
                to express yourself.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-ink-muted">
                Different students discover confidence in different places.
                KCMSC's activities create room for performance, creativity,
                communication, culture, and practical work.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {activities.map((activity, index) => (
                <article
                  key={activity.title}
                  className={`group overflow-hidden rounded-[1.5rem] border border-border bg-surface ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 ? "aspect-[2/1]" : "aspect-[4/3]"
                    }`}
                  >
                    {/* IMAGE:
                        See the exact image instructions in the
                        activities array above.
                    */}
                    <img
                      src={activity.image}
                      alt={
                        index === 0
                          ? "Students performing during a school cultural programme"
                          : activity.title
                      }
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />

                    <span className="absolute left-5 top-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {activity.number}
                    </span>

                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="font-heading text-2xl sm:text-3xl">
                        {activity.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-6 text-ink-muted">
                      {activity.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CULTURAL EDUCATION
      ===================================================== */}

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              Cultural education
            </p>

            <h2 className="mt-4 font-heading text-4xl leading-[1.03] tracking-[-0.03em] sm:text-6xl">
              Culture isn't
              <br />
              an afterthought.
            </h2>
          </div>

          <div className="mt-16 space-y-24">
            {culturalSections.map((section, index) => (
              <article
                key={section.title}
                className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[1.75rem]">
                  {/* IMAGE:
                      Exact image path is defined in culturalSections above.
                  */}
                  <img
                    src={section.image}
                    alt={
                      section.title === "Celebrating where we come from."
                        ? "Students celebrating a national or cultural occasion at KCMSC"
                        : section.title === "Words become performances."
                          ? "Students taking part in a literary and cultural programme"
                          : "Students experiencing traditional Bengali food and cultural activities"
                    }
                    className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.025]"
                  />
                </div>

                <div className="max-w-xl lg:px-8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-brass">
                    {section.eyebrow}
                  </p>

                  <h3 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">
                    {section.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-ink-muted sm:text-base">
                    {section.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BEYOND THE CLASSROOM
      ===================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Beyond the classroom
              </p>

              <h2 className="mt-4 max-w-md font-heading text-4xl leading-[1.03] sm:text-5xl">
                Learn by doing.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-ink-muted">
                Some of the most memorable learning happens outside a
                conventional lesson. Students participate in activities that
                connect school with everyday life.
              </p>
            </div>

            <div className="space-y-5">
              {/* TAEKWONDO */}

              <article className="grid overflow-hidden rounded-[1.5rem] border border-border bg-surface sm:grid-cols-[0.8fr_1.2fr]">
                <div className="aspect-[4/3] sm:aspect-auto">
                  {/* IMAGE:
                      File: public/photos/student-life/taekwondo.jpg

                      Show:
                      Students doing Taekwondo training at school.

                      Alt:
                      "Students receiving Taekwondo training at KCMSC"
                  */}
                  <img
                    src="/photos/student-life/taekwondo.jpg"
                    alt="Students receiving Taekwondo training at KCMSC"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-brass">
                    Physical activity
                  </p>

                  <h3 className="mt-3 font-heading text-2xl">Taekwondo</h3>

                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    Taekwondo training gives interested students an opportunity
                    to develop discipline, coordination, confidence, and
                    physical skills.
                  </p>
                </div>
              </article>

              {/* SAFE ROADS */}

              <article className="grid overflow-hidden rounded-[1.5rem] border border-border bg-surface sm:grid-cols-[1.2fr_0.8fr]">
                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-brass">
                    Community
                  </p>

                  <h3 className="mt-3 font-heading text-2xl">
                    Safe Roads Movement
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    Students participate in road-safety initiatives, connecting
                    classroom awareness with responsible behaviour in the wider
                    community.
                  </p>
                </div>

                <div className="aspect-[4/3] sm:aspect-auto">
                  {/* IMAGE:
                      File: public/photos/student-life/safe-roads.jpg

                      Show:
                      Students participating in a road-safety campaign,
                      awareness programme, poster activity, etc.

                      Alt:
                      "Students participating in a road safety awareness programme"
                  */}
                  <img
                    src="/photos/student-life/safe-roads.jpg"
                    alt="Students participating in a road safety awareness programme"
                    className="h-full w-full object-cover"
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ROOFTOP GARDEN
      ===================================================== */}

      <section className="bg-primary-dark text-white">
        <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              Hands-on learning
            </p>

            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1.03] sm:text-6xl">
              A garden above
              <br />
              the classroom.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              KCMSC has created gardens on the rooftops of its ten-storied
              buildings, growing fruit-bearing trees, vegetables, native and
              foreign flowering plants.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Students plant and care for the trees themselves, gaining
              practical knowledge while learning about the balance of oxygen and
              carbon dioxide in their local environment.
            </p>
          </div>

          <div className="min-h-[420px]">
            {/* IMAGE:
                File: public/photos/student-life/rooftop-garden.jpg

                Show:
                KCMSC rooftop garden, plants, students caring for plants,
                gardening activity, or rooftop greenery.

                Alt:
                "Students caring for plants in the KCMSC rooftop garden"
            */}
            <img
              src="/photos/student-life/rooftop-garden.jpg"
              alt="Students caring for plants in the KCMSC rooftop garden"
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL COLLAGE
      ===================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Everyday KCMSC
              </p>

              <h2 className="mt-4 font-heading text-4xl tracking-[-0.03em] sm:text-5xl">
                School is lived,
                <br />
                not just attended.
              </h2>
            </div>

            <span className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">
              Student life / KCMSC
            </span>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-12">
            <div className="overflow-hidden rounded-2xl sm:col-span-7">
              {/* IMAGE:
                  File: public/photos/student-life/student-collaboration.jpg

                  Show:
                  Students collaborating, studying together, working on
                  projects, reading, or participating in an activity.

                  Alt:
                  "KCMSC students collaborating during a school activity"
              */}
              <img
                src="/photos/student-life/student-collaboration.jpg"
                alt="KCMSC students collaborating during a school activity"
                className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.025]"
              />
            </div>

            <div className="grid gap-4 sm:col-span-5">
              <div className="rounded-2xl bg-surface p-7 sm:p-9">
                <p className="text-[9px] uppercase tracking-[0.2em] text-brass">
                  Character
                </p>

                <p className="mt-4 font-heading text-2xl leading-tight sm:text-3xl">
                  Confidence grows when students get to participate.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl">
                {/* IMAGE:
                    Reuse an appropriate existing student-life image.
                    Here we use performing-arts.

                    Alt:
                    "Students participating in a KCMSC cultural activity"
                */}
                <img
                  src="/photos/student-life/performing-arts.jpg"
                  alt="Students participating in a KCMSC cultural activity"
                  className="aspect-[16/10] h-full w-full object-cover transition duration-700 hover:scale-[1.025]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="border-t border-white/10 bg-primary-dark text-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:px-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brass">
              KCMSC
            </p>

            <h2 className="mt-3 max-w-2xl font-heading text-4xl leading-tight sm:text-5xl">
              There is always more happening here.
            </h2>
          </div>

          <Link
            href={`/${locale}/admissions`}
            className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-xs font-semibold text-primary-dark transition hover:bg-background"
          >
            Explore admissions
          </Link>
        </div>
      </section>
    </main>
  );
}
