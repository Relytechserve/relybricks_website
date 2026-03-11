"use client";

type ServiceOffer = {
  id: string;
  title: string;
  description: string;
  category: "Cross-sell" | "Partner advertisement";
  ctaLabel: string;
  ctaHref: string;
};

const serviceOffers: ServiceOffer[] = [
  {
    id: "interior-refresh",
    title: "Interior refresh package",
    description:
      "Painting, deep cleaning, and basic staging to improve rental appeal before onboarding a new tenant.",
    category: "Cross-sell",
    ctaLabel: "Request quote",
    ctaHref: "/contact",
  },
  {
    id: "tenant-screening-plus",
    title: "Tenant screening plus",
    description:
      "Enhanced background checks and document verification for faster and safer tenant shortlisting.",
    category: "Cross-sell",
    ctaLabel: "Talk to manager",
    ctaHref: "/contact",
  },
  {
    id: "home-insurance-ad",
    title: "Home insurance plans",
    description:
      "Partner offer: compare annual plans for structure and content protection at preferred rates.",
    category: "Partner advertisement",
    ctaLabel: "Explore plans",
    ctaHref: "/services",
  },
  {
    id: "nri-tax-support-ad",
    title: "NRI tax filing support",
    description:
      "Partner offer: tax advisory and filing support for rental income and annual property compliance.",
    category: "Partner advertisement",
    ctaLabel: "Get assistance",
    ctaHref: "/services",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Services and offers</h1>
      <p className="mt-2 text-stone-600">
        Personalized add-on services and selected partner advertisements for your property.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {serviceOffers.map((offer) => (
          <article key={offer.id} className="p-6 rounded-2xl border border-stone-200 bg-white">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                offer.category === "Cross-sell"
                  ? "bg-accent-100 text-accent-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {offer.category}
            </span>
            <h2 className="mt-3 font-semibold text-stone-900">{offer.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{offer.description}</p>
            <a
              href={offer.ctaHref}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              {offer.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
