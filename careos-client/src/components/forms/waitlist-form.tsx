"use client";

import * as React from "react";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = waitlistSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      // TODO: replace with POST /api/waitlist
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <CheckCircle2 className="size-8 text-primary" />
        <p className="font-medium text-foreground">You&apos;re on the list.</p>
        <p className="text-sm text-muted-foreground">We&apos;ll email you the moment we open a spot.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@yourcenter.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl bg-background/70"
          aria-invalid={status === "error"}
        />
        {error && <p className="mt-1.5 text-left text-xs text-secondary">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 shrink-0 rounded-xl bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90"
      >
        {status === "loading" ? "Joining..." : "Join the waitlist"}
        {status !== "loading" && <ArrowRight className="ml-1.5 size-4" />}
      </Button>
    </form>
  );
}