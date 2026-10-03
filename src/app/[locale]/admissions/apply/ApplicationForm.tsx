"use client";

import { useMemo, useState, useTransition } from "react";

const classes = ["Nursery", "KG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];

type Guardian = {
  name: string;
  relationship: string;
  nidNumber: string;
  contactNumber: string;
  occupation: string;
  nationality: string;
  isAlive: boolean;
};

const emptyGuardian = (): Guardian => ({
  name: "",
  relationship: "",
  nidNumber: "",
  contactNumber: "",
  occupation: "",
  nationality: "Bangladeshi",
  isAlive: true
});

type FormState = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  medium: string;
  applyingClass: string;
  previousInstitution: string;
  birthRegistrationNo: string;
  fatherName: string;
  fatherNidNumber: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  fatherNationality: string;
  motherName: string;
  motherNidNumber: string;
  motherContactNumber: string;
  motherOccupation: string;
  motherNationality: string;
  presentAddress: string;
  permanentAddress: string;
};

const initialState: FormState = {
  fullName: "", dateOfBirth: "", gender: "", nationality: "", medium: "", applyingClass: "",
  previousInstitution: "", birthRegistrationNo: "", fatherName: "", fatherNidNumber: "", fatherContactNumber: "",
  fatherOccupation: "", fatherNationality: "", motherName: "", motherNidNumber: "", motherContactNumber: "",
  motherOccupation: "", motherNationality: "", presentAddress: "", permanentAddress: ""
};

function Field({
  label,
  value,
  required = true,
  type = "text",
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[.01em] text-[var(--kc-ink)]">{label}{required ? <span className="ml-1 text-[var(--kc-brass)]">*</span> : null}</label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 text-sm text-[var(--kc-ink)] outline-none transition placeholder:text-[#9b9f99] focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[.01em] text-[var(--kc-ink)]">{label}<span className="ml-1 text-[var(--kc-brass)]">*</span></label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 text-sm text-[var(--kc-ink)] outline-none transition focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
      >
        {children}
      </select>
    </div>
  );
}

