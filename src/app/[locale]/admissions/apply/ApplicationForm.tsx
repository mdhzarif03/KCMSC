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

function Field({ label, value, required = true, type = "text", onChange }: { label: string; value: string; required?: boolean; type?: string; onChange: (value: string) => void }) {
  return <div><label className="block text-sm font-medium text-ink">{label}</label><input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div>;
}

export function ApplicationForm({ action, sections, fields: _fields, submitLabel, submittingLabel }: { action: (formData: FormData) => void; sections: Record<string, string>; fields: Record<string, unknown>; submitLabel: string; submittingLabel: string }) {
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
    const d = new Date(form.dateOfBirth);
    const now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--;
    return a >= 0 ? String(a) : "";
  }, [form.dateOfBirth]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const stepValid = () => {
    setError("");
    if (step === 0) {
      if (!form.fullName || !form.dateOfBirth || !form.gender || !form.nationality || !form.medium || !form.applyingClass || !form.previousInstitution || !form.birthRegistrationNo || !certificate) {
        setError("Please complete every field in this phase before continuing."); return false;
      }
    }
    if (step === 1 && (!form.fatherName || !form.fatherNidNumber || (fatherAlive && !form.fatherContactNumber) || !form.fatherOccupation || !form.fatherNationality)) {
      setError("Please complete every field in this phase before continuing."); return false;
    }
    if (step === 2 && (!form.motherName || !form.motherNidNumber || (motherAlive && !form.motherContactNumber) || !form.motherOccupation || !form.motherNationality)) {
      setError("Please complete every field in this phase before continuing."); return false;
    }
    if (step === 3 && guardians.some((g) => !g.name || !g.relationship || !g.nidNumber || !g.contactNumber || !g.occupation || !g.nationality)) {
      setError("Complete every added guardian or remove the unfinished guardian."); return false;
    }
    if (step === 4 && (!form.presentAddress || !form.permanentAddress)) {
      setError("Please complete both addresses before submitting."); return false;
    }
    return true;
  };

  const steps = [
    { title: sections.student, content: <div className="space-y-4">
      <Field label="Full Name" value={form.fullName} onChange={(v) => set("fullName", v)} />
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(v) => set("dateOfBirth", v)} /><div><label className="block text-sm font-medium text-ink">Age</label><input value={age} readOnly className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" /></div></div>
      <div className="grid gap-4 sm:grid-cols-2"><div><label className="block text-sm font-medium text-ink">Gender</label><select required value={form.gender} onChange={(e) => set("gender", e.target.value)} className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"><option value="" disabled>—</option><option>Female</option><option>Male</option><option>Other</option></select></div><Field label="Nationality" value={form.nationality} onChange={(v) => set("nationality", v)} /></div>
      <div><label className="block text-sm font-medium text-ink">Medium</label><div className="mt-2 flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="radio" checked={form.medium === "Bangla Version"} onChange={() => set("medium", "Bangla Version")} required />Bangla Version</label><label className="flex items-center gap-2"><input type="radio" checked={form.medium === "English Version"} onChange={() => set("medium", "English Version")} />English Version</label></div></div>
      <div><label className="block text-sm font-medium text-ink">Class</label><select required value={form.applyingClass} onChange={(e) => set("applyingClass", e.target.value)} className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"><option value="" disabled>—</option>{classes.map((item) => <option key={item}>{item}</option>)}</select></div>
      <Field label="Previous Institution" value={form.previousInstitution} onChange={(v) => set("previousInstitution", v)} /><Field label="Birth Registration No." value={form.birthRegistrationNo} onChange={(v) => set("birthRegistrationNo", v)} />
      <div><label className="block text-sm font-medium text-ink">Upload Certificate</label><input type="file" accept="application/pdf,image/jpeg,image/png" required onChange={(e) => setCertificate(e.target.files?.[0] ?? null)} className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm" />{certificate ? <p className="mt-1 text-xs text-ink-muted">{certificate.name}</p> : null}</div>
    </div> },
    { title: sections.father, content: <div className="space-y-4"><Field label="Father's Name" value={form.fatherName} onChange={(v) => set("fatherName", v)} /><Field label="Father's NID Number" value={form.fatherNidNumber} onChange={(v) => set("fatherNidNumber", v)} /><Field label="Father's Contact Number" value={form.fatherContactNumber} required={fatherAlive} onChange={(v) => set("fatherContactNumber", v)} /><Field label="Father's Occupation" value={form.fatherOccupation} onChange={(v) => set("fatherOccupation", v)} /><Field label="Father's Nationality" value={form.fatherNationality} onChange={(v) => set("fatherNationality", v)} /><label className="flex items-center gap-3 text-sm text-ink"><input type="checkbox" checked={fatherAlive} onChange={(e) => setFatherAlive(e.target.checked)} className="h-4 w-4" />Father is alive</label></div> },
    { title: sections.mother, content: <div className="space-y-4"><Field label="Mother's Name" value={form.motherName} onChange={(v) => set("motherName", v)} /><Field label="Mother's NID Number" value={form.motherNidNumber} onChange={(v) => set("motherNidNumber", v)} /><Field label="Mother's Contact Number" value={form.motherContactNumber} required={motherAlive} onChange={(v) => set("motherContactNumber", v)} /><Field label="Mother's Occupation" value={form.motherOccupation} onChange={(v) => set("motherOccupation", v)} /><Field label="Mother's Nationality" value={form.motherNationality} onChange={(v) => set("motherNationality", v)} /><label className="flex items-center gap-3 text-sm text-ink"><input type="checkbox" checked={motherAlive} onChange={(e) => setMotherAlive(e.target.checked)} className="h-4 w-4" />Mother is alive</label></div> },
    { title: sections.guardians, content: <div className="space-y-4">{guardians.map((g, i) => <div key={i} className="rounded-md border border-border bg-surface p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-medium text-ink">Guardian {i + 1}</h3><button type="button" onClick={() => setGuardians((items) => items.filter((_, j) => j !== i))} className="text-xs text-brick">Remove</button></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="Name" value={g.name} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, name: v } : x))} /><Field label="Relationship" value={g.relationship} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, relationship: v } : x))} /><Field label="NID Number" value={g.nidNumber} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, nidNumber: v } : x))} /><Field label="Contact Number" value={g.contactNumber} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, contactNumber: v } : x))} /><Field label="Occupation" value={g.occupation} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, occupation: v } : x))} /><Field label="Nationality" value={g.nationality} onChange={(v) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, nationality: v } : x))} /></div><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={g.isAlive} onChange={(e) => setGuardians((items) => items.map((x, j) => j === i ? { ...x, isAlive: e.target.checked } : x))} />Guardian is alive</label></div>)}<button type="button" onClick={() => setGuardians((items) => [...items, emptyGuardian()])} className="rounded-full border border-border px-5 py-2 text-sm text-ink hover:bg-white">+ Add another guardian</button></div> },
    { title: sections.address, content: <div className="space-y-4"><div><label className="block text-sm font-medium text-ink">Present Address</label><textarea required value={form.presentAddress} onChange={(e) => set("presentAddress", e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div><div><label className="block text-sm font-medium text-ink">Permanent Address</label><textarea required value={form.permanentAddress} onChange={(e) => set("permanentAddress", e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" /></div></div> }
  ];

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepValid()) return;
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.set(key, value));
    data.set("fatherIsAlive", fatherAlive ? "on" : "");
    data.set("motherIsAlive", motherAlive ? "on" : "");
    data.set("guardiansJson", JSON.stringify(guardians));
    if (certificate) data.set("certificate", certificate);
    startTransition(() => { void action(data); });
  }

  return <form onSubmit={submit} className="max-w-2xl space-y-8"><div className="flex flex-wrap gap-2">{steps.map((s, i) => <div key={s.title} className={`rounded-full px-3 py-1 text-xs ${i === step ? "bg-primary text-white" : "bg-surface text-ink-muted"}`}>{i + 1}. {s.title}</div>)}</div>{error ? <p className="rounded-md border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">{error}</p> : null}<fieldset className="space-y-4"><legend className="font-heading text-xl text-primary-dark">{steps[step].title}</legend>{steps[step].content}</fieldset><div className="flex justify-between gap-3">{step > 0 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="rounded-full border border-border px-5 py-2.5 text-sm text-ink">Back</button> : <span />}{step < steps.length - 1 ? <button type="button" onClick={() => stepValid() && setStep((current) => current + 1)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark">Continue</button> : <button type="submit" disabled={pending} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60">{pending ? submittingLabel : submitLabel}</button>}</div></form>;
}
