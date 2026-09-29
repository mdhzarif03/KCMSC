type ReviewRow = {
  id: string;
  internalNote: string;
  applicantMessage: string | null;
  statusAtReview: string;
  createdAt: Date;
  officer: { name: string; email: string } | null;
};

export type ApplicationDetailData = {
  referenceCode: string;
  status: string;
  createdAt: Date;
  applicantName: string;
  dateOfBirth: Date;
  gender: string;
  applyingClass: string;
  previousInstitution: string | null;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string | null;
  presentAddress: string;
  permanentAddress: string;
  declarationAccepted: boolean;
  cycle: { nameEn: string };
  assignedOfficer: { name: string; email: string } | null;
  reviews: ReviewRow[];
};

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="text-sm text-ink">{value || "—"}</dd>
    </div>
  );
}

export function statusText(status: string) {
  return status.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

// Shared by the officer and admin detail pages. INTERNAL notes are shown
// here on purpose — this component is only ever rendered inside the
// authenticated officer/admin areas, never on a public route.
export function ApplicationDetail({ app }: { app: ApplicationDetailData }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-heading text-xl text-ink">{app.applicantName}</p>
            <p className="text-sm text-ink-muted">
              {app.referenceCode} · {app.cycle.nameEn} · submitted{" "}
              {app.createdAt.toLocaleDateString()}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
            {statusText(app.status)}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Handled by:{" "}
          <span className="font-medium text-ink">
            {app.assignedOfficer
              ? `${app.assignedOfficer.name} (${app.assignedOfficer.email})`
              : "Unassigned"}
          </span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Applicant</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Date of birth" value={app.dateOfBirth.toLocaleDateString()} />
            <Field label="Gender" value={app.gender} />
            <Field label="Applying for" value={app.applyingClass} />
            <Field label="Previous institution" value={app.previousInstitution} />
          </dl>
        </section>
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Guardian</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Name" value={app.guardianName} />
            <Field label="Relationship" value={app.guardianRelationship} />
            <Field label="Phone" value={app.guardianPhone} />
            <Field label="Email" value={app.guardianEmail} />
          </dl>
        </section>
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Address</h2>
          <dl className="mt-4 space-y-4">
            <Field label="Present" value={app.presentAddress} />
            <Field label="Permanent" value={app.permanentAddress} />
          </dl>
        </section>
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Documents</h2>
          <p className="mt-4 text-sm text-ink-muted">
            Declaration accepted: {app.declarationAccepted ? "Yes" : "No"}. Document upload is not
            enabled yet — it needs file storage that hasn&apos;t been configured.
          </p>
        </section>
      </div>

      <section className="rounded-lg border border-border bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Review history
        </h2>
        {app.reviews.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">No reviews recorded yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {app.reviews.map((r) => (
              <li key={r.id} className="border-l-2 border-brass pl-4">
                <p className="text-xs text-ink-muted">
                  {r.createdAt.toLocaleString()} · {statusText(r.statusAtReview)} ·{" "}
                  {r.officer ? r.officer.name : "Former officer"}
                </p>
                <p className="mt-1 text-sm text-ink">
                  <span className="text-xs font-medium uppercase text-ink-muted">Internal: </span>
                  {r.internalNote}
                </p>
                {r.applicantMessage ? (
                  <p className="mt-1 text-sm text-primary-dark">
                    <span className="text-xs font-medium uppercase text-ink-muted">
                      Shown to applicant:{" "}
                    </span>
                    {r.applicantMessage}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
