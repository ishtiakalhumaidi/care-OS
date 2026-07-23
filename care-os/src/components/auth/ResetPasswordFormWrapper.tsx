/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { resetPassword, IResetPasswordPayload } from "@/services/auth.services";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string().length(6, "Code must be exactly 6 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const validateWithZod = (schema: z.ZodTypeAny) => ({ value }: { value: any }) => {
  const result = schema.safeParse(value);
  if (!result.success) return result.error.errors[0].message;
  return undefined;
};

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function ResetPasswordFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully. Please log in.");
      router.push("/login");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to reset password.");
    },
  });

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      if (value.newPassword !== value.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      const { confirmPassword, ...payload } = value;
      mutate(payload as IResetPasswordPayload);
    },
  });

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the code we emailed you along with your new password.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="email"
          validators={{ onChange: validateWithZod(resetPasswordSchema.shape.email) }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="otp"
          validators={{ onChange: validateWithZod(resetPasswordSchema.shape.otp) }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Verification Code
              </label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="6-digit code"
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="newPassword"
          validators={{ onChange: validateWithZod(resetPasswordSchema.shape.newPassword) }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                New Password
              </label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["newPassword"],
            onChange: ({ value, fieldApi }) => {
              const newPassword = fieldApi.form.getFieldValue("newPassword");
              if (value !== newPassword) return "Passwords do not match";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}