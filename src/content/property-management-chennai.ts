import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type {
  AudienceItem,
  FeatureItem,
  ProcessStep,
  RelatedLinkItem,
} from "@/components/content/types";
import { HOME_CRUMB, HUB_CRUMB, HUB_PATH, NRI_PATH, TENANT_PATH } from "./aeo-shared";

export const HUB_METADATA = {
  title: "Property Management in Chennai | RelyBricks",
  description:
    "End-to-end property management in Chennai for apartments, villas and bungalows — 12% of annual rental value, minimum ₹21,000/year + applicable GST.",
  path: HUB_PATH,
};

export const HUB_H1 = "Property Management Services in Chennai";

export const HUB_OPENING =
  "RelyBricks provides end-to-end property management in Chennai for apartments, villas and bungalows. The local team manages tenant sourcing and the tenancy lifecycle, coordinates maintenance and emergencies, inspects properties with photo and video reports, and handles utility bills, taxes and community payments. Vacant homes receive oversight to the agreed scope; land and plots are quoted separately. Owners in Chennai, elsewhere in India or overseas work with one accountable team. Management is priced at 12% of annual rental value, subject to a minimum annual fee of ₹21,000 + applicable GST.";

export const HUB_BREADCRUMBS: BreadcrumbItem[] = [HOME_CRUMB, HUB_CRUMB];

export const HUB_FEATURES: FeatureItem[] = [
  {
    title: "Tenant sourcing and tenancy",
    description:
      "Help finding prospective tenants, then screening, onboarding, rent collection and renewals. Detail lives on the tenant-management page.",
  },
  {
    title: "Maintenance, repairs and emergencies",
    description:
      "Day-to-day upkeep and emergency coordination with verified vendors.",
  },
  {
    title: "Inspections and photo/video reporting",
    description:
      "Visits with photos, videos and condition notes. Frequency follows the agreed plan.",
  },
  {
    title: "Bills, taxes and community payments",
    description:
      "Utilities, taxes and association charges so they are not missed.",
  },
  {
    title: "Vacant property care",
    description:
      "If a flat, villa or bungalow is unoccupied, RelyBricks can carry out visits and coordinate cleaning, maintenance and other property-care requirements based on the agreed management scope.",
  },
  {
    title: "Land, plots and project coordination",
    description:
      "Plot care is separately scoped; refurbishment and buying or selling assistance when you need them. Property works are managed separately.",
  },
];

export const HUB_AUDIENCE: AudienceItem[] = [
  {
    title: "Owners who live in Chennai",
    body: "Tenants, vendors and bills handled without every issue becoming your evening job.",
  },
  {
    title: "Owners who live elsewhere in India",
    body: "Someone on the ground for visits, repairs and tenant follow-up.",
  },
  {
    title: "Owners who live overseas",
    body: "Local oversight and digital reports, whether the home is let or vacant.",
  },
  {
    title: "Owners of mixed property types",
    body: "Apartments, villas, bungalows and plots under one local team.",
  },
];

export const HUB_STEPS: ProcessStep[] = [
  {
    title: "Understand and onboard",
    body: "Documents are reviewed, the property is visited, and your goals are agreed.",
  },
  {
    title: "Prepare and position",
    body: "Cleaning, minor fixes and styling so the home is ready for a tenant, a sale, or vacant care.",
  },
  {
    title: "Manage day to day",
    body: "Tenants or vacancy, issues, bills and vendors through one team.",
  },
  {
    title: "Report and improve",
    body: "Photos, reports and suggestions so you know the state of the asset.",
  },
];

export const HUB_FAQS: FaqItem[] = [
  {
    question: "What does property management in Chennai involve?",
    answer:
      "A local team coordinates tenants or vacant-home care, repairs, inspections and recurring payments for a property you own. RelyBricks does that work in Chennai and reports back with photos and a single point of contact.",
  },
  {
    question: "What does RelyBricks manage?",
    answer:
      "Tenant sourcing and the tenancy lifecycle, vacant residential care, maintenance coordination, bills, taxes and community payments, inspections with photo and video reports, and owner reporting. Land and plot care, refurbishment and buying or selling assistance are scoped separately.",
  },
  {
    question: "Can someone living outside Chennai use this?",
    answer:
      "Yes. The service is for owners in the city, elsewhere in India, or overseas. You do not need friends or parents to chase vendors.",
  },
  {
    question: "Can RelyBricks find tenants and coordinate maintenance?",
    answer:
      "Yes. RelyBricks can source prospective tenants and then handle screening, onboarding, rent collection and renewals. Maintenance covers upkeep, emergency coordination and work with verified vendors. The full tenancy sequence is on the tenant-management page.",
  },
  {
    question: "Can you manage a vacant flat, villa or bungalow?",
    answer:
      "Yes. Vacant residential properties are managed to the customer’s requirements — visits, cleaning, maintenance and other agreed care. That is separate from land and plot management. Visit frequency is not a single standard; it follows the plan.",
  },
  {
    question: "What property types are supported?",
    answer:
      "Apartments, villas, bungalows and plots in Chennai.",
  },
  {
    question: "How much does it cost?",
    answer:
      "RelyBricks charges 12% of your property's annual rental value, subject to a minimum annual management fee of ₹21,000 + applicable GST. See the property management cost guide for examples.",
  },
  {
    question: "How do I start?",
    answer:
      "Call +91 99520 04948 or share details on the contact page. RelyBricks has said it will propose a clear plan within one business day.",
  },
];

export const HUB_RELATED: RelatedLinkItem[] = [
  {
    title: "Property management cost in Chennai",
    description: "How fees are structured and what affects total cost.",
    href: "/property-management-cost-chennai",
  },
  {
    title: "Managing a Chennai home from abroad",
    description: "A practical guide for overseas and out-of-station owners.",
    href: "/manage-property-in-chennai-from-abroad",
  },
  {
    title: "NRI property management in Chennai",
    description:
      "Local oversight, photos and reporting for owners who live overseas.",
    href: NRI_PATH,
  },
  {
    title: "Tenant management for rental homes",
    description:
      "Sourcing, screening, onboarding, rent collection and renewals.",
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
  {
    title: "Share your property details",
    description: "Tell us the property type and whether it is tenanted or vacant.",
    href: "/contact",
  },
];

export const HUB_SERVICE = {
  name: "Property management in Chennai",
  description:
    "Property management services in Chennai for apartments, villas, bungalows and plots, including tenant management, vacant-home care, maintenance, inspections and bills.",
  path: HUB_PATH,
  serviceType: "Property management",
};
