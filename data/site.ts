// The single source for page copy, contact details, links, and metadata.
export const SITE = {
  SITE_LIVE: false,
  SITE_URL: "https://jot-studio-v3.vercel.app",
  PORTFOLIO_HREF: "https://docs.google.com/presentation/d/1OjXK5zlKdsBDqpjKGsYQDLc3fZSUuoxsfiL8Sk7mzlU/edit?usp=sharing",
  BOOK_HREF: "https://calendar.app.google/59wPznXmLWFra3iL7",
  PHONE_DISPLAY: "(513) 919-5236",
  PHONE_TEL: "+15139195236",
  EMAIL: "gurjotbilkhu@gmail.com",
  name: "Jot Bilkhu",
  studio: "Custom Software Studio",
  brand: "Jot Bilkhu - Custom Software Studio",
  location: "Skokie, IL · Chicago area",
  areaServed: "Chicago area",
  address: { locality: "Skokie", region: "IL", country: "US" },
  parentCompany: "HusslAI",
  jobTitle: "Custom software designer and builder",
  meta: {
    title: "Jot Bilkhu - Custom Software Studio | Skokie, IL",
    description: "I build simple software that does the repeat work in your business for you. Meet Jot Bilkhu, a custom software designer and builder in Skokie, serving the Chicago area.",
    image: "/og.jpg",
  },
  ui: {
    talk: "Let's talk",
    skip: "Skip to content",
    scroll: "Scroll to explore",
    home: "Jot Bilkhu - home",
    mainHref: "#main",
    scrollHref: "#what",
    startHref: "#start",
  },
  opening: {
    heading: "I help small businesses automate.",
    body: "If you want to automate your manual workflows and don't know how —",
    bodyAccent: "you're in the right place.",
  },
  what: {
    heading: "What is this?",
    body: "I build simple software that does the repeat work in your business for you. It's made for how you already work, so there's nothing new to learn.",
  },
  how: {
    heading: "How does it work?",
    steps: [
      { title: "We talk.", body: "You tell me how your business runs." },
      { title: "I map it.", body: "We find where your time and money go." },
      { title: "We build it.", body: "With AI build tools, what used to take months now takes days or weeks." },
      { title: "You get your time back.", body: "" },
    ],
  },
  about: {
    heading: "Who is Jot?",
    intro: "I'm Jot Bilkhu. I've been a certified coach, and I'm an artist and designer.",
    portfolio: "See my art and design work",
    body: "Now I build custom software with AI build tools and a team of engineers from my parent company, HusslAI.",
    strengths: "What I'm good at: design, listening, relationships, and building with purpose and care.",
    image: { src: "/jot-headshot.jpg", alt: "Jot Bilkhu", width: 1280, height: 1219 },
  },
  work: {
    heading: "Examples of work",
    cards: [
      {
        title: "A family waterproofing business",
        body: "Estimates, invoices, the crew schedule and the books, all in one place.",
        image: { src: "/shots/sohan-dashboard.jpg", alt: "The owner dashboard: bids awaiting approval, jobs today and the bid pipeline" },
      },
      {
        title: "An artist and his shirt shop",
        body: "A shop that turns customers' photos into art and ships the shirts without him touching each order.",
        image: { src: "/shots/hop-wall.jpg", alt: "Pieces from The Wall, made from customers’ own photos" },
      },
      {
        title: "A university research lab",
        body: "A website that translates itself into three languages and runs its own sign-ups and reminders.",
        image: { src: "/shots/gaw-languages.jpg", alt: "The Gender@Work home page in English and Spanish, side by side" },
      },
    ],
  },
  hunch: {
    heading: "Have a hunch?",
    body: "Have a hunch something in your business could run on its own? You don't need to know what to call it. Tell me how your day goes, and we'll figure it out together.",
  },
  start: {
    heading: "How do I get started?",
    body: "Let's talk.",
    book: "Book a time",
    phone: "Call or text",
    email: "Email",
  },
  // Decorative room imagery has empty alt text in the page.
  room: [1, 2, 3, 4].map((frame) => ({
    desktop: `/hero/k${frame}.webp`,
    desktopSmall: `/hero/k${frame}-1920.webp`,
    phone: `/hero/p${frame}.webp`,
  })),
} as const;
