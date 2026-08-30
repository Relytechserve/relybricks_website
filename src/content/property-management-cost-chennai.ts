import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type {
  ComparisonColumn,
  ComparisonRow,
  RelatedLinkItem,
} from "@/components/content/types";
import {
  GST_LABEL,
  MANAGEMENT_FEE_RATE_PERCENT,
  MINIMUM_ANNUAL_MANAGEMENT_FEE_INR,
  PRICING_EXAMPLE_ROWS,
  PROJECT_MANAGEMENT_FEE_RATE_PERCENT,
  PROJECT_VALUE_DEFINITION,
  formatInr,
  getPricingExampleRow,
} from "@/lib/pricing";
import {
  ABROAD_PATH,
  COST_PATH,
  HOME_CRUMB,
  HUB_CRUMB,
  HUB_PATH,
  NRI_PATH,
  TENANT_PATH,
} from "./aeo-shared";

export const COST_METADATA = {
  title: "Property Management Cost in Chennai: Pricing Explained | RelyBricks",
  description:
    "RelyBricks charges 12% of annual rental value for end-to-end property management in Chennai, minimum ₹21,000/year + applicable GST. Examples, calculator and how project works are priced separately.",
  path: COST_PATH,
};

export const COST_H1 = "How much does property management cost in Chennai?";

export const COST_OPENING = `RelyBricks charges ${MANAGEMENT_FEE_RATE_PERCENT}% of your property's annual rental value for end-to-end property management in Chennai, subject to a minimum annual management fee of ${formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)} + ${GST_LABEL}. The fee is calculated as monthly rental value × 12 × ${MANAGEMENT_FEE_RATE_PERCENT}%. Tenant sourcing, inspections, maintenance coordination, bills and owner reporting are included in that management fee. Actual property works, vendor costs and taxes are separate. Project management for agreed works is ${PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + ${GST_LABEL}.`;

export const COST_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_CRUMB,
  HUB_CRUMB,
  { name: "Property Management Cost in Chennai", path: COST_PATH },
];

export const COST_COMPARISON_COLUMNS: ComparisonColumn[] = [
  { key: "subscription", header: "Flat annual fee (typical pattern)" },
  { key: "rent_percent", header: "Percentage of rent (typical pattern)" },
  { key: "relybricks", header: "RelyBricks (public information)" },
];

export const COST_COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "fee_basis",
    label: "Fee basis",
    values: {
      subscription: "Fixed annual or stated contract fee",
      rent_percent: "Fee linked to monthly rent collected",
      relybricks: `${MANAGEMENT_FEE_RATE_PERCENT}% of annual rental value; minimum ${formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)}/year`,
    },
  },
  {
    id: "cost_predictability",
    label: "Cost predictability",
    values: {
      subscription: "Base fee often fixed for the contract year",
      rent_percent: "Moves with rent; may change if rent changes",
      relybricks: "Fixed for the agreed management term; recalculated at renewal",
    },
  },
  {
    id: "typical_inclusions",
    label: "Typical inclusions",
    values: {
      subscription: "Varies — visits, coordination, reporting often bundled",
      rent_percent: "Varies — sometimes narrow (rent collection only)",
      relybricks:
        "End-to-end management: tenants, inspections, maintenance coordination, bills, reporting",
    },
  },
  {
    id: "tenant_sourcing",
    label: "Tenant sourcing",
    values: {
      subscription: "May be included or charged separately",
      rent_percent: "May be a separate placement fee",
      relybricks: "Included in the annual management fee",
    },
  },
  {
    id: "property_works",
    label: "Property works",
    values: {
      subscription: "Often billed as add-ons",
      rent_percent: "Usually separate from management %",
      relybricks: `Separate — project management ${PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + ${GST_LABEL}`,
    },
  },
  {
    id: "vacant_property",
    label: "Vacant property",
    values: {
      subscription: "Often available as scoped care",
      rent_percent: "Less commonly the primary model",
      relybricks: "Fee based on agreed expected monthly rental value; minimum applies",
    },
  },
  {
    id: "plot_land",
    label: "Plot / land",
    values: {
      subscription: "Sometimes a separate product",
      rent_percent: "Uncommon as rent-% model",
      relybricks: "Separately scoped and quoted — not automatic 12%",
    },
  },
];

export const COST_FAQS: FaqItem[] = [
  {
    question: "How does RelyBricks calculate the annual management fee?",
    answer:
      "Monthly rental value × 12 × 12%, subject to a minimum annual management fee of ₹21,000 + applicable GST. For vacant homes, use the agreed expected monthly rental value.",
  },
  {
    question: "What is included in the annual management fee?",
    answer:
      "End-to-end property management and coordination: tenant sourcing and lifecycle, inspections with photos and video, maintenance coordination, bills and owner reporting, and vacant-property oversight. Vendor labour, materials, utilities, taxes and statutory charges are separate.",
  },
  {
    question: "How are property works priced?",
    answer:
      `Actual repairs, maintenance, refurbishment and improvement works are separate. RelyBricks project management is ${PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + applicable GST. Project value means ${PROJECT_VALUE_DEFINITION}`,
  },
  {
    question: "Does the fee change if my tenant leaves mid-year?",
    answer:
      "The annual management fee remains unchanged during the agreed management term because management continues during vacancy.",
  },
  {
    question: "What happens at renewal?",
    answer:
      "The management fee can be recalculated based on rental value at renewal.",
  },
  {
    question: "How do multiple properties work?",
    answer:
      "Each property is calculated separately. Portfolio pricing may be agreed separately — there is no fixed published portfolio discount.",
  },
  {
    question: "How do plots and land work?",
    answer:
      "The 12% annual rental value formula does not apply automatically. Plot and land care is separately scoped and quoted.",
  },
  {
    question: "How do I get an exact quote from RelyBricks?",
    answer:
      "Call +91 99520 04948 or submit details on the contact page. A written scope is proposed within one business day, per current site copy.",
  },
];

export const COST_RELATED: RelatedLinkItem[] = [
  {
    title: "Property management services in Chennai",
    description: "The full service set for local and overseas owners.",
    href: HUB_PATH,
  },
  {
    title: "Managing a Chennai home from abroad",
    description: "A practical guide for overseas and out-of-station owners.",
    href: ABROAD_PATH,
  },
  {
    title: "NRI property management in Chennai",
    description: "Local oversight, photos and reporting while you live overseas.",
    href: NRI_PATH,
  },
  {
    title: "Tenant management for rental homes",
    description: "Sourcing, screening, rent collection and renewals.",
    href: TENANT_PATH,
  },
  {
    title: "What the management fee includes",
    description: "End-to-end property management on the services page.",
    href: "/services",
  },
  {
    title: "How RelyBricks started",
    description: "Built by homeowners who moved abroad.",
    href: "/aboutus",
  },
];

export const COST_PRICING_EXAMPLES = PRICING_EXAMPLE_ROWS.map((monthly) =>
  getPricingExampleRow(monthly),
).filter((row): row is NonNullable<typeof row> => row !== null);
