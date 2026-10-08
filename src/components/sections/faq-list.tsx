"use client";

import { m } from "motion/react";
import { useId, useState, type CSSProperties } from "react";
import { cn } from "../../lib/cn";

const SETTLE = { type: "spring", visualDuration: 0.4, bounce: 0.18 } as const;

/** Glass rows. Answers stay in the HTML (good for search) and open with a spring. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number[]>([]);
  const uid = useId();
  const toggle = (index: number) => setOpen((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));

  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {items.map((item, index) => {
        const expanded = open.includes(index);
        return (
          <div
            key={item.q}
            data-reveal
            data-light
            className={cn("glass rounded-[1.25rem] transition-[background-color] duration-300", expanded && "bg-white/[0.06]")}
            style={{ "--d": index * 60 } as CSSProperties}
          >
            <h3>
              <button
                type="button"
                id={`${uid}-q-${index}`}
                aria-expanded={expanded}
                aria-controls={`${uid}-a-${index}`}
                onClick={() => toggle(index)}
                data-ripple
                className="flex w-full items-center justify-between gap-5 rounded-[1.25rem] px-5 py-5 text-start text-[1.0625rem] font-medium text-fg sm:px-6"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid size-8 shrink-0 place-items-center rounded-full transition-[background-color,box-shadow] duration-300",
                    expanded ? "bg-[linear-gradient(180deg,#5aa0ff,#2557d6)] shadow-[0_0_20px_rgb(47_124_246/0.75)]" : "bg-blue-2/15",
                  )}
                >
                  <span className="absolute h-[1.5px] w-3 rounded-full bg-white" />
                  <m.span
                    initial={false}
                    animate={{ rotate: expanded ? 0 : 90 }}
                    transition={{ type: "spring", visualDuration: 0.4, bounce: 0.45 }}
                    className="absolute h-[1.5px] w-3 rounded-full bg-white"
                  />
                </span>
              </button>
            </h3>
            <m.div
              id={`${uid}-a-${index}`}
              role="region"
              aria-labelledby={`${uid}-q-${index}`}
              inert={!expanded}
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={SETTLE}
              className="overflow-hidden"
            >
              <p className="px-5 pb-6 text-fg-2 sm:px-6">{item.a}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
