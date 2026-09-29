import { SubmitButton } from "@/components/admin/SubmitButton";

type AchievementDefaults = {
  titleEn?: string;
  titleBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  year?: number;
  category?: string;
  isFeatured?: boolean;
};

export function AchievementForm({
  action,
  defaults = {}
}: {
  action: (formData: FormData) => void;
  defaults?: AchievementDefaults;
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
          <label className="block text-sm font-medium text-ink">Description (English)</label>
          <textarea
            name="descriptionEn"
            required
            rows={4}
            defaultValue={defaults.descriptionEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Description (বাংলা)</label>
          <textarea
            name="descriptionBn"
            required
            rows={4}
            defaultValue={defaults.descriptionBn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Year</label>
          <input
            name="year"
            type="number"
            required
            defaultValue={defaults.year}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Category</label>
          <input
            name="category"
            required
            placeholder="e.g. National ICT Olympiad"
            defaultValue={defaults.category}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="isFeatured" defaultChecked={defaults.isFeatured} />
        Feature on homepage
      </label>

      <SubmitButton label="Save achievement" pendingLabel="Saving…" />
    </form>
  );
}
