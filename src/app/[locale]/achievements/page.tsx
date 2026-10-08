import { redirect } from "next/navigation";

export default function AchievementsPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/academics`);
}
