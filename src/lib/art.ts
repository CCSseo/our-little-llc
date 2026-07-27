import { existsSync } from "node:fs";
import { resolve } from "node:path";

// Build-time lookup for the optional Grok-generated art in public/art/
// (created by scripts/generate-art.mjs). Every page renders fine without it;
// when a file exists the page picks it up automatically on the next build.
// Server components only.
const EXTS = ["jpg", "png", "webp"] as const;

export function getArt(name: string): string | null {
  for (const ext of EXTS) {
    if (existsSync(resolve(process.cwd(), "public/art", `${name}.${ext}`))) {
      return `/art/${name}.${ext}`;
    }
  }
  return null;
}

// Alt text for each piece, matching the prompts in scripts/generate-art.mjs.
export const ART_ALT: Record<string, string> = {
  home: "A small black model house with a single red front door on a white background",
  "our-little-book":
    "A hardcover children's book with ink-wash cover art and a red ribbon bookmark",
  chorzle: "A red star magnet on a minimalist black and white chore chart",
  "carroll-consulting": "A black ink line graph rising, with a red point at its peak",
  soong: "A glass lightbulb with a red glowing filament on a black background",
  ladon: "A black dragon sculpture coiled around a single red apple",
};
