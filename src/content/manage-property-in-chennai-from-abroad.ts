import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type { ProcessStep, RelatedLinkItem } from "@/components/content/types";
import {
  ABROAD_PATH,
  COST_PATH,
  HOME_CRUMB,
  HUB_CRUMB,
  HUB_PATH,
  NRI_PATH,
  TENANT_PATH,
} from "./aeo-shared";

export const ABROAD_METADATA = {
  title: "How to Manage Property in Chennai While Living Abroad | RelyBricks",
  description:
    "A practical guide for overseas and out-of-station owners: documents, local access, tenants, rent, maintenance rules, inspections, bills and emergencies in Chennai.",
  path: ABROAD_PATH,
};

export const ABROAD_H1 = "How to manage a property in Chennai while living abroad";

export const ABROAD_OPENING =
  "If you own a home in Chennai and live abroad, you need three things in place: organised ownership and property records, a reliable local way to access and inspect the property, and clear rules for tenants, rent, maintenance spend and recurring bills. Start by storing title and tax-related documents safely, arranging keys or access for a trusted local contact, and deciding who handles tenant calls and vendor visits. Put rent and renewal dates on a calendar, set maintenance approval limits before emergencies happen, and insist on photos or video after visits. For vacant homes, schedule upkeep to an agreed plan — not an informal schedule when someone has time. Many owners eventually hire a professional property manager for day-to-day coordination; others combine family help with paid support for specific tasks.";

export const ABROAD_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_CRUMB,
  HUB_CRUMB,
  { name: "Managing Property From Abroad", path: ABROAD_PATH },
];

export const ABROAD_STEPS: ProcessStep[] = [
  {
    title: "Keep ownership and property documents organised",
    body:
      "Keep ownership documents, tax and payment records, association records, insurance documents and tenancy paperwork organised in a secure place with an appropriate backup. Note account numbers for utilities and society maintenance. This guide is not legal or tax advice — appropriate professional advice may be required for power of attorney, inheritance, registration, legal authorisation or cross-border tax matters.",
  },
  {
    title: "Establish reliable local access",
    body:
      "Someone trusted needs keys, society gate clearance, and authority to admit vendors or inspectors. If you use formal authorisation, ensure it matches what your society and bank require — seek appropriate professional advice for document wording.",
  },
  {
    title: "Decide who handles tenant communication",
    body:
      "Tenants will report leaks, power issues and neighbour disputes. Decide whether you take every call across time zones, delegate to family, or route day-to-day queries to a local manager. Owners should stay involved when decisions affect lease terms, major spend or vacancy.",
  },
  {
    title: "Put a tenant sourcing and screening process in place",
    body:
      "If the home is empty or turning over, you need marketing, viewings, applicant screening, and rental-agreement coordination. RelyBricks can source prospective tenants through its own network, property marketplace listings, partners and brokers, then screen and onboard — see tenant management in Chennai for the full sequence.",
  },
  {
    title: "Track rent and renewals",
    body:
      "Log due dates, actual receipts, and renewal windows. Agree how rent reaches you and what happens if payment is late. The public RelyBricks site describes rent collection and follow-up as part of tenant management; it does not publish a legal recovery or eviction process — seek appropriate professional advice if disputes arise.",
  },
  {
    title: "Set maintenance approval rules before something breaks",
    body:
      "Define spend limits you will approve by message or email, what counts as an emergency (active water leak, safety risk), and how quotes are shared. RelyBricks coordinates maintenance and emergencies with verified vendors and involves the owner when a decision is needed. Most issues are acknowledged within 24 hours — that is acknowledgement, not a guaranteed repair time.",
  },
  {
    title: "Inspect the property regularly",
    body:
      "Remote ownership fails when nobody visits. Schedule inspections to an agreed plan. Visits should produce photos and video and notes on condition. Visit frequency follows the plan you agree with whoever manages the property.",
  },
  {
    title: "Keep photos and records",
    body:
      "Maintain a dated folder of inspection media, repair invoices, tenant correspondence summaries, and society notices. This helps at renewal, resale, and insurance discussions.",
  },
  {
    title: "Manage bills, taxes and association payments",
    body:
      "Utilities, property tax and community maintenance charges still run while you are away. Missed payments cause disconnections and society arrears. RelyBricks can handle utility bills, taxes and community payments as part of property management — confirm scope in your plan.",
  },
  {
    title: "Look after vacant properties",
    body:
      "An unoccupied flat, villa or bungalow needs visits, cleaning, and maintenance to an agreed scope — not only when a tenant is sought. Vacant residential care is separate from land and plot care. RelyBricks can visit, coordinate cleaning and repairs, and send reports while the home is empty.",
  },
  {
    title: "Prepare for urgent repairs",
    body:
      "Keep a short list of trusted electricians, plumbers and society contacts. Share emergency steps with whoever has access. Confirm how you will be reached across time zones and who can authorise immediate stop-gap work within the limits you set.",
  },
  {
    title: "Decide when a professional property manager is useful",
    body:
      "Consider paid management when travel is infrequent, tenants are in place, bills stack up, or family cannot carry coordination. A professional manager should offer one local point of contact, structured reporting, and clear scope. RelyBricks was started by homeowners who moved abroad and provides Chennai-based management for tenanted and vacant homes.",
  },
];

export const ABROAD_FAQS: FaqItem[] = [
  {
    question: "Can I manage a Chennai property while living overseas?",
    answer:
      "Yes, with organised records, local access, and clear processes for tenants, maintenance and bills. Many owners use a Chennai property manager for day-to-day coordination.",
  },
  {
    question: "Do I need family in Chennai?",
    answer:
      "No. Family can stay informed, but professional management can carry vendor and tenant follow-up so relatives are not informal facility managers.",
  },
  {
    question: "What documents should I keep handy?",
    answer:
      "Keep ownership documents, tax and payment records, association records, insurance documents and tenancy paperwork organised in a secure place with an appropriate backup. Appropriate professional advice may be required for power of attorney, inheritance, registration or cross-border tax matters.",
  },
  {
    question: "How often should someone visit my property?",
    answer:
      "There is no single universal frequency. Agree a visit schedule in your plan and expect photos or video from inspections.",
  },
  {
    question: "What if I cannot fly to Chennai to start?",
    answer:
      "RelyBricks onboarding includes reviewing documents and visiting the property even if you cannot attend — call +91 99520 04948 or use the contact form.",
  },
  {
    question: "How should urgent issues be handled while I am abroad?",
    answer:
      "Agree approval rules in advance. RelyBricks coordinates with verified vendors, keeps the owner updated, and most issues are acknowledged within 24 hours. That is an acknowledgement target, not a guaranteed repair deadline.",
  },
  {
    question: "Can RelyBricks manage a vacant home until I find a tenant?",
    answer:
      "Yes. Vacant residential properties can receive visits, cleaning, maintenance and reporting to an agreed scope — separate from plot and land care.",
  },
  {
    question: "How much does professional management cost?",
    answer:
      "RelyBricks annual plans start from ₹16,000/year; scope depends on property and plan. See the property management cost guide and the services page for current inclusions.",
  },
];

export const ABROAD_RELATED: RelatedLinkItem[] = [
  {
    title: "NRI property management in Chennai",
    description: "Local oversight for tenanted or vacant homes while you live overseas.",
    href: NRI_PATH,
  },
  {
    title: "Property management services in Chennai",
    description: "The full service set for local and overseas owners.",
    href: HUB_PATH,
  },
  {
    title: "Property management cost in Chennai",
    description: "How fees are structured and what affects total cost.",
    href: COST_PATH,
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
