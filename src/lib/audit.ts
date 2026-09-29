import { prisma } from "@/lib/db";

/**
 * Append-only by convention: nothing in the admin UI updates or deletes
 * AuditLog rows. actorLabel is stored redundantly alongside userId so the
 * log stays human-readable even after a user account is later removed
 * (User.auditLogs uses onDelete: SetNull — see prisma/schema.prisma).
 */
export async function logAudit(params: {
  userId: string | null;
  actorLabel: string;
  action: string;
  targetType: string;
  targetId: string;
}) {
  await prisma.auditLog.create({ data: params });
}
