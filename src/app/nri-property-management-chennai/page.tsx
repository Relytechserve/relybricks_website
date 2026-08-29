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
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import JsonLd from "@/components/JsonLd";
import { AEO_STATS, TENANT_PATH } from "@/content/aeo-shared";
import {
  getGoogleReviewById,
  NRI_FEATURED_GOOGLE_REVIEW_ID,
} from "@/data/google-reviews";
import {
  NRI_AUDIENCE,
  NRI_BREADCRUMBS,
  NRI_FAQS,
  NRI_FEATURES,
  NRI_H1,
  NRI_METADATA,
  NRI_OPENING,
  NRI_RELATED,
  NRI_SERVICE,
  NRI_STEPS,
} from "@/content/nri-property-management-chennai";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { buildServiceWebPageGraph } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(NRI_METADATA);

export default function NriPropertyManagementChennaiPage() {
  const featuredReview = getGoogleReviewById(NRI_FEATURED_GOOGLE_REVIEW_ID);

  return (
    <ContentPage breadcrumbs={NRI_BREADCRUMBS}>
      <JsonLd
        data={buildServiceWebPageGraph({
          ...NRI_SERVICE,
          pageName: NRI_METADATA.title,
          pageDescription: NRI_METADATA.description,
        })}
      />
      <PageHero
        eyebrow="Owners living abroad · Chennai"
        title={NRI_H1}
        answer={NRI_OPENING}
        supporting={`Call ${CONTACT_PHONE_DISPLAY} or send the property address and whether anyone is living there now.`}
        primaryCta={{ href: CONTACT_PHONE_TEL, label: `Call ${CONTACT_PHONE_DISPLAY}` }}
        secondaryCta={{ href: "/contact", label: "Share your property details" }}
      />

      <Section tone="muted">
        <StatRow items={AEO_STATS} />
      </Section>

      <Section title="What you get when you cannot be in Chennai">
        <FeatureGrid items={NRI_FEATURES} />
      </Section>

      <Section title="If the property is tenanted" tone="muted" width="prose">
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          When someone is living in the home, RelyBricks can handle tenant
          communication, rent collection and follow-up, maintenance, inspections,
          renewals, bills and payments, and reporting back to you. You approve
          decisions that need the owner. Day-to-day tenant calls sit with the
          Chennai team. More detail on sourcing and the tenancy sequence is on the{" "}
          <Link href={TENANT_PATH} className="text-accent-700 font-medium hover:text-accent-600">
            tenant management
          </Link>{" "}
          page.
        </p>
      </Section>

      <Section title="If the property is vacant" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            An empty flat, villa or bungalow still needs local eyes. RelyBricks can
            visit the property, identify maintenance issues, coordinate repairs,
            arrange cleaning, keep the home maintained, send photos and reports, and
            prepare it for a future tenancy or another requirement you set.
          </p>
          <p>
            How often someone visits, and what work is done, follows the agreed
            management scope — not a single published timetable for every vacant
            home. Land and plot care is a separate service if you also own vacant
            land.
          </p>
        </div>
      </Section>

      <Section
        title="What happens if something goes wrong while you are abroad"
        tone="muted"
        width="prose"
      >
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            The tenant or a neighbour should not have to find your parents. They
            reach RelyBricks. The local team coordinates the vendor, keeps a record,
            and updates you with photos where a visit is made. You approve work that
            needs your say.
          </p>
          <p>
            For urgent issues, RelyBricks coordinates the appropriate local vendor
            and keeps you informed. Repair timelines depend on the issue, vendor
            availability and any approvals required from the owner. Most issues are
            acknowledged within 24 hours — that is acknowledgement, not a guaranteed
            repair time.
          </p>
        </div>
      </Section>

      <Section title="Starting while you are overseas">
        <ProcessSteps steps={NRI_STEPS} />
        <p className="mt-8 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          For a broader owner playbook, read the{" "}
          <Link
            href="/manage-property-in-chennai-from-abroad"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            guide to managing property from abroad
          </Link>
          . Annual plans start from ₹16,000/year — see the{" "}
          <Link
            href="/property-management-cost-chennai"
            className="text-accent-700 font-medium hover:text-accent-600"
          >
            property management cost guide
          </Link>{" "}
          for how fees are structured.
        </p>
      </Section>

      <Section title="This page is for you if" tone="muted">
        <AudienceList items={NRI_AUDIENCE} />
      </Section>

      <Section title="What owners say" tone="muted">
        {featuredReview ? (
          <GoogleReviewsSection variant="featured" reviews={[featuredReview]} />
        ) : null}
      </Section>

      <FaqList
        items={NRI_FAQS}
        includeSchema
        eyebrow="FAQ"
        title="Questions from owners living abroad"
      />

      <Section title="Related reading" tone="muted">
        <RelatedLinks items={NRI_RELATED} />
      </Section>

      <CtaBanner
        heading="Live abroad and need someone in Chennai?"
        text="Tell us the property type and whether it is occupied or vacant. You will get one local contact and a written plan."
      />
    </ContentPage>
  );
}
