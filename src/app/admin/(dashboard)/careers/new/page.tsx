import { CareerForm } from "../CareerForm";
import { createCareerAction } from "../actions";

export default function NewCareerPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">New Vacancy</h1>
      <div className="mt-6">
        <CareerForm action={createCareerAction} />
      </div>
    </div>
  );
}
