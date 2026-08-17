/**
 * Canonical site URL for sitemaps, robots, Open Graph, and JSON-LD.
 *
 * Production host is the apex domain. Vercel already redirects
 * https://www.relybricks.com → https://relybricks.com.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel to https://relybricks.com, or leave it unset
 * so this default is used. Do not set it to the www host.
 */
export const DEFAULT_SITE_URL = "https://relybricks.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** Site-relative path starting with `/`. Home is `/`. */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Absolute URL on the canonical host. Home is `https://relybricks.com/` (trailing slash). */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalised = canonicalPath(path);
  return normalised === "/" ? `${base}/` : `${base}${normalised}`;
}
