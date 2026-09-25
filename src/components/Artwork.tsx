import Image from "next/image";
import { ART_ALT, getArt } from "@/lib/art";

export function Artwork({
  name, className = "", priority = false, decorative = false,
  sizes = "(max-width: 767px) 85vw, 40vw",
}: {
  name: string; className?: string; priority?: boolean; decorative?: boolean; sizes?: string;
}) {
  const src = getArt(name);
  if (!src) return null;
  return (
    <div className={`artwork ${className}`}>
      <Image src={src} alt={decorative ? "" : ART_ALT[name] ?? ""} fill
        sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}
