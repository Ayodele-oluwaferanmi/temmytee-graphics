import { cn } from "@/utils/cn";
import type { Tone } from "@/data/projects";

const palettes: Record<Tone, { bg: string; fg: string; accent: string }> = {
  brand: { bg: "#0B47F0", fg: "#FFFFFF", accent: "#FFFFFF" },
  ink: { bg: "#0A0B0E", fg: "#FFFFFF", accent: "#0B47F0" },
  paper: { bg: "#F1F2F5", fg: "#0A0B0E", accent: "#0B47F0" },
  slate: { bg: "#E2E5EB", fg: "#14161B", accent: "#0B47F0" },
};

function wrap(text: string, maxChars: number, maxLines: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) current = next;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  const trimmed = lines.slice(0, maxLines);
  if (lines.length > maxLines) trimmed[maxLines - 1] = `${trimmed[maxLines - 1].slice(0, maxChars - 1)}…`;
  return trimmed;
}

function DotGrid({ w, h, color, step = 46, r = 2 }: { w: number; h: number; color: string; step?: number; r?: number }) {
  const dots: { x: number; y: number }[] = [];
  for (let x = 0; x <= w; x += step) for (let y = 0; y <= h; y += step) dots.push({ x, y });
  return (
    <g fill={color} opacity={0.22}>
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={r} />
      ))}
    </g>
  );
}

interface Props {
  ratio: number;
  tone: Tone;
  variant: number;
  title: string;
  format?: string;
  index?: number;
  image?: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  /** Hides the placeholder annotation (used for small thumbnails). */
  quiet?: boolean;
  /** Renders the geometric composition only — used when the card supplies its own typography. */
  plain?: boolean;
}

/**
 * ArtworkFrame
 * - With `image`: the original artwork is shown complete (object-contain), never cropped.
 * - Without `image`: an on-brand placeholder composition is shown, clearly labelled so
 *   it is never mistaken for finished client work.
 */
