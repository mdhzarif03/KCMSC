import { SubmitButton } from "@/components/admin/SubmitButton";

type ApplyFields = {
  applicantName: string;
  dateOfBirth: string;
  gender: string;
  genderOptions: string[];
  applyingClass: string;
  previousInstitution: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;
  presentAddress: string;
  permanentAddress: string;
  declarationLabel: string;
};

export function ApplicationForm({
  action,
  sections,
  fields,
  submitLabel,
  submittingLabel
}: {
  action: (formData: FormData) => void;
  sections: { applicant: string; guardian: string; address: string; declaration: string };
  fields: ApplyFields;
  submitLabel: string;
  submittingLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-10">
      <fieldset className="space-y-4">
        <legend className="font-heading text-xl text-primary-dark">{sections.applicant}</legend>
        <div>
          <label className="block text-sm font-medium text-ink">{fields.applicantName}</label>
          <input
            name="applicantName"
            required
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">{fields.dateOfBirth}</label>
            <input
              name="dateOfBirth"
              type="date"
              required
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{fields.gender}</label>
            <select
              name="gender"
              required
              defaultValue=""
              className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="" disabled>
                —
              </option>
              {fields.genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">{fields.applyingClass}</label>
            <input
              name="applyingClass"
              required
              placeholder="e.g. Class 1, Nursery, Class 9"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              {fields.previousInstitution}
            </label>
            <input
              name="previousInstitution"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-xl text-primary-dark">{sections.guardian}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">{fields.guardianName}</label>
            <input
              name="guardianName"
              required
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              {fields.guardianRelationship}
            </label>
            <input
              name="guardianRelationship"
              required
              placeholder="e.g. Father, Mother, Guardian"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">{fields.guardianPhone}</label>
            <input
              name="guardianPhone"
              required
              type="tel"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-ink-muted">
              You will need this to track your application later.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">{fields.guardianEmail}</label>
            <input
              name="guardianEmail"
              type="email"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-xl text-primary-dark">{sections.address}</legend>
        <div>
          <label className="block text-sm font-medium text-ink">{fields.presentAddress}</label>
          <textarea
            name="presentAddress"
            required
            rows={3}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">{fields.permanentAddress}</label>
          <textarea
            name="permanentAddress"
            required
            rows={3}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-xl text-primary-dark">{sections.declaration}</legend>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input type="checkbox" name="declarationAccepted" required className="mt-1" />
          <span>{fields.declarationLabel}</span>
        </label>
      </fieldset>

      <SubmitButton label={submitLabel} pendingLabel={submittingLabel} />
    </form>
  );
}
