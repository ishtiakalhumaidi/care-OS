import React, { Suspense } from "react";
import AcceptInviteFormWrapper from "@/components/auth/AcceptInviteFormWrapper";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AcceptInvitePage() {
  return (
    <AuthSplitShell
      eyebrow="CareOS Access"
      heading="Join your team"
      subheading="Set your name and password to finish joining your organization on CareOS."
      footer={
        <>
          Already have an account?{" "}
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
        <AcceptInviteFormWrapper />
      </Suspense>
    </AuthSplitShell>
  );
}