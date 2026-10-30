/* Every string here is verbatim from https://jot-studio-site.vercel.app (captured 2026-10-26). Nothing invented. */
export const BIZ = {
  name: "Jot Bilkhu",
  kicker: "Jot Bilkhu · Custom Software",
  city: "Skokie, IL · Chicago area",
  phone: "(513) 919-5236",
  phoneHref: "tel:5139195236",
  email: "gurjotbilkhu@gmail.com",
  emailHref: "mailto:gurjotbilkhu@gmail.com",
  bookHref:
    "mailto:gurjotbilkhu@gmail.com?subject=Operating%20Review&body=Hi%20Jot%20%E2%80%94%20I%27d%20like%20to%20book%20an%20Operating%20Review.%0A%0ABusiness%3A%20%0AWhat%27s%20eating%20the%20most%20time%20right%20now%3A%20",
  cta: "Book a paid Operating Review",
  ctaNote: "A working session plus a written map of your biggest time-sinks and risks. Yours to keep, whatever you decide next.",
  h1: "I build owner-led businesses their entire operating system — custom to exactly how you run.",
  sub: "I sit with you, learn how your business actually runs, and build the system that runs it — the whole spine, not another app you bend yourself around.",
};

export const DAY = {
  label: "A day right now",
  lines: [
    "It’s 9pm and you’re still at the kitchen table. Tomorrow’s bids are on paper.",
    "Only one person knows how to price a job, and if they’re out, nothing moves.",
    "The schedule lives in one person’s head, and when they’re out, nobody’s sure which crew goes where.",
    "A customer calls about an old warranty and someone digs through a filing cabinet.",
  ],
  close: "You’ve looked at software. It wants you to run your business its way.",
};

export const STORY = {
  label: "My story",
  p1: "My family runs a waterproofing and foundation-repair company. For years only one person could write an estimate: the owner. Everything he knew about pricing a job lived in his head.",
  p2: "I sat with him, learned how he thinks through a bid, and built it into the system they run on now.",
  pull: "His method is written down and repeatable, so Cliff, their other estimator, prices jobs the same way and works faster, and the owner can teach it and pass it on.",
  p3: "Now I do the same for other small businesses.",
};

