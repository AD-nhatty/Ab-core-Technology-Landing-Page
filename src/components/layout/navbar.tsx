"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/brand";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

const GLIDE = { type: "spring", visualDuration: 0.38, bounce: 0.28 } as const;

/** Floating liquid-glass capsule. A glass blob glides between links on hover. */
export function Navbar({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="wrap">
        <div
          data-light
          className={cn(
            "glass glass-lens flex h-14 items-center gap-3 rounded-full ps-4 pe-2 transition-[background-color,box-shadow] duration-500 ease-out-expo sm:h-[3.75rem] sm:ps-5",
            (scrolled || open) && "glass-strong",
          )}
        >
          <a id="nav-logo" href="#top" aria-label={t.home} className="flex shrink-0 items-center rounded-md">
            <BrandLogo alt="AB'CORE" sizes="158px" eager className="h-9 sm:h-10" />
          </a>

          <nav aria-label={t.primary} className="mx-auto hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {t.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className="relative rounded-full px-4 py-2 text-sm text-fg-2 transition-colors duration-200 hover:text-fg focus-visible:outline-offset-0"
              >
                {hovered === link.href && (
                  <m.span
                    layoutId="nav-blob"
                    transition={GLIDE}
                    className="absolute inset-0 rounded-full bg-white/[0.09] shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_0_0_1px_rgb(255_255_255/0.06)]"
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
            {/* A full page load: switching language swaps the whole document (lang, dir, fonts). */}
            <a
              href={`/${otherLocale}`}
              hrefLang={otherLocale}
              lang={otherLocale}
              aria-label={t.switchAria}
              data-ripple
              className="grid h-9 place-items-center rounded-full px-3.5 text-[0.8125rem] font-medium text-fg-2 transition-colors duration-200 hover:bg-white/[0.07] hover:text-fg"
            >
              {t.switchLabel}
            </a>
            <a href={SITE.loginUrl} className="hidden rounded-full px-3 py-2 text-sm text-fg-2 transition-colors duration-200 hover:text-fg lg:inline">
              {t.login}
            </a>
            <ButtonLink href="#contact" size="sm" arrow className="max-sm:hidden">
              {t.demo}
            </ButtonLink>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={() => setOpen((value) => !value)}
              data-ripple
              className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/[0.07] lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-[1.125rem]">
                <span className={cn("absolute inset-x-0 top-0.5 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-out-expo", open && "translate-y-[3.25px] rotate-45")} />
                <span className={cn("absolute inset-x-0 bottom-0.5 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-out-expo", open && "-translate-y-[3.25px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              ref={sheet}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.18 } }}
              transition={{ type: "spring", visualDuration: 0.4, bounce: 0.25 }}
              style={{ transformOrigin: "top center" }}
              className="glass glass-strong mt-2 rounded-[1.75rem] p-2 lg:hidden"
            >
              <nav aria-label={t.primary}>
                {[...t.links, { href: "#contact", label: t.demo }].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ripple
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 text-lg text-fg transition-colors hover:bg-white/[0.06]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
