# K C Model School and College — Website (Public Site + Admissions Admin)

The live project contains the public KCMSC website plus a focused admissions
administration system. The admin workspace intentionally contains only the
features that are part of the live admissions workflow: admissions, officer
management, and administrator management. Legacy CMS-only admin routes have
been removed rather than left as orphaned pages.

## Build verification — this time against real Prisma types

Phase 3's README explained that this sandbox can't reach
`binaries.prisma.sh`, so `prisma generate` couldn't produce a real
client here, and I could only verify Phase 3's code with strict-mode
temporarily relaxed. For Phase 4 I found a way to do better:

**I generated a real, fully-typed Prisma Client in this sandbox** using
`prisma generate --no-engine` with dummy engine paths — this produces
the actual generated TypeScript types for every model (what your editor
and `tsc` check against) without needing the query-engine *binary*,
which is the specific piece that's blocked here. I then ran a full
`npx tsc --noEmit` with the **original, fully-strict tsconfig** —
**zero errors** — followed by a complete `npx next build`, which
compiled and prerendered all ~40 routes successfully (both locales ×
each public page, all admin/officer routes, the NextAuth handler).

This is meaningfully stronger verification than Phase 3 had, and it
caught two more real bugs before you ever saw this code:

1. `src/lib/db.ts` briefly failed because the stub `@prisma/client`
   doesn't export `PrismaClient` until generated — expected, resolved
   by generating the client for the check.
2. **A real bug**, unrelated to Prisma typing: `token.role` was being
   force-cast through `{ role: string }` in `src/lib/auth-options.ts`,
   throwing away the actual `Role` type for no reason. Fixed to use the
   typed `user.role` directly.
3. **Another real bug**: `prisma.admissionApplication.groupBy()`'s
   return type wasn't being narrowed explicitly in
   `admin/(dashboard)/admissions/page.tsx`, which only surfaced because
   `groupBy`'s generic return type is unusually complex — added an
   explicit row type.

The `--no-engine` client I generated for this check is **not** shipped —
it lives in `node_modules`, which is excluded from this zip. Your own
`npm install` (with normal network access) regenerates a complete,
working client via the `postinstall` hook, the same as any other
Prisma project.

I also confirmed with `diff` that the `tsconfig.json` in this zip is
byte-identical to the original strict configuration — nothing was
quietly loosened to make the build pass.

## What's new in Phase 4

