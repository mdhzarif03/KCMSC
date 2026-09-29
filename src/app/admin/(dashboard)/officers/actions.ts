"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { createInvitation } from "@/lib/invitation";
import { removeOfficerAccount } from "@/lib/officers";
import { logAudit } from "@/lib/audit";

export async function inviteOfficerAction(formData: FormData) {
  const actor = await requireAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) redirect("/admin/officers?error=invalid_email");
  if (await prisma.user.findUnique({ where: { email } })) {
    redirect("/admin/officers?error=already_exists");
  }

  const { rawToken, expiresAt } = await createInvitation({
    email,
    role: "ADMISSION_OFFICER",
    createdById: actor.id
  });

  await logAudit({
    userId: actor.id,
    actorLabel: actor.email,
    action: "INVITE_OFFICER",
    targetType: "AccountInvitation",
    targetId: email
  });

  const link = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/accept-invite?token=${rawToken}`;
  revalidatePath("/admin/officers");
  redirect(
    `/admin/officers?invited=${encodeURIComponent(email)}&link=${encodeURIComponent(
      link
    )}&expires=${encodeURIComponent(expiresAt.toISOString())}`
  );
}

// Unlike admin accounts (self-delete only), admins CAN remove officer
// accounts — brief §21. Requires ADMIN server-side; the officer's
// applications and history are preserved by removeOfficerAccount().
export async function removeOfficerAction(formData: FormData) {
  const actor = await requireAdmin();
  const officerId = String(formData.get("userId") ?? "");
  await removeOfficerAccount({ officerId, actorId: actor.id, actorLabel: actor.email });
  revalidatePath("/admin/officers");
  redirect("/admin/officers?removed=1");
}
