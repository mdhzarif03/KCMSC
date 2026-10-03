import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/session";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  const app = await prisma.admissionApplication.findUnique({ where: { id: params.id }, select: { certificateData: true, certificateName: true, certificateMimeType: true } });
  if (!app?.certificateData) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(app.certificateData), { headers: { "Content-Type": app.certificateMimeType ?? "application/octet-stream", "Content-Disposition": `attachment; filename="${(app.certificateName ?? "certificate").replace(/[^a-zA-Z0-9._-]/g, "_")}"` } });
}
