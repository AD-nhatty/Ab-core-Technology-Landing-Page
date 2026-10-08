"use client";

import { Check } from "lucide-react";
import { animate, m } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import logo from "@/assets/brand/logo-reversed.webp";

/*
 * First-visit intro with the official logo. The boot script in the layout adds
 * `html.intro` before first paint (once per session, never with reduced
 * motion), covers the page and starts fetching the logo. The overlay then
 * tells the product story: the circuit lines stream into the document → the
 * wordmark follows → the invoice is validated, delivered and reported → the
 * logo flies into the navbar.
 */

const noSubscription = () => () => {};
const introPending = () => document.documentElement.classList.contains("intro");
const EASE = [0.65, 0, 0.35, 1] as const;
const SOFT = [0.16, 1, 0.3, 1] as const;
/** How long the logo holds before it flies to the navbar, counted from when it starts drawing. */
const LEAVE_AT = 2600;
/** If the logo hasn't loaded by then, skip the intro rather than keep the page waiting. */
const LOAD_TIMEOUT = 1500;

/** The gap between the mark and the wordmark, as % of the logo's width. */
const SPLIT = 36.9;
/** On the document's bottom-right corner, as % of the logo's size. */
const CORNER: CSSProperties = { left: "33.9%", top: "92%" };

/**
 * A soft-edged wipe, left to right: animate maskPosition from 100% to 0%.
 * The edge is half as wide as the element, so it reads as light, not a cut.
 */
const WIPE: CSSProperties = {
  maskImage: "linear-gradient(90deg, #000 40%, transparent 60%)",
  maskSize: "250% 100%",
  maskRepeat: "no-repeat",
};

/** One copy of the logo, `width`% of its frame wide, pinned to one side. */
function Slice({ width, side }: { width: number; side: "left" | "right" }) {
  const full = `${(100 / width) * 100}%`;
  return (
    <div className="absolute inset-y-0" style={side === "left" ? { left: 0, width: full } : { right: 0, width: full }}>
      <Image src={logo} alt="" fill unoptimized loading="eager" className="object-contain" />
    </div>
  );
}

