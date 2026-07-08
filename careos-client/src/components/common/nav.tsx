import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";

export function Nav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <Logo />
      <ModeToggle />
    </header>
  );
}