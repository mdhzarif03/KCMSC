import { SubmitButton } from "@/components/admin/SubmitButton";

type FacilityDefaults = {
  titleEn?: string;
  titleBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  isFeatured?: boolean;
};

export function FacilityForm({
  action,
  defaults = {}
}: {
  action: (formData: FormData) => void;
  defaults?: FacilityDefaults;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Title (English)</label>
          <input
            name="titleEn"
            required
            defaultValue={defaults.titleEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Title (বাংলা)</label>
          <input
            name="titleBn"
            required
            defaultValue={defaults.titleBn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">
            Description (English) — optional
          </label>
          <textarea
            name="descriptionEn"
            rows={4}
            defaultValue={defaults.descriptionEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Description (বাংলা) — optional
          </label>
          <textarea
            name="descriptionBn"
            rows={4}
            defaultValue={defaults.descriptionBn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults.isFeatured} />
        Feature on homepage
      </label>

      <SubmitButton label="Save facility" pendingLabel="Saving…" />
    </form>
  );
}
