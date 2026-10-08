import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { BrandMark } from "../brand/brand";
import { ButtonLink } from "../ui/button";
import { Words } from "../ui/words";
import type { Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { HeroBadge } from "./hero-badge";
import { HeroDashboard } from "./hero-dashboard";
import { HeroStreams } from "./hero-streams";

/** Entrance delay in ms for the hero's load sequence (read by .hero-in). */
const delay = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function Hero({ locale, t, dashboard }: { locale: Locale; t: Dictionary["hero"]; dashboard: Dictionary["dashboard"] }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden pt-[var(--hero-pt)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-dots" />
        <div className="hero-beam" />
      </div>
      <HeroStreams />

      <div className="wrap text-center">
        {/* The AB'CORE "app icon": every data stream above runs into it. */}
        <div className="hero-in flex justify-center" style={delay(0)}>
          <div className="app-icon-float">
            <div className="app-icon">
              <BrandMark alt="AB'CORE" sizes="62px" eager className="relative z-[1] w-[3.875rem]" />
            </div>
          </div>
        </div>

        <div className="hero-in mt-6" style={delay(90)}>
          <HeroBadge locale={locale} t={t} />
        </div>
        <h1 id="hero-title" className="h-hero text-grad hero-words mx-auto mt-6 max-w-[16ch]">
          <Words text={t.title} breakOnMobile />
        </h1>
        <p className="lede hero-in mx-auto mt-6 max-w-[38rem]" style={delay(420)}>
          {t.lede}
        </p>
        <div className="hero-in mt-9 flex flex-col items-stretch justify-center gap-3 min-[26rem]:flex-row min-[26rem]:items-center" style={delay(520)}>
          <ButtonLink href="#contact" size="lg" arrow>
            {t.primary}
          </ButtonLink>
          <ButtonLink href="#how" size="lg" variant="glass">
            {t.secondary}
          </ButtonLink>
        </div>
        <ul className="hero-in mx-auto mt-8 grid max-w-md grid-cols-2 justify-items-start gap-x-5 gap-y-2.5 text-sm text-fg-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-6" style={delay(620)}>
          {t.trust.map((item) => (
            <li key={item} className="flex items-center gap-2 text-start">
              <Check aria-hidden strokeWidth={2.25} className="size-4 shrink-0 text-cyan" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-14 pb-16 sm:mt-20 sm:pb-24">
        <div aria-hidden className="horizon" style={{ top: "36%" }} />
        <div className="wrap hero-in relative" style={delay(720)}>
          <HeroDashboard t={dashboard} />
        </div>
      </div>
    </section>
  );
}
