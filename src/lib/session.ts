import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/officer");
  }

  return session.user;
}

/**
 * Both ADMIN and ADMISSION_OFFICER can use the complete
 * admissions workflow.
 *
 * This includes:
 * - Applications
 * - Applicant details
 * - Application PDFs
 * - Certificates
 * - Application status
 * - Reviews
 * - Admission cycles
 */
export async function requireAdmissionsStaff() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "ADMISSION_OFFICER"
  ) {
    redirect("/admin/login");
  }

  return session.user;
}

export async function requireOfficer() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMISSION_OFFICER") {
    redirect("/admin");
  }

  return session.user;
}

export async function getCurrentAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return session.user;
}

/**
 * Used by admission APIs.
 * Both administrators and admission officers are allowed.
 */
export async function getCurrentAdmissionsStaff() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    (session.user.role !== "ADMIN" && session.user.role !== "ADMISSION_OFFICER")
  ) {
    return null;
  }

  return session.user;
}

export async function getCurrentOfficer() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMISSION_OFFICER") {
    return null;
  }

  return session.user;
}
