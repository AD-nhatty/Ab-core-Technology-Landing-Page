"use client";

import { ArrowUpRight } from "lucide-react";
import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none transition-[box-shadow,background-color] duration-300 disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-sheen text-white bg-[linear-gradient(180deg,#5aa0ff_0%,#2f6df0_55%,#2557d6_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-8px_16px_rgb(10_40_140/0.35),0_0_0_1px_rgb(120_170_255/0.45),0_10px_34px_-8px_rgb(47_124_246/0.85)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.55),inset_0_-8px_16px_rgb(10_40_140/0.3),0_0_0_1px_rgb(150_195_255/0.6),0_16px_46px_-8px_rgb(56_200_234/0.75)] active:shadow-[inset_0_1px_0_rgb(255_255_255/0.6),inset_0_-6px_14px_rgb(10_40_140/0.25),0_0_0_1px_rgb(170_215_255/0.75),0_0_60px_4px_rgb(56_200_234/0.65)] active:duration-75",
  glass: "glass glass-lens text-fg hover:bg-white/[0.06]",
};

/** Squishes on press and springs back with a little give: the "liquid" feel. */
const PRESS = { type: "spring", visualDuration: 0.42, bounce: 0.5 } as const;

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden
      strokeWidth={2}
      className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-px group-hover:-translate-y-px rtl:-scale-x-100 rtl:group-hover:-translate-x-px"
    />
  );
}

type Shared = { variant?: Variant; size?: Size; arrow?: boolean; className?: string; children: ReactNode };

export function ButtonLink({ variant = "primary", size = "md", arrow, className, children, ...rest }: Shared & Omit<HTMLMotionProps<"a">, "children" | "className">) {
  return (
    <m.a
      data-ripple
      data-light={variant === "glass" ? "" : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.94 }}
      transition={PRESS}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
        {arrow && <Arrow />}
      </span>
    </m.a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: Shared & Omit<HTMLMotionProps<"button">, "children" | "className">) {
  return (
    <m.button
      type={type}
      data-ripple
      data-light={variant === "glass" ? "" : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.94 }}
      transition={PRESS}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
        {arrow && <Arrow />}
      </span>
    </m.button>
  );
}
