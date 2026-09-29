"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const achievementSchema = z.object({
  titleEn: z.string().min(1),
  titleBn: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionBn: z.string().min(1),
  year: z.coerce.number().int().min(1990).max(2100),
  category: z.string().min(1),
  isFeatured: z.boolean()
});

function parseForm(formData: FormData) {
  return achievementSchema.parse({
    titleEn: formData.get("titleEn"),
    titleBn: formData.get("titleBn"),
    descriptionEn: formData.get("descriptionEn"),
    descriptionBn: formData.get("descriptionBn"),
    year: formData.get("year"),
    category: formData.get("category"),
    isFeatured: formData.get("isFeatured") === "on"
  });
}

export async function createAchievementAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const achievement = await prisma.achievement.create({ data });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_ACHIEVEMENT",
    targetType: "Achievement",
    targetId: achievement.id
  });

  revalidatePath("/admin/achievements");
  revalidatePath("/en/achievements");
  revalidatePath("/bn/achievements");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
  redirect("/admin/achievements");
}

export async function updateAchievementAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  await prisma.achievement.update({ where: { id }, data });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "UPDATE_ACHIEVEMENT",
    targetType: "Achievement",
    targetId: id
  });

  revalidatePath("/admin/achievements");
  revalidatePath("/en/achievements");
  revalidatePath("/bn/achievements");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
  redirect("/admin/achievements");
}

export async function deleteAchievementAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.achievement.delete({ where: { id } });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "DELETE_ACHIEVEMENT",
    targetType: "Achievement",
    targetId: id
  });

  revalidatePath("/admin/achievements");
  revalidatePath("/en/achievements");
  revalidatePath("/bn/achievements");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
}
