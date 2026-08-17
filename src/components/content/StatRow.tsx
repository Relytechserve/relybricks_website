import type { StatItem } from "@/components/content/types";

type StatRowProps = {
  items: StatItem[];
};

export default function StatRow({ items }: StatRowProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 shadow-sm"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">
            {item.label}
          </p>
          <p className="mt-2 text-xl font-semibold text-stone-950">{item.value}</p>
          {item.hint ? (
            <p className="mt-1 text-[11px] text-stone-600">{item.hint}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
