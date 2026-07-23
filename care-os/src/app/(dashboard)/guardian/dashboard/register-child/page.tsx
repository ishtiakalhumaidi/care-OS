import { redirect } from "next/navigation";
import { getMe } from "@/services/user.services";
import RegisterChildForm from "@/components/dashboard/guardian/RegisterChildForm";

export default async function RegisterChildPage() {
  const user = await getMe();

  if (!user) redirect("/login");

  const hasRegisteredChild = Boolean(user.guardianProfile?.length);
  if (hasRegisteredChild) redirect("/guardian/dashboard");

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Register your child</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A staff member will review your application shortly.
        </p>
      </div>
      <RegisterChildForm />
    </div>
  );
}