import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "../ui/count-up";
import { SectionHeader } from "../ui/section-header";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { cn } from "../../lib/cn";

const VOLUME = [22, 28, 26, 34, 38, 36, 46, 52, 50, 61, 68, 74, 82, 92];

function VolumeBars() {
  return (
    <div aria-hidden className="flex h-full items-end gap-1.5">
      {VOLUME.map((height, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-t-md",
            i >= VOLUME.length - 3
              ? "bg-[linear-gradient(180deg,#6edcf6,#2f6df0)] shadow-[0_0_16px_rgb(56_200_234/0.5)]"
              : "bg-[linear-gradient(180deg,rgb(91_157_255/0.45),rgb(91_157_255/0.06))]",
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function Ring({ value }: { value: number }) {
  return (
    <div aria-hidden className="flex h-full items-center">
      <svg viewBox="0 0 120 120" className="h-full -rotate-90">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6edcf6" />
            <stop offset="1" stopColor="#2f6df0" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="46" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="12"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${value} 100`}
          style={{ filter: "drop-shadow(0 0 8px rgb(56 200 234 / 0.55))" }}
        />
      </svg>
    </div>
  );
}

function AlwaysOn() {
  return (
    <div aria-hidden className="flex h-full items-center gap-1">
      {Array.from({ length: 24 }, (_, i) => (
        <span key={i} className="h-12 flex-1 rounded-full bg-green shadow-[0_0_10px_rgb(61_214_140/0.4)]" style={{ opacity: 0.45 + (i % 6) * 0.1 }} />
      ))}
    </div>
  );
}

export function Results({ t }: { t: Dictionary["results"] }) {
  const visuals: ReactNode[] = [<VolumeBars key="volume" />, <Ring key="ring" value={70} />, <AlwaysOn key="always" />];

  return (
    <section id="results" aria-labelledby="results-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="results-title" pill={t.pill} title={t.title} intro={t.intro} />
        <div className="grid gap-4 lg:grid-cols-3">
          {t.stats.map((stat, i) => (
            <article
              key={stat.label}
              data-reveal
              data-light
              data-ripple
              className="card flex flex-col p-7 sm:p-8"
              style={{ "--d": i * 100 } as CSSProperties}
            >
              <div className="h-28">{visuals[i]}</div>
              <p className="text-grad mt-7 text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-medium tracking-[-0.045em]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <h3 className="mt-3 font-medium text-fg">{stat.label}</h3>
              <p className="mt-2 text-[0.9375rem] text-fg-2">{stat.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
