/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const verifySchema = z.object({
  otp: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numerical digits"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

interface VerifyEmailFormWrapperProps {
  email: string;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid input parameter";
};

const validateWithZod = (schema: z.ZodTypeAny) =>
  ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.issues[0]?.message;
    }
    return undefined;
  };

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-center text-2xl tracking-[0.5em] font-mono text-foreground placeholder:text-muted-foreground placeholder:tracking-normal shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export default function VerifyEmailFormWrapper({ email }: VerifyEmailFormWrapperProps) {
  const router = useRouter();
  
  // 120 seconds = 2 minutes
  const [countdown, setCountdown] = useState<number>(0);

  // Timer Effect
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

 // OTP Verification Mutation
  const verifyMutation = useMutation({
    mutationFn: async (values: VerifyFormValues) => {
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email,
        otp: values.otp,
      });

      if (error) throw new Error(error.message);
      return data; 
    },
    onSuccess: (data: any) => {
    
      if (data?.status || data?.user?.emailVerified) {
        toast.success("Identity verified. Please log in to establish your session.");
        
       
        router.push("/login?verified=true"); 
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Verification failed. Invalid or expired token.");
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) throw new Error(error.message);
      return data as { success?: boolean };
    },
    onSuccess: (data) => {
      if (data?.success || data) {
        toast.success("A new verification code has been transmitted.");
        setCountdown(120); 
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to transmit new code.");
    },
  });

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: ({ value }) => {
      if (!email) {
        toast.error("Email parameter missing. Please restart the login sequence.");
        return;
      }
      verifyMutation.mutate(value);
    },
  });

  // Helper to format remaining seconds into M:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {!email && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive flex items-center gap-2">
            System Error: Email identity missing from current context.
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <form.Field name="otp" validators={{ onChange: validateWithZod(verifySchema.shape.otp) }}>
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                  6-Digit Authentication Code
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className={inputClass}
                  placeholder="------"
                  disabled={verifyMutation.isPending || !email}
                />
                {field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                  <p className="mt-1.5 text-xs text-secondary">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        </div>

        <button
          type="submit"
          disabled={verifyMutation.isPending || !email}
          className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {verifyMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Verifying sequence...
            </>
          ) : (
            <>
              Authorize connection
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-center pt-2 border-t border-border/40">
        <button
          type="button"
          onClick={() => resendMutation.mutate()}
          disabled={resendMutation.isPending || countdown > 0 || !email}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resendMutation.isPending ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw 
              className={cn("size-3.5", countdown > 0 && "opacity-50")} 
              aria-hidden="true" 
            />
          )}
          {countdown > 0 
            ? `Resend transmission code in ${formatTime(countdown)}` 
            : "Resend transmission code"}
        </button>
      </div>
    </div>
  );
}