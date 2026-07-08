import React from "react";

export function SystemOrbitals() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-40 dark:opacity-20 select-none">
      {/* Outer Dashed Ring */}
      <svg
        className="absolute h-[800px] w-[800px] animate-[spin_60s_linear_infinite]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle
          cx="400"
          cy="400"
          r="390"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/30"
          strokeDasharray="4 12"
        />
      </svg>

      {/* Middle Solid Ring */}
      <svg
        className="absolute h-[600px] w-[600px] animate-[spin_45s_linear_infinite_reverse]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle
          cx="300"
          cy="300"
          r="290"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border/80"
        />
        {/* Abstract Data Nodes on the ring */}
        <circle cx="300" cy="10" r="4" className="fill-primary" />
        <circle cx="10" cy="300" r="4" className="fill-secondary" />
      </svg>

      {/* Inner Complex Ring */}
      <svg
        className="absolute h-[400px] w-[400px] animate-[spin_30s_linear_infinite]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="190"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary/20"
          strokeDasharray="20 10 5 10"
        />
      </svg>

      {/* Soft Aurora Mesh behind the orbitals */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vw] w-[50vw] rounded-full bg-primary/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 h-[40vw] w-[40vw] rounded-full bg-secondary/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
    </div>
  );
}