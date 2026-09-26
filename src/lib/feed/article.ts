import { load } from "cheerio";
import sanitizeHtml from "sanitize-html";
import type { FeedPost, FeedSource } from "./sources";

export type ArticleCredit = { name: string; type: "Person" | "Organization"; url?: string };
export type SourceArticle = { html: string; canonical: string; author?: ArticleCredit; publisher: ArticleCredit; modifiedAt?: string };

function safeUrl(value: unknown, base: string): string | undefined {
  if (typeof value !== "string") return;
  try { const url = new URL(value, base); if (url.protocol === "https:") return url.href; } catch { /* omit unusable source links */ }
}

export function parseArticle(html: string, post: FeedPost, source: FeedSource): SourceArticle {
  if (html.length > 3_000_000) throw new Error("Article is too large");
  const $ = load(html);
  const canonical = safeUrl($("link[rel='canonical']").attr("href"), post.url);
  if (canonical !== post.url) throw new Error("Source canonical no longer matches the feed permalink");
  const article = $("main article").first();
  if (!article.length || article.find("h1").first().text().trim() !== post.title) throw new Error("Source article identity changed");
  const body = source.id === "ccs" ? article.find(".prose-post").first() : article.children("section").eq(2).children("div").first();
  if (!body.length || body.find("p").length < 2 || body.text().trim().length < 200) throw new Error("Source article body unavailable");

  const nodes: Record<string, unknown>[] = [];
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const data = JSON.parse($(element).text());
      for (const node of (Array.isArray(data) ? data : data["@graph"] || [data])) {
        if (node && typeof node === "object") nodes.push(node);
      }
    } catch { /* A broken unrelated metadata block cannot invent a byline. */ }
  });
  const schema = nodes.find((node) => node["@type"] === "BlogPosting" || node["@type"] === "Article");
  function credit(value: unknown): ArticleCredit | undefined {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const reference = value as Record<string, unknown>;
    const resolved = reference.name ? reference : nodes.find((node) => node["@id"] === reference["@id"]);
    if (!resolved || typeof resolved.name !== "string" || !["Person", "Organization"].includes(String(resolved["@type"]))) return;
    return { name: resolved.name, type: resolved["@type"] as ArticleCredit["type"], ...(safeUrl(resolved.url, post.url) ? { url: safeUrl(resolved.url, post.url) } : {}) };
  }
  const author = credit(schema?.author);
  const publisher = credit(schema?.publisher) ?? { name: source.name, type: "Organization" as const, url: `https://${source.host}` };
  const modified = typeof schema?.dateModified === "string" ? new Date(schema.dateModified) : undefined;
  const clean = sanitizeHtml(body.html() || "", {
    allowedTags: ["p", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "figure", "figcaption", "img", "strong", "b", "em", "i", "a", "br", "hr", "pre", "code", "table", "thead", "tbody", "tr", "th", "td", "sup", "sub"],
    allowedAttributes: { a: ["href", "title", "rel"], img: ["src", "alt", "width", "height", "loading"], th: ["scope"], td: ["colspan", "rowspan"] },
    allowedSchemes: ["https"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_, attrs) => ({ tagName: "a", attribs: { ...(safeUrl(attrs.href, post.url) ? { href: safeUrl(attrs.href, post.url)! } : {}), ...(attrs.title ? { title: attrs.title } : {}), rel: "noopener noreferrer" } }),
      img: (_, attrs) => ({ tagName: "img", attribs: { ...(safeUrl(attrs.src, post.url) ? { src: safeUrl(attrs.src, post.url)! } : {}), alt: attrs.alt || "", loading: "lazy" } }),
    },
  });
  return { html: clean, canonical, author, publisher, ...(modified && Number.isFinite(modified.valueOf()) ? { modifiedAt: modified.toISOString() } : {}) };
}

