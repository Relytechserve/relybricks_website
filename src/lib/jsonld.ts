import { absoluteUrl, getSiteUrl } from "./site";
import type { FaqItem } from "./home-faq";

export const ORGANIZATION_NAME = "RelyBricks Property Management";
export const ORGANIZATION_EMAIL = "info@relybricks.com";
export const ORGANIZATION_TELEPHONE = "+91-99520-04948";
export const ORGANIZATION_LINKEDIN =
  "https://www.linkedin.com/company/relybricks";
export const ORGANIZATION_DESCRIPTION =
  "Tech-enabled property management in Chennai for homeowners, NRIs, and out-of-station owners. Tenant management, maintenance, and digital reporting.";

export function organizationId(base = getSiteUrl()): string {
  return `${base}/#organization`;
}

export function websiteId(base = getSiteUrl()): string {
  return `${base}/#website`;
}

export function chennaiAreaServed() {
  return {
    "@type": "City",
    name: "Chennai",
    containedInPlace: { "@type": "Country", name: "India" },
  };
}

/** Verified Organization node. No street address, ratings, awards, or founding date. */
export function buildOrganization(base = getSiteUrl()) {
  return {
    "@type": "Organization",
    "@id": organizationId(base),
    name: ORGANIZATION_NAME,
    url: base,
    logo: `${base}/images/logo.png`,
    image: `${base}/images/logo.png`,
    email: ORGANIZATION_EMAIL,
    telephone: ORGANIZATION_TELEPHONE,
    sameAs: [ORGANIZATION_LINKEDIN],
    description: ORGANIZATION_DESCRIPTION,
    areaServed: chennaiAreaServed(),
    knowsAbout: [
      "Property management",
      "Tenant management",
      "NRI property management",
      "Rental property maintenance",
    ],
  };
}

/**
 * Reusable LocalBusiness builder for later pages.
 * Not emitted on the live graph in Prompt 1: there is no verified public
 * street address, so a LocalBusiness node would be an incomplete NAP record.
 */
export function buildLocalBusiness(base = getSiteUrl()) {
  return {
    "@type": "LocalBusiness",
    "@id": `${base}/#localbusiness`,
    name: ORGANIZATION_NAME,
    url: base,
    logo: `${base}/images/logo.png`,
    image: `${base}/images/logo.png`,
    email: ORGANIZATION_EMAIL,
    telephone: ORGANIZATION_TELEPHONE,
    sameAs: [ORGANIZATION_LINKEDIN],
    description: ORGANIZATION_DESCRIPTION,
    areaServed: chennaiAreaServed(),
    parentOrganization: { "@id": organizationId(base) },
  };
}

export function buildWebSite(base = getSiteUrl()) {
  return {
    "@type": "WebSite",
    "@id": websiteId(base),
    url: base,
    name: "RelyBricks",
    description:
      "Property management in Chennai—peace of mind for homeowners with transparent, tech-enabled service.",
    publisher: { "@id": organizationId(base) },
    inLanguage: "en-IN",
  };
}

/** Root JSON-LD graph currently emitted on every page. */
export function buildRootGraph(base = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganization(base), buildWebSite(base)],
  };
}

export function buildFaqPage(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbList(
  items: BreadcrumbItem[],
  base = getSiteUrl(),
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type ServiceJsonLdInput = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
};

export function buildService(
  input: ServiceJsonLdInput,
  base = getSiteUrl(),
) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    ...(input.serviceType ? { serviceType: input.serviceType } : {}),
    provider: { "@id": organizationId(base) },
    areaServed: chennaiAreaServed(),
  };
}

export type WebPageJsonLdInput = {
  name: string;
  description: string;
  path: string;
};

export function buildWebPage(
  input: WebPageJsonLdInput,
  base = getSiteUrl(),
) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": `${url}#service` },
    publisher: { "@id": organizationId(base) },
    inLanguage: "en-IN",
  };
}

/** WebPage + Service graph. Organization is referenced, not duplicated. */
export function buildServiceWebPageGraph(
  input: ServiceJsonLdInput & {
    pageName?: string;
    pageDescription?: string;
  },
  base = getSiteUrl(),
) {
  const webPage = buildWebPage(
    {
      name: input.pageName ?? input.name,
      description: input.pageDescription ?? input.description,
      path: input.path,
    },
    base,
  );
  const service = buildService(input, base);
  const { "@context": _webContext, ...webPageNode } = webPage;
  const { "@context": _serviceContext, ...serviceNode } = service;

  return {
    "@context": "https://schema.org",
    "@graph": [webPageNode, serviceNode],
  };
}

export type ArticleJsonLdInput = {
  type?: "Article" | "BlogPosting";
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
};

export function buildArticle(
  input: ArticleJsonLdInput,
  base = getSiteUrl(),
) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: input.authorName ?? ORGANIZATION_NAME,
      url: base,
    },
    publisher: { "@id": organizationId(base) },
    image: `${base}/images/logo.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
