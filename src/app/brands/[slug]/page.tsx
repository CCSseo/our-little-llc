import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, SITE } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Artwork } from "@/components/Artwork";

type Props = { params: { slug: string } };

export function generateStaticParams() { return BRANDS.map((brand) => ({ slug: brand.slug })); }

export function generateMetadata({ params }: Props): Metadata {
  const brand = BRANDS.find((b) => b.slug === params.slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: `${brand.name}: ${brand.descriptor} What went into the build, and what it taught us. Part of Our Little Company.`,
    alternates: { canonical: `${SITE.url}/brands/${brand.slug}` },
  };
}

export default function BrandPage({ params }: Props) {
  const idx = BRANDS.findIndex((b) => b.slug === params.slug);
  if (idx === -1) notFound();
  const brand = BRANDS[idx];
  const prev = BRANDS[(idx - 1 + BRANDS.length) % BRANDS.length];
  const next = BRANDS[(idx + 1) % BRANDS.length];

  return (
    <main id="main-content">
      <div className="shell page-space brand-page-top">
        <div className="brand-breadcrumb">
          <Link href="/#family" className="text-link text-muted">← The family</Link>
          <span className="eyebrow">{String(idx + 1).padStart(2,"0")} / {String(BRANDS.length).padStart(2,"0")}</span>
        </div>
        <section className="brand-hero">
          <div>
            <p className="eyebrow mb-4">{brand.category}</p>
            <h1 className="page-title">{brand.name.replace(/ LLC$/, "")}<span className="text-pop">.</span></h1>
            <p className="brand-lede">{brand.descriptor}</p>
            {brand.url ? (
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="button button-dark mt-7">
                Explore {brand.name.replace(/ LLC$/, "")} <span aria-hidden>↗</span>
              </a>
            ) : (
              <a href="#the-build" className="text-link mt-5">Inside the build <span aria-hidden>↓</span></a>
            )}
          </div>
          <Artwork name={`${brand.slug}-premium`} className="brand-hero-art" priority />
        </section>
        <dl className="brand-facts">
          <div><dt className="eyebrow">{brand.flagship ? "Company" : "Project"}</dt><dd>{brand.name}</dd></div>
          <div><dt className="eyebrow">Focus</dt><dd>{brand.category}</dd></div>
          <div><dt className="eyebrow">Made here</dt><dd>From the ground up</dd></div>
        </dl>
      </div>
      <section id="the-build" className="shell brand-detail anchor-section">
        <div>
          <p className="eyebrow mb-6">The idea & the making</p>
          <div className="reading-copy">
            {brand.story.map((paragraph) => <Reveal key={paragraph}><p>{paragraph}</p></Reveal>)}
          </div>
        </div>
        <aside className="build-aside">
          <h2 className="eyebrow">What went into it</h2>
          <ul className="build-list">{brand.builtInHouse.map((item, i) => <li key={item}><span aria-hidden>{String(i+1).padStart(2,"0")}</span>{item}</li>)}</ul>
        </aside>
      </section>
      <section className="lesson-section">
        <div className="shell lesson-inner">
          <p className="eyebrow">What we learned</p>
          <Reveal>
            <h2>{brand.lesson.heading}</h2>
            <p>{brand.lesson.body}</p>
          </Reveal>
        </div>
      </section>
      <nav aria-label="More brands" className="shell brand-pagination">
        <Link href={`/brands/${prev.slug}`}><span className="eyebrow">← Previous</span><p>{prev.name.replace(/ LLC$/, "")}</p></Link>
        <Link href={`/brands/${next.slug}`}><span className="eyebrow">Next →</span><p>{next.name.replace(/ LLC$/, "")}</p></Link>
      </nav>
    </main>
  );
}
