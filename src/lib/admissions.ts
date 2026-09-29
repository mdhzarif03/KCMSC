import { prisma } from "@/lib/db";

/**
 * A cycle is "open" only when an admin has marked it active AND today
 * falls within its configured window — flipping isActive alone isn't
 * enough to reopen a cycle whose dates have already passed, and vice
 * versa a date-valid cycle stays closed until an admin actually
 * activates it.
 */
export async function getActiveCycle() {
  const now = new Date();
  return prisma.admissionCycle.findFirst({
    where: { isActive: true, opensAt: { lte: now }, closesAt: { gte: now } },
    orderBy: { opensAt: "desc" }
  });
}

export const APPLICATION_STATUSES = [
  "UNASSIGNED",
  "ASSIGNED",
  "UNDER_REVIEW",
  "AWAITING_APPLICANT",
  "ELIGIBLE",
  "NOT_ELIGIBLE",
  "EXAM_ELIGIBLE",
  "EXAM_COMPLETED",
  "FINAL_DECISION"
] as const;

export type ApplicationStatusValue = (typeof APPLICATION_STATUSES)[number];

/**
 * Same as getActiveCycle, but treats an unreachable database as "no open
 * cycle" so the public pages degrade to the closed message instead of a 500.
 */
export async function getActiveCycleSafe() {
  try {
    return await getActiveCycle();
  } catch {
    return null;
  }
}
