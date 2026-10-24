import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { navLinks, site } from "@/data/site";
import { useRoute } from "@/lib/router";
import { cn } from "@/utils/cn";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export function Nav() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overDark = route.name === "home" && !scrolled && !open;
  const solid = scrolled || open || route.name !== "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route.raw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "#/" ? route.name === "home" : route.raw.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          solid ? "border-b border-line bg-white/92 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between md:h-[78px]">
          <a
            href="#/"
            aria-label="Temmy Tee Graphics — home"
            className={cn("transition-opacity hover:opacity-70", overDark && "brightness-0 invert")}
          >
            <Logo variant={overDark ? "light" : "dark"} markClassName={overDark ? "h-8 w-auto" : undefined} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-active={isActive(link.href)}
                className={cn(
                  "link-underline text-[0.9375rem] font-medium transition-colors",
                  overDark ? "text-white/85 hover:text-white" : "text-ink/70 hover:text-ink",
                  isActive(link.href) && (overDark ? "text-white" : "text-ink"),
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#/contact" className={cn("btn hidden md:inline-flex", overDark ? "btn-on-dark" : "btn-primary")}>
              Start a Project
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
                overDark ? "border-white/30 text-white" : "border-line text-ink",
                open && "border-transparent bg-white text-ink",
              )}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="flex h-3 w-5 flex-col justify-between">
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-current transition-transform duration-300",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span className={cn("block h-[1.5px] w-full bg-current transition-opacity", open && "opacity-0")} />
                <span
                  className={cn(
                    "block h-[1.5px] w-full bg-current transition-transform duration-300",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[55] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 origin-top bg-white px-5 pb-8 pt-[68px] transition-all duration-400 ease-out",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="mt-4 flex flex-col">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "display border-b border-line py-4 text-[1.75rem] font-semibold text-ink transition-colors",
                  isActive(link.href) && "text-brand-500",
                )}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-7 flex flex-col gap-3">
            <a href="#/contact" tabIndex={open ? 0 : -1} className="btn btn-primary w-full">
              Start a Project
            </a>
            <a
              href={whatsappLink("Hello Temmy Tee Graphics, I'd like to discuss a design project.")}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              className="btn btn-ghost w-full"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


