import { SITE } from "./site";

const id = (fragment: string) => `${SITE.SITE_URL}/#${fragment}`;
const questions = [
  { question: SITE.what.heading, answer: SITE.what.body },
  { question: SITE.how.heading, answer: SITE.how.steps.map(s => [s.title, s.body].filter(Boolean).join(" ")).join(" ") },
  { question: SITE.about.heading, answer: [SITE.about.intro, `${SITE.about.portfolio}: ${SITE.PORTFOLIO_HREF}.`, SITE.about.body, SITE.about.strengths].join(" ") },
  { question: SITE.hunch.heading, answer: SITE.hunch.body },
  { question: SITE.start.heading, answer: `${SITE.start.body} ${SITE.start.book}: ${SITE.BOOK_HREF}. ${SITE.start.phone}: ${SITE.PHONE_DISPLAY}. ${SITE.start.email}: ${SITE.EMAIL}.` },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": id("jot"), name: SITE.name,
      url: `${SITE.SITE_URL}/#about`, image: `${SITE.SITE_URL}${SITE.about.image.src}`,
      jobTitle: SITE.jobTitle, worksFor: { "@type": "Organization", name: SITE.parentCompany },
      sameAs: [SITE.PORTFOLIO_HREF],
    },
    {
      "@type": "ProfessionalService", "@id": id("studio"), name: SITE.brand,
      url: SITE.SITE_URL, founder: { "@id": id("jot") },
      telephone: SITE.PHONE_TEL, email: SITE.EMAIL, areaServed: SITE.areaServed,
      address: { "@type": "PostalAddress", addressLocality: SITE.address.locality, addressRegion: SITE.address.region, addressCountry: SITE.address.country },
      image: `${SITE.SITE_URL}${SITE.meta.image}`, description: SITE.what.body,
    },
    {
      "@type": "FAQPage", "@id": id("faq"),
      mainEntity: questions.map(({ question, answer }) => ({
        "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};
