import { describe, expect, it } from "vitest";
import { HOME_FAQ } from "./home-faq";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildLocalBusiness,
  buildOrganization,
  buildRootGraph,
  buildService,
  buildWebSite,
} from "./jsonld";

const FORBIDDEN_ORG_KEYS = [
  "address",
  "review",
  "aggregateRating",
  "foundingDate",
  "award",
];

function assertNoForbiddenFields(record: Record<string, unknown>) {
  for (const key of FORBIDDEN_ORG_KEYS) {
    expect(record).not.toHaveProperty(key);
  }
}

describe("JSON-LD builders", () => {
  it("builds Organization with verified Chennai facts and no invented NAP/ratings", () => {
    const org = buildOrganization("https://relybricks.com");
    expect(org["@type"]).toBe("Organization");
    expect(org["@id"]).toBe("https://relybricks.com/#organization");
    expect(org.url).toBe("https://relybricks.com");
    expect(org.email).toBe("info@relybricks.com");
    expect(org.telephone).toBe("+91-99520-04948");
    expect(org.logo).toBe("https://relybricks.com/images/logo.png");
    expect(org.sameAs).toContain(
      "https://www.linkedin.com/company/relybricks",
    );
    expect(org.areaServed).toMatchObject({
      "@type": "City",
      name: "Chennai",
      containedInPlace: { "@type": "Country", name: "India" },
    });
    assertNoForbiddenFields(org);
  });

  it("does not emit LocalBusiness on the production root graph", () => {
    const graph = buildRootGraph("https://relybricks.com");
    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["Organization", "WebSite"]);
    expect(types).not.toContain("LocalBusiness");
  });

  it("provides LocalBusiness support without an address for later use", () => {
    const local = buildLocalBusiness("https://relybricks.com");
    expect(local["@type"]).toBe("LocalBusiness");
    expect(local).not.toHaveProperty("address");
    expect(local.areaServed).toMatchObject({ name: "Chennai" });
    expect(local.telephone).toBe("+91-99520-04948");
    assertNoForbiddenFields(local);
  });

  it("links WebSite to the Organization id", () => {
    const site = buildWebSite("https://relybricks.com");
    expect(site["@type"]).toBe("WebSite");
    expect(site.publisher).toEqual({
      "@id": "https://relybricks.com/#organization",
    });
  });

  it("builds FAQPage entries from the shared homepage FAQ source", () => {
    const faq = buildFaqPage(HOME_FAQ);
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(HOME_FAQ.length);
    faq.mainEntity.forEach((entity, index) => {
      expect(entity.name).toBe(HOME_FAQ[index].question);
      expect(entity.acceptedAnswer.text).toBe(HOME_FAQ[index].answer);
    });
  });

  it("builds BreadcrumbList, Service and Article helpers for later pages", () => {
    const crumbs = buildBreadcrumbList(
      [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ],
      "https://relybricks.com",
    );
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement[1]).toMatchObject({
      position: 2,
      name: "Services",
      item: "https://relybricks.com/services",
    });

    const service = buildService(
      {
        name: "Tenant management in Chennai",
        description: "Screening, onboarding, rent collection and renewals.",
        path: "/tenant-management-chennai",
      },
      "https://relybricks.com",
    );
    expect(service["@type"]).toBe("Service");
    expect(service.provider).toEqual({
      "@id": "https://relybricks.com/#organization",
    });
    expect(service).not.toHaveProperty("aggregateRating");

    const article = buildArticle(
      {
        headline: "How to manage property in Chennai from abroad",
        description: "A practical guide for overseas owners.",
        path: "/manage-property-in-chennai-from-abroad",
        datePublished: "2026-08-17",
      },
      "https://relybricks.com",
    );
    expect(article["@type"]).toBe("Article");
    expect(article.publisher).toEqual({
      "@id": "https://relybricks.com/#organization",
    });
    expect(article).not.toHaveProperty("review");
  });
});
