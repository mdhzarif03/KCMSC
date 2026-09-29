"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const clubSchema = z.object({
  nameEn: z.string().min(1),
  nameBn: z.string().min(1),
  descriptionEn: z.string(),
  descriptionBn: z.string(),
  isFeatured: z.boolean()
});

function parseForm(formData: FormData) {
  return clubSchema.parse({
    nameEn: formData.get("nameEn"),
    nameBn: formData.get("nameBn"),
    descriptionEn: formData.get("descriptionEn") ?? "",
    descriptionBn: formData.get("descriptionBn") ?? "",
    isFeatured: formData.get("isFeatured") === "on"
  });
}

export async function createClubAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const club = await prisma.club.create({ data });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_CLUB", targetType: "Club", targetId: club.id });

  revalidatePath("/admin/clubs");
  revalidatePath("/en/clubs");
  revalidatePath("/bn/clubs");
  redirect("/admin/clubs");
}

export async function updateClubAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  await prisma.club.update({ where: { id }, data });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_CLUB", targetType: "Club", targetId: id });

  revalidatePath("/admin/clubs");
  revalidatePath("/en/clubs");
  revalidatePath("/bn/clubs");
  redirect("/admin/clubs");
}

export async function deleteClubAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.club.delete({ where: { id } });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "DELETE_CLUB", targetType: "Club", targetId: id });

  revalidatePath("/admin/clubs");
  revalidatePath("/en/clubs");
  revalidatePath("/bn/clubs");
}
