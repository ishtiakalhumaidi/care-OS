import GuardianChildDetailView from "@/components/dashboard/guardian/GuardianChildDetailView";

export default async function GuardianChildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GuardianChildDetailView childId={id} />;
}