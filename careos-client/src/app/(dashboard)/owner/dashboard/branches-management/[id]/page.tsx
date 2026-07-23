import BranchDetailView from "@/components/dashboard/branches/BranchDetailView";

export default async function BranchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <BranchDetailView
      branchId={id}
      basePath="/owner/dashboard/branches-management"
      classroomsBasePath="/owner/dashboard/classrooms-management"
    />
  );
}