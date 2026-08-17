import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import RelatedLinks from "./RelatedLinks";

describe("RelatedLinks", () => {
  it("renders internal hrefs in server HTML", () => {
    const html = renderToString(
      <RelatedLinks
        items={[
          {
            title: "[TEST] Example guide",
            description: "[TEST] Placeholder related link.",
            href: "/services",
          },
        ]}
      />,
    );

    expect(html).toContain('href="/services"');
    expect(html).toContain("[TEST] Example guide");
    expect(html).toContain("[TEST] Placeholder related link.");
  });
});
