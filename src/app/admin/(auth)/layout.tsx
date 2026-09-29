export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center font-heading text-lg text-primary-dark">
          KCMSC Admin
        </p>
        {children}
      </div>
    </div>
  );
}
