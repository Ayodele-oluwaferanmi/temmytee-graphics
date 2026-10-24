import { ArtworkFrame } from "@/components/ArtworkFrame";
import { ProjectCard } from "@/components/ProjectCard";
import { getCategory, getProject, relatedProjects } from "@/data/projects";
import { services } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { useScrollReset } from "@/lib/router";

export function ProjectDetail({ id }: { id?: string }) {
  useScrollReset([id]);
  const project = id ? getProject(id) : undefined;

  if (!project) {
    return (
      <main id="main" className="shell flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
        <p className="eyebrow text-brand-500">404</p>
        <h1 className="display mt-4 text-3xl font-bold md:text-4xl">That project could not be found</h1>
        <p className="mt-4 max-w-md text-muted">
          The link may be out of date. Browse the full portfolio to see the current work.
        </p>
        <a href="#/portfolio" className="btn btn-primary mt-8">
          Back to portfolio
        </a>
      </main>
    );
  }

  const category = getCategory(project.category);
  const related = relatedProjects(project, 4);
  const matchedService = services.find((s) => s.category === category?.title);
  const enquiryService = encodeURIComponent(matchedService?.title ?? "Something else");

  return (
    <main id="main" className="pt-[68px] md:pt-[78px]">
      {/* Header */}
      <section className="shell pt-12 md:pt-16">
        <a
          href="#/portfolio"
          className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-muted transition-colors hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All work
        </a>

        <div className="mt-8 grid gap-8 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-brand-500">
              {category?.title}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <h1 className="display mt-4 text-[2.25rem] font-bold leading-[1.03] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>
          <dl className="grid gap-5 text-[0.875rem] sm:grid-cols-2 md:col-span-4">
            <div>
              <dt className="eyebrow text-muted">Format</dt>
              <dd className="mt-2 text-ink">{project.format}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Discipline</dt>
              <dd className="mt-2 text-ink">{category?.short}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Artwork */}
      <section className="shell py-10 md:py-14">
        <Reveal>
          <div className="overflow-hidden rounded-[16px] bg-paper ring-1 ring-line">
            <ArtworkFrame
              ratio={project.ratio}
              tone={project.tone}
              variant={project.variant}
              title={project.title}
              format={project.format}
              index={0}
              image={project.image}
              alt={`${project.title} — ${category?.title ?? "design"} by Temmy Tee Graphics`}
              eager
              quiet
              className="mx-auto max-h-[80vh] w-full"
            />
          </div>
        </Reveal>

        {!project.image && (
          <p className="mt-5 rounded-[12px] border border-dashed border-line bg-paper px-5 py-4 text-[0.8125rem] leading-relaxed text-muted">
            <span className="font-medium text-ink">Artwork slot.</span> This project is set up and ready for the
            original design. Add the image URL to the <code className="font-mono text-brand-500">image</code> field of{" "}
            <code className="font-mono text-brand-500">{project.id}</code> in{" "}
            <code className="font-mono text-brand-500">src/data/projects.ts</code> and it appears here, in the gallery
            and in the lightbox automatically.
          </p>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-[14px] bg-paper ring-1 ring-line">
                <img
                  src={src}
                  alt={`${project.title} — additional artwork ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Details */}
      <section className="border-y border-line bg-paper/60">
        <div className="shell grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h2 className="eyebrow text-muted">About this project</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/85">
              {project.description ?? `An artwork from the ${category?.title.toLowerCase() ?? "design"} collection.`}
            </p>

            {project.objective && (
              <>
                <h3 className="eyebrow mt-10 text-muted">Objective</h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink/85">{project.objective}</p>
              </>
            )}
          </div>

          <div className="md:col-span-5 md:pl-10">
            <div className="rounded-[14px] border border-line bg-white p-7">
              {project.deliverables?.length && (
                <>
                  <h2 className="eyebrow text-muted">Deliverables</h2>
                  <ul className="mt-5 space-y-3">
                    {project.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[0.9375rem] text-ink/85">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <a href={`#/contact?service=${enquiryService}`} className="btn btn-primary mt-8 w-full">
                Request a Similar Design
              </a>
              <p className="mt-4 text-center text-[0.8125rem] text-muted">
                Tell me what you're planning — I'll reply with the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="shell py-16 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-2xl font-bold sm:text-3xl">Related work</h2>
            <a
              href={`#/portfolio?c=${project.category}`}
              className="link-underline hidden text-[0.9375rem] font-medium text-ink sm:inline-block"
            >
              More {category?.short} designs
            </a>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProjectCard project={p} index={i} showFormat={false} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
