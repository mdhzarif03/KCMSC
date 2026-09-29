"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getActiveCycle } from "@/lib/admissions";
import { generateReferenceCode } from "@/lib/reference-code";
import type { Locale } from "@/i18n/config";

const applicationSchema = z.object({
  applicantName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  applyingClass: z.string().min(1),
  previousInstitution: z.string().optional(),
  guardianName: z.string().min(1),
  guardianRelationship: z.string().min(1),
  guardianPhone: z.string().min(6),
  guardianEmail: z.string().email().optional().or(z.literal("")),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  declarationAccepted: z.literal("on", {
    message: "You must accept the declaration to submit."
  })
});

export async function createApplicationAction(locale: Locale, formData: FormData) {
  const activeCycle = await getActiveCycle();
  if (!activeCycle) {
    redirect(`/${locale}/admissions/apply?error=closed`);
  }

  const parsed = applicationSchema.safeParse({
    applicantName: formData.get("applicantName"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    applyingClass: formData.get("applyingClass"),
    previousInstitution: formData.get("previousInstitution") || undefined,
    guardianName: formData.get("guardianName"),
    guardianRelationship: formData.get("guardianRelationship"),
    guardianPhone: formData.get("guardianPhone"),
    guardianEmail: formData.get("guardianEmail") || "",
    presentAddress: formData.get("presentAddress"),
    permanentAddress: formData.get("permanentAddress"),
    declarationAccepted: formData.get("declarationAccepted")
  });

  if (!parsed.success) {
    redirect(`/${locale}/admissions/apply?error=invalid`);
  }

  const data = parsed.data;
  const referenceCode = generateReferenceCode();

  await prisma.admissionApplication.create({
    data: {
      referenceCode,
      cycleId: activeCycle.id,
      status: "UNASSIGNED",
      applicantName: data.applicantName,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      applyingClass: data.applyingClass,
      previousInstitution: data.previousInstitution || null,
      guardianName: data.guardianName,
      guardianRelationship: data.guardianRelationship,
      guardianPhone: data.guardianPhone,
      guardianEmail: data.guardianEmail || null,
      presentAddress: data.presentAddress,
      permanentAddress: data.permanentAddress,
      declarationAccepted: true
    }
  });

  redirect(`/${locale}/admissions/success?ref=${encodeURIComponent(referenceCode)}`);
}
