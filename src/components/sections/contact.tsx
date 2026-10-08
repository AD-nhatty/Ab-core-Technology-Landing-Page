import { Mail, MapPin, Phone } from "lucide-react";
import { Words } from "../ui/words";
import type { Dictionary } from "../../i18n/dictionaries/en";
import { SITE } from "../../lib/site";
import { DemoForm } from "./demo-form";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  const channels = [
    { icon: Phone, label: SITE.phone, href: SITE.phoneHref, ltr: true },
    { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}`, ltr: true },
    { icon: MapPin, label: t.location },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-[clamp(4rem,8vw,7rem)]">
      <div className="wrap">
        <div
          data-reveal
          data-light
          className="card rounded-[2rem] p-6 sm:p-10 lg:p-14"
          style={{
            background:
              "radial-gradient(90% 80% at 12% 0%, rgb(31 85 224 / 0.5), transparent 60%), radial-gradient(70% 70% at 100% 100%, rgb(56 200 234 / 0.2), transparent 60%), linear-gradient(180deg, #0a1534, #050b1e)",
          }}
        >
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="pill glass">{t.pill}</span>
              <h2 id="contact-title" data-words className="h-section text-grad mt-5">
                <Words text={t.title} />
              </h2>
              <p className="lede mt-5 max-w-[34rem]">{t.intro}</p>
              <ul className="mt-9 grid gap-2.5">
                {channels.map(({ icon: Icon, label, href, ltr }) => {
                  const content = (
                    <>
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-2/15 text-blue-2">
                        <Icon aria-hidden className="size-[1.125rem]" strokeWidth={1.75} />
                      </span>
                      <span dir={ltr ? "ltr" : undefined}>{label}</span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} data-ripple data-light className="glass flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-fg transition-colors hover:text-white">
                          {content}
                        </a>
                      ) : (
                        <span className="glass flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-fg">{content}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <DemoForm t={t.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
