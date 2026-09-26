import { unstable_cache } from "next/cache";
import { FEED_SOURCES, type FeedPost, type FeedSourceId } from "./sources";
import { parseFeed } from "./parse";
import savedPosts from "./snapshot.json";

// Cache sources separately so an unavailable publisher cannot block the other two.
const getSourcePosts = unstable_cache(async (id: FeedSourceId) => {
  const source = FEED_SOURCES.find((entry) => entry.id === id)!;
  const response = await fetch(source.feed, { headers: { Accept: "application/rss+xml, application/xml, text/xml;q=0.9" }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Feed ${id} returned ${response.status}`);
  return parseFeed(await response.text(), source);
}, ["our-little-feed-v2"], { revalidate: 3600 });

export async function getFeed(): Promise<{ posts: FeedPost[]; savedSources: FeedSourceId[] }> {
  const results = await Promise.allSettled(FEED_SOURCES.map((source) => getSourcePosts(source.id)));
  const savedSources: FeedSourceId[] = [];
  const posts = results.flatMap((result, index) => {
    if (result.status === "fulfilled") return result.value;
    const source = FEED_SOURCES[index];
    savedSources.push(source.id);
    console.warn(`Our Little Feed: using saved excerpts for ${source.id}`, result.reason instanceof Error ? result.reason.message : "Feed unavailable");
    return (savedPosts.posts as FeedPost[]).filter((post) => post.sourceId === source.id);
  });
  return { posts: posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), savedSources };
}
