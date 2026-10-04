import { requireAdmin } from "@/lib/session";
import { AdminNavigation } from "./AdminNavigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#242824]">
      <AdminNavigation email={user.email} />
      <main className="min-h-screen lg:pl-[258px]">
        <div className="mx-auto w-full max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
