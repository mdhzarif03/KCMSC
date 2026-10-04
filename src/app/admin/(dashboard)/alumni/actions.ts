"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { logAudit } from "@/lib/audit";
const alumniSchema = z.object({
  nameEn: z.string().min(1), nameBn: z.string().min(1), messageEn: z.string().min(1), messageBn: z.string().min(1),
  graduationYear: z.preprocess((v) => v === "" || v == null ? null : Number(v), z.number().int().min(1900).max(2100).nullable()),
  roleEn: z.string().optional(), roleBn: z.string().optional(), organizationEn: z.string().optional(), organizationBn: z.string().optional(), photoUrl: z.string().optional(),
  isFeatured: z.boolean(), isPublished: z.boolean(), sortOrder: z.coerce.number().int().min(0).max(9999),
});
function parseForm(formData: FormData) { return alumniSchema.parse({ nameEn: formData.get("nameEn"), nameBn: formData.get("nameBn"), messageEn: formData.get("messageEn"), messageBn: formData.get("messageBn"), graduationYear: formData.get("graduationYear"), roleEn: String(formData.get("roleEn") ?? "").trim(), roleBn: String(formData.get("roleBn") ?? "").trim(), organizationEn: String(formData.get("organizationEn") ?? "").trim(), organizationBn: String(formData.get("organizationBn") ?? "").trim(), photoUrl: String(formData.get("photoUrl") ?? "").trim(), isFeatured: formData.get("isFeatured") === "on", isPublished: formData.get("isPublished") === "on", sortOrder: formData.get("sortOrder") ?? "0" }); }
function revalidateAlumni() { revalidatePath("/admin/alumni"); revalidatePath("/en/alumni"); revalidatePath("/bn/alumni"); revalidatePath("/en"); revalidatePath("/bn"); }
export async function createAlumniAction(formData: FormData) { const actor = await requireAdmin(); const data = parseForm(formData); const alumni = await prisma.alumniMessage.create({ data }); await logAudit({ userId: actor.id, actorLabel: actor.email, action: "CREATE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: alumni.id }); revalidateAlumni(); redirect("/admin/alumni"); }
export async function updateAlumniAction(id: string, formData: FormData) { const actor = await requireAdmin(); const data = parseForm(formData); await prisma.alumniMessage.update({ where: { id }, data }); await logAudit({ userId: actor.id, actorLabel: actor.email, action: "UPDATE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: id }); revalidateAlumni(); redirect("/admin/alumni"); }
export async function deleteAlumniAction(formData: FormData) { const actor = await requireAdmin(); const id = String(formData.get("id") ?? ""); await prisma.alumniMessage.delete({ where: { id } }); await logAudit({ userId: actor.id, actorLabel: actor.email, action: "DELETE_ALUMNI_MESSAGE", targetType: "AlumniMessage", targetId: id }); revalidateAlumni(); }
