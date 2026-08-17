import { getSiteUrl } from "./site";

/** Public authority URLs currently published. Do not list unpublished AEO routes. */
export const LLMS_CORE_PATHS = ["/", "/services", "/aboutus", "/contact"] as const;

export function buildLlmsTxt(base = getSiteUrl()): string {
  const urls = LLMS_CORE_PATHS.map((path) =>
    path === "/" ? `${base}/` : `${base}${path}`,
  );

  return `# RelyBricks

> RelyBricks is a property management company in Chennai, India, serving NRIs, overseas owners, out-of-station homeowners and local professionals.

## Core pages
${urls.map((url) => `- ${url}`).join("\n")}

## Services
RelyBricks supports tenant lifecycle management, property inspections, maintenance coordination, payments, remote reporting, refurbishment, buying/selling support and land/plot care.

## Contact
- Website: ${base}
- Email: info@relybricks.com
- Phone: +91 99520 04948
`;
}
