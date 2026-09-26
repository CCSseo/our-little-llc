import { ArrowIcon } from "@/components/ArrowIcon";
import { BRANDS, CONTACT, FAMILY, HERO, SITE, VALUES } from "@/lib/content";
import { BrandRow } from "@/components/BrandRow";
import { Reveal } from "@/components/Reveal";
import { HouseMark } from "@/components/Wordmark";
import { Artwork } from "@/components/Artwork";
import { FEED_SOURCES } from "@/lib/feed/sources";
import { getFeed } from "@/lib/feed/get-feed";
import { FeedPost } from "@/components/FeedPost";
import { PromiseStrip } from "@/components/PromiseStrip";

export const revalidate = 3600;

export default async function HomePage() {
  const { posts } = await getFeed();
  const latestFromEach = FEED_SOURCES.flatMap((source) => posts.find((post) => post.sourceId === source.id) ?? []).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const flagships = BRANDS.filter((b) => b.flagship);
  const workshop = BRANDS.filter((b) => !b.flagship);

  return (
    <main id="main-content">
      <section className="shell home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="hero-title">
            {HERO.lines.map((line, i) => (
              <span key={line} className={i === HERO.lines.length - 1 ? "text-pop" : ""}>{line}{" "}</span>
            ))}
          </h1>
          <p className="hero-intro">{HERO.sub}</p>
          <div className="hero-actions">
            <a href="#family" className="button button-dark">Meet the family <ArrowIcon direction="down-right" /></a>
            <a href="/story" className="text-link">Our story <ArrowIcon direction="up-right" /></a>
          </div>
        </div>
        <figure className="hero-figure">
          <Artwork name="home-premium" className="hero-art" priority />
          <figcaption>{HERO.caption}</figcaption>
        </figure>
      </section>

      <PromiseStrip />

      <section id="family" className="shell section-space anchor-section">
        <Reveal className="section-intro">
          <div><p className="eyebrow">{FAMILY.eyebrow}</p><h2 className="section-title">{FAMILY.heading}</h2></div>
          <p className="section-description">{FAMILY.intro}</p>
        </Reveal>
        <div className="brand-index">
          {flagships.map((brand, i) => <Reveal key={brand.slug}><BrandRow brand={brand} index={i} /></Reveal>)}
        </div>
        <Reveal className="workshop-intro">
          <h3 className="eyebrow">{FAMILY.workshopEyebrow}</h3>
          <p className="section-description">{FAMILY.workshopIntro}</p>
        </Reveal>
        <div className="brand-index workshop-index">
          {workshop.map((brand, i) => <Reveal key={brand.slug}><BrandRow brand={brand} index={flagships.length + i} /></Reveal>)}
        </div>
      </section>

      <section id="how" className="house-rules anchor-section">
        <div className="shell section-space">
          <Reveal className="rules-intro"><p className="eyebrow">How we build</p><h2 className="section-title">The house rules<span className="text-pop">.</span></h2></Reveal>
          <div className="rules-grid">
            {VALUES.map((v) => (
              <Reveal key={v.no}>
                <div className="rule"><span className="rule-number" aria-hidden>{v.no}</span><h3>{v.title}</h3><p>{v.body}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space home-feed" aria-labelledby="feed-heading">
        <div className="section-intro">
          <div><p className="eyebrow">A little something to read</p><h2 id="feed-heading" className="section-title">Our Little Feed.</h2></div>
          <p className="section-description">Fresh notes from across the family, with a link back to every original.</p>
        </div>
        <div className="feed-grid">{latestFromEach.map((post) => <FeedPost key={post.url} post={post} />)}</div>
        <a href="/feed" className="text-link">Explore the feed <ArrowIcon direction="up-right" /></a>
      </section>

      <section className="contact-section">
        <div className="shell contact-inner">
          <Reveal>
            <p className="eyebrow text-paper/70">The front door</p>
            <h2 className="section-title">{CONTACT.heading}<span className="text-pop">.</span></h2>
            <p className="contact-copy">{CONTACT.body}</p>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="button button-light">Connect on LinkedIn <ArrowIcon direction="up-right" /></a>
          </Reveal>
          <HouseMark className="contact-house" />
        </div>
      </section>
    </main>
  );
}
