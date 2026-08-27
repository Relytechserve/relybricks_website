import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const PRODUCTION_FILES = [
  "src/app/property-management-chennai/page.tsx",
  "src/app/nri-property-management-chennai/page.tsx",
  "src/app/tenant-management-chennai/page.tsx",
  "src/app/property-management-cost-chennai/page.tsx",
  "src/app/manage-property-in-chennai-from-abroad/page.tsx",
  "src/content/property-management-chennai.ts",
  "src/content/nri-property-management-chennai.ts",
  "src/content/tenant-management-chennai.ts",
  "src/content/property-management-cost-chennai.ts",
  "src/content/manage-property-in-chennai-from-abroad.ts",
  "src/content/aeo-shared.ts",
  "src/lib/llms-txt.ts",
  "src/app/sitemap.ts",
  "src/app/HomePageContent.tsx",
];

const FORBIDDEN = [
  /100\+/,
  /Properties under care/,
  /24\/7/,
  /guaranteed occupancy/i,
  /time-to-let/i,
  /guaranteed rent/i,
  /MagicBricks/i,
  /99acres/i,
  /Housing\.com/i,
  /NoBroker/i,
  /4\.9\s*\/\s*5/,
  /\b38 properties\b/i,
  /Velachery/,
  /\bOMR\b/,
  /Adyar/,
  /12\/12/,
];

describe("AEO production copy", () => {
  it("does not publish forbidden claims", () => {
    for (const relative of PRODUCTION_FILES) {
      const source = readFileSync(path.join(process.cwd(), relative), "utf8");
      for (const pattern of FORBIDDEN) {
        expect(source, `${relative} ${pattern}`).not.toMatch(pattern);
      }
    }
  });
});

describe("homepage stats", () => {
  it("replaces the inaccurate portfolio count with the starting price", () => {
    const source = readFileSync(
      path.join(process.cwd(), "src/app/HomePageContent.tsx"),
      "utf8",
    );
    expect(source).not.toContain("100+");
    expect(source).not.toContain("Properties under care");
    expect(source).toContain('value: "₹16,000"');
    expect(source).toContain("Annual plans starting from");
    expect(source).toContain("Exact scope depends on the property and plan.");
    expect(source).not.toContain("4.9");
    expect(source).not.toContain("Velachery");
    expect(source).not.toContain("12/12");
    expect(source).toContain("Sample portfolio — illustrative only");
    expect(source).toContain("Example property");
  });
});
