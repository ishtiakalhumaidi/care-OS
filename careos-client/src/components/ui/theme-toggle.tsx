"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const THEMES = [
  { mode: "light" as const, Icon: Sun, activeColor: "text-primary" },
  { mode: "dark" as const, Icon: Moon, activeColor: "text-primary" },
  { mode: "system" as const, Icon: Monitor, activeColor: "text-secondary" },
];

function subscribe() {
  return () => {};
}

// Client-side always mounted; server snapshot always false.
// No effect, no setState-in-effect — satisfies the linter entirely.
function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="h-12 w-[120px] animate-pulse rounded-full border border-slate-200 bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800" />
    );
  }

  const activeIndex = THEMES.findIndex((t) => t.mode === theme);

  return (
    <div className="relative flex h-12 w-fit items-center rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <motion.div
        className="absolute z-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        initial={false}
        style={{ top: 4, bottom: 4, width: 40, left: 4 }}
        animate={{ x: Math.max(activeIndex, 0) * 40 }}
      />

      {THEMES.map(({ mode, Icon, activeColor }) => (
        <button
          key={mode}
          type="button"
          onClick={() => setTheme(mode)}
          className={cn(
            "relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            theme === mode
              ? activeColor
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          )}
          aria-label={`${mode} mode`}
          aria-pressed={theme === mode}
        >
          <Icon className="h-4 w-4" strokeWidth={theme === mode ? 2.5 : 2} />
        </button>
      ))}
    </div>
  );
}