import { SubmitButton } from "@/components/admin/SubmitButton";

type ClubDefaults = {
  nameEn?: string;
  nameBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  isFeatured?: boolean;
};

export function ClubForm({
  action,
  defaults = {}
}: {
  action: (formData: FormData) => void;
  defaults?: ClubDefaults;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Name (English)</label>
          <input
            name="nameEn"
            required
            defaultValue={defaults.nameEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Name (বাংলা)</label>
          <input
            name="nameBn"
            required
            defaultValue={defaults.nameBn}
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

      <SubmitButton label="Save club" pendingLabel="Saving…" />
    </form>
  );
}
