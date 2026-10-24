import { Logo } from "@/components/Logo";
import { whatsappLink } from "@/components/Nav";
import { categories } from "@/data/projects";
import { navLinks, services, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" markClassName="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">{site.description}</p>
            <a href={whatsappLink("Hello Temmy Tee Graphics!")} target="_blank" rel="noreferrer" className="btn btn-on-dark mt-7">
              Message on WhatsApp
            </a>
          </div>

          <nav className="md:col-span-2" aria-label="Footer pages">
            <h3 className="eyebrow text-white/40">Pages</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.9375rem] text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label="Footer categories">
            <h3 className="eyebrow text-white/40">Portfolio</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categories.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <a
                    href={`#/portfolio?c=${c.id}`}
                    className="text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                  >
                    {c.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="eyebrow text-white/40">Contact</h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-white/75">
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {site.contact.whatsappDisplay}
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.8125rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">{site.footnote}</p>
        </div>
      </div>

      {/* Service wordmark strip */}
      <div className="shell pb-10">
        <p className="display select-none text-[13vw] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/[0.05] md:text-[9vw]">
          TEMMY TEE
        </p>
      </div>
    </footer>
  );
}

export const serviceCategories = services.map((s) => s.category);
