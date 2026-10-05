import { SubmitButton } from "@/components/admin/SubmitButton";

type AlumniDefaults = {
  nameEn?: string;
  nameBn?: string;
  messageEn?: string;
  messageBn?: string;
  previewEn?: string | null;
  previewBn?: string | null;
  sscBatch?: string | null;
  hscBatch?: string | null;
  roleEn?: string | null;
  roleBn?: string | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
};

export function AlumniForm({
  action,
  defaults = {},
}: {
  action: (formData: FormData) => void;
  defaults?: AlumniDefaults;
}) {
  const name = defaults.nameBn || defaults.nameEn || "";
  const body = defaults.messageBn || defaults.messageEn || "";
  const preview = defaults.previewBn || defaults.previewEn || "";
  const currentPosition = defaults.roleBn || defaults.roleEn || "";

  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink">Name</label>
        <input
          name="name"
          required
          defaultValue={name}
          placeholder="e.g. Md. Hasan Ali"
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">SSC Batch</label>
          <input
            name="sscBatch"
            defaultValue={defaults.sscBatch ?? ""}
            placeholder="e.g. 2024"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">HSC Batch</label>
          <input
            name="hscBatch"
            defaultValue={defaults.hscBatch ?? ""}
            placeholder="e.g. 2026"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Current Position</label>
        <input
          name="currentPosition"
          defaultValue={currentPosition}
          placeholder="e.g. Software Engineer at Google"
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Preview Message</label>
        <textarea
          name="preview"
          required
          rows={3}
          defaultValue={preview}
          placeholder="Write the short text visitors should see before opening the full experience..."
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
        />
        <p className="mt-1.5 text-xs text-ink-muted">This is shown on the Alumni page. It is separate from the full message below.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Full Experience / Body</label>
        <textarea
          name="body"
          required
          rows={14}
          defaultValue={body}
          placeholder="Write the complete alumni experience here..."
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla leading-7"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Display order</label>
        <input
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={defaults.sortOrder ?? 0}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isPublished" defaultChecked={defaults.isPublished} />
          Publish on the alumni page
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isFeatured" defaultChecked={defaults.isFeatured} />
          Feature on homepage
        </label>
      </div>

      <SubmitButton label="Save alumni message" pendingLabel="Saving…" />
    </form>
  );
}
