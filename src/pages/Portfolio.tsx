import { useMemo } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { Lightbox } from "@/components/Lightbox";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { categories, countByCategory, projectsByCategory, type CategoryId } from "@/data/projects";
import { useScrollReset } from "@/lib/router";
import { cn } from "@/utils/cn";
import { useState } from "react";

export function Portfolio({ initialCategory }: { initialCategory?: string }) {
  useScrollReset(["portfolio"]);
  const active = (categories.find((c) => c.id === initialCategory)?.id ?? "all") as CategoryId | "all";
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => projectsByCategory(active), [active]);

  const setFilter = (id: CategoryId | "all") => {
    setLightbox(null);
    window.location.hash = id === "all" ? "#/portfolio" : `#/portfolio?c=${id}`;
  };

  return (
    <main id="main" className="pt-[68px] md:pt-[78px]">
      {/* Header */}
      <section className="shell border-b border-line pb-12 pt-14 md:pb-16 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-500">Portfolio</p>
            <h1 className="display mt-5 text-[2.4rem] font-extrabold leading-[1.0] sm:text-5xl lg:text-[4rem]">
              The Work
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
              Church graphics, birthday and wedding designs, event flyers, social media creatives, logos and complete
              brand identity — organised into ten collections.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="rounded-[12px] border border-dashed border-line bg-paper px-5 py-4 text-[0.8125rem] leading-relaxed text-muted">
              <span className="font-medium text-ink">Adding artwork:</span> each project below is a ready-made slot.
              Paste an image URL into its <code className="font-mono text-brand-500">image</code> field in{" "}
              <code className="font-mono text-brand-500">src/data/projects.ts</code> and the real design replaces the
              placeholder everywhere — gallery, category card and lightbox.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[68px] z-30 border-b border-line bg-white/94 backdrop-blur-xl md:top-[78px]">
        <div className="shell">
          <div
            role="group"
            aria-label="Portfolio categories"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-4 md:mx-0 md:flex-wrap md:px-0"
          >
            {[{ id: "all" as const, short: "All Work" }, ...categories].map((cat) => {
              const isActive = active === cat.id;
              const count = countByCategory(cat.id as CategoryId);
              return (
                <button
                  key={cat.id}
                  aria-pressed={isActive}
                  onClick={() => setFilter(cat.id as CategoryId | "all")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.8125rem] font-medium transition-all duration-300",
                    isActive
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-line bg-white text-ink/70 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {cat.short}
                  <span className={cn("font-mono text-[0.6875rem]", isActive ? "text-white/70" : "text-muted")}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="shell py-12 md:py-16">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="eyebrow text-muted">
            {active === "all" ? "All Work" : categories.find((c) => c.id === active)?.title}
          </h2>
          <p className="text-[0.8125rem] text-muted">
            {items.length} {items.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {active !== "all" && (
          <p className="mb-10 max-w-2xl text-[1rem] leading-relaxed text-muted">
            {categories.find((c) => c.id === active)?.blurb}
          </p>
        )}

        {items.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-line bg-paper px-6 py-20 text-center">
            <h3 className="display text-xl font-semibold">Nothing in this category yet</h3>
            <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] text-muted">
              Add a project to this category in <code className="font-mono text-brand-500">src/data/projects.ts</code>.
            </p>
          </div>
        ) : (
          <div key={active} className="columns-1 gap-7 sm:columns-2 lg:columns-3 [&>*]:mb-7">
            {items.map((p, i) => (
              <div key={p.id} className="break-inside-avoid animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}>
                <ProjectCard
                  project={p}
                  index={i}
                  eager={i < 3}
                  onExpand={() => setLightbox(items.findIndex((x) => x.id === p.id))}
                />
              </div>
            ))}
          </div>
        )}

        {/* Category jump */}
        <div className="mt-20 border-t border-line pt-12">
          <h2 className="eyebrow text-muted">Jump to another category</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "group overflow-hidden rounded-[12px] border text-left transition-all duration-300",
                  active === cat.id ? "border-brand-500" : "border-line hover:border-ink/30",
                )}
              >
                <div className="zoom-media overflow-hidden">
                  <ArtworkFrame
                    ratio={4 / 3}
                    tone={cat.tone}
                    variant={cat.variant}
                    title={cat.short}
                    index={i}
                    quiet
                    plain
                  />
                </div>
                <span className="flex items-center justify-between gap-2 px-4 py-3 text-[0.8125rem] font-medium">
                  {cat.short}
                  <span className="font-mono text-[0.6875rem] text-muted">
                    {String(countByCategory(cat.id)).padStart(2, "0")}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <section className="bg-brand-500 py-16 text-white md:py-20">
          <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="display text-[1.75rem] font-bold leading-tight sm:text-3xl">
                Can't find exactly what you need?
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Every project starts from your brief — send the details and let's design it.
              </p>
            </div>
            <a href="#/contact" className="btn btn-on-dark shrink-0">
              Start a Project
            </a>
          </div>
        </section>
      </Reveal>

      <Lightbox
        items={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(next) => setLightbox(next)}
      />
    </main>
  );
}
