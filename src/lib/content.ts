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
//    Describe workshop projects through their craft and lessons, without activity labels.


export const SITE = {
  "brand": "Our Little Company",
  "brandFull": "Our Little Company LLC",
  "operator": "Joseph Carroll",
  "domain": "ourlittlellc.com",
  "url": "https://ourlittlellc.com",
  "linkedin": "https://www.linkedin.com/in/josephglencarroll",
  "tagline": "A parent company for a family of fun things, imagined here and built from the ground up.",
  "metaDescription": "Our Little Company is the parent company behind a family of fun, home-grown things: Our Little Book, Chorzle, Carroll Consulting, and a workshop of new ideas."
};

export const HERO = {
  "eyebrow": "Our Little Company LLC",
  "lines": [
    "A little company.",
    "A lot of fun."
  ],
  "sub": "We're the parent company behind a family of fun things. Books, better routines, and ideas worth exploring. All imagined here and built from the ground up.",
  "caption": "A home for what we build."
};

export const PROMISE = [
  "Home grown",
  "Ground up",
  "Built in-house",
  "Small on purpose",
  "Made with curiosity",
  "Room to play",
  "Stories to share",
  "Everyday ideas",
  "A family of makers",
  "A little imagination",
  "Always learning",
  "Good things take care"
];

export type Brand = {
  slug: string;
  name: string;
  descriptor: string;
  category: string;
  flagship: boolean;
  story: string[];
  builtInHouse: string[];
  lesson: { heading: string; body: string };
  url?: string;
  urlLabel?: string;
};

export const BRANDS: Brand[] = [
  {
    "slug": "our-little-book",
    "name": "Our Little Book LLC",
    "descriptor": "Big adventures for little imaginations.",
    "flagship": true,
    "story": [
      "Our Little Book began with a simple wish: to make a story that felt like it belonged to our family. A book to get lost in, come back to, and eventually hold in your hands.",
      "We built the journey from a first idea to an illustrated book, bringing the story, artwork, and print preparation together. The work lives in the details: pages that belong together, a book that feels whole, and a clear path from screen to paper."
    ],
    "builtInHouse": [
      "Story and product design",
      "Illustration workflows",
      "Book quality checks",
      "Print preparation"
    ],
    "url": "https://ourlittlebook.com",
    "urlLabel": "ourlittlebook.com",
    "category": "Storybooks",
    "lesson": {
      "heading": "A book is more than a collection of pages.",
      "body": "Making Our Little Book taught us to judge the whole experience. The words, pictures, pacing, and printed object all need to feel like parts of the same little world."
    }
  },
  {
    "slug": "chorzle",
    "name": "Chorzle LLC",
    "descriptor": "A little teamwork. A little more fun.",
    "flagship": true,
    "story": [
      "Chorzle grew out of life at home: chores to do, rewards to work toward, and a family trying to keep it all straight. We wanted something children could understand and parents could actually keep up with.",
      "We built the chore-to-reward loop, the family accounts, and the updates that keep everyone on the same page across devices. The point is simple: make the everyday work of a household feel a little more shared."
    ],
    "builtInHouse": [
      "Family experience design",
      "Chores and rewards",
      "Shared household updates",
      "Phone and browser experience"
    ],
    "url": "https://chorzle.com",
    "urlLabel": "chorzle.com",
    "category": "Family life",
    "lesson": {
      "heading": "Simple has to survive a real week.",
      "body": "The useful test is what happens in a busy household. Each addition has to earn its place without making the basic promise harder to understand: do the chore, earn the reward."
    }
  },
  {
    "slug": "carroll-consulting",
    "name": "Carroll Consulting LLC",
    "descriptor": "Clear thinking. Work that gets done.",
    "flagship": true,
    "story": [
      "Carroll Consulting is Joseph Carroll's independent practice, bringing marketing, business operations, and software together. The work connects the plan with the practical details of making it happen.",
      "The practice draws on more than fifteen years of work with Fortune 500 and high-growth companies. Strategy, execution, and the systems behind them belong in the same conversation.",
      "The consultancy is focused on existing work and is not accepting new clients. Its own site holds the fuller story, the method, and the work."
    ],
    "builtInHouse": [
      "Marketing strategy",
      "Business operations",
      "Software and systems",
      "Brand and positioning"
    ],
    "url": "https://carrollconsultingservices.com",
    "urlLabel": "carrollconsultingservices.com",
    "category": "Consulting",
    "lesson": {
      "heading": "The handoff is part of the work.",
      "body": "A good plan needs a way to become everyday practice. The work has pushed us to connect strategy, measurement, and the tools people actually use."
    }
  },
  {
    "slug": "soong",
    "name": "SOONG",
    "descriptor": "An experiment in thinking out loud.",
    "flagship": false,
    "story": [
      "SOONG began with a question: what would an open mind do if its job were to look for a worthwhile purpose? We built an experiment around curiosity, reflection, and showing the work behind an idea.",
      "The build brought together a public stream of thoughts, a transparent ledger, and a record that could be revisited. We explored how an idea could face criticism, remember its earlier thinking, and account for the resources it used."
    ],
    "builtInHouse": [
      "The thinking and reflection loop",
      "A transparent cost ledger",
      "Memory and traceable records",
      "Independent critique and revision"
    ],
    "category": "Curiosity & exploration",
    "lesson": {
      "heading": "Showing your work changes the work.",
      "body": "SOONG taught us to give ideas something to answer to: a visible record, a real budget, and criticism that can change the conclusion. A polished answer matters less than an honest path to it."
    }
  },
  {
    "slug": "ladon",
    "name": "Ladon",
    "descriptor": "An exploration in thoughtful decisions.",
    "flagship": false,
    "story": [
      "Ladon was a personal investing project built around a deceptively simple question: what should happen next? We explored how to turn a complicated set of choices into a clear plan, with a reason for each step.",
      "The work brought together planning, risk controls, scenario testing, and plain-language explanations. Its name came from the dragon that guarded the golden apples, a reminder to build the boundaries as carefully as the possibilities."
    ],
    "builtInHouse": [
      "Planning and decision design",
      "Risk controls and guardrails",
      "Scenario testing",
      "Clear explanations"
    ],
    "category": "Decision tools",
    "lesson": {
      "heading": "Test the idea you want to believe.",
      "body": "Building Ladon taught us to distinguish an appealing result from evidence that stands up to testing. The useful work was making the assumptions visible, examining the tradeoffs, and keeping the limits clear."
    }
  }
];

