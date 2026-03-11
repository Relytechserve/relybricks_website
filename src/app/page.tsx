"use client";

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  BuildingOffice2Icon,
  MapIcon,
  SparklesIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import PlansSection from "@/components/PlansSection";
import { Tiles } from "@/components/ui/tiles";

const heroImage = "https://images.pexels.com/photos/29750117/pexels-photo-29750117.jpeg?auto=compress&w=1200";
const propertyCardImage = "https://images.pexels.com/photos/5759269/pexels-photo-5759269.jpeg?auto=compress&w=600";
const whySectionImage = "https://images.pexels.com/photos/15536298/pexels-photo-15536298.jpeg?auto=compress&w=800";
const testimonialImages = [
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&w=600",
];

const services = [
  {
    icon: HomeIcon,
    title: "Tenant Management",
    description: "From screening & onboarding to rent collection and renewals.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Maintenance & Emergency Support",
    description: "Proactive maintenance, verified vendors, and emergency response.",
  },
  {
    icon: PaintBrushIcon,
    title: "Interior Design & Refurbishing",
    description: "Designers, architects & engineers to enhance your property value.",
  },
  {
    icon: BuildingOffice2Icon,
    title: "Buying, Selling & Documentation",
    description: "End-to-end assistance from preparation to marketing and sale.",
  },
  {
    icon: MapIcon,
    title: "Land & Plot Care",
    description: "On-ground checks, upkeep and compliance for vacant land.",
  },
  {
    icon: SparklesIcon,
    title: "Concierge & Value-Added Services",
    description: "Bills, concierge, partner offers and more through one team.",
  },
];


const steps = [
  {
    title: "01 · Understand & Onboard",
    body: "We inspect documents, visit the property and understand your goals.",
  },
  {
    title: "02 · Prepare & Position",
    body: "Cleaning, minor fixes and styling so it is tenant or sale ready.",
  },
  {
    title: "03 · Manage Day-to-Day",
    body: "Tenant queries, issues, bills and vendors handled by one team.",
  },
  {
    title: "04 · Report & Improve",
    body: "Photos, reports and suggestions to keep your asset future-ready.",
  },
];

const stats = [
  {
    label: "Years of experience",
    value: "10+",
    hint: "Serving NRIs & local owners in Chennai.",
  },
  {
    label: "Properties under care",
    value: "100+",
    hint: "Across apartments, villas, bungalows and plots.",
  },
  {
    label: "Average response time",
    value: "< 24h",
    hint: "Most issues acknowledged within a day.",
  },
];

const testimonials = [
  {
    name: "Niranjan",
    role: "Homeowner, Chennai (flood-affected property)",
    quote:
      "Our properties in Chennai were affected by floods. RelyBricks became a single professional connection to coordinate maintenance and rentals, and gave us our time back and peace of mind.",
  },
  {
    name: "Madhuvanthi",
    role: "NRI homeowner, US",
    quote:
      "Clear communication, professional approach and 100% availability. They helped us manage our home remotely without depending on busy friends or elderly parents.",
  },
];

function trackCallClick(source: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "call_now_click", {
      event_category: "engagement",
      event_label: source,
    });
  }
}

