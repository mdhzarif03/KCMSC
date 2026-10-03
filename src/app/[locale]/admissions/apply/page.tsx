import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LegacyApplyPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/admissions`);
}
