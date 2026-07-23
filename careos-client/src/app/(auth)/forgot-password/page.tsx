import React from "react";
import ForgotPasswordFormWrapper from "@/components/auth/ForgotPasswordFormWrapper";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitShell
      eyebrow="CareOS Security"
      heading="Reset your password"
      subheading="Enter your email address and we will send you a secure link to reset your password."
      footer={
        <>
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <ForgotPasswordFormWrapper />
    </AuthSplitShell>
  );
}