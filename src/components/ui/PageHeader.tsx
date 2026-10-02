export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <section className="border-b border-[#d9d8cf] bg-[#f7f5ef]">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#b59a4a]" />
          <span className="text-[9px] uppercase tracking-[.18em] text-[#176b45]">KCMSC</span>
        </div>
        <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[.98] tracking-[-.035em] text-[#124c36]">{heading}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#69716b] sm:text-[15px]">{intro}</p> : null}
      </div>
    </section>
  );
}
