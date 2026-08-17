import { describe, expect, it } from "vitest";
import { HOME_FAQ } from "./home-faq";

describe("HOME_FAQ", () => {
  it("covers the approved customer questions without extra schema-only items", () => {
    expect(HOME_FAQ.map((item) => item.question)).toEqual([
      "What does RelyBricks manage?",
      "Can RelyBricks manage my Chennai property while I live abroad?",
      "What property types does RelyBricks manage?",
      "Can RelyBricks manage tenants and maintenance?",
      "How much do property management plans start from?",
    ]);
  });

  it("uses verified published facts in answers", () => {
    const blob = HOME_FAQ.map((item) => item.answer).join(" ");
    expect(blob).toContain("Chennai");
    expect(blob).toContain("apartments, villas, bungalows and plots");
    expect(blob).toContain("₹16,000/year");
    expect(blob).not.toMatch(/#1|leading|best property/i);
  });
});
