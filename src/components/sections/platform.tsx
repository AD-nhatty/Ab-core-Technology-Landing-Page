import { CircleCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { AuditPanel, ErpPanel, InvoicePanel, MatchPanel, VatPanel } from "./platform-panels";

/** Five module cards that stack on top of each other as you scroll (desktop). */
export function Platform({ t }: { t: Dictionary["platform"] }) {
  const panels = [
    <InvoicePanel key="invoice" t={t.panels.invoice} />,
    <MatchPanel key="match" t={t.panels.match} />,
    <AuditPanel key="audit" t={t.panels.audit} />,
    <ErpPanel key="erp" t={t.panels.erp} />,
    <VatPanel key="vat" t={t.panels.vat} />,
  ];

  return (
    <section id="platform" aria-labelledby="platform-title" className="relative py-[clamp(5rem,10vw,8rem)]">
      <div aria-hidden className="rule-glow absolute inset-x-0 top-0" />
      <div className="wrap">
        <SectionHeader id="platform-title" pill={t.pill} title={t.title} intro={t.intro} />
        <div className="grid gap-6 lg:gap-10">
          {t.modules.map((module, i) => (
            <article
              key={module.id}
              data-light
              className="stack-card card card-solid grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12"
              style={{ "--i": i } as CSSProperties}
            >
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <span className="pill glass">{module.label}</span>
                <h3 className="h-feature mt-5 text-fg">{module.title}</h3>
                <p className="mt-4 max-w-[34em] text-fg-2">{module.body}</p>
                <ul className="mt-6 grid gap-3">
                  {module.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[0.9375rem] text-fg">
                      <CircleCheck aria-hidden className="size-5 shrink-0 text-blue-2" strokeWidth={1.75} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div aria-hidden className="absolute -inset-8 -z-10 bg-[radial-gradient(55%_55%_at_50%_45%,rgb(47_124_246/0.3),transparent_72%)]" />
                {panels[i]}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
