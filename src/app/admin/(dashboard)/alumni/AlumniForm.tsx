import { SubmitButton } from "@/components/admin/SubmitButton";

type AlumniDefaults = {
  nameEn?: string; nameBn?: string; messageEn?: string; messageBn?: string;
  graduationYear?: number | null; roleEn?: string | null; roleBn?: string | null;
  organizationEn?: string | null; organizationBn?: string | null; photoUrl?: string | null;
  isFeatured?: boolean; isPublished?: boolean; sortOrder?: number;
};

export function AlumniForm({ action, defaults = {} }: { action: (formData: FormData) => void; defaults?: AlumniDefaults }) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="block text-sm font-medium text-ink">Name (English)</label><input name="nameEn" required defaultValue={defaults.nameEn} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-ink">Name (বাংলা)</label><input name="nameBn" required defaultValue={defaults.nameBn} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="block text-sm font-medium text-ink">Message (English)</label><textarea name="messageEn" required rows={6} defaultValue={defaults.messageEn} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-ink">Message (বাংলা)</label><textarea name="messageBn" required rows={6} defaultValue={defaults.messageBn} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="block text-sm font-medium text-ink">Graduation year</label><input name="graduationYear" type="number" min="1900" max="2100" defaultValue={defaults.graduationYear ?? ""} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-ink">Display order</label><input name="sortOrder" type="number" min="0" defaultValue={defaults.sortOrder ?? 0} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="block text-sm font-medium text-ink">Role (English)</label><input name="roleEn" defaultValue={defaults.roleEn ?? ""} placeholder="e.g. Software Engineer" className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-ink">Role (বাংলা)</label><input name="roleBn" defaultValue={defaults.roleBn ?? ""} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="block text-sm font-medium text-ink">Organization (English)</label><input name="organizationEn" defaultValue={defaults.organizationEn ?? ""} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-ink">Organization (বাংলা)</label><input name="organizationBn" defaultValue={defaults.organizationBn ?? ""} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm font-bangla" /></div>
      </div>
      <div><label className="block text-sm font-medium text-ink">Photo URL (optional)</label><input name="photoUrl" type="url" defaultValue={defaults.photoUrl ?? ""} placeholder="https://..." className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" name="isPublished" defaultChecked={defaults.isPublished} /> Publish on the alumni page</label>
        <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" name="isFeatured" defaultChecked={defaults.isFeatured} /> Feature on homepage</label>
      </div>
      <SubmitButton label="Save alumni message" pendingLabel="Saving…" />
    </form>
  );
}
