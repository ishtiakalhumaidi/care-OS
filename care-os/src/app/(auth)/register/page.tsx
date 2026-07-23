import RegisterTenantFormWrapper from "@/components/auth/RegisterTenantFormWrapper";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import Link from "next/link";

export default function RegisterTenantOwnerPage() {
  return (
    <AuthSplitShell
      eyebrow="CareOS for centers"
      heading="Set up your center"
      subheading="Register your center and create your owner account — you'll be managing enrollment within minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterTenantFormWrapper />
    </AuthSplitShell>
  );
}