export type Shot = { src: string; alt: string; cap: string };
export type Study = {
  n: string; sector: string; title: string; dek: string; body: string[]; shots: Shot[];
  results: { strong: string; rest: string; num?: number; suffix?: string }[]; pull?: string; tone: "paper" | "card" | "teal";
};
export const STUDIES: Study[] = [
  {
    n: "01", sector: "Field Services", tone: "paper",
    title: "A family waterproofing business, rebuilt as software",
    dek: "Sohan & Sons is a family-run waterproofing and foundation-repair company near Cincinnati with a seven-figure bid pipeline — and until recently, no system of record. Estimating, bidding, contracts, invoicing, and scheduling lived in people’s heads, on paper, and in scattered tools.",
    body: [
      "I didn’t start by speccing a product. I started by learning how the business actually runs — how a bid really moves between estimator, customer, and owner — and built the system to match. Estimators draw the job on a site-diagram canvas made for waterproofing work. Customers sign and pay from a link, no account. Owners approve before anything is scheduled. Every change is audited, and database-level rules make sure a customer can never sign a bid that’s been changed out from under them.",
    ],
    shots: [
      { src: "/shots/sohan-site-drawing.jpg", alt: "The site-diagram canvas: a whole-house drawing with walls, beams and drainage", cap: "The estimating canvas — drawn the way a waterproofer thinks, priced as it’s drawn." },
      { src: "/shots/sohan-dashboard.jpg", alt: "The owner dashboard: bids awaiting approval, jobs today and the bid pipeline", cap: "Every bid, every stage — draft to signed to scheduled to paid." },
      { src: "/shots/sohan-paid-warranty.jpg", alt: "A paid invoice with its lifetime warranty certificate", cap: "Paid in full, and the lifetime warranty certificate went out on its own." },
      { src: "/shots/sohan-schedule.jpg", alt: "The crew schedule, month view", cap: "The crew schedule — every job on the calendar, 811 dig checks flagged." },
    ],
    results: [
      { strong: "The business runs on it daily", rest: " — bids, e-signatures, scheduling, invoicing, live card payments." },
      { strong: "Receipts and warranty certificates deliver themselves", rest: ", with a log that proves it." },
      { strong: "Tribal knowledge became a system", rest: " — what lived in people’s heads is now documented, enforced, and running." },
    ],
    pull: "The goal was never “an app for waterproofers.” It was this business’s own system — so nothing they knew got lost.",
  },
  {
    n: "02", sector: "First-Party Commerce", tone: "teal",
    title: "The artist who built the machine that scales his art",
    dek: "House of Paradox is my own brand: a full-stack AI art platform that turns any photo into a gallery-worthy piece in my signature style — then puts it on a shirt, a museum-grade print, or delivers the artwork itself.",
    body: [
      "This one proves the philosophy is mine. The engine doesn’t apply a filter — it runs my actual creative process, staged and tuned until I signed off: “yes, that’s it.”",
      "The commerce is real: Stripe checkout, automatic print-on-demand fulfillment, content screening on every piece, and a shirt that doesn’t load so much as arrive — because the product being sold is a feeling.",
    ],
    shots: [
      { src: "/shots/hop-wall.jpg", alt: "Pieces from The Wall, made from customers’ own photos", cap: "Real pieces from The Wall — everyday photos, remade in my style. Process, not filter." },
      { src: "/shots/hop-shirt.jpg", alt: "The House of Paradox shirt, revolving in 3D", cap: "The reveal: your art, presented like it deserves." },
    ],
    results: [
      { strong: "Shipped in roughly seven days", rest: " — engine, store, curation room, and gallery.", num: 7, suffix: " days" },
      { strong: "Live commerce, end to end", rest: " — real payments, automatic fulfillment, self-healing operations." },
      { strong: "Three product lines from one platform", rest: " — shirts, prints, and full-resolution files.", num: 3, suffix: " lines" },
    ],
  },
  {
    n: "03", sector: "Research & Institutions", tone: "card",
    title: "A trilingual research lab that runs itself",
    dek: "The Gender at Work Lab (University of Illinois) needed a serious academic home in English, Spanish, and Portuguese — on a grant budget, run by people whose job is research, not websites.",
    body: [
      "So the site does the work. Content written in any language translates itself to the other two on save. The monthly writing group runs itself: sign-ups, confirmations, calendar invites, and trilingual reminder emails, all automatic. A members-only research depository manages its own access keys. And the whole thing is operated through an admin panel a graduate student runs — with the instructions built in, so nobody ever has to call a developer.",
    ],
    shots: [
      { src: "/shots/gaw-languages.jpg", alt: "The Gender@Work home page in English and Spanish, side by side", cap: "Write once — the site translates itself. English, Spanish, Portuguese." },
      { src: "/shots/gaw-writing-group.jpg", alt: "The writing group sign-up and upcoming sessions", cap: "The writing group runs itself — sign up once, and every invite and reminder arrives in your language." },
    ],
    results: [
      { strong: "Live at genderatworklab.org", rest: " — six sections, three languages, zero recurring platform cost.", num: 3, suffix: " languages" },
      { strong: "The team runs it without me", rest: " — the hand-off was part of the build, not an afterthought." },
      { strong: "Delivered inside a grant budget", rest: ", priced to fit the institution’s reality." },
    ],
    pull: "Systems your own people can run — that’s the point. Software that needs its builder forever isn’t finished.",
  },
];

