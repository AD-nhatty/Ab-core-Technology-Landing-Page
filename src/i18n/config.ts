export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const directionOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Locale for Intl formatting. Arabic keeps Western digits, as UAE finance documents do. */
export const intlLocaleOf = (locale: Locale) => (locale === "ar" ? "ar-AE-u-nu-latn" : "en-GB");
