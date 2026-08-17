import type { AudienceItem } from "@/components/content/types";

type AudienceListProps = {
  items: AudienceItem[];
};

export default function AudienceList({ items }: AudienceListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-stone-200 bg-white px-5 py-5 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-stone-950">{item.title}</h3>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
