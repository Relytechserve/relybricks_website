import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import FaqList from "./FaqList";

const EXAMPLE_FAQ = [
  {
    question: "[TEST] What is this example question?",
    answer: "[TEST] This is example FAQ copy for tests only.",
  },
  {
    question: "[TEST] Is schema optional?",
    answer: "[TEST] Schema is emitted only when includeSchema is true.",
  },
];

function parseJsonLd(html: string) {
  const match = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  );
  return match ? JSON.parse(match[1]) : null;
}

describe("FaqList", () => {
  it("renders crawlable questions and answers without client JavaScript", () => {
    const html = renderToString(<FaqList items={EXAMPLE_FAQ} />);
    expect(html).toContain("[TEST] What is this example question?");
    expect(html).toContain("[TEST] This is example FAQ copy for tests only.");
    expect(html).toContain("<dl");
    expect(html).not.toContain("application/ld+json");
  });

  it("does not emit FAQPage schema unless includeSchema is true", () => {
    const html = renderToString(<FaqList items={EXAMPLE_FAQ} />);
    expect(parseJsonLd(html)).toBeNull();
  });

  it("matches visible Q&A to FAQPage JSON-LD when schema is enabled", () => {
    const html = renderToString(
      <FaqList items={EXAMPLE_FAQ} includeSchema />,
    );
    const data = parseJsonLd(html);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(EXAMPLE_FAQ.length);
    data.mainEntity.forEach(
      (entity: { name: string; acceptedAnswer: { text: string } }, index: number) => {
        expect(entity.name).toBe(EXAMPLE_FAQ[index].question);
        expect(entity.acceptedAnswer.text).toBe(EXAMPLE_FAQ[index].answer);
        expect(html).toContain(EXAMPLE_FAQ[index].question);
        expect(html).toContain(EXAMPLE_FAQ[index].answer);
      },
    );
  });
});
