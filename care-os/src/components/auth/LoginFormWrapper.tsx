/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { publicApi } from "@/lib/api-client";
import { setSessionCookies } from "@/actions/auth.actions"; 
import { Loader2, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid input";
};

const validateWithZod = (schema: z.ZodTypeAny) => ({ value }: { value: any }) => {
  const result = schema.safeParse(value);
  if (!result.success) {
    return result.error.errors[0].message; 
  }
  return undefined;
};

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export default function LoginFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const isRegistered = searchParams.get("registered") === "true";

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await publicApi.post("/auth/login", values);
      return response.data; // This returns your exact JSON payload
    },
    onSuccess: async (responsePayload) => {
      // 1. Extract tokens from your custom JSON response
      const { accessToken, refreshToken } = responsePayload.data;

      // 2. Pass them to the Server Action to set secure HttpOnly cookies
      if (accessToken && refreshToken) {
        await setSessionCookies(accessToken, refreshToken);
      }

      toast.success("Authentication successful");
      
      router.push("/");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Invalid email or password.");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <div className="space-y-6">
      {(isVerified || isRegistered) && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">
            {isVerified 
              ? "Identity verified. Please log in to establish your session."
              : "Account created! Please log in to continue."}
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field 
          name="email" 
          validators={{ onChange: validateWithZod(loginSchema.shape.email) }}
        >
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
                disabled={isPending}
              />
              {field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                <p className="mt-1.5 text-xs text-destructive">
                  {getErrorMessage(field.state.meta.errors[0])}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field 
          name="password" 
          validators={{ onChange: validateWithZod(loginSchema.shape.password) }}
        >
          {(field) => (
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={inputClass}
                  placeholder="••••••••"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                <p className="mt-1.5 text-xs text-destructive">
                  {getErrorMessage(field.state.meta.errors[0])}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Authenticating...
            </>
          ) : (
            <>
              Sign in to CareOS
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}