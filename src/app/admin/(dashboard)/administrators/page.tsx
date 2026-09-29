import { getAdministratorsData, inviteAdminAction, deleteOwnAdminAccountAction } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Enter a valid email address.",
  already_exists: "An account with that email already exists.",
  last_admin: "You are the only administrator — delete your account only after another admin exists."
};

export default async function AdministratorsPage({
  searchParams
}: {
  searchParams: { error?: string; invited?: string; link?: string; expires?: string };
}) {
  const { currentAdmin, admins, pendingInvitations } = await getAdministratorsData();
  const errorMessage = searchParams.error ? ERROR_MESSAGES[searchParams.error] : null;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl text-ink">Administrators</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Every administrator has identical permissions — there is no super-admin tier. An admin can
        only delete their own account, never someone else&apos;s.
      </p>

      {errorMessage ? (
        <p className="mt-4 rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
          {errorMessage}
        </p>
      ) : null}

      {searchParams.invited && searchParams.link ? (
        <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          <p className="text-ink">
            Invitation created for <strong>{searchParams.invited}</strong>. No email provider is
            configured yet — copy this link and send it to them directly:
          </p>
          <code className="mt-2 block break-all rounded bg-white p-2 text-xs text-primary-dark">
            {searchParams.link}
          </code>
          {searchParams.expires ? (
            <p className="mt-1 text-xs text-ink-muted">
              Expires {new Date(searchParams.expires).toLocaleString()}
            </p>
          ) : null}
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Current Administrators
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-white">
          {admins.map((admin) => {
            const isSelf = currentAdmin?.id === admin.id;
            return (
              <li key={admin.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-ink">{admin.name}</p>
                  <p className="text-sm text-ink-muted">{admin.email}</p>
                </div>
                {isSelf ? (
                  <form action={deleteOwnAdminAccountAction}>
                    <input type="hidden" name="userId" value={admin.id} />
                    <button
                      type="submit"
                      className="text-sm text-brick hover:underline"
                      title="You can only delete your own account"
                    >
                      Delete my account
                    </button>
                  </form>
                ) : (
                  <span className="text-xs text-ink-muted">Only they can delete this account</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {pendingInvitations.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Pending Invitations
          </h2>
          <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-white">
            {pendingInvitations.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between p-4">
                <p className="text-sm text-ink">{inv.email}</p>
                <p className="text-xs text-ink-muted">
                  Expires {inv.expiresAt.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Invite a New Administrator
        </h2>
        <form action={inviteAdminAction} className="mt-3 flex gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="colleague@example.com"
            className="flex-1 rounded-md border border-border px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Send invitation
          </button>
        </form>
      </section>
    </div>
  );
}
