"use server";

import { redirect } from "next/navigation";
import { acceptInvitation } from "@/lib/invitation";

export async function acceptInviteAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!token || !name || !password) {
    redirect(`/admin/accept-invite?token=${token}&error=missing_fields`);
  }
  if (password !== confirmPassword) {
    redirect(`/admin/accept-invite?token=${token}&error=password_mismatch`);
  }
  if (password.length < 10) {
    redirect(`/admin/accept-invite?token=${token}&error=password_too_short`);
  }

  try {
    await acceptInvitation({ rawToken: token, name, password });
  } catch {
    redirect(`/admin/accept-invite?token=${token}&error=invalid_invitation`);
  }

  redirect("/admin/login?setup=complete");
}
