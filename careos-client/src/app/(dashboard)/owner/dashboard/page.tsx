import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMe } from "@/services/user.services";
import { getTenantById } from "@/services/tenant.services";
import { redirect } from "next/navigation";
import OwnerDashboardContent from "@/components/dashboard/owner/OwnerDashboardContent";

export default async function OwnerDashboardPage() {
  const user = await getMe();
  if (!user) redirect("/login");
  const tenantId = user.tenantId as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantById(tenantId).then((res) => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OwnerDashboardContent tenantId={tenantId} />
    </HydrationBoundary>
  );
}