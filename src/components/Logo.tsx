import { cn } from "@/utils/cn";

type MarkTone = "brand" | "white" | "ink" | "current";

const markSources: Record<MarkTone, string> = {
  brand: "/brand/temmytee-mark-blue.png",
  white: "/brand/temmytee-mark-white.png",
  ink: "/brand/temmytee-mark-blue.png",
  current: "/brand/temmytee-mark-blue.png",
};

export function TGMark({ className, tone = "brand" }: { className?: string; tone?: MarkTone }) {
  return (
    <img
      src={markSources[tone]}
      className={cn("block h-auto", className)}
      alt="Temmy Tee Graphics"
      decoding="async"
    />
  );
}

export function Logo({
  variant = "dark",
  className,
  markClassName,
}: {
  variant?: "dark" | "light";
  className?: string;
  markClassName?: string;
}) {
  const src =
    variant === "light" ? "/brand/temmytee-logo-white.png" : "/brand/temmytee-logo-blue.png";

  return (
    <img
      src={src}
      className={cn("block h-8 w-auto object-contain", markClassName, className)}
      alt="Temmy Tee Graphics"
      decoding="async"
    />
  );
}
