import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Endless horizontal scroll. The second copy is hidden from assistive tech. */
export function Marquee({ children, speed = 40, gap = "3rem", className }: { children: ReactNode; speed?: number; gap?: string; className?: string }) {
  const style = { "--speed": `${speed}s`, "--gap": gap } as CSSProperties;
  return (
    <div className={cn("marquee", className)} style={style}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
