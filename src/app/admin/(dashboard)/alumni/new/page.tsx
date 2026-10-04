import { AlumniForm } from "../AlumniForm";
import { createAlumniAction } from "../actions";
export default function NewAlumniPage() { return <div><h1 className="font-heading text-2xl text-ink">New alumni message</h1><div className="mt-6"><AlumniForm action={createAlumniAction} /></div></div>; }
