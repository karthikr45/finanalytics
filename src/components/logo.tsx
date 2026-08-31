import { cn } from "@/lib/utils";

// Recreated as SVG from the brand mark: a teal → blue gradient ring (with
// gear-like notches, nodding to "analytics/engineering") wrapping a
// geometric "A", with a small growth-arrow accent at the top right.
// aksharafinalytics.com itself is unreachable from this environment
// (network policy), so this is a faithful redraw rather than a traced
// copy of the source file — swap in the real asset if/when you can get it
// onto disk.

export function LogoMark({ className }: { className?: string }) {
  const gradId = "af-logo-grad";
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22c1dc" />
          <stop offset="1" stopColor="#1f6fd6" />
        </linearGradient>
      </defs>

      {/* Gear-notched ring */}
      <circle cx="24" cy="24" r="19" stroke={`url(#${gradId})`} strokeWidth="2.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="22.6"
          y="2.6"
          width="2.8"
          height="4.4"
          rx="1"
          fill={`url(#${gradId})`}
          transform={`rotate(${deg} 24 24)`}
        />
      ))}

      {/* Geometric "A" */}
      <path
        d="M24 13L33 35H29.2L27.3 30H20.7L18.8 35H15L24 13ZM24 19.6L21.9 26.6H26.1L24 19.6Z"
        fill={`url(#${gradId})`}
      />

      {/* Growth arrow accent */}
      <path
        d="M30 12.5L37 9.5M37 9.5L34.5 9.2M37 9.5L36.7 12"
        stroke={`url(#${gradId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoLockup({
  className,
  tone = "dark",
  showSuffix = true,
}: {
  className?: string;
  /** "dark" = for use on dark/navy backgrounds, "light" = for use on paper backgrounds */
  tone?: "dark" | "light";
  showSuffix?: boolean;
}) {
  const wordmarkColor = tone === "dark" ? "text-white" : "text-ink";
  const suffixColor = tone === "dark" ? "text-white/45" : "text-muted";

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-tight">
          <span className="bg-gradient-to-r from-[#22c1dc] to-[#1f6fd6] bg-clip-text text-transparent">
            Akshara
          </span>{" "}
          <span className={wordmarkColor}>Finalytics</span>
        </span>
        {showSuffix && (
          <span className={cn("text-[0.6rem] font-semibold uppercase tracking-[0.16em]", suffixColor)}>
            Private Limited
          </span>
        )}
      </span>
    </span>
  );
}
