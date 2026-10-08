import type { CSSProperties } from "react";
import { Words } from "./words";
import { cn } from "@/lib/cn";

type Props = { id: string; pill: string; title: string; intro?: string; className?: string };

export function SectionHeader({ id, pill, title, intro, className }: Props) {
  return (
    <div className={cn("mx-auto mb-14 max-w-3xl text-center md:mb-16", className)}>
      <span data-reveal className="pill glass">
        {pill}
      </span>
      <h2 id={id} data-words className="h-section text-grad mt-5">
        <Words text={title} />
      </h2>
      {intro ? (
        <p data-reveal className="lede mx-auto mt-5 max-w-2xl" style={{ "--d": 160 } as CSSProperties}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
