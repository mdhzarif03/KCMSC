# KCMSC fix

## Fixed
- Restored `/[locale]/admissions` as the public Admissions page.
- Kept the existing Navbar design/layout unchanged; only corrected its Admissions destination.
- Kept the existing Footer design/layout unchanged; Admin Login now points directly to `/admin/login`.
- The real application flow remains `/[locale]/admissions/apply/[cycleId]`.
- Added `scripts/repair-local.ps1` to regenerate Prisma Client and clear the Next.js cache.

## Important Prisma issue
The runtime screenshot shows Prisma rejecting `fullName` even though `prisma/schema.prisma`
contains that field. That means the local generated Prisma Client is stale.

After replacing your project with this archive, run:

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\repair-local.ps1
npm run dev
```

Do NOT run `prisma migrate reset`. That can destroy the database.

## Scope
No Navbar visual styling, application submission mechanism, PDF mechanism, or unrelated
public-page layout was intentionally changed.
