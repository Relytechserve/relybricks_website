import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import PageHero from "./PageHero";

describe("PageHero", () => {
  it("renders exactly one H1 and crawlable direct-answer copy", () => {
    const html = renderToString(
      <PageHero
        eyebrow="[TEST] Example eyebrow"
        title="[TEST] Example H1"
        answer="[TEST] Example direct answer for crawlers."
        supporting="[TEST] Optional supporting line."
        primaryCta={{ href: "tel:+919952004948", label: "[TEST] Call" }}
        secondaryCta={{ href: "/contact", label: "[TEST] Contact" }}
      />,
    );

    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain("[TEST] Example H1");
    expect(html).toContain("[TEST] Example direct answer for crawlers.");
    expect(html).toContain("[TEST] Optional supporting line.");
    expect(html).toContain("tel:+919952004948");
    expect(html).toContain('href="/contact"');
  });
});
