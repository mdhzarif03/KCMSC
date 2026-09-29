export function PageHeader({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-content px-6 py-16">
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{heading}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-ink-muted">{intro}</p> : null}
      </div>
    </section>
  );
}
