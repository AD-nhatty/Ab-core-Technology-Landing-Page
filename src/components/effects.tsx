"use client";

import { useEffect } from "react";

/**
 * Page-wide interaction layer:
 * 1. Scroll reveals for [data-reveal] and [data-words].
 * 2. Pointer-following light on [data-light] (sets --mx / --my).
 * 3. A glow ripple from the press point on [data-ripple].
 */
export function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-words]");
    let observer: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => (el.dataset.shown = ""));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.shown = "";
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
      );
      targets.forEach((el) => observer?.observe(el));
    }

    let frame = 0;
    let lastMove: PointerEvent | null = null;
    const paintLight = () => {
      frame = 0;
      const event = lastMove;
      const el = (event?.target as Element | null)?.closest<HTMLElement>("[data-light]");
      if (!event || !el) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - box.left}px`);
      el.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastMove = event;
      if (!frame) frame = requestAnimationFrame(paintLight);
    };

    const onDown = (event: PointerEvent) => {
      if (reduce) return;
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-ripple]");
      if (!el) return;
      const box = el.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const radius = Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y));
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.setProperty("--x", `${x}px`);
      ripple.style.setProperty("--y", `${y}px`);
      ripple.style.setProperty("--r", `${radius}px`);
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}
