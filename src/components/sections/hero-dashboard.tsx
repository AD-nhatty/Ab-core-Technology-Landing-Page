"use client";

import { Bell, FileText, LayoutDashboard, Lock, Network, Plug, Plus, Receipt, Search, Settings, ShieldCheck } from "lucide-react";
import { AnimatePresence, m, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/brand";
import { Chip, type ChipTone } from "@/components/ui/chip";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";

/* An example AB'CORE workspace. All figures are illustrative. */

type Copy = Dictionary["dashboard"];
type Status = "validating" | "signed" | "delivered" | "reported";
type Row = { id: number; status: Status };

const FLOW: Status[] = ["validating", "signed", "delivered", "reported"];
const TONE: Record<Status, ChipTone> = { validating: "amber", signed: "blue", delivered: "cyan", reported: "green" };
const AMOUNTS = [48300, 12650, 7980.5, 31200, 5420, 18975, 64100, 2310.75, 9400, 27840, 15120, 3675];
const FIRST_ID = 418;
const ROW_H = 44;
const VISIBLE = 5;
const TICK_MS = 1100;
const NAV_ICONS = [LayoutDashboard, FileText, Network, Receipt, ShieldCheck, Plug, Settings];
const BASE = { invoices: 10477, delivered: 10431, review: 3, vat: 124445 };
const KPI_KEYS = ["invoices", "delivered", "review", "vat"] as const;
const SEED: Row[] = Array.from({ length: VISIBLE + 1 }, (_, i) => ({ id: FIRST_ID - i, status: "reported" }));

/** 30 days of invoice volume; fixed so the server and browser draw the same chart. */
const SERIES = Array.from({ length: 30 }, (_, i) => 280 + i * 4 + Math.round(Math.sin(i * 0.9) * 26 + Math.cos(i * 0.37) * 18));

const amountOf = (id: number) => AMOUNTS[id % AMOUNTS.length];
const vatOf = (amount: number) => (amount * 5) / 105;
const aed = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const invoiceNo = (id: number) => `INV-2026-${String(id).padStart(5, "0")}`;
const COLS = "grid-cols-[minmax(0,1.3fr)_minmax(0,1.35fr)_minmax(0,1.15fr)_7.25rem] max-sm:grid-cols-[minmax(0,1fr)_7.25rem]";

function chartPaths(values: number[], width = 300, height = 96) {
  const min = Math.min(...values) - 20;
  const max = Math.max(...values) + 10;
  const points = values.map((v, i) => [(i / (values.length - 1)) * width, height - ((v - min) / (max - min)) * height] as const);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];
  return { line, area: `${line} L${width},${height} L0,${height} Z`, dot: { left: `${(lastX / width) * 100}%`, top: `${(lastY / height) * 100}%` } };
}

