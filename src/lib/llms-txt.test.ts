import { describe, expect, it } from "vitest";
import { LLMS_CORE_PATHS, buildLlmsTxt } from "./llms-txt";

describe("llms.txt", () => {
  const body = buildLlmsTxt("https://relybricks.com");

  it("lists only current core authority URLs", () => {
    expect([...LLMS_CORE_PATHS]).toEqual([
      "/",
      "/property-management-chennai",
      "/nri-property-management-chennai",
      "/tenant-management-chennai",
      "/services",
      "/aboutus",
      "/contact",
    ]);
    expect(body).toContain("https://relybricks.com/");
    expect(body).toContain("https://relybricks.com/property-management-chennai");
    expect(body).toContain("https://relybricks.com/nri-property-management-chennai");
    expect(body).toContain("https://relybricks.com/tenant-management-chennai");
    expect(body).toContain("https://relybricks.com/services");
    expect(body).toContain("https://relybricks.com/aboutus");
    expect(body).toContain("https://relybricks.com/contact");
  });

  it("omits referral and unpublished AEO routes", () => {
    expect(body).not.toContain("/referral");
    expect(body).not.toContain("property-maintenance-chennai");
    expect(body).not.toContain("property-inspection-chennai");
    expect(body).not.toContain("property-management-cost-chennai");
    expect(body).not.toContain("manage-property-in-chennai-from-abroad");
  });

  it("includes verified contact details", () => {
    expect(body).toContain("info@relybricks.com");
    expect(body).toContain("+91 99520 04948");
    expect(body).toContain("Chennai");
  });
});
