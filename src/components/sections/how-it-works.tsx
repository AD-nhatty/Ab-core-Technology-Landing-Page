import { SectionHeader } from "../ui/section-header";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { RouteHub } from "./route-hub";

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  return (
    <section id="how" aria-labelledby="how-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="how-title" pill={t.pill} title={t.title} intro={t.intro} />
        <RouteHub t={t} />
      </div>
    </section>
  );
}
