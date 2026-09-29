"use server";

import { redirect } from "next/navigation";
import { requireOfficer } from "@/lib/session";
import { canDeleteAccount } from "@/lib/auth";
import { removeOfficerAccount } from "@/lib/officers";

// Officers may leave the system voluntarily (brief §21). Their
// applications, reviews and audit history all remain.
export async function deleteOwnOfficerAccountAction(formData: FormData) {
  const officer = await requireOfficer();
  const targetId = String(formData.get("userId") ?? "");

  if (!canDeleteAccount(officer, targetId)) {
    throw new Error("You can only delete your own account.");
  }

  await removeOfficerAccount({
    officerId: officer.id,
    actorId: officer.id,
    actorLabel: officer.email
  });

  redirect("/admin/login");
}
