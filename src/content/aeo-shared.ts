import type { BreadcrumbItem } from "@/lib/jsonld";
import type { StatItem } from "@/components/content/types";

export const HUB_PATH = "/property-management-chennai";
export const NRI_PATH = "/nri-property-management-chennai";
export const TENANT_PATH = "/tenant-management-chennai";

export const HUB_CRUMB: BreadcrumbItem = {
  name: "Property Management in Chennai",
  path: HUB_PATH,
};

export const HOME_CRUMB: BreadcrumbItem = { name: "Home", path: "/" };

export const AEO_STATS: StatItem[] = [
  {
    value: "10+",
    label: "Years of experience",
    hint: "Serving local and overseas owners in Chennai",
  },
  {
    value: "< 24h",
    label: "Average response time",
    hint: "Most issues acknowledged within a day — not a repair deadline",
  },
  {
    value: "₹16,000",
    label: "Annual plans starting from",
    hint: "Exact scope depends on the property and plan.",
  },
];
