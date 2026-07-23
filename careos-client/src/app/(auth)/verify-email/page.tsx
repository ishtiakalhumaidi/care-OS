import { Suspense } from "react";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import VerifyEmailFormWrapper from "@/components/auth/VerifyEmailFormWrapper";
import { Loader2 } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const email = resolvedParams.email || "";

  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AuthSplitShell
        eyebrow="Account Security"
        heading="Verify your identity"
        subheading={`We have dispatched a 6-digit security code to ${
          email ? email : "your registered email address"
        }. Enter the sequence below to authorize your account.`}
        backHref="/login"
        backLabel="Return to login"
      >
        <VerifyEmailFormWrapper email={email} />
      </AuthSplitShell>
    </Suspense>
  );
}