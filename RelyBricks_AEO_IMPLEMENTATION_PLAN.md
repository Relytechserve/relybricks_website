# RelyBricks AEO + SEO Implementation Plan for Cursor

**Website:** https://relybricks.com  
**Primary market:** Chennai, India  
**Primary audience:** NRIs, overseas owners, out-of-station owners, and busy local professionals  
**Primary objective:** Make RelyBricks more likely to surface when people ask ChatGPT, Gemini, Claude, Perplexity, Google and other answer/search engines for property-management recommendations in Chennai.

---

## 1. What success looks like

RelyBricks should be a credible candidate for queries such as:

1. What are the best property management companies in Chennai?
2. Recommend a property management company in Chennai for an NRI.
3. Who can manage my apartment in Chennai while I live abroad?
4. Best NRI property management services in Chennai.
5. Property management companies in Chennai with tenant management.
6. Who can collect rent and coordinate maintenance for my Chennai property?
7. How much does property management cost in Chennai?
8. How do I manage a property in Chennai from the UK / US / UAE / Singapore?
9. Property management in Velachery / OMR / Adyar / Anna Nagar / ECR.
10. RelyBricks vs other Chennai property management companies.

This plan is **not** about keyword stuffing. The goal is to make RelyBricks easy for machines and humans to understand, verify, compare and cite.

---

# 2. Existing facts Cursor may use

These facts are already present on the live RelyBricks website and can be reused consistently:

- Brand: RelyBricks / RelyBricks Property Management
- Location: Chennai, India
- Positioning: reliable, innovative, tech-enabled property management
- Audience: NRIs, overseas/out-of-station homeowners and local professionals
- 10+ years of experience
- 100+ properties under care
- Average response time stated as `< 24h`
- Annual subscription plans start from `₹16,000/year`
- Property types include apartments, villas, bungalows and plots
- Services include:
  - tenant lifecycle management
  - rent collection
  - tenant screening/onboarding
  - agreements and renewals
  - maintenance and emergency response
  - bills, taxes and community payments
  - cleaning and pest control
  - inspections, visits, photos and reports
  - interior design/refurbishment
  - buying, selling and documentation support
  - land/plot care
  - concierge/value-added services
- Contact:
  - Phone: +91 99520 04948
  - Email: info@relybricks.com

## Important factual guardrail

**Do not invent:**

- customer counts beyond published numbers
- addresses
- awards
- accreditations
- Google review counts or ratings
- testimonials
- service-area coverage
- response SLAs
- competitor pricing
- competitor features
- market-share claims
- “best”, “#1”, “leading”, or similar unsupported claims

If information is not already in the repository or on a verified public source, insert a clearly marked content placeholder instead of fabricating it.

---

# 3. Non-negotiable implementation rules

Cursor must follow these throughout the project.

1. **Inspect the existing repository first.**
2. Preserve the current framework, visual identity, reusable components and deployment approach.
3. Do not rebuild the site from scratch.
4. Do not create duplicate/thin pages purely to target keywords.
5. Every new page must provide genuinely useful information.
6. Pages must be server-rendered, statically rendered or otherwise fully crawlable in final HTML where the existing framework permits.
7. Give every indexable page:
   - unique title
   - unique meta description
   - canonical URL
   - H1
   - meaningful introductory answer
   - semantic heading structure
   - internal links
   - structured data where appropriate
8. Do not hide SEO text.
9. Do not add fake reviews or fake review schema.
10. Keep structured data consistent with visible page content.
11. Preserve performance and accessibility.
12. Do not publish programmatic locality pages unless each contains real, unique local content.
13. Keep the existing primary conversion actions prominent.
14. Run build/lint/tests before deployment.
15. Do not alter AI-training crawler settings unless explicitly instructed; AEO/search crawling and model-training crawling are separate decisions.

---

# 4. Recommended information architecture

## P0 — Core pages

Create or strengthen these first:

| Priority | Route | Purpose |
|---|---|---|
| P0 | `/property-management-chennai` | Main category authority page |
| P0 | `/nri-property-management-chennai` | High-intent NRI page |
| P0 | `/tenant-management-chennai` | Tenant/rental lifecycle intent |
| P0 | `/property-maintenance-chennai` | Maintenance and remote coordination |
| P0 | `/property-management-cost-chennai` | Pricing/cost question |
| P0 | `/manage-property-in-chennai-from-abroad` | Informational + high-intent NRI guide |
| P0 | `/best-property-management-companies-chennai` | Independent-style comparison/resource page |

## P1 — Supporting pages

