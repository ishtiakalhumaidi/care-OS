/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { publicApi } from "@/lib/api-client";
import { Check, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  tenantName: z.string().min(3, "Organization name must be at least 3 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid input";
};

const validateWithZod = (schema: z.ZodTypeAny) =>
  ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.issues[0]?.message;
    }
    return undefined;
  };

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

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export default function RegisterTenantFormWrapper() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      const response = await publicApi.post("/auth/register", values);
      return response.data;
    },
  onSuccess: (data, variables) => {
      toast.success("Account created! Please check your email for the OTP.");
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      tenantName: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    const { name, email, password } = form.state.values;

    const isPasswordValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!name || !email || !isPasswordValid) {
      form.validate("submit");
      toast.error("Please fill out all fields correctly before continuing.");
      return;
    }

    setStep(2);
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              step >= s ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/*  User Credentials */}
        <div className={step === 1 ? "block" : "hidden"}>
          <div className="space-y-4">
            <form.Field name="name" validators={{ onChange: validateWithZod(registerSchema.shape.name) }}>
              {(field) => (
                <div>
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                    Full name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    className={inputClass}
                    placeholder="John Doe"
                  />
                  {field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                    <p className="mt-1.5 text-xs text-secondary">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="email" validators={{ onChange: validateWithZod(registerSchema.shape.email) }}>
              {(field) => (
                <div>
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    className={inputClass}
                    placeholder="owner@daycare.com"
                  />
                  {field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                    <p className="mt-1.5 text-xs text-secondary">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="password" validators={{ onChange: validateWithZod(registerSchema.shape.password) }}>
              {(field) => (
                <div>
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="password"
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <PasswordRules password={field.state.value} />
                </div>
              )}
            </form.Field>
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            Continue to center details
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Organization Details */}
        <div className={step === 2 ? "block" : "hidden"}>
          <div className="space-y-4">
            <form.Field name="tenantName" validators={{ onChange: validateWithZod(registerSchema.shape.tenantName) }}>
              {(field) => (
                <div>
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                    Center / organization name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    className={inputClass}
                    placeholder="Sunshine Early Learning Center"
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

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex w-1/3 items-center justify-center rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-2/3 items-center justify-center rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating account..." : "Complete registration"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}