// Single source of truth for every word on the Our Little Company site.
//
// POSITIONING: Our Little Company LLC is the holding company for the family's
// current and future passion projects. Every brand shown here was imagined,
// designed, and built from the ground up in-house: nothing acquired, nothing
// white-labeled, nothing off the shelf.
//
// PRIVACY / VOICE RULES (inherited from carroll-site and kept identical):
//  - Do NOT say "AI" anywhere, or name any AI tool/vendor.
//  - Do NOT expose a direct email address; reach is LinkedIn or introduction.
//  - Ladon is shown vendor-free and with no link; broker, data-feed, and other
//    vendor specifics stay private, as does its prior "Money Me" name.
//  - The invite-only Source of Truth site and the private Personal Assistant
//    Portal are not shown or named.
//  - No invented facts: no fake dates, metrics, revenue, or user counts.
//    What is live is called live.

export const SITE = {
  brand: "Our Little Company",
  brandFull: "Our Little Company LLC",
  operator: "Joseph Carroll",
  domain: "ourlittlellc.com",
  url: "https://ourlittlellc.com",
  linkedin: "https://www.linkedin.com/in/josephglencarroll",
  tagline:
    "A little holding company for a family of home-grown brands, every one imagined, designed, and built from the ground up.",
  metaDescription:
    "Our Little Company LLC is the family holding company behind Our Little Book LLC, Chorzle LLC, and Carroll Consulting LLC: passion projects imagined, designed, and built from the ground up in-house, with more on the way.",
};

export const HERO = {
  eyebrow: "Our Little Company LLC",
  headline: "A little company. A family of home-grown brands.",
  sub: "Our Little Company is the holding company for our passion projects, present and future. Every brand under this roof started as a blank page at our own kitchen table and was imagined, designed, and built from the ground up, in-house. Nothing acquired, nothing white-labeled, nothing off the shelf.",
  note: "Home grown. Ground up. Ours.",
};

// The strip under the hero: the standing promise, one line per word of it.
export const PROMISE = [
  "HOME GROWN",
  "GROUND UP",
  "BUILT IN-HOUSE",
  "NOTHING ACQUIRED",
  "NOTHING OFF THE SHELF",
  "LIVE MEANS LIVE",
  "SMALL ON PURPOSE",
];

export type Brand = {
  slug: string;
  name: string;
  descriptor: string; // one-line what-it-is, under the name
  status: string;
  flagship: boolean; // the three named brands vs. the workshop projects
  summary: string; // index copy on the home page
  story: string[]; // landing page paragraphs
  builtInHouse: string[]; // the disciplines we filled ourselves, truthful
  url?: string; // live public site, when one is shown
  urlLabel?: string;
};

