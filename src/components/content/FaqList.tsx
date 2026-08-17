import JsonLd from "@/components/JsonLd";
import { buildFaqPage } from "@/lib/jsonld";
import type { FaqItem } from "@/lib/home-faq";

type FaqListProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** When true, emit FAQPage JSON-LD from the same `items` array. Default false. */
  includeSchema?: boolean;
};

export default function FaqList({
  items,
  eyebrow = "FAQ",
  title = "Questions owners usually ask",
  intro,
  includeSchema = false,
}: FaqListProps) {
  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      {includeSchema ? <JsonLd data={buildFaqPage(items)} /> : null}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl">
            {intro}
          </p>
        ) : null}
        <dl className="mt-10 space-y-4">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-3xl border border-stone-200 bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-sm"
            >
              <dt>
                <h3 className="text-sm sm:text-base font-semibold text-stone-950">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-2 text-sm text-stone-600 leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
