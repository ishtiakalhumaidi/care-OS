import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTenantAnalytics } from "@/services/tenant.services";
import TenantDetailView from "@/components/dashboard/admin/tenants/TenantDetailView";

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tenants", id],
    queryFn: () => getTenantAnalytics(id).then((res) => res.data),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TenantDetailView tenantId={id} />
    </HydrationBoundary>
  );
}