import { describe, expect, it } from "vitest";
import {
  AI_SEARCH_USER_AGENTS,
  ROBOTS_DISALLOW,
  buildRobots,
} from "@/app/robots";

describe("robots", () => {
  const robots = buildRobots("https://relybricks.com");
  const rules = Array.isArray(robots.rules) ? robots.rules : [robots.rules];

  it("points sitemap and host at the apex domain", () => {
    expect(robots.sitemap).toBe("https://relybricks.com/sitemap.xml");
    expect(robots.host).toBe("https://relybricks.com");
  });

  it("keeps portal and auth routes disallowed for * and AI search bots", () => {
    const agents = rules.map((rule) => rule.userAgent);
    expect(agents).toContain("*");
    expect(agents).toEqual(["*", ...AI_SEARCH_USER_AGENTS]);

    for (const rule of rules) {
      expect(rule.allow).toBe("/");
      expect(rule.disallow).toEqual([...ROBOTS_DISALLOW]);
    }
  });

  it("does not mention training crawlers", () => {
    const serialized = JSON.stringify(robots);
    expect(serialized).not.toContain("GPTBot");
    expect(serialized).not.toContain("ClaudeBot");
  });
});
