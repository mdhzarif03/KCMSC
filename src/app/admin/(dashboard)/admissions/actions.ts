"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const cycleSchema = z.object({
  nameEn: z.string().trim().min(1),
  nameBn: z.string().trim().min(1),
  opensAt: z.string().min(1),
  closesAt: z.string().min(1)
});

function parseWindow(opensAt: string, closesAt: string) {
  // The school operates in Bangladesh time. datetime-local has no timezone
  // information, so make the intended +06:00 offset explicit before storing it.
  const withDhakaOffset = (value: string) => /[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? value : `${value}:00+06:00`;
  const opens = new Date(withDhakaOffset(opensAt));
  const closes = new Date(withDhakaOffset(closesAt));
  if (Number.isNaN(opens.getTime()) || Number.isNaN(closes.getTime()) || closes <= opens) return null;
  return { opensAt: opens, closesAt: closes };
}

async function ensureNoOverlap(opensAt: Date, closesAt: Date, excludeId?: string) {
  const overlap = await prisma.admissionCycle.findFirst({
    where: {
      ...(excludeId ? { id: { not: excludeId } } : {}),
      opensAt: { lt: closesAt },
      closesAt: { gt: opensAt }
    },
    select: { id: true }
  });
  return !overlap;
}

export async function createCycleAction(formData: FormData) {
  const actor = await requireAdmin();
  const parsed = cycleSchema.safeParse({
    nameEn: formData.get("nameEn"),
    nameBn: formData.get("nameBn"),
    opensAt: formData.get("opensAt"),
    closesAt: formData.get("closesAt")
  });
  if (!parsed.success) redirect("/admin/admissions?error=invalid_cycle");

  const window = parseWindow(parsed.data.opensAt, parsed.data.closesAt);
  if (!window) redirect("/admin/admissions?error=invalid_dates");
  if (!(await ensureNoOverlap(window.opensAt, window.closesAt))) redirect("/admin/admissions?error=overlap");

  const cycle = await prisma.admissionCycle.create({ data: { ...parsed.data, ...window } });
  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_ADMISSION_CYCLE", targetType: "AdmissionCycle", targetId: cycle.id });
  revalidatePath("/admin/admissions");
  revalidatePath("/en/admissions");
  revalidatePath("/bn/admissions");
  redirect("/admin/admissions");
}

export async function updateCycleAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const parsed = cycleSchema.safeParse({
    nameEn: formData.get("nameEn"),
    nameBn: formData.get("nameBn"),
    opensAt: formData.get("opensAt"),
    closesAt: formData.get("closesAt")
  });
  if (!parsed.success) redirect(`/admin/admissions?error=invalid_cycle&edit=${id}`);

  const window = parseWindow(parsed.data.opensAt, parsed.data.closesAt);
  if (!window) redirect(`/admin/admissions?error=invalid_dates&edit=${id}`);
  if (!(await ensureNoOverlap(window.opensAt, window.closesAt, id))) redirect(`/admin/admissions?error=overlap&edit=${id}`);

  await prisma.admissionCycle.update({ where: { id }, data: { ...parsed.data, ...window } });
  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_ADMISSION_CYCLE", targetType: "AdmissionCycle", targetId: id });
  revalidatePath("/admin/admissions");
  revalidatePath("/en/admissions");
  revalidatePath("/bn/admissions");
  redirect("/admin/admissions");
}

export async function reassignApplicationAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const officerId = String(formData.get("officerId") ?? "");
  const app = await prisma.admissionApplication.findUniqueOrThrow({ where: { id } });

  if (officerId) {
    const officer = await prisma.user.findUnique({ where: { id: officerId } });
    if (!officer || officer.role !== "ADMISSION_OFFICER") redirect(`/admin/admissions/${id}?error=bad_officer`);
    await prisma.admissionApplication.update({ where: { id }, data: { assignedOfficerId: officerId, status: app.status === "UNASSIGNED" ? "ASSIGNED" : app.status } });
  } else {
    await prisma.admissionApplication.update({ where: { id }, data: { assignedOfficerId: null, status: ["ASSIGNED", "UNDER_REVIEW"].includes(app.status) ? "UNASSIGNED" : app.status } });
  }

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "REASSIGN_APPLICATION", targetType: "AdmissionApplication", targetId: id });
  revalidatePath(`/admin/admissions/${id}`);
  revalidatePath("/admin/admissions");
  redirect(`/admin/admissions/${id}`);
}