| Route | Purpose |
|---|---|
| `/property-inspection-chennai` | Inspection/reporting intent |
| `/rent-collection-chennai` | Rent collection intent |
| `/vacant-property-management-chennai` | Empty/locked property intent |
| `/land-plot-management-chennai` | Plot/land owners |
| `/property-management-for-nri-uk` | UK-based NRI journey |
| `/property-management-for-nri-us` | US-based NRI journey |
| `/property-management-for-nri-uae` | UAE-based NRI journey |
| `/property-management-for-nri-singapore` | Singapore-based NRI journey |

Only publish country-specific pages when the content is meaningfully different and helpful.

## P2 — Locality pages

Candidates include:

- Velachery
- OMR
- Adyar
- Anna Nagar
- ECR
- Porur
- Thoraipakkam
- Sholinganallur
- Tambaram
- Medavakkam

**Do not publish all of these automatically.**

A locality page should only go live when RelyBricks genuinely serves that location and the page can contain useful local knowledge such as:

- typical property types
- common owner challenges
- maintenance considerations
- access/inspection considerations
- rental-management considerations
- relevant RelyBricks experience
- real case study or anonymised example if available

Avoid doorway-page templates that merely swap a locality name.

---

# 5. Content format for AEO pages

Every major page should use this structure.

## Above the fold

### H1
Use natural language matching the user problem.

### Direct answer
Within the first 80–120 words, explicitly answer:

- what the service is
- who it is for
- where it operates
- what RelyBricks handles
- what makes the proposition different

Example structure:

> RelyBricks provides end-to-end property management in Chennai for NRIs, out-of-station owners and busy local homeowners. The service can cover tenant management, rent collection, inspections, maintenance, bill coordination and structured reporting through one accountable Chennai-based team. Annual plans currently start from ₹16,000, with scope depending on the property and service plan.

Do not force this exact wording everywhere.

## Recommended section sequence

1. Direct answer
2. Who this service is for
3. Problems RelyBricks solves
4. Services included
5. How the process works
6. Pricing / what affects cost
7. Evidence / proof
8. Real example or case study
9. Questions owners commonly ask
10. Related services
11. CTA

## Answer formatting

Answer engines work better with content that is easy to extract.

Use:

- short explanatory paragraphs
- descriptive H2/H3 headings
- bullets where useful
- factual comparison tables
- step-by-step sections
- concise question-and-answer blocks
- specific Chennai references
- dates on time-sensitive articles
- author/reviewer where appropriate

Avoid:

- long marketing-only introductions
- repeated generic adjectives
- invisible text
- excessive keyword repetition
- dozens of near-identical FAQs

---

# 6. Core page briefs

## 6.1 `/property-management-chennai`

### Suggested title
`Property Management in Chennai for NRIs & Homeowners | RelyBricks`

### Suggested meta description
`End-to-end property management in Chennai for NRIs and local homeowners. Tenant management, maintenance, inspections, rent coordination and digital reporting.`

### H1
`Property Management in Chennai You Can Rely On`

### Must cover

- what professional property management means
- RelyBricks audience
- tenant management
- inspections
- maintenance
- rent/payment coordination
- bills/taxes/community payments
- remote reporting
- apartments, villas, bungalows and plots
- annual subscription model
- starting price if still accurate
- how onboarding works
- why overseas owners typically need a local accountable partner
- links to all specialist pages

### Key questions to answer

- What does a property management company in Chennai do?
- How can an NRI manage property in Chennai remotely?
- Does RelyBricks find and manage tenants?
- Can RelyBricks coordinate repairs?
- Does RelyBricks inspect properties?
- How much does property management cost?
- Can RelyBricks manage vacant properties?
- Can RelyBricks help with selling a property?

---

## 6.2 `/nri-property-management-chennai`

### Suggested title
`NRI Property Management in Chennai | RelyBricks`

### H1
`NRI Property Management in Chennai`

### Opening intent

Answer the overseas-owner problem immediately.

### Must cover

- owner living abroad
- not relying on elderly parents/friends
- inspection/photos/reporting
- tenant communication
- vendor coordination
- emergency handling
- rent/payment follow-up
- documentation coordination
- remote onboarding process
- time-zone friendly communication if this is genuinely offered
- UK / US / UAE / Singapore examples only when factual

### Include a section

`What happens if something goes wrong while I am abroad?`

---

## 6.3 `/tenant-management-chennai`

### Suggested title
`Tenant Management Services in Chennai | RelyBricks`

### Must cover

- property readiness
- listing/marketing if actually provided
- tenant screening
- onboarding
- rental agreement coordination
- move-in
- rent collection/follow-up
- tenant issues
- repair coordination
- renewals
- move-out/inspection

### Add a process component

`Prepare → Find/Screen → Onboard → Manage → Renew/Exit`

---

## 6.4 `/property-maintenance-chennai`

