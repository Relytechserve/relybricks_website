import { describe, expect, it } from "vitest";
import { SITEMAP_PATHS, buildSitemap } from "@/app/sitemap";

const UNPUBLISHED_AEO_PATHS = [
  "/property-management-chennai",
  "/nri-property-management-chennai",
  "/tenant-management-chennai",
  "/property-maintenance-chennai",
  "/property-management-cost-chennai",
  "/manage-property-in-chennai-from-abroad",
  "/best-property-management-companies-chennai",
];

describe("sitemap", () => {
  const entries = buildSitemap("https://relybricks.com", new Date("2026-08-17"));

  it("emits current public pages on the apex host", () => {
    expect(entries.map((entry) => entry.url)).toEqual([
      "https://relybricks.com/",
      "https://relybricks.com/aboutus",
      "https://relybricks.com/referral",
      "https://relybricks.com/services",
      "https://relybricks.com/contact",
      "https://relybricks.com/privacy",
      "https://relybricks.com/terms",
      "https://relybricks.com/cookies",
    ]);
  });

  it("does not include unpublished AEO routes", () => {
    const urls = entries.map((entry) => entry.url).join(" ");
    const paths = SITEMAP_PATHS.map((item) => item.path);
    for (const path of UNPUBLISHED_AEO_PATHS) {
      expect(urls).not.toContain(path);
      expect(paths).not.toContain(path);
    }
  });
});
