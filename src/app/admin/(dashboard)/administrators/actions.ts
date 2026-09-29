"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin, getCurrentAdmin } from "@/lib/session";
import { createInvitation } from "@/lib/invitation";
import { canDeleteAccount } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function inviteAdminAction(formData: FormData) {
  const actor = await requireAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    redirect("/admin/administrators?error=invalid_email");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect("/admin/administrators?error=already_exists");
  }

  const { rawToken, expiresAt } = await createInvitation({
    email,
    role: "ADMIN",
    createdById: actor.id
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "INVITE_ADMIN",
    targetType: "AccountInvitation",
    targetId: email
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const link = `${appUrl}/admin/accept-invite?token=${rawToken}`;

  revalidatePath("/admin/administrators");
  // No email provider is configured yet (see README) — the invite link
  // is surfaced back to the inviting admin to copy and send manually.
  redirect(
    `/admin/administrators?invited=${encodeURIComponent(email)}&link=${encodeURIComponent(
      link
    )}&expires=${encodeURIComponent(expiresAt.toISOString())}`
  );
}

/**
 * Enforces brief §22 server-side: an admin may delete ONLY their own
 * account. This check happens here, not just by hiding the button for
 * other rows in the UI — canDeleteAccount() is the single source of
 * truth shared with src/lib/auth.ts.
 */
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
    userId: actor.id, // still exists at this point; onDelete: SetNull nulls it once the row below is removed
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
    orderBy: { createdAt: "asc" }
  });
  const pendingInvitations = await prisma.accountInvitation.findMany({
    where: { role: "ADMIN", acceptedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" }
  });
  return { currentAdmin, admins, pendingInvitations };
}
