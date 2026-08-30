import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type {
  AudienceItem,
  FeatureItem,
  ProcessStep,
  RelatedLinkItem,
} from "@/components/content/types";
import {
  HOME_CRUMB,
  HUB_CRUMB,
  HUB_PATH,
  NRI_PATH,
  TENANT_PATH,
} from "./aeo-shared";

export const TENANT_METADATA = {
  title: "Tenant Management in Chennai | RelyBricks",
  description:
    "RelyBricks sources tenants for Chennai rental homes, then handles screening, onboarding, rent collection, maintenance coordination and renewals — included in end-to-end property management.",
  path: TENANT_PATH,
};

export const TENANT_H1 = "Tenant management for rental homes in Chennai";

export const TENANT_OPENING =
  "RelyBricks manages the tenant lifecycle for rental homes in Chennai, including helping source prospective tenants through its own network, property marketplace listings, partners and brokers. After that, the team can screen candidates, coordinate onboarding and rental agreements, collect rent, handle tenant communication, and arrange maintenance coordination. When a tenancy continues or ends, RelyBricks can support renewals and relevant inspection reporting. Homes can be prepared with cleaning and minor repairs before a new occupant arrives. This is for apartments, villas and bungalows in Chennai, including for owners who live elsewhere. Tenant management is included in RelyBricks' end-to-end property management fee. Owners stay involved in decisions that need their approval, while day-to-day tenant follow-up sits with one local team.";

export const TENANT_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_CRUMB,
  HUB_CRUMB,
  { name: "Tenant Management", path: TENANT_PATH },
];

export const TENANT_STEPS: ProcessStep[] = [
  {
    title: "Prepare",
    body: "Cleaning, minor repairs and property readiness where required.",
  },
  {
    title: "Market & source",
    body: "RelyBricks can market the property and source prospective tenants through its own network, property marketplaces, partners and brokers.",
  },
  {
    title: "Screen",
    body: "Screen prospective tenants using the current RelyBricks process.",
  },
  {
    title: "Onboard",
    body: "Tenant onboarding and rental-agreement coordination.",
  },
  {
    title: "Manage",
    body: "Rent collection and follow-up, tenant communication and maintenance coordination.",
  },
  {
    title: "Renew or exit",
    body: "Renewal support and relevant inspection/reporting when occupancy changes.",
  },
];

export const TENANT_FEATURES: FeatureItem[] = [
  {
    title: "Property readiness",
    description:
      "Cleaning, minor repairs and styling before a new occupant, where required.",
  },
  {
    title: "Market and source",
    description:
      "Own network, marketplace listings, partners and brokers — channels chosen for the property.",
  },
  {
    title: "Screening",
    description:
      "Prospective tenants are screened using RelyBricks’ current process.",
  },
  {
    title: "Onboarding and agreements",
    description: "Onboarding and rental-agreement coordination.",
  },
  {
    title: "Rent, communication and repairs",
    description:
      "Collection and follow-up; tenant queries; maintenance coordination.",
  },
  {
    title: "Renewals and exit reporting",
    description:
      "Renewal support and inspection/reporting when occupancy changes.",
  },
];

export const TENANT_AUDIENCE: AudienceItem[] = [
  {
    title: "Owners of a let home in Chennai",
    body: "You want one team on tenant issues for an apartment, villa or bungalow.",
  },
  {
    title: "Owners whose home is empty",
    body: "You want help finding the next tenant and preparing the property.",
  },
  {
    title: "Owners living elsewhere",
    body: "You cannot take every tenant call yourself.",
  },
];

export const TENANT_FAQS: FaqItem[] = [
  {
    question: "What tenant services does RelyBricks provide?",
    answer:
      "Sourcing prospective tenants, screening, onboarding, rental-agreement coordination, rent collection, tenant communication, maintenance coordination, renewals, and inspection reporting when occupancy changes. Homes can be prepared before a new tenant arrives.",
  },
  {
    question: "Can RelyBricks help find a tenant?",
    answer:
      "Yes. RelyBricks can source prospective tenants through its own network, property marketplace listings, partners and brokers. The channels used depend on the property and the agreed approach. Prospective tenants then move through the relevant screening and onboarding process.",
  },
  {
    question: "How does screening work?",
    answer:
      "Screening is part of tenant management. The public site does not publish a fixed list of checks. Ask what documents and checks will be used for your property.",
  },
  {
    question: "Do you collect rent and follow up if it is late?",
    answer:
      "Yes. Tenant management and rent collection are part of end-to-end property management. Follow-up is part of managing the tenancy.",
  },
  {
    question: "Who does the tenant call when something breaks?",
    answer:
      "The RelyBricks team. Maintenance and emergency coordination uses verified vendors. The owner is updated and approves work that needs a decision.",
  },
  {
    question: "What happens at renewal?",
    answer:
      "Renewals are part of the tenant service. The local team handles the tenancy side; you decide terms you must approve.",
  },
  {
    question: "What if the home is vacant while you look for a tenant?",
    answer:
      "RelyBricks can prepare the property (cleaning and minor repairs) and run sourcing in parallel. Wider vacant-home oversight — visits and upkeep while you are not letting — is part of the main property-management service.",
  },
  {
    question: "Can you manage tenants if I do not live in Chennai?",
    answer:
      "Yes. The same Chennai team handles tenant work for owners living elsewhere or overseas. For remote oversight of tenanted or vacant homes, see NRI property management.",
  },
];

export const TENANT_RELATED: RelatedLinkItem[] = [
  {
    title: "Property management services in Chennai",
    description: "The broader service set, including vacant-home care.",
    href: HUB_PATH,
  },
  {
    title: "If you live abroad",
    description: "Local oversight for tenanted or vacant homes.",
    href: NRI_PATH,
  },
  {
    title: "Property management pricing",
    description: "How the annual management fee is calculated.",
    href: "/services",
  },
  {
    title: "How RelyBricks started",
    description: "Built by homeowners who moved abroad.",
    href: "/aboutus",
  },
  {
    title: "Discuss a tenanted or vacant home",
    description: "Share the property type and occupancy.",
    href: "/contact",
  },
];

export const TENANT_SERVICE = {
  name: "Tenant management in Chennai",
  description:
    "Tenant management in Chennai, including sourcing prospective tenants through RelyBricks' own network, property marketplaces, partners and brokers, then screening, onboarding, rent collection and renewals.",
  path: TENANT_PATH,
  serviceType: "Tenant management",
};
