#!/usr/bin/env node
/**
 * Generate the site's supporting art with xAI's Grok image model and save it to
 * public/art/. The site is complete without it (the minimalist type carries the
 * look); each image is a progressive enhancement that appears automatically
 * once the file exists (see src/lib/art.ts).
 *
 * Art direction matches the site: minimalist black and white with ONE red
 * accent, generous negative space, premium editorial feel, never any text.
 *
 * Usage:
 *   npm run generate:art                    # all subjects (skips existing)
 *   npm run generate:art -- --only=chorzle  # one subject
 *   npm run generate:art -- --force         # regenerate even if present
 *
 * Needs XAI_API_KEY (in .env.local or the environment). Get one at
 * https://console.x.ai . The key is never written into the repo.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const OUT_DIR = resolve(ROOT, "public/art");

// ---- tiny .env.local loader (no dependency) ----
async function loadEnvLocal() {
  const p = resolve(ROOT, ".env.local");
  if (!existsSync(p)) return;
  const text = await readFile(p, "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = val;
  }
}

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
const FORCE = process.argv.includes("--force");

// The shared art direction, appended to every prompt.
const STYLE =
  "Ultra minimalist fine-art photography style. Strictly black and white monochrome with exactly ONE object or detail in vivid red (#e10600) as the only color. Huge negative space, clean studio lighting, high contrast, premium editorial look like a luxury brand campaign. Absolutely no text, no letters, no watermark, no signature.";

// One image per page (file names match brand slugs; src/lib/art.ts maps them),
// plus "logo": a rendered brand-mark exploration. The OFFICIAL logo is the
// hand-drawn SVG suite in public/brand/ (crisp at any size, font-free); the
// Grok version is an artistic alternative to consider, not the source of truth.
const SUBJECTS = {
  logo: `Professional brand identity logo mark, flat vector style, for a high-end family holding company. A bold solid black geometric house silhouette with a pitched roof and a small chimney, reduced to its most elegant minimal form like a world-class design studio would draw it, with one small vivid red arched front door as the only color. Perfectly centered on a plain white background, balanced negative space, crisp edges, timeless, iconic, instantly memorable. Flat 2D graphic design, not a photograph, no gradients, no shadows, no text.`,
  home: `A tiny simple house model in matte black sitting alone on a vast white seamless studio background, photographed straight on. The house has one small vivid red front door, the only color in the frame. ${STYLE}`,
  "our-little-book": `A single closed hardcover children's book standing upright on a vast white seamless background, black ink-wash brush art on its cover, with one thin vivid red ribbon bookmark trailing out of the pages, the only color in the frame. ${STYLE}`,
  chorzle: `One small vivid red star-shaped magnet placed on an otherwise empty matte black chore chart grid drawn in thin white lines, photographed straight on with vast negative space around it, the red star the only color in the frame. ${STYLE}`,
  "carroll-consulting": `A single elegant black line graph drawn in ink rising steadily across a vast white background, with one small vivid red point marking its peak, the only color in the frame. ${STYLE}`,
  soong: `A single bare glass lightbulb floating centered over a vast black background, its delicate filament glowing vivid red, the only color in the frame. ${STYLE}`,
  ladon: `A sleek minimalist black dragon sculpture coiled protectively around one single vivid red apple on a vast white seamless background, the apple the only color in the frame. ${STYLE}`,
};

async function generateOne(key, model, name, prompt) {
  const existing = ["jpg", "png", "webp"].find((e) => existsSync(resolve(OUT_DIR, `${name}.${e}`)));
  if (existing && !FORCE) {
    console.log(`  ▹ ${name}: exists (${existing}), skipping. Use --force to regenerate.`);
    return;
  }

  console.log(`  ▸ ${name}: generating…`);
  const res = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    // grok image models support: model, prompt, n, response_format (NOT size/quality/style)
    body: JSON.stringify({ model, prompt, n: 1, response_format: "b64_json" }),
  });
  if (!res.ok) {
    throw new Error(`xAI API error ${res.status} for ${name}: ${(await res.text()).slice(0, 300)}`);
  }

  const json = await res.json();
  const item = json?.data?.[0];
  if (!item) throw new Error(`Unexpected response shape for ${name}`);

  let bytes;
  let mime = item.mime_type || "image/jpeg";
  if (item.b64_json) {
    bytes = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const img = await fetch(item.url);
    bytes = Buffer.from(await img.arrayBuffer());
    mime = img.headers.get("content-type") || mime;
  } else {
    throw new Error(`Response for ${name} had neither b64_json nor url`);
  }

  const ext = mime.includes("jpeg") ? "jpg" : mime.includes("webp") ? "webp" : "png";
  await writeFile(resolve(OUT_DIR, `${name}.${ext}`), bytes);
  console.log(`  ✓ ${name}: saved ${bytes.length.toLocaleString()} bytes → public/art/${name}.${ext}`);
}

async function main() {
  await loadEnvLocal();

  const key = process.env.XAI_API_KEY;
  if (!key) {
    console.error(
      "\n  ✗ No XAI_API_KEY found.\n    Add it to .env.local at the repo root:  XAI_API_KEY=xai-...\n    Get a key at https://console.x.ai\n",
    );
    process.exit(1);
  }

  const model = arg("model", process.env.XAI_IMAGE_MODEL || "grok-imagine-image-quality");
  const only = arg("only", "");
  const names = only ? [only] : Object.keys(SUBJECTS);

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`\n  model: ${model}\n`);

  let failed = 0;
  for (const name of names) {
    const prompt = SUBJECTS[name];
    if (!prompt) {
      console.error(`  ✗ Unknown subject "${name}". Known: ${Object.keys(SUBJECTS).join(", ")}`);
      process.exit(1);
    }
    try {
      await generateOne(key, model, name, prompt);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${name}: ${err?.message || err}`);
    }
  }

  console.log("");
  if (failed) {
    console.error(`  ✗ ${failed} image(s) failed; re-run to retry (existing ones are skipped).\n`);
    process.exit(1);
  }
  console.log("  ✓ All art present. Rebuild the site to see it.\n");
}

main().catch((err) => {
  console.error("\n  ✗ generate-art failed:", err?.message || err, "\n");
  process.exit(1);
});
