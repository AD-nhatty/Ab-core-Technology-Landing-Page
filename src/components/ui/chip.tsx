import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const tones = {
  cyan: "bg-cyan/12 text-cyan",
  green: "bg-green/12 text-green",
  amber: "bg-amber/14 text-amber",
  blue: "bg-blue-2/15 text-blue-2",
  red: "bg-red/12 text-red",
  glass: "bg-white/[0.08] text-fg",
};

export type ChipTone = keyof typeof tones;

export function Chip({ tone = "cyan", children, className }: { tone?: ChipTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "data inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[0.6875rem] leading-none font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
