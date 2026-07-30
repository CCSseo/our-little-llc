import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, SITE } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ART_ALT, getArt } from "@/lib/art";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const brand = BRANDS.find((b) => b.slug === params.slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: `${brand.name}: ${brand.descriptor}. A home-grown brand of Our Little Company LLC, built from the ground up in-house.`,
    alternates: { canonical: `${SITE.url}/brands/${brand.slug}` },
  };
}

export default function BrandPage({ params }: Props) {
  const idx = BRANDS.findIndex((b) => b.slug === params.slug);
  if (idx === -1) notFound();
  const brand = BRANDS[idx];
  const no = String(idx + 1).padStart(2, "0");
  const prev = BRANDS[(idx - 1 + BRANDS.length) % BRANDS.length];
  const next = BRANDS[(idx + 1) % BRANDS.length];
  const art = getArt(brand.slug);

  return (
    <main>
      {/* ---------- Landing hero: name left, the brand's object right ---------- */}
      <section className="mx-auto max-w-content px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="flex items-baseline gap-5">
          <span className="display text-lg font-bold text-pop">{no}</span>
          <p className="label text-[0.8rem] text-muted">A brand of {SITE.brandFull}</p>
        </div>
        <div className={art ? "mt-6 grid items-center gap-6 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-12" : "mt-6"}>
          <div>
            <h1 className="display text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              {brand.name}
              <span className="text-pop">.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-medium text-muted sm:text-2xl">
              {brand.descriptor}
            </p>
          </div>
          {art && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={art}
              alt={ART_ALT[brand.slug] ?? `${brand.name} artwork`}
              className="mx-auto mt-4 w-full max-w-sm lg:mx-0 lg:mt-0 lg:max-w-none"
            />
          )}
        </div>

        {/* facts row */}
        <div className="mt-12 grid max-w-3xl grid-cols-1 gap-6 border-y border-ink/15 py-6 sm:grid-cols-3">
          <div>
            <div className="label text-[0.75rem] text-faint">Status</div>
            <div className="mt-2 flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-pop" />
              <span className="display text-base font-bold uppercase">{brand.status}</span>
            </div>
          </div>
          <div>
            <div className="label text-[0.75rem] text-faint">Origin</div>
            <div className="display mt-2 text-base font-bold uppercase">Built in-house</div>
          </div>
          <div>
            <div className="label text-[0.75rem] text-faint">Home</div>
            {brand.url ? (
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-red mt-2 inline-block text-base font-bold"
              >
                {brand.urlLabel}
              </a>
            ) : (
              <div className="display mt-2 text-base font-bold uppercase">Private, by design</div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className="mx-auto max-w-content px-5 pt-16 sm:px-8">
        <div className="max-w-prose space-y-8 text-xl leading-relaxed text-ink/80">
          {brand.story.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Built in-house ---------- */}
      <section className="mx-auto max-w-content px-5 pt-20 sm:px-8">
        <Reveal>
          <p className="label text-[0.8rem] text-pop">Built in-house</p>
          <ul className="mt-6 max-w-3xl">
            {brand.builtInHouse.map((f, i) => (
              <li
                key={f}
                className="flex items-baseline gap-5 border-t border-ink/15 py-4 last:border-b"
              >
                <span className="display text-base font-bold text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-lg font-bold uppercase tracking-tight sm:text-xl">
                  {f}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose text-lg text-muted">
            Like everything in the family, {brand.name} was imagined, designed, and built from the
            ground up, in-house. Nothing acquired, nothing off the shelf.
          </p>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-content px-5 pt-16 sm:px-8">
        <Reveal className="flex flex-wrap items-center gap-5">
          {brand.url && (
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink px-8 py-4 text-base font-bold uppercase tracking-widest text-paper transition-colors hover:bg-pop"
            >
              Visit {brand.urlLabel}
            </a>
          )}
          <Link href="/#family" className="link-red text-base font-semibold text-muted">
            ← Back to the family
          </Link>
        </Reveal>
      </section>

      {/* ---------- Prev / next ---------- */}
      <nav aria-label="More brands" className="mt-24 border-t border-ink/15">
        <div className="mx-auto grid max-w-content grid-cols-2 px-5 sm:px-8">
          <Link
            href={`/brands/${prev.slug}`}
            className="group border-r border-ink/15 py-10 pr-6 transition-colors hover:bg-ink hover:text-paper"
          >
            <div className="label text-[0.75rem] text-faint group-hover:text-paper/50">Previous</div>
            <div className="display mt-3 text-xl font-bold uppercase tracking-tight sm:text-3xl">
              <span aria-hidden className="mr-2 text-pop">←</span>
              {prev.name}
            </div>
          </Link>
          <Link
            href={`/brands/${next.slug}`}
            className="group py-10 pl-6 text-right transition-colors hover:bg-ink hover:text-paper"
          >
            <div className="label text-[0.75rem] text-faint group-hover:text-paper/50">Next</div>
            <div className="display mt-3 text-xl font-bold uppercase tracking-tight sm:text-3xl">
              {next.name}
              <span aria-hidden className="ml-2 text-pop">→</span>
            </div>
          </Link>
        </div>
      </nav>
    </main>
  );
}
