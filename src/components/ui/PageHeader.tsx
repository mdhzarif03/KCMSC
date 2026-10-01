export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <section className="border-b border-[#d7d1c4] bg-[#ece7dc]">
      <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="h-px w-12 bg-[#b69b54]" aria-hidden="true" />
        <h1 className="mt-6 max-w-4xl font-heading text-[clamp(3rem,6vw,6rem)] leading-[.94] tracking-[-.045em] text-[#183d2e]">
          {heading}
        </h1>
        {intro ? <p className="mt-6 max-w-2xl text-sm leading-7 text-[#69716a] sm:text-base">{intro}</p> : null}
      </div>
    </section>
  );
}
