import { Gauge, Globe, Languages, MapPin, Plug, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeader } from "../ui/section-header";
import type { Dictionary } from "../../i18n/dictionaries/en";

const ICONS = [MapPin, Globe, Plug, ShieldCheck, Gauge, Languages];

export function Benefits({ t }: { t: Dictionary["benefits"] }) {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="why-title" pill={t.pill} title={t.title} intro={t.intro} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <article
                key={item.title}
                data-reveal
                data-light
                data-ripple
                className="card p-7"
                style={{ "--d": (i % 3) * 90 } as CSSProperties}
              >
                <span className="icon-tile">
                  <Icon aria-hidden className="size-[1.375rem]" strokeWidth={1.6} />
                </span>
                <h3 className="h-card mt-6 text-fg">{item.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-2">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