### Suggested title
`Property Maintenance & Repair Management Chennai | RelyBricks`

### Must cover

- proactive maintenance
- emergency response
- plumber/electrician/AC/pest control
- vendor coordination
- owner approval process
- photos/evidence
- inspection
- vacant-property issues
- monsoon/flood preparedness only where RelyBricks can speak credibly

---

## 6.5 `/property-management-cost-chennai`

### Suggested title
`Property Management Cost in Chennai: 2026 Guide | RelyBricks`

### H1
`How Much Does Property Management Cost in Chennai?`

### Critical requirement

This must be an **educational pricing page**, not merely a sales page.

Explain:

- annual subscription vs percentage-of-rent models
- what affects the cost
- tenant-management requirements
- property type
- inspection frequency
- maintenance scope
- vacant vs tenanted property
- size/location where relevant
- one-off vs ongoing work

Mention RelyBricks' current starting price only if it remains accurate.

Include:

`Last reviewed: [date]`

---

## 6.6 `/manage-property-in-chennai-from-abroad`

### Suggested title
`How to Manage Property in Chennai While Living Abroad`

This should be a genuinely useful guide.

### Structure

1. Keep ownership/title documents organised
2. Establish reliable local access
3. Secure utilities and recurring payments
4. Inspect the property periodically
5. Maintain photo/video evidence
6. Put a tenant process in place
7. Define maintenance approval limits
8. Track rent and renewals
9. Prepare for Chennai weather/monsoon risks
10. Use one accountable local property-management partner

Naturally explain where RelyBricks can help.

---

# 7. Competitor comparison page

## Route

`/best-property-management-companies-chennai`

## Suggested title

`Property Management Companies in Chennai: 2026 Comparison`

## Objective

This page is intended to be useful enough that search engines and answer engines can cite it when people compare Chennai property-management companies.

## Important

Do **not** create a biased “RelyBricks is #1” article.

A credible article should explain that different providers suit different owner requirements.

## Candidate companies to research

Research current factual information before publication. Potential candidates include:

- RelyBricks
- Nimmadhi
- Rajam Property Management
- 360 Property Management Services
- Housewise
- NoBroker Property Management
- Propertism

The final set can change based on verified current information.

## Comparison dimensions

- Chennai presence
- primary customer type
- NRI focus
- tenant management
- inspections
- maintenance coordination
- rent collection
- land/plot care
- buying/selling support
- digital reporting
- pricing transparency
- subscription vs commission model
- areas served
- distinguishing proposition

## Editorial rules

1. Use publicly verifiable information.
2. Link to official company sources where appropriate.
3. State `Last reviewed: [date]`.
4. Never invent unavailable pricing.
5. Write `Not publicly stated` when data is unavailable.
6. Do not make defamatory or subjective negative claims.
7. Explain the methodology.
8. Make it clear RelyBricks publishes the comparison.
9. Include a disclosure.
10. Update at least quarterly.

## Suggested disclosure

> This comparison is published by RelyBricks. We have tried to use publicly available information from provider websites and other verifiable sources. Services, pricing and coverage can change, so readers should verify details directly with each provider before making a decision.

---

# 8. Evidence and authority layer

AEO requires more than pages that say RelyBricks is good.

Build pages that demonstrate expertise.

## 8.1 Case studies

Create a reusable case-study template:

- owner situation
- property type
- Chennai area
- challenge
- RelyBricks actions
- measurable result
- duration
- anonymisation note if required
- owner quote only with permission

Potential examples already hinted at by the live website:

- flood-affected Chennai property
- overseas homeowner managing remotely
- tenant-management case
- vacant-property recovery
- refurbishment before tenancy/sale

Do not invent metrics.

## 8.2 Original data / annual report

Future route:

`/chennai-property-management-report-2026`

Possible anonymised insights:

- average maintenance tickets/property
- common repair categories
- average response times
- renewal rates
- vacant vs occupied maintenance trends
- neighbourhood rental trends
- common NRI-owner problems
- monsoon-related maintenance issues

Only publish statistics based on real internal data.

Original RelyBricks data is especially valuable because other sites can cite it.

---

# 9. Technical SEO / AEO foundation

Cursor must inspect the current implementation before changing anything.

## 9.1 Metadata

Every indexable page needs:

- `<title>`
- meta description
- canonical
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter/X card metadata where supported
- crawlable H1

Create a reusable SEO/head component if one does not already exist.

---

## 9.2 Canonical URLs

Canonical should use the production HTTPS domain consistently:

`https://relybricks.com/...`

Choose either `www` or non-`www` based on current production canonical/redirect behaviour and use only one version.

Do not create conflicting canonicals.

---

