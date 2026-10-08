import { BrandLogo } from "@/components/brand/brand";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SITE } from "@/lib/site";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,rgb(47_124_246/0.22),transparent_70%)]" />
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo sizes="221px" className="h-12 sm:h-14" />
            <p className="mt-4 max-w-[30ch] text-[0.9375rem] text-fg-2">{t.blurb}</p>
            <p className="mt-3 text-sm text-fg-3">{t.licensed}</p>
          </div>

          {t.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-[0.9375rem] font-medium text-fg">{column.title}</h2>
              <ul className="grid gap-3 text-[0.9375rem] text-fg-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-colors duration-200 hover:text-fg">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mb-4 text-[0.9375rem] font-medium text-fg">{t.contactTitle}</h2>
            <ul className="grid gap-3 text-[0.9375rem] text-fg-2">
              <li>
                <a href={`mailto:${SITE.email}`} dir="ltr" className="transition-colors duration-200 hover:text-fg">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} dir="ltr" className="transition-colors duration-200 hover:text-fg">
                  {SITE.phone}
                </a>
              </li>
              <li>{t.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-line py-6 text-[0.8125rem] text-fg-3">
          <span>{t.copyright}</span>
          <span dir="ltr">abcore.ae</span>
        </div>
      </div>

      {/* The logo once more, large and faint, sinking into the page's edge. */}
      <div aria-hidden className="footer-mark mx-auto mt-6 w-[min(92vw,80rem)]">
        <BrandLogo alt="" fit="width" sizes="(min-width: 87rem) 1280px, 92vw" className="w-full" />
      </div>
    </footer>
  );
}
