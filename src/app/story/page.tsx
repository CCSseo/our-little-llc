import type { Metadata } from "next";
import Link from "next/link";
import { STORY, SITE } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ART_ALT, getArt } from "@/lib/art";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "Why Our Little Company LLC exists: one honest roof for the family's home-grown passion projects, every one built from the ground up in-house.",
  alternates: { canonical: `${SITE.url}/story` },
};

export default function StoryPage() {
  const art = getArt("logo");
  return (
    <main className="mx-auto max-w-content px-5 pt-20 sm:px-8 sm:pt-28">
      <p className="label text-[0.8rem] text-pop">{STORY.eyebrow}</p>
      <h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold uppercase leading-[0.98] tracking-tight">
        {STORY.heading.replace(/\?$/, "")}
        <span className="text-pop">?</span>
      </h1>
      <div className={art ? "mt-12 xl:grid xl:grid-cols-[minmax(0,46rem)_1fr] xl:gap-16" : "mt-12"}>
        <div className="max-w-prose space-y-8 text-xl leading-relaxed text-ink/80">
          {STORY.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        {art && (
          <Reveal className="mt-12 xl:mt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={art}
              alt={ART_ALT.logo}
              className="mx-auto w-56 xl:sticky xl:top-32 xl:mx-0 xl:w-full xl:max-w-sm"
            />
          </Reveal>
        )}
      </div>
      <Reveal className="mt-14">
        <Link
          href="/#family"
          className="inline-block bg-ink px-8 py-4 text-base font-bold uppercase tracking-widest text-paper transition-colors hover:bg-pop"
        >
          Meet the family
        </Link>
      </Reveal>
    </main>
  );
}