## 9.3 Sitemap

Ensure:

`/sitemap.xml`

contains all canonical indexable pages.

Exclude:

- private pages
- admin pages
- duplicate pages
- test/staging routes
- success/thank-you pages when not useful in search
- parameter duplicates

Automatically update the sitemap when new content is published if the framework supports it.

---

## 9.4 Robots.txt

Ensure:

`/robots.txt`

exists and references the sitemap.

### Search/AEO crawler intent

RelyBricks wants discoverability in AI search.

Allow normal search crawling and do not accidentally block:

- Googlebot
- OAI-SearchBot
- Claude-SearchBot
- PerplexityBot

OpenAI separates `OAI-SearchBot` (search visibility) from `GPTBot` (model training).

Anthropic similarly separates `Claude-SearchBot` from `ClaudeBot`.

**Do not change GPTBot, ClaudeBot or any other training-crawler policy without explicit approval.**

A safe pattern is:

```txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://relybricks.com/sitemap.xml
```

Before committing this, Cursor must merge it with any existing robots rules rather than overwriting valid exclusions.

---

## 9.5 Structured data

Use JSON-LD.

### Homepage/about

Use an appropriate combination of:

- `Organization`
- `LocalBusiness`

Only include fields that are true and visible/consistent with the site.

Potential properties:

- `@id`
- `name`
- `url`
- `logo`
- `image`
- `telephone`
- `email`
- `description`
- `areaServed`
- `sameAs`
- `address` only if a genuine public business address exists
- `foundingDate` only if verified
- `priceRange` only if meaningful and accurate

### Service pages

Use semantic `Service` markup where appropriate.

Connect services to RelyBricks as provider.

### Article/guide pages

Use:

- `Article` or `BlogPosting`
- `headline`
- `description`
- `datePublished`
- `dateModified`
- `author`
- `publisher`
- `image`
- `mainEntityOfPage`

### Navigation

Use `BreadcrumbList` for nested content pages.

### Reviews

Do not add review or aggregate-rating schema unless the implementation complies with the relevant search-engine guidelines and the underlying reviews are genuine and visible.

### FAQ

Write visible question/answer content for users and answer engines.

Do **not** assume FAQ schema will create Google rich results. If FAQPage markup is used, it must exactly represent visible content and remain standards-compliant.

---

# 10. `llms.txt`

An `llms.txt` file can be added as a low-risk experimental machine-readable index, but it must **not** be treated as a ranking guarantee or replacement for normal crawling, sitemap, semantic HTML or structured data.

Suggested route:

`/llms.txt`

Suggested content:

```txt
# RelyBricks

> RelyBricks is a property management company in Chennai, India, serving NRIs, overseas owners, out-of-station homeowners and local professionals.

## Core pages
- https://relybricks.com/property-management-chennai
- https://relybricks.com/nri-property-management-chennai
- https://relybricks.com/tenant-management-chennai
- https://relybricks.com/property-maintenance-chennai
- https://relybricks.com/property-management-cost-chennai
- https://relybricks.com/manage-property-in-chennai-from-abroad
- https://relybricks.com/services
- https://relybricks.com/aboutus
- https://relybricks.com/contact

## Services
RelyBricks supports tenant lifecycle management, property inspections, maintenance coordination, payments, remote reporting, refurbishment, buying/selling support and land/plot care.

## Contact
- Website: https://relybricks.com
- Email: info@relybricks.com
- Phone: +91 99520 04948
```

Update this file as major pages change.

---

# 11. Internal linking strategy

Every new page must belong to a logical cluster.

## Main hub

`/property-management-chennai`

should link to:

- NRI property management
- tenant management
- maintenance
- inspections
- rent collection
- pricing
- remote-management guide
- comparison
- locality pages

Each child page should link back to the hub.

## Homepage

Add natural links in existing sections to:

- Property Management Chennai
- NRI Property Management Chennai
- Tenant Management
- Property Maintenance
- Pricing Guide

Do not overload the navigation.

## Footer

Consider a compact `Property Management Resources` section with the highest-value evergreen pages.

---

# 12. Content quality checklist

A page must not be published unless all are true.

- [ ] Search intent is obvious
- [ ] Page has unique purpose
- [ ] H1 is unique
- [ ] Title is unique
- [ ] Meta description is unique
- [ ] Direct answer appears near the top
- [ ] Chennai context is natural
- [ ] RelyBricks facts are verified
- [ ] No invented statistics
- [ ] No unsupported superlatives
- [ ] Useful details beyond marketing copy
- [ ] Relevant internal links
- [ ] CTA present
- [ ] Images have useful alt text
- [ ] Mobile layout checked
- [ ] Accessibility checked
- [ ] Canonical present
- [ ] Included in sitemap
- [ ] Structured data validates
- [ ] No accidental `noindex`
- [ ] Build/tests pass
- [ ] Page works without client-side interaction for core content where feasible

