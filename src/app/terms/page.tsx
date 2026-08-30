import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | RelyBricks",
  description: "Terms and conditions of use for the RelyBricks website and property management services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | RelyBricks",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-accent-700 to-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
          <p className="mt-4 text-xl text-stone-300 max-w-2xl">Last updated: 30 August 2026</p>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions govern your use of the RelyBricks Property Management website
            at relybricks.com.
          </p>
          <p>
            RelyBricks Property Management provides property management and related services
            primarily for residential properties in Chennai.
          </p>
          <p>
            References to &quot;RelyBricks&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot; in these Terms refer to the
            RelyBricks entity providing the relevant service.
          </p>
          <p>
            Use of this website is subject to these Terms. Property management services provided to
            an owner are additionally governed by the proposal, scope of services and/or Property
            Management Agreement entered into with that owner.
          </p>
          <p>
            Where there is any inconsistency between information on this website and a signed
            Property Management Agreement, the signed agreement will govern the provision of the
            relevant services.
          </p>

          <h2>2. Property Management Services</h2>
          <p>
            RelyBricks provides property management services that may include, depending on the
            agreed scope:
          </p>
          <ul>
            <li>tenant sourcing and onboarding</li>
            <li>tenant communication</li>
            <li>rent collection and follow-up</li>
            <li>rental agreement and renewal coordination</li>
            <li>move-in and move-out coordination</li>
            <li>scheduled property inspections</li>
            <li>photo and video reporting</li>
            <li>maintenance and repair coordination</li>
            <li>coordination of urgent property issues</li>
            <li>utility, property-tax and association/community payment coordination</li>
            <li>vacant-property oversight</li>
            <li>owner communication and reporting</li>
          </ul>
          <p>
            The exact scope for each property will be confirmed in the applicable proposal and/or
            Property Management Agreement.
          </p>
          <p>
            Tenant sourcing is included within RelyBricks&apos; standard end-to-end property management
            service.
          </p>
          <p>
            Where external brokerage, paid advertising or other third-party services are required,
            those third-party costs may be separately agreed with the owner.
          </p>

          <h2>3. Property Management Pricing</h2>
          <p>RelyBricks&apos; standard annual property management fee is:</p>
          <p>
            12% of the property&apos;s annual rental value, subject to a minimum annual management fee
            of ₹21,000, plus applicable GST.
          </p>
          <p>The standard calculation is:</p>
          <p>Monthly rental value × 12 × 12%.</p>
          <p>
            The management fee covers RelyBricks&apos; agreed property management and coordination
            services.
          </p>
          <p>
            It does not include underlying costs belonging to the property itself, including vendor
            labour, materials, utilities, taxes, statutory charges, association dues, professional
            fees or other third-party expenses unless expressly stated otherwise.
          </p>
          <p>
            For a vacant property or a property without a current tenant, an agreed expected monthly
            rental value may be used for pricing.
          </p>
          <p>
            Unless otherwise agreed in writing, the management fee is agreed for the applicable
            management term.
          </p>
          <p>
            Changes in rent or temporary vacancy do not automatically recalculate the management fee
            during that term.
          </p>
          <p>Pricing may be reviewed when the management arrangement is renewed.</p>
          <p>
            Multiple-property, plot/land, owner-occupied, sale-only or other non-standard
            requirements may be separately scoped and quoted.
          </p>
          <p>
            The applicable proposal and Property Management Agreement will confirm the final fee and
            scope for a particular property.
          </p>

          <h2>4. Pricing Calculator</h2>
          <p>The pricing calculator on this website provides an indicative estimate only.</p>
          <p>
            The estimate is based on the monthly rental value entered by the user and the standard
            RelyBricks pricing formula.
          </p>
          <p>
            A calculator result does not constitute a binding quotation, offer or contract.
          </p>
          <p>
            Final pricing, property scope, service requirements, applicable taxes and separately
            chargeable third-party or project costs will be confirmed in writing before services
            commence.
          </p>

          <h2>5. Property Works and Project Management</h2>
          <p>
            Routine coordination of maintenance and property issues forms part of the agreed
            property-management service.
          </p>
          <p>
            The actual cost of repair, maintenance, refurbishment or improvement work undertaken at
            a property is separate from the annual property-management fee.
          </p>
          <p>
            Where RelyBricks manages such works, a project management fee of 15% of the agreed
            project value, plus applicable GST, may apply.
          </p>
          <p>
            For this purpose, &quot;project value&quot; means the agreed third-party cost of the work being
            managed, excluding the RelyBricks project-management fee and applicable taxes, unless
            otherwise stated in the applicable quotation or agreement.
          </p>
          <p>
            Vendor labour, materials and other third-party costs are separate from RelyBricks&apos;
            project-management fee.
          </p>
          <p>
            The scope, expected cost and approvals for material project work will normally be agreed
            with the owner before work proceeds, subject to any emergency authority separately
            agreed with the owner.
          </p>

          <h2>6. Owner Instructions and Approvals</h2>
          <p>
            Owners are responsible for providing accurate information about their property and for
            giving RelyBricks the authority and access reasonably required to perform the agreed
            services.
          </p>
          <p>
            Where owner approval is required for expenditure, contractual decisions or material
            works, RelyBricks will seek that approval in accordance with the applicable service
            agreement.
          </p>
          <p>
            Owners should ensure that RelyBricks has current contact information and appropriate
            instructions for urgent property issues, particularly where the owner lives outside
            India or in another time zone.
          </p>

          <h2>7. Third-Party Contractors and Services</h2>
          <p>
            RelyBricks may coordinate independent contractors, vendors, brokers or other
            third-party service providers on behalf of an owner.
          </p>
          <p>
            Third-party providers are responsible for performing the work or services they have been
            engaged to provide.
          </p>
          <p>
            RelyBricks will exercise reasonable care in coordinating third-party services within its
            agreed scope but does not guarantee the performance, availability or workmanship of an
            independent third-party provider.
          </p>
          <p>Nothing in this section limits any rights or remedies that cannot lawfully be excluded.</p>

          <h2>8. No Guarantee of Rental or Occupancy</h2>
          <p>
            Property management involves matters that may depend on tenants, market conditions,
            third-party providers and other circumstances outside RelyBricks&apos; control.
          </p>
          <p>Unless expressly agreed otherwise in writing, RelyBricks does not guarantee:</p>
          <ul>
            <li>continuous occupancy</li>
            <li>a particular rental value</li>
            <li>the time required to find a tenant</li>
            <li>uninterrupted rent payments</li>
            <li>tenant conduct</li>
            <li>property appreciation</li>
            <li>a particular completion date for third-party repairs</li>
          </ul>
          <p>
            This does not affect RelyBricks&apos; obligation to provide the services it has agreed to
            perform with reasonable care.
          </p>

          <h2>9. Website and Informational Content</h2>
          <p>
            Information on this website is provided to explain RelyBricks&apos; services and general
            property-management matters.
          </p>
          <p>
            Content relating to property ownership, taxation, legal documentation, powers of attorney,
            tenancy arrangements or similar matters is general information and should not be treated
            as legal, tax, accounting or other professional advice.
          </p>
          <p>Appropriate professional advice should be obtained where required.</p>

          <h2>10. Website Use</h2>
          <p>You must not use the website:</p>
          <ul>
            <li>unlawfully or fraudulently</li>
            <li>to interfere with the operation or security of the website</li>
            <li>to attempt unauthorised access to our systems</li>
            <li>to transmit malicious code or unlawful material</li>
            <li>
              to systematically extract or reproduce website content without our permission where
              such permission is legally required
            </li>
          </ul>

          <h2>11. Contact Forms and Pricing Enquiries</h2>
          <p>
            When you submit a contact form, request a pricing estimate or otherwise communicate with
            RelyBricks, we process the information you provide in accordance with our{" "}
            <Link href="/privacy" className="text-accent-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            Information submitted through the pricing calculator or enquiry forms may be used to
            respond to your enquiry, prepare an indicative or formal proposal and communicate with
            you regarding the relevant property-management services.
          </p>
          <p>
            Submitting an enquiry does not oblige you or RelyBricks to enter into a service
            agreement.
          </p>

          <h2>12. Intellectual Property</h2>
          <p>
            Unless otherwise stated, content on relybricks.com, including text, graphics, branding,
            design and software, belongs to RelyBricks or its licensors and is protected by applicable
            intellectual-property laws.
          </p>
          <p>
            You may use the website for personal and legitimate business-evaluation purposes.
          </p>
          <p>
            You may not reproduce, distribute or commercially exploit substantial website content
            without permission except where permitted by law.
          </p>

          <h2>13. Limitation of Liability</h2>
          <p>RelyBricks does not exclude or limit liability where doing so would be unlawful.</p>
          <p>
            Subject to applicable law and the terms of the relevant Property Management Agreement,
            RelyBricks will not be responsible for indirect or consequential loss arising solely
            from use of this website.
          </p>
          <p>
            Liability relating to the actual provision of property-management services will be
            governed primarily by the applicable Property Management Agreement and applicable law.
          </p>
          <p>
            Nothing in these Terms is intended to exclude statutory consumer rights or liability
            that cannot legally be excluded or restricted.
          </p>

          <h2>14. Third-Party Websites and Services</h2>
          <p>
            This website may contain links to third-party websites or services.
          </p>
          <p>
            RelyBricks is not responsible for third-party website content, availability or privacy
            practices, and accessing those services is subject to the relevant provider&apos;s terms.
          </p>

          <h2>15. Electronic Communications</h2>
          <p>
            Where permitted, communications, proposals, approvals and other records may be exchanged
            electronically.
          </p>
          <p>
            Specific execution requirements for a Property Management Agreement or other legal
            document will be determined by the applicable agreement and law.
          </p>

          <h2>16. Changes to these Terms</h2>
          <p>
            We may update these Terms periodically to reflect changes to our website, services,
            pricing or legal requirements.
          </p>
          <p>The date at the top indicates the latest version.</p>
          <p>
            Changes to website Terms do not retrospectively amend a separately signed Property
            Management Agreement unless the agreement expressly provides otherwise.
          </p>

          <h2>17. Governing Law and Disputes</h2>
          <p>These Terms are governed by the laws of India.</p>
          <p>
            Subject to applicable consumer-protection and other mandatory laws, disputes relating to
            use of this website will be subject to the jurisdiction of the competent courts in
            Chennai, Tamil Nadu.
          </p>
          <p>
            Disputes relating to property-management services will also be subject to any
            dispute-resolution provisions contained in the relevant Property Management Agreement.
          </p>

          <h2>18. Contact</h2>
          <p>For questions about these Terms, contact:</p>
          <p>
            RelyBricks Property Management
            <br />
            Chennai, India
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@relybricks.com" className="text-accent-600 hover:underline">
              info@relybricks.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+919952004948" className="text-accent-600 hover:underline">
              +91 99520 04948
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
