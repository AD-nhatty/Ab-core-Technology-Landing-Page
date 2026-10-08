"use client";

import { AnimatePresence, m } from "motion/react";
import { Fragment, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { intlLocaleOf, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { cn } from "../../lib/cn";
import { fill, plural, rich } from "../../lib/format";
import { useNow } from "../../lib/hooks";
import { COHORT_DATES, COHORT_IDS, DAY_MS, TIMELINE, daysUntil, deadlineAt, utcDay, type Cohort } from "../../lib/mandate";

type Copy = Dictionary["mandate"];
type Relative = { text: string; past: boolean } | null;

const UNITS = ["days", "hours", "minutes", "seconds"] as const;
/** Within this many days of the appointment deadline, the advice turns urgent. */
const URGENT_DAYS = 45;
/** The selection blob glides with a little overshoot, like a drop of liquid settling. */
const GLIDE = { type: "spring", visualDuration: 0.5, bounce: 0.32 } as const;

const timelineStart = utcDay(TIMELINE.start);
const timelineEnd = utcDay(TIMELINE.end);
const position = (ms: number) => Math.max(0, Math.min(100, ((ms - timelineStart) / (timelineEnd - timelineStart)) * 100));

export function MandateClock({ locale, t }: { locale: Locale; t: Copy }) {
  const [cohort, setCohort] = useState<Cohort>("large");
  const radios = useRef<(HTMLButtonElement | null)[]>([]);
  const now = useNow();
  const intl = intlLocaleOf(locale);
  const dateFormat = useMemo(() => new Intl.DateTimeFormat(intl, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }), [intl]);
  const tickFormat = useMemo(() => new Intl.DateTimeFormat(intl, { month: "short", year: "2-digit", timeZone: "UTC" }), [intl]);
  const format = (iso: string) => dateFormat.format(utcDay(iso));

  const dates = COHORT_DATES[cohort];
  const appointAt = deadlineAt(dates.appoint, "appoint");
  const liveAt = deadlineAt(dates.live, "live");
  const target =
    now === null
      ? null
      : now < appointAt
        ? { at: appointAt, caption: t.untilAppoint, iso: dates.appoint }
        : now < liveAt
          ? { at: liveAt, caption: t.untilLive, iso: dates.live }
          : null;
  const remaining = now !== null && target ? target.at - now : null;
  const parts =
    remaining === null
      ? null
      : {
          days: Math.floor(remaining / DAY_MS),
          hours: Math.floor(remaining / 3_600_000) % 24,
          minutes: Math.floor(remaining / 60_000) % 60,
          seconds: Math.floor(remaining / 1000) % 60,
        };

  let today: number | null = null;
  if (now !== null) {
    const d = new Date(now);
    today = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  }

  const relative = (iso: string): Relative => {
    if (today === null) return null;
    const n = daysUntil(today, iso);
    if (n === 0) return { text: t.today, past: false };
    return n > 0 ? { text: plural(intl, t.daysLeft, n), past: false } : { text: plural(intl, t.daysAgo, -n), past: true };
  };

  let advice: string | null = null;
  if (today !== null) {
    const toAppoint = daysUntil(today, dates.appoint);
    const toLive = daysUntil(today, dates.live);
    advice = toLive <= 0 ? t.advice.live : toAppoint < 0 ? t.advice.late : toAppoint <= URGENT_DAYS ? t.advice.urgent : t.advice.soon;
  }

  const markers = COHORT_IDS.flatMap((id) =>
    (["appoint", "live"] as const).map((type) => ({ key: `${id}-${type}`, iso: COHORT_DATES[id][type], type, active: id === cohort })),
  ).sort((a, b) => Number(a.active) - Number(b.active)); // the selected group's markers paint on top

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const steps: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + COHORT_IDS.length) % COHORT_IDS.length;
    setCohort(COHORT_IDS[next]);
    radios.current[next]?.focus();
  };

  return (
    <div data-reveal data-light className="card mx-auto max-w-5xl p-4 sm:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgb(47_124_246/0.28),transparent_70%)]" />

      <div className="flex justify-center">
        <div role="radiogroup" aria-label={t.question} className="glass flex max-w-full flex-wrap justify-center gap-1 rounded-[1.5rem] p-1 sm:rounded-full">
          {COHORT_IDS.map((id, index) => {
            const checked = id === cohort;
            return (
              <button
                key={id}
                ref={(el) => {
                  radios.current[index] = el;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setCohort(id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn("relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5", checked ? "text-white" : "text-fg-2 hover:text-fg")}
              >
                {checked && (
                  <m.span
                    layoutId="cohort-blob"
                    transition={GLIDE}
                    className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,#5aa0ff,#2557d6)] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_8px_24px_-8px_rgb(47_124_246/0.9)]"
                  />
                )}
                <span className="relative">{t.cohorts[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only">{parts && target ? fill(t.summary, { days: parts.days, caption: target.caption }) : ""}</p>

      {now !== null && !target ? (
        <p className="mt-10 text-center text-lg text-fg">{t.done}</p>
      ) : (
        <div aria-hidden className="mt-8 flex items-start justify-center gap-1 sm:mt-10 sm:gap-3">
          {UNITS.map((unit, i) => {
            const value = parts ? String(parts[unit]).padStart(2, "0") : "––";
            return (
              <Fragment key={unit}>
                <div data-light className="glass w-[4.15rem] rounded-2xl px-1 pt-3 pb-2.5 text-center sm:w-28 sm:pt-5 sm:pb-4">
                  <div className="relative h-9 overflow-hidden sm:h-[3.75rem]">
                    <AnimatePresence initial={false} mode="popLayout">
                      <m.span
                        key={value}
                        initial={{ y: "-70%", opacity: 0, filter: "blur(6px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "70%", opacity: 0, filter: "blur(6px)" }}
                        transition={{ type: "spring", visualDuration: 0.5, bounce: 0.25 }}
                        className="text-grad block text-[2rem] leading-9 font-medium tracking-[-0.04em] tabular-nums sm:text-6xl sm:leading-[3.75rem]"
                      >
                        {value}
                      </m.span>
                    </AnimatePresence>
                  </div>
                  <p className="mt-1 text-[0.6875rem] text-fg-3 sm:text-xs">{t.units[unit]}</p>
                </div>
                {i < UNITS.length - 1 && <span className="pt-2.5 text-xl text-fg-3/70 sm:pt-6 sm:text-4xl">:</span>}
              </Fragment>
            );
          })}
        </div>
      )}

      <p className="mt-5 min-h-[1.6em] text-center text-fg-2">
        {target ? (
          <>
            {target.caption} · <strong className="font-medium text-fg">{format(target.iso)}</strong>
          </>
        ) : null}
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        <DateCard label={t.appointBy} value={format(dates.appoint)} relative={relative(dates.appoint)} />
        <DateCard label={t.liveOn} value={format(dates.live)} relative={relative(dates.live)} />
        <div data-light className="glass rounded-2xl p-5 text-sm leading-relaxed text-fg-2">
          {advice ? rich(advice, { strong: "font-medium text-fg" }) : null}
        </div>
      </div>

      <div aria-hidden className="mt-10 px-1">
        <div className="relative mt-8 mb-6 h-1 rounded-full bg-white/[0.08]">
          {today !== null && (
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-[linear-gradient(90deg,#38c8ea,#5b9dff)] shadow-[0_0_12px_rgb(56_200_234/0.6)] transition-[width] duration-700 ease-out-expo rtl:bg-[linear-gradient(-90deg,#38c8ea,#5b9dff)]"
              style={{ width: `${position(today)}%` }}
            />
          )}
          {markers.map((marker) => (
            <span key={marker.key} className="absolute top-1/2 size-0" style={{ insetInlineStart: `${position(utcDay(marker.iso))}%` }}>
              <span
                className={cn(
                  "absolute top-0 left-0 block size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300",
                  !marker.active && "border-white/25 bg-bg",
                  marker.active && marker.type === "appoint" && "border-blue-2 bg-blue-2 shadow-[0_0_10px_rgb(91_157_255/0.9)]",
                  marker.active && marker.type === "live" && "border-cyan bg-cyan shadow-[0_0_10px_rgb(56_200_234/0.9)]",
                )}
              />
            </span>
          ))}
          {today !== null && (
            <span className="absolute -top-7 size-0" style={{ insetInlineStart: `${position(today)}%` }}>
              <span className="absolute top-0 left-0 -translate-x-1/2 text-[0.6875rem] font-medium whitespace-nowrap text-cyan">{t.today}</span>
            </span>
          )}
        </div>
        <div className="data flex justify-between text-[0.6875rem] text-fg-3">
          {TIMELINE.ticks.map((tick) => (
            <span key={tick}>{tickFormat.format(utcDay(tick))}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DateCard({ label, value, relative }: { label: string; value: string; relative: Relative }) {
  return (
    <div data-light className="glass rounded-2xl p-5">
      <p className="text-xs text-fg-3">{label}</p>
      <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-fg" suppressHydrationWarning>
        {value}
      </p>
      <p className={cn("data mt-2 min-h-[1.25em] text-xs font-medium", relative?.past ? "text-amber" : "text-cyan")}>{relative?.text ?? " "}</p>
    </div>
  );
}
