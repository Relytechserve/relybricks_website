import Link from "next/link";
import ComparisonTable from "@/components/content/ComparisonTable";
import ContentPage from "@/components/content/ContentPage";
import CtaBanner from "@/components/content/CtaBanner";
import FaqList from "@/components/content/FaqList";
import PageHero from "@/components/content/PageHero";
import RelatedLinks from "@/components/content/RelatedLinks";
import Section from "@/components/content/Section";
import JsonLd from "@/components/JsonLd";
import {
  AEO_INFO_DATE_PUBLISHED,
  AEO_INFO_DATE_REVIEWED,
  AEO_INFO_LAST_REVIEWED_LABEL,
  AEO_INFO_PUBLISHER,
} from "@/content/aeo-shared";
import {
  COST_BREADCRUMBS,
  COST_COMPARISON_COLUMNS,
  COST_COMPARISON_ROWS,
  COST_FAQS,
  COST_H1,
  COST_METADATA,
  COST_OPENING,
  COST_RELATED,
} from "@/content/property-management-cost-chennai";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { buildArticle } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(COST_METADATA);

export default function PropertyManagementCostChennaiPage() {
  return (
    <ContentPage breadcrumbs={COST_BREADCRUMBS}>
      <JsonLd
        data={buildArticle({
          headline: COST_H1,
          description: COST_METADATA.description,
          path: COST_METADATA.path,
          datePublished: AEO_INFO_DATE_PUBLISHED,
          dateModified: AEO_INFO_DATE_REVIEWED,
          authorName: AEO_INFO_PUBLISHER,
        })}
      />
      <PageHero
        eyebrow="Pricing guide · Chennai"
        title={COST_H1}
        answer={COST_OPENING}
        supporting={`This guide explains common fee models first. RelyBricks uses annual subscription pricing; current plan cards and inclusions are on the services page. Figures here are not a quote for your property. Last reviewed: ${AEO_INFO_LAST_REVIEWED_LABEL}.`}
        primaryCta={{ href: CONTACT_PHONE_TEL, label: `Call ${CONTACT_PHONE_DISPLAY}` }}
        secondaryCta={{ href: "/contact", label: "Share your property details" }}
      />

      <Section title="Why there is no single Chennai price" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            If you search for property management cost in Chennai, you will see
            different numbers because property management is not one fixed product.
            One owner may need vacant-home visits and bill payments only. Another
            needs tenant sourcing, rent collection, maintenance coordination and
            regular photo reports while living overseas.
          </p>
          <p>
            Before you compare providers, separate three things: the fee model,
            what is included in that fee, and what your property needs (tenanted
            or vacant; apartment, villa, bungalow or plot).
          </p>
          <p>
            Headline fees are difficult to compare unless you also compare what is
            included — such as inspections, tenant work, maintenance coordination
            and any add-ons.
          </p>
        </div>
      </Section>

      <Section title="Common pricing models in property management" tone="muted" width="prose">
        <div className="space-y-8 text-sm sm:text-base text-stone-600 leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Flat annual subscription</h3>
            <p className="mt-3">
              Many owners pay a fixed annual subscription for an agreed bundle of
              services — periodic visits, coordination with tenants and vendors,
              and structured reporting. The advantage is knowing the subscription
              cost for the year, subject to any agreed add-ons.
            </p>
            <p className="mt-3">
              RelyBricks uses this model. Annual plans currently start from
              ₹16,000/year. Basic, Gold and Premium plans differ in visit
              frequency, cleaning, pest control and pay-and-use coverage. Exact
              scope depends on the property and the plan you choose.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Percentage of monthly rent</h3>
            <p className="mt-3">
              Another approach used in the wider property-management market is
              charging a percentage of monthly rent. Your fee then moves with the
              rent on the property. Inclusions vary widely between providers.
            </p>
            <p className="mt-3">
              RelyBricks does not publish percentage-of-rent pricing on its
              website. When comparing quotes, ask any provider what percentage
              applies, what it includes, and what is billed separately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Tenant placement / sourcing fees</h3>
            <p className="mt-3">
              When a home is empty, some owners pay a separate tenant-finding or
              placement fee in addition to ongoing management. Others bundle
              sourcing into a subscription. RelyBricks can source prospective
              tenants through its own network, property marketplace listings,
              partners and brokers, then handle screening, onboarding, agreement
              coordination, rent collection and renewals as part of tenant
              management. Whether sourcing is included in your subscription should
              be confirmed for your property.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Inspection and visit charges</h3>
            <p className="mt-3">
              Some arrangements charge per visit if you are not on a managed plan.
              Others include a set visit schedule in the subscription. For any
              provider, ask how often properties are visited, whether visits
              include photos or video, and what happens if an extra visit is
              needed. RelyBricks provides inspections with photo and video reports.
              Visit frequency follows the agreed plan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">
              Maintenance coordination fees and vendor charges
            </h3>
            <p className="mt-3">
              Maintenance pricing is often variable. Providers may charge for
              coordination time, pass through vendor invoices, or add a markup.
              Clarify who approves spend above a threshold and how quotes are shared
              with remote owners. RelyBricks coordinates maintenance and emergencies
              with verified vendors. Owners are updated and approve work that needs
              a decision. Most issues are acknowledged within 24 hours — that is an
              acknowledgement target, not a guaranteed repair completion time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">One-off services and add-ons</h3>
            <p className="mt-3">
              Even on a subscription, owners sometimes need additional work: deep
              cleaning, pest treatment, AC servicing, plumbing or electrical jobs,
              refurbishment, or help with buying or selling. RelyBricks includes
              cleaning and pest control at varying depth by plan, offers pay-and-use
              services through a partner network, and can support refurbishment and
              buying or selling assistance where required. Land and plot care is
              handled as a separate line from occupied residential management.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What usually affects your total cost" width="prose">
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          <li>
            <strong className="text-stone-800">Occupancy.</strong> A tenanted home
            typically needs tenant communication, rent follow-up and renewal
            coordination. A vacant flat, villa or bungalow may need visit-led upkeep
            and preparation instead.
          </li>
          <li>
            <strong className="text-stone-800">Property type.</strong> Apartments,
            villas and bungalows follow residential management scopes. Plots and
            land are a different scope from occupied homes.
          </li>
          <li>
            <strong className="text-stone-800">Service depth.</strong> Full tenant
            lifecycle management is a different workload from oversight,
            inspections and bill coordination alone.
          </li>
          <li>
            <strong className="text-stone-800">Plan tier / visit frequency.</strong>{" "}
            More frequent visits, deeper cleaning and broader pay-and-use cover
            generally sit in higher tiers.
          </li>
          <li>
            <strong className="text-stone-800">Bills, taxes and community payments.</strong>{" "}
            Handling utilities, taxes and association charges adds operational
            responsibility for the manager.
          </li>
          <li>
            <strong className="text-stone-800">Emergencies and refurbishment.</strong>{" "}
            Unplanned repairs and upgrade projects are often outside a base
            subscription unless explicitly included.
          </li>
        </ul>
      </Section>

      <Section title="Annual subscription vs percentage of rent" tone="muted">
        <p className="mb-8 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          There is no universally better model — it depends on rent level, services
          included, and how predictable you need costs to be. The table compares
          typical patterns in the market with what RelyBricks publishes today. It is
          not a quote.
        </p>
        <ComparisonTable
          columns={COST_COMPARISON_COLUMNS}
          rows={COST_COMPARISON_ROWS}
          caption="Annual subscription vs percentage of rent — how the models usually differ"
          firstColumnHeader="Attribute"
        />
      </Section>

      <Section title="How RelyBricks prices property management today" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            RelyBricks provides property management in Chennai for owners in the
            city, elsewhere in India, and overseas. Services can cover tenant
            sourcing and the wider tenancy lifecycle, vacant residential care,
            maintenance and emergency coordination, inspections with photo and
            video reports, utility bills, taxes and community payments, cleaning
            and pest control, land and plot care, and refurbishment or buying or
            selling assistance where needed.
          </p>
          <p>
            Annual subscription plans start from ₹16,000/year. Basic, Gold and
            Premium change visit frequency, cleaning, pest control and pay-and-use
            cover. Final pricing depends on the property and scope you choose.
            Mixed portfolios can be scoped separately.
          </p>
          <p>
            See current plan cards on the{" "}
            <Link href="/services" className="text-accent-700 font-medium hover:text-accent-600">
              services page
            </Link>
            . To discuss your property, call {CONTACT_PHONE_DISPLAY} or use the{" "}
            <Link href="/contact" className="text-accent-700 font-medium hover:text-accent-600">
              contact form
            </Link>
            . RelyBricks has said it will propose a clear plan within one business
            day.
          </p>
        </div>
      </Section>

      <Section title="How to compare quotes fairly" tone="muted" width="prose">
        <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          <li>
            Write down your situation — tenanted or vacant; apartment, villa,
            bungalow or plot; local or remote owner.
          </li>
          <li>Request inclusions in writing — tenants, bills, inspections, vacant care, emergencies.</li>
          <li>Confirm visit and reporting frequency — photos, video, written reports.</li>
          <li>List likely add-ons — placement fees, extra visits, maintenance markup, pay-and-use services.</li>
          <li>Set maintenance approval rules — thresholds, emergency authority, who signs off quotes.</li>
          <li>Compare total expected annual cost, not only the headline fee.</li>
        </ol>
        <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          If you only need one part of the stack (for example tenant management
          without vacant-home visits), say so upfront. Scope drives price. For
          overseas owners, see the{" "}
          <Link
            href="/manage-property-in-chennai-from-abroad"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            guide to managing property from abroad
          </Link>
          .
        </p>
      </Section>

      <FaqList
        items={COST_FAQS}
        includeSchema
        eyebrow="FAQ"
        title="Questions owners ask about cost"
      />

      <Section title="Related reading" tone="muted">
        <RelatedLinks items={COST_RELATED} />
      </Section>

      <CtaBanner
        heading="Want a written scope and price for your property?"
        text="Share whether the home is tenanted or vacant and the property type. RelyBricks will propose a clear plan within one business day — no obligation to proceed."
      />
    </ContentPage>
  );
}
