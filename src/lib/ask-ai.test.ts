import { describe, expect, it } from "vitest";
import { ASK_AI_PROMPT, ASK_AI_PROVIDERS, buildAskAiLinks } from "@/lib/ask-ai";

describe("ask-ai", () => {
  it("builds provider links with the RelyBricks starter prompt", () => {
    const links = buildAskAiLinks();
    expect(links).toHaveLength(ASK_AI_PROVIDERS.length);
    expect(links[0]?.href).toContain(encodeURIComponent(ASK_AI_PROMPT));
    expect(ASK_AI_PROMPT).toContain("property-management-cost-chennai");
    expect(ASK_AI_PROMPT).toContain("/contact");
    expect(ASK_AI_PROMPT).toContain("+91 99520 04948");
    expect(links.map((link) => link.id)).toEqual([
      "chatgpt",
      "claude",
      "perplexity",
      "google-ai",
      "grok",
    ]);
  });

  it("targets the expected assistant domains", () => {
    const links = buildAskAiLinks();
    expect(links.find((link) => link.id === "chatgpt")?.href).toMatch(
      /^https:\/\/chatgpt\.com\/\?q=/,
    );
    expect(links.find((link) => link.id === "claude")?.href).toMatch(
      /^https:\/\/claude\.ai\/new\?q=/,
    );
    expect(links.find((link) => link.id === "perplexity")?.href).toMatch(
      /^https:\/\/www\.perplexity\.ai\/search\?q=/,
    );
    expect(links.find((link) => link.id === "google-ai")?.href).toMatch(
      /^https:\/\/www\.google\.com\/search\?udm=50&q=/,
    );
    expect(links.find((link) => link.id === "grok")?.href).toMatch(/^https:\/\/grok\.com\/\?q=/);
  });
});
