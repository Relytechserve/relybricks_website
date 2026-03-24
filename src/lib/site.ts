/**
 * Canonical site URL for sitemaps, robots, Open Graph, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.relybricks.com) to match your live domain.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.relybricks.com";
  return raw.replace(/\/$/, "");
}
