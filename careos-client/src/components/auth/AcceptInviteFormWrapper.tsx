/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { publicApi } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/errorUtils";
import { Loader2, ArrowRight, User, Eye, EyeOff, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const acceptInviteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

type AcceptInviteFormValues = z.infer<typeof acceptInviteSchema>;

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid input";
};

const validateWithZod = (schema: z.ZodTypeAny) => ({ value }: { value: unknown }) => {
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
        hasStarted ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div className="space-y-1.5 rounded-xl border border-border bg-muted p-3">
          <p className="mb-2 text-xs font-medium text-foreground">Password requirements</p>
          {rules.map((rule, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-300",
                rule.valid ? "font-medium text-primary" : "text-muted-foreground",
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

export default function AcceptInviteFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AcceptInviteFormValues) => {
      const response = await publicApi.post("/auth/accept-invite", { token, ...values });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created! Please log in to continue.");
      router.push("/login?registered=true");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to accept invitation."));
    },
  });

  const form = useForm({
    defaultValues: { name: "", password: "" },
    onSubmit: ({ value }) => {
      if (!token) return;
      mutate(value);
    },
  });

  if (!token) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
        <p className="text-sm font-medium text-destructive">
          This invitation link is missing its token. Ask whoever invited you to resend it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSubmitAttempt((n) => n + 1);
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <form.Field name="name" validators={{ onChange: validateWithZod(acceptInviteSchema.shape.name) }}>
        {(field) => {
          const hasError = field.state.meta.errors && field.state.meta.errors.length > 0;
          return (
            <div className={cn(hasError && "animate-shake")}>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Full name
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <User className="size-4" aria-hidden="true" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  className={cn(
                    inputClass,
                    "pl-10",
                    hasError && "border-destructive focus:border-destructive focus:ring-destructive/40",
                  )}
                  placeholder="John Doe"
                  disabled={isPending}
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
      </form.Field>

      <form.Field
        name="password"
        validators={{ onChange: validateWithZod(acceptInviteSchema.shape.password) }}
      >
        {(field) => {
          const hasError = field.state.meta.errors && field.state.meta.errors.length > 0;
          return (
           <div className={cn(hasError && "animate-shake")}>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Password
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
                    hasError && "border-destructive focus:border-destructive focus:ring-destructive/40",
                  )}
                  placeholder="••••••••"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
      </form.Field>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          <>
            Accept invitation
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}