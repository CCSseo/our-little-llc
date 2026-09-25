export function HouseMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M10 29.5 29.9 12.4Q32 10.6 34.1 12.4L54 29.5V53Q54 56 51 56H13Q10 56 10 53Z" fill="currentColor" />
      <path d="M25 56V42A7 7 0 0 1 39 42V56Z" fill="#e10600" />
    </svg>
  );
}

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`company-wordmark ${inverse ? "text-paper" : "text-ink"}`}>
      <HouseMark className="wordmark-house" />
      <span className="wordmark-type"><span>our little</span><span>company</span></span>
    </span>
  );
}
