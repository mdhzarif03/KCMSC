"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const careerSchema = z.object({
  titleEn: z.string().min(1),
  titleBn: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionBn: z.string().min(1),
  deadline: z.string().optional(),
  isPublished: z.boolean()
});

function parseForm(formData: FormData) {
  return careerSchema.parse({
    titleEn: formData.get("titleEn"),
    titleBn: formData.get("titleBn"),
    descriptionEn: formData.get("descriptionEn"),
    descriptionBn: formData.get("descriptionBn"),
    deadline: formData.get("deadline") || undefined,
    isPublished: formData.get("isPublished") === "on"
  });
}

export async function createCareerAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const career = await prisma.career.create({
    data: { ...data, deadline: data.deadline ? new Date(data.deadline) : null }
  });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_CAREER", targetType: "Career", targetId: career.id });

  revalidatePath("/admin/careers");
  revalidatePath("/en/careers");
  revalidatePath("/bn/careers");
  redirect("/admin/careers");
}

export async function updateCareerAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  await prisma.career.update({
    where: { id },
    data: { ...data, deadline: data.deadline ? new Date(data.deadline) : null }
  });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_CAREER", targetType: "Career", targetId: id });

  revalidatePath("/admin/careers");
  revalidatePath("/en/careers");
  revalidatePath("/bn/careers");
  redirect("/admin/careers");
}

export async function deleteCareerAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.career.delete({ where: { id } });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "DELETE_CAREER", targetType: "Career", targetId: id });

  revalidatePath("/admin/careers");
  revalidatePath("/en/careers");
  revalidatePath("/bn/careers");
}
