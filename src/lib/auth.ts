/**
 * Phase 1 scope note:
 * This file only establishes the *shape* of roles and sessions so that
 * Prisma models, route protection helpers, and UI role checks can all
 * agree on the same types from day one. The actual authentication
 * provider (credentials + hashed passwords, invitation-token account
 * setup for admins/admission officers, session cookies) is built in
 * Phase 3 alongside the admin login screen.
 *
 * Design decisions locked in now so later phases don't have to
 * refactor around them:
 *  - Roles are flat: every ADMIN has identical permissions (no
 *    super-admin). Enforced in Prisma via the Role enum, never
 *    inferred from email or a client-supplied flag.
 *  - An admin may only delete their own account (see AGENT.md / brief
 *    §22). This must be enforced in the server action that performs
 *    the deletion by comparing session.user.id to the target id —
 *    never by hiding a button in the UI.
 *  - Admission officers are scoped to admission routes only; the
 *    authorization check for /admin/** must reject ADMISSION_OFFICER
 *    sessions server-side, not just omit nav links.
 */

export const ROLES = {
  ADMIN: "ADMIN",
  ADMISSION_OFFICER: "ADMISSION_OFFICER"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export function isAdmin(user: SessionUser | null | undefined): boolean {
  return user?.role === ROLES.ADMIN;
}

export function isAdmissionOfficer(user: SessionUser | null | undefined): boolean {
  return user?.role === ROLES.ADMISSION_OFFICER;
}

/**
 * Server-side guard for the "delete own account only" rule.
 * Call this from the actual delete server action once auth lands —
 * placed here now so the rule is written down as executable code,
 * not just a paragraph in the brief.
 */
export function canDeleteAccount(sessionUser: SessionUser, targetUserId: string): boolean {
  return sessionUser.id === targetUserId;
}
