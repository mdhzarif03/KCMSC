"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        locale === "bn"
          ? "ইমেইল এবং পাসওয়ার্ড প্রদান করুন।"
          : "Please enter your email and password.",
      );
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!result) {
        setError(
          locale === "bn"
            ? "লগইন করা সম্ভব হয়নি।"
            : "Unable to sign in. Please try again.",
        );
        return;
      }

      if (result.error) {
        setError(
          locale === "bn"
            ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
            : "Invalid email or password.",
        );
        return;
      }

      router.push(`/${locale}/admin/dashboard`);
      router.refresh();
    } catch {
      setError(
        locale === "bn"
          ? "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।"
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f4f4ee] px-5 py-12 sm:px-8 lg:flex lg:items-center lg:justify-center lg:py-16">
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[3px] bg-[#176b45] font-heading text-sm font-semibold text-white">
              KC
            </span>

            <span className="text-left">
              <span className="block font-heading text-[17px] font-medium text-[#124c36]">
                K C Model School
              </span>

              <span className="block text-[8px] uppercase tracking-[0.2em] text-[#7c847d]">
                & College
              </span>
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <section className="overflow-hidden rounded-2xl border border-[#dedfd8] bg-white shadow-[0_18px_50px_rgba(20,55,40,0.08)]">
          {/* Header */}
          <div className="border-b border-[#e4e5df] px-7 py-7 sm:px-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ee] text-[#176b45]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M12 3L20 7V11C20 16.2 16.6 20.1 12 21C7.4 20.1 4 16.2 4 11V7L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 11.5L11.2 13.2L14.8 9.6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#176b45]">
              {locale === "bn" ? "অ্যাডমিন পোর্টাল" : "ADMIN PORTAL"}
            </p>

            <h1 className="font-heading text-[29px] leading-tight text-[#174f3a]">
              {locale === "bn" ? "অ্যাডমিন লগইন" : "Admin Login"}
            </h1>

            <p className="mt-2 text-[12px] leading-5 text-[#747b75]">
              {locale === "bn"
                ? "K C Model School & College প্রশাসনিক প্যানেলে প্রবেশ করুন।"
                : "Sign in to access the K C Model School & College administration panel."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 px-7 py-7 sm:px-8">
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-[#efc9c3] bg-[#fff7f5] px-4 py-3 text-[12px] leading-5 text-[#a3473c]"
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-semibold text-[#3f4741]"
              >
                {locale === "bn" ? "ইমেইল" : "Email Address"}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@kcmsc.edu.bd"
                disabled={loading}
                className="h-12 w-full rounded-lg border border-[#d9ddd8] bg-[#fbfcfa] px-4 text-[13px] text-[#28312c] outline-none transition placeholder:text-[#a3aaa4] focus:border-[#176b45] focus:bg-white focus:ring-2 focus:ring-[#176b45]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold text-[#3f4741]"
                >
                  {locale === "bn" ? "পাসওয়ার্ড" : "Password"}
                </label>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="h-12 w-full rounded-lg border border-[#d9ddd8] bg-[#fbfcfa] px-4 pr-12 text-[13px] text-[#28312c] outline-none transition placeholder:text-[#a3aaa4] focus:border-[#176b45] focus:bg-white focus:ring-2 focus:ring-[#176b45]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[#7b837d] transition-colors hover:text-[#176b45] disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6 10.6C10.2 11 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 13 13.8 13.4 13.4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.9 5.2C10.6 5 11.3 4.9 12 4.9C17 4.9 20.2 8.5 21 12C20.7 13.3 20.1 14.5 19.2 15.6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.7 6.7C4.7 8 3.4 10 3 12C3.8 15.5 7 19.1 12 19.1C13.5 19.1 14.9 18.8 16.1 18.2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 12C4.5 7.9 7.5 5.5 12 5.5C16.5 5.5 19.5 7.9 21 12C19.5 16.1 16.5 18.5 12 18.5C7.5 18.5 4.5 16.1 3 12Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#176b45] px-5 text-[12px] font-semibold text-white shadow-[0_7px_18px_rgba(23,107,69,0.16)] transition-all hover:bg-[#125b3b] hover:shadow-[0_9px_22px_rgba(23,107,69,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {locale === "bn" ? "লগইন হচ্ছে..." : "Signing in..."}
                </>
              ) : (
                <>
                  {locale === "bn" ? "লগইন করুন" : "Sign In"}

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10H16M11 5L16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="border-t border-[#e7e8e3] bg-[#fafbf8] px-7 py-4 sm:px-8">
            <div className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#176b45]"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>

              <p className="text-[10px] leading-4 text-[#858c86]">
                {locale === "bn"
                  ? "এই পোর্টাল শুধুমাত্র অনুমোদিত K C Model School & College প্রশাসনিক ব্যবহারকারীদের জন্য।"
                  : "This portal is restricted to authorized K C Model School & College administrators."}
              </p>
            </div>
          </div>
        </section>

        {/* Back to website */}
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}`}
            className="text-[11px] text-[#747b75] transition-colors hover:text-[#176b45]"
          >
            ← {locale === "bn" ? "ওয়েবসাইটে ফিরে যান" : "Back to website"}
          </Link>
        </div>
      </div>
    </main>
  );
}
