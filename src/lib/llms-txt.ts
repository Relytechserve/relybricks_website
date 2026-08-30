import { getSiteUrl } from "./site";

/** Public authority URLs currently published. Do not list unpublished AEO routes. */
export const LLMS_CORE_PATHS = [
  "/",
  "/property-management-chennai",
  "/nri-property-management-chennai",
  "/tenant-management-chennai",
  "/property-management-cost-chennai",
  "/manage-property-in-chennai-from-abroad",
  "/services",
  "/aboutus",
  "/contact",
] as const;

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

## Pricing
- End-to-end property management: 12% of annual rental value
- Minimum annual management fee: ₹21,000 + applicable GST
- Tenant sourcing and day-to-day property management are included in the management fee
- Property works and third-party costs are separate
- Project management for property works: 15% of project value + applicable GST

## Contact
- Website: ${base}
- Email: info@relybricks.com
- Phone: +91 99520 04948
`;
}
