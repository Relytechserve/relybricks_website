import type { BreadcrumbItem } from "@/lib/jsonld";
import type { StatItem } from "@/components/content/types";
import {
  GST_LABEL,
  MANAGEMENT_FEE_RATE_PERCENT,
  MINIMUM_ANNUAL_MANAGEMENT_FEE_INR,
  PRICING_CORE_ANSWER,
  formatInr,
} from "@/lib/pricing";

export const HUB_PATH = "/property-management-chennai";
export const NRI_PATH = "/nri-property-management-chennai";
export const TENANT_PATH = "/tenant-management-chennai";
export const COST_PATH = "/property-management-cost-chennai";
export const ABROAD_PATH = "/manage-property-in-chennai-from-abroad";

/** ISO date for informational pages — update when facts are re-verified. */
export const AEO_INFO_DATE_PUBLISHED = "2026-08-27";
export const AEO_INFO_DATE_REVIEWED = "2026-08-27";
export const AEO_INFO_LAST_REVIEWED_LABEL = "August 2026";
export const AEO_INFO_PUBLISHER = "RelyBricks Property Management";

export const HUB_CRUMB: BreadcrumbItem = {
  name: "Property Management in Chennai",
  path: HUB_PATH,
};

export const COST_CRUMB: BreadcrumbItem = {
  name: "Property Management Cost in Chennai",
  path: COST_PATH,
};

export const ABROAD_CRUMB: BreadcrumbItem = {
  name: "Managing Property From Abroad",
  path: ABROAD_PATH,
};

export const HOME_CRUMB: BreadcrumbItem = { name: "Home", path: "/" };

export const AEO_STATS: StatItem[] = [
  {
    value: "10+",
    label: "Years of experience",
    hint: "Serving local and overseas owners in Chennai",
  },
  {
    value: `${MANAGEMENT_FEE_RATE_PERCENT}%`,
    label: "Of annual rental value",
    hint: `Minimum ${formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)}/year + ${GST_LABEL}`,
  },
  {
    value: "< 24h",
    label: "Average response time",
    hint: "Most issues acknowledged within a day — not a repair deadline",
  },
];

export const PUBLIC_PRICING_SUMMARY = PRICING_CORE_ANSWER;