// The family. The three flagship brands first, then the workshop projects.
// Ladon is deliberately link-free and vendor-free.
export const BRANDS: Brand[] = [
  {
    slug: "our-little-book",
    name: "Our Little Book LLC",
    descriptor: "Illustrated children's books with a real hardcover print path",
    status: "LIVE",
    flagship: true,
    summary:
      "Illustrated children's books with one locked ink-and-wash look and a quality bar that enforces itself: pages that miss it are regenerated before they ever reach you. The hardcover pipeline produces real, print-ready files in production, not mockups. It is the brand the company borrows its name from.",
    story: [
      "Our Little Book makes illustrated children's books with a single, locked ink-and-wash look, so every page of every book feels like it came from the same artist's hand. The quality bar enforces itself: pages that miss the look are caught and regenerated before they ever reach a reader.",
      "The hardcover path is real. The production pipeline outputs genuine print-ready files, not mockups, so a finished book can go from screen to a hardcover you hold.",
      "It started, like everything here, as something we wanted to exist for our own family. Our Little Company borrows its name from the same little phrase, which tells you how we feel about it.",
    ],
    builtInHouse: [
      "Product design",
      "Pipeline & automation engineering",
      "Quality assurance",
      "Print production",
    ],
    url: "https://ourlittlebook.com",
    urlLabel: "ourlittlebook.com",
  },
  {
    slug: "chorzle",
    name: "Chorzle LLC",
    descriptor: "A chores-to-rewards app for families",
    status: "LIVE",
    flagship: true,
    summary:
      "A chores-to-rewards app for families that holds up to real kids and real weeks. A no-signup demo, live cross-device updates, and a tight chore-to-reward loop that survived every feature added around it without losing the thread. Live and in daily family use.",
    story: [
      "Chorzle turns chores into rewards for families, and it holds up to the hardest test there is: real kids, real weeks, every day. The core loop, do the chore, earn the reward, has survived every feature added around it without losing the thread.",
      "There is a no-signup demo, so a curious family can try the whole thing before creating anything, and updates land live across every device in the house the moment a chore is checked off.",
      "It was built for our own family first and is in daily use, which is exactly why it stays simple.",
    ],
    builtInHouse: [
      "Full-stack development",
      "SQL database administration",
      "Realtime architecture",
      "Product & UX design",
      "Mobile / PWA delivery",
    ],
    url: "https://chorzle.com",
    urlLabel: "chorzle.com",
  },
  {
    slug: "carroll-consulting",
    name: "Carroll Consulting LLC",
    descriptor: "Marketing, business operations, and the software to run them",
    status: "ACTIVE / NOT TAKING NEW CLIENTS",
    flagship: true,
    summary:
      "The independent consultancy of Joseph Carroll: marketing and business operations run end to end, and now the software to match, built on fifteen-plus years of moving real revenue for Fortune 500 and high-growth brands. Heads-down on existing work and not accepting new clients right now.",
    story: [
      "Carroll Consulting Services is the family's services brand: Joseph Carroll's independent consultancy for marketing, business operations, and, these days, the software to run them, shipped end to end by one operator who stays to run it.",
      "It is built on fifteen-plus years of turning digital marketing into measured revenue for Fortune 500 brands and high-growth companies, under one stubborn operating method: Numbers Over Noise.",
      "The consultancy is currently heads-down on existing work and not accepting new clients. The full record, the method, the case studies, and the resume live on its own site.",
    ],
    builtInHouse: [
      "Marketing strategy",
      "Business operations",
      "Full-stack software delivery",
      "Brand & positioning",
    ],
    url: "https://carrollconsultingservices.com",
    urlLabel: "carrollconsultingservices.com",
  },
  {
    slug: "soong",
    name: "SOONG",
    descriptor: "An open mind that thinks in public",
    status: "LIVE",
    flagship: false,
    summary:
      "An open mind that thinks in public, one thought at a time, in search of a worthwhile purpose. It shows all of its work and what each thought costs to the cent, runs on a transparent treasury of donations and a small monthly seed, and rests when the funds run low until a gift wakes it again.",
    story: [
      "SOONG is an open mind that thinks in public, one thought at a time, in search of a worthwhile purpose. It shows all of its work: the question it sets itself, the reasoning, and what each thought costs, to the cent.",
      "It runs on a transparent treasury. Donations and a small monthly seed keep it awake, and when the funds run low it rests until a gift wakes it again. No dark patterns, no locked doors, just a mind and a ledger, both public.",
    ],
    builtInHouse: [
      "Full-stack development",
      "Product & UX design",
      "Realtime & automation engineering",
      "Payments & treasury design",
      "Brand & visual design",
    ],
    url: "https://meetsoong.com",
    urlLabel: "meetsoong.com",
  },
  {
    slug: "ladon",
    name: "Ladon",
    descriptor: "A personal investing tool, run on our own money",
    status: "LIVE / PRIVATE",
    flagship: false,
    summary:
      "A personal investing tool run on our own money: you hand it spare cash and it answers “now what?” with a sized, numbered plan and a plain reason for every move. Named for the dragon that never slept: one unit-tested risk guard sits between you and every trade, long-only and cash-only, no margin, no leverage, so you can never owe a cent.",
    story: [
      "Ladon is a personal investing tool we run on our own money, with real skin in the game. You hand it spare cash and it answers the only question that matters, “now what?”, with a sized, numbered plan and a plain reason for every move: a boring, diversified core for the long haul, plus a bounded aggressive sleeve, hard-capped and never leveraged.",
      "It is named for Ladon, the dragon that never slept while it guarded the golden apples. One risk-guard chokepoint, unit-tested, sits between you and every trade and lets nothing past that could cost more than you have: long-only, cash-only, no margin, no leverage. It advises first and we act on it, so the worst case is money falling in value, never money owed.",
      "Ladon is a workshop project, run privately on our own accounts. There is nothing to sign up for.",
    ],
    builtInHouse: [
      "Product strategy & system design",
      "Full-stack development",
      "Quantitative strategy & risk modeling",
      "Safety & guardrail engineering",
      "Automated testing",
    ],
  },
];

