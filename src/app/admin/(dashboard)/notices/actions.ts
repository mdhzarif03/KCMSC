"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const noticeSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleBn: z.string().min(1, "Bangla title is required"),
  bodyEn: z.string().min(1, "English body is required"),
  bodyBn: z.string().min(1, "Bangla body is required"),
  isImportant: z.boolean(),
  isPublished: z.boolean()
});

function parseForm(formData: FormData) {
  return noticeSchema.parse({
    titleEn: formData.get("titleEn"),
    titleBn: formData.get("titleBn"),
    bodyEn: formData.get("bodyEn"),
    bodyBn: formData.get("bodyBn"),
    isImportant: formData.get("isImportant") === "on",
    isPublished: formData.get("isPublished") === "on"
  });
}

export async function createNoticeAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);

  const notice = await prisma.notice.create({
    data: { ...data, publishedAt: data.isPublished ? new Date() : null }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_NOTICE",
    targetType: "Notice",
    targetId: notice.id
  });

  revalidatePath("/admin/notices");
  revalidatePath("/en/notices");
  revalidatePath("/bn/notices");
  revalidatePath("/en", "layout");
  revalidatePath("/bn", "layout");
  redirect("/admin/notices");
}

export async function updateNoticeAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const existing = await prisma.notice.findUniqueOrThrow({ where: { id } });

  await prisma.notice.update({
    where: { id },
    data: {
      ...data,
      publishedAt:
        data.isPublished && !existing.isPublished ? new Date() : existing.publishedAt
    }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "UPDATE_NOTICE",
    targetType: "Notice",
    targetId: id
  });

  revalidatePath("/admin/notices");
  revalidatePath("/en/notices");
  revalidatePath("/bn/notices");
  revalidatePath("/en", "layout");
  revalidatePath("/bn", "layout");
  redirect("/admin/notices");
}

export async function deleteNoticeAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  await prisma.notice.delete({ where: { id } });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "DELETE_NOTICE",
    targetType: "Notice",
    targetId: id
  });

  revalidatePath("/admin/notices");
  revalidatePath("/en/notices");
  revalidatePath("/bn/notices");
  revalidatePath("/en", "layout");
  revalidatePath("/bn", "layout");
}
