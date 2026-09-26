import { ArrowIcon } from "@/components/ArrowIcon";
import type { Metadata } from "next";
import { STORY, SITE } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Artwork } from "@/components/Artwork";

export const metadata: Metadata = {
  title: "Our story",
  description: "Why Our Little Company exists: a parent company for a family of fun, home-grown things.",
  alternates: { canonical: `${SITE.url}/story` },
};

export default function StoryPage() {
  return (
    <main id="main-content">
      <section className="shell story-hero page-space">
        <div>
          <p className="eyebrow">{STORY.eyebrow}</p>
          <h1 className="page-title story-title">Little is<br />the point<span className="text-pop">.</span></h1>
          <p className="story-lede">{STORY.intro}</p>
        </div>
        <Artwork name="story-premium" className="story-hero-art" priority />
      </section>
      <section className="shell story-chapters">
        {STORY.chapters.map((chapter, i) => (
          <Reveal className="story-chapter" key={chapter.title}>
            <span className="chapter-number" aria-hidden>{String(i + 1).padStart(2,"0")}</span>
            <h2>{chapter.title}</h2>
            <p>{chapter.body}</p>
          </Reveal>
        ))}
      </section>
      <section className="shell story-outro">
        <p className="eyebrow">And that brings us here</p>
        <h2 className="section-title">Good things.<br />Made from the ground up.</h2>
        <a href="/#family" className="button button-dark">Meet the family <ArrowIcon direction="up-right" /></a>
      </section>
    </main>
  );
}
