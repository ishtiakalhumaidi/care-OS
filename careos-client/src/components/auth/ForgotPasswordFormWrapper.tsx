/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { publicApi } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/errorUtils";
import {
  Loader2,
  ArrowRight,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const requestOtpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z.object({
  otp: z.string().length(6, "Verification code must be exactly 6 digits"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid input";
};

const validateWithZod =
  (schema: z.ZodTypeAny) =>
  ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    if (!result.success) return result.error.issues[0]?.message;
    return undefined;
  };

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

const PasswordRules = ({ password }: { password: string }) => {
  const hasStarted = password.length > 0;

  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-out",
        hasStarted
          ? "mt-3 grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div className="space-y-1.5 rounded-xl border border-border bg-muted p-3">
          <p className="mb-2 text-xs font-medium text-foreground">
            Password requirements
          </p>
          {rules.map((rule, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-300",
                rule.valid
                  ? "font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {rule.valid ? (
                <Check className="size-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <X className="size-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ForgotPasswordFormWrapper() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitAttempt, setSubmitAttempt] = useState(0);

  const requestOtpMutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      const response = await publicApi.post("/auth/forgot-password", values);
      return response.data;
    },
    onSuccess: (_, variables) => {
      setSubmittedEmail(variables.email);
      setStep(2);
      toast.success("Verification code sent to your email.");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to send reset link."));
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (values: { otp: string; newPassword: string }) => {
      const response = await publicApi.post("/auth/reset-password", {
        email: submittedEmail,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully. Please log in.");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to reset password."));
    },
  });

  const requestForm = useForm({
    defaultValues: { email: "" },
    onSubmit: ({ value }) => requestOtpMutation.mutate(value),
  });

  const resetForm = useForm({
    defaultValues: { otp: "", newPassword: "" },
    onSubmit: ({ value }) => resetPasswordMutation.mutate(value),
  });

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-400">
          <p className="text-sm font-medium">
            We sent a 6-digit verification code to{" "}
            <span className="font-bold">{submittedEmail}</span>
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSubmitAttempt((n) => n + 1);
            resetForm.handleSubmit();
          }}
          className="space-y-5"
        >
          <resetForm.Field
            name="otp"
            validators={{
              onChange: validateWithZod(resetPasswordSchema.shape.otp),
            }}
          >
            {(field) => {
              const hasError =
                field.state.meta.errors && field.state.meta.errors.length > 0;
              return (
                <div
                  className={cn(
                    hasError && submitAttempt > 0 && "animate-shake",
                  )}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground"
                  >
                    6-digit verification code
                  </label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      <KeyRound className="size-4" aria-hidden="true" />
                    </div>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value.trim())
                      }
                      type="text"
                      maxLength={6}
                      className={cn(
                        inputClass,
                        "pl-10 font-mono text-lg tracking-widest",
                        hasError &&
                          "border-destructive focus:border-destructive focus:ring-destructive/40",
                      )}
                      placeholder="000000"
                      disabled={resetPasswordMutation.isPending}
                    />
                  </div>
                  {hasError ? (
                    <p className="mt-1.5 text-xs text-destructive">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </resetForm.Field>

          <resetForm.Field
            name="newPassword"
            validators={{
              onChange: validateWithZod(resetPasswordSchema.shape.newPassword),
            }}
          >
            {(field) => {
              const hasError =
                field.state.meta.errors && field.state.meta.errors.length > 0;
              return (
                <div
                  className={cn(
                    hasError && submitAttempt > 0 && "animate-shake",
                  )}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground"
                  >
                    New password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      className={cn(
                        inputClass,
                        hasError &&
                          "border-destructive focus:border-destructive focus:ring-destructive/40",
                      )}
                      placeholder="••••••••"
                      disabled={resetPasswordMutation.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <PasswordRules password={field.state.value} />
                </div>
              );
            }}
          </resetForm.Field>

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resetPasswordMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Resetting password...
              </>
            ) : (
              <>
                Confirm new password
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => requestOtpMutation.mutate({ email: submittedEmail })}
            disabled={requestOtpMutation.isPending}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
          >
            Didn&apos;t receive a code? Resend
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSubmitAttempt((n) => n + 1);
        requestForm.handleSubmit();
      }}
      className="space-y-5"
    >
      <requestForm.Field
        name="email"
        validators={{ onChange: validateWithZod(requestOtpSchema.shape.email) }}
      >
        {(field) => {
          const hasError =
            field.state.meta.errors && field.state.meta.errors.length > 0;
          return (
            <div
              className={cn(hasError && submitAttempt > 0 && "animate-shake")}
            >
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail className="size-4" aria-hidden="true" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  className={cn(
                    inputClass,
                    "pl-10",
                    hasError &&
                      "border-destructive focus:border-destructive focus:ring-destructive/40",
                  )}
                  placeholder="owner@daycare.com"
                  disabled={requestOtpMutation.isPending}
                />
              </div>
              {hasError ? (
                <p className="mt-1.5 text-xs text-destructive">
                  {getErrorMessage(field.state.meta.errors[0])}
                </p>
              ) : null}
            </div>
          );
        }}
      </requestForm.Field>

      <button
        type="submit"
        disabled={requestOtpMutation.isPending}
        className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {requestOtpMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending code...
          </>
        ) : (
          <>
            Send verification code
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
