import { useId } from "react";
import { cn } from "@/utils/cn";

type MarkTone = "brand" | "white" | "ink" | "current";

const tones: Record<MarkTone, string> = {
  brand: "#0B47F0",
  white: "#FFFFFF",
  ink: "#0A0B0E",
  current: "currentColor",
};

/**
 * The Temmy Tee Graphics monogram — the geometric "tg" symbol from the
 * supplied brand assets, rebuilt as vector art so it stays razor sharp at
 * every size. Colours and proportions follow the original mark exactly.
 */
export function TGMark({ className, tone = "brand" }: { className?: string; tone?: MarkTone }) {
  const id = useId().replace(/:/g, "");
  const color = tones[tone];

  return (
    <svg
      viewBox="0 0 128 100"
      className={cn("block", className)}
      role="img"
      aria-label="Temmy Tee Graphics monogram"
      fill="none"
    >
      <mask
        id={`tg-cut-${id}`}
        maskUnits="userSpaceOnUse"
        x="-2"
        y="-2"
        width="132"
        height="104"
      >
        <rect x="-2" y="-2" width="132" height="104" fill="#fff" />
        <rect x="106" y="71.5" width="24" height="26" fill="#000" />
        <rect x="113" y="38" width="16" height="18.5" fill="#000" />
      </mask>
      <g fill={color}>
        <path d="M0 44A38 38 0 0 1 38 6H52V44Z" />
        <path d="M0 50A38 38 0 0 0 38 88H52V50Z" />
        <circle cx="80" cy="16.5" r="11.5" />
        <rect x="98" y="56.5" width="27" height="15" />
      </g>
      <g mask={`url(#tg-cut-${id})`}>
        <circle cx="98" cy="64" r="19.5" stroke={color} strokeWidth="15" />
      </g>
    </svg>
  );
}

/**
 * Full horizontal lockup: symbol + wordmark.
 * `variant="dark"` renders the blue/ink version for light backgrounds.
 * `variant="light"` renders the white version for blue or dark backgrounds.
 */
export function Logo({
  variant = "dark",
  className,
  markClassName,
  compact = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  markClassName?: string;
  compact?: boolean;
}) {
  const tone: MarkTone = variant === "light" ? "white" : "brand";
  const wordColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <TGMark tone={tone} className={cn("h-8 w-auto", markClassName)} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-logo text-[0.95rem] font-semibold tracking-[-0.02em] md:text-[1.05rem]",
              wordColor,
            )}
          >
            Temmy Tee
          </span>
          <span
            className={cn(
              "font-logo mt-[3px] text-[0.5rem] font-semibold tracking-[0.42em] md:text-[0.55rem]",
              variant === "light" ? "text-white/70" : "text-brand-500",
            )}
          >
            GRAPHICS
          </span>
        </span>
      )}
    </span>
  );
}
