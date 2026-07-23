import ChildDetailView from "@/components/dashboard/students/ChildDetailView";

export default async function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChildDetailView childId={id} basePath="/owner/dashboard/students-management" />;
}