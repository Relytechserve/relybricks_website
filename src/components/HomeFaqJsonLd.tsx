/** FAQ structured data for answer engines (AEO) and rich results; aligned with on-page messaging. */
export default function HomeFaqJsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does RelyBricks do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RelyBricks is a property management company in Chennai. We help homeowners and NRIs manage tenants, maintenance, bills, inspections, and value-added services through one accountable team and digital reporting.",
        },
      },
      {
        "@type": "Question",
        name: "Does RelyBricks work with NRI property owners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. RelyBricks is built for NRIs and out-of-station owners who need on-ground support in Chennai with clear communication, photos, reports, and a single point of contact.",
        },
      },
      {
        "@type": "Question",
        name: "What services are included in RelyBricks property management?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Services include tenant lifecycle management, maintenance and emergency support, interior design and refurbishing support, buying and selling assistance, land and plot care, and concierge-style value-added services such as bill payments and vendor coordination.",
        },
      },
      {
        "@type": "Question",
        name: "Where is RelyBricks based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RelyBricks is based in Chennai, India, with an on-ground team serving apartments, villas, bungalows, and plots across the city.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact RelyBricks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can call +91 99520 04948, email info@relybricks.com, or use the contact form on the RelyBricks website.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}
