import { useCallback, useEffect } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { getCategory, type Project } from "@/data/projects";
import { cn } from "@/utils/cn";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null && index >= 0 && index < items.length;
  const project = open ? items[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  if (!open || !project) return null;
  const category = getCategory(project.category);

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/96 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <div className="min-w-0">
          <p className="eyebrow text-white/50">
            {category?.title} {project.year ? `· ${project.year}` : ""}
          </p>
          <h2 className="display mt-1 truncate text-lg font-semibold text-white md:text-xl">{project.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close preview"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-20">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous artwork"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink md:left-6 md:h-12 md:w-12"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          key={project.id}
          className="animate-scale-in overflow-hidden rounded-[10px] bg-white/[0.04]"
          style={{ height: `min(74vh, calc((100vw - 9rem) / ${project.ratio}))`, aspectRatio: String(project.ratio) }}
        >
          <ArtworkFrame
            ratio={project.ratio}
            tone={project.tone}
            variant={project.variant}
            title={project.title}
            format={project.format}
            index={index ?? 0}
            image={project.image}
            alt={`${project.title} enlarged preview`}
            eager
            quiet
          />
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next artwork"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink md:right-6 md:h-12 md:w-12"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-6 md:px-8">
        <p className="max-w-xl text-[0.8125rem] text-white/50">
          {project.description ?? "Artwork by Temmy Tee Graphics."}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.8125rem] text-white/50">
            {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <a
            href={`#/project/${project.id}`}
            className={cn(
              "rounded-full border border-white/25 px-5 py-2.5 text-[0.8125rem] font-medium text-white transition-colors hover:bg-white hover:text-ink",
            )}
          >
            Open project
          </a>
        </div>
      </div>
    </div>
  );
}
