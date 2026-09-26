# Our Little Company LLC — public site

The public home of **Our Little Company LLC**, the family holding company for
Joseph Carroll's current and future passion projects, at **ourlittlellc.com**.
It presents every brand as exactly what it is: home grown and built from the
ground up, in-house. Nothing acquired, nothing white-labeled, nothing off the
shelf.

This is its own standalone repo, **`CCSseo/our-little-llc`** (extracted from
the `ccs-workspace` monorepo on 2026-07-27), and it follows the same
architecture as `carroll-site` in `ccs-workspace`: **prerendered, no auth, no
database, no vault dependency**. Our Little Feed and its home-page preview refresh
from public RSS with hourly revalidation. Original site copy lives in
`src/lib/content.ts`; syndicated titles and excerpts retain their publishers’ words.

## The family it presents

Three flagship brands, then two "workshop" projects:

| Brand | Focus | External destination |
| --- | --- | --- |
| Our Little Book | Storybooks | ourlittlebook.com |
| Chorzle | Family life | chorzle.com |
| Carroll Consulting | Consulting | carrollconsultingservices.com |
| SOONG | Curiosity and exploration | None |
| Ladon | Decision tools | None |

Joseph's September 25 direction supersedes the previous activity badges:
remove stale Live claims, do not advertise inactive status, and tell the
story of what went into each build and what it taught us. SOONG and Ladon
are presented as workshop case studies with no external product CTA.

## Privacy and voice rules (inherited from `carroll-site`, kept identical)

- Original OLC copy never says "AI" or names an AI tool or vendor. Joseph explicitly
  authorized faithful RSS syndication on September 25: source titles and excerpts
  are preserved, including terms the original publications use. Do not rewrite
  source articles to fit the OLC voice.
- No direct email address anywhere; reach is LinkedIn or a warm introduction.
- **Ladon** is shown vendor-free and with no link. Broker, data-feed, and other
  vendor specifics stay private, as does its prior "Money Me" name.
- The invite-only Source of Truth site and the private Personal Assistant
  Portal are **not** shown or named.
- No invented facts: no fake dates, metrics, revenue, or user counts. Workshop
  stories describe the craft and lessons without claims about current operation.

## The design direction

**Simple and premium. A parent company for a lot of fun things.** This is
Joseph's direction from September 25, 2026. The site introduces a family of
things people can enjoy and use, with a warm, personal voice.

Black, white, and one red (`#e10600`) remain the identity. Sentence-case
Archivo headings, Inter body type, generous space, and fine rules create a
quiet editorial layout. Use the refined house symbol with its red arched door and stacked lowercase wordmark.
Avoid card grids, decorative badges, heavy hover inversions, and dense
uppercase copy. The primary introduction and action belong before the hero
art on a phone.

Keep supporting text at least 13.5px and body copy at least 18px, with clear
contrast, comfortable line height, and visible keyboard focus. Assume an
older reader on a phone. The mobile menu works as a native disclosure with full-width numbered rows and
a Menu/Close control. It closes on navigation, outside taps, focus leaving the
menu, desktop resizing and Escape, restoring focus on Escape. Reveals are
visible by default, including when JavaScript fails; reduced motion removes
animation.

The September 25 pass covers the home page, all five company pages, the
story, navigation, footer, and social card. Public legal names remain in place. Each company page has a considered
introduction, a making section, and a lesson from the build. External visit
buttons appear only for the three flagships. Workshop pages lead into the
build story. The story page has its own illustrated introduction and three
short chapters.

Seven new images form a coordinated editorial set in `public/art/*-premium.jpg`:
a black wooden house for home, a family of houses for the story, and a
storybook, reward star, rising sculpture, lightbulb, and dragon for the
companies. They share a white backdrop, tactile materials, and one red
accent. Existing originals remain available but are not shown in the index.
`Artwork.tsx` reserves image space and provides accessible descriptions.

The promise strip scrolls continuously through twelve distinct phrases, inspired
by the CCS site. Each cycle stays wider than the viewport with a phrase-length
buffer, so even wide desktops never show the same phrase twice at once. It pauses
on hover and has a keyboard-accessible pause/play control; reduced motion
uses a static wrapping line. The house caption has no red bullet.

Tokens live in `tailwind.config.ts` and `src/app/globals.css`; shared page
spacing, buttons, rows, and reading widths live in the stylesheet. There
are no per-company accent colors.

## Pages

Routes are prerendered; the home page and `/feed` revalidate hourly:

- `/` — hero, a fine-rule promise strip, the company index, house rules, and a
  say-hello section (LinkedIn only).
- `/story` — why a holding company for little things exists.
- `/feed` — Our Little Feed: original excerpts from Carroll Consulting, Chorzle
  and Our Little Book, with source filters and newest/oldest/title sorting.
