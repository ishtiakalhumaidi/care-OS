import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getClassrooms } from "@/services/classroom.services";
import { getBranches } from "@/services/branch.services";
import ClassroomsTable from "@/components/dashboard/owner/classrooms/ClassroomsTable";

export default async function CenterAdminClassroomsPage() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["classrooms", ""],
      queryFn: () => getClassrooms(""),
    }),
    queryClient.prefetchQuery({
      queryKey: ["branches", "for-classroom-select"],
      queryFn: () => getBranches("limit=100"),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Classrooms</h2>
        <ClassroomsTable initialQueryString="" basePath="/center-admin/dashboard/classrooms" />
      </div>
    </HydrationBoundary>
  );
}