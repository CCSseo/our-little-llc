type Direction = "up-right" | "down-right" | "right" | "left" | "down";

const PATHS: Record<Direction, string> = {
  "up-right": "M5 19 19 5M5 5h14v14",
  "down-right": "M5 5 19 19M5 19h14V5",
  right: "M4 12h16M13 5l7 7-7 7",
  left: "M20 12H4m7-7-7 7 7 7",
  down: "M12 4v16M5 13l7 7 7-7",
};

export function ArrowIcon({ direction = "up-right", className = "" }: { direction?: Direction; className?: string }) {
  return (
    <svg className={`arrow-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[direction]} />
    </svg>
  );
}
