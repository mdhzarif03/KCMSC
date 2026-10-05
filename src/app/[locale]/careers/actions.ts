"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const applicationSchema = z.object({
  careerId: z.string().min(1),
  locale: z.enum(["en", "bn"]),
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
  qualification: z.string().trim().optional(),
  experience: z.string().trim().optional(),
  coverLetter: z.string().trim().max(5000).optional(),
});

export async function applyForCareerAction(formData: FormData) {
  const parsed = applicationSchema.safeParse({
    careerId: formData.get("careerId"),
    locale: formData.get("locale"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    qualification: formData.get("qualification") || undefined,
    experience: formData.get("experience") || undefined,
    coverLetter: formData.get("coverLetter") || undefined,
  });

  const locale = formData.get("locale") === "bn" ? "bn" : "en";

  if (!parsed.success) {
    redirect(`/${locale}/careers?error=invalid`);
  }

  const {
    careerId,
    fullName,
    email,
    phone,
    qualification,
    experience,
    coverLetter,
  } = parsed.data;

  const career = await prisma.career.findFirst({
    where: {
      id: careerId,
      isPublished: true,
    },
  });

  if (!career) {
    redirect(`/${locale}/careers?error=closed`);
  }

  if (career.deadline) {
    const deadline = new Date(career.deadline);

    // Treat the selected deadline date as valid until the end
    // of that calendar day.
    deadline.setUTCHours(23, 59, 59, 999);

    if (new Date() > deadline) {
      redirect(`/${locale}/careers?error=closed`);
    }
  }

  await prisma.careerApplication.create({
    data: {
      careerId,
      fullName,
      email,
      phone,
      qualification: qualification || null,
      experience: experience || null,
      coverLetter: coverLetter || null,
    },
  });

  revalidatePath(`/${locale}/careers`);
  revalidatePath("/admin/careers");

  redirect(`/${locale}/careers?applied=1`);
}
