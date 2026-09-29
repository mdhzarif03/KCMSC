import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="mt-24 border-t border-border bg-primary-dark text-white">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg">{dict.site.name}</p>
          <p className="mt-1 text-sm text-white/70">{dict.site.tagline}</p>
        </div>

        <address className="text-sm not-italic text-white/80">
          <p>{dict.footer.address}</p>
          <p className="mt-2">
            {dict.footer.phone} · {dict.footer.mobile}
          </p>
          <p>
            <a href={`mailto:${dict.footer.email}`} className="hover:text-brass">
              {dict.footer.email}
            </a>
          </p>
          <p>{dict.footer.website}</p>
        </address>

        <div className="text-sm text-white/70 sm:text-right">
          <p>
            © {new Date().getFullYear()} {dict.site.shortName}. {dict.footer.rights}
          </p>
          <Link
            href="/admin/login"
            className="mt-2 inline-block underline decoration-white/40 underline-offset-4 hover:text-brass"
          >
            {dict.footer.adminLogin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
