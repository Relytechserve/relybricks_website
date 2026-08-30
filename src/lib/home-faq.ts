export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Homepage FAQ — visible copy and FAQPage JSON-LD must stay in sync.
 * Answers use only facts already published on the RelyBricks website.
 */
export const HOME_FAQ: FaqItem[] = [
  {
    question: "What does RelyBricks manage?",
    answer:
      "RelyBricks is a property management company in Chennai. The team can handle tenant sourcing and the tenancy lifecycle, maintenance coordination, bills, taxes and community payments, inspections with photo and video reports, vacant-property oversight, interior refurbishment coordination, buying and selling assistance, land and plot care, and owner reporting through one accountable local partner.",
  },
  {
    question: "Can RelyBricks manage my Chennai property while I live abroad?",
    answer:
      "Yes. RelyBricks is built for NRIs and out-of-station owners who need on-ground support in Chennai, with digital reports, photos and a single point of contact so you do not have to rely on busy friends or elderly parents.",
  },
  {
    question: "What property types does RelyBricks manage?",
    answer:
      "RelyBricks manages apartments, villas and bungalows in Chennai. Plots and land are scoped and quoted separately.",
  },
  {
    question: "Can RelyBricks manage tenants and maintenance?",
    answer:
      "Yes. Tenant services can cover sourcing, screening, onboarding, rental agreements, rent collection and renewals. Maintenance coordination covers proactive upkeep, emergency response and coordination with verified vendors. Actual repair and vendor costs are separate from the management fee.",
  },
  {
    question: "How is RelyBricks property management priced?",
    answer:
      "RelyBricks charges 12% of your property's annual rental value, subject to a minimum annual management fee of ₹21,000 + applicable GST. There is one end-to-end management service — not separate Basic, Gold or Premium tiers. See the property management cost guide for examples and a calculator.",
  },
];
