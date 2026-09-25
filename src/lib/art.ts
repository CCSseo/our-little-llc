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
  "our-little-book-premium": "A black cloth storybook with an embossed moon and a red ribbon bookmark",
  "chorzle-premium": "A sculptural red wooden reward star on a black base",
  "carroll-consulting-premium": "A curved black sculpture carrying a single red sphere upward",
  "soong-premium": "A clear glass lightbulb with a red filament on a black base",
  "ladon-premium": "A small carved black dragon curled around a red apple",
  "story-premium": "Three little black wooden houses, one with a red arched front door",

  "home-premium": "A sculptural black wooden house with a red arched door on a white background",
  home: "A small black model house with a single red front door on a white background",
  logo: "A bold black house mark with one red arched front door",
  "our-little-book":
    "A hardcover children's book with ink-wash cover art and a red ribbon bookmark",
  chorzle: "A red star magnet on a minimalist black and white chore chart",
  "carroll-consulting": "A black ink line graph rising, with a red point at its peak",
  soong: "A glass lightbulb with a red glowing filament on a black background",
  ladon: "A black dragon sculpture coiled around a single red apple",
};
