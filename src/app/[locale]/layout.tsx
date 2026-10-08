import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import introLogo from "@/assets/brand/logo-reversed.webp";
import { GlassFilters } from "@/components/glass-filters";
import { MotionProvider } from "@/components/providers/motion-provider";
import { directionOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE } from "@/lib/site";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-plex-arabic", display: "swap" });

/**
 * Runs before first paint:
 * - `js` lets scroll reveals hide content only when JS will reveal it again.
 * - `refract` turns on SVG glass refraction in Chromium, the only engine that
 *   supports it in backdrop-filter.
 * - `intro` plays the logo intro once per session (never with reduced motion)
 *   and starts fetching the logo at once. If the page hasn't taken it over
 *   within 1.8 s (slow device), it's skipped.
 */
const BOOT_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js');" +
  "try{var b=navigator.userAgentData&&navigator.userAgentData.brands;if(b&&b.some(function(x){return x.brand==='Chromium'}))d.classList.add('refract')}catch(e){}" +
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('abcore-intro')){d.classList.add('intro');" +
  `var i=new Image();i.fetchPriority='high';i.src=${JSON.stringify(introLogo.src)};` +
  "setTimeout(function(){if(!d.classList.contains('intro-live'))d.classList.remove('intro')},1800)}}catch(e){}})();";

/** Every page here is static; the build fails if a change makes one render per request. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#020713",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metadataBase = new URL(SITE.url);
  if (!isLocale(locale)) return { metadataBase };
  const { meta } = getDictionary(locale);

  return {
    metadataBase,
    title: meta.title,
    description: meta.description,
    applicationName: SITE.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: `/${locale}`,
      title: meta.title,
      description: meta.description,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? "en_AE" : "ar_AE",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const fonts = [geist.variable, geistMono.variable, plexArabic.variable].join(" ");

  return (
    <html lang={locale} dir={directionOf(locale)} data-scroll-behavior="smooth" className={fonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <GlassFilters />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
