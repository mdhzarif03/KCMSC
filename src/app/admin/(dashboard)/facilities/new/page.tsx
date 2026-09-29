import { FacilityForm } from "../FacilityForm";
import { createFacilityAction } from "../actions";

export default function NewFacilityPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">New Facility</h1>
      <div className="mt-6">
        <FacilityForm action={createFacilityAction} />
      </div>
    </div>
  );
}
