import { Nav } from "@/components/common/nav";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { SystemOrbitals } from "@/components/ui/system-orbitals";

const features = [
  "Enrollment",
  "Attendance",
  "Parent Messaging",
  "Billing",
  "Daily Reports",
  "Live Staff Ratios",
];

const stats = [
  { value: "All-In-One", label: "Center Operations" },
  { value: "Real-Time", label: "Compliance & Ratios" },
  { value: "2026", label: "Launching Soon" },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      
      <SystemOrbitals />

      <Nav />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24">
        
        {/* Minimalist Status Badge */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
            </span>
            System Architecture in Progress
          </span>
        </div>

        {/* Hero Headline - Utilizing Bricolage Grotesque */}
        <h1 className="max-w-5xl text-balance text-center font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          The Operating System <br />
          <span className="text-primary/90">
            for Modern Childcare.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-balance text-center text-lg leading-relaxed text-muted-foreground sm:text-xl font-body">
          One unified platform for enrollment, complex staff ratios, and family communication. 
          Stop managing chaotic software, start building a better center.
        </p>

        {/* Interactive Feature Chips */}
        <div className="mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {features.map((feature) => (
            <span
              key={feature}
              className="cursor-default rounded-full border border-border bg-card/20 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-primary/30"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* High-Fidelity Product Skeleton (The Hook) */}
        <div className="mt-20 w-full max-w-5xl perspective-[2000px]">
          <div className="rounded-2xl border border-border/60 bg-card/30 p-2 shadow-2xl shadow-primary/10 backdrop-blur-2xl transition-transform duration-700 hover:rotate-x-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/80 bg-background/95">
              
              {/* Fake MacOS Header */}
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="h-5 w-48 rounded-md bg-muted/50" />
                <div className="h-6 w-6 rounded-full bg-primary/20" />
              </div>

              {/* Wireframe Dashboard Layout */}
              <div className="flex h-full p-4 gap-4">
                {/* Sidebar */}
                <div className="w-48 flex-shrink-0 space-y-3 hidden sm:block">
                  <div className="h-8 w-full rounded-lg bg-primary/10" />
                  <div className="h-8 w-3/4 rounded-lg bg-muted/40" />
                  <div className="h-8 w-5/6 rounded-lg bg-muted/40" />
                  <div className="h-8 w-2/3 rounded-lg bg-muted/40" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Top Stats */}
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 rounded-xl border border-border/50 bg-card p-4 space-y-2">
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="h-8 w-1/2 rounded bg-foreground/10" />
                    </div>
                    {/* Simulated Ratio Alert Component */}
                    <div className="flex-1 rounded-xl border border-secondary/30 bg-secondary/5 p-4 space-y-2 relative overflow-hidden">
                      <div className="absolute right-0 top-0 h-full w-1 bg-secondary animate-pulse" />
                      <div className="h-4 w-1/2 rounded bg-secondary/60" />
                      <div className="h-8 w-1/3 rounded bg-secondary/80" />
                    </div>
                    <div className="flex-1 rounded-xl border border-border/50 bg-card p-4 space-y-2 hidden md:block">
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="h-8 w-1/2 rounded bg-foreground/10" />
                    </div>
                  </div>

                  {/* Complex Data Table Skeleton */}
                  <div className="flex-1 rounded-xl border border-border/50 bg-card p-4">
                    <div className="h-6 w-1/4 rounded bg-muted/60 mb-6" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4 border-b border-border/40 pb-3">
                          <div className="h-8 w-8 rounded-full bg-muted" />
                          <div className="space-y-2 flex-1">
                            <div className="h-3 w-1/3 rounded bg-foreground/10" />
                            <div className="h-2 w-1/4 rounded bg-muted" />
                          </div>
                          <div className="h-6 w-20 rounded-full bg-primary/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay Glass */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px]">
                <div className="rounded-full border border-border/80 bg-card/90 px-6 py-3 font-mono text-sm shadow-xl text-foreground backdrop-blur-xl">
                  Dashboard Architecture Loading...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Section */}
        <section className="mt-24 w-full max-w-md relative z-20">
          <div className="mb-6 text-center space-y-2">
            <h3 className="font-display text-2xl font-semibold text-foreground">Secure your spot.</h3>
            <p className="text-sm text-muted-foreground">
              Join the first childcare centers upgrading their operational architecture.
            </p>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card/60 p-2 shadow-2xl shadow-primary/5 backdrop-blur-xl">
            <WaitlistForm />
          </div>
        </section>

        {/* Stat Footer */}
        <div className="mt-20 border-t border-border/50 pt-10 w-full max-w-4xl flex flex-wrap items-center justify-center gap-12 sm:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-muted-foreground/60 text-center">
          Engineered for scale. No spam. One email when we open the doors.
        </p>
      </main>
    </div>
  );
}