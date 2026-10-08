import { SectionHeader } from "@/components/ui/section-header";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { MandateClock } from "./mandate-clock";

export function Mandate({ locale, t }: { locale: Locale; t: Dictionary["mandate"] }) {
  return (
    <section id="mandate" aria-labelledby="mandate-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="mandate-title" pill={t.pill} title={t.title} intro={t.intro} />
        <MandateClock locale={locale} t={t} />
        <p className="mx-auto mt-5 max-w-5xl text-center text-xs text-fg-3">{t.fineprint}</p>
      </div>
    </section>
  );
}
