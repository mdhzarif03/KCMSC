import { prisma } from "@/lib/db";
import { logAudit } from "@/lib/audit";

/** Legacy compatibility: applications are no longer assigned to individual officers.
 * Every active admission officer can access every submitted application.
 */
export async function routeUnassignedApplications() {
  return 0;
}

/** Removes an admission officer without deleting applications or review history. */
export async function removeOfficerAccount(params: { officerId: string; actorId: string; actorLabel: string }) {
  const officer = await prisma.user.findUnique({ where: { id: params.officerId } });
  if (!officer || officer.role !== "ADMISSION_OFFICER") throw new Error("Not an admission officer account.");

  await logAudit({ userId: params.actorId, actorLabel: params.actorLabel, action: "REMOVE_OFFICER", targetType: "User", targetId: `${officer.id} (${officer.email})` });
  await prisma.user.delete({ where: { id: officer.id } });

}
