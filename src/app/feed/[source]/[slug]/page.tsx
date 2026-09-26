import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getFeed } from "@/lib/feed/get-feed";
import { getSourceArticle } from "@/lib/feed/get-article";

import { FEED_SOURCES, formatFeedDate, readerPath } from "@/lib/feed/sources";

export const revalidate = 3600;
export const dynamicParams = true;
export function generateStaticParams() { return []; }

type Props = { params: { source: string; slug: string } };
const getReader = cache(async (source: string, slug: string) => {
  const { posts } = await getFeed();
  const post = posts.find((entry) => readerPath(entry) === `/feed/${source}/${slug}`);
  if (!post) notFound();
  const publication = FEED_SOURCES.find((entry) => entry.id === post.sourceId)!;
  try { return { post, publication, article: await getSourceArticle(post) }; }
  catch { return { post, publication, article: null }; }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post, publication, article } = await getReader(params.source, params.slug);
  return {
    title: { absolute: `${post.title} · ${publication.name} | Our Little Feed` },
    description: post.excerpt,
    alternates: { canonical: post.url },
    robots: { index: false, follow: true },
    authors: article?.author ? [{ name: article.author.name, url: article.author.url }] : [],
    creator: article?.author?.name || publication.name,
    publisher: article?.publisher.name || publication.name,
    openGraph: { title: post.title, description: post.excerpt, type: "article", url: post.url, siteName: publication.name, publishedTime: post.publishedAt, ...(article?.modifiedAt ? { modifiedTime: article.modifiedAt } : {}) },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function ReaderPage({ params }: Props) {
  const { post, publication, article } = await getReader(params.source, params.slug);
  const schema = article ? {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${post.url}#article`,
    url: post.url, mainEntityOfPage: post.url, isBasedOn: post.url, headline: post.title,
    description: post.excerpt, datePublished: post.publishedAt,
    ...(article.modifiedAt ? { dateModified: article.modifiedAt } : {}),
    ...(article.author ? { author: { "@type": article.author.type, name: article.author.name, url: article.author.url } } : {}),
    publisher: { "@type": article.publisher.type, name: article.publisher.name, url: article.publisher.url },
  } : null;
  return (
    <main id="main-content" className="shell reader-page">
      {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /> : null}
      <Link href="/feed" className="text-link">← Our Little Feed</Link>
      <article>
        <header className="reader-header">
          <p className="eyebrow">From {publication.publication}</p>
          <h1 className="page-title">{post.title}</h1>
          <p className="reader-excerpt">{post.excerpt}</p>
          <div className="reader-credit">
            <div><p>Originally published by <a href={post.url}>{publication.name}</a></p>
              {article?.author ? <p>By {article.author.url ? <a href={article.author.url}>{article.author.name}</a> : article.author.name}</p> : null}
              <p><time dateTime={post.publishedAt}>Published {formatFeedDate(post.publishedAt)}</time></p>
            </div>
            <a href={post.url} className="text-link">Read the Original <span aria-hidden>↗</span></a>
          </div>
          <p className="reader-permission">Republished with permission from {article?.publisher.name || publication.name}. Original authorship and publication credit are preserved; Our Little Company provides this reading view.</p>
        </header>
        {article ? <div className="reader-body" dangerouslySetInnerHTML={{ __html: article.html }} /> : <div className="reader-unavailable"><h2>This story is at its original home.</h2><p>We couldn’t load the full article here just now. You can still read it at {publication.name}.</p><a className="text-link" href={post.url}>Read the Original <span aria-hidden>↗</span></a></div>}
        <footer className="reader-footer"><p>Originally published by {publication.name}{article?.author ? ` · ${article.author.name}` : ""}.</p><a href={post.url} className="text-link">Read the Original <span aria-hidden>↗</span></a></footer>
      </article>
    </main>
  );
}
