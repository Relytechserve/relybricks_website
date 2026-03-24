import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  BuildingOffice2Icon,
  MapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import PlansSection from "@/components/PlansSection";

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

export const metadata: Metadata = {
  title: "Services | RelyBricks - Property Management Chennai",
  description:
    "Tenant management, maintenance, interior design, buying & selling, land maintenance, and value-added services. Full-service property management in Chennai.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "RelyBricks Services — Full Property Management Chennai",
    description:
      "Tenant lifecycle, maintenance, inspections, bills, and pay-as-you-go services—one accountable team.",
    url: "/services",
  },
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

              <PlansSection />

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
