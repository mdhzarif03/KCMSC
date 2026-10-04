$ErrorActionPreference = "Stop"

Write-Host "Stopping Node.js development processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Removing Next.js build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
}

Write-Host "Regenerating Prisma Client from prisma/schema.prisma..." -ForegroundColor Cyan
npx prisma generate

Write-Host ""
Write-Host "KCMSC repair complete." -ForegroundColor Green
Write-Host "Start the site with: npm run dev" -ForegroundColor White
