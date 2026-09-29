import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

/**
 * The edge middleware (src/middleware.ts) already redirects unauthenticated
 * requests away from /admin/** and /officer/**. These functions are the
 * *second*, real enforcement layer: every admin/officer page and every
 * server action calls the matching one directly, so authorization never
 * depends solely on the middleware having run correctly. Never trust a
 * role passed from the client — this always re-derives it from the
 * server-side session.
 *
 * A logged-in user hitting the wrong area (an officer opening /admin, or
 * an admin opening /officer) is bounced to their own area rather than
 * back to the login page — they do have a valid session, just the wrong
 * role for that page.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");
  if (session.user.role !== "ADMIN") redirect("/officer");
  return session.user;
}

export async function requireOfficer() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");
  if (session.user.role !== "ADMISSION_OFFICER") redirect("/admin");
  return session.user;
}

export async function getCurrentAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return null;
  return session.user;
}

export async function getCurrentOfficer() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMISSION_OFFICER") return null;
  return session.user;
}
