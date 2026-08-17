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
      "RelyBricks is a property management company in Chennai. The team can handle tenant management, maintenance and emergencies, bills, taxes and community payments, inspections with photo and video reports, interior refurbishment support, buying and selling assistance, land and plot care, and concierge-style value-added services through one accountable local partner.",
  },
  {
    question: "Can RelyBricks manage my Chennai property while I live abroad?",
    answer:
      "Yes. RelyBricks is built for NRIs and out-of-station owners who need on-ground support in Chennai, with digital reports, photos and a single point of contact so you do not have to rely on busy friends or elderly parents.",
  },
  {
    question: "What property types does RelyBricks manage?",
    answer:
      "RelyBricks manages apartments, villas, bungalows and plots in Chennai.",
  },
  {
    question: "Can RelyBricks manage tenants and maintenance?",
    answer:
      "Yes. Tenant services can cover screening, onboarding, rental agreements, rent collection and renewals. Maintenance covers proactive upkeep, emergency response and coordination with verified vendors.",
  },
  {
    question: "How much do property management plans start from?",
    answer:
      "Annual subscription plans currently start from ₹16,000/year. The exact scope depends on the property and service plan.",
  },
];
