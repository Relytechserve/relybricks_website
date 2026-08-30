type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as typeof window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

export function trackPricingCalculatorView() {
  getGtag()?.("event", "pricing_calculator_view", {
    event_category: "engagement",
    event_label: "pricing_calculator",
  });
}

export function trackPricingCalculatorCalculate(minimumApplied: boolean) {
  getGtag()?.("event", "pricing_calculator_calculate", {
    event_category: "engagement",
    event_label: minimumApplied ? "minimum_applied" : "percentage_applied",
  });
}

export function trackPricingEstimateLeadSubmit() {
  getGtag()?.("event", "pricing_estimate_lead_submit", {
    event_category: "engagement",
    event_label: "pricing_calculator",
  });
}
