import { ClubForm } from "../ClubForm";
import { createClubAction } from "../actions";

export default function NewClubPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">New Club</h1>
      <div className="mt-6">
        <ClubForm action={createClubAction} />
      </div>
    </div>
  );
}