/* SERVICES — regrouped from the nouns on the live page. Nothing renamed, nothing added. See AUDIT.md. */
export type ServiceGroup = { id: string; n: string; name: string; outcome: string; plate: string; items: { t: string; from: string }[] };
export const SERVICES: ServiceGroup[] = [
  {
    id: "win", n: "01", name: "Win the work", outcome: "Price a job the way the owner does — and let anyone on the team do it the same way.", plate: "/concept/win.webp",
    items: [
      { t: "Estimating", from: "Sohan & Sons" },
      { t: "Bidding", from: "Sohan & Sons" },
      { t: "A site-diagram canvas made for the trade", from: "“Estimators draw the job on a site-diagram canvas made for waterproofing work.”" },
      { t: "Owner approval before anything is scheduled", from: "Sohan & Sons" },
      { t: "The owner’s pricing method, written down and repeatable", from: "My story" },
    ],
  },
  {
    id: "paid", n: "02", name: "Get paid", outcome: "From signed to paid without a filing cabinet — and the paperwork sends itself.", plate: "/concept/paid.webp",
    items: [
      { t: "Contracts", from: "Sohan & Sons" },
      { t: "E-signatures — customers sign and pay from a link, no account", from: "Sohan & Sons" },
      { t: "Invoicing", from: "Sohan & Sons" },
      { t: "Live card payments · Stripe checkout", from: "Sohan & Sons · House of Paradox" },
      { t: "Receipts and warranty certificates that deliver themselves, with a log that proves it", from: "Sohan & Sons" },
    ],
  },
  {
    id: "run", n: "03", name: "Run the day", outcome: "The schedule lives in the system, not in one person’s head.", plate: "/concept/run.webp",
    items: [
      { t: "Scheduling — the crew schedule, every job on the calendar, 811 dig checks flagged", from: "Sohan & Sons" },
      { t: "Sign-ups, confirmations, calendar invites and reminder emails that run themselves", from: "Gender at Work Lab" },
      { t: "Automatic print-on-demand fulfillment", from: "House of Paradox" },
      { t: "An admin panel your own people run, with the instructions built in", from: "Gender at Work Lab" },
    ],
  },
  {
    id: "auto", n: "04", name: "Automate the rest", outcome: "The parts of the business that should happen on their own, do.", plate: "/concept/auto.webp",
    items: [
      { t: "Content that translates itself on save — English, Spanish, Portuguese", from: "Gender at Work Lab" },
      { t: "A members-only depository that manages its own access keys", from: "Gender at Work Lab" },
      { t: "Content screening on every piece", from: "House of Paradox" },
      { t: "An engine that runs your actual process, staged and tuned until you sign off", from: "House of Paradox" },
    ],
  },
];
export const RULES = [
  { t: "Every change is audited", from: "Sohan & Sons" },
  { t: "Database-level rules — a customer can never sign a bid that’s been changed out from under them", from: "Sohan & Sons" },
  { t: "Self-healing operations", from: "House of Paradox" },
  { t: "The hand-off is part of the build, not an afterthought", from: "Gender at Work Lab" },
];
export const WORLDS = ["Field Services", "First-Party Commerce", "Research & Institutions"];

export const HOW = {
  label: "How it works",
  steps: [
    { n: "1", t: "Operating Review.", d: "One session. I map where your time and money leak. You keep the map either way." },
    { n: "2", t: "Build.", d: "One piece at a time, starting with the piece that pays for itself first. You use each piece as soon as it’s done." },
    { n: "3", t: "Run it together.", d: "I stay on, fix what comes up, and add to it as the business changes." },
  ],
};

export const ABOUT = {
  label: "About me",
  text: "I’m Jot Bilkhu (say it “jo-th”), short for Gurjot. I live in Skokie, just outside Chicago. Before software I was a coach, and I still make art at House of Paradox. What ties it together: I listen to how people actually work, then build the thing that fits. I’d rather make things than sell them, so most of my work comes from people I’ve already built for.",
  threads: ["Before software I was a coach", "I still make art at House of Paradox", "I listen to how people actually work, then build the thing that fits"],
};

export const CLOSING = {
  h: "Start with an Operating Review.",
  p: "One working session. I map where your business’s time and money actually leak — the missed jobs, the double entry, the things only one person knows how to do. You keep the written map, whatever you decide next.",
  talk: "Talk to Jot",
};

/* The four story stages as one text-only line in the hero (Jot 2026-10-30, msg 6045: the stacked step cards were "too much"). */
export const STAGES = [
  { n: "01", tone: "tone-problem", label: "A day right now" },
  { n: "02", tone: "tone-review", label: "Operating review" },
  { n: "03", tone: "tone-build", label: "Build" },
  { n: "04", tone: "tone-run", label: "Run it together" },
];
