"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { APPLICATION_STATUSES } from "@/lib/admissions";

const reviewSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),
  internalNote: z.string().min(1, "An internal note is required."),
  applicantMessage: z.string().optional()
});

export async function submitReviewAction(id: string, formData: FormData) {
  const officer = await requireOfficer();

  const application = await prisma.admissionApplication.findUnique({ where: { id } });
  if (!application) redirect("/officer/applications");

  const parsed = reviewSchema.safeParse({
    status: formData.get("status"),
    internalNote: String(formData.get("internalNote") ?? "").trim(),
    applicantMessage: String(formData.get("applicantMessage") ?? "").trim() || undefined
  });
  if (!parsed.success || parsed.data.status === "UNASSIGNED") {
    redirect(`/officer/applications/${id}?error=invalid`);
  }

  const { status, internalNote, applicantMessage } = parsed.data;

  await prisma.$transaction([
    prisma.admissionReview.create({
      data: {
        applicationId: id,
        officerId: officer.id,
        internalNote,
        applicantMessage: applicantMessage ?? null,
        statusAtReview: status
      }
    }),
    prisma.admissionApplication.update({ where: { id }, data: { status } })
  ]);

  await logAudit({
    userId: officer.id,
    actorLabel: officer.email,
    action: `REVIEW_${status}`,
    targetType: "AdmissionApplication",
    targetId: id
  });

  revalidatePath(`/officer/applications/${id}`);
  revalidatePath("/officer/applications");
  redirect(`/officer/applications/${id}?saved=1`);
}
