import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPlans } from "@/services/plan.services";
import PlansManagement from "@/components/dashboard/admin/plans/PlansManagement";

export default async function PlansManagementPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Subscription Plans</h2>
          <p className="text-sm text-muted-foreground">
            Define pricing tiers and enrollment limits for tenants.
          </p>
        </div>
        <PlansManagement />
      </div>
    </HydrationBoundary>
  );
}