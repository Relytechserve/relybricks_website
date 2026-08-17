import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function read(relative: string) {
  return readFileSync(path.join(process.cwd(), relative), "utf8");
}

describe("internal discoverability", () => {
  it("points homepage tenant and NRI CTAs at the live pages", () => {
    const home = read("src/app/HomePageContent.tsx");
    expect(home).toContain('href: "/tenant-management-chennai"');
    expect(home).toContain('href="/nri-property-management-chennai"');
    expect(home).toContain('href="/property-management-chennai"');
    expect(home).toContain("View full service breakdown");
    expect(home).toContain('href="/services"');
    expect(home).not.toContain("/property-maintenance-chennai");
    expect(home).not.toContain("/property-management-cost-chennai");
  });

  it("lets visitors explore the three pages from Services and About", () => {
    const services = read("src/app/services/page.tsx");
    expect(services).toContain("/property-management-chennai");
    expect(services).toContain("/nri-property-management-chennai");
    expect(services).toContain("/tenant-management-chennai");

    const about = read("src/app/aboutus/page.tsx");
    expect(about).toContain("/nri-property-management-chennai");
  });
});
