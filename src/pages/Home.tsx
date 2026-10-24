import { useState } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { Lightbox } from "@/components/Lightbox";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { TGMark } from "@/components/Logo";
import { categories, countByCategory, featuredProjects, getProject } from "@/data/projects";
import { marqueeItems, services, site } from "@/data/site";
import { useScrollReset } from "@/lib/router";

const heroIds = ["church-sunday-flyer", "social-instagram-post", "church-youth-program", "logo-mark-presentation"];

export function Home() {
  useScrollReset(["home"]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const featured = featuredProjects.slice(0, 6);
  const spans = [
    "lg:col-span-7",
    "lg:col-span-5 lg:mt-16",
    "lg:col-span-4",
    "lg:col-span-4 lg:mt-14",
    "lg:col-span-4",
    "lg:col-span-8 lg:col-start-3",
  ];

  return (
    <main id="main">
      {/* ------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-[104px] text-white md:pb-24 md:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 grain opacity-40" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-500/25 blur-[120px]" />

        <div className="shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="eyebrow animate-fade-up text-brand-300">Graphic Designer · Brand &amp; Event Visuals</p>

            <h1 className="display animate-fade-up mt-6 text-[2.6rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[4.2rem] xl:text-[4.7rem]">
              Designs That Speak.
              <span className="mt-1 block text-brand-400">Visuals That Stand Out.</span>
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/65"
              style={{ animationDelay: "90ms" }}
            >
              {site.description}
            </p>

            <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "150ms" }}>
              <a href="#/portfolio" className="btn btn-primary">
                Explore My Work
              </a>
              <a href="#/contact" className="btn btn-outline-dark">
                Let's Work Together
              </a>
            </div>

            <dl
              className="animate-fade-up mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3"
              style={{ animationDelay: "210ms" }}
            >
              <div>
                <dt className="eyebrow text-white/40">Specialties</dt>
                <dd className="mt-2 text-[0.9375rem] text-white/85">Church, event &amp; brand design</dd>
              </div>
              <div>
                <dt className="eyebrow text-white/40">Formats</dt>
                <dd className="mt-2 text-[0.9375rem] text-white/85">Print-ready &amp; digital</dd>
              </div>
              <div>
                <dt className="eyebrow text-white/40">Portfolio</dt>
                <dd className="mt-2 text-[0.9375rem] text-white/85">{countByCategory("all")} portfolio projects</dd>
              </div>
            </dl>
          </div>

          {/* Artwork collage */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] sm:aspect-square lg:aspect-[5/6]">
              {heroIds.map((id, i) => {
                const p = getProject(id);
                if (!p) return null;
                const layout = [
                  "left-0 top-[2%] w-[56%] animate-drift",
                  "right-0 top-0 w-[40%] animate-drift-slow",
                  "bottom-[2%] left-[8%] w-[62%]",
                  "bottom-[26%] right-[2%] w-[36%]",
                ][i];
                return (
                  <a
                    key={id}
                    href={`#/project/${id}`}
                    className={`absolute overflow-hidden rounded-[12px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-transform duration-500 hover:z-10 hover:scale-[1.03] ${layout}`}
                    style={{ animationDelay: `${i * 900}ms` }}
                    aria-label={p.title}
                  >
                    <ArtworkFrame
                      ratio={p.ratio}
                      tone={p.tone}
                      variant={p.variant}
                      title={p.title}
                      format={p.format}
                      index={i}
                      image={p.image}
                      alt={p.title}
                      quiet
                    />
                  </a>
                );
              })}

              <div className="absolute -left-2 bottom-[30%] flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 shadow-[0_20px_45px_-20px_rgba(11,71,240,0.9)] sm:h-24 sm:w-24">
                <TGMark tone="white" className="h-9 w-auto sm:h-11" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- MARQUEE */}
      <div className="overflow-hidden border-y border-brand-600 bg-brand-500 py-4">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="display text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-white">
                {item}
              </span>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------- FEATURED WORK */}
      <section className="shell py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-brand-500">Selected Work</p>
            <h2 className="display mt-4 max-w-2xl text-[2rem] font-bold leading-[1.05] sm:text-4xl lg:text-[2.9rem]">
              Featured projects from the portfolio
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <a href="#/portfolio" className="btn btn-ghost">
              View all work
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80} className={spans[i]}>
              <ProjectCard project={p} index={i} eager={i < 2} onExpand={() => setLightbox(i)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- CATEGORIES */}
      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-500">Explore Categories</p>
            <h2 className="display mt-4 text-[2rem] font-bold leading-[1.05] sm:text-4xl lg:text-[2.9rem]">
              Ten ways the work is organised
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Every project sits in one of ten collections. Choose a category to open its filtered gallery.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {categories.slice(0, 2).map((cat, i) => (
              <Reveal key={cat.id} delay={i * 80}>
                <a
                  href={`#/portfolio?c=${cat.id}`}
                  className="group card-hover relative block overflow-hidden rounded-[14px]"
                  aria-label={`${cat.title} — ${countByCategory(cat.id)} projects`}
                >
                  <ArtworkFrame
                    ratio={16 / 10}
                    tone={cat.tone}
                    variant={cat.variant}
                    title={cat.title}
                    index={i}
                    quiet
                    plain
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <h3 className="display text-[1.0625rem] font-semibold leading-tight text-white sm:text-[1.2rem]">
                        {cat.title}
                      </h3>
                      <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                        {String(countByCategory(cat.id)).padStart(2, "0")} projects
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink"
                    >
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <p className="sr-only">{cat.blurb}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(2).map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 4) * 70}>
                <a
                  href={`#/portfolio?c=${cat.id}`}
                  className="group card-hover relative block overflow-hidden rounded-[14px]"
                  aria-label={`${cat.title} — ${countByCategory(cat.id)} projects`}
                >
                  <ArtworkFrame
                    ratio={1}
                    tone={cat.tone}
                    variant={cat.variant}
                    title={cat.title}
                    index={i + 2}
                    quiet
                    plain
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="display text-[1rem] font-semibold leading-tight text-white">{cat.title}</h3>
                    <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                      {String(countByCategory(cat.id)).padStart(2, "0")} projects
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="sr-only">{cat.blurb}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- SERVICES */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-brand-500">Services</p>
              <h2 className="display mt-4 text-[2rem] font-bold leading-[1.05] sm:text-4xl">
                What I design for churches, events and brands
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-muted">
                From a single flyer to a complete identity system — every project is handled with the same attention to
                message, craft and detail.
              </p>
              <a href="#/services" className="btn btn-primary mt-8">
                See all services
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {services.slice(0, 6).map((s, i) => (
                <li key={s.id}>
                  <Reveal delay={i * 60}>
                    <a
                      href={`#/services?s=${s.id}`}
                      className="group flex items-center gap-6 py-6 transition-colors md:py-7"
                    >
                      <span className="font-mono text-[0.75rem] text-muted transition-colors group-hover:text-brand-500">
                        {s.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="display block text-[1.125rem] font-semibold text-ink transition-colors group-hover:text-brand-500 sm:text-[1.375rem]">
                          {s.title}
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] text-muted">{s.summary}</span>
                      </span>
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ ABOUT */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-brand-300">About the studio</p>
              <h2 className="display mt-5 text-[2rem] font-bold leading-[1.06] sm:text-4xl lg:text-[2.9rem]">
                Creative Thinking. Intentional Design.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/65">
                Temmy Tee Graphics is a creative design brand focused on transforming ideas into clear, engaging and
                memorable visual experiences. From church and event graphics to social media creatives and brand
                identity, every project is an opportunity to communicate a message through thoughtful design.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#/about" className="btn btn-on-dark">
                  More about the studio
                </a>
                <a href="#/portfolio" className="btn btn-outline-dark">
                  See the work
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-8">
                <TGMark tone="brand" className="h-14 w-auto" />
                <p className="mt-7 text-[1.0625rem] font-medium leading-relaxed text-white/90">
                  “A design should do its job before it shows off.”
                </p>
                <ul className="mt-8 space-y-4 border-t border-white/10 pt-7">
                  {[
                    ["Based in", site.contact.location],
                    ["Availability", site.contact.availability],
                    ["Working with", "Churches, events, businesses & individuals"],
                  ].map(([label, value]) => (
                    <li key={label} className="flex flex-col gap-1">
                      <span className="eyebrow text-white/40">{label}</span>
                      <span className="text-[0.9375rem] text-white/85">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FINAL CTA */}
      <section className="bg-brand-500 py-20 text-white md:py-28">
        <div className="shell max-w-4xl text-center">
          <Reveal>
            <h2 className="display text-[2.1rem] font-extrabold leading-[1.03] sm:text-5xl lg:text-[3.6rem]">
              Have an Idea? Let's Bring It to Life.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
              Tell me what you're planning, and let's create something worth remembering.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#/contact" className="btn btn-on-dark">
                Start a Project
              </a>
              <a href="#/portfolio" className="btn btn-outline-dark">
                View Portfolio
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox
        items={featured}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(next) => setLightbox(next)}
      />
    </main>
  );
}