export function ArtworkFrame({
  ratio,
  tone,
  variant,
  title,
  format,
  index,
  image,
  alt,
  className,
  eager = false,
  quiet = false,
  plain = false,
}: Props) {
  const w = 800;
  const h = Math.round(w / ratio);
  const wide = ratio > 1.55;
  const c = palettes[tone];
  const pad = Math.min(w, h) * 0.062;

  const titleSize = Math.min(w * 0.082, h * (wide ? 0.2 : 0.145));
  const labelSize = titleSize * 0.24;
  const maxChars = Math.floor((w - pad * 2) / (titleSize * 0.56));
  const lines = wrap(title, Math.max(10, maxChars), wide ? 2 : 3);
  const lineStep = titleSize * 1.06;
  const blockH = labelSize + titleSize * 0.5 + lines.length * lineStep;
  const bottom = h - pad;
  const top = bottom - blockH;

  const shape = () => {
    // Wide formats keep the composition clear of the caption block (bottom-left).
    const fieldTop = wide ? pad * 0.4 : pad * 0.6;
    const fieldH = wide ? (h - pad * 2) * 0.55 : top - pad * 1.6;
    const fieldW = wide ? w * 0.36 : w - pad * 2;
    const x0 = wide ? w - pad - fieldW : pad;

    switch (variant % 6) {
      case 0:
        return (
          <>
            <circle cx={x0 + fieldW * 0.3} cy={fieldTop + fieldH * 0.42} r={fieldH * 0.34} fill={c.accent} />
            <circle
              cx={x0 + fieldW * 0.72}
              cy={fieldTop + fieldH * 0.62}
              r={fieldH * 0.22}
              fill="none"
              stroke={c.fg}
              strokeOpacity={0.35}
              strokeWidth={Math.max(2, fieldH * 0.014)}
            />
            <rect x={x0} y={fieldTop + fieldH * 0.86} width={fieldW * 0.44} height={fieldH * 0.028} fill={c.fg} />
            <rect
              x={x0}
              y={fieldTop + fieldH * 0.95}
              width={fieldW * 0.24}
              height={fieldH * 0.028}
              fill={c.fg}
              opacity={0.5}
            />
          </>
        );
      case 1:
        return (
          <>
            {[0.34, 0.24, 0.14].map((k, i) => (
              <circle
                key={k}
                cx={x0 + fieldW * 0.68}
                cy={fieldTop + fieldH * 0.4}
                r={fieldH * k}
                fill="none"
                stroke={i === 0 ? c.accent : c.fg}
                strokeOpacity={i === 0 ? 1 : 0.4}
                strokeWidth={Math.max(2, fieldH * (i === 0 ? 0.026 : 0.012))}
              />
            ))}
            <rect x={x0} y={fieldTop + fieldH * 0.9} width={fieldW * 0.3} height={fieldH * 0.03} fill={c.fg} />
          </>
        );
      case 2:
        return (
          <>
            <path
              d={`M${x0 + fieldW * 0.18} ${fieldTop} L${x0 + fieldW * 0.62} ${fieldTop} L${
                x0 + fieldW * 0.44
              } ${fieldTop + fieldH} L${x0} ${fieldTop + fieldH} Z`}
              fill={c.accent}
              opacity={0.92}
            />
            <text
              x={x0 + fieldW * 0.72}
              y={fieldTop + fieldH * 0.5}
              fill={c.fg}
              fontSize={fieldH * 0.34}
              fontWeight={700}
              className="svg-display"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0.85}
            >
              {String((index ?? 1) + 1).padStart(2, "0")}
            </text>
          </>
        );
      case 3:
        return (
          <>
            <g transform={`translate(${x0} ${fieldTop})`}>
              <DotGrid w={fieldW} h={fieldH} color={c.fg} />
            </g>
            <circle cx={x0 + fieldW * 0.62} cy={fieldTop + fieldH * 0.46} r={fieldH * 0.28} fill={c.accent} />
            <circle
              cx={x0 + fieldW * 0.24}
              cy={fieldTop + fieldH * 0.3}
              r={fieldH * 0.16}
              fill="none"
              stroke={c.fg}
              strokeOpacity={0.4}
              strokeWidth={Math.max(2, fieldH * 0.012)}
            />
          </>
        );
      case 4:
        return (
          <>
            {[0.16, 0.34, 0.52, 0.7, 0.88].map((k, i) => (
              <rect
                key={k}
                x={x0 + fieldW * k}
                y={fieldTop + fieldH * (0.86 - (i % 3) * 0.26)}
                width={fieldW * 0.07}
                height={fieldH * (0.14 + (i % 3) * 0.26)}
                fill={i === 2 ? c.accent : c.fg}
                opacity={i === 2 ? 1 : 0.55}
              />
            ))}
            <rect x={x0} y={fieldTop + fieldH * 0.06} width={fieldW * 0.62} height={fieldH * 0.022} fill={c.fg} />
          </>
        );
      default:
        return (
          <>
            <path
              d={`M${x0} ${fieldTop + fieldH * 0.62} A ${fieldH * 0.42} ${fieldH * 0.42} 0 0 1 ${
                pad + fieldH * 0.42
              } ${fieldTop + fieldH * 0.2} L${x0 + fieldW * 0.55} ${fieldTop + fieldH * 0.2} L${
                x0 + fieldW * 0.55
              } ${fieldTop + fieldH * 0.62} Z`}
              fill={c.accent}
            />
            <rect
              x={x0 + fieldW * 0.66}
              y={fieldTop + fieldH * 0.2}
              width={fieldW * 0.3}
              height={fieldH * 0.42}
              fill="none"
              stroke={c.fg}
              strokeOpacity={0.32}
              strokeWidth={Math.max(2, fieldH * 0.012)}
            />
          </>
        );
    }
  };

  return (
    <div
      className={cn("zoom-media relative overflow-hidden bg-paper", className)}
      style={{ aspectRatio: String(ratio), backgroundColor: image ? palettes[tone].bg : undefined }}
    >
      {image ? (
        <img
          src={image}
          alt={alt ?? title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-contain"
        />
      ) : (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid slice"
          className="zoom-media h-full w-full"
          role="img"
          aria-label={`${title} — artwork placeholder`}
        >
          <rect width={w} height={h} fill={c.bg} />
          {shape()}

          {/* format label + title */}
          {!plain && (
            <>
              <text
                x={pad}
                y={top + labelSize}
                fill={c.fg}
                opacity={0.72}
                fontSize={labelSize}
                letterSpacing={labelSize * 0.16}
                className="svg-mono"
              >
                {(format ?? "Artwork").toUpperCase()}
              </text>
              {lines.map((line, i) => (
                <text
                  key={i}
                  x={pad}
                  y={top + labelSize + titleSize * 0.5 + lineStep * i + titleSize * 0.84}
                  fill={c.fg}
                  fontSize={titleSize}
                  className="svg-display"
                >
                  {line}
                </text>
              ))}
            </>
          )}

          {/* placeholder annotation */}
          {!quiet && (
            <g>
              <rect
                x={w - pad - 186}
                y={pad}
                width={186}
                height={38}
                fill="none"
                stroke={c.fg}
                strokeOpacity={0.55}
                strokeWidth={1.6}
                strokeDasharray="7 6"
              />
              <text
                x={w - pad - 186 + 93}
                y={pad + 25}
                fill={c.fg}
                opacity={0.8}
                fontSize={15}
                letterSpacing={3.4}
                textAnchor="middle"
                className="svg-mono"
              >
                AWAITING ARTWORK
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
