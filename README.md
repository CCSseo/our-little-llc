# Our Little Company LLC — public site

The public home of **Our Little Company LLC**, the family holding company for
Joseph Carroll's current and future passion projects, at **ourlittlellc.com**.
It presents every brand as exactly what it is: home grown and built from the
ground up, in-house. Nothing acquired, nothing white-labeled, nothing off the
shelf.

This is its own standalone repo, **`CCSseo/our-little-llc`** (extracted from
the `ccs-workspace` monorepo on 2026-07-27), and it follows the same
architecture as `carroll-site` in `ccs-workspace`: **fully static, no auth, no
database, no vault dependency**. All copy is hand-written in
`src/lib/content.ts`.

## The family it presents

Three flagship brands, then two "workshop" projects:

| Brand | Status shown | Link shown |
| --- | --- | --- |
| Our Little Book | LIVE | ourlittlebook.com |
| Chorzle | LIVE | chorzle.com |
| Carroll Consulting | ACTIVE / NOT TAKING NEW CLIENTS | carrollconsultingservices.com |
| SOONG | LIVE | meetsoong.com |
| Ladon | LIVE / PRIVATE | none, on purpose |

## Privacy and voice rules (inherited from `carroll-site`, kept identical)

- Never say "AI" and never name any AI tool or vendor.
- No direct email address anywhere; reach is LinkedIn or a warm introduction.
- **Ladon** is shown vendor-free and with no link. Broker, data-feed, and other
  vendor specifics stay private, as does its prior "Money Me" name.
- The invite-only Source of Truth site and the private Personal Assistant
  Portal are **not** shown or named.
- No invented facts: no fake dates, metrics, revenue, or user counts. What is
  live is called live; what is private is called private.

## The look

High-end minimalist: black, white, and one red (`#e10600`) as the only pop
color. Large type on purpose (18px base, oversized uppercase Archivo display
headings, Inter body), hairline rules instead of cards, an editorial index of
brands whose rows invert to black on hover, and a tiny line-drawn house mark
rendered as pure SVG with the one red door. Zero external image assets;
motion respects `prefers-reduced-motion`, and scroll reveals fail open
without JS.

Tokens live in `tailwind.config.ts` + `src/app/globals.css`. There are no
per-brand colors: every brand is black/white with the shared red.

## Pages

Every route is statically rendered:

- `/` — hero, the standing promise strip (black band), the family (editorial
  index rows), the house rules (values), and a say-hello section (LinkedIn
  only).
- `/story` — why a holding company for little things exists.
- `/brands/[slug]` — a dedicated landing page per brand: oversized name, a
  facts row (status / origin / home), the story, what was built in-house, and
  previous/next navigation through the family.
- `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`,
  `not-found.tsx` — the SEO and polish plumbing, all generated in code.

JSON-LD in `app/layout.tsx` declares the `Organization` with each brand as a
`subOrganization`, plus `Person` and `WebSite` nodes.

## The logo

The official logo is the hand-drawn little house with the one red door, kept
as a font-free SVG suite in `public/brand/`: `logo-mark.svg` /
`logo-mark-inverse.svg` (mark only, crisp at any size), the horizontal
`logo-lockup.svg` / `logo-lockup-inverse.svg`, and 1024px PNG renders of both
marks. The favicon and the in-site `Wordmark.tsx` component draw the same
house.

## Optional: Grok-generated supporting art

Each page can carry one piece of supporting art in the site's art direction
(minimalist black and white, one red accent, no text): a hero image for the
home page, one image per brand landing page, and a rendered logo exploration.
The site is complete without them; each page picks its image up automatically
at build time once the file exists in `public/art/` (see `src/lib/art.ts`).

Two ways to generate them with xAI's Grok image model:

- **GitHub Actions (no local setup):** run the **"Generate Our Little Company
  art"** workflow from the repo's Actions tab (it uses the existing
  `XAI_API_KEY` repo secret, generates every missing image, and commits them
  to the branch you ran it on).
- **Locally:**

  ```bash
  # put your key in .env.local at the repo root  ->  XAI_API_KEY=xai-...
  npm run generate:art                    # all subjects (skips existing)
  npm run generate:art -- --only=chorzle  # one subject
  npm run generate:art -- --force         # regenerate everything
  ```

Prompts live in `scripts/generate-art.mjs`. Commit the resulting
`public/art/` files so Vercel deploys them.

## Local development

```bash
npm install
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

## Deploying to Vercel

- **Root directory:** the repo root (its own Vercel project, separate from
  `carroll-site` and `knowledge-site`)
- **Framework preset:** Next.js (auto-detected)
- **Environment variables:** `NEXT_PUBLIC_SITE_URL=https://ourlittlellc.com`
- **Custom domain:** `ourlittlellc.com` (apex) + `www` redirect.

## Layout

```
src/
  app/
    layout.tsx              # metadata/OG, JSON-LD (Organization + subOrganization)
    page.tsx                # home: hero, promise strip, family, house rules, hello
    story/page.tsx          # the holding-company story
    brands/[slug]/page.tsx  # one page per brand, generated from content.ts
    opengraph-image.tsx     # generated social card, no external assets
    sitemap.ts robots.ts manifest.ts not-found.tsx
    globals.css             # the warm-paper design system
  components/
    Nav.tsx Footer.tsx      # sticky nav (mobile drawer), black family footer
    BrandRow.tsx            # editorial index rows on the home page
    Wordmark.tsx            # the line-drawn house mark + wordmark (pure SVG)
    Reveal.tsx              # one-shot scroll reveal, fails open without JS
  lib/
    content.ts              # ALL site copy + brand data, single source of truth
```

Everything the visitor sees is hand-authored and public by design.
