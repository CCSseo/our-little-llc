import { BRANDS, CONTACT, FAMILY, HERO, PROMISE, SITE, VALUES } from "@/lib/content";
import { BrandRow } from "@/components/BrandRow";
import { Reveal } from "@/components/Reveal";
import { ART_ALT, getArt } from "@/lib/art";
import Link from "next/link";

export default function HomePage() {
  const flagships = BRANDS.filter((b) => b.flagship);
  const workshop = BRANDS.filter((b) => !b.flagship);
  const heroArt = getArt("home");

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-content px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
        <p className="label text-[0.62rem] text-pop">{HERO.eyebrow}</p>
        <div className={heroArt ? "mt-6 grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,26rem)]" : ""}>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.4rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight lg:mt-0">
            A little company. A family of home&#8209;grown brands<span className="text-pop">.</span>
          </h1>
          {heroArt && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroArt}
              alt={ART_ALT.home}
              className="hidden aspect-square w-full border border-ink/15 object-cover lg:block"
            />
          )}
        </div>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-prose text-lg leading-relaxed text-muted sm:text-xl">{HERO.sub}</p>
          <p className="display shrink-0 text-base font-bold uppercase tracking-tight text-ink">
            {HERO.note}
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#family"
            className="bg-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-pop"
          >
            Meet the family
          </Link>
          <Link
            href="/story"
            className="border border-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:border-pop hover:text-pop"
          >
            Read the story
          </Link>
        </div>
      </section>

      {/* ---------- The promise strip ---------- */}
      <div className="bg-ink">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-5 sm:gap-x-6 sm:px-8">
          {PROMISE.map((p, i) => (
            <span key={p} className="flex items-center gap-x-4 sm:gap-x-6">
              <span className="label text-[0.55rem] text-paper/80">{p}</span>
              {i < PROMISE.length - 1 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-pop" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- The family ---------- */}
      <section id="family" className="scroll-mt-24 pt-24">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <p className="label text-[0.62rem] text-pop">{FAMILY.eyebrow}</p>
            <h2 className="display mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
              {FAMILY.heading}
            </h2>
            <p className="mt-6 max-w-prose text-lg text-muted">{FAMILY.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14">
          {flagships.map((b, i) => (
            <Reveal key={b.slug} delay={i * 70}>
              <BrandRow brand={b} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-content px-5 pt-16 sm:px-8">
          <Reveal>
            <p className="label text-[0.62rem] text-pop">{FAMILY.workshopEyebrow}</p>
            <p className="mt-4 max-w-prose text-lg text-muted">{FAMILY.workshopIntro}</p>
          </Reveal>
        </div>
        <div className="mt-10 border-b border-ink/15">
          {workshop.map((b, i) => (
            <Reveal key={b.slug} delay={i * 70}>
              <BrandRow brand={b} index={flagships.length + i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- How we build ---------- */}
      <section id="how" className="mx-auto max-w-content scroll-mt-24 px-5 pt-28 sm:px-8">
        <Reveal>
          <p className="label text-[0.62rem] text-pop">How we build</p>
          <h2 className="display mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            The house rules
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.no} delay={i * 70}>
              <div className="border-t-2 border-ink pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="display text-lg font-bold text-pop">{v.no}</span>
                  <h3 className="display text-2xl font-bold uppercase tracking-tight">{v.title}</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Say hello ---------- */}
      <section className="mt-28 bg-ink text-paper">
        <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="display max-w-4xl text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-6xl">
              {CONTACT.heading}
              <span className="text-pop">.</span>
            </h2>
            <p className="mt-6 max-w-prose text-lg text-paper/60">{CONTACT.body}</p>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block border border-paper px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:border-pop hover:bg-pop"
            >
              Connect on LinkedIn
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
