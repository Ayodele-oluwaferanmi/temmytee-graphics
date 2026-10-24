import { TGMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { about, site } from "@/data/site";
import { categories } from "@/data/projects";
import { useScrollReset } from "@/lib/router";

export function About() {
  useScrollReset(["about"]);

  return (
    <main id="main" className="pt-[68px] md:pt-[78px]">
      {/* Intro */}
      <section className="shell pb-16 pt-14 md:pb-24 md:pt-20">
        <p className="eyebrow text-brand-500">About</p>
        <h1 className="display mt-5 max-w-4xl text-[2.4rem] font-extrabold leading-[1.0] sm:text-5xl lg:text-[4.2rem]">
          {about.headline}
        </h1>
        <p className="mt-8 max-w-2xl text-[1.125rem] leading-relaxed text-ink/80">{about.intro}</p>
      </section>

      {/* Biography + mark */}
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="eyebrow text-brand-300">The designer</h2>
              <p className="mt-6 whitespace-pre-line text-[1.0625rem] leading-relaxed text-white/70">
                {about.biography}
              </p>
              <a href="#/contact" className="btn btn-on-dark mt-9">
                Work with me
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/10 bg-white/[0.04] p-8">
                <TGMark tone="white" className="h-16 w-auto" />
                <div className="mt-10">
                  <p className="display text-[1.375rem] font-semibold leading-snug">
                    {site.name}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">
                    Independent design practice — church graphics, event design, social media creatives, logos and brand
                    identity.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="shell py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-500">Creative philosophy</p>
          <h2 className="display mt-4 text-[2rem] font-bold leading-[1.05] sm:text-4xl">
            Three principles behind every project
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {about.philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-[14px] border border-line p-7 transition-colors hover:border-brand-500">
                <span className="font-mono text-[0.75rem] text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[1.25rem] font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="eyebrow text-brand-500">Practice</h2>
              <h3 className="display mt-4 text-[1.75rem] font-bold leading-tight sm:text-3xl">
                Tools, clients and how I work
              </h3>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                This section is fully editable — update the studio details in{" "}
                <code className="font-mono text-brand-500">src/data/site.ts</code> as the practice grows.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <Reveal>
              <div>
                <h3 className="eyebrow text-muted">Tools &amp; expertise</h3>
                <ul className="mt-5 space-y-2.5">
                  {about.tools.map((t) => (
                    <li key={t} className="text-[0.9375rem] text-ink/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <h3 className="eyebrow text-muted">Client types</h3>
                <ul className="mt-5 space-y-2.5">
                  {about.clientTypes.map((t) => (
                    <li key={t} className="text-[0.9375rem] text-ink/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <h3 className="eyebrow text-muted">Studio details</h3>
                <dl className="mt-5 space-y-5">
                  {about.details.map((d) => (
                    <div key={d.label}>
                      <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">{d.label}</dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-ink/80">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline mt-6 inline-block text-[0.9375rem] font-medium text-brand-500"
                >
                  {site.contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="shell py-20 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-brand-500">What I make</p>
            <h2 className="display mt-4 text-[2rem] font-bold leading-[1.05] sm:text-4xl">
              Everything in the portfolio, in one list
            </h2>
          </div>
          <a href="#/portfolio" className="btn btn-ghost shrink-0">
            Browse the portfolio
          </a>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.id}>
              <a
                href={`#/portfolio?c=${c.id}`}
                className="link-underline text-[1rem] font-medium text-ink/80 hover:text-ink"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
