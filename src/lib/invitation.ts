import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import type { Role } from "@prisma/client";

const INVITATION_TTL_HOURS = 72;

function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Creates an invitation and returns the raw, one-time token.
 * The raw token is NEVER stored — only its hash is. The caller is
 * responsible for delivering the raw token to the invitee (currently:
 * displaying the accept-invite URL in the admin UI, since no transactional
 * email provider is configured yet — see README "Not yet built").
 */
export async function createInvitation(params: {
  email: string;
  role: Role;
  createdById: string | null;
}) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + INVITATION_TTL_HOURS * 60 * 60 * 1000);

  await prisma.accountInvitation.create({
    data: {
      email: params.email.toLowerCase().trim(),
      role: params.role,
      tokenHash,
      expiresAt,
      createdById: params.createdById
    }
  });

  return { rawToken, expiresAt };
}

export type InvitationLookupResult =
  | { valid: true; email: string; role: Role; invitationId: string }
  | { valid: false; reason: "not_found" | "expired" | "used" };

export async function lookupInvitation(rawToken: string): Promise<InvitationLookupResult> {
  const tokenHash = hashToken(rawToken);
  const invitation = await prisma.accountInvitation.findUnique({ where: { tokenHash } });

  if (!invitation) return { valid: false, reason: "not_found" };
  if (invitation.acceptedAt) return { valid: false, reason: "used" };
  if (invitation.expiresAt < new Date()) return { valid: false, reason: "expired" };

  return {
    valid: true,
    email: invitation.email,
    role: invitation.role,
    invitationId: invitation.id
  };
}

/**
 * Consumes a valid invitation, creating the User account with a
 * password the invitee chose themselves. Wrapped in a transaction so an
 * invitation can never be marked accepted without the User actually
 * being created (or vice versa).
 */
export async function acceptInvitation(params: {
  rawToken: string;
  name: string;
  password: string;
}) {
  const lookup = await lookupInvitation(params.rawToken);
  if (!lookup.valid) {
    throw new Error(`Invitation invalid: ${lookup.reason}`);
  }

  const passwordHash = await hashPassword(params.password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: lookup.email,
        name: params.name,
        passwordHash,
        role: lookup.role
      }
    });

    await tx.accountInvitation.update({
      where: { id: lookup.invitationId },
      data: { acceptedAt: new Date() }
    });

    return user;
  });
}