**Admission officer accounts**
- `/admin/officers` — admins invite officers (same invitation-link
  pattern as admin accounts) and can **remove** any officer's account
  directly (unlike admins, who may only delete their own — brief §21
  vs §22 are genuinely different rules, and the code reflects that:
  compare `administrators/actions.ts`'s self-only check against
  `officers/actions.ts`'s admin-removes-anyone action).
- Removing an officer never deletes their work. `src/lib/officers.ts`
  releases any applications they still had in progress back to the
  unassigned pool, then deletes the user — reviews and audit rows keep
  their history via `onDelete: SetNull`, exactly as Phase 1's schema
  comments promised.
- Officers can also leave voluntarily from `/officer/settings`, using
  the same self-only `canDeleteAccount()` check admins use.

**The public application** (`/admissions/apply`)
- Real fields from brief §18: applicant info (name, DOB, gender, class,
  previous institution), guardian info (name, relationship, phone,
  email), present/permanent address, and a declaration checkbox.
- Only accepts submissions while an `AdmissionCycle` is both marked
  active **and** within its date range — an admin can flip a cycle on
  at `/admin/admissions` without redeploying anything. The seed script
  creates one inactive cycle so there's something to activate rather
  than a confusing empty state.
- On submit, generates a human-shareable reference code
  (`KCMSC-2026-XXXXXX`, ambiguous characters excluded) and shows it
  once on a confirmation page.

**Tracking** (`/admissions/track`)
- Requires the reference code **and** the guardian phone number used on
  the application — deliberate defense in depth so a leaked or guessed
  reference code alone can't pull up someone else's status.
- Shows a status timeline and, if an officer left one, the latest
  **applicant-visible** message only. It is structurally impossible for
  this page to leak an internal note: the query only ever selects
  `AdmissionReview.applicantMessage`, never `internalNote` (see the
  schema comment on that model, and `track/page.tsx`'s query).

**The officer workflow** (`/officer/**`)
- Overview dashboard with real counts (new/unassigned, assigned to me,
  awaiting applicant, eligible, etc.).
- Filterable/searchable application list.
- Claiming is a single conditional database update
  (`assignedOfficerId: null` in the `WHERE` clause) — if two officers
  click "claim" on the same application at the same instant, the
  database lets exactly one succeed; the loser is told who got it
  instead of silently overwriting them. This is what brief §20 actually
  requires ("avoid duplicate/conflicting work"), not just a UI
  convention.
- Only the officer currently holding an application can update its
  status — enforced server-side in `submitReviewAction`, not just by
  hiding the form.
- Every status change writes an `AdmissionReview` row with a required
  internal note and an optional applicant-visible message, kept
  strictly separate.

**Admin oversight** (`/admin/admissions`)
- Status counts across every application, a cycle manager (create,
  activate/deactivate — only one cycle is active at a time), and a
  recent-applications list.
- Application detail view reuses the same `ApplicationDetail` component
  the officer area uses (shared, not duplicated), plus a reassign
  control admins can use to move an application between officers.

**Login now branches by role.** `/admin/login` is shared — after
signing in, `/admin`'s own `requireAdmin()` bounces an
`ADMISSION_OFFICER` session to `/officer` automatically (and vice
versa), so there's one login form but two destinations, without either
role ever seeing the wrong dashboard.

**Also fixed:** the footer's "Admin Login" link was pointing at
`/{locale}/admin/login` since Phase 1 — a genuine bug, since `/admin`
routes are deliberately not locale-prefixed. Caught it while wiring up
the officer nav and fixed it. It's a good example of exactly the kind
of thing that only surfaces when you actually try to build and click
through a project rather than just writing it.

## Still not built

- **Public-content CMS editing.** Public content is currently backed by the existing seeded database records/static fallbacks; the old orphaned admin CRUD screens for notices, achievements, clubs, facilities, and careers are intentionally not part of the live admin workspace.
- **Document upload.** The application form has a declaration checkbox
  but no file attachment — that needs blob storage (Vercel Blob, S3,
  etc.), which isn't configured. The officer/admin detail view says so
  explicitly rather than pretending documents exist.
- **Email delivery**, for invitations and for applicant status updates.
  Everything currently surfaces as an on-screen link or requires the
  applicant to check the tracker themselves.
- **Navigation editor UI**, **media upload UI**, **3D/animation
  system**, **SEO editor**, **site search** — all still deferred from
  earlier phases, unchanged.
- **Rate limiting on the public application/tracking endpoints.** The
  login rate-limiter from Phase 3 doesn't cover these; worth adding
  before this is public, so the tracker can't be used to brute-force
  guardian phone numbers against a known reference code (or vice
  versa) at volume.

## Running it locally

```bash
npm install                          # runs `prisma generate` via postinstall
cp .env.example .env                 # fill in a real Neon DATABASE_URL
                                      # generate AUTH_SECRET: openssl rand -base64 32
npx prisma migrate dev --name init
npm run prisma:seed                  # content + first-admin link + one inactive cycle
npm run dev
```

Set up the first admin via the printed link, sign in at `/admin/login`,
activate the seeded cycle at `/admin/admissions`, then try the whole
loop yourself: submit an application at `/en/admissions/apply`, invite
an officer at `/admin/officers`, have them claim and review it at
`/officer`, and check status at `/en/admissions/track`.

## What I'd suggest next

This closes out the brief's four core phases. What's left (Phase 5/6 in
the original plan) is a security/performance/accessibility audit pass
and final polish — plus the genuinely open items above (file uploads,
email, the navigation/media editors). None of those need to happen all
at once; happy to pick up wherever's most useful once you've had a
chance to actually run this against a real database.
