import { prisma } from "@/lib/db";
import { logAudit } from "@/lib/audit";

/**
 * Removes an admission officer's account WITHOUT deleting any admission
 * records (brief §21/§43). Applications, reviews and audit rows all
 * reference the user with onDelete: SetNull, so they survive. Before the
 * delete we also release any still-in-progress applications back to the
 * unassigned pool so nothing is left "assigned" to nobody; finished ones
 * (eligible / not eligible / exam / final) keep their status.
 */
export async function removeOfficerAccount(params: {
  officerId: string;
  actorId: string;
  actorLabel: string;
}) {
  const officer = await prisma.user.findUnique({ where: { id: params.officerId } });
  if (!officer || officer.role !== "ADMISSION_OFFICER") {
    throw new Error("Not an admission officer account.");
  }

  await logAudit({
    userId: params.actorId,
    actorLabel: params.actorLabel,
    action: "REMOVE_OFFICER",
    targetType: "User",
    targetId: `${officer.id} (${officer.email})`
  });

  await prisma.$transaction([
    prisma.admissionApplication.updateMany({
      where: {
        assignedOfficerId: officer.id,
        status: { in: ["ASSIGNED", "UNDER_REVIEW", "AWAITING_APPLICANT"] }
      },
      data: { status: "UNASSIGNED", assignedOfficerId: null }
    }),
    prisma.user.delete({ where: { id: officer.id } })
  ]);
}