---

# 13. Cursor prompts

The prompts below are intended to be used **sequentially**.

Do not paste all of them into Cursor at once.

---

## CURSOR PROMPT 0 — Repository and AEO audit

```text
You are working on the production website for RelyBricks Property Management: https://relybricks.com.

Before changing code, perform a complete repository audit.

Goal:
Prepare this website for an AEO/SEO expansion without redesigning or destabilising the existing site.

Inspect:
1. Framework and rendering model.
2. Routing.
3. Existing page/component architecture.
4. Existing SEO/meta implementation.
5. Canonical handling.
6. robots.txt.
7. sitemap.xml or sitemap generation.
8. structured data / JSON-LD.
9. analytics.
10. content storage pattern.
11. image handling.
12. navigation/footer.
13. production deployment configuration.
14. test/lint/build commands.
15. any staging-vs-production behaviour.

Then produce a concise implementation report containing:

A. Current architecture.
B. What already works well.
C. AEO/SEO technical gaps.
D. Files/components you propose changing.
E. New files/components/routes you propose creating.
F. Risks or regressions to avoid.
G. Implementation order.

Important:
- DO NOT modify code in this step.
- DO NOT redesign the website.
- DO NOT invent business information.
- Reuse current components and branding.
- Treat the existing live site as production-critical.
```

---

## CURSOR PROMPT 1 — Technical AEO foundation

```text
Using the repository audit you just completed, implement the technical AEO/SEO foundation for RelyBricks.

Do not redesign existing pages.

Requirements:

1. Ensure every indexable page supports:
   - unique title
   - meta description
   - canonical URL
   - Open Graph metadata
   - social preview image metadata where supported

2. Create/reuse a central SEO metadata utility/component appropriate for this framework.

3. Ensure the production canonical host is consistent with the site's existing redirect behaviour.

4. Implement or improve sitemap.xml generation.
   - Include canonical public pages.
   - Exclude private, duplicate, test, admin and irrelevant success routes.

5. Inspect and safely update robots.txt.
   - Preserve valid existing restrictions.
   - Ensure normal public content is crawlable.
   - Explicitly allow OAI-SearchBot, Claude-SearchBot and PerplexityBot unless an existing intentional policy conflicts.
   - Do not change GPTBot or ClaudeBot training-crawler policy without explicit instruction.
   - Include the production sitemap URL.

6. Add reusable JSON-LD support.

7. Add accurate Organization / LocalBusiness JSON-LD using ONLY verified RelyBricks facts from the repo/live content.
   Do not invent a street address, founding year, rating, award or accreditation.

8. Add BreadcrumbList support for nested content pages.

9. Add Article/BlogPosting schema support for editorial pages.

10. Add semantic Service schema support where appropriate.

11. Add /llms.txt as an experimental discovery aid.
    It must not replace sitemap or robots.

12. Ensure important content is crawlable in rendered HTML.

13. Add automated tests where reasonable for:
    - metadata
    - sitemap
    - robots
    - JSON-LD validity/shape
    - route rendering

14. Run lint/test/build.

Before editing, show me the exact file plan.
Then implement.
After implementation, report:
- files changed
- routes affected
- tests run
- any items that require manual verification
- any deployment considerations
```

---

## CURSOR PROMPT 2 — Create the content-page system

```text
Build a reusable content-page system for RelyBricks AEO landing pages and guides.

The system must fit the existing website design.

I need reusable components/patterns for:

- hero/title
- direct-answer summary
- service/problem sections
- feature cards
- step-by-step process
- comparison table
- FAQ/question-answer blocks
- evidence/stat block
- case-study block
- related-content links
- breadcrumb
- author/reviewer/date metadata for guides
- CTA

Requirements:

1. Reuse existing design tokens/components wherever possible.
2. Avoid a generic blog-template appearance.
3. Keep content semantic and crawlable.
4. Use clean H1/H2/H3 hierarchy.
5. Make tables mobile friendly and accessible.
6. Make all components keyboard accessible.
7. Do not hide meaningful content behind JavaScript-only accordions unless the HTML remains present/crawlable.
8. Support JSON-LD hooks.
9. Support per-page metadata and canonical.
10. Support a visible "Last reviewed" date for time-sensitive guides/comparisons.
11. Do not create pages yet.

Run lint/test/build when done and summarise the component API.
```

---

## CURSOR PROMPT 3 — Build the three highest-priority pages

