import { prisma } from "@/lib/db";

/** An admission cycle is running only while the current instant is inside its configured window. */
export async function getActiveCycle() {
  const now = new Date();
  return prisma.admissionCycle.findFirst({
    where: { opensAt: { lte: now }, closesAt: { gte: now } },
    orderBy: { opensAt: "desc" }
  });
}

export const APPLICATION_STATUSES = [
  "UNASSIGNED", "ASSIGNED", "UNDER_REVIEW", "AWAITING_APPLICANT", "ELIGIBLE", "NOT_ELIGIBLE", "EXAM_ELIGIBLE", "EXAM_COMPLETED", "FINAL_DECISION"
] as const;
export type ApplicationStatusValue = (typeof APPLICATION_STATUSES)[number];

export async function getActiveCycleSafe() {
  try { return await getActiveCycle(); } catch { return null; }
}
