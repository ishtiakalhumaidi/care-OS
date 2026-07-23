import React from "react";
import { cn } from "@/lib/utils";

interface SystemOrbitalsProps {
  /**
   * "auto" — follows the site's light/dark theme (default; use on bg-background).
   * "inverted" — always renders the dark-surface treatment, regardless of site
   * theme. Use on permanently dark panels (e.g. bg-foreground brand panels),
   * since those don't flip brightness the same way bg-background does.
   */
  variant?: "auto" | "inverted";
  className?: string;
}

export function SystemOrbitals({ variant = "auto", className }: SystemOrbitalsProps) {
  const inverted = variant === "inverted";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none",
        inverted ? "opacity-25" : "opacity-40 dark:opacity-20",
        className,
      )}
    >
      {/* Outer dashed ring */}
      <svg
        className="absolute h-[800px] w-[800px] motion-safe:animate-[spin_60s_linear_infinite]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle
          cx="400"
          cy="400"
          r="390"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className={inverted ? "text-background/25" : "text-primary/30"}
          strokeDasharray="4 12"
        />
      </svg>

      {/* Middle solid ring with data nodes */}
      <svg
        className="absolute h-[600px] w-[600px] motion-safe:animate-[spin_45s_linear_infinite_reverse]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle
          cx="300"
          cy="300"
          r="290"
          stroke="currentColor"
          strokeWidth="1"
          className={inverted ? "text-background/20" : "text-border/80"}
        />
        <circle cx="300" cy="10" r="4" className={inverted ? "fill-background/70" : "fill-primary"} />
        <circle cx="10" cy="300" r="4" className={inverted ? "fill-background/40" : "fill-secondary"} />
        <circle cx="590" cy="300" r="3" className={inverted ? "fill-background/30" : "fill-primary/60"} />
      </svg>

      {/* Inner complex ring */}
      <svg
        className="absolute h-[400px] w-[400px] motion-safe:animate-[spin_30s_linear_infinite]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="190"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className={inverted ? "text-background/15" : "text-secondary/20"}
          strokeDasharray="20 10 5 10"
        />
      </svg>

      {/* Soft aurora mesh */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]",
          inverted ? "mix-blend-screen" : "mix-blend-multiply dark:mix-blend-screen",
        )}
      />
      <div
        className={cn(
          "absolute left-1/3 top-1/3 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[100px]",
          inverted ? "mix-blend-screen" : "mix-blend-multiply dark:mix-blend-screen",
        )}
      />
    </div>
  );
}