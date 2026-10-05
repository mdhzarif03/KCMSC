"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl: "/admin",
      });

      if (!result || result.error) {
        if (result?.error === "TooManyAttempts") {
          setError("Too many failed attempts. Please try again later.");
        } else if (result?.error === "Configuration") {
          setError(
            "Authentication is not configured correctly. Check the server environment.",
          );
        } else {
          setError("Incorrect email or password.");
        }

        return;
      }

      router.replace(result.url || "/admin");
      router.refresh();
    } catch (err) {
      console.error("KCMSC login failed:", err);

      setError(
        "The sign-in request could not be completed. Check the development server terminal for the exact error.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e9e6dc] text-[#173d2d]">
      <div className="relative min-h-screen overflow-hidden">
        {/* =========================================================
            BACKGROUND ART
        ========================================================= */}
        <div className="pointer-events-none absolute inset-0">
          {/* Paper grain */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Large organic shape - desktop only */}
          <div className="absolute -right-[18%] -top-[30%] hidden h-[850px] w-[850px] rounded-full bg-[#173d2d] lg:block" />

          {/* Cut-out circle - desktop only */}
          <div className="absolute right-[7%] top-[11%] hidden h-[250px] w-[250px] rounded-full bg-[#e9e6dc] lg:block" />

          {/* Horizontal rule */}
          <div className="absolute left-0 right-0 top-[80px] border-t border-[#173d2d]/10 sm:top-[96px] lg:top-[108px]" />

          {/* Vertical rule - desktop only */}
          <div className="absolute bottom-0 right-[34%] top-0 hidden border-l border-[#173d2d]/10 lg:block" />

          {/* Decorative circles - desktop only */}
          <div className="absolute bottom-[10%] left-[5%] hidden h-40 w-40 rounded-full border border-[#173d2d]/10 lg:block" />

          <div className="absolute bottom-[13%] left-[8%] hidden h-24 w-24 rounded-full border border-[#173d2d]/10 lg:block" />
        </div>

        {/* =========================================================
            TOP BAR
        ========================================================= */}
        <header className="relative z-20 flex h-[80px] items-center justify-between px-5 sm:h-[96px] sm:px-8 lg:h-[108px] lg:px-16">
          {/* Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-9 w-9 items-center justify-center border border-[#173d2d]/20 sm:h-11 sm:w-11">
              <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                <div className="absolute left-0 top-0 h-3 w-3 border-2 border-[#173d2d] sm:h-3.5 sm:w-3.5 sm:border-[3px]" />

                <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#173d2d] sm:h-3.5 sm:w-3.5" />
              </div>
            </div>

            <div>
              <div className="text-[13px] font-bold tracking-[0.2em] sm:text-[15px] sm:tracking-[0.24em]">
                KCMSC
              </div>

              <div className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.2em] text-[#173d2d]/45 sm:text-[8px] sm:tracking-[0.28em]">
                Management Portal
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#173d2d]/45 sm:flex">
            <span>Admin</span>

            <span className="h-1 w-1 rounded-full bg-[#173d2d]/30" />

            <span>Secure access</span>
          </div>

          {/* Mobile status */}
          <div className="flex items-center gap-2 sm:hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3c8c5d]" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-[#173d2d]/50">
              Secure
            </span>
          </div>
        </header>

        {/* =========================================================
            MAIN
        ========================================================= */}
        <main className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:min-h-[calc(100vh-108px)] lg:grid-cols-[1fr_34%]">
          {/* =====================================================
              LEFT / HERO
          ===================================================== */}
          <section className="relative flex flex-col justify-between px-5 pb-8 pt-8 sm:px-8 sm:pb-12 sm:pt-12 lg:px-16 lg:pb-16 lg:pt-20 xl:px-24">
            <div>
              {/* Section label */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#173d2d]/50 sm:text-[9px] sm:tracking-[0.3em]">
                  01 — Administration
                </span>

                <span className="h-px w-10 bg-[#173d2d]/20 sm:w-20" />
              </div>

              {/* Hero heading */}
              <h1 className="mt-7 max-w-4xl text-[clamp(3.6rem,18vw,5.8rem)] font-black leading-[0.8] tracking-[-0.075em] sm:mt-9 sm:text-[clamp(4.5rem,10vw,8rem)] lg:mt-10 lg:text-[clamp(5rem,10vw,10.5rem)] lg:tracking-[-0.085em]">
                The
                <br />
                <span className="relative inline-block">
                  control
                  <span className="absolute -bottom-1 left-0.5 h-[4px] w-[65%] bg-[#b9d8bd] sm:h-[6px] lg:-bottom-3 lg:h-[8px]" />
                </span>
                <br />
                room.
              </h1>

              {/* About */}
              <div className="mt-8 grid max-w-xl grid-cols-[52px_1fr] gap-4 sm:mt-10 sm:grid-cols-[70px_1fr] sm:gap-5 lg:mt-12">
                <div className="pt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#173d2d]/35 sm:text-[9px] sm:tracking-[0.22em]">
                  About
                </div>

                <p className="max-w-md text-[12px] leading-6 text-[#173d2d]/60 sm:text-sm sm:leading-7 lg:text-[15px]">
                  One place to oversee the systems, content and people that keep
                  KCMSC moving. Your administrative workspace starts here.
                </p>
              </div>
            </div>

            {/* =================================================
                METADATA
            ================================================= */}
            <div className="mt-10 grid max-w-2xl grid-cols-2 border-t border-[#173d2d]/15 pt-4 sm:mt-16 sm:pt-5 lg:mt-20 lg:grid-cols-3">
              {/* Environment */}
              <div>
                <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#173d2d]/35 sm:text-[8px] sm:tracking-[0.22em]">
                  Environment
                </div>

                <div className="mt-1.5 text-[10px] font-semibold sm:mt-2 sm:text-xs">
                  Production
                </div>
              </div>

              {/* Status */}
              <div className="border-l border-[#173d2d]/15 pl-4 sm:pl-5">
                <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#173d2d]/35 sm:text-[8px] sm:tracking-[0.22em]">
                  Status
                </div>

                <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold sm:mt-2 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3c8c5d]" />
                  Operational
                </div>
              </div>

              {/* Access */}
              <div className="hidden border-l border-[#173d2d]/15 pl-5 sm:block">
                <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#173d2d]/35">
                  Access
                </div>

                <div className="mt-2 text-xs font-semibold">Restricted</div>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT / LOGIN
          ===================================================== */}
          <section className="relative flex w-full items-start px-5 pb-8 sm:px-8 sm:pb-12 lg:items-center lg:px-0 lg:pb-0">
            {/* Floating number - desktop only */}
            <div className="pointer-events-none absolute -top-5 right-10 hidden text-[110px] font-black leading-none tracking-[-0.08em] text-white/10 lg:block">
              01
            </div>

            <div className="relative w-full lg:-ml-20">
              {/* =================================================
                  LOGIN FRAME
              ================================================= */}
              <div className="relative w-full bg-[#f5f2e9] px-5 py-6 shadow-[12px_16px_45px_rgba(23,61,45,0.10)] sm:px-8 sm:py-9 sm:shadow-[16px_20px_55px_rgba(23,61,45,0.11)] lg:px-12 lg:py-12 lg:shadow-[20px_25px_70px_rgba(23,61,45,0.12)]">
                {/* Registration mark */}
                <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-[#173d2d]/15 sm:right-5 sm:top-5 sm:h-8 sm:w-8">
                  <span className="text-[8px] font-bold">+</span>
                </div>

                {/* =================================================
                    TOP RULE
                ================================================= */}
                <div className="mb-7 flex items-center justify-between border-b border-[#173d2d]/15 pb-4 sm:mb-8 sm:pb-5 lg:mb-9">
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#173d2d]/40 sm:text-[9px] sm:tracking-[0.25em]">
                      Authorized access
                    </div>

                    <div className="mt-1 text-[10px] font-medium text-[#173d2d]/60 sm:text-[11px]">
                      KCMSC / ADMIN
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3c8c5d]" />

                    <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-[#173d2d]/40 sm:text-[8px] sm:tracking-[0.2em]">
                      Online
                    </span>
                  </div>
                </div>

                {/* =================================================
                    LOGIN HEADING
                ================================================= */}
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#173d2d]/40 sm:text-[9px] sm:tracking-[0.3em]">
                    Sign in
                  </p>

                  <h2 className="mt-2 text-[1.8rem] font-bold leading-[1.05] tracking-[-0.045em] sm:mt-3 sm:text-3xl lg:text-4xl">
                    Good to see
                    <br />
                    you again.
                  </h2>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}
                <form
                  onSubmit={handleSubmit}
                  noValidate={false}
                  className="mt-7 sm:mt-8 lg:mt-9"
                >
                  <div className="space-y-5 sm:space-y-6">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-[8px] font-bold uppercase tracking-[0.18em] text-[#173d2d]/50 sm:text-[9px] sm:tracking-[0.22em]"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        disabled={loading}
                        className="h-12 w-full border-0 border-b border-[#173d2d]/20 bg-transparent px-0 text-[14px] text-[#173d2d] outline-none transition placeholder:text-[#173d2d]/25 focus:border-[#173d2d] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-[8px] font-bold uppercase tracking-[0.18em] text-[#173d2d]/50 sm:text-[9px] sm:tracking-[0.22em]"
                      >
                        Password
                      </label>

                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        disabled={loading}
                        className="h-12 w-full border-0 border-b border-[#173d2d]/20 bg-transparent px-0 text-[14px] text-[#173d2d] outline-none transition placeholder:text-[#173d2d]/25 focus:border-[#173d2d] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      ERROR
                  ================================================= */}
                  {error ? (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="mt-5 border-l-2 border-[#a34c3c] bg-[#a34c3c]/[0.06] px-3 py-2.5 text-[11px] leading-5 text-[#8b3e31] sm:mt-6 sm:px-4 sm:py-3 sm:text-xs"
                    >
                      {error}
                    </div>
                  ) : null}

                  {/* =================================================
                      SUBMIT
                  ================================================= */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-7 flex h-12 w-full items-center justify-between bg-[#173d2d] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:bg-[#25553f] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-8 sm:h-14 sm:px-5 sm:text-xs sm:tracking-[0.16em]"
                  >
                    <span>{loading ? "Signing in…" : "Enter dashboard"}</span>

                    <span className="flex h-7 w-7 items-center justify-center border border-white/20 transition-transform duration-300 group-hover:translate-x-1 sm:h-8 sm:w-8">
                      {loading ? (
                        <svg
                          className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="opacity-25"
                          />

                          <path
                            d="M21 12a9 9 0 0 1-9 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h13M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </form>

                {/* =================================================
                    SECURITY FOOTER
                ================================================= */}
                <div className="mt-6 flex items-start gap-2.5 border-t border-[#173d2d]/10 pt-4 sm:mt-8 sm:gap-3 sm:pt-5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#173d2d]/[0.07]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <rect
                        x="6"
                        y="10"
                        width="12"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />

                      <path
                        d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <p className="text-[8px] leading-4 text-[#173d2d]/40 sm:text-[9px] sm:leading-5">
                    This area is restricted to authorized KCMSC administrators.
                    All access is monitored and secured.
                  </p>
                </div>
              </div>

              {/* Offset decoration - desktop only */}
              <div className="absolute -bottom-3 -right-3 -z-10 hidden h-full w-full border border-[#173d2d]/15 sm:block" />
            </div>
          </section>
        </main>

        {/* =========================================================
            VERTICAL SIDE LABEL - DESKTOP ONLY
        ========================================================= */}
        <div className="pointer-events-none absolute bottom-10 left-3 hidden -rotate-90 origin-left text-[8px] font-bold uppercase tracking-[0.35em] text-[#173d2d]/25 lg:block">
          KCMSC • MANAGEMENT • 2026
        </div>
      </div>
    </div>
  );
}
