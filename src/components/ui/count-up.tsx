"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";

/** Counts up to `value` the first time it scrolls into view. The server renders the final number. */
export function CountUp({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.9, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(v) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{Math.round(display).toLocaleString("en-US")}</span>
      {suffix}
    </span>
  );
}
