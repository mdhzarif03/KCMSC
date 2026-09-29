"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { APPLICATION_STATUSES } from "@/lib/admissions";

/**
 * Claiming is a single conditional UPDATE (assignedOfficerId must still
 * be NULL). If two officers click "claim" at the same instant, the
 * database lets exactly one win — the other sees count === 0 and is told
 * who has it. This is what prevents duplicate/conflicting work (brief §20).
 */
export async function claimApplicationAction(formData: FormData) {
  const officer = await requireOfficer();
  const id = String(formData.get("id") ?? "");

  const result = await prisma.admissionApplication.updateMany({
    where: { id, assignedOfficerId: null },
    data: { assignedOfficerId: officer.id, status: "ASSIGNED" }
  });

  if (result.count === 0) {
    redirect(`/officer/applications/${id}?error=already_assigned`);
  }

  await logAudit({
    userId: officer.id,
    actorLabel: officer.email,
    action: "CLAIM_APPLICATION",
    targetType: "AdmissionApplication",
    targetId: id
  });

  revalidatePath("/officer/applications");
  redirect(`/officer/applications/${id}`);
}

export async function releaseApplicationAction(formData: FormData) {
  const officer = await requireOfficer();
  const id = String(formData.get("id") ?? "");

  // Only the current holder may release it.
  const result = await prisma.admissionApplication.updateMany({
    where: { id, assignedOfficerId: officer.id },
    data: { assignedOfficerId: null, status: "UNASSIGNED" }
  });
  if (result.count === 0) {
    redirect(`/officer/applications/${id}?error=not_yours`);
  }

  await logAudit({
    userId: officer.id,
    actorLabel: officer.email,
    action: "RELEASE_APPLICATION",
    targetType: "AdmissionApplication",
    targetId: id
  });

  revalidatePath("/officer/applications");
  redirect("/officer/applications");
}

const reviewSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),
  internalNote: z.string().min(1, "An internal note is required."),
  applicantMessage: z.string().optional()
});

export async function submitReviewAction(id: string, formData: FormData) {
  const officer = await requireOfficer();

  const application = await prisma.admissionApplication.findUnique({ where: { id } });
  if (!application) redirect("/officer/applications");

  // Server-side ownership check: only the officer holding the application
  // can change it. Never rely on the UI hiding the form.
  if (application.assignedOfficerId !== officer.id) {
    redirect(`/officer/applications/${id}?error=not_yours`);
  }

  const parsed = reviewSchema.safeParse({
    status: formData.get("status"),
    internalNote: String(formData.get("internalNote") ?? "").trim(),
    applicantMessage: String(formData.get("applicantMessage") ?? "").trim() || undefined
  });
  if (!parsed.success || parsed.data.status === "UNASSIGNED") {
    // UNASSIGNED is only reachable via "release", not via a review.
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
