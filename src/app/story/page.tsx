import type { Metadata } from "next";
import Link from "next/link";
import { STORY, SITE } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "Why Our Little Company LLC exists: one honest roof for the family's home-grown passion projects, every one built from the ground up in-house.",
  alternates: { canonical: `${SITE.url}/story` },
};

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-content px-5 pt-20 sm:px-8 sm:pt-28">
      <p className="label text-[0.62rem] text-pop">{STORY.eyebrow}</p>
      <h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold uppercase leading-[0.98] tracking-tight">
        {STORY.heading.replace(/\?$/, "")}
        <span className="text-pop">?</span>
      </h1>
      <div className="mt-12 max-w-prose space-y-8 text-xl leading-relaxed text-ink/80">
        {STORY.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 60}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14">
        <Link
          href="/#family"
          className="inline-block bg-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-pop"
        >
          Meet the family
        </Link>
      </Reveal>
    </main>
  );
}
