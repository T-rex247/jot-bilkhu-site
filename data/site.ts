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
    scroll: "Come inside",
    home: "Jot Bilkhu - home",
    mainHref: "#main",
    scrollHref: "#what",
    startHref: "#start",
  },
  opening: {
    heading: "I help small businesses automate.",
    body: "If you want to automate your manual workflows and don't know how — you're in the right place.",
  },
  what: {
    lines: [
      { text: "Grow bigger, faster, better.", accent: false },
      { text: "Get your time back.", accent: true },
    ],
  },
  how: {
    heading: "How it works",
    steps: [
      { title: "We talk.", body: "We get on Zoom and you tell me how your business really runs. One conversation about your actual week. You don’t need a plan or any tech knowledge." },
      { title: "I map it.", body: "We find where your time and money are going, and pick the best first piece to automate." },
      { title: "I build it.", body: "With AI build tools, what used to take months now takes days or weeks. Your first piece is built around how your business already works." },
      { title: "You try it.", body: "Use it in your real work. Send me one round of changes, and I’ll make them and send it back." },
      { title: "You own it.", body: "Once it’s paid in full, it’s yours. I stay with you after it goes live." },
      { title: "We do it again.", body: "When the first piece is paying for itself, we pick the next one and build that. One piece at a time." },
    ],
  },
  about: {
    question: "Who is Jot?",
    heading: "Hello, and welcome.",
    paragraphs: [
      "My name is Jot (“joe-th”), and I’d like to give you a life changing gift — technology.",
      "When the manual work in your business runs on its own, you can grow and move faster. You can help more people and finally have more time for the things and people you love.",
      "I design and build software with AI build tools and a team of engineers behind me. What used to take years now takes days or weeks.",
      "We’ll sit down with you, learn how your business actually works, and build technology that works the way you do. We can build your whole operating system, one piece at a time.",
    ],
    background: "I am a certified coach, artist, designer, and engineer.",
    portfolio: "See my art and design work",
    readOn: "Please read on to learn more.",
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
