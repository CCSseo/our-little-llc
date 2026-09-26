import type { Metadata } from "next";
import { FeedArchive } from "@/components/FeedArchive";
import { getFeed } from "@/lib/feed/get-feed";
import { FEED_SOURCES } from "@/lib/feed/sources";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Our Little Feed",
  description: "Good reads from across our little family. Original notes from Carroll Consulting, Chorzle’s The Buzz, and Our Little Book’s The Nook, gathered in one place.",
  alternates: { canonical: "/feed" },
};

export default async function FeedPage() {
  const { posts, savedSources } = await getFeed();
  return (
    <main id="main-content" className="shell feed-page">
      <header className="feed-intro">
        <p className="eyebrow">From across the family</p>
        <h1 className="page-title">Our Little Feed<span className="text-pop">.</span></h1>
        <p className="feed-lede">Good reads. Curious minds.<br />A little of what we’ve been sharing.</p>
        <p className="feed-intro-note">Notes from Carroll Consulting, Chorzle, and Our Little Book. Gathered here, with every story leading back to where it began.</p>
      </header>
      <FeedArchive posts={posts} />
      <aside className="feed-colophon" aria-label="About the original publications">
        <p className="eyebrow">Every story has a home.</p>
        <p>Read the original publications’ words here, shared with permission and full source credit. Every article also links to its original home, where authorship and the canonical version remain.</p>
        <div>{FEED_SOURCES.map((source) => <a className="text-link" key={source.id} href={source.url}>{source.name} <span aria-hidden>↗</span></a>)}</div>
        {savedSources.length ? <p className="feed-saved-note">Showing saved notes from {savedSources.map((id) => FEED_SOURCES.find((source) => source.id === id)!.name).join(" and ")}. Visit the original publications for their latest stories.</p> : null}
      </aside>
    </main>
  );
}
