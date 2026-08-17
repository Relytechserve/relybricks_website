import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  buildBreadcrumbList,
  type BreadcrumbItem,
} from "@/lib/jsonld";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/**
 * Visible breadcrumb trail plus BreadcrumbList JSON-LD.
 * Not mounted on existing marketing pages; for nested AEO pages in later prompts.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={buildBreadcrumbList(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-stone-400">
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span className="font-medium text-stone-900">{item.name}</span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-accent-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
