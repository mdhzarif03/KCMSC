"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const facilitySchema = z.object({
  titleEn: z.string().min(1),
  titleBn: z.string().min(1),
  descriptionEn: z.string(),
  descriptionBn: z.string(),
  isFeatured: z.boolean()
});

function parseForm(formData: FormData) {
  return facilitySchema.parse({
    titleEn: formData.get("titleEn"),
    titleBn: formData.get("titleBn"),
    descriptionEn: formData.get("descriptionEn") ?? "",
    descriptionBn: formData.get("descriptionBn") ?? "",
    isFeatured: formData.get("isFeatured") === "on"
  });
}

export async function createFacilityAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const facility = await prisma.facility.create({ data });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_FACILITY", targetType: "Facility", targetId: facility.id });

  revalidatePath("/admin/facilities");
  revalidatePath("/en/facilities");
  revalidatePath("/bn/facilities");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
  redirect("/admin/facilities");
}

export async function updateFacilityAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  await prisma.facility.update({ where: { id }, data });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_FACILITY", targetType: "Facility", targetId: id });

  revalidatePath("/admin/facilities");
  revalidatePath("/en/facilities");
  revalidatePath("/bn/facilities");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
  redirect("/admin/facilities");
}

export async function deleteFacilityAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.facility.delete({ where: { id } });

  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "DELETE_FACILITY", targetType: "Facility", targetId: id });

  revalidatePath("/admin/facilities");
  revalidatePath("/en/facilities");
  revalidatePath("/bn/facilities");
  revalidatePath("/en"); // homepage shows featured items
  revalidatePath("/bn");
}
