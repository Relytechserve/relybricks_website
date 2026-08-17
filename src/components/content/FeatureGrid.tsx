import type { FeatureItem } from "@/components/content/types";

type FeatureGridProps = {
  items: FeatureItem[];
};

export default function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col rounded-3xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            {item.icon ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white">
                {item.icon}
              </div>
            ) : null}
            <div>
              <h3 className="text-sm font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
