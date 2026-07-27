// The company mark: a solid geometric house silhouette with the one red
// arched door, in pure SVG (currentColor, so it works on white and black).
// Zero external image assets.
export function HouseMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden className={className}>
      {/* house silhouette with chimney */}
      <path
        d="M20 82 L20 45 L48 19 L58 28.3 L58 21 L68 21 L68 37.6 L76 45 L76 82 Z"
        fill="currentColor"
      />
      {/* arched door, the one red */}
      <path d="M41 82 V64 A7 7 0 0 1 55 64 V82 Z" fill="#e10600" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 text-ink">
      <HouseMark className="h-8 w-8 shrink-0" />
      <span className="display leading-none">
        <span className="block text-[1.05rem] font-bold uppercase tracking-tight">
          Our Little Company
        </span>
        {!compact && (
          <span className="label mt-1 block text-[0.5rem] text-faint">
            A family of home-grown brands
          </span>
        )}
      </span>
    </span>
  );
}
