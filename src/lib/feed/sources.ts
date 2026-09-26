export const FEED_SOURCES = [
  { id: "ccs", name: "Carroll Consulting", publication: "Insights", url: "https://carrollconsultingservices.com/blog", feed: "https://carrollconsultingservices.com/feed.xml", host: "carrollconsultingservices.com", articlePath: "/blog/" },
  { id: "chorzle", name: "Chorzle", publication: "The Buzz", url: "https://chorzle.com/buzz", feed: "https://chorzle.com/buzz/rss.xml", host: "chorzle.com", articlePath: "/buzz/" },
  { id: "olb", name: "Our Little Book", publication: "The Nook", url: "https://ourlittlebook.com/nook", feed: "https://ourlittlebook.com/nook/feed.xml", host: "ourlittlebook.com", articlePath: "/nook/" },
] as const;
export type FeedSource = (typeof FEED_SOURCES)[number];
export type FeedSourceId = FeedSource["id"];
export type FeedPost = {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  author?: string;
  sourceId: FeedSourceId;
};
export function formatFeedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export function readerPath(post: FeedPost) {
  const source = FEED_SOURCES.find((entry) => entry.id === post.sourceId)!;
  return `/feed/${post.sourceId}/${new URL(post.url).pathname.slice(source.articlePath.length)}`;
}
