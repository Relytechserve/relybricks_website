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
  });

  it("lets visitors explore core and informational pages from Services and About", () => {
    const services = read("src/app/services/page.tsx");
    expect(services).toContain("/property-management-chennai");
    expect(services).toContain("/nri-property-management-chennai");
    expect(services).toContain("/tenant-management-chennai");
    expect(services).toContain("/property-management-cost-chennai");

    const about = read("src/app/aboutus/page.tsx");
    expect(about).toContain("/nri-property-management-chennai");
  });

  it("links informational guides from commercial AEO pages", () => {
    const hub = read("src/app/property-management-chennai/page.tsx");
    expect(hub).toContain("/property-management-cost-chennai");
    expect(hub).toContain("/manage-property-in-chennai-from-abroad");

    const nri = read("src/app/nri-property-management-chennai/page.tsx");
    expect(nri).toContain("/manage-property-in-chennai-from-abroad");
    expect(nri).toContain("/property-management-cost-chennai");
  });
});
