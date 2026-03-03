import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  BuildingOffice2Icon,
  MapIcon,
  SparklesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    icon: BuildingOffice2Icon,
    title: "Bills, taxes & community payments",
    body: "Utility bills, taxes and community maintenance handled end-to-end so nothing gets missed.",
  },
  {
    icon: HomeIcon,
    title: "Tenant lifecycle management",
    body: "From marketing and screening to agreements and rent collection, we manage every step.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Maintenance & emergency response",
    body: "Day-to-day issues, repairs and emergencies coordinated with trusted vendors.",
  },
  {
    icon: PaintBrushIcon,
    title: "Cleaning, pest & upgrades",
    body: "Scheduled cleaning, pest control, and interior upgrades to maintain your property’s value.",
  },
  {
    icon: MapIcon,
    title: "Inspections, visits & reporting",
    body: "Visits with photos and videos, condition reports and practical advice for improvements.",
  },
  {
    icon: SparklesIcon,
    title: "Pay-and-use & value-added services",
    body: "AC servicing, plumbing, electricals and more through our curated partner network.",
  },
];

const packages = [
  {
    name: "Basic",
    tag: "Up to 1000 sq. ft",
    price: "₹16,000 / year",
    bestFor: "Apartments and compact homes",
    highlights: [
      "Paying utility bills & property taxes",
      "Tenant management, agreements and rent collection",
      "1× general cleaning + 1× pest control per year",
      "2 property visits with photo/video updates",
      "Pay-and-use services worth ₹1,000",
    ],
  },
  {
    name: "Gold",
    tag: "Up to 1500 sq. ft · Most popular",
    price: "₹25,000 / year",
    bestFor: "NRIs and families with larger homes",
    highlights: [
      "Everything in Basic package",
      "2× general cleaning + 2× pest control per year",
      "Quarterly visits and reports",
      "Pay-and-use services worth ₹2,000",
      "Account manager and priority coordination",
    ],
  },
  {
    name: "Premium",
    tag: "Up to 2000 sq. ft & estates",
    price: "Custom · from ₹35,400 / year",
    bestFor: "Bungalows, beach houses and combined properties",
    highlights: [
      "Everything in Gold package",
      "General + deep cleaning included",
      "6 visits per year with detailed reports",
      "Pay-and-use services worth ₹3,000",
      "Pick-up & drop for one owner visit (within 50 km)",
    ],
  },
];

export const metadata = {
  title: "Services | RelyBricks - Property Management Chennai",
  description:
    "Tenant management, maintenance, interior design, buying & selling, land maintenance, and value-added services. Full-service property management in Chennai.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-accent-700 to-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/29750117/pexels-photo-29750117.jpeg?auto=compress&w=1920"
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-900/85 via-stone-900 to-stone-900" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(225deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Our Services
          </h1>
          <p className="mt-6 text-xl text-stone-300 max-w-2xl">
            Full-service property management in Chennai. Everything you need to protect
            and grow your investment.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pillars grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-md">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-stone-900">
                      {pillar.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600">
                      {pillar.body}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-[11px] text-stone-500">
                  Included across Basic, Gold and Premium with varying depth and frequency.
                </div>
              </div>
            ))}
          </div>

          {/* Package comparison - aligned with Home page Plans */}
          <div className="mt-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-stone-900 sm:rounded-2xl overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                    PACKAGES
                  </p>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    What you get in each plan.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-stone-300 max-w-xl">
                    All three packages cover bills, tenant management and coordination. As you
                    move from Basic to Gold to Premium, you get more visits, deeper cleaning,
                    more pest control and higher pay-and-use coverage.
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-stone-400 max-w-sm shrink-0">
                  Figures and inclusions below are summarised from the official BASIC, GOLD and
                  PREMIUM package documents.
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                    pkg.name === "Gold"
                      ? "border-accent-400 bg-gradient-to-b from-accent-600 to-stone-900 shadow-2xl shadow-accent-500/20 md:scale-[1.02]"
                      : "border-stone-700 bg-stone-800/80"
                  } ${pkg.name === "Gold" ? "text-white" : "text-white"}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.16em] text-stone-400">
                        {pkg.name} Plan
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {pkg.price}
                      </p>
                    </div>
                    <span className="rounded-full bg-stone-800/80 px-3 py-1 text-[11px] font-medium text-stone-100 shrink-0">
                      {pkg.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-stone-300">{pkg.bestFor}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-xs sm:text-sm text-stone-200">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-3.5 w-3.5 text-accent-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide ${
                      pkg.name === "Gold"
                        ? "bg-white text-stone-950 hover:bg-stone-100"
                        : "bg-stone-800 text-stone-50 hover:bg-stone-700"
                    }`}
                  >
                    Talk to us about {pkg.name}
                  </Link>
                </div>
              ))}
            </div>

              <p className="mt-10 text-center text-xs sm:text-sm text-stone-400">
                Need a custom combination or have a mixed portfolio (apartments + land)? We
                can tailor a scope and pricing specifically for your situation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