export default function HomePage() {
  return (
    <div className="relative bg-white w-full min-w-0">
      <div className="relative z-10">
      {/* HERO – Bright, modern */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
        <Tiles rows={28} cols={10} tileSize="md" className="opacity-60" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-[-120px] h-96 w-96 rounded-full bg-accent-100/60 blur-3xl" />
          <div className="absolute right-[-80px] bottom-[-80px] h-80 w-80 rounded-full bg-accent-200/40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)] gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left – story and CTAs */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
              Reliable · Innovative · Tech-enabled
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] text-stone-900 tracking-tight">
                Property management
                <span className="block text-stone-600">
                  you can actually{" "}
                  <span className="text-accent-600 font-semibold">
                    rely
                  </span>{" "}
                  on.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-600 max-w-xl">
                We love helping homeowners maintain their valuable investment. A single,
                tech-enabled partner to manage your property in Chennai—whether you live
                here or halfway across the world.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919952004948"
                onClick={() => trackCallClick("hero_primary")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 hover:bg-accent-700 transition-colors"
              >
                <PhoneIcon className="h-4 w-4" />
                Call now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 py-3 text-sm font-semibold text-stone-900 hover:border-accent-300 hover:bg-accent-50 transition-colors"
              >
                Schedule a callback
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-4 border-t border-stone-100 mt-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Designed for
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-900">
                  NRIs & local professionals
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Manage remotely without burdening parents or friends.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Based in
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-900">
                  Chennai, India
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  On-ground team, tech-enabled reporting.
                </p>
              </div>
            </div>
          </div>

          {/* Right – hero image + property card */}
          <div className="relative flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/50">
              <Image
                src={heroImage}
                alt="Modern residential property - RelyBricks Chennai"
                width={1200}
                height={800}
                className="w-full h-64 md:h-72 object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
            </div>

            <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    Sample Portfolio
                  </p>
                  <p className="text-sm font-semibold text-stone-900">
                    Chennai Residential Homes
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-accent-600 px-3 py-1.5 text-[11px] font-medium text-white">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Managed by RelyBricks
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 px-4 sm:px-6 py-5">
                {/* Property tile - with imagery */}
                <div className="space-y-3">
                  <div className="relative h-40 w-full overflow-hidden rounded-xl bg-stone-900">
                    <Image
                      src={propertyCardImage}
                      alt="Residential property managed by RelyBricks"
                      width={600}
                      height={320}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-300">
                            3BHK · Velachery
                          </p>
                          <p className="mt-0.5 text-xs text-stone-300">
                            1 covered car park · 1,450 sq. ft.
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200 border border-emerald-300/40">
                          Currently Tenanted
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">
                            Rental performance
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            Rent on time · 12/12 months
                          </p>
                          <p className="mt-0.5 text-[11px] text-stone-300">
                            Next renewal check · 30 days before expiry
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-3 py-2 text-[11px] text-stone-100 border border-white/15">
                          <p>Owner dashboard</p>
                          <p className="mt-0.5 text-[10px] text-stone-200/80">
                            Photos · reports · tickets
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-2xl border border-stone-100 bg-stone-50 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-stone-500">
                        Tickets this month
                      </p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">8</p>
                      <p className="mt-0.5 text-[11px] text-emerald-600">
                        100% resolved
                      </p>
                    </div>
                    <div className="rounded-2xl border border-stone-100 bg-stone-50 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-stone-500">
                        Avg. response time
                      </p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        &lt; 24 hrs
                      </p>
                      <p className="mt-0.5 text-[11px] text-stone-600">
                        Including weekends
                      </p>
                    </div>
                    <div className="rounded-2xl border border-stone-100 bg-stone-50 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-stone-500">
                        Owner satisfaction
                      </p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        4.9 / 5
                      </p>
                      <p className="mt-0.5 text-[11px] text-stone-600">
                        Based on feedback
                      </p>
                    </div>
                  </div>
                </div>

                {/* NRI / local split */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl border border-stone-100 bg-stone-50 px-3 py-3.5">
                    <p className="text-[11px] font-semibold text-stone-900">
                      For NRIs
                    </p>
                    <p className="mt-1 text-[11px] text-stone-600">
                      Manage remotely with digital reports, photos and a single point of
                      contact.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-100 bg-stone-50 px-3 py-3.5">
                    <p className="text-[11px] font-semibold text-stone-900">
                      For local professionals
                    </p>
                    <p className="mt-1 text-[11px] text-stone-600">
                      Focus on your career while we handle tenants, vendors and follow-ups.
                    </p>
                  </div>
                  <div className="mt-auto rounded-2xl border border-dashed border-accent-200 bg-accent-50/80 px-3 py-3 text-[11px] text-accent-900">
                    “We are not just a machine or algorithm running somewhere. We have
                    humans behind it to add that value and personal touch.”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RELYBRICKS */}
      <section className="py-12 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1.1fr] gap-10 lg:gap-12 items-start lg:items-center">
          <div className="relative order-2 lg:order-1 overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/50">
            <Image
              src={whySectionImage}
              alt="Property management - trusted care for your home"
              width={800}
              height={500}
              className="w-full h-72 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          </div>
          <div className="order-1 lg:order-2 max-w-xl flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-950 tracking-tight">
                Built by homeowners{" "}
                <span className="text-stone-500">&nbsp;who moved abroad.</span>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-stone-600 leading-relaxed">
                RelyBricks Property Management was born out of a simple but important
                frustration: managing homes in Chennai from far away, coordinating with
                busy friends and elderly parents, and worrying about floods, maintenance
                and tenants. Instead of patchwork fixes, we created a reliable,
                innovative and tech-enabled property management partner.
              </p>
              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                Today, we support homeowners with subscription plans that cover
                everything—from bill payments and cleaning to tenant management,
                emergency services and sale preparation—backed by clear communication
                and structured reporting.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 shadow-sm"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-stone-600">{item.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                SERVICES
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
                End-to-end care for your property.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-xl">
                Annual subscription plans for apartments, villas, bungalows and land.
                You choose the plan; we handle the coordination.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-stone-500 max-w-sm">
              From paying bills and arranging cleaners to coordinating carpenters,
              electricians and pest control—everything flows through one accountable
              RelyBricks team.
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4 auto-rows-[minmax(0,1fr)]">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative flex flex-col justify-between rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl ${
                  index === 0
                    ? "lg:row-span-2"
                    : index === 2
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600 text-white">
                    <service.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-950">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Included in plans</span>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-stone-700 group-hover:text-accent-600"
                  >
                    Learn more
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="text-stone-500">
              Need something specific—like help with a one-time sale or inheritance?
              We create custom scopes for complex cases.
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-900 hover:border-stone-500"
            >
              View full service breakdown
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
                A clear, four-step approach.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md">
              From the first inspection to ongoing service, you always know what is
              happening and who is responsible.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-stone-200 bg-stone-50 px-4 py-5 text-xs sm:text-sm shadow-sm"
              >
                <p className="text-[11px] font-semibold text-stone-700">
                  {step.title}
                </p>
                <p className="mt-2 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
            PLANS
          </p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
            Simple, transparent subscriptions.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-700">
            Annual subscription plans starting from ₹16,000/year. No hidden
            commissions—just clear scope, reporting and SLAs.
          </p>
          <p className="mt-4 text-xs sm:text-sm text-stone-600">
            Gold is our most popular plan for NRIs managing 1500+ sq. ft homes, villas
            and multiple properties.
          </p>
        </div>
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansSection />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                WHAT OWNERS SAY
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
                “Gave us our time back and peace of mind.”
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md">
              RelyBricks has been recognised as a{" "}
              <span className="font-semibold">
                reliable, innovative &amp; tech-enabled property management solution
              </span>{" "}
              by industry watchers such as{" "}
              <a
                href="https://www.siliconindia.com/realestate/vendor/relybricks-property-management-reliable-innovative-techenabled-property-management-solutions-cid-6705.html"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-stone-400 underline-offset-4"
              >
                SiliconIndia
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="relative h-full rounded-2xl bg-white overflow-hidden shadow-lg ring-1 ring-stone-200/50"
              >
                <div className="relative h-40 w-full shrink-0 overflow-hidden">
                  <Image
                    src={testimonialImages[i]}
                    alt=""
                    width={600}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                <p className="text-sm text-stone-700 leading-relaxed">“{t.quote}”</p>
                <figcaption className="mt-5 text-xs text-stone-500">
                  <span className="font-semibold text-stone-900">{t.name}</span>
                  <span className="mx-1">·</span>
                  {t.role}
                </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-accent-600 to-accent-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Onboarding a new tenant or planning a sale?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-accent-100 max-w-xl">
              Let RelyBricks be your single professional connection in Chennai. Share
              your situation and we&apos;ll propose a clear, no-jargon plan within one
              business day.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="tel:+919952004948"
              onClick={() => trackCallClick("final_cta")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-accent-600 hover:bg-accent-50 transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              Call RelyBricks now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Share your property details
            </Link>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
