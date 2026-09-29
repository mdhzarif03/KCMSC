import { SubmitButton } from "@/components/admin/SubmitButton";

type NoticeDefaults = {
  titleEn?: string;
  titleBn?: string;
  bodyEn?: string;
  bodyBn?: string;
  isImportant?: boolean;
  isPublished?: boolean;
};

export function NoticeForm({
  action,
  defaults = {}
}: {
  action: (formData: FormData) => void;
  defaults?: NoticeDefaults;
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
          <label className="block text-sm font-medium text-ink">Body (English)</label>
          <textarea
            name="bodyEn"
            required
            rows={6}
            defaultValue={defaults.bodyEn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Body (বাংলা)</label>
          <textarea
            name="bodyBn"
            required
            rows={6}
            defaultValue={defaults.bodyBn}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isImportant" defaultChecked={defaults.isImportant} />
          Mark important
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isPublished" defaultChecked={defaults.isPublished} />
          Published
        </label>
      </div>

      <SubmitButton label="Save notice" pendingLabel="Saving…" />
    </form>
  );
}
