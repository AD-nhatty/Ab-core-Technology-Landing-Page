import { CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/chip";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { rich } from "@/lib/format";

/* Product views for the platform cards. The figures are example data. */

type Panels = Dictionary["platform"]["panels"];

function Window({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div aria-hidden className="glass overflow-hidden rounded-2xl text-sm text-fg">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
        <span className="size-2 rounded-full bg-blue-2 shadow-[0_0_8px_rgb(91_157_255/0.9)]" />
        <span className="truncate font-medium">{title}</span>
        <span className="ms-auto shrink-0">{aside}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function InvoicePanel({ t }: { t: Panels["invoice"] }) {
  const fields: [string, string][] = [
    [t.fields.invoice, "INV-2026-00418"],
    [t.fields.date, "08/10/2026"],
    [t.fields.trn, "100 2347 8890 0003"],
    [t.fields.peppol, "0235:1002347889"],
    [t.fields.net, "AED 46,000.00"],
    [t.fields.vat, "AED 2,300.00"],
  ];
  return (
    <Window title={t.title} aside={<Chip tone="green">{t.ready}</Chip>}>
      <dl className="grid gap-x-6 gap-y-3 border-b border-dashed border-white/10 pb-4 min-[30rem]:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[0.6875rem] text-fg-3">{label}</dt>
            <dd className="data mt-0.5 text-[0.8125rem] text-fg">
              <bdi>{value}</bdi>
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-3">
        {t.checks.map((check) => (
          <li key={check} className="flex items-center gap-2.5 border-b border-white/[0.05] py-2 last:border-b-0">
            <CircleCheck className="size-4 shrink-0 text-green" strokeWidth={1.75} />
            <span className="text-fg-2">{check}</span>
            <span className="data ms-auto text-[0.6875rem] text-green">{t.ok}</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const MATCHES = [
  ["PO-7781", "GRN-7781", "INV-00418", true],
  ["PO-7790", "GRN-7790", "INV-00421", true],
  ["PO-7794", "GRN-7794", "INV-00425", false],
  ["PO-7802", "GRN-7802", "INV-00427", true],
] as const;

export function MatchPanel({ t }: { t: Panels["match"] }) {
  return (
    <Window title={t.title} aside={<span className="text-xs text-fg-3">{t.meta}</span>}>
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-x-3 border-b border-white/[0.07] pb-2 text-[0.6875rem] text-fg-3 max-sm:grid-cols-[1fr_1fr_auto]">
        {t.cols.map((col, i) => (
          <span key={col} className={cn(i === 1 && "max-sm:hidden")}>
            {col}
          </span>
        ))}
        <span className="sr-only">{t.status}</span>
      </div>
      <ul>
        {MATCHES.map(([po, grn, invoice, matched]) => (
          <li key={po} className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-x-3 border-b border-white/[0.05] py-2.5 last:border-b-0 max-sm:grid-cols-[1fr_1fr_auto]">
            <span className="data text-xs text-fg">{po}</span>
            <span className="data text-xs text-fg-2 max-sm:hidden">{grn}</span>
            <span className="data text-xs text-fg-2">{invoice}</span>
            <Chip tone={matched ? "green" : "amber"}>{matched ? t.matched : t.mismatch}</Chip>
          </li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2">
        {t.rules.map((rule) => (
          <li key={rule} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-fg-2 ring-1 ring-white/[0.07]">
            {rich(rule, { strong: "font-medium text-fg" })}
          </li>
        ))}
      </ul>
    </Window>
  );
}

/** Each entry carries the previous entry's hash prefix: a small picture of a hash chain. */
const CHAIN = [
  { hash: "a3f9·e1", time: "09:41:02" },
  { hash: "7c02·a3", time: "09:41:02" },
  { hash: "e81d·7c", time: "09:41:03" },
  { hash: "51bb·e8", time: "" },
];

export function AuditPanel({ t }: { t: Panels["audit"] }) {
  return (
    <Window title={t.title} aside={<Chip tone="blue">{t.badge}</Chip>}>
      <ol className="relative">
        <span aria-hidden className="absolute start-[2.1rem] top-3 bottom-3 w-px bg-linear-to-b from-blue-2/60 via-blue-2/20 to-amber/60" />
        {t.events.map((event, i) => (
          <li key={event.what} className="relative grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5">
            <span className="data relative rounded-lg bg-[#0b1840] px-2 py-1 text-[0.6875rem] text-fg-3 ring-1 ring-white/10">
              <bdi>{CHAIN[i]?.hash}</bdi>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-fg">{event.what}</span>
              <span className="block truncate text-[0.6875rem] text-fg-3">{event.who}</span>
            </span>
            {i === t.events.length - 1 ? <Chip tone="amber">{t.flag}</Chip> : <span className="data text-[0.6875rem] text-fg-3">{CHAIN[i]?.time}</span>}
          </li>
        ))}
      </ol>
    </Window>
  );
}

const SYSTEM_TILES = ["SAP", "ORA", "API"];

export function ErpPanel({ t }: { t: Panels["erp"] }) {
  return (
    <Window title={t.title} aside={<Chip tone="green">{t.healthy}</Chip>}>
      <ul>
        {t.systems.map((system, i) => (
          <li key={system.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/[0.05] py-3 last:border-b-0">
            <span className="data grid size-10 place-items-center rounded-xl bg-[linear-gradient(180deg,#1d3474,#0b1638)] text-[0.6875rem] font-semibold text-blue-2 ring-1 ring-blue-2/25">
              {SYSTEM_TILES[i]}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-fg">{system.name}</span>
              <span className="data block truncate text-[0.6875rem] text-fg-3">{system.meta}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-green">
              <span className="size-1.5 rounded-full bg-green shadow-[0_0_8px_rgb(61_214_140/0.85)]" />
              {t.connected}
            </span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const WEEKLY = [38, 44, 41, 52, 47, 58, 55, 49, 61, 66, 58, 63, 72, 68, 64, 75, 81, 70, 78, 86, 74, 83, 90, 88];

export function VatPanel({ t }: { t: Panels["vat"] }) {
  const tiles: [string, string][] = [
    [t.output, "412,860"],
    [t.input, "288,415"],
  ];
  return (
    <Window title={t.title} aside={<Chip tone="cyan">{t.live}</Chip>}>
      <dl className="grid gap-2 min-[30rem]:grid-cols-3">
        {tiles.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
            <dt className="text-[0.6875rem] text-fg-3">{label}</dt>
            <dd className="data mt-1 text-base text-fg tabular-nums">{value}</dd>
          </div>
        ))}
        <div className="rounded-xl bg-[linear-gradient(180deg,rgb(91_157_255/0.25),rgb(47_124_246/0.12))] p-3 ring-1 ring-blue-2/35">
          <dt className="text-[0.6875rem] text-fg-2">{t.net}</dt>
          <dd className="data mt-1 text-base text-white tabular-nums">124,445</dd>
        </div>
      </dl>
      <figure className="mt-4">
        <div role="img" aria-label={t.chartLabel} className="flex h-24 items-end gap-[0.3125rem] border-b border-white/[0.07] pb-2">
          {WEEKLY.map((value, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-t-[0.1875rem]",
                i >= WEEKLY.length - 4 ? "bg-[linear-gradient(180deg,#5fd4f2,#2f6df0)] shadow-[0_0_12px_rgb(56_200_234/0.45)]" : "bg-white/[0.1]",
              )}
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <figcaption aria-hidden className="data mt-2 flex justify-between text-[0.6875rem] text-fg-3">
          {t.axis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </figcaption>
      </figure>
    </Window>
  );
}
