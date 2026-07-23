import React, { Suspense } from "react";
import ResetPasswordFormWrapper from "@/components/auth/ResetPasswordFormWrapper";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <AuthSplitShell
      eyebrow="CareOS Security"
      heading="Set a new password"
      subheading="Enter the verification code we sent you along with your new password."
      footer={
        <>
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ResetPasswordFormWrapper />
      </Suspense>
    </AuthSplitShell>
  );
}