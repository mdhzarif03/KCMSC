import { SubmitButton } from "@/components/admin/SubmitButton";

type CareerDefaults = {
  titleEn?: string;
  titleBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  deadline?: Date | null;
  isPublished?: boolean;
};

function toDateInputValue(date?: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function CareerForm({
  action,
  defaults = {}
}: {
  action: (formData: FormData) => void;
  defaults?: CareerDefaults;
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
            rows={5}
            defaultValue={defaults.descriptionEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Description (বাংলা)</label>
          <textarea
            name="descriptionBn"
            required
            rows={5}
            defaultValue={defaults.descriptionBn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">
            Application deadline — optional
          </label>
          <input
            name="deadline"
            type="date"
            defaultValue={toDateInputValue(defaults.deadline)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-ink">
          <input type="checkbox" name="isPublished" defaultChecked={defaults.isPublished} />
          Published
        </label>
      </div>

      <SubmitButton label="Save vacancy" pendingLabel="Saving…" />
    </form>
  );
}
