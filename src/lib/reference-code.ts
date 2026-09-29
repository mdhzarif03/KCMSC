import { randomBytes } from "crypto";

// Human-shareable, but not the DB's internal cuid — this is what an
// applicant reads aloud over the phone or types into the tracker.
// Excludes visually ambiguous characters (0/O, 1/I/L).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const bytes = randomBytes(6);
  let suffix = "";
  for (const byte of bytes) {
    suffix += ALPHABET[byte % ALPHABET.length];
  }
  return `KCMSC-${year}-${suffix}`;
}
