import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Private portal and auth routes — must stay disallowed for all listed agents. */
export const ROBOTS_DISALLOW = [
  "/dashboard",
  "/dashboard/",
  "/login",
  "/register",
  "/auth/",
] as const;

/** AI search crawlers (not training crawlers). GPTBot and ClaudeBot are intentionally omitted. */
export const AI_SEARCH_USER_AGENTS = [
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
] as const;

function crawlRules(userAgent: string) {
  return {
    userAgent,
    allow: "/",
    disallow: [...ROBOTS_DISALLOW],
  };
}

export function buildRobots(base = getSiteUrl()): MetadataRoute.Robots {
  return {
    rules: [
      crawlRules("*"),
      ...AI_SEARCH_USER_AGENTS.map((agent) => crawlRules(agent)),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

export default function robots(): MetadataRoute.Robots {
  return buildRobots();
}
