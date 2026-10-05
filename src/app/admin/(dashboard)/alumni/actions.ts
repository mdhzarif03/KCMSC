"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";

const alumniSchema = z.object({
  name: z.string().trim().min(1),
  body: z.string().trim().min(1),
  preview: z.string().trim().min(1),
  sscBatch: z.string().trim().max(50).optional(),
  hscBatch: z.string().trim().max(50).optional(),
  currentPosition: z.string().trim().max(200).optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

function parseForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const preview = String(formData.get("preview") ?? "").trim();
  const currentPosition = String(formData.get("currentPosition") ?? "").trim();

  return alumniSchema.parse({
    name,
    body,
    preview,
    sscBatch: String(formData.get("sscBatch") ?? "").trim(),
    hscBatch: String(formData.get("hscBatch") ?? "").trim(),
    currentPosition,
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") ?? "0",
  });
}

function revalidateAlumni() {
  revalidatePath("/admin/alumni");
  revalidatePath("/en/alumni");
  revalidatePath("/bn/alumni");
  revalidatePath("/en");
  revalidatePath("/bn");
}

function toPrismaData(data: ReturnType<typeof parseForm>) {
  return {
    nameEn: data.name,
    nameBn: data.name,
    messageEn: data.body,
    messageBn: data.body,
    previewEn: data.preview,
    previewBn: data.preview,
    sscBatch: data.sscBatch || null,
    hscBatch: data.hscBatch || null,
    roleEn: data.currentPosition || null,
    roleBn: data.currentPosition || null,
    isFeatured: data.isFeatured,
    isPublished: data.isPublished,
    sortOrder: data.sortOrder,
  };
}

export async function createAlumniAction(formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  const alumni = await prisma.alumniMessage.create({ data: toPrismaData(data) });
  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: alumni.id });
  revalidateAlumni();
  redirect("/admin/alumni");
}

export async function updateAlumniAction(id: string, formData: FormData) {
  const actor = await requireAdmin();
  const data = parseForm(formData);
  await prisma.alumniMessage.update({ where: { id }, data: toPrismaData(data) });
  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: id });
  revalidateAlumni();
  redirect("/admin/alumni");
}

export async function deleteAlumniAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.alumniMessage.delete({ where: { id } });
  await logAudit({ userId: actor.id, actorLabel: actor.email, action: "DELETE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: id });
  revalidateAlumni();
}
