import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getBranches } from "@/services/branch.services";
import TeamManagement from "@/components/dashboard/owner/team/TeamManagement";

export default async function CenterAdminTeamPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["branches", "for-invite-select"],
    queryFn: () => getBranches("limit=100"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Team</h2>
        <TeamManagement />
      </div>
    </HydrationBoundary>
  );
}