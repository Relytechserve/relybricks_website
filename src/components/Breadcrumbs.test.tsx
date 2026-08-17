import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import Breadcrumbs from "@/components/Breadcrumbs";
import ContentPage from "@/components/content/ContentPage";

describe("Breadcrumbs", () => {
  it("renders a visible trail and BreadcrumbList schema once", () => {
    const html = renderToString(
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "[TEST] Example page", path: "/services" },
        ]}
      />,
    );

    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/"');
    expect(html).toContain("[TEST] Example page");
    expect(html).not.toContain('href="/services"');
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("https://relybricks.com/services");
  });
});

describe("ContentPage breadcrumbs", () => {
  it("renders a single breadcrumb trail when breadcrumbs are provided", () => {
    const html = renderToString(
      <ContentPage
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "[TEST] Shell", path: "/aboutus" },
        ]}
      >
        <p>[TEST] Page body</p>
      </ContentPage>,
    );

    expect(html.match(/aria-label="Breadcrumb"/g)).toHaveLength(1);
    expect(html.match(/BreadcrumbList/g)).toHaveLength(1);
    expect(html).toContain("[TEST] Page body");
  });
});