export const FAMILY = {
  "eyebrow": "The family",
  "heading": "Good things. One roof.",
  "intro": "Stories to get lost in. A little help with the everyday. Work we care about. Each one started with an idea worth making.",
  "workshopEyebrow": "Also from the workshop",
  "workshopIntro": "A place for curiosity, experiments, and lessons we bring into the next thing."
};

export const VALUES = [
  {
    "no": "01",
    "title": "Built, not bought",
    "body": "Every company starts with an idea we want to bring to life. We imagine it, design it, build it, and keep making it better."
  },
  {
    "no": "02",
    "title": "Small on purpose",
    "body": "Small means we can give each thing real attention. We build at a pace that lets us care about the details."
  },
  {
    "no": "03",
    "title": "Family first",
    "body": "Most of these ideas began at home. Bedtime stories. Chores and rewards. The everyday things that could be a little more useful, or a little more fun."
  },
  {
    "no": "04",
    "title": "Keep learning",
    "body": "Some ideas become companies. Others teach us something we carry into the next thing. There is room under this roof for both."
  }
];

export const STORY = {
  "eyebrow": "Our story",
  "heading": "Little is the point.",
  "intro": "A parent company for a lot of fun things. And a little room for whatever comes next.",
  "chapters": [
    {
      "title": "It started at home.",
      "body": "Our Little Company gives our family’s passion projects one home. Each began as something we wanted to exist, built at our own kitchen table. A storybook. A way to make chores more fun. A better way of working."
    },
    {
      "title": "A name that feels like us.",
      "body": "“Our little book” is what you call something you made together and are quietly proud of. That same feeling runs through the whole company. Little is a way of staying close to the work, and to the people it is for."
    },
    {
      "title": "Always room for one more idea.",
      "body": "We imagine things, design them, and build them from the ground up. Some grow into companies; some stay experiments. Every one adds something to what we know, and helps shape the next thing we make."
    }
  ]
};

export const CONTACT = {
  "heading": "Say hello",
  "body": "Every company has its own front door. For a good conversation, a new connection, or a hello, ours is open too."
};

export const FOOTER = {
  "line": "Imagined, designed, and built from the ground up, in-house.",
  "legal": "Our Little Company LLC. All brands shown are our own."
};