```text
Using the new AEO content-page system, build these production-ready pages:

1. /property-management-chennai
2. /nri-property-management-chennai
3. /tenant-management-chennai

Use the business facts already present in this repository/live website.

Writing rules:
- Answer the user's question directly in the first 80-120 words.
- Write for humans first.
- Avoid keyword stuffing.
- Avoid empty marketing language.
- Use Chennai-specific context naturally.
- Do not invent locations, testimonials, ratings, metrics, pricing or SLAs.
- Use the existing 10+ years, 100+ properties, <24h response and ₹16,000/year facts only if they are still present as current facts in the repo.
- Use clear question/answer sections.
- Include strong internal linking.
- Include an appropriate CTA.
- Add per-page metadata/canonical.
- Add BreadcrumbList.
- Add appropriate Service/WebPage structured data.
- Include the pages in the sitemap.
- Link them naturally from relevant existing pages, without overcrowding navigation.

For /property-management-chennai:
make it the primary topic hub.

For /nri-property-management-chennai:
focus strongly on managing Chennai property from overseas without relying on friends/elderly parents.

For /tenant-management-chennai:
cover the lifecycle from preparation/screening through onboarding, rent management, issues, renewal and move-out, but only state services RelyBricks actually provides.

Before writing code, show:
- title
- meta description
- H1
- proposed section outline for each page

Then implement, test and build.
```

---

## CURSOR PROMPT 4 — Build cost + remote-management guides

```text
Create these two high-quality educational pages:

1. /property-management-cost-chennai
2. /manage-property-in-chennai-from-abroad

These should be useful editorial resources, not thin sales pages.

PROPERTY MANAGEMENT COST PAGE

Title direction:
Property Management Cost in Chennai: 2026 Guide | RelyBricks

Answer:
- common property-management pricing approaches
- annual subscriptions vs percentage/commission approaches
- factors affecting cost
- tenanted vs vacant properties
- service frequency
- inspection requirements
- maintenance scope
- property size/type
- one-off vs ongoing requirements

Mention RelyBricks' current published starting price only if verified in the repository.

Do NOT invent market-average fees without a cited/verifiable source.

REMOTE MANAGEMENT GUIDE

Create a practical guide for someone living outside Chennai.

Cover:
- documents
- local access
- bills
- inspections
- photos/videos
- tenants
- rent tracking
- maintenance approval process
- emergency coordination
- Chennai weather/monsoon considerations
- when a professional manager is useful

Naturally explain RelyBricks' role without turning every section into an advert.

Technical requirements:
- Last reviewed date
- Article/BlogPosting markup
- author/publisher data
- breadcrumb
- canonical
- internal links
- sitemap inclusion
- accessible responsive design

Run tests/build.
```

---

## CURSOR PROMPT 5 — Build the Chennai competitor comparison

```text
Create a new page:

/best-property-management-companies-chennai

Working title:
Property Management Companies in Chennai: 2026 Comparison

This page must be credible, balanced and factual.

Research and compare a sensible set of active Chennai providers, potentially including:
- RelyBricks
- Nimmadhi
- Rajam Property Management
- 360 Property Management Services
- Housewise
- NoBroker Property Management
- Propertism

IMPORTANT:
If you do not have reliable web/research access, STOP the competitor-data portion and build the page structure with clearly labelled TODO placeholders for human-verified facts.
Never guess.

Compare only verified attributes such as:
- Chennai presence
- NRI focus
- tenant management
- maintenance
- inspections
- rent collection
- plot/land care
- buying/selling support
- digital reporting
- publicly stated pricing
- positioning

Rules:
1. Never claim RelyBricks is #1.
2. Do not invent competitor weaknesses.
3. Use "Not publicly stated" when information is unavailable.
4. Add source links for factual competitor information.
5. Add "Last reviewed" date.
6. Add methodology section.
7. Add publisher disclosure explaining RelyBricks created the comparison.
8. Explain that services/pricing can change.
9. Make the table accessible on mobile.
10. Add Article/WebPage structured data, breadcrumbs, metadata, canonical and internal links.
11. Add sitemap entry.

Suggested disclosure:
"This comparison is published by RelyBricks. We have tried to use publicly available information from provider websites and other verifiable sources. Services, pricing and coverage can change, so readers should verify details directly with each provider before making a decision."

Do not publish the page with unverified placeholder competitor facts.

Run tests/build.
```

---

## CURSOR PROMPT 6 — Build maintenance + inspection + vacant property pages

