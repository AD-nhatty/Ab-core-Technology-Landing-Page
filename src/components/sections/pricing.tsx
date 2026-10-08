import { Check, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { rich } from "@/lib/format";

export function Pricing({ locale, t }: { locale: Locale; t: Dictionary["pricing"] }) {
  // "AED 199" in English, "199 درهم" in Arabic.
  const currencyFirst = locale === "en";

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="pricing-title" pill={t.pill} title={t.title} intro={t.intro} />
        <div className="grid gap-5 lg:grid-cols-3">
          {t.plans.map((plan, i) => {
            const currency = plan.currency ? <span className="data text-sm text-fg-3">{plan.currency}</span> : null;
            return (
              <article
                key={plan.id}
                data-reveal
                data-light
                className={cn(
                  "card flex flex-col p-7 sm:p-8",
                  plan.featured && "shadow-[0_0_0_1px_rgb(91_157_255/0.45),0_40px_100px_-40px_rgb(47_124_246/0.8)]",
                )}
                style={{ "--d": i * 100 } as CSSProperties}
              >
                {plan.featured && (
                  <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(70%_100%_at_50%_0%,rgb(91_157_255/0.38),transparent_70%)]" />
                )}
                <div className="flex items-center justify-between gap-3">
                  <span className="pill glass">{plan.name}</span>
                  {plan.featured && (
                    <span className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#5aa0ff,#2557d6)] px-3 py-1 text-xs font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_6px_18px_-6px_rgb(47_124_246/0.9)]">
                      <Star aria-hidden className="size-3.5 fill-current" />
                      {t.popular}
                    </span>
                  )}
                </div>
                <p className="mt-7 flex items-baseline gap-1.5">
                  {currencyFirst && currency}
                  <span className="text-grad text-5xl font-medium tracking-[-0.045em]">{plan.price}</span>
                  {!currencyFirst && currency}
                  {plan.currency && <span className="text-sm text-fg-3">{t.perMonth}</span>}
                </p>
                <p className="mt-3 text-[0.9375rem] text-fg-2">{plan.desc}</p>
                <div aria-hidden className="rule-glow my-6" />
                <ul className="grid gap-3 text-[0.9375rem]">
                  <li className="flex gap-2.5 font-medium text-fg">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" strokeWidth={2.25} />
                    {plan.volume}
                  </li>
                  {t.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-fg-2">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-blue-2" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="#contact" variant={plan.featured ? "primary" : "glass"} arrow={plan.featured} className="mt-8 w-full">
                  {plan.cta}
                </ButtonLink>
              </article>
            );
          })}
        </div>

        <div data-reveal data-light className="card mt-5 flex flex-wrap items-center justify-between gap-6 p-7 sm:p-8">
          <p className="max-w-[46em] text-fg-2">{rich(t.enterprise, { strong: "font-medium text-fg" })}</p>
          <ButtonLink href="#contact" variant="glass" arrow>
            {t.enterpriseCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
