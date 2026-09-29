import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { inviteOfficerAction, removeOfficerAction } from "./actions";

const ERRORS: Record<string, string> = {
  invalid_email: "Enter a valid email address.",
  already_exists: "An account with that email already exists."
};

export default async function OfficersPage({
  searchParams
}: {
  searchParams: { error?: string; invited?: string; link?: string; expires?: string; removed?: string };
}) {
  await requireAdmin();
  const [officers, pending] = await Promise.all([
    prisma.user.findMany({ where: { role: "ADMISSION_OFFICER" }, orderBy: { createdAt: "asc" } }),
    prisma.accountInvitation.findMany({
      where: { role: "ADMISSION_OFFICER", acceptedAt: null, expiresAt: { gt: new Date() } }
    })
  ]);

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl text-ink">Admission Officers</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Officers can only work on admissions. Removing an officer deletes their login only — every
        application, review and decision they handled is kept.
      </p>

      {searchParams.error ? (
        <p className="mt-4 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
          {ERRORS[searchParams.error]}
        </p>
      ) : null}
      {searchParams.removed ? (
        <p className="mt-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          Officer account removed. Their records were preserved.
        </p>
      ) : null}
      {searchParams.invited && searchParams.link ? (
        <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          <p>
            Invitation created for <strong>{searchParams.invited}</strong>. No email provider is
            configured — copy this link and send it to them:
          </p>
          <code className="mt-2 block break-all rounded bg-white p-2 text-xs text-primary-dark">
            {searchParams.link}
          </code>
        </div>
      ) : null}

      <ul className="mt-8 divide-y divide-border rounded-lg border border-border bg-white">
        {officers.length === 0 ? (
          <li className="p-6 text-center text-sm text-ink-muted">No admission officers yet.</li>
        ) : (
          officers.map((o) => (
            <li key={o.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-ink">{o.name}</p>
                <p className="text-sm text-ink-muted">{o.email}</p>
              </div>
              <form action={removeOfficerAction}>
                <input type="hidden" name="userId" value={o.id} />
                <button type="submit" className="text-sm text-brick hover:underline">
                  Remove
                </button>
              </form>
            </li>
          ))
        )}
      </ul>

      {pending.length > 0 ? (
        <ul className="mt-4 rounded-lg border border-border bg-white p-4 text-sm text-ink-muted">
          {pending.map((p) => (
            <li key={p.id}>Pending invitation: {p.email}</li>
          ))}
        </ul>
      ) : null}

      <form action={inviteOfficerAction} className="mt-8 flex gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="officer@example.com"
          className="flex-1 rounded-md border border-border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Invite officer
        </button>
      </form>
    </div>
  );
}
