
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-soft-green/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brass/10 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-2xl font-semibold text-primary-dark">KCMSC</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-ink-muted">Administration</p>
        </div>
        {children}
      </div>
    </div>
  );
}