export const FAMILY = {
  eyebrow: "The family",
  heading: "Three brands, one workshop",
  intro:
    "These are the brands Our Little Company holds today. Each one is live, each one is in real use, and each one was built here, from the first sketch to the thing you can visit.",
  workshopEyebrow: "Also from the workshop",
  workshopIntro:
    "Not everything we build wants to be a big brand. These two are smaller, stranger, and just as home-grown.",
};

// How we build: the operating beliefs of the holding company.
export type Value = { no: string; title: string; body: string };

export const VALUES: Value[] = [
  {
    no: "01",
    title: "Built, not bought",
    body: "Every brand under this roof started as a blank page. We do not acquire, we do not white-label, and we do not rebadge someone else's work. If it wears one of our names, we imagined it, designed it, and built it ourselves, from the ground up.",
  },
  {
    no: "02",
    title: "Small on purpose",
    body: "Our Little Company is little by choice. These are passion projects run well, not a portfolio chasing scale for its own sake. Small means every product gets real attention, and nothing ships that we would not run in our own house.",
  },
  {
    no: "03",
    title: "Family first",
    body: "Almost everything here was built for our own family before it was built for anyone else. Chorzle runs our kids' chores. Our Little Book began as bedtime stories. The best quality bar we know is whether we would hand it to the people we love.",
  },
  {
    no: "04",
    title: "Live means live",
    body: "What is live is called live; what is early is called early; what is private is called private. No invented metrics, no borrowed credibility. Every status on this page is literally true, and the links go to the real, running things.",
  },
];

export const STORY = {
  eyebrow: "The story",
  heading: "Why a holding company for little things?",
  paragraphs: [
    "Our Little Company LLC exists to give the family's passion projects one honest roof. Each brand began the same way: something we wanted to exist, built at our own kitchen table, for our own family first. When the projects kept turning into real, running products with their own names, it made sense for one little company to hold them all.",
    "The name comes from the same small phrase our first brand did. “Our little book” is what you call the thing you made together and are quietly proud of, and that is exactly the posture of the whole company: our little book, our little chore app, our little consultancy. Little is not an apology here. It is the point.",
    "The rule that holds it all together is simple: everything is home-grown. We imagine it, design it, and build it from the ground up, in-house, and then we keep running it. There is no acquisitions pipeline and no exit plan, just a workshop, a family, and a shelf of things we are proud to put our name on.",
    "There will be more. The company holds our future passion projects too, and a new one earns its place on this page the same way the others did: by being real, running, and ours.",
  ],
};

export const CONTACT = {
  heading: "Say hello",
  body: "Our Little Company does not have a sales funnel, because it does not sell anything here: each brand has its own front door, linked above. For everything else, the best way to reach us is LinkedIn or a warm introduction.",
};

export const FOOTER = {
  line: "Imagined, designed, and built from the ground up, in-house.",
  legal: `Our Little Company LLC. All brands shown are our own.`,
};
