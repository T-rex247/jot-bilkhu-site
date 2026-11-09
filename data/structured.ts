import { BIZ, FAQ, SERVICES, SITE_URL, UI } from "./site";

const id = (fragment: string) => `${SITE_URL}/#${fragment}`;
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite", "@id": id("website"), url: SITE_URL,
      name: BIZ.brand, description: BIZ.tagline, inLanguage: "en-US",
      publisher: { "@id": id("studio") },
    },
    {
      "@type": "ProfessionalService", "@id": id("studio"),
      name: BIZ.brand, url: SITE_URL, founder: { "@id": id("jot") },
      telephone: BIZ.phone, email: BIZ.email, areaServed: BIZ.city,
      image: `${SITE_URL}/og.jpg`, description: `${BIZ.tagline} ${BIZ.sub}`,
      hasOfferCatalog: { "@id": id("catalog") },
    },
    {
      "@type": "Person", "@id": id("jot"), name: BIZ.name,
      url: `${SITE_URL}/#about`, image: `${SITE_URL}/jot-headshot.jpg`,
      // Existing wording, without inventing a professional title or credential.
      jobTitle: BIZ.kicker.split(" · ")[1], worksFor: { "@id": id("studio") },
    },
    {
      "@type": "FAQPage", "@id": id("faq"),
      mainEntity: FAQ.items.map(({ q, a }) => ({
        "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "OfferCatalog", "@id": id("catalog"), name: UI.servicesLabel,
      itemListElement: SERVICES.map(s => ({
        "@type": "Offer", itemOffered: {
          "@type": "Service", "@id": id(`service-${s.id}`),
          name: s.name, description: s.outcome, provider: { "@id": id("studio") },
          hasOfferCatalog: {
            "@type": "OfferCatalog", name: s.name,
            itemListElement: s.items.map(item => ({ "@type": "Service", name: item.t })),
          },
        },
      })),
    },
  ],
};
