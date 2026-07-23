import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  MessageSquareHeart,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SystemOrbitals } from "@/components/ui/system-orbitals";

interface AuthSplitShellProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  backHref?: string;
  backLabel?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const trustPoints = [
  { icon: ShieldCheck, label: "Ratios tracked automatically" },
  { icon: Users, label: "Every guardian relationship, verified" },
  { icon: MessageSquareHeart, label: "Parents kept in the loop" },
];

export function AuthSplitShell({
  eyebrow,
  heading,
  subheading,
  backHref,
  backLabel = "Back",
  footer,
  children,
}: AuthSplitShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden overflow-hidden bg-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <SystemOrbitals />

        <Link
          href="/"
          className="relative z-10 w-fit rounded-lg outline-none [&_span]:text-background focus-visible:ring-2 focus-visible:ring-background/40"
        >
          <Logo />
        </Link>

        <div className="relative z-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-background/60">
            {eyebrow}
          </p>
          <h2 className="max-w-md text-balance font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-background">
            {heading}
          </h2>
          <p className="mt-4 max-w-sm text-balance font-body text-sm leading-relaxed text-background/70">
            {subheading}
          </p>
        </div>

        <ul className="relative z-10 space-y-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm text-background/80"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background/10">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-col bg-background px-6 py-8 sm:px-12 sm:py-10">
        <div className="flex items-center justify-between">
          {backHref ? (
            <Link
              href={backHref}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {backLabel}
            </Link>
          ) : (
            <Link
              href="/"
              className="w-fit rounded-lg outline-none lg:hidden focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <Logo />
            </Link>
          )}
          <ThemeProvider />
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
              {heading}
            </h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {subheading}
            </p>

            <div className="mt-8">{children}</div>
          </div>
        </div>

        {footer && (
          <div className="rounded-2xl border border-border/60 bg-card/30 px-5 py-4 text-center text-sm text-muted-foreground backdrop-blur-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
