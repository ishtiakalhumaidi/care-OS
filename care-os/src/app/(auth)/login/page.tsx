import React, { Suspense } from "react";
import LoginFormWrapper from "@/components/auth/LoginFormWrapper";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthSplitShell
      eyebrow="CareOS Access"
      heading="Welcome back"
      subheading="Log in to access your administrative dashboard and manage your center."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Create a center
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
        <LoginFormWrapper />
      </Suspense>
    </AuthSplitShell>
  );
}
