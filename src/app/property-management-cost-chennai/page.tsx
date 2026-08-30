import Link from "next/link";
import ComparisonTable from "@/components/content/ComparisonTable";
import ContentPage from "@/components/content/ContentPage";
import CtaBanner from "@/components/content/CtaBanner";
import FaqList from "@/components/content/FaqList";
import PageHero from "@/components/content/PageHero";
import PricingCalculator from "@/components/PricingCalculator";
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
  COST_PRICING_EXAMPLES,
  COST_RELATED,
} from "@/content/property-management-cost-chennai";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { buildArticle } from "@/lib/jsonld";
import {
  GST_LABEL,
  MANAGEMENT_FEE_RATE_PERCENT,
  MANAGEMENT_INCLUSIONS,
  MINIMUM_ANNUAL_MANAGEMENT_FEE_INR,
  PROJECT_MANAGEMENT_FEE_RATE_PERCENT,
  PROJECT_VALUE_DEFINITION,
  formatInr,
} from "@/lib/pricing";
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
        supporting={`This guide explains how RelyBricks prices property management and how other fee models in the market typically work. Figures here are illustrative — not a quote for your property. Last reviewed: ${AEO_INFO_LAST_REVIEWED_LABEL}.`}
        primaryCta={{ href: CONTACT_PHONE_TEL, label: `Call ${CONTACT_PHONE_DISPLAY}` }}
        secondaryCta={{ href: "/contact", label: "Share your property details" }}
      />

      <Section title="RelyBricks pricing at a glance" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            RelyBricks charges {MANAGEMENT_FEE_RATE_PERCENT}% of your property&apos;s annual rental
            value for end-to-end property management in Chennai. The formula is monthly rental value
            × 12 × {MANAGEMENT_FEE_RATE_PERCENT}%, subject to a minimum annual management fee of{" "}
            {formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)} + {GST_LABEL}.
          </p>
          <p>
            Tenant sourcing, inspections, maintenance coordination, bills and owner reporting are
            included in that management fee. Actual property works, vendor costs and statutory
            charges are separate. Project management for agreed works is{" "}
            {PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + {GST_LABEL}.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden">
            <caption className="sr-only">
              RelyBricks annual management fee examples by monthly rental value
            </caption>
            <thead className="bg-stone-100 text-stone-800">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Monthly rent
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Annual rental value
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {MANAGEMENT_FEE_RATE_PERCENT}% calculated
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Annual management fee
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {COST_PRICING_EXAMPLES.map((row) => (
                <tr key={row.monthlyRent}>
                  <td className="px-4 py-3">{formatInr(row.monthlyRent)}</td>
                  <td className="px-4 py-3">{formatInr(row.annualRentalValue)}</td>
                  <td className="px-4 py-3">
                    {formatInr(row.calculatedFee)}
                    {row.minimumApplied ? " (below minimum)" : ""}
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-900">
                    {formatInr(row.annualManagementFee)} + {GST_LABEL}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-stone-500">
            All examples plus {GST_LABEL}. For vacant homes, use the agreed expected monthly rental
            value.
          </p>
        </div>

        <div className="mt-10 max-w-xl">
          <PricingCalculator />
        </div>
      </Section>

      <Section title="What the annual management fee includes" tone="muted">
        <ul className="grid gap-2 sm:grid-cols-2 text-sm sm:text-base text-stone-600">
          {MANAGEMENT_INCLUSIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          The annual management fee covers RelyBricks&apos; coordination and management services. It
          does not pay for vendor labour, materials, utilities, taxes or statutory charges.
        </p>
      </Section>

      <Section title="Property works and project management" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            Repairs, maintenance, refurbishment and improvement works are financially separate from
            the annual management fee. RelyBricks coordinates those works at{" "}
            {PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + {GST_LABEL}. Project value
            means {PROJECT_VALUE_DEFINITION}
          </p>
          <p>
            Maintenance coordination is included in the annual management fee. Actual works are
            billed separately. This is not a hidden markup — it is a separate project management
            fee for work you agree to undertake.
          </p>
        </div>
      </Section>

      <Section title="Why there is no single Chennai price" tone="muted" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            Property management is not one fixed product. One owner may need vacant-home visits and
            bill coordination only. Another needs tenant sourcing, rent collection, maintenance
            coordination and regular photo reports while living overseas.
          </p>
          <p>
            Before you compare providers, separate three things: the fee model, what is included in
            that fee, and what your property needs (tenanted or vacant; apartment, villa,
            bungalow or plot).
          </p>
        </div>
      </Section>

      <Section title="Common pricing models in property management" width="prose">
        <div className="space-y-8 text-sm sm:text-base text-stone-600 leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Percentage of annual rental value</h3>
            <p className="mt-3">
              Some providers charge a percentage of annual rent collected or annual rental value.
              Your fee then moves with the rent on the property. Inclusions vary widely between
              providers.
            </p>
            <p className="mt-3">
              RelyBricks uses this model publicly: {MANAGEMENT_FEE_RATE_PERCENT}% of annual rental
              value, minimum {formatInr(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR)}/year + {GST_LABEL}, for
              one end-to-end management service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Flat annual subscription</h3>
            <p className="mt-3">
              Many owners pay a fixed annual subscription for an agreed bundle of services — periodic
              visits, coordination with tenants and vendors, and structured reporting. The advantage
              is knowing the subscription cost for the year, subject to any agreed add-ons.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Tenant placement / sourcing fees</h3>
            <p className="mt-3">
              When a home is empty, some owners pay a separate tenant-finding or placement fee in
              addition to ongoing management. Others bundle sourcing into the management fee.
              RelyBricks includes tenant sourcing in the annual management fee.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">
              Maintenance coordination fees and vendor charges
            </h3>
            <p className="mt-3">
              Maintenance pricing is often variable. Providers may charge for coordination time,
              pass through vendor invoices, or add a markup. RelyBricks coordinates maintenance and
              emergencies with verified vendors. Owners approve work that needs a decision. Vendor
              costs are separate from the management fee.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What usually affects your total cost" tone="muted" width="prose">
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          <li>
            <strong className="text-stone-800">Occupancy.</strong> Tenanted homes need tenant
            communication and renewal coordination. Vacant homes use agreed expected monthly rental
            value for the management fee calculation.
          </li>
          <li>
            <strong className="text-stone-800">Property type.</strong> Apartments, villas and
            bungalows follow residential management scopes. Plots and land are separately scoped and
            quoted.
          </li>
          <li>
            <strong className="text-stone-800">Service depth.</strong> Owner-occupied, sale-only or
            project-only scopes are quoted separately.
          </li>
          <li>
            <strong className="text-stone-800">Property works.</strong> Repairs and refurbishment are
            separate from the annual management fee, with project management at{" "}
            {PROJECT_MANAGEMENT_FEE_RATE_PERCENT}% of project value + {GST_LABEL}.
          </li>
          <li>
            <strong className="text-stone-800">External brokerage or advertising.</strong> Third-party
            costs may be separate and should be agreed with the owner.
          </li>
        </ul>
      </Section>

      <Section title="Flat annual fee vs percentage of rent">
        <p className="mb-8 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          There is no universally better model — it depends on rent level, services included, and how
          predictable you need costs to be. The table compares typical patterns in the market with
          what RelyBricks publishes today. It is not a quote.
        </p>
        <ComparisonTable
          columns={COST_COMPARISON_COLUMNS}
          rows={COST_COMPARISON_ROWS}
          caption="Flat annual fee vs percentage of rent — how the models usually differ"
          firstColumnHeader="Attribute"
        />
      </Section>

      <Section title="How to compare quotes fairly" tone="muted" width="prose">
        <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          <li>
            Write down your situation — tenanted or vacant; apartment, villa, bungalow or plot;
            local or remote owner.
          </li>
          <li>Request inclusions in writing — tenants, bills, inspections, vacant care, emergencies.</li>
          <li>Confirm visit and reporting frequency — photos, video, written reports.</li>
          <li>List likely add-ons — placement fees, extra visits, maintenance markup, property works.</li>
          <li>Set maintenance approval rules — thresholds, emergency authority, who signs off quotes.</li>
          <li>Compare total expected annual cost, not only the headline fee.</li>
        </ol>
        <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          For overseas owners, see the{" "}
          <Link
            href="/manage-property-in-chennai-from-abroad"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            guide to managing property from abroad
          </Link>
          . For current inclusions, see the{" "}
          <Link href="/services" className="text-accent-700 font-medium hover:text-accent-600">
            services page
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
