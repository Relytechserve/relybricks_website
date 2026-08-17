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
    "Property management services in Chennai for apartments, villas, bungalows and plots — tenants, vacant-home care, maintenance, inspections and bills. Plans from ₹16,000/year.",
  path: HUB_PATH,
};

export const HUB_H1 = "Property Management Services in Chennai";

export const HUB_OPENING =
  "RelyBricks provides property management services in Chennai for apartments, villas, bungalows and plots. The local team can manage tenant sourcing and the wider tenancy lifecycle, coordinate maintenance and emergencies, inspect properties with photo and video reports, and handle utility bills, taxes and community payments. Vacant homes can be visited and maintained to the agreed scope; land and plots are looked after separately. Owners who live in Chennai, elsewhere in India, or overseas work with one accountable local team. Cleaning, pest control, refurbishment support and buying or selling assistance are available where needed. Annual subscription plans currently start from ₹16,000/year.";

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
    title: "Land, plots, cleaning and extra support",
    description:
      "Plot care as a separate line; scheduled cleaning and pest control; refurbishment support and buying or selling assistance when you need them.",
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
      "Tenant sourcing and the tenancy lifecycle, vacant residential care, maintenance and emergency coordination, bills, taxes and community payments, inspections with photo and video reports, cleaning and pest control, land and plot care, plus refurbishment support and buying or selling assistance when required.",
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
      "Annual plans currently start from ₹16,000/year. Scope depends on the property and the plan. Current inclusions are on the services page.",
  },
  {
    question: "How do I start?",
    answer:
      "Call +91 99520 04948 or share details on the contact page. RelyBricks has said it will propose a clear plan within one business day.",
  },
];

export const HUB_RELATED: RelatedLinkItem[] = [
  {
    title: "Managing a Chennai home from abroad",
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
    title: "Current plans and inclusions",
    description: "See what Basic, Gold and Premium cover.",
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
