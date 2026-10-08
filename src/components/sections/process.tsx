import { Users } from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeader } from "../ui/section-header";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { fill } from "../../lib/format";

export function Process({ t }: { t: Dictionary["process"] }) {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="process-title" pill={t.pill} title={t.title} intro={t.intro} />
        {/* A real sequence, so the phases are numbered. */}
        <ol className="grid gap-px overflow-hidden rounded-[1.75rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              data-ripple
              className="relative bg-[linear-gradient(180deg,#081433,#040a1d)] p-7 sm:p-8"
              style={{ "--d": i * 90 } as CSSProperties}
            >
              <span aria-hidden className="data absolute end-6 top-5 text-6xl font-medium text-white/[0.035]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pill glass">{fill(t.stepLabel, { n: i + 1 })}</span>
              <h3 className="h-card mt-7 text-fg">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] text-fg-2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p data-reveal className="mt-8 flex items-center justify-center gap-3 text-center text-fg-2">
          <Users aria-hidden className="size-5 shrink-0 text-cyan" strokeWidth={1.75} />
          {t.note}
        </p>
      </div>
    </section>
  );
}
