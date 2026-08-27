import type { FaqItem } from "@/lib/home-faq";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type {
  AudienceItem,
  CaseStudyCardData,
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

export const NRI_METADATA = {
  title: "NRI Property Management in Chennai | RelyBricks",
  description:
    "Live abroad and own a home in Chennai? RelyBricks is the local team for tenanted or vacant properties — visits, photos, repairs and bills. Plans from ₹16,000/year.",
  path: NRI_PATH,
};

export const NRI_H1 =
  "A local team for your Chennai property while you live abroad";

export const NRI_OPENING =
  "If you own a home in Chennai and live abroad, RelyBricks can be the team on the ground. The company was started by homeowners who moved overseas and needed someone they could trust with tenants, repairs and vacant-property care. You get inspections with photos and videos, a single point of contact, and digital reports so you can see what is happening without relying on busy friends or elderly parents. Whether the home is tenanted or empty, the Chennai team can visit, coordinate work and keep you informed. Most issues are acknowledged in under 24 hours. Annual plans start from ₹16,000/year. The service is delivered by RelyBricks' Chennai team, giving overseas owners one clear local point of accountability for the property.";

export const NRI_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_CRUMB,
  HUB_CRUMB,
  { name: "NRI Property Management", path: NRI_PATH },
];

export const NRI_FEATURES: FeatureItem[] = [
  {
    title: "One local point of contact",
    description:
      "Tenant, vacancy, vendor and bill follow-up through the Chennai team.",
  },
  {
    title: "Inspections with photos and video",
    description:
      "Visits and condition updates you can review from anywhere.",
  },
  {
    title: "Digital reports",
    description:
      "Structured reporting instead of informal threads from relatives.",
  },
  {
    title: "Tenanted-home support",
    description:
      "Communication, rent follow-up, maintenance, inspections, renewals and bills.",
  },
  {
    title: "Vacant-home oversight",
    description:
      "Visits, cleaning, maintenance and preparation to the agreed scope.",
  },
  {
    title: "Repairs and emergencies",
    description:
      "Coordination with verified vendors; you are kept informed.",
  },
];

export const NRI_STEPS: ProcessStep[] = [
  {
    title: "Share the property and your goals",
    body: "Type of home, tenanted or vacant, and what you want (hold, let, prepare to sell).",
  },
  {
    title: "Documents and a local visit",
    body: "The team reviews documents and inspects the property even if you cannot attend.",
  },
  {
    title: "Agree the plan",
    body: "Scope and subscription; visit frequency is set in that plan.",
  },
  {
    title: "Ongoing care and reporting",
    body: "Tenants or vacancy, vendors, bills, photos and one contact.",
  },
];

export const NRI_AUDIENCE: AudienceItem[] = [
  {
    title: "You live outside India",
    body: "You still own a Chennai home — tenanted or vacant.",
  },
  {
    title: "You live in another Indian city",
    body: "You cannot visit often and need someone on the ground.",
  },
  {
    title: "You do not want family to run vendors",
    body: "Friends or elderly parents should not have to manage tenants and repairs.",
  },
  {
    title: "You want photos and reports",
    body: "Not only a phone promise — visits with updates you can review.",
  },
];

export const NRI_TESTIMONIAL: CaseStudyCardData = {
  title: "Managing a Chennai home from abroad",
  situation: "Madhuvanthi · NRI homeowner, US",
  quote:
    "Clear communication, professional approach and 100% availability. They helped us manage our home remotely without depending on busy friends or elderly parents.",
};

export const NRI_FAQS: FaqItem[] = [
  {
    question:
      "Can RelyBricks look after my Chennai property while I live abroad?",
    answer:
      "Yes. You get on-ground support in Chennai, with digital reports, photos and a single point of contact so you do not have to rely on busy friends or elderly parents.",
  },
  {
    question: "How will I know what is happening?",
    answer:
      "Through inspection visits with photo and video updates, plus structured reporting. You have one team to ask.",
  },
  {
    question: "Can RelyBricks manage my property if it is currently vacant?",
    answer:
      "Yes. For an unoccupied flat, villa or bungalow, RelyBricks can visit, identify issues, coordinate repairs and cleaning, keep the property maintained, send photos and reports, and prepare it for a tenant or another requirement you set. Frequency and work follow the agreed scope.",
  },
  {
    question:
      "What if a pipe bursts or the tenant reports a fault while I am away?",
    answer:
      "RelyBricks coordinates maintenance and emergencies with verified vendors. You are updated and approve work that needs a decision. Acknowledgement is typically within 24 hours — not a guaranteed repair time.",
  },
  {
    question: "Do I need family in Chennai to manage this?",
    answer:
      "No. The local team carries the follow-up. Family can stay informed if you want; they should not have to run vendors.",
  },
  {
    question: "How do tenants reach someone?",
    answer:
      "Day-to-day tenant queries go to the local team. You are involved when the issue needs the owner.",
  },
  {
    question: "Can we start if I cannot fly in?",
    answer:
      "Yes. Onboarding includes reviewing documents and visiting the property. Call +91 99520 04948 or use the contact form.",
  },
];

export const NRI_RELATED: RelatedLinkItem[] = [
  {
    title: "How to manage property from abroad",
    description: "A practical owner guide — documents, access, tenants and bills.",
    href: "/manage-property-in-chennai-from-abroad",
  },
  {
    title: "Property management cost in Chennai",
    description: "How fees are structured and what affects total cost.",
    href: "/property-management-cost-chennai",
  },
  {
    title: "Property management services in Chennai",
    description: "The full service set for local and overseas owners.",
    href: HUB_PATH,
  },
  {
    title: "How tenant management works",
    description: "Sourcing, screening, rent collection and renewals.",
    href: TENANT_PATH,
  },
  {
    title: "Plans and visit frequency",
    description: "See current subscription inclusions.",
    href: "/services",
  },
  {
    title: "Started by owners who moved abroad",
    description: "Why RelyBricks exists.",
    href: "/aboutus",
  },
  {
    title: "Send property details from abroad",
    description: "Share the address and whether anyone is living there now.",
    href: "/contact",
  },
];

export const NRI_SERVICE = {
  name: "Property management in Chennai for owners living abroad",
  description:
    "Property management in Chennai for owners living abroad, covering tenanted and vacant homes with local visits, reporting, repairs and bills.",
  path: NRI_PATH,
  serviceType: "Property management",
};
