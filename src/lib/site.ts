/** On Vercel, without NEXT_PUBLIC_SITE_URL set, fall back to the project's own production domain. */
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "https://abcore.ae")).replace(/\/$/, "");

export const SITE = {
  name: "AB'CORE",
  legalName: "AB'CORE Technology LLC",
  url,
  /** Only abcore.ae appears in search results; previews on other domains (such as *.vercel.app) stay out. */
  indexable: /(^|\.)abcore\.ae$/.test(new URL(url).hostname),
  email: "contact@abcore.ae",
  phone: "+971 52 222 0897",
  phoneHref: "tel:+971522220897",
  loginUrl: "https://abcore.ae/login",
};
