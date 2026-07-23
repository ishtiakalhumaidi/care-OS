import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getAllTenants } from "@/services/tenant.services";
import TenantsTable from "@/components/dashboard/admin/tenants/TenantsTable";

export default async function TenantsManagementPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tenants"],
    queryFn: () => getAllTenants("limit=100"),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Tenants</h2>
          <p className="text-sm text-muted-foreground">
            View and manage every center on the platform.
          </p>
        </div>
        <TenantsTable />
      </div>
    </HydrationBoundary>
  );
}