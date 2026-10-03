type Guardian = {
  id: string; name: string; relationship: string; nidNumber: string; contactNumber: string; occupation: string; nationality: string; isAlive: boolean;
};

type Application = {
  id: string; fullName: string; dateOfBirth: Date; gender: string; nationality: string; medium: string; applyingClass: string; previousInstitution: string; birthRegistrationNo: string;
  certificateName: string | null; fatherName: string; fatherNidNumber: string; fatherContactNumber: string; fatherOccupation: string; fatherNationality: string; fatherIsAlive: boolean;
  motherName: string; motherNidNumber: string; motherContactNumber: string; motherOccupation: string; motherNationality: string; motherIsAlive: boolean; presentAddress: string; permanentAddress: string;
  cycle: { nameEn: string }; createdAt: Date; status: string; guardians: Guardian[]; assignedOfficer?: { name: string } | null;
};

export const statusText = (status: string) => status.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return <div><dt className="text-xs text-ink-muted">{label}</dt><dd className="mt-1 text-sm text-ink whitespace-pre-wrap">{value || "—"}</dd></div>;
}

function ageAt(date: Date) {
  const today = new Date(); const dob = new Date(date); let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) age--;
  return String(age);
}

export function ApplicationDetail({ app }: { app: Application }) {
  return (
    <article className="rounded-lg border border-border bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div><p className="text-xs uppercase tracking-wide text-ink-muted">Admission application</p><h1 className="mt-1 font-heading text-2xl text-ink">{app.fullName}</h1><p className="mt-1 text-xs text-ink-muted">{app.cycle.nameEn} · submitted {app.createdAt.toLocaleString()}</p></div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">{statusText(app.status)}</span>
      </div>

      <section className="mt-6"><h2 className="font-medium text-ink">Student information</h2><dl className="mt-4 grid gap-5 sm:grid-cols-2"><Field label="Full name" value={app.fullName}/><Field label="Age" value={ageAt(app.dateOfBirth)}/><Field label="Date of birth" value={app.dateOfBirth.toLocaleDateString()}/><Field label="Gender" value={app.gender}/><Field label="Nationality" value={app.nationality}/><Field label="Medium" value={app.medium}/><Field label="Class" value={app.applyingClass}/><Field label="Previous institution" value={app.previousInstitution}/><Field label="Birth registration no." value={app.birthRegistrationNo}/><Field label="Certificate" value={app.certificateName}/></dl></section>

      <section className="mt-8 border-t border-border pt-6"><h2 className="font-medium text-ink">Father</h2><dl className="mt-4 grid gap-5 sm:grid-cols-2"><Field label="Name" value={app.fatherName}/><Field label="Status" value={app.fatherIsAlive ? "Alive" : "Deceased"}/><Field label="NID number" value={app.fatherNidNumber}/><Field label="Contact number" value={app.fatherContactNumber}/><Field label="Occupation" value={app.fatherOccupation}/><Field label="Nationality" value={app.fatherNationality}/></dl></section>

      <section className="mt-8 border-t border-border pt-6"><h2 className="font-medium text-ink">Mother</h2><dl className="mt-4 grid gap-5 sm:grid-cols-2"><Field label="Name" value={app.motherName}/><Field label="Status" value={app.motherIsAlive ? "Alive" : "Deceased"}/><Field label="NID number" value={app.motherNidNumber}/><Field label="Contact number" value={app.motherContactNumber}/><Field label="Occupation" value={app.motherOccupation}/><Field label="Nationality" value={app.motherNationality}/></dl></section>

      <section className="mt-8 border-t border-border pt-6"><h2 className="font-medium text-ink">Additional guardians</h2>{app.guardians.length ? <div className="mt-4 space-y-4">{app.guardians.map((g) => <div key={g.id} className="rounded-md border border-border p-4"><dl className="grid gap-4 sm:grid-cols-2"><Field label="Name" value={g.name}/><Field label="Relationship" value={g.relationship}/><Field label="NID number" value={g.nidNumber}/><Field label="Contact number" value={g.contactNumber}/><Field label="Occupation" value={g.occupation}/><Field label="Nationality" value={g.nationality}/><Field label="Status" value={g.isAlive ? "Alive" : "Deceased"}/></dl></div>)}</div> : <p className="mt-2 text-sm text-ink-muted">No additional guardians.</p>}</section>

      <section className="mt-8 border-t border-border pt-6"><h2 className="font-medium text-ink">Addresses</h2><dl className="mt-4 grid gap-5"><Field label="Present address" value={app.presentAddress}/><Field label="Permanent address" value={app.permanentAddress}/></dl></section>
    </article>
  );
}
