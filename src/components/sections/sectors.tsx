import { Banknote, Fuel, HeartPulse, Landmark, ShoppingBag, Truck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import type { Dictionary } from "@/i18n/dictionaries/en";

const ICONS = [Landmark, Banknote, HeartPulse, ShoppingBag, Fuel, Truck];

export function Sectors({ t }: { t: Dictionary["sectors"] }) {
  return (
    <section aria-label={t.label} className="relative py-10 sm:py-12">
      <p data-reveal className="wrap text-center text-sm text-fg-3">
        {t.label}
      </p>
      <Marquee className="mt-7" speed={34} gap="0.875rem">
        {t.items.map((item, i) => {
          const Icon = ICONS[i] ?? Landmark;
          return (
            <span
              key={item}
              className="flex items-center gap-2.5 rounded-full bg-white/[0.04] px-5 py-3 text-[0.9375rem] font-medium whitespace-nowrap text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] ring-1 ring-white/10"
            >
              <Icon aria-hidden className="size-[1.125rem] text-blue-2" strokeWidth={1.75} />
              {item}
            </span>
          );
        })}
      </Marquee>
    </section>
  );
}
