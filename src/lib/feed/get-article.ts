import { unstable_cache } from "next/cache";
import { parseArticle } from "./article";
import { FEED_SOURCES, type FeedPost } from "./sources";

// Only call with a post found in the validated feed; route parameters never become fetch URLs.
export const getSourceArticle = unstable_cache(async (post: FeedPost) => {
  const source = FEED_SOURCES.find((entry) => entry.id === post.sourceId)!;
  const response = await fetch(post.url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Original article unavailable (${response.status})`);
  return parseArticle(await response.text(), post, source);
}, ["our-little-feed-reader-v1"], { revalidate: 3600 });