export function Intro({ tagline, steps }: { tagline: string; steps: string[] }) {
  const pending = useSyncExternalStore(noSubscription, introPending, () => false);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const leaving = useRef(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    const root = document.documentElement;
    root.classList.remove("intro", "intro-live", "intro-leaving");
    root.style.removeProperty("overflow");
    try {
      sessionStorage.setItem("abcore-intro", "1");
    } catch {
      /* storage can be unavailable; the intro would simply play again */
    }
    setDone(true);
  }, []);

  /** Fade the extras and the backdrop, fly the logo onto the navbar logo (FLIP), then hand over. */
  const leave = useCallback(async () => {
    if (leaving.current) return;
    leaving.current = true;
    // The hero starts its entrance while the logo is still in flight.
    document.documentElement.classList.add("intro-leaving");
    const jobs: Promise<unknown>[] = [];
    const lockup = lockupRef.current;
    const target = document.getElementById("nav-logo");
    for (const el of [detailsRef.current, badgeRef.current]) {
      if (el) jobs.push(animate(el, { opacity: 0, y: 6 }, { duration: 0.22 }).finished);
    }
    if (lockup && target) {
      const from = lockup.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      jobs.push(
        animate(
          lockup,
          {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: to.width / from.width,
          },
          { duration: 0.85, ease: EASE, delay: 0.08 },
        ).finished,
      );
    }
    if (backdropRef.current) jobs.push(animate(backdropRef.current, { opacity: 0 }, { duration: 0.6, delay: 0.32 }).finished);
    await Promise.all(jobs);
    finish();
  }, [finish]);

  // Take over from the boot script's cover, and wait for the logo before drawing it.
  useEffect(() => {
    if (!pending || done) return;
    const root = document.documentElement;
    root.classList.add("intro-live");
    root.style.overflow = "hidden";
    let live = true;
    const tooSlow = window.setTimeout(leave, LOAD_TIMEOUT);
    const img = new window.Image();
    img.src = logo.src;
    img
      .decode()
      .then(() => {
        if (!live) return;
        window.clearTimeout(tooSlow);
        setReady(true);
      })
      .catch(() => {
        if (live) leave();
      });
    const skip = () => leave();
    window.addEventListener("keydown", skip);
    return () => {
      live = false;
      window.clearTimeout(tooSlow);
      window.removeEventListener("keydown", skip);
    };
  }, [pending, done, leave]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(leave, LEAVE_AT);
    return () => window.clearTimeout(timer);
  }, [ready, leave]);

  if (!pending || done) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[100] grid place-items-center px-6" onPointerDown={() => leave()}>
      <div ref={backdropRef} className="absolute inset-0 bg-bg">
        <div className="hero-dots opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_50%,rgb(47_124_246/0.28),transparent_70%)]" />
      </div>

      {/* Physical left/right throughout: the logo reads left to right in Arabic too. */}
      <div className="relative flex flex-col items-center">
        <div ref={lockupRef} className="relative w-[min(84vw,36rem)]" style={{ aspectRatio: `${logo.width} / ${logo.height}` }}>
          {ready && (
            <>
              {/* A soft light behind the document as the data arrives */}
              <m.div
                className="absolute top-1/2 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(56_200_234/0.38),transparent)]"
                style={{ left: "26%" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.5], scale: 1 }}
                transition={{ duration: 1.8, ease: SOFT }}
              />

              {/* The mark: the circuit lines stream in and the document forms */}
              <m.div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ ...WIPE, width: `${SPLIT}%` }}
                initial={{ maskPosition: "100% 0%", filter: "blur(10px) brightness(1.8)" }}
                animate={{ maskPosition: "0% 0%", filter: "blur(0px) brightness(1)" }}
                transition={{ maskPosition: { delay: 0.1, duration: 1, ease: EASE }, filter: { delay: 0.1, duration: 1.2, ease: SOFT } }}
              >
                <Slice width={SPLIT} side="left" />
              </m.div>

              {/* The wordmark follows, out from behind the document */}
              <m.div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ ...WIPE, width: `${100 - SPLIT}%` }}
                initial={{ maskPosition: "100% 0%", x: "-2.5%", filter: "blur(8px)" }}
                animate={{ maskPosition: "0% 0%", x: "0%", filter: "blur(0px)" }}
                transition={{ delay: 0.7, duration: 0.95, ease: EASE }}
              >
                <Slice width={100 - SPLIT} side="right" />
              </m.div>

              {/* A glint across the finished logo, on the logo's own shapes only */}
              <m.div
                className="absolute inset-0"
                style={{
                  maskImage: `url("${logo.src}")`,
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  backgroundImage: "linear-gradient(100deg, transparent 42%, rgb(255 255 255 / 0.75) 50%, transparent 58%)",
                  backgroundSize: "250% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                initial={{ backgroundPosition: "100% 0%" }}
                animate={{ backgroundPosition: "0% 0%" }}
                transition={{ delay: 1.7, duration: 0.9, ease: "easeInOut" }}
              />

              {/* Validated: a check lands on the document's corner */}
              <div ref={badgeRef} className="absolute aspect-square w-[5.5%] -translate-x-1/2 -translate-y-1/2" style={CORNER}>
                <m.span
                  className="absolute inset-0 rounded-full ring-2 ring-green"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2.6, opacity: [0, 0.8, 0] }}
                  transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                />
                <m.span
                  className="absolute inset-0 grid place-items-center rounded-full bg-green text-bg ring-[3px] ring-bg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.45, type: "spring", visualDuration: 0.4, bounce: 0.55 }}
                >
                  <Check className="size-[62%]" strokeWidth={3} />
                </m.span>
              </div>
            </>
          )}
        </div>

        <div ref={detailsRef} className="mt-8 flex flex-col items-center gap-4 text-center">
          {ready && (
            <>
              <m.p
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.25, duration: 0.6, ease: SOFT }}
                className="text-xs font-medium tracking-[0.32em] text-fg-2 uppercase sm:text-sm"
              >
                {tagline}
              </m.p>
              <div className="flex flex-wrap justify-center gap-2">
                {steps.map((step, i) => (
                  <m.span
                    key={step}
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.45 + i * 0.16, type: "spring", visualDuration: 0.38, bounce: 0.45 }}
                    className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-fg"
                  >
                    <Check className="size-3.5 text-green" strokeWidth={2.5} />
                    {step}
                  </m.span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
