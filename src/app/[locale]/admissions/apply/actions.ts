"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCycleById } from "@/lib/admissions";
import type { Locale } from "@/i18n/config";
import { createApplicationDownloadToken } from "@/lib/admission-download";

const guardianSchema = z.object({ name:z.string().min(1), relationship:z.string().min(1), nidNumber:z.string().min(1), contactNumber:z.string().min(1), occupation:z.string().min(1), nationality:z.string().min(1), isAlive:z.boolean() });
const schema = z.object({ fullName:z.string().min(1), dateOfBirth:z.string().min(1), gender:z.string().min(1), nationality:z.string().min(1), medium:z.enum(["Bangla Version","English Version"]), applyingClass:z.string().min(1), previousInstitution:z.string().min(1), birthRegistrationNo:z.string().min(1), fatherName:z.string().min(1), fatherNidNumber:z.string().min(1), fatherContactNumber:z.string(), fatherOccupation:z.string().min(1), fatherNationality:z.string().min(1), fatherIsAlive:z.boolean(), motherName:z.string().min(1), motherNidNumber:z.string().min(1), motherContactNumber:z.string(), motherOccupation:z.string().min(1), motherNationality:z.string().min(1), motherIsAlive:z.boolean(), presentAddress:z.string().min(1), permanentAddress:z.string().min(1), guardians:z.array(guardianSchema).max(10) });

export async function createApplicationAction(locale: Locale, cycleId: string, formData: FormData) {
  const cycle = await getCycleById(cycleId);
  const now = new Date();
  if (!cycle || now < cycle.opensAt || now > cycle.closesAt) redirect(`/${locale}/admissions/apply/${encodeURIComponent(cycleId)}?error=closed`);

  const certificate = formData.get("certificate");
  const guardiansRaw = String(formData.get("guardiansJson") ?? "[]");
  let guardians: unknown = [];
  try { guardians = JSON.parse(guardiansRaw); } catch { redirect(`/${locale}/admissions/apply/${encodeURIComponent(cycleId)}?error=invalid`); }
  const parsed = schema.safeParse({
    fullName:formData.get("fullName"), dateOfBirth:formData.get("dateOfBirth"), gender:formData.get("gender"), nationality:formData.get("nationality"), medium:formData.get("medium"), applyingClass:formData.get("applyingClass"), previousInstitution:formData.get("previousInstitution"), birthRegistrationNo:formData.get("birthRegistrationNo"),
    fatherName:formData.get("fatherName"), fatherNidNumber:formData.get("fatherNidNumber"), fatherContactNumber:String(formData.get("fatherContactNumber")??""), fatherOccupation:formData.get("fatherOccupation"), fatherNationality:formData.get("fatherNationality"), fatherIsAlive:formData.get("fatherIsAlive") === "on",
    motherName:formData.get("motherName"), motherNidNumber:formData.get("motherNidNumber"), motherContactNumber:String(formData.get("motherContactNumber")??""), motherOccupation:formData.get("motherOccupation"), motherNationality:formData.get("motherNationality"), motherIsAlive:formData.get("motherIsAlive") === "on",
    presentAddress:formData.get("presentAddress"), permanentAddress:formData.get("permanentAddress"), guardians
  });
  if (!parsed.success || !(certificate instanceof File) || certificate.size === 0 || certificate.size > 5*1024*1024 || !["application/pdf","image/jpeg","image/png"].includes(certificate.type)) redirect(`/${locale}/admissions/apply/${encodeURIComponent(cycleId)}?error=invalid`);

  const data = parsed.data; const buffer = Buffer.from(await certificate.arrayBuffer());
  const app = await prisma.admissionApplication.create({ data: { cycleId:cycle.id, fullName:data.fullName, dateOfBirth:new Date(data.dateOfBirth), gender:data.gender, nationality:data.nationality, medium:data.medium, applyingClass:data.applyingClass, previousInstitution:data.previousInstitution, birthRegistrationNo:data.birthRegistrationNo, certificateData:buffer, certificateName:certificate.name, certificateMimeType:certificate.type, fatherName:data.fatherName, fatherNidNumber:data.fatherNidNumber, fatherContactNumber:data.fatherContactNumber, fatherOccupation:data.fatherOccupation, fatherNationality:data.fatherNationality, fatherIsAlive:data.fatherIsAlive, motherName:data.motherName, motherNidNumber:data.motherNidNumber, motherContactNumber:data.motherContactNumber, motherOccupation:data.motherOccupation, motherNationality:data.motherNationality, motherIsAlive:data.motherIsAlive, presentAddress:data.presentAddress, permanentAddress:data.permanentAddress, guardians:{ create:data.guardians } } });
  const downloadToken = createApplicationDownloadToken(app.id);
  redirect(`/${locale}/admissions/success?application=${encodeURIComponent(app.id)}&download=${encodeURIComponent(downloadToken)}`);
}