export function ApplicationForm({
  action,
  sections,
  fields: _fields,
  submitLabel,
  submittingLabel
}: {
  action: (formData: FormData) => void;
  sections: Record<string, string>;
  fields: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [fatherAlive, setFatherAlive] = useState(true);
  const [motherAlive, setMotherAlive] = useState(true);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const age = useMemo(() => {
    if (!form.dateOfBirth) return "";

    // Parse YYYY-MM-DD manually so the browser does not shift the date
    // because of UTC/local-time conversion.
    const [year, month, day] = form.dateOfBirth.split("-").map(Number);
    if (!year || !month || !day) return "";

    const today = new Date();
    let a = today.getFullYear() - year;
    const birthdayPassed =
      today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() >= day);

    if (!birthdayPassed) a--;
    return a >= 0 ? String(a) : "";
  }, [form.dateOfBirth]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const steps = [
    { title: sections.student, short: "Student", number: "01" },
    { title: sections.father, short: "Father", number: "02" },
    { title: sections.mother, short: "Mother", number: "03" },
    { title: sections.guardians, short: "Guardians", number: "04" },
    { title: sections.address, short: "Address", number: "05" }
  ];

  const stepValid = () => {
    setError("");
    if (step === 0 && (!form.fullName || !form.dateOfBirth || !form.gender || !form.nationality || !form.medium || !form.applyingClass || !form.previousInstitution || !form.birthRegistrationNo || !certificate)) {
      setError("Please complete every required field in this section before continuing."); return false;
    }
    if (step === 1 && (!form.fatherName || !form.fatherNidNumber || (fatherAlive && !form.fatherContactNumber) || !form.fatherOccupation || !form.fatherNationality)) {
      setError("Please complete every required field in this section before continuing."); return false;
    }
    if (step === 2 && (!form.motherName || !form.motherNidNumber || (motherAlive && !form.motherContactNumber) || !form.motherOccupation || !form.motherNationality)) {
      setError("Please complete every required field in this section before continuing."); return false;
    }
    if (step === 3 && guardians.some((g) => !g.name || !g.relationship || !g.nidNumber || !g.contactNumber || !g.occupation || !g.nationality)) {
      setError("Complete every added guardian or remove the unfinished guardian."); return false;
    }
    if (step === 4 && (!form.presentAddress || !form.permanentAddress)) {
      setError("Please complete both addresses before submitting."); return false;
    }
    return true;
  };

  const updateGuardian = (index: number, patch: Partial<Guardian>) => {
    setGuardians((items) => items.map((item, i) => i === index ? { ...item, ...patch } : item));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stepValid()) return;
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.set(key, value));
    data.set("fatherIsAlive", fatherAlive ? "on" : "");
    data.set("motherIsAlive", motherAlive ? "on" : "");
    data.set("guardiansJson", JSON.stringify(guardians));
    if (certificate) data.set("certificate", certificate);
    startTransition(() => { void action(data); });
  };

  return (
    <form onSubmit={submit} className="max-w-[920px]">
      <nav aria-label="Application progress" className="mb-10 border-y border-[var(--kc-line)] bg-[var(--kc-paper)]">
        <ol className="grid grid-cols-2 sm:grid-cols-5">
          {steps.map((item, index) => (
            <li key={item.number}>
              <button
                type="button"
                onClick={() => index < step && setStep(index)}
                disabled={index > step}
                className={`flex w-full items-center gap-3 border-b border-[var(--kc-line)] px-4 py-4 text-left transition sm:border-b-0 sm:border-r ${index === step ? "bg-[var(--kc-green)] text-white" : index < step ? "text-[var(--kc-green-dark)] hover:bg-[var(--kc-soft)]" : "text-[var(--kc-muted)]"}`}
              >
                <span className={`font-heading text-lg ${index === step ? "text-white" : "text-[var(--kc-brass)]"}`}>{item.number}</span>
                <span className="text-[10px] font-medium uppercase tracking-[.08em]">{item.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {error ? <p role="alert" className="mb-7 border-l-2 border-[#a7473b] bg-[#a7473b]/5 px-4 py-3 text-sm leading-6 text-[#8c3c32]">{error}</p> : null}

      <fieldset className="border-t border-[var(--kc-line)] pt-7">
        <legend className="font-heading text-3xl leading-tight text-[var(--kc-green-dark)] sm:text-4xl">{steps[step].title}</legend>
        <p className="mt-2 text-xs leading-6 text-[var(--kc-muted)]">Fields marked with <span className="text-[var(--kc-brass)]">*</span> are required.</p>

        {step === 0 ? (
          <div className="mt-8 space-y-6">
            <Field label="Full Name" value={form.fullName} onChange={(v) => set("fullName", v)} />
            <div className="grid gap-6 sm:grid-cols-[1fr_180px]">
              <Field label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(v) => set("dateOfBirth", v)} />
              <div>
                <label className="block text-[11px] font-medium text-[var(--kc-ink)]">Age</label>
                <input value={age} readOnly aria-label="Calculated age" className="mt-2 h-11 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-soft)] px-3.5 text-sm text-[var(--kc-muted)]" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField label="Gender" value={form.gender} onChange={(v) => set("gender", v)}>
                <option value="" disabled>Select gender</option><option>Female</option><option>Male</option><option>Other</option>
              </SelectField>
              <Field label="Nationality" value={form.nationality} onChange={(v) => set("nationality", v)} placeholder="Bangladeshi" />
            </div>
            <div>
              <p className="block text-[11px] font-medium text-[var(--kc-ink)]">Medium<span className="ml-1 text-[var(--kc-brass)]">*</span></p>
              <div className="mt-3 flex flex-wrap gap-6">
                {["Bangla Version", "English Version"].map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-[var(--kc-ink)]">
                    <input type="radio" name="medium" checked={form.medium === option} onChange={() => set("medium", option)} className="accent-[#176b45]" />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <SelectField label="Class" value={form.applyingClass} onChange={(v) => set("applyingClass", v)}>
              <option value="" disabled>Select class</option>{classes.map((item) => <option key={item}>{item}</option>)}
            </SelectField>
            <Field label="Previous Institution" value={form.previousInstitution} onChange={(v) => set("previousInstitution", v)} />
            <Field label="Birth Registration No." value={form.birthRegistrationNo} onChange={(v) => set("birthRegistrationNo", v)} />

            <div>
              <label className="block text-[11px] font-medium text-[var(--kc-ink)]">Certificate<span className="ml-1 text-[var(--kc-brass)]">*</span></label>
              <label className="mt-2 flex min-h-[88px] cursor-pointer items-center justify-between gap-5 border border-dashed border-[var(--kc-line)] bg-[var(--kc-paper)] px-5 py-4 transition hover:border-[var(--kc-green)] hover:bg-white">
                <div>
                  <p className="text-sm text-[var(--kc-ink)]">{certificate ? certificate.name : "Choose a certificate file"}</p>
                  <p className="mt-1 text-xs text-[var(--kc-muted)]">PDF, JPG or PNG · maximum 5 MB</p>
                </div>
                <span className="kc-classic-button kc-classic-button-outline shrink-0">Browse</span>
                <input type="file" accept="application/pdf,image/jpeg,image/png" required={!certificate} onChange={(e) => setCertificate(e.target.files?.[0] ?? null)} className="sr-only" />
              </label>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2"><Field label="Father's Name" value={form.fatherName} onChange={(v) => set("fatherName", v)} /><Field label="Father's NID Number" value={form.fatherNidNumber} onChange={(v) => set("fatherNidNumber", v)} /></div>
            <div className="grid gap-6 sm:grid-cols-2"><Field label="Father's Contact Number" value={form.fatherContactNumber} required={fatherAlive} onChange={(v) => set("fatherContactNumber", v)} /><Field label="Father's Occupation" value={form.fatherOccupation} onChange={(v) => set("fatherOccupation", v)} /></div>
            <Field label="Father's Nationality" value={form.fatherNationality} onChange={(v) => set("fatherNationality", v)} placeholder="Bangladeshi" />
            <label className="flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm text-[var(--kc-ink)]"><input type="checkbox" checked={fatherAlive} onChange={(e) => setFatherAlive(e.target.checked)} className="h-4 w-4 accent-[#176b45]" /> Father is alive</label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2"><Field label="Mother's Name" value={form.motherName} onChange={(v) => set("motherName", v)} /><Field label="Mother's NID Number" value={form.motherNidNumber} onChange={(v) => set("motherNidNumber", v)} /></div>
            <div className="grid gap-6 sm:grid-cols-2"><Field label="Mother's Contact Number" value={form.motherContactNumber} required={motherAlive} onChange={(v) => set("motherContactNumber", v)} /><Field label="Mother's Occupation" value={form.motherOccupation} onChange={(v) => set("motherOccupation", v)} /></div>
            <Field label="Mother's Nationality" value={form.motherNationality} onChange={(v) => set("motherNationality", v)} placeholder="Bangladeshi" />
            <label className="flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm text-[var(--kc-ink)]"><input type="checkbox" checked={motherAlive} onChange={(e) => setMotherAlive(e.target.checked)} className="h-4 w-4 accent-[#176b45]" /> Mother is alive</label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-8">
            <p className="max-w-2xl text-sm leading-7 text-[var(--kc-muted)]">Add another guardian only when necessary. You can leave this section empty.</p>
            <div className="mt-6 space-y-5">
              {guardians.map((g, i) => (
                <div key={i} className="border border-[var(--kc-line)] bg-[var(--kc-paper)] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--kc-line)] pb-4"><h3 className="font-heading text-xl text-[var(--kc-green-dark)]">Guardian {i + 1}</h3><button type="button" onClick={() => setGuardians((items) => items.filter((_, j) => j !== i))} className="text-[10px] font-medium uppercase tracking-[.08em] text-[#8c3c32]">Remove</button></div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field label="Name" value={g.name} onChange={(v) => updateGuardian(i, { name: v })} />
                    <Field label="Relationship" value={g.relationship} onChange={(v) => updateGuardian(i, { relationship: v })} />
                    <Field label="NID Number" value={g.nidNumber} onChange={(v) => updateGuardian(i, { nidNumber: v })} />
                    <Field label="Contact Number" value={g.contactNumber} onChange={(v) => updateGuardian(i, { contactNumber: v })} />
                    <Field label="Occupation" value={g.occupation} onChange={(v) => updateGuardian(i, { occupation: v })} />
                    <Field label="Nationality" value={g.nationality} onChange={(v) => updateGuardian(i, { nationality: v })} />
                  </div>
                  <label className="mt-5 flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm"><input type="checkbox" checked={g.isAlive} onChange={(e) => updateGuardian(i, { isAlive: e.target.checked })} className="h-4 w-4 accent-[#176b45]" /> Guardian is alive</label>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setGuardians((items) => [...items, emptyGuardian()])} className="kc-classic-button kc-classic-button-outline mt-6">+ Add another guardian</button>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-8 space-y-6">
            <div><label className="block text-[11px] font-medium text-[var(--kc-ink)]">Present Address<span className="ml-1 text-[var(--kc-brass)]">*</span></label><textarea required value={form.presentAddress} onChange={(e) => set("presentAddress", e.target.value)} rows={5} className="mt-2 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 py-3 text-sm outline-none transition focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20" /></div>
            <div><label className="block text-[11px] font-medium text-[var(--kc-ink)]">Permanent Address<span className="ml-1 text-[var(--kc-brass)]">*</span></label><textarea required value={form.permanentAddress} onChange={(e) => set("permanentAddress", e.target.value)} rows={5} className="mt-2 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 py-3 text-sm outline-none transition focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20" /></div>
          </div>
        ) : null}
      </fieldset>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--kc-line)] pt-6">
        {step > 0 ? <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }} className="kc-classic-button kc-classic-button-outline">← Back</button> : <span />}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => stepValid() && setStep((current) => current + 1)} className="kc-classic-button kc-classic-button-primary">Continue <span aria-hidden="true" className="ml-2">→</span></button>
        ) : (
          <button type="submit" disabled={pending} className="kc-classic-button kc-classic-button-primary disabled:cursor-not-allowed disabled:opacity-60">{pending ? submittingLabel : submitLabel} <span aria-hidden="true" className="ml-2">→</span></button>
        )}
      </div>
    </form>
  );
}