```text
Create three specialist pages using the existing AEO page system:

1. /property-maintenance-chennai
2. /property-inspection-chennai
3. /vacant-property-management-chennai

Each page must have a clearly different search intent and genuinely useful content.

Do not duplicate paragraphs between pages.

Use verified RelyBricks services only.

Include:
- direct answer near top
- who needs the service
- common risks/problems
- what RelyBricks can handle
- how the process works
- owner communication/reporting
- relevant FAQs
- related pages
- CTA
- metadata
- canonical
- breadcrumb
- Service/WebPage structured data
- sitemap entry
- internal links

For vacant-property content, discuss risks such as unnoticed leaks, electrical/plumbing problems, pests, security and deterioration in sensible general terms without making unsupported statistics.

For Chennai weather/monsoon references, avoid alarmist claims.

Run lint/test/build.
```

---

## CURSOR PROMPT 7 — Locality-page framework, but do not mass publish

```text
Create a locality-page capability for RelyBricks, but DO NOT automatically publish dozens of near-identical SEO pages.

First identify which Chennai areas are genuinely supported by evidence already present in the repository, portfolio, case studies or business data.

Candidate areas may include:
Velachery, OMR, Adyar, Anna Nagar, ECR, Porur, Thoraipakkam, Sholinganallur, Tambaram and Medavakkam.

For each proposed area, create a content-readiness report with:

- proof RelyBricks serves the area
- real property/service examples available
- local knowledge available
- unique content we can write
- whether the page should be published now

A locality page can only be published if there is enough unique material to include:
- local property context
- owner problems relevant to that area
- property types
- maintenance/inspection considerations
- rental/tenant context where known
- genuine RelyBricks experience

Do not create doorway pages that only replace a locality name in a template.

Implement the reusable framework, but only publish locality pages that pass the content-readiness threshold.
```

---

## CURSOR PROMPT 8 — Case studies and authority content

```text
Create a reusable RelyBricks case-study system.

Case studies must support:
- title
- property type
- Chennai area
- owner situation
- challenge
- actions taken
- result
- optional verified metrics
- optional approved customer quote
- photos where permission exists
- anonymisation
- related service pages
- CTA
- Article/CaseStudy-style semantic markup where appropriate
- metadata
- canonical
- breadcrumb

Then inspect the existing site/repository for real customer stories already being used.

Prepare draft case-study pages from ONLY existing factual material.

Where required information is missing, insert TODO fields rather than inventing it.

Potential themes:
- flood-affected property
- NRI remote-management story
- tenant-management story
- vacant-property recovery
- refurbishment/preparation

Do not publish a case study containing unverifiable details.

Run lint/test/build.
```

---

## CURSOR PROMPT 9 — Internal linking and navigation optimisation

```text
Audit internal linking after the new AEO pages exist.

Goal:
Make the topic relationships obvious to users and crawlers without making the website look SEO-spammy.

Implement:

1. Make /property-management-chennai the main topic hub.
2. Link relevant service pages to/from that hub.
3. Add contextual links from the homepage where natural.
4. Add contextual links from /services.
5. Add contextual links from /aboutus where useful.
6. Add "Related guides/services" blocks to editorial pages.
7. Add breadcrumb navigation on nested pages.
8. Consider a compact footer "Property Management Resources" group.
9. Detect orphan pages.
10. Detect broken internal links.
11. Avoid repeating exact-match anchor text unnaturally.

Produce an internal-link map after implementation.

Run tests/build.
```

---

## CURSOR PROMPT 10 — AEO/SEO QA gate

```text
Perform a complete pre-production AEO/SEO quality audit of the RelyBricks website.

Do not change content first. Report issues, then fix safe technical issues.

Check every indexable page for:

TECHNICAL
- HTTP success
- indexability
- robots
- canonical
- title
- meta description
- one meaningful H1
- logical headings
- sitemap presence
- no accidental noindex
- no duplicate canonical
- crawlable core content
- mobile layout
- performance regressions
- broken links
- image alt text
- accessibility basics

STRUCTURED DATA
- valid JSON
- Organization/LocalBusiness consistency
- Service markup consistency
- Article markup
- BreadcrumbList
- no fabricated ratings/reviews
- all schema reflects visible content

CONTENT
- direct answer appears early
- page intent is unique
- no duplicate/thin pages
- no keyword stuffing
- no unsupported "best/#1/leading" claims
- business stats match the live business facts
- location claims are factual
- competitor facts are sourced
- time-sensitive pages show last-reviewed date

AEO CRAWLERS
- OAI-SearchBot not accidentally blocked
- Claude-SearchBot not accidentally blocked
- PerplexityBot not accidentally blocked
- sitemap referenced in robots

BUILD
- lint
- unit/integration tests
- production build

Output a PASS/FAIL checklist by route and fix all safe failures.
Anything requiring business verification should remain explicitly flagged rather than guessed.
```

---

## CURSOR PROMPT 11 — Production deployment

