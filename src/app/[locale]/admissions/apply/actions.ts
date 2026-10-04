"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCycleById } from "@/lib/admissions";
import type { Locale } from "@/i18n/config";
import { createApplicationDownloadToken } from "@/lib/admission-download";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const phonePattern = /^\+880-1\d-\d{4}-\d{4}$/;

const guardianSchema = z
  .object({
    name: z.string().trim().min(1),
    relationship: z.string().trim().min(1),
    nidNumber: z.string().trim().min(1),
    contactNumber: z.string(),
    occupation: z.string().trim().min(1),
    nationality: z.string().trim().min(1),
    isAlive: z.boolean(),
  })
  .superRefine((guardian, ctx) => {
    if (guardian.isAlive && !phonePattern.test(guardian.contactNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["contactNumber"], message: "Invalid Bangladesh phone number" });
    }
  });

const schema = z.object({
  declarationAccepted: z.literal(true),
  fullName: z.string().trim().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  nationality: z.string().min(1),
  medium: z.enum(["Bangla Version", "English Version"]),
  applyingClass: z.string().min(1),
  previousInstitution: z.string().optional().default(""),
  birthRegistrationNo: z.string().regex(/^\d{17}$/, "Birth registration number must contain exactly 17 digits"),
  fatherName: z.string().trim().min(1),
  fatherNidNumber: z.string().trim().min(1),
  fatherContactNumber: z.string(),
  fatherOccupation: z.string().trim().min(1),
  fatherNationality: z.string().min(1),
  fatherIsAlive: z.boolean(),
  motherName: z.string().trim().min(1),
  motherNidNumber: z.string().trim().min(1),
  motherContactNumber: z.string(),
  motherOccupation: z.string().trim().min(1),
  motherNationality: z.string().min(1),
  motherIsAlive: z.boolean(),
  presentAddress: z.string().trim().min(1),
  permanentAddress: z.string().trim().min(1),
  guardians: z.array(guardianSchema).max(10),
});

function invalid(locale: Locale, cycleId: string): never {
  redirect(`/${locale}/admissions/apply/${encodeURIComponent(cycleId)}?error=invalid`);
}

export async function createApplicationAction(locale: Locale, cycleId: string, formData: FormData) {
  const cycle = await getCycleById(cycleId);
  const now = new Date();

  if (!cycle || now < cycle.opensAt || now > cycle.closesAt) {
    redirect(`/${locale}/admissions/apply/${encodeURIComponent(cycleId)}?error=closed`);
  }

  const certificate = formData.get("certificate");
  const guardiansRaw = String(formData.get("guardiansJson") ?? "[]");

  let guardians: unknown;
  try {
    guardians = JSON.parse(guardiansRaw);
  } catch {
    invalid(locale, cycleId);
  }

  const parsed = schema.safeParse({
    declarationAccepted: formData.get("declarationAccepted") === "on",
    fullName: formData.get("fullName"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    nationality: formData.get("nationality"),
    medium: formData.get("medium"),
    applyingClass: formData.get("applyingClass"),
    previousInstitution: formData.get("previousInstitution"),
    birthRegistrationNo: formData.get("birthRegistrationNo"),
    fatherName: formData.get("fatherName"),
    fatherNidNumber: formData.get("fatherNidNumber"),
    fatherContactNumber: String(formData.get("fatherContactNumber") ?? ""),
    fatherOccupation: formData.get("fatherOccupation"),
    fatherNationality: formData.get("fatherNationality"),
    fatherIsAlive: formData.get("fatherIsAlive") === "on",
    motherName: formData.get("motherName"),
    motherNidNumber: formData.get("motherNidNumber"),
    motherContactNumber: String(formData.get("motherContactNumber") ?? ""),
    motherOccupation: formData.get("motherOccupation"),
    motherNationality: formData.get("motherNationality"),
    motherIsAlive: formData.get("motherIsAlive") === "on",
    presentAddress: formData.get("presentAddress"),
    permanentAddress: formData.get("permanentAddress"),
    guardians,
  });

  if (!parsed.success || !(certificate instanceof File) || certificate.size === 0 || certificate.size > 5 * 1024 * 1024) {
    invalid(locale, cycleId);
  }

  if (!parsed.data.fatherIsAlive && parsed.data.fatherContactNumber) parsed.data.fatherContactNumber = "";
  if (!parsed.data.motherIsAlive && parsed.data.motherContactNumber) parsed.data.motherContactNumber = "";

  if (parsed.data.fatherIsAlive && !phonePattern.test(parsed.data.fatherContactNumber)) invalid(locale, cycleId);
  if (parsed.data.motherIsAlive && !phonePattern.test(parsed.data.motherContactNumber)) invalid(locale, cycleId);

  if (!['application/pdf', 'image/jpeg', 'image/png'].includes(certificate.type)) invalid(locale, cycleId);

  const data = parsed.data;
  const buffer = Buffer.from(await certificate.arrayBuffer());

  // Keep large certificate binaries out of the Neon/Postgres row. On the
  // Node/Hostinger deployment the application filesystem is persistent, and
  // this makes the database submission dramatically faster.
  const app = await prisma.admissionApplication.create({
    data: {
      cycleId: cycle.id,
      fullName: data.fullName,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      nationality: data.nationality,
      medium: data.medium,
      applyingClass: data.applyingClass,
      previousInstitution: data.previousInstitution ?? "",
      birthRegistrationNo: data.birthRegistrationNo,
      certificateData: null,
      certificateName: certificate.name,
      certificateMimeType: certificate.type,
      fatherName: data.fatherName,
      fatherNidNumber: data.fatherNidNumber,
      fatherContactNumber: data.fatherContactNumber,
      fatherOccupation: data.fatherOccupation,
      fatherNationality: data.fatherNationality,
      fatherIsAlive: data.fatherIsAlive,
      motherName: data.motherName,
      motherNidNumber: data.motherNidNumber,
      motherContactNumber: data.motherContactNumber,
      motherOccupation: data.motherOccupation,
      motherNationality: data.motherNationality,
      motherIsAlive: data.motherIsAlive,
      presentAddress: data.presentAddress,
      permanentAddress: data.permanentAddress,
      guardians: { create: data.guardians },
      status: "UNASSIGNED",
    }
  });

  const extension = certificate.type === "application/pdf" ? "pdf" : certificate.type === "image/png" ? "png" : "jpg";
  const uploadDirectory = path.join(process.cwd(), "storage", "admissions");
  const certificatePath = path.join(uploadDirectory, `${app.id}.${extension}`);

  try {
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(certificatePath, buffer);
  } catch (error) {
    console.error("Admission certificate storage failed", error);
    await prisma.admissionApplication.delete({ where: { id: app.id } }).catch(() => undefined);
    invalid(locale, cycleId);
  }

  const downloadToken = createApplicationDownloadToken(app.id);
  redirect(`/${locale}/admissions/success?application=${encodeURIComponent(app.id)}&download=${encodeURIComponent(downloadToken)}`);
}
