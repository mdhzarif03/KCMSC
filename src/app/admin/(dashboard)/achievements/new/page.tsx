import { AchievementForm } from "../AchievementForm";
import { createAchievementAction } from "../actions";

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">New Achievement</h1>
      <div className="mt-6">
        <AchievementForm action={createAchievementAction} />
      </div>
    </div>
  );
}
