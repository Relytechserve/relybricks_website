import type { ComparisonColumn, ComparisonRow } from "@/components/content/types";

const NOT_STATED = "Not publicly stated";

type ComparisonTableProps = {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
  firstColumnHeader?: string;
};

export default function ComparisonTable({
  columns,
  rows,
  caption,
  firstColumnHeader = "Attribute",
}: ComparisonTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-2xl border border-stone-200 bg-white"
      role="region"
      aria-label={caption ?? "Comparison table"}
      tabIndex={0}
    >
      <table className="min-w-full text-left text-sm text-stone-700">
        {caption ? (
          <caption className="px-4 py-3 text-left text-sm font-medium text-stone-900">
            {caption}
          </caption>
        ) : null}
        <thead className="bg-stone-50">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-stone-900 whitespace-nowrap">
              {firstColumnHeader}
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 font-semibold text-stone-900 whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-stone-200">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-stone-900 whitespace-nowrap"
              >
                {row.label}
              </th>
              {columns.map((column) => {
                const value = row.values[column.key]?.trim();
                return (
                  <td key={column.key} className="px-4 py-3 whitespace-nowrap">
                    {value ? value : NOT_STATED}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
