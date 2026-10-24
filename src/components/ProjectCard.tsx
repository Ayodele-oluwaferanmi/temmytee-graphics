import { ArtworkFrame } from "@/components/ArtworkFrame";
import { getCategory, type Project } from "@/data/projects";
import { cn } from "@/utils/cn";

export function ProjectCard({
  project,
  index,
  onExpand,
  eager = false,
  className,
  showFormat = true,
}: {
  project: Project;
  index: number;
  onExpand?: (project: Project) => void;
  eager?: boolean;
  className?: string;
  showFormat?: boolean;
}) {
  const category = getCategory(project.category);

  return (
    <article className={cn("group relative", className)}>
      <a
        href={`#/project/${project.id}`}
        aria-label={`View project: ${project.title}`}
        className="block focus-visible:outline-offset-4"
      >
        <div className="card-hover overflow-hidden rounded-[14px] bg-paper ring-1 ring-line/70">
          <div className="zoom-media overflow-hidden">
            <ArtworkFrame
              ratio={project.ratio}
              tone={project.tone}
              variant={project.variant}
              title={project.title}
              format={project.format}
              index={index}
              image={project.image}
              alt={`${project.title} — ${category?.title ?? "design"} by Temmy Tee Graphics`}
              eager={eager}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="display text-[1.0625rem] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-500">
              {project.title}
            </h3>
            <p className="mt-1 text-[0.8125rem] text-muted">
              {category?.title}
              {showFormat && project.format ? ` · ${project.format}` : ""}
            </p>
          </div>
          <span
            aria-hidden
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </a>

      {onExpand && (
        <button
          type="button"
          onClick={() => onExpand(project)}
          className="absolute right-0 top-0 m-3 hidden h-10 items-center gap-2 rounded-full bg-white/95 px-4 text-[0.8125rem] font-medium text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100 md:flex"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M2 6V2h4M14 10v4h-4M2 10v4h4M14 6V2h-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Quick view
        </button>
      )}
    </article>
  );
}
