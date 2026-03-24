import { getSiteUrl } from "@/lib/site";

const LINKEDIN = "https://www.linkedin.com/company/relybricks-property-management";

export default function RootJsonLd() {
  const base = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "RelyBricks Property Management",
        url: base,
        logo: `${base}/images/logo.png`,
        email: "info@relybricks.com",
        telephone: "+91-99520-04948",
        sameAs: [LINKEDIN],
        description:
          "Tech-enabled property management in Chennai for homeowners, NRIs, and out-of-station owners. Tenant management, maintenance, and digital reporting.",
        areaServed: {
          "@type": "City",
          name: "Chennai",
          containedInPlace: { "@type": "Country", name: "India" },
        },
        knowsAbout: [
          "Property management",
          "Tenant management",
          "NRI property management",
          "Rental property maintenance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "RelyBricks",
        description:
          "Property management in Chennai—peace of mind for homeowners with transparent, tech-enabled service.",
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
