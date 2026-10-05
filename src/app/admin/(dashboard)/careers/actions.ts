"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const careerSchema = z.object({
  titleEn: z.string().trim().min(1),
  titleBn: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionBn: z.string().trim().min(1),
  deadline: z.string().optional(),
  isPublished: z.boolean(),
});

function parseForm(formData: FormData) {
  return careerSchema.parse({
    titleEn: formData.get("titleEn"),
    titleBn: formData.get("titleBn"),
    descriptionEn: formData.get("descriptionEn"),
    descriptionBn: formData.get("descriptionBn"),
    deadline: formData.get("deadline") || undefined,
    isPublished: formData.get("isPublished") === "on",
  });
}

function revalidateCareerPages() {
  revalidatePath("/admin/careers");
  revalidatePath("/en/careers");
  revalidatePath("/bn/careers");
}

export async function createCareerAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);

  const career = await prisma.career.create({
    data: {
      titleEn: data.titleEn,
      titleBn: data.titleBn,
      descriptionEn: data.descriptionEn,
      descriptionBn: data.descriptionBn,
      deadline: data.deadline ? new Date(data.deadline) : null,
      isPublished: data.isPublished,
    },
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_CAREER",
    targetType: "Career",
    targetId: career.id,
  });

  revalidateCareerPages();
  redirect("/admin/careers");
}

export async function updateCareerAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);

  await prisma.career.update({
    where: { id },
    data: {
      titleEn: data.titleEn,
      titleBn: data.titleBn,
      descriptionEn: data.descriptionEn,
      descriptionBn: data.descriptionBn,
      deadline: data.deadline ? new Date(data.deadline) : null,
      isPublished: data.isPublished,
    },
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "UPDATE_CAREER",
    targetType: "Career",
    targetId: id,
  });

  revalidateCareerPages();
  redirect("/admin/careers");
}

export async function deleteCareerAction(formData: FormData) {
  const actor = await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/careers");
  }

  await prisma.career.delete({
    where: { id },
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "DELETE_CAREER",
    targetType: "Career",
    targetId: id,
  });

  revalidateCareerPages();
  redirect("/admin/careers");
}
