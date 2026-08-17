import Link from "next/link";
import type { RelatedLinkItem } from "@/components/content/types";

type RelatedLinksProps = {
  items: RelatedLinkItem[];
};

export default function RelatedLinks({ items }: RelatedLinksProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm hover:border-accent-300 hover:shadow-md transition-all"
        >
          <h3 className="text-sm font-semibold text-stone-950">{item.title}</h3>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
