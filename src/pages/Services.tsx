import { useEffect } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";
import { useRoute, useScrollReset } from "@/lib/router";
import { cn } from "@/utils/cn";

export function Services() {
  useScrollReset(["services"]);
  const route = useRoute();

  useEffect(() => {
    const id = route.query.s;
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 160);
    return () => window.clearTimeout(timer);
  }, [route.query.s]);

  return (
    <main id="main" className="pt-[68px] md:pt-[78px]">
      {/* Header */}
      <section className="shell border-b border-line pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-500">Services</p>
            <h1 className="display mt-5 text-[2.4rem] font-extrabold leading-[1.0] sm:text-5xl lg:text-[4rem]">
              Design that carries the message
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-muted">
              Nine areas of focus, one way of working: understand what has to be communicated, design it with intent,
              and deliver files that are ready for wherever they'll be used.
            </p>
          </div>
        </div>

        <nav aria-label="Service shortcuts" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#/services?s=${s.id}`}
              className="rounded-full border border-line px-4 py-2 text-[0.8125rem] font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </section>

      {/* Service blocks */}
      <div>
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={cn("scroll-mt-28 border-b border-line", i % 2 === 1 && "bg-paper")}
          >
            <div className="shell grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12">
              <Reveal
                className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}
              >
                <div className="overflow-hidden rounded-[16px] ring-1 ring-line">
                  <ArtworkFrame ratio={s.ratio} tone={s.tone} variant={s.variant} title={s.title} format={s.category} index={i} />
                </div>
              </Reveal>

              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-1 lg:col-start-1")}>
                <Reveal delay={80}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.8125rem] text-brand-500">{s.index}</span>
                    <span className="h-px w-10 bg-line" />
                    <span className="eyebrow text-muted">{s.category}</span>
                  </div>
                  <h2 className="display mt-5 text-[1.75rem] font-bold leading-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/80">{s.description}</p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink/80">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a href={`#/contact?service=${encodeURIComponent(s.title)}`} className="btn btn-primary">
                      Request This Service
                    </a>
                    <a
                      href={`#/portfolio?c=${s.id}`}
                      className="link-underline text-[0.9375rem] font-medium text-ink"
                    >
                      See related work
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* How projects run */}
      <section className="shell py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-500">How a project runs</p>
          <h2 className="display mt-4 text-[2rem] font-bold leading-[1.05] sm:text-4xl">
            Simple, clear, and communicated at every step
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Share the brief",
              body: "Send the details of what you need — the occasion, the message, the date and where the design will be used. References are always welcome.",
            },
            {
              step: "02",
              title: "Design direction",
              body: "The direction is agreed before the design begins, so the creative work starts with a clear target rather than guesswork.",
            },
            {
              step: "03",
              title: "Design & delivery",
              body: "You receive the finished artwork in the sizes and formats your printer or platform needs, ready to publish.",
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 90} as="li">
              <div className="h-full rounded-[14px] border border-line p-7">
                <span className="font-mono text-[0.8125rem] text-brand-500">{item.step}</span>
                <h3 className="display mt-4 text-[1.25rem] font-semibold">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-[0.875rem] leading-relaxed text-muted">
          Pricing, turnaround and revision details are shared directly for each project, because every brief is
          different. Ask for a quote with your enquiry and you'll get a clear answer before any work begins.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="display text-[1.9rem] font-bold leading-tight sm:text-4xl">
              Ready to brief a project?
            </h2>
            <p className="mt-3 max-w-xl text-white/65">
              Tell me what you're planning and I'll come back with the next steps.
            </p>
          </div>
          <a href="#/contact" className="btn btn-on-dark shrink-0">
            Start a Project
          </a>
        </div>
      </section>
    </main>
  );
}
