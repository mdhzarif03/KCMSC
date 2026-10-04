"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/password";
import { canDeleteAccount } from "@/lib/auth";
import { removeOfficerAccount } from "@/lib/officers";
import { logAudit } from "@/lib/audit";

function weak(password: string) {
  return password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password);
}

export async function changeOwnOfficerPasswordAction(formData: FormData) {
  const officer = await requireOfficer();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const target = await prisma.user.findUnique({ where: { id: officer.id } });
  if (!target) redirect("/officer/settings?error=not_found");
  if (!(await verifyPassword(currentPassword, target.passwordHash))) redirect("/officer/settings?error=wrong_current_password");
  if (weak(password)) redirect("/officer/settings?error=weak_password");
  if (password !== confirmPassword) redirect("/officer/settings?error=password_mismatch");

  await prisma.user.update({ where: { id: officer.id }, data: { passwordHash: await hashPassword(password) } });
  await logAudit({ userId: officer.id, actorLabel: officer.email, action: "CHANGE_OWN_PASSWORD", targetType: "User", targetId: officer.id });
  redirect("/officer/settings?changed=1");
}

export async function deleteOwnOfficerAccountAction(formData: FormData) {
  const officer = await requireOfficer();
  const targetId = String(formData.get("userId") ?? "");
  if (!canDeleteAccount(officer, targetId)) throw new Error("You can only delete your own account.");
  await removeOfficerAccount({ officerId: officer.id, actorId: officer.id, actorLabel: officer.email });
  redirect("/admin/login");
}
