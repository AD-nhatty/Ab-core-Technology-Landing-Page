import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** False on the server and during hydration, then the visitor's real preference. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

const noSubscription = () => () => {};

function localToday() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

/** The visitor's calendar day as a UTC timestamp, or null while rendering on the server. */
export function useToday(): number | null {
  return useSyncExternalStore(noSubscription, localToday, () => null);
}

/** Current time, refreshed every `interval` ms. Null until the first tick in the browser. */
export function useNow(interval = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, interval);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [interval]);
  return now;
}