```text
Prepare the completed RelyBricks AEO release for production.

Before deployment:

1. Run all tests.
2. Run lint.
3. Run production build.
4. Check git diff for accidental unrelated changes.
5. Check for secrets or environment values accidentally committed.
6. Verify canonical domain.
7. Verify robots.txt.
8. Verify sitemap.xml.
9. Verify all new routes return successfully.
10. Verify no production page has noindex accidentally.
11. Verify schema output is valid JSON.
12. Verify mobile rendering.
13. Verify CTA/contact actions still work.
14. Verify forms still work.
15. Verify analytics still load as expected.

If this repository has a configured production deployment workflow and credentials are available, use the existing safe deployment process.

Do not invent a new hosting/deployment architecture.

After deployment, verify the live production URLs and return a deployment report containing:

- commit/release identifier
- pages deployed
- live URL checks
- sitemap check
- robots check
- schema check
- known issues
- any Search Console/manual steps required
```

---

# 14. Post-deployment manual actions

Some work cannot be completed purely through source-code deployment.

## Google

- verify Google Search Console ownership
- submit/refresh sitemap
- inspect important URLs
- request indexing for the highest-priority new pages
- monitor impressions/query growth
- ensure Google Business Profile is accurate and consistent

## Bing / Microsoft ecosystem

- verify Bing Webmaster Tools if not already configured
- submit sitemap
- monitor indexing

## AI search

After publication, periodically test prompts in:

- ChatGPT Search
- Perplexity
- Claude with web search
- Gemini

Track whether RelyBricks is:

1. mentioned
2. cited
3. recommended
4. excluded
5. misdescribed

Record the sources AI systems cite instead.

---

# 15. Suggested AEO test suite

Run these queries monthly and record the results.

## Category

- property management companies in Chennai
- best property management companies in Chennai
- property management services Chennai
- Chennai property managers

## NRI

- NRI property management Chennai
- best property management company in Chennai for NRIs
- manage Chennai property from abroad
- manage Chennai property from London
- who can look after my Chennai flat while I live overseas

## Service

- tenant management services Chennai
- rent collection service Chennai
- property inspection Chennai
- property maintenance company Chennai
- vacant property management Chennai
- land management service Chennai

## Comparison

- RelyBricks property management reviews
- RelyBricks vs Nimmadhi
- RelyBricks vs NoBroker property management
- compare Chennai property management companies

---

# 16. Measurement dashboard

Track at least monthly.

| Metric | Why it matters |
|---|---|
| Google organic impressions | Overall discoverability |
| Non-branded impressions | Category authority |
| Non-branded clicks | Search acquisition |
| Queries containing "property management Chennai" | Core category |
| Queries containing "NRI" | Priority audience |
| Indexed AEO pages | Crawl/index health |
| Referrals from ChatGPT | AI-search traffic |
| Referrals from Perplexity | AI-search traffic |
| Referrals from Gemini/Google surfaces where measurable | AI visibility |
| Leads by landing page | Commercial impact |
| Calls/forms from organic visitors | Conversion |
| AI answer mention rate | AEO outcome |
| AI citation rate | Stronger AEO outcome |

For ChatGPT referrals, ensure analytics retains referrer/UTM information rather than stripping it.

---

# 17. Recommended execution order

## Release 1 — Foundation
- technical SEO/AEO
- robots
- sitemap
- canonical
- metadata
- structured data
- llms.txt
- reusable content components

## Release 2 — Core authority
Publish:
1. property management Chennai
2. NRI property management Chennai
3. tenant management Chennai

## Release 3 — High-intent informational
Publish:
4. property-management cost Chennai
5. manage property in Chennai from abroad
6. property maintenance Chennai
7. inspection/vacant property pages

## Release 4 — Comparison authority
Publish the Chennai provider comparison **only after competitor facts are verified**.

## Release 5 — Evidence
- case studies
- original RelyBricks data
- annual Chennai property-management report

## Release 6 — Local expansion
Publish only genuinely useful locality pages.

---

# 18. Recommended first Cursor instruction

Start here.

```text
Read the file AEO_IMPLEMENTATION_PLAN.md in full.

Treat it as the product/SEO specification for this project.

Do not try to implement the entire file in one change.

Start with "CURSOR PROMPT 0 — Repository and AEO audit".

Do not modify production code yet.

Return the audit and recommended file-by-file implementation plan, then wait for me to ask you to proceed to Prompt 1.
```

---

# 19. Final principle

The objective is not to make RelyBricks "look optimised for AI".

The objective is to make RelyBricks the **clearest, most verifiable and most useful source on the web for people trying to manage property in Chennai**, particularly when the owner is living elsewhere.

If the site achieves that, conventional SEO and answer-engine visibility should reinforce each other.
