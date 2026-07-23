import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getMyClassroom } from "@/services/classroom.services";
import TeacherDashboardContent from "@/components/dashboard/teacher/TeacherDashboardContent";

export default async function TeacherDashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-classroom"],
    queryFn: getMyClassroom,
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeacherDashboardContent />
    </HydrationBoundary>
  );
}