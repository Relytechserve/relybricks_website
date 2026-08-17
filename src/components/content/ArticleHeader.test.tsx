import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArticleHeader from "./ArticleHeader";

describe("ArticleHeader", () => {
  it("renders semantic time elements for published and reviewed dates", () => {
    const html = renderToString(
      <ArticleHeader
        title="[TEST] Example guide title"
        description="[TEST] Example guide description."
        author="[TEST] Example author"
        datePublished="2026-08-17"
        dateReviewed="2026-08-17"
        readingTime="[TEST] 4 min"
      />,
    );

    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain("[TEST] Example guide title");
    expect(html).toMatch(/dateTime="2026-08-17"|datetime="2026-08-17"/);
    expect((html.match(/<time /g) ?? []).length).toBe(2);
    expect(html).not.toContain("Breadcrumb");
    expect(html).not.toContain("BreadcrumbList");
  });
});
