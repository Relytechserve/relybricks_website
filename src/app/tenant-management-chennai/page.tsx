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
import JsonLd from "@/components/JsonLd";
import { HUB_PATH } from "@/content/aeo-shared";
import {
  TENANT_AUDIENCE,
  TENANT_BREADCRUMBS,
  TENANT_FAQS,
  TENANT_FEATURES,
  TENANT_H1,
  TENANT_METADATA,
  TENANT_OPENING,
  TENANT_RELATED,
  TENANT_SERVICE,
  TENANT_STEPS,
} from "@/content/tenant-management-chennai";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { buildServiceWebPageGraph } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(TENANT_METADATA);

export default function TenantManagementChennaiPage() {
  return (
    <ContentPage breadcrumbs={TENANT_BREADCRUMBS}>
      <JsonLd
        data={buildServiceWebPageGraph({
          ...TENANT_SERVICE,
          pageName: TENANT_METADATA.title,
          pageDescription: TENANT_METADATA.description,
        })}
      />
      <PageHero
        eyebrow="Tenancy lifecycle · Chennai"
        title={TENANT_H1}
        answer={TENANT_OPENING}
        supporting={`Call ${CONTACT_PHONE_DISPLAY} to talk through a vacant or tenanted home.`}
        primaryCta={{ href: CONTACT_PHONE_TEL, label: `Call ${CONTACT_PHONE_DISPLAY}` }}
        secondaryCta={{ href: "/contact", label: "Share your property details" }}
      />

      <Section title="How the tenancy is handled" tone="muted">
        <ProcessSteps steps={TENANT_STEPS} />
      </Section>

      <Section title="Tenant services">
        <FeatureGrid items={TENANT_FEATURES} />
      </Section>

      <Section title="How RelyBricks helps find a tenant" tone="muted" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            When a home needs a new occupant, RelyBricks can market the property and
            source prospective tenants through its own network, property marketplace
            listings, partners and brokers. The channels used depend on the property
            and the agreed sourcing approach.
          </p>
          <p>
            RelyBricks does not promise a filled home by a set date, a particular
            rent, or that every sourcing channel will be used for every property.
          </p>
          <p>
            People who come through any channel still go through screening and, if
            suitable, onboarding. Finding a tenant is the start of the lifecycle,
            not a substitute for it.
          </p>
          <p>
            If the property is empty while you wait, preparation (cleaning and minor
            repairs) can sit alongside sourcing. Ongoing vacant-home care for owners
            who are not letting yet is covered on the{" "}
            <Link href={HUB_PATH} className="text-accent-700 font-medium hover:text-accent-600">
              main property management
            </Link>{" "}
            page.
          </p>
        </div>
      </Section>

      <Section title="Who this helps">
        <AudienceList items={TENANT_AUDIENCE} />
      </Section>

      <FaqList
        items={TENANT_FAQS}
        includeSchema
        eyebrow="FAQ"
        title="Questions about tenant management"
      />

      <Section title="Related reading" tone="muted">
        <RelatedLinks items={TENANT_RELATED} />
      </Section>

      <CtaBanner
        heading="Want the tenant relationship handled locally?"
        text="Tell us whether the home is occupied, vacant, or coming up for renewal. You will get a clear scope for sourcing, screening and ongoing management."
      />
    </ContentPage>
  );
}
