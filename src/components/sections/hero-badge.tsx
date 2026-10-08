"use client";

import { ChevronRight } from "lucide-react";
import { intlLocaleOf, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { plural } from "@/lib/format";
import { useToday } from "@/lib/hooks";
import { MILESTONES, daysUntil, nextMilestone, type MilestoneId } from "@/lib/mandate";

/** Names the next mandate deadline and counts the days to it, so the hero never goes stale. */
export function HeroBadge({ locale, t }: { locale: Locale; t: Dictionary["hero"] }) {
  const today = useToday();
  const id: MilestoneId = today === null ? MILESTONES[0].id : nextMilestone(today);
  const milestone = MILESTONES.find((m) => m.id === id);

  let left: string | null = null;
  if (today !== null && milestone) {
    const n = daysUntil(today, milestone.until);
    left = n === 0 ? t.today : plural(intlLocaleOf(locale), t.daysLeft, n);
  }

  return (
    <a
      href="#mandate"
      data-ripple
      data-light
      className="glass glass-lens inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 ps-1.5 pe-3.5 text-[0.8125rem] text-fg-2 transition-colors duration-200 hover:text-fg"
    >
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#5aa0ff,#2557d6)] px-2.5 py-1 text-xs font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]">
        <span aria-hidden className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgb(255_255_255/0.9)]" />
        {t.badgeLabel}
      </span>
      <span className="hidden truncate sm:inline">{t.milestones[id]}</span>
      {left && (
        <span className="shrink-0 font-medium text-fg">
          <span className="hidden sm:inline">· </span>
          {left}
        </span>
      )}
      <ChevronRight aria-hidden className="size-4 shrink-0 rtl:-scale-x-100" />
    </a>
  );
}
