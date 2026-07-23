import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getMe } from "@/services/user.services";
import { getTenantById } from "@/services/tenant.services";
import { getPlans } from "@/services/plan.services";
import { redirect } from "next/navigation";
import TenantSettingsView from "@/components/dashboard/owner/billing/TenantSettingsView";

export default async function BillingPage() {
  const user = await getMe();
  if (!user) redirect("/login");

  const resolvedTenantId = user.tenantId as string;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tenants", resolvedTenantId],
      queryFn: () => getTenantById(resolvedTenantId).then((res) => res.data),
    }),
    queryClient.prefetchQuery({ queryKey: ["plans"], queryFn: getPlans }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Billing & Plan</h2>
          <p className="text-sm text-muted-foreground">Manage your subscription and usage.</p>
        </div>
        <TenantSettingsView tenantId={resolvedTenantId} />
      </div>
    </HydrationBoundary>
  );
}