export function HeroDashboard({ t }: { t: Copy }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(frameRef, { amount: 0.2 });
  const [rows, setRows] = useState<Row[]>(SEED);

  // Tilted back like a screen on a desk, it straightens up as you scroll toward it.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 0.2"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Live feed: the newest invoice moves through each status, then a new one arrives.
  useEffect(() => {
    if (reduce || !inView) return;
    const timer = window.setInterval(() => {
      setRows((current) => {
        const [top] = current;
        if (top.status !== "reported") {
          return [{ ...top, status: FLOW[FLOW.indexOf(top.status) + 1] }, ...current.slice(1)];
        }
        return [{ id: top.id + 1, status: "validating" as Status }, ...current].slice(0, VISIBLE + 1);
      });
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [reduce, inView]);

  const top = rows[0];
  const lastReported = top.status === "reported" ? top.id : top.id - 1;
  const processed = lastReported - FIRST_ID;
  const vatAdded = useMemo(() => {
    let sum = 0;
    for (let id = FIRST_ID + 1; id <= lastReported; id++) sum += vatOf(amountOf(id));
    return sum;
  }, [lastReported]);
  const kpiValues: Record<(typeof KPI_KEYS)[number], string> = {
    invoices: (BASE.invoices + processed).toLocaleString("en-US"),
    delivered: (BASE.delivered + processed + (top.status === "delivered" ? 1 : 0)).toLocaleString("en-US"),
    review: String(BASE.review),
    vat: Math.round(BASE.vat + vatAdded).toLocaleString("en-US"),
  };
  const chart = useMemo(() => chartPaths(SERIES), []);

  return (
    <figure className="relative mx-auto max-w-[68rem] [perspective:1600px]">
      <figcaption className="sr-only">{t.label}</figcaption>
      <m.div
        ref={frameRef}
        aria-hidden
        style={reduce ? undefined : { rotateX, scale, y: lift, transformOrigin: "50% 0%" }}
        className="glass relative rounded-[1.5rem] p-1.5 shadow-[0_60px_140px_-40px_rgb(30_80_230/0.7)]"
      >
        <div className="overflow-hidden rounded-[1.125rem] border border-white/[0.06] bg-[#050b1e]/95 text-start">
          {/* Window chrome */}
          <div className="flex h-11 items-center gap-3 border-b border-white/[0.06] px-4">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-lg bg-white/[0.04] text-[0.6875rem] text-fg-3">
              <Lock className="size-3" strokeWidth={2} />
              <bdi>{t.url}</bdi>
            </div>
            <div className="w-[3.25rem]" />
          </div>

          <div className="grid lg:grid-cols-[13rem_1fr]">
            <aside className="hidden border-e border-white/[0.06] p-3 lg:block">
              <div className="mb-4 px-2 pt-1">
                <BrandLogo alt="AB'CORE" sizes="110px" className="h-7" />
              </div>
              <ul className="grid gap-0.5">
                {t.nav.map((label, i) => {
                  const Icon = NAV_ICONS[i];
                  return (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8125rem]",
                        i === 0 ? "bg-white/[0.07] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]" : "text-fg-3",
                      )}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                      {label}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-green/20 bg-green/[0.06] px-2.5 py-2 text-[0.6875rem] text-green">
                <span className="live-dot" />
                {t.status}
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <p className="text-base font-medium text-fg">{t.title}</p>
                <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[0.6875rem] text-fg-3">{t.period}</span>
                <div className="ms-auto hidden h-8 w-48 items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 text-xs text-fg-3 sm:flex">
                  <Search className="size-3.5" />
                  {t.search}
                </div>
                <span className="hidden size-8 place-items-center rounded-lg bg-white/[0.04] text-fg-3 sm:grid">
                  <Bell className="size-3.5" />
                </span>
                <span className="flex h-8 items-center gap-1.5 rounded-lg bg-[linear-gradient(180deg,#5aa0ff,#2557d6)] px-3 text-xs font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] max-sm:ms-auto">
                  <Plus className="size-3.5" />
                  {t.newInvoice}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
                {KPI_KEYS.map((key) => (
                  <div key={key} className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                    <p className="truncate text-[0.6875rem] text-fg-3">{t.kpis[key]}</p>
                    <p className="mt-1 text-xl font-medium tracking-[-0.02em] text-fg tabular-nums">{kpiValues[key]}</p>
                    <p className="mt-0.5 truncate text-[0.625rem] text-fg-3">{t.kpiNotes[key]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1.45fr_1fr]">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-[0.8125rem] font-medium text-fg">{t.feedTitle}</p>
                    <span className="flex items-center gap-1.5 text-[0.6875rem] text-green">
                      <span className="live-dot" />
                      {t.live}
                    </span>
                  </div>
                  <div className={cn("grid gap-3 border-y border-white/[0.06] px-4 py-2 text-[0.625rem] tracking-[0.06em] text-fg-3 uppercase", COLS)}>
                    <span>{t.cols.invoice}</span>
                    <span className="max-sm:hidden">{t.cols.buyer}</span>
                    <span className="max-sm:hidden">{t.cols.amount}</span>
                    <span>{t.cols.status}</span>
                  </div>
                  <div className="relative overflow-hidden" style={{ height: ROW_H * VISIBLE }}>
                    <AnimatePresence initial={false}>
                      {rows.map((row) => (
                        <m.div
                          key={row.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: ROW_H, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", visualDuration: 0.55, bounce: 0.2 }}
                          className={cn("grid items-center gap-3 overflow-hidden border-b border-white/[0.04] px-4 text-[0.6875rem]", COLS)}
                        >
                          <span className="data truncate text-fg">
                            <bdi>{invoiceNo(row.id)}</bdi>
                          </span>
                          <span className="truncate text-fg-2 max-sm:hidden">{t.buyers[row.id % t.buyers.length]}</span>
                          <span className="data truncate text-fg-2 max-sm:hidden">
                            <bdi>AED {aed(amountOf(row.id))}</bdi>
                          </span>
                          <span className="relative flex">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <m.span
                                key={row.status}
                                initial={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", visualDuration: 0.4, bounce: 0.45 }}
                                className="inline-flex"
                              >
                                <Chip tone={TONE[row.status]}>{t.statuses[row.status]}</Chip>
                              </m.span>
                            </AnimatePresence>
                          </span>
                        </m.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="hidden gap-3 md:grid">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[0.8125rem] font-medium text-fg">{t.chartTitle}</p>
                      <p className="text-[0.6875rem] text-fg-3">{t.chartMeta}</p>
                    </div>
                    <div className="relative mt-3 h-24">
                      <svg viewBox="0 0 300 96" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
                        <defs>
                          <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#5b9dff" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#5b9dff" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="dash-line" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#38c8ea" />
                            <stop offset="1" stopColor="#5b9dff" />
                          </linearGradient>
                        </defs>
                        <path d={chart.area} fill="url(#dash-area)" />
                        <m.path
                          d={chart.line}
                          fill="none"
                          stroke="url(#dash-line)"
                          strokeWidth={2}
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                        />
                      </svg>
                      <span
                        className="live-dot absolute -translate-x-1/2 -translate-y-1/2 bg-cyan! shadow-[0_0_12px_rgb(56_200_234/0.9)]"
                        style={chart.dot}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[0.8125rem] font-medium text-fg">{t.cornersTitle}</p>
                    <ul className="mt-3 grid gap-2">
                      {t.corners.map((corner, i) => (
                        <li key={corner} className="flex items-center gap-2.5 text-xs">
                          <span className="data w-5 text-fg-3">C{i + 1}</span>
                          <span className="truncate text-fg-2">{corner}</span>
                          <span className="ms-auto flex shrink-0 items-center gap-1.5 text-green">
                            <span className="size-1.5 rounded-full bg-green shadow-[0_0_8px_rgb(61_214_140/0.8)]" />
                            {t.connected}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </figure>
  );
}
