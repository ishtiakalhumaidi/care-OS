import { Loader2 } from "lucide-react";
import { SystemOrbitals } from "@/components/ui/system-orbitals";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <SystemOrbitals />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading
        </p>
      </div>
    </div>
  );
}