import Link from "next/link";
import ArticleHeader from "@/components/content/ArticleHeader";
import ContentPage from "@/components/content/ContentPage";
import CtaBanner from "@/components/content/CtaBanner";
import DirectAnswer from "@/components/content/DirectAnswer";
import FaqList from "@/components/content/FaqList";
import ProcessSteps from "@/components/content/ProcessSteps";
import RelatedLinks from "@/components/content/RelatedLinks";
import Section from "@/components/content/Section";
import JsonLd from "@/components/JsonLd";
import {
  AEO_INFO_DATE_PUBLISHED,
  AEO_INFO_DATE_REVIEWED,
  AEO_INFO_PUBLISHER,
  COST_PATH,
} from "@/content/aeo-shared";
import {
  ABROAD_BREADCRUMBS,
  ABROAD_FAQS,
  ABROAD_H1,
  ABROAD_METADATA,
  ABROAD_OPENING,
  ABROAD_RELATED,
  ABROAD_STEPS,
} from "@/content/manage-property-in-chennai-from-abroad";
import { CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import { buildArticle } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(ABROAD_METADATA);

export default function ManagePropertyInChennaiFromAbroadPage() {
  return (
    <ContentPage breadcrumbs={ABROAD_BREADCRUMBS}>
      <JsonLd
        data={buildArticle({
          headline: ABROAD_H1,
          description: ABROAD_METADATA.description,
          path: ABROAD_METADATA.path,
          datePublished: AEO_INFO_DATE_PUBLISHED,
          dateModified: AEO_INFO_DATE_REVIEWED,
          authorName: AEO_INFO_PUBLISHER,
        })}
      />
      <ArticleHeader
        title={ABROAD_H1}
        description="Practical steps for overseas and out-of-station owners — documents, access, tenants, rent, maintenance, inspections, bills and emergencies."
        author={AEO_INFO_PUBLISHER}
        datePublished={AEO_INFO_DATE_PUBLISHED}
        dateReviewed={AEO_INFO_DATE_REVIEWED}
        readingTime="12 min"
      />

      <DirectAnswer
        question="How do I manage my Chennai property while living abroad?"
        answer={ABROAD_OPENING}
      />

      <Section title="Twelve practical steps" tone="muted">
        <ProcessSteps steps={ABROAD_STEPS} />
      </Section>

      <Section title="Tenanted vs vacant while you are away" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            <strong className="text-stone-800">Tenanted:</strong> Prioritise tenant
            communication, rent follow-up, maintenance response, renewal dates, and
            inspections that document condition.
          </p>
          <p>
            <strong className="text-stone-800">Vacant:</strong> Prioritise
            visit-led upkeep, security of the empty home, cleaning, minor repairs,
            and preparation if you plan to let or sell.
          </p>
          <p>
            You can be in both situations over time — scope should change when
            occupancy changes. For tenanted homes, see{" "}
            <Link
              href="/tenant-management-chennai"
              className="text-accent-700 font-medium hover:text-accent-600"
            >
              tenant management in Chennai
            </Link>
            . For vacant residential care, see{" "}
            <Link
              href="/property-management-chennai"
              className="text-accent-700 font-medium hover:text-accent-600"
            >
              property management in Chennai
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section title="What you should not rely on alone" tone="muted" width="prose">
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Many owners initially ask relatives or friends to keep an eye on things.
          That can work for occasional visits but often breaks down when tenants
          call at night, vendors need payment, or society demands signatures.
          Professional management is not a comment on family trust — it is a way to
          put accountability and reporting on one local team so relationships stay
          personal and operations stay structured.
        </p>
      </Section>

      <Section title="How RelyBricks can help" width="prose">
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          <p>
            RelyBricks provides property management in Chennai for owners in the
            city, elsewhere in India, and overseas. The Chennai team can manage
            tenant sourcing and the tenancy lifecycle, vacant residential care,
            maintenance and emergencies, inspections with photo and video, and
            bills, taxes and community payments. Annual plans start from
            ₹16,000/year; exact scope depends on the property and plan.
          </p>
          <p>
            This guide stands alone whether or not you use RelyBricks. For
            dedicated support while you live overseas, see{" "}
            <Link
              href="/nri-property-management-chennai"
              className="text-accent-700 font-medium hover:text-accent-600"
            >
              NRI property management in Chennai
            </Link>
            . For how fees are structured, see the{" "}
            <Link
              href={COST_PATH}
              className="text-accent-700 font-medium hover:text-accent-600"
            >
              property management cost guide
            </Link>
            . To request a written plan, call {CONTACT_PHONE_DISPLAY} or use the{" "}
            <Link href="/contact" className="text-accent-700 font-medium hover:text-accent-600">
              contact form
            </Link>
            .
          </p>
        </div>
      </Section>

      <FaqList
        items={ABROAD_FAQS}
        includeSchema
        eyebrow="FAQ"
        title="Questions from owners living abroad"
      />

      <Section title="Related reading" tone="muted">
        <RelatedLinks items={ABROAD_RELATED} />
      </Section>

      <CtaBanner
        heading="Need a local team while you are abroad?"
        text="Share whether your Chennai property is tenanted or vacant. RelyBricks will propose a clear plan within one business day."
      />
    </ContentPage>
  );
}
