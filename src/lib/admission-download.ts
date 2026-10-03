import crypto from "crypto";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is required");
  return value;
}

export function createApplicationDownloadToken(applicationId: string) {
  const issuedAt = Date.now();
  const payload = `${applicationId}.${issuedAt}`;
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${issuedAt}.${signature}`;
}

export function verifyApplicationDownloadToken(applicationId: string, token: string) {
  const [issuedAtRaw, signature] = token.split(".");
  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || !signature || Date.now() - issuedAt > 24 * 60 * 60 * 1000 || issuedAt > Date.now() + 60_000) return false;
  const payload = `${applicationId}.${issuedAt}`;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
