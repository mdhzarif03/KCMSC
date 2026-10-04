"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { hashPassword } from "@/lib/password";
import { removeOfficerAccount } from "@/lib/officers";
import { logAudit } from "@/lib/audit";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function passwordIssue(password: string) {
  if (password.length < 8) return true;
  return !/[A-Za-z]/.test(password) || !/[0-9]/.test(password);
}

export async function createOfficerAction(formData: FormData) {
  const actor = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name) redirect("/admin/officers?error=invalid_name");
  if (!validEmail(email)) redirect("/admin/officers?error=invalid_email");
  if (passwordIssue(password)) redirect("/admin/officers?error=weak_password");
  if (password !== confirmPassword) redirect("/admin/officers?error=password_mismatch");
  if (await prisma.user.findUnique({ where: { email } })) redirect("/admin/officers?error=already_exists");

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      role: "ADMISSION_OFFICER"
    }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_OFFICER",
    targetType: "User",
    targetId: `${user.id} (${user.email})`
  });

  revalidatePath("/admin/officers");
  redirect("/admin/officers?created=1");
}

export async function resetOfficerPasswordAction(formData: FormData) {
  const actor = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (passwordIssue(password)) redirect("/admin/officers?error=weak_password");
  if (password !== confirmPassword) redirect("/admin/officers?error=password_mismatch");

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || target.role !== "ADMISSION_OFFICER") redirect("/admin/officers?error=not_found");

  await prisma.user.update({ where: { id: target.id }, data: { passwordHash: await hashPassword(password) } });
  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "RESET_OFFICER_PASSWORD",
    targetType: "User",
    targetId: `${target.id} (${target.email})`
  });

  revalidatePath("/admin/officers");
  redirect("/admin/officers?reset=1");
}

export async function removeOfficerAction(formData: FormData) {
  const actor = await requireAdmin();
  const officerId = String(formData.get("userId") ?? "");
  await removeOfficerAccount({ officerId, actorId: actor.id, actorLabel: actor.email });
  revalidatePath("/admin/officers");
  redirect("/admin/officers?removed=1");
}
