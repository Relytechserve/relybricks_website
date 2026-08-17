import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProcessSteps from "./ProcessSteps";

describe("ProcessSteps", () => {
  it("renders an ordered list in server HTML", () => {
    const html = renderToString(
      <ProcessSteps
        steps={[
          { title: "[TEST] First", body: "[TEST] Example first step." },
          { title: "[TEST] Second", body: "[TEST] Example second step." },
        ]}
      />,
    );

    expect(html).toContain("<ol");
    expect(html).toContain("<li");
    expect(html).toContain("[TEST] First");
    expect(html).toContain("[TEST] Example second step.");
    expect(html).toContain("01 ·");
    expect(html).toContain("02 ·");
  });
});
