import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/jsonld";

type ContentPageProps = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

/**
 * Owns the visible breadcrumb trail (and its JSON-LD) so other sections
 * do not render a second trail or duplicate BreadcrumbList schema.
 */
export default function ContentPage({ children, breadcrumbs }: ContentPageProps) {
  return (
    <article>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      ) : null}
      {children}
    </article>
  );
}
