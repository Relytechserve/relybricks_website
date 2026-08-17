import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import StatRow from "./StatRow";

describe("StatRow", () => {
  it("renders only values passed in as props", () => {
    const html = renderToString(
      <StatRow
        items={[
          {
            label: "[TEST] Example metric",
            value: "[TEST] 3",
            hint: "[TEST] Placeholder hint",
          },
        ]}
      />,
    );

    expect(html).toContain("[TEST] Example metric");
    expect(html).toContain("[TEST] 3");
    expect(html).toContain("[TEST] Placeholder hint");
    expect(html).not.toContain("10+");
    expect(html).not.toContain("100+");
  });
});
