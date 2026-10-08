import { CircleCheck, CircleX, FileX } from "lucide-react";
import type { CSSProperties } from "react";
import { BrandMark } from "@/components/brand/brand";
import { SectionHeader } from "@/components/ui/section-header";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function Comparison({ t }: { t: Dictionary["compare"] }) {
  return (
    <section id="compare" aria-labelledby="compare-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="compare-title" pill={t.pill} title={t.title} intro={t.intro} />
        <div className="grid gap-5 lg:grid-cols-2">
          <article
            data-reveal
            data-light
            className="card p-7 sm:p-9"
            style={{ background: "linear-gradient(180deg, rgb(28 62 160 / 0.5), rgb(6 12 32 / 0.92))" }}
          >
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-44 bg-[radial-gradient(60%_100%_at_25%_0%,rgb(91_157_255/0.4),transparent_70%)]" />
            <div className="flex items-center gap-4">
              <span className="icon-tile">
                <BrandMark sizes="38px" className="w-[2.375rem]" />
              </span>
              <div>
                <h3 className="text-xl font-medium text-fg">{t.us.name}</h3>
                <p className="text-sm text-fg-2">{t.us.body}</p>
              </div>
            </div>
            <ul className="mt-7 divide-y divide-white/[0.07]">
              {t.us.points.map((point) => (
                <li key={point} className="flex items-center gap-3 py-3.5 text-[0.9375rem] text-fg">
                  <CircleCheck aria-hidden className="size-5 shrink-0 text-blue-2" strokeWidth={1.75} />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article
            data-reveal
            data-light
            className="card p-7 sm:p-9"
            style={{ "--d": 120, background: "linear-gradient(180deg, rgb(120 30 52 / 0.26), rgb(10 8 24 / 0.92))" } as CSSProperties}
          >
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-44 bg-[radial-gradient(60%_100%_at_25%_0%,rgb(240_98_107/0.18),transparent_70%)]" />
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-[0.95rem] bg-red/10 text-red ring-1 ring-red/25">
                <FileX aria-hidden className="size-[1.375rem]" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-xl font-medium text-fg">{t.them.name}</h3>
                <p className="text-sm text-fg-2">{t.them.body}</p>
              </div>
            </div>
            <ul className="mt-7 divide-y divide-white/[0.07]">
              {t.them.points.map((point) => (
                <li key={point} className="flex items-center gap-3 py-3.5 text-[0.9375rem] text-fg-2">
                  <CircleX aria-hidden className="size-5 shrink-0 text-red/90" strokeWidth={1.75} />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
