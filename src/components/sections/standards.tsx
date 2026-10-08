import { Marquee } from "@/components/ui/marquee";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function Standards({ t }: { t: Dictionary["standards"] }) {
  return (
    <section aria-label={t.label} className="relative py-12 sm:py-14">
      <p data-reveal className="wrap text-center text-sm text-fg-3">
        {t.label}
      </p>
      <Marquee className="mt-7" speed={38} gap="3.5rem">
        {t.items.map((item) => (
          <span key={item} className="flex items-center gap-3.5 text-lg font-semibold tracking-[-0.02em] whitespace-nowrap text-fg-3">
            <span aria-hidden className="size-1.5 rotate-45 rounded-[2px] bg-blue-2/70 shadow-[0_0_8px_rgb(91_157_255/0.8)]" />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
