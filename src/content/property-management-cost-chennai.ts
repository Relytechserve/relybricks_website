import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type {
  ComparisonColumn,
  ComparisonRow,
  RelatedLinkItem,
} from "@/components/content/types";
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
  title: "Property Management Cost in Chennai: Pricing Models Explained | RelyBricks",
  description:
    "How property management is priced in Chennai: subscription plans, rent-based fees, tenant placement, inspections and add-ons. RelyBricks plans from ₹16,000/year — scope depends on property and plan.",
  path: COST_PATH,
};

export const COST_H1 = "How much does property management cost in Chennai?";

export const COST_OPENING =
  "Property management in Chennai is usually priced in more than one way. Some owners pay a flat annual subscription for an agreed bundle of visits, coordination and reporting. Others encounter percentage-of-rent arrangements, tenant-placement fees, per-inspection charges, maintenance coordination markups, or one-off work such as deep cleaning or refurbishment. Total cost depends on whether the home is tenanted or vacant, the property type, how often inspections are required, and how much tenant, bill and emergency coordination you need. RelyBricks currently uses annual subscription pricing starting from ₹16,000/year; exact scope depends on the property and plan (Basic, Gold or Premium — see the services page).";

export const COST_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_CRUMB,
  HUB_CRUMB,
  { name: "Property Management Cost in Chennai", path: COST_PATH },
];

export const COST_COMPARISON_COLUMNS: ComparisonColumn[] = [
  { key: "subscription", header: "Flat annual subscription (typical pattern)" },
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
      relybricks: "Annual subscription; from ₹16,000/year",
    },
  },
  {
    id: "cost_predictability",
    label: "Cost predictability",
    values: {
      subscription: "Base fee often fixed for the contract year",
      rent_percent: "Moves with rent; may change if rent changes",
      relybricks: "Annual subscription with scope defined by property and plan",
    },
  },
  {
    id: "typical_inclusions",
    label: "Typical inclusions",
    values: {
      subscription: "Varies — visits, coordination, reporting often bundled",
      rent_percent: "Varies — sometimes narrow (rent collection only)",
      relybricks:
        "Tenant/vacant care, maintenance coordination, inspections, bills — per plan",
    },
  },
  {
    id: "tenant_sourcing",
    label: "Tenant sourcing",
    values: {
      subscription: "May be included or charged separately",
      rent_percent: "May be a separate placement fee",
      relybricks:
        "Sourcing via own network, marketplace listings, partners, brokers",
    },
  },
  {
    id: "inspections",
    label: "Inspections",
    values: {
      subscription: "Often plan-based visit schedule",
      rent_percent: "Not always included",
      relybricks: "Photo/video inspections; frequency per plan",
    },
  },
  {
    id: "maintenance",
    label: "Maintenance",
    values: {
      subscription: "Coordination often included; repairs usually extra",
      rent_percent: "Varies by provider",
      relybricks: "Coordinated with verified vendors; owner approves decisions",
    },
  },
  {
    id: "vacant_property",
    label: "Vacant property",
    values: {
      subscription: "Often available as scoped care",
      rent_percent: "Less commonly the primary model",
      relybricks: "Vacant residential visits and upkeep per agreed scope",
    },
  },
  {
    id: "plot_land",
    label: "Plot / land",
    values: {
      subscription: "Sometimes a separate product",
      rent_percent: "Uncommon as rent-% model",
      relybricks: "Plot/land care separate from occupied homes",
    },
  },
  {
    id: "extra_fees",
    label: "Extra fees",
    values: {
      subscription: "Add-ons, pay-and-use, one-off projects",
      rent_percent: "Placement, inspections, markups may apply",
      relybricks: "Pay-and-use via partner network; scope-dependent",
    },
  },
  {
    id: "published_price_list",
    label: "Published price list",
    values: {
      subscription: "Provider-specific",
      rent_percent: "Provider-specific",
      relybricks: "Starting price only; full quote after property review",
    },
  },
  {
    id: "best_suited_when",
    label: "Often chosen when",
    values: {
      subscription: "Owners want a bundled scope with a stated base fee",
      rent_percent: "Fee is tied to rent and inclusions are clear",
      relybricks:
        "Local, out-of-station and overseas owners want one Chennai team",
    },
  },
];

export const COST_FAQS: FaqItem[] = [
  {
    question: "Is property management in Chennai always a monthly fee?",
    answer:
      "No. Providers use annual subscriptions, rent-linked fees, placement charges, per-visit fees, and one-off project billing. RelyBricks uses annual subscription pricing starting from ₹16,000/year.",
  },
  {
    question: "What is usually included in an annual subscription?",
    answer:
      "It varies by provider. RelyBricks subscriptions can cover coordination for tenants or vacancy, maintenance, inspections with photo and video, bills, taxes and community payments, and plan-tier cleaning and pest control — confirm inclusions for your tier on the services page.",
  },
  {
    question: "Does RelyBricks charge a percentage of rent?",
    answer:
      "RelyBricks publishes subscription pricing from ₹16,000/year on its site. It does not publish a percentage-of-rent price list. Ask for a written quote for your property.",
  },
  {
    question: "Why do two quotes for the same flat differ so much?",
    answer:
      "Different scopes (tenant sourcing vs visits only), visit frequency, bill handling, emergency coordination, and add-ons change the workload and price.",
  },
  {
    question: "Is tenant finding included in the starting price?",
    answer:
      "Tenant sourcing and lifecycle work are part of RelyBricks tenant management scope, but final price depends on property and plan. Confirm what your quote includes.",
  },
  {
    question: "Are maintenance repairs included in the subscription?",
    answer:
      "Coordination is part of management; repair costs are typically paid to vendors (sometimes via pay-and-use). Owners approve work that needs a decision.",
  },
  {
    question: "Does a vacant flat cost the same as a tenanted one?",
    answer:
      "Not necessarily. Vacant homes need visit-led care and preparation; tenanted homes need tenant communication and rent follow-up. Scope drives price.",
  },
  {
    question: "How do I get an exact price from RelyBricks?",
    answer:
      "Call +91 99520 04948 or submit details on the contact page. A plan is proposed within one business day, per current site copy.",
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
    title: "Current plans and inclusions",
    description: "See what Basic, Gold and Premium cover.",
    href: "/services",
  },
  {
    title: "How RelyBricks started",
    description: "Built by homeowners who moved abroad.",
    href: "/aboutus",
  },
];
