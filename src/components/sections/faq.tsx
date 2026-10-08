import { SectionHeader } from "../ui/section-header";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { FaqList } from "./faq-list";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="faq-title" pill={t.pill} title={t.title} intro={t.intro} />
        <FaqList items={t.items} />
      </div>
    </section>
  );
}
