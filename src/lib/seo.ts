import type { Metadata } from "next";
import { canonicalPath } from "./site";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. `/services` or `/`. */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * App Router metadata helper for new AEO/content pages.
 * Existing pages keep their current `export const metadata` objects.
 */
export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
    },
  };
}
