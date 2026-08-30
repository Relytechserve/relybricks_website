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
import PricingCalculator from "@/components/PricingCalculator";
import {
  GST_LABEL,
  MANAGEMENT_FEE_RATE_PERCENT,
  MANAGEMENT_INCLUSIONS,
  MINIMUM_ANNUAL_MANAGEMENT_FEE_INR,
  PRICING_CORE_ANSWER,
  PRICING_HEADLINE,
  PROJECT_MANAGEMENT_FEE_RATE_PERCENT,
  PROJECT_VALUE_DEFINITION,
  formatInr,
} from "@/lib/pricing";

const pillars = [
  {
    icon: BuildingOffice2Icon,
    title: "Bills, taxes & community payments",
    body: "Utility bills, taxes and community maintenance coordinated so nothing gets missed.",
  },
  {
    icon: HomeIcon,
    title: "Tenant lifecycle management",
    body: "From sourcing and screening to agreements, rent collection and renewals.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Maintenance & emergency response",
    body: "Day-to-day issues and emergencies coordinated with trusted vendors.",
  },
  {
    icon: PaintBrushIcon,
    title: "Cleaning, pest & upgrades",
    body: "Property readiness, scheduled care and refurbishment coordination.",
  },
  {
    icon: MapIcon,
    title: "Inspections, visits & reporting",
    body: "Visits with photos and videos, condition reports and owner updates.",
  },
  {
    icon: SparklesIcon,
    title: "Concierge & value-added services",
    body: "Additional coordination through our partner network when you need it.",
  },
];

export const metadata: Metadata = {
  title: "Services | RelyBricks - Property Management Chennai",
  description:
    "End-to-end property management in Chennai — 12% of annual rental value, minimum ₹21,000/year + applicable GST. Tenant, maintenance, inspections and reporting included.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "RelyBricks Services — Full Property Management Chennai",
    description:
      "End-to-end property management — tenant lifecycle, maintenance coordination, inspections and owner reporting.",
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
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Our Services
          </h1>
          <p className="mt-6 text-xl text-stone-300 max-w-2xl">
            One end-to-end property management service in Chennai. See{" "}
            <Link
              href="/property-management-chennai"
              className="text-accent-200 underline underline-offset-4 hover:text-white"
            >
              property management in Chennai
            </Link>
            , including{" "}
            <Link
              href="/tenant-management-chennai"
              className="text-accent-200 underline underline-offset-4 hover:text-white"
            >
              tenant management
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Explore
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
              Read more about how we work.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/property-management-chennai",
                  title: "Property Management in Chennai",
                  body: "The full local service for occupied and vacant homes.",
                },
                {
                  href: "/nri-property-management-chennai",
                  title: "NRI Property Management",
                  body: "A Chennai team for owners who live abroad.",
                },
                {
                  href: "/tenant-management-chennai",
                  title: "Tenant Management",
                  body: "Sourcing, screening, rent collection and renewals.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm hover:border-accent-300 hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm text-stone-600">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>

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
                    <h2 className="text-sm font-semibold text-stone-900">{pillar.title}</h2>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600">{pillar.body}</p>
                  </div>
                </div>
                <div className="mt-4 text-[11px] text-stone-500">
                  Included in the annual property management fee.
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
              PRICING
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
              {PRICING_HEADLINE}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed">
              {PRICING_CORE_ANSWER}
            </p>
            <p className="mt-3 text-sm text-stone-600">
              {MANAGEMENT_FEE_RATE_PERCENT}% of annual rental value · minimum{" "}
              {formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)}/year + {GST_LABEL}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-stone-900">What&apos;s included</h3>
                <ul className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
                  {MANAGEMENT_INCLUSIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <PricingCalculator />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-stone-200 bg-stone-900 p-8 sm:p-10 text-white">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Property works &amp; project management
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl">
              Repairs, maintenance, refurbishment and improvement works are financially separate
              from the annual management fee. RelyBricks coordinates those works at{" "}
              {PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + {GST_LABEL}. Project value
              means {PROJECT_VALUE_DEFINITION} Vendor labour, materials and third-party costs are
              separate.
            </p>
            <p className="mt-6 text-sm text-stone-400">
              Plots, land, owner-occupied homes, sale-only or project-only scopes are quoted
              separately.{" "}
              <Link
                href="/property-management-cost-chennai"
                className="text-accent-200 underline underline-offset-4 hover:text-white"
              >
                See the full pricing guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
