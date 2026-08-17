import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ComparisonTable from "./ComparisonTable";

const EXAMPLE_COLUMNS = [
  { key: "alpha", header: "[TEST] Provider A" },
  { key: "beta", header: "[TEST] Provider B" },
];

const EXAMPLE_ROWS = [
  {
    id: "nri",
    label: "[TEST] NRI support",
    values: { alpha: "Yes", beta: "Not publicly stated" },
  },
  {
    id: "price",
    label: "[TEST] Pricing",
    values: { alpha: "₹16,000/year" },
  },
];

describe("ComparisonTable", () => {
  it("renders a semantic table in server HTML", () => {
    const html = renderToString(
      <ComparisonTable
        caption="[TEST] Example comparison"
        columns={EXAMPLE_COLUMNS}
        rows={EXAMPLE_ROWS}
      />,
    );

    expect(html).toContain("<table");
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
    expect(html).toContain("[TEST] Provider A");
    expect(html).toContain("[TEST] NRI support");
    expect(html).toContain("Not publicly stated");
    expect(html).toContain("₹16,000/year");
    expect(html).toContain('role="region"');
  });
});
