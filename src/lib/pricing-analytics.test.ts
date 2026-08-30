/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackPricingCalculatorCalculate,
  trackPricingCalculatorView,
  trackPricingEstimateLeadSubmit,
} from "./pricing-analytics";

describe("pricing-analytics", () => {
  const gtag = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
    delete (window as { gtag?: unknown }).gtag;
  });

  it("fires allowed events without PII fields", () => {
    (window as { gtag?: typeof gtag }).gtag = gtag;

    trackPricingCalculatorView();
    trackPricingCalculatorCalculate(true);
    trackPricingEstimateLeadSubmit();

    expect(gtag).toHaveBeenCalledTimes(3);
    for (const call of gtag.mock.calls) {
      const payload = call[2] as Record<string, unknown> | undefined;
      const serialized = JSON.stringify(payload ?? {});
      expect(serialized).not.toMatch(/email|phone|rent|fee|name|location/i);
    }
    expect(gtag).toHaveBeenCalledWith("event", "pricing_calculator_view", expect.any(Object));
    expect(gtag).toHaveBeenCalledWith("event", "pricing_calculator_calculate", {
      event_category: "engagement",
      event_label: "minimum_applied",
    });
    expect(gtag).toHaveBeenCalledWith("event", "pricing_estimate_lead_submit", expect.any(Object));
  });
});
