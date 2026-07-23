import ClassroomDetailView from "@/components/dashboard/classrooms/ClassroomDetailView";

export default async function ClassroomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ClassroomDetailView
      classroomId={id}
      basePath="/owner/dashboard/classrooms-management"
      studentsBasePath="/owner/dashboard/students-management"
    />
  );
}