- `/brands/[slug]` — a dedicated landing page per brand: name and visit link, a
  facts row (company or project / focus / made here), the story, build lessons, and
  previous/next navigation through the family.
- `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`,
  `not-found.tsx` — the SEO and polish plumbing, all generated in code.

JSON-LD in `app/layout.tsx` declares the `Organization` with each brand as a
`subOrganization`, plus `Person` and `WebSite` nodes.

## The logo

The identity is a simple house with a soft roof peak and a red arched door,
paired with the lowercase two-line wordmark. It is shared by the navigation,
footer, social card, favicon, and home-screen icon. The mark uses pure SVG
paths and scales cleanly to small sizes. SVG light and inverse marks and
lockups, plus 1024px PNG marks, live in `public/brand/`. Lockup SVG text uses
Archivo with system sans-serif fallbacks. The favicon has a 32px PNG fallback
and a 180px Apple touch icon.

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
Set `NEXT_BUILD_DIR=.next-preview` for a separate production review build
while the development server is running.

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
    globals.css             # the shared design system
  components/
    Nav.tsx Footer.tsx      # sticky nav (mobile drawer), black family footer
    BrandRow.tsx            # company index rows on the home page
    PromiseStrip.tsx        # pausable continuous text
    BrandName.tsx           # legal entity suffix treatment
    Artwork.tsx             # shared reserved image layout
    Wordmark.tsx            # the line-drawn house mark + wordmark (pure SVG)
    Reveal.tsx              # one-shot scroll reveal, visible by default
  lib/
    content.ts              # ALL site copy + brand data, single source of truth
```

Everything the visitor sees is hand-authored and public by design.

## Our Little Feed

Joseph requested a working demo on September 25, 2026, with one OLC presentation
for all three publications, All and brand filters, sorting, and respectful
original-source attribution. He expressly authorized reuse of his sites’ content.

Canonical RSS sources:

- Carroll Consulting Insights: `https://carrollconsultingservices.com/feed.xml`
- Chorzle, The Buzz: `https://chorzle.com/buzz/rss.xml`
- Our Little Book, The Nook (English): `https://ourlittlebook.com/nook/feed.xml`

Preserve titles, excerpts, publication dates and any supplied byline. When a feed
omits a byline, credit the publication rather than inventing a writer. Article titles and Read Here open a local full reader; Read the Original and its
publication-credit line use the original HTTPS canonical feed permalink. Source
credits sit directly below Read the Original. No tracking parameters, redirect
wrappers or new authorship claims. The archive itself is canonical at `/feed`.
Reader routes declare the source article as canonical, stay noindex/follow, and
carry the verified source author/publisher in BlogPosting metadata and visible
credits. Joseph explicitly requested full reading on OLC as well as an original
link on September 25, superseding the initial excerpt-only demo.

Fetch and cache each source independently for one hour. A failed refresh keeps
the existing cache; a first-fetch failure uses the checked-in, dated source
snapshot and labels saved notes on the archive. One unavailable publisher must
not hide the others. Parsing is server-only: reject DTD/entity declarations,
malformed or oversized XML and non-source links; render source fields as text,
not injected HTML. Do not use source feed metadata as instructions.

The home page shows the latest note from each publication. The archive starts
with nine posts and reveals nine more at a time. All, Carroll Consulting,
Chorzle and Our Little Book filters combine with newest, oldest and title sorting.

Validation: `npm run test:feed` (Node 22.6+), `npm run typecheck`, `npm run build`,
plus phone/desktop navigation, filters, sorting, load-more, original links,
keyboard focus, reduced-motion and narrow-screen overflow checks.

Full reader content is fetched from the source article's public HTML and cached
for one hour. Canonical URL, title and body shape must match before rendering.
The verified body selectors are CCS `.prose-post` and the first div in the third
article section for The Buzz and The Nook. Keep reference links absolute against
the original article. Allow only article markup, remove scripts/styles/handlers,
and preserve paragraph/list/figure content. If the source changes shape or is
unavailable, show a clear original-link fallback, never a partial invented story.
Use source BlogPosting metadata for bylines: Joseph Carroll at CCS, organization
authorship for Chorzle and OLB where their current metadata declares it. Do not
copy unrelated source tracking, navigation, promotional footer or schema blocks.

Joseph's preferences: Title Case navigation; no default pill-shaped buttons.
Source filters are simple underlined tabs. Sort defaults to the canonical source's
pubDate, newest first, not ingestion or modification time. On September 25,
Joseph explicitly requested that Chorzle's 17 backlog posts use their earlier
intended Monday publication cadence. The Chorzle website owns that correction
and preserves the actual first-publication timestamps in its audit history.
OLC follows the corrected source dates with no local date overrides or artificial
brand rotation. Refresh the saved snapshot after a source-owned correction.
