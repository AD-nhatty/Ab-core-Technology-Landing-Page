import { Fragment, type CSSProperties } from "react";

/**
 * Splits a headline into word spans (.w) carrying their index in --i, so CSS
 * can blur each word in after the last. "__…__" marks words in the brand
 * gradient and "\n" a line break. Breaks apply from the sm breakpoint up unless
 * `breakOnMobile` is set; on phones headings wrap naturally instead of
 * stranding a single word.
 */
export function Words({ text, breakOnMobile = false }: { text: string; breakOnMobile?: boolean }) {
  let index = 0;
  return text.split("\n").map((line, li) => (
    <Fragment key={li}>
      {li > 0 && (breakOnMobile ? <br /> : <>{" "}<br className="hidden sm:inline" /></>)}
      {line
        .split(/(__[^_]+__)/g)
        .filter(Boolean)
        .map((segment, si) => {
          const accent = segment.startsWith("__");
          const words = (accent ? segment.slice(2, -2) : segment).split(/(\s+)/);
          const spans = words.map((word, wi) => {
            if (!word) return null;
            if (/^\s+$/.test(word)) return " ";
            const style = { "--i": index++ } as CSSProperties;
            return (
              <span key={wi} className="w" style={style}>
                {word}
              </span>
            );
          });
          return accent ? (
            <span key={si} className="text-brand">
              {spans}
            </span>
          ) : (
            <Fragment key={si}>{spans}</Fragment>
          );
        })}
    </Fragment>
  ));
}
