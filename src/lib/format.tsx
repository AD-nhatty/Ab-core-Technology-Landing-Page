import { Fragment, type ReactNode } from "react";

type RichClasses = { strong?: string; accent?: string; muted?: string };

const TOKEN = /(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~)/g;

/**
 * Renders the small markup used in the dictionaries:
 * **strong**, __accent__, ~~muted~~, and "\n" for a line break.
 */
export function rich(
  text: string,
  { strong = "font-medium", accent = "text-cyan", muted = "text-muted-2" }: RichClasses = {},
): ReactNode {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(TOKEN).map((part, j) => {
        if (!part) return null;
        const inner = part.slice(2, -2);
        if (part.startsWith("**")) return <strong key={j} className={strong}>{inner}</strong>;
        if (part.startsWith("__")) return <span key={j} className={accent}>{inner}</span>;
        if (part.startsWith("~~")) return <span key={j} className={muted}>{inner}</span>;
        return <Fragment key={j}>{part}</Fragment>;
      })}
    </Fragment>
  ));
}

/** Replaces {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Picks the plural form for n (Arabic has six) and fills in {n}. */
export function plural(intlLocale: string, forms: PluralForms, n: number) {
  const rule = new Intl.PluralRules(intlLocale).select(n);
  return fill(forms[rule] ?? forms.other, { n });
}
