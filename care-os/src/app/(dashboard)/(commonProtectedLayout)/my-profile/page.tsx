import { redirect } from "next/navigation";
import { getMe } from "@/services/user.services";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";

export default async function MyProfilePage() {
  const user = await getMe();

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        My Profile
      </h1>
      <ProfileForm user={user} />
    </div>
  );
}
