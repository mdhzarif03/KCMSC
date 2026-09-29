import { requireOfficer } from "@/lib/session";
import { deleteOwnOfficerAccountAction } from "./actions";

export default async function OfficerSettingsPage() {
  const officer = await requireOfficer();
  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl text-ink">My Account</h1>
      <p className="mt-2 text-sm text-ink-muted">{officer.email}</p>

      <section className="mt-8 rounded-lg border border-brick/30 bg-white p-6">
        <h2 className="font-medium text-ink">Leave the system</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Deleting your account removes your login only. Every application, review, decision and
          audit record you touched stays intact. Applications you are still working on return to
          the unassigned pool.
        </p>
        <form action={deleteOwnOfficerAccountAction} className="mt-4">
          <input type="hidden" name="userId" value={officer.id} />
          <button type="submit" className="text-sm font-medium text-brick hover:underline">
            Delete my account
          </button>
        </form>
      </section>
    </div>
  );
}
