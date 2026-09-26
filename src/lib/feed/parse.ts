import { XMLParser, XMLValidator } from "fast-xml-parser";
import type { FeedPost, FeedSource } from "./sources";

function text(value: unknown): string {
  return typeof value === "string" ? value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]*>/g, "").trim() : "";
}

export function parseFeed(xml: string, source: FeedSource): FeedPost[] {
  if (xml.length > 2_000_000 || /<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) {
    throw new Error(`Invalid feed from ${source.id}`);
  }
  const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, htmlEntities: true, isArray: (name) => name === "item" });
  const items: unknown = parser.parse(xml)?.rss?.channel?.item;
  if (!Array.isArray(items)) throw new Error(`Missing RSS items from ${source.id}`);
  const seen = new Set<string>();
  const posts: FeedPost[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const title = text(item.title);
    const excerpt = text(item.description);
    const date = new Date(text(item.pubDate));
    let url: URL;
    try { url = new URL(text(item.link)); } catch { continue; }
    // Feed permalinks remain the source of truth; never create local article copies.
    if (url.protocol !== "https:" || url.hostname !== source.host || url.username || url.password || url.port || !url.pathname.startsWith(source.articlePath) || url.search || url.hash) continue;
    if (!title || !excerpt || Number.isNaN(date.valueOf()) || seen.has(url.href)) continue;
    seen.add(url.href);
    const author = text(item["dc:creator"]) || text(item.author);
    posts.push({ title, excerpt, url: url.href, publishedAt: date.toISOString(), sourceId: source.id, ...(author ? { author } : {}) });
  }
  if (!posts.length) throw new Error(`No usable articles from ${source.id}`);
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
