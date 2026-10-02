export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <section className="border-b border-[#d7d1c4] bg-[#ece7dc]">
      <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="h-px w-10 bg-[#b69b54]" aria-hidden="true" />
        <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.7rem,5vw,5.2rem)] leading-[.95] tracking-[-.045em] text-[#183d2e]">
          {heading}
        </h1>
        {intro ? <p className="mt-5 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">{intro}</p> : null}
      </div>
    </section>
  );
}
