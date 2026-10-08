import type { Locale } from "../../i18n/config";
import { SITE } from "../../lib/site";

/** Organization structured data for search engines. */
export function JsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: `${SITE.url}/${locale}`,
    logo: `${SITE.url}/brand/abcore-logo.png`,
    description,
    email: SITE.email,
    telephone: SITE.phone,
    address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: ["English", "Arabic"],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
