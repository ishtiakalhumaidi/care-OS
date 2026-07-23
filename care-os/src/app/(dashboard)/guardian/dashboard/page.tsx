/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { getMe } from "@/services/user.services";
import ChildStatusCard from "@/components/dashboard/guardian/ChildStatusCard";

export default async function GuardianDashboardPage() {
  const user = await getMe();

  if (!user) redirect("/login");

  const hasRegisteredChild = Boolean(user.guardianProfile?.length);
  if (!hasRegisteredChild) redirect("/guardian/dashboard/register-child");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your children</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your child&apos;s enrollment status here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {user.guardianProfile?.map((g: any) => (
          <ChildStatusCard key={g.child.id} child={g.child} />
        ))}
      </div>
    </div>
  );
}
