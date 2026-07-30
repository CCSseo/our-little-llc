import Link from "next/link";
import type { Brand } from "@/lib/content";

// One brand in the home-page index: an editorial row, not a card. The whole
// row is the link; hover inverts it to black with the arrow in red.
export function BrandRow({ brand, index }: { brand: Brand; index: number }) {
  const no = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block border-t border-ink/15 transition-colors duration-200 hover:bg-ink hover:text-paper"
    >
      <div className="mx-auto grid max-w-content grid-cols-[auto_1fr_auto] items-baseline gap-x-5 px-5 py-8 sm:gap-x-10 sm:px-8 sm:py-10">
        <span className="display text-base font-semibold text-pop sm:text-lg">{no}</span>
        <div className="min-w-0">
          <h3 className="display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            {brand.name}
          </h3>
          <p className="mt-3 max-w-2xl text-base text-muted group-hover:text-paper/60 sm:text-lg">
            {brand.descriptor}
          </p>
          <span className="mt-3 flex items-center gap-2.5 sm:hidden">
            <span aria-hidden className="h-2 w-2 rounded-full bg-pop" />
            <span className="label text-[0.7rem] text-faint group-hover:text-paper/50">
              {brand.status}
            </span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className="label hidden items-center gap-2.5 text-[0.75rem] text-faint group-hover:text-paper/50 sm:flex">
            <span aria-hidden className="h-2 w-2 rounded-full bg-pop" />
            {brand.status}
          </span>
          <span
            aria-hidden
            className="display text-2xl leading-none transition-transform duration-200 group-hover:translate-x-1 group-hover:text-pop sm:text-3xl"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
