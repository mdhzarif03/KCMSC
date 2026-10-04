"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin, getCurrentAdmin } from "@/lib/session";
import { hashPassword } from "@/lib/password";
import { canDeleteAccount } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function passwordError(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }
  return null;
}

export async function createAdminAction(formData: FormData) {
  const actor = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name) redirect("/admin/administrators?error=invalid_name");
  if (!validEmail(email)) redirect("/admin/administrators?error=invalid_email");
  const passwordIssue = passwordError(password);
  if (passwordIssue) redirect("/admin/administrators?error=weak_password");
  if (password !== confirmPassword) redirect("/admin/administrators?error=password_mismatch");

  if (await prisma.user.findUnique({ where: { email } })) {
    redirect("/admin/administrators?error=already_exists");
  }

  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password), role: "ADMIN" }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CREATE_ADMIN",
    targetType: "User",
    targetId: `${user.id} (${user.email})`
  });

  revalidatePath("/admin/administrators");
  redirect("/admin/administrators?created=admin");
}

export async function resetAdminPasswordAction(formData: FormData) {
  const actor = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const passwordIssue = passwordError(password);
  if (passwordIssue) redirect("/admin/administrators?error=weak_password");
  if (password !== confirmPassword) redirect("/admin/administrators?error=password_mismatch");

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || target.role !== "ADMIN") redirect("/admin/administrators?error=not_found");

  await prisma.user.update({
    where: { id: target.id },
    data: { passwordHash: await hashPassword(password) }
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "RESET_ADMIN_PASSWORD",
    targetType: "User",
    targetId: `${target.id} (${target.email})`
  });

  revalidatePath("/admin/administrators");
  redirect("/admin/administrators?reset=1");
}

export async function changeOwnAdminPasswordAction(formData: FormData) {
  const actor = await requireAdmin();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const { verifyPassword } = await import("@/lib/password");

  const target = await prisma.user.findUnique({ where: { id: actor.id } });
  if (!target) redirect("/admin/settings?error=not_found");
  if (!(await verifyPassword(currentPassword, target.passwordHash))) {
    redirect("/admin/settings?error=wrong_current_password");
  }

  const passwordIssue = passwordError(password);
  if (passwordIssue) redirect("/admin/settings?error=weak_password");
  if (password !== confirmPassword) redirect("/admin/settings?error=password_mismatch");

  await prisma.user.update({ where: { id: actor.id }, data: { passwordHash: await hashPassword(password) } });
  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "CHANGE_OWN_PASSWORD",
    targetType: "User",
    targetId: actor.id
  });

  revalidatePath("/admin/settings");
  redirect("/admin/settings?changed=1");
}

export async function deleteOwnAdminAccountAction(formData: FormData) {
  const actor = await requireAdmin();
  const targetId = String(formData.get("userId") ?? "");

  if (!canDeleteAccount(actor, targetId)) {
    throw new Error("You can only delete your own administrator account.");
  }

  const remainingAdmins = await prisma.user.count({ where: { role: "ADMIN" } });
  if (remainingAdmins <= 1) {
    redirect("/admin/administrators?error=last_admin");
  }

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "SELF_DELETE_ADMIN",
    targetType: "User",
    targetId: actor.id
  });

  await prisma.user.delete({ where: { id: targetId } });
  redirect("/admin/login");
}

export async function getAdministratorsData() {
  const currentAdmin = await getCurrentAdmin();
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, createdAt: true }
  });
  return { currentAdmin, admins };
}
