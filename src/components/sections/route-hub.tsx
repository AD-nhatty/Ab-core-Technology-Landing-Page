"use client";

import { Building, Check, FileText, Landmark, Network } from "lucide-react";
import { AnimatePresence, m, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "../brand/brand";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { cn } from "../../lib/cn";
import { usePrefersReducedMotion } from "../../lib/hooks";

type Copy = Dictionary["how"];
type State = "idle" | "active" | "done";

const STEP_MS = 3800;

/*
 * Diagram in a 400 × 300 box. Stations sit at the same percentages, so lines
 * meet them at any size. Centres: ERP (74,150), hub (200,150), access point
 * (326,66), buyer (326,150), FTA (326,234).
 */
const PATHS = [
  "M74 150 H200",
  "M200 150 H252 Q258 150 258 144 V72 Q258 66 264 66 H326",
  "M326 66 V150",
  "M200 150 H252 Q258 150 258 156 V228 Q258 234 264 234 H326",
];
/** Which path carries the light at each step (-1: the hub is working). */
const ACTIVE_PATH = [0, -1, 1, 2, 3];
/** Paths below this index are already travelled at each step. */
const DONE_BELOW = [0, 1, 1, 2, 3];

const stateOf = (node: number, step: number): State => (step === node ? "active" : step > node ? "done" : "idle");
const pathState = (path: number, step: number): State =>
  ACTIVE_PATH[step] === path ? "active" : path < DONE_BELOW[step] ? "done" : "idle";

function Station({ className, icon, name, meta, corner, state }: { className: string; icon: ReactNode; name: string; meta: string; corner: string; state: State }) {
  return (
    <div
      className={cn(
        "absolute w-[29%] -translate-y-1/2 rounded-xl border px-2 py-2 transition-[border-color,background-color,box-shadow] duration-500 sm:px-2.5 sm:py-2.5",
        state === "active" && "border-cyan/60 bg-[#0d2152]/95 shadow-[0_0_0_4px_rgb(56_200_234/0.14),0_14px_34px_-12px_rgb(56_200_234/0.7)]",
        state === "done" && "border-white/15 bg-[#0a1838]/95",
        state === "idle" && "border-white/[0.08] bg-[#081230]/95",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-md transition-colors duration-500 max-md:hidden",
            state === "active" ? "bg-cyan/20 text-cyan" : "bg-white/[0.06] text-blue-2",
          )}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[0.6875rem] leading-tight font-medium text-fg sm:text-[0.78rem]">{name}</p>
          <p className="mt-0.5 truncate text-[0.625rem] text-fg-3 max-sm:hidden sm:text-[0.6875rem]">{meta}</p>
        </div>
      </div>
      <span className="data absolute -top-2 end-2 rounded-md bg-[#0b1840] px-1.5 text-[0.5625rem] leading-4 text-fg-3 ring-1 ring-white/10">{corner}</span>
    </div>
  );
}

export function RouteHub({ t }: { t: Copy }) {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { amount: 0.35 });
  const reduce = usePrefersReducedMotion();
  const running = inView && !reduce;

  // Advance on a timer while the diagram is on screen; any choice restarts the timer.
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setStep((s) => (s + 1) % t.steps.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, step, cycle, t.steps.length]);

  const choose = (index: number) => {
    setStep(index);
    setCycle((c) => c + 1);
  };

  const hub = stateOf(1, step);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <ol data-reveal aria-label={t.pill} className="border-t border-line">
        {t.steps.map((item, index) => {
          const current = index === step;
          return (
            <li key={item.title} className="border-b border-line">
              <button
                type="button"
                onClick={() => choose(index)}
                aria-current={current ? "step" : undefined}
                className="group block w-full py-5 text-start"
              >
                <span className="flex items-baseline gap-3">
                  <span className={cn("data text-sm transition-colors duration-300", current ? "text-cyan" : "text-fg-3")}>
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className={cn("text-lg font-medium tracking-[-0.02em] transition-colors duration-300", current ? "text-fg" : "text-fg-3 group-hover:text-fg-2")}>
                    {item.title}
                  </span>
                </span>
                <m.span
                  initial={false}
                  animate={{ height: current ? "auto" : 0, opacity: current ? 1 : 0 }}
                  transition={{ type: "spring", visualDuration: 0.45, bounce: 0.15 }}
                  className="block overflow-hidden"
                >
                  <span className="block ps-9 pt-2 text-[0.9375rem] text-fg-2">{item.body}</span>
                  <span aria-hidden className="ms-9 mt-4 block h-px overflow-hidden bg-white/10">
                    {current && (
                      <span
                        key={cycle}
                        className="progress-fill block h-full bg-[linear-gradient(90deg,#38c8ea,#5b9dff)]"
                        style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                      />
                    )}
                  </span>
                </m.span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        ref={panelRef}
        data-reveal
        className="relative overflow-hidden rounded-[1.75rem] border border-blue-2/30 p-4 max-lg:order-first sm:p-8 lg:p-10"
        style={{ background: "radial-gradient(120% 90% at 85% 0%, #1f55e0 0%, #0e2d80 32%, #071233 70%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -end-[20%] -top-[30%] h-[80%] w-[70%] rotate-[-14deg] bg-[linear-gradient(200deg,rgb(140_190_255/0.4),transparent_60%)] blur-2xl" />
        <figure className="relative rounded-[1.375rem] bg-[linear-gradient(180deg,#4a82ff,#2253d8_60%,#1a40b0)] p-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_30px_70px_-20px_rgb(5_20_90/0.95)] sm:p-2.5">
          <figcaption className="sr-only">{t.caption}</figcaption>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[0.95rem] bg-[radial-gradient(80%_60%_at_50%_50%,#0d1f55_0%,#060f2e_72%)] ring-1 ring-white/10">
            <div aria-hidden className="hero-dots opacity-60" />
            <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 size-full rtl:-scale-x-100">
              {PATHS.map((d) => (
                <path key={`base-${d}`} d={d} className="beam-base" fill="none" strokeWidth={1.25} />
              ))}
              {PATHS.map((d, index) => (
                <path
                  key={`beam-${d}`}
                  d={d}
                  pathLength={1}
                  className="beam"
                  data-state={pathState(index, step)}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ))}
            </svg>

            <Station className="start-[4%] top-1/2" icon={<FileText className="size-3.5" />} name={t.nodes.erp.name} meta={t.nodes.erp.meta} corner="C1" state={stateOf(0, step)} />
            <Station className="end-[4%] top-[22%]" icon={<Network className="size-3.5" />} name={t.nodes.ap.name} meta={t.nodes.ap.meta} corner="C3" state={stateOf(2, step)} />
            <Station className="end-[4%] top-1/2" icon={<Building className="size-3.5" />} name={t.nodes.buyer.name} meta={t.nodes.buyer.meta} corner="C4" state={stateOf(3, step)} />
            <Station className="end-[4%] top-[78%]" icon={<Landmark className="size-3.5" />} name={t.nodes.fta.name} meta={t.nodes.fta.meta} corner="C5" state={stateOf(4, step)} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={cn(
                  "relative grid size-12 place-items-center rounded-2xl border bg-[linear-gradient(180deg,#1d3d8f,#0b1a48)] transition-[box-shadow,border-color] duration-500 sm:size-16",
                  hub === "active"
                    ? "border-cyan/60 shadow-[0_0_0_6px_rgb(56_200_234/0.14),0_0_44px_rgb(56_200_234/0.6)]"
                    : "border-white/15 shadow-[0_0_30px_rgb(47_124_246/0.4)]",
                )}
              >
                <BrandMark alt="AB'CORE" sizes="(min-width: 40rem) 48px, 36px" className="w-9 sm:w-12" />
                <span className="data absolute -top-2 end-1 rounded-md bg-[#0b1840] px-1.5 text-[0.5625rem] leading-4 text-fg-3 ring-1 ring-white/10">C2</span>
              </div>
              <AnimatePresence>
                {hub === "active" && (
                  <m.ul
                    key="checks"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{ show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } } }}
                    className="absolute top-full left-1/2 mt-2.5 grid -translate-x-1/2 gap-1"
                  >
                    {t.nodes.hub.checks.map((check) => (
                      <m.li
                        key={check}
                        variants={{ hidden: { opacity: 0, y: -4, scale: 0.85 }, show: { opacity: 1, y: 0, scale: 1 } }}
                        transition={{ type: "spring", visualDuration: 0.35, bounce: 0.4 }}
                        className="flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 text-[0.625rem] whitespace-nowrap text-green ring-1 ring-green/25"
                      >
                        <Check className="size-3" strokeWidth={2.5} />
                        {check}
                      </m.li>
                    ))}
                  </m.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}
