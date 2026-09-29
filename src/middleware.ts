import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from "@/i18n/config";

// Phase 1 scope note (unchanged): simple prefix-based locale routing.
function getLocaleFromPath(pathname: string) {
  const segment = pathname.split("/")[1];
  return locales.find((l) => l === segment);
}

// Admin/officer auth routes are NOT localized — the CMS operator UI stays
// in English regardless of the public site's language. These paths must
// stay reachable without a session (you need them to get one).
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/accept-invite"];
const PROTECTED_PREFIXES = ["/admin", "/officer"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin/officer auth gate ------------------------------------------
  if (PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    // This is the coarse, edge-level gate: "is there a session at all".
    // Role-specific enforcement (ADMIN vs ADMISSION_OFFICER) happens in
    // requireAdmin()/requireOfficer() (src/lib/session.ts) — see that
    // file's comment for why both layers exist.
    return NextResponse.next();
  }

  // --- Public site locale redirect --------------------------------------
  const hasLocale = getLocaleFromPath(pathname);
  if (hasLocale) return NextResponse.next();

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
