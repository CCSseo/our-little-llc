import Link from "next/link";
import { FEED_SOURCES, formatFeedDate, readerPath, type FeedPost as Post } from "@/lib/feed/sources";

export function FeedPost({ post }: { post: Post }) {
  const source = FEED_SOURCES.find((entry) => entry.id === post.sourceId)!;
  return (
    <article className="feed-post">
      <div className="feed-post-meta"><span>{source.publication}</span><time dateTime={post.publishedAt}>{formatFeedDate(post.publishedAt)}</time></div>
      <h2 className="feed-post-title"><Link href={readerPath(post)}>{post.title}</Link></h2>
      <p className="feed-post-excerpt">{post.excerpt}</p>
      <div className="feed-post-bottom">
        {post.author ? <p className="feed-post-source">By {post.author}</p> : null}
        <div className="feed-post-actions">
          <Link className="feed-read-link" href={readerPath(post)}>Read Here <span aria-hidden>→</span></Link>
          <div className="feed-original-context"><a className="feed-original-link" href={post.url}>Read the Original <span aria-hidden>↗</span></a><p className="feed-post-source">Originally published at <a href={post.url}>{source.name}</a></p></div>
        </div>
      </div>
    </article>
  );
}
