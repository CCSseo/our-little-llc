"use client";

import { ArrowIcon } from "@/components/ArrowIcon";

import { useState } from "react";
import { FeedPost } from "./FeedPost";
import { FEED_SOURCES, type FeedPost as Post, type FeedSourceId } from "@/lib/feed/sources";

export function FeedArchive({ posts }: { posts: Post[] }) {
  const [source, setSource] = useState<FeedSourceId | "all">("all");
  const [sort, setSort] = useState("newest");
  const [visible, setVisible] = useState(9);
  const filtered = (source === "all" ? [...posts] : posts.filter((post) => post.sourceId === source)).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : sort === "oldest" ? a.publishedAt.localeCompare(b.publishedAt) : b.publishedAt.localeCompare(a.publishedAt));
  const choices = [{ id: "all" as const, name: "All" }, ...FEED_SOURCES];
  return (
    <>
      <div className="feed-toolbar">
        <div className="feed-filters" role="group" aria-label="Filter by original publication">
          {choices.map((choice) => <button key={choice.id} type="button" aria-pressed={source === choice.id} onClick={() => { setSource(choice.id); setVisible(9); }}>{choice.name}</button>)}
        </div>
        <label className="feed-sort">Sort
          <select value={sort} onChange={(event) => { setSort(event.target.value); setVisible(9); }}>
            <option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option>
          </select>
        </label>
      </div>
      <p className="feed-count" aria-live="polite">{filtered.length} notes{source !== "all" ? ` from ${FEED_SOURCES.find((entry) => entry.id === source)!.name}` : " from across the family"}</p>
      <div className="feed-grid" id="feed-results">
        {filtered.slice(0, visible).map((post) => <FeedPost key={post.url} post={post} />)}
      </div>
      {visible < filtered.length ? <div className="feed-more"><button type="button" className="button button-dark" onClick={() => setVisible((count) => count + 9)} aria-controls="feed-results">A little more reading <ArrowIcon direction="down" /></button><p aria-live="polite">Showing {Math.min(visible, filtered.length)} of {filtered.length} notes</p></div> : null}
    </>
  );
}
