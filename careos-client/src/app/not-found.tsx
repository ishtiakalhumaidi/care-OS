import Link from "next/link";
import { CompassIcon, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { SystemOrbitals } from "@/components/ui/system-orbitals";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <SystemOrbitals />

      <header className="relative z-10 flex items-center px-6 py-8 sm:px-10">
        <Link
          href="/"
          className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <Logo />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-border/80 bg-card/30 backdrop-blur-md">
          <CompassIcon className="size-6 text-primary" aria-hidden="true" />
        </span>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          This page wandered off
        </h1>
        <p className="mt-3 max-w-sm text-balance font-body text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>

        <Link
          href="/"
          className="mt-8 flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </main>
    </div>
  );
}
