import { notFound } from "next/navigation";
import { Intro } from "../../components/brand/intro";
import { Effects } from "../../components/effects";
import { Footer } from "../../components/layout/footer";
import { JsonLd } from "../../components/layout/json-ld";
import { Navbar } from "../../components/layout/navbar";
import { Benefits } from "../../components/sections/benefits";
import { Comparison } from "../../components/sections/comparison";
import { Contact } from "../../components/sections/contact";
import { Faq } from "../../components/sections/faq";
import { Hero } from "../../components/sections/hero";
import { HowItWorks } from "../../components/sections/how-it-works";
import { Mandate } from "../../components/sections/mandate";
import { Platform } from "../../components/sections/platform";
import { Pricing } from "../../components/sections/pricing";
import { Process } from "../../components/sections/process";
import { Results } from "../../components/sections/results";
import { Sectors } from "../../components/sections/sectors";
import { Standards } from "../../components/sections/standards";
import { isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/get-dictionary";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>
      <Intro tagline={t.intro.tagline} steps={t.intro.steps} />
      <Navbar locale={locale} t={t.nav} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero locale={locale} t={t.hero} dashboard={t.dashboard} />
        <Standards t={t.standards} />
        <Benefits t={t.benefits} />
        <HowItWorks t={t.how} />
        <Platform t={t.platform} />
        <Mandate locale={locale} t={t.mandate} />
        <Results t={t.results} />
        <Comparison t={t.compare} />
        <Process t={t.process} />
        <Sectors t={t.sectors} />
        <Pricing locale={locale} t={t.pricing} />
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
      <Effects />
      <JsonLd locale={locale} description={t.meta.description} />
    </>
  );
}
