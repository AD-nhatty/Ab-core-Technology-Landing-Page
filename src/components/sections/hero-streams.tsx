import type { CSSProperties } from "react";

/*
 * Data streams converging on the AB'CORE icon at the top of the hero: the
 * circuit lines from the logo, carried out across the page. Drawn at a fixed
 * 1440 × 360 and centred, so narrow screens simply crop the outer ends.
 * The icon sits at (720, 140), spanning x 680–760.
 */
/** Every stream stays above y 190, so none crosses the badge or headline. */
const LEFT = [
  { d: "M120 28H468L562 122H680", t: 4.6, delay: 0 },
  { d: "M40 76H514L572 134H680", t: 3.8, delay: 1.4 },
  { d: "M200 150H568L576 158H680", t: 4.2, delay: 0.7 },
  { d: "M70 186H526L566 146H680", t: 5.2, delay: 2.2 },
];

/** Mirror a path across the centre line. */
const mirror = (d: string) =>
  d.replace(/([MLH])(\d+(?:\.\d+)?)/g, (_, cmd: string, x: string) => `${cmd}${1440 - Number(x)}`);

const STREAMS = [...LEFT, ...LEFT.map((s, i) => ({ d: mirror(s.d), t: s.t + 0.3 * (i % 2 ? -1 : 1), delay: s.delay + 0.5 }))];
const start = (d: string) => d.match(/^M(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/)?.slice(1).map(Number) ?? [0, 0];

export function HeroStreams() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 360"
      width="1440"
      height="360"
      fill="none"
      className="hero-streams pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2"
    >
      {STREAMS.map(({ d }) => (
        <path key={`base-${d}`} d={d} className="stream" strokeWidth={1.25} strokeLinejoin="round" />
      ))}
      {STREAMS.map(({ d, t, delay }) => (
        <path
          key={`pulse-${d}`}
          d={d}
          pathLength={1}
          className="stream-pulse"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ "--t": `${t}s`, "--delay": `${delay}s` } as CSSProperties}
        />
      ))}
      {STREAMS.map(({ d }) => {
        const [cx, cy] = start(d);
        return <circle key={`pad-${d}`} cx={cx} cy={cy} r={3.5} className="stream-pad" strokeWidth={1.25} />;
      })}
    </svg>
  );
}
