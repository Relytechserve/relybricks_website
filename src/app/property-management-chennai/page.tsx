import Link from "next/link";
import AudienceList from "@/components/content/AudienceList";
import ContentPage from "@/components/content/ContentPage";
import CtaBanner from "@/components/content/CtaBanner";
import FaqList from "@/components/content/FaqList";
import FeatureGrid from "@/components/content/FeatureGrid";
import PageHero from "@/components/content/PageHero";
import ProcessSteps from "@/components/content/ProcessSteps";
import RelatedLinks from "@/components/content/RelatedLinks";
import Section from "@/components/content/Section";
import StatRow from "@/components/content/StatRow";
import JsonLd from "@/components/JsonLd";
import { AEO_STATS } from "@/content/aeo-shared";
import {
  HUB_AUDIENCE,
  HUB_BREADCRUMBS,
  HUB_FAQS,
  HUB_FEATURES,
  HUB_H1,
  HUB_METADATA,
  HUB_OPENING,
  HUB_RELATED,
  HUB_SERVICE,
  HUB_STEPS,
} from "@/content/property-management-chennai";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { buildServiceWebPageGraph } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(HUB_METADATA);

export default function PropertyManagementChennaiPage() {
  return (
    <ContentPage breadcrumbs={HUB_BREADCRUMBS}>
      <JsonLd
        data={buildServiceWebPageGraph({
          ...HUB_SERVICE,
          pageName: HUB_METADATA.title,
          pageDescription: HUB_METADATA.description,
        })}
      />
      <PageHero
        eyebrow="Property care · Chennai"
        title={HUB_H1}
        answer={HUB_OPENING}
        supporting={`Call ${CONTACT_PHONE_DISPLAY} or share your property details for a written plan. Most issues are acknowledged within 24 hours — that is acknowledgement, not a guaranteed repair time.`}
        primaryCta={{ href: CONTACT_PHONE_TEL, label: `Call ${CONTACT_PHONE_DISPLAY}` }}
        secondaryCta={{ href: "/contact", label: "Share your property details" }}
      />

      <Section tone="muted">
        <StatRow items={AEO_STATS} />
      </Section>

      <Section title="What property management in Chennai involves" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            Professional management is the local work of looking after a home you
            own: tenants or vacancy, repairs, inspections, and recurring payments.
            When you live outside Chennai, that work often falls on friends or
            parents.
          </p>
          <p>
            RelyBricks is the Chennai team that takes the coordination. You still
            own the property and the decisions that need your approval. Day-to-day
            follow-up sits with one accountable partner, with photos and reports so
            you can see what was done.
          </p>
        </div>
      </Section>

      <Section title="What RelyBricks manages" tone="muted">
        <FeatureGrid items={HUB_FEATURES} />
      </Section>

      <Section title="Who the service is for">
        <AudienceList items={HUB_AUDIENCE} />
        <p className="mt-8 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          If you live overseas or in another Indian city, see the{" "}
          <Link
            href="/manage-property-in-chennai-from-abroad"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            guide to managing property from abroad
          </Link>{" "}
          and{" "}
          <Link
            href="/nri-property-management-chennai"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            NRI property management in Chennai
          </Link>
          .
        </p>
      </Section>

      <Section title="How management starts" tone="muted">
        <ProcessSteps steps={HUB_STEPS} />
      </Section>

      <Section title="Property types and what it costs" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            RelyBricks manages apartments, villas and bungalows in Chennai — occupied or vacant.
            Plots and land are scoped and quoted separately. End-to-end property management is
            priced at 12% of annual rental value, subject to a minimum annual management fee of
            ₹21,000 + applicable GST. Each property is calculated separately; portfolio pricing may
            be agreed separately. For examples and a calculator, see the{" "}
            <Link
              href="/property-management-cost-chennai"
              className="text-accent-700 font-medium hover:text-accent-600"
            >
              property management cost guide
            </Link>
            . See what is included on the{" "}
            <Link href="/services" className="text-accent-700 font-medium hover:text-accent-600">
              services page
            </Link>
            .
          </p>
        </div>
      </Section>

      <FaqList
        items={HUB_FAQS}
        includeSchema
        eyebrow="FAQ"
        title="Questions owners ask"
      />

      <Section title="Related reading" tone="muted">
        <RelatedLinks items={HUB_RELATED} />
      </Section>

      <CtaBanner
        heading="Need a local team for your Chennai property?"
        text="Tell us the property type and whether it is tenanted or vacant. You will get a clear, no-jargon plan within one business day."
      />
    </ContentPage>
  );
}
