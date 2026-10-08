import type { MetadataRoute } from "next";
import { locales } from "../i18n/config";
import { SITE } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `${SITE.url}/${locale}`]));
  return locales.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
