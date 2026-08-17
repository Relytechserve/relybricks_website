import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { FaqItem } from "@/lib/home-faq";
import PropertyManagementChennaiPage from "@/app/property-management-chennai/page";
import NriPropertyManagementChennaiPage from "@/app/nri-property-management-chennai/page";
import TenantManagementChennaiPage from "@/app/tenant-management-chennai/page";
import { HUB_FAQS, HUB_H1, HUB_OPENING } from "./property-management-chennai";
import {
  NRI_FAQS,
  NRI_H1,
  NRI_OPENING,
  NRI_TESTIMONIAL,
} from "./nri-property-management-chennai";
import {
  TENANT_FAQS,
  TENANT_H1,
  TENANT_OPENING,
} from "./tenant-management-chennai";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

function visibleText(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function parseJsonLdBlocks(html: string): unknown[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
}

function flattenNodes(blocks: unknown[]): Record<string, unknown>[] {
  return blocks.flatMap((block) => {
    if (!block || typeof block !== "object") return [];
    const record = block as Record<string, unknown>;
    if (Array.isArray(record["@graph"])) {
      return record["@graph"] as Record<string, unknown>[];
    }
    return [record];
  });
}

function nodesOfType(html: string, type: string) {
  return flattenNodes(parseJsonLdBlocks(html)).filter((node) => node["@type"] === type);
}

function assertFaqMatches(html: string, items: FaqItem[]) {
  const faqPages = nodesOfType(html, "FAQPage");
  expect(faqPages).toHaveLength(1);
  const entities = faqPages[0].mainEntity as {
    name: string;
    acceptedAnswer: { text: string };
  }[];
  expect(entities).toHaveLength(items.length);
  entities.forEach((entity, index) => {
    expect(entity.name).toBe(items[index].question);
    expect(entity.acceptedAnswer.text).toBe(items[index].answer);
    expect(html).toContain(items[index].question);
    expect(html).toContain(items[index].answer);
  });
}

describe("/property-management-chennai", () => {
  const html = renderToString(<PropertyManagementChennaiPage />);
  const text = visibleText(html);

  it("renders one locked H1 and the server-rendered opening", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(text).toContain(HUB_H1);
    expect(text).toContain(HUB_OPENING);
    expect(html).toContain("₹16,000");
    expect(html).toContain("tenant sourcing");
    expect(html).toContain("Vacant property care");
  });

  it("emits Service, BreadcrumbList and matching FAQ schema", () => {
    const services = nodesOfType(html, "Service");
    expect(services).toHaveLength(1);
    expect(services[0].name).toBe("Property management in Chennai");
    expect(nodesOfType(html, "BreadcrumbList")).toHaveLength(1);
    expect(nodesOfType(html, "WebPage")).toHaveLength(1);
    expect(nodesOfType(html, "LocalBusiness")).toHaveLength(0);
    assertFaqMatches(html, HUB_FAQS);
  });
});

describe("/nri-property-management-chennai", () => {
  const html = renderToString(<NriPropertyManagementChennaiPage />);
  const text = visibleText(html);

  it("renders the overseas-owner opening, vacant and tenanted sections, and exact testimonial", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(text).toContain(NRI_H1);
    expect(text).toContain(NRI_OPENING);
    expect(text).toContain("If the property is tenanted");
    expect(text).toContain("If the property is vacant");
    expect(text).toContain(NRI_TESTIMONIAL.quote);
    expect(text).toContain("Madhuvanthi");
  });

  it("emits Chennai-only Service schema and matching FAQs", () => {
    const services = nodesOfType(html, "Service");
    expect(services).toHaveLength(1);
    expect(services[0].name).toBe(
      "Property management in Chennai for owners living abroad",
    );
    const area = JSON.stringify(services[0].areaServed);
    expect(area).toContain("Chennai");
    expect(area).toContain("India");
    expect(area).not.toMatch(/United Kingdom|\bUK\b|\bUAE\b|Singapore|\bUS\b/);
    expect(nodesOfType(html, "BreadcrumbList")).toHaveLength(1);
    assertFaqMatches(html, NRI_FAQS);
  });
});

describe("/tenant-management-chennai", () => {
  const html = renderToString(<TenantManagementChennaiPage />);
  const text = visibleText(html);

  it("renders sourcing channels and the Market & source step", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(text).toContain(TENANT_H1);
    expect(text).toContain(TENANT_OPENING);
    expect(text).toContain("Market & source");
    expect(html).toContain("own network");
    expect(html).toContain("property marketplace");
    expect(html).toContain("partners");
    expect(html).toContain("brokers");
    expect(html).not.toMatch(/MagicBricks|99acres|Housing\.com|NoBroker/i);
    expect(html).not.toMatch(/guaranteed occupancy|time-to-let|guaranteed rent/i);
  });

  it("emits Tenant Service schema and matching FAQs", () => {
    const services = nodesOfType(html, "Service");
    expect(services).toHaveLength(1);
    expect(services[0].name).toBe("Tenant management in Chennai");
    expect(String(services[0].description)).toMatch(/own network/);
    expect(String(services[0].description)).not.toMatch(
      /MagicBricks|99acres|Housing\.com|NoBroker/i,
    );
    assertFaqMatches(html, TENANT_FAQS);
  });
});
