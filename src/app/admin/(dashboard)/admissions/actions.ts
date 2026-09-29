"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const cycleSchema = z.object({
  nameEn: z.string().min(1),
  nameBn: z.string().min(1),
  opensAt: z.string().min(1),
  closesAt: z.string().min(1)
});

export async function createCycleAction(formData: FormData) {
  const actor = await requireAdmin();
  const parsed = cycleSchema.safeParse({
    nameEn: formData.get("nameEn"),
    nameBn: formData.get("nameBn"),
    opensAt: formData.get("opensAt"),
    closesAt: formData.get("closesAt")
  });
  if (!parsed.success) redirect("/admin/admissions?error=invalid_cycle");

  const opensAt = new Date(parsed.data.opensAt);
  const closesAt = new Date(parsed.data.closesAt);
  closesAt.setHours(23, 59, 59, 999); // closing day is inclusive
  if (closesAt <= opensAt) redirect("/admin/admissions?error=invalid_dates");

  const cycle = await prisma.admissionCycle.create({
    data: { nameEn: parsed.data.nameEn, nameBn: parsed.data.nameBn, opensAt, closesAt, isActive: false }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_CYCLE",
    targetType: "AdmissionCycle",
    targetId: cycle.id
  });
  revalidatePath("/admin/admissions");
  redirect("/admin/admissions");
}

// Only one cycle is active at a time: activating one deactivates the rest.
export async function setCycleActiveAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const activate = formData.get("activate") === "1";

  await prisma.$transaction([
    ...(activate ? [prisma.admissionCycle.updateMany({ data: { isActive: false } })] : []),
    prisma.admissionCycle.update({ where: { id }, data: { isActive: activate } })
  ]);

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: activate ? "ACTIVATE_CYCLE" : "DEACTIVATE_CYCLE",
    targetType: "AdmissionCycle",
    targetId: id
  });
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
    if (!officer || officer.role !== "ADMISSION_OFFICER") {
      redirect(`/admin/admissions/${id}?error=bad_officer`);
    }
    await prisma.admissionApplication.update({
      where: { id },
      data: {
        assignedOfficerId: officerId,
        status: app.status === "UNASSIGNED" ? "ASSIGNED" : app.status
      }
    });
  } else {
    await prisma.admissionApplication.update({
      where: { id },
      data: {
        assignedOfficerId: null,
        status: ["ASSIGNED", "UNDER_REVIEW"].includes(app.status) ? "UNASSIGNED" : app.status
      }
    });
  }

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "REASSIGN_APPLICATION",
    targetType: "AdmissionApplication",
    targetId: id
  });
  revalidatePath(`/admin/admissions/${id}`);
  redirect(`/admin/admissions/${id}`);
}
