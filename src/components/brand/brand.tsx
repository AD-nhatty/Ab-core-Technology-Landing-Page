import Image from "next/image";
import logo from "@/assets/brand/logo-reversed.png";
import mark from "@/assets/brand/mark-reversed.png";
import { cn } from "../../lib/cn";

/*
 * The official AB'CORE logo from abcore.ae, cut out of its white background.
 * On this dark site it is used reversed, the way the company profile does on
 * its dark pages: white document outline and tagline, the circuit lines and
 * wordmark in their own blues. Don't redraw or recolour it; regenerate the
 * files in src/assets/brand from the original instead.
 */

type Props = {
  className?: string;
  alt?: string;
  /** The rendered width, so the browser fetches a sharp but small file. */
  sizes: string;
  /** For copies above the fold. */
  eager?: boolean;
  /** Which dimension the className sets; the other follows the logo's proportions. */
  fit?: "height" | "width";
};

/** The full logo: mark, wordmark and tagline. Sized by height unless `fit="width"`. */
export function BrandLogo({ className, alt = "AB'CORE Technology Company", sizes, eager, fit = "height" }: Props) {
  return (
    <Image
      src={logo}
      alt={alt}
      sizes={sizes}
      quality={90}
      loading={eager ? "eager" : "lazy"}
      className={cn(fit === "height" ? "w-auto" : "h-auto", className)}
    />
  );
}

/** The mark on its own: circuit lines running into the AB document. Sized by width unless `fit="height"`. */
export function BrandMark({ className, alt = "", sizes, eager, fit = "width" }: Props) {
  return (
    <Image
      src={mark}
      alt={alt}
      sizes={sizes}
      quality={90}
      loading={eager ? "eager" : "lazy"}
      className={cn(fit === "height" ? "w-auto" : "h-auto", className)}
    />
  );
}
