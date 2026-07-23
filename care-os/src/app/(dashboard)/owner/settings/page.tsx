import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getMe } from "@/services/user.services";
import { getTenantById } from "@/services/tenant.services";
import { redirect } from "next/navigation";
import TenantOverviewCard from "@/components/dashboard/owner/settings/TenantOverviewCard";
import TenantProfileForm from "@/components/dashboard/owner/settings/TenantProfileForm";

export default async function TenantSettingsPage() {
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
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your center&apos;s profile.</p>
        </div>
        <TenantOverviewCard tenantId={tenantId} />
        <TenantProfileForm tenantId={tenantId} />
      </div>
    </HydrationBoundary>
  );
}