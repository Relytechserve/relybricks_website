/** Single source of truth for public RelyBricks pricing (marketing site). */

export const MANAGEMENT_FEE_RATE = 0.12;
export const MINIMUM_ANNUAL_MANAGEMENT_FEE_INR = 21_000;
export const PROJECT_MANAGEMENT_FEE_RATE = 0.15;
export const GST_LABEL = "applicable GST";

export const MANAGEMENT_FEE_RATE_PERCENT = 12;
export const PROJECT_MANAGEMENT_FEE_RATE_PERCENT = 15;

export const PRICING_HEADLINE = "One property. One accountable team. One management fee.";

export const PRICING_CORE_ANSWER =
  "RelyBricks provides end-to-end property management for 12% of your property's annual rental value, subject to a minimum annual management fee of ₹21,000 + applicable GST.";

export const PRICING_NO_TIERS =
  "There are no Basic, Gold or Premium tiers. You receive one end-to-end property management service.";

export const PROJECT_VALUE_DEFINITION =
  "The agreed third-party cost of the work being managed, excluding the RelyBricks project management fee and applicable taxes.";

export const MANAGEMENT_INCLUSIONS = [
  "Tenant sourcing",
  "Tenant screening and onboarding",
  "Rental agreement coordination",
  "Tenant communication",
  "Rent collection and follow-up",
  "Renewal coordination",
  "Move-out coordination",
  "Scheduled property inspections",
  "Photo and video reporting",
  "Maintenance coordination",
  "Urgent property issue coordination",
  "Utility bill coordination",
  "Property tax and payment coordination",
  "Association and community payment coordination",
  "Vacant-property oversight",
  "Owner communication and reporting",
] as const;

export type AnnualManagementFeeResult = {
  annualRentalValue: number;
  calculatedFee: number;
  annualManagementFee: number;
  minimumApplied: boolean;
};

export function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function calculateAnnualManagementFee(
  monthlyRentalValue: number,
): AnnualManagementFeeResult | null {
  if (!Number.isFinite(monthlyRentalValue) || monthlyRentalValue <= 0) {
    return null;
  }

  const annualRentalValue = monthlyRentalValue * 12;
  const calculatedFee = Math.round(annualRentalValue * MANAGEMENT_FEE_RATE);
  const minimumApplied = calculatedFee < MINIMUM_ANNUAL_MANAGEMENT_FEE_INR;
  const annualManagementFee = minimumApplied
    ? MINIMUM_ANNUAL_MANAGEMENT_FEE_INR
    : calculatedFee;

  return {
    annualRentalValue,
    calculatedFee,
    annualManagementFee,
    minimumApplied,
  };
}

/** Example rows for the cost guide pricing table (server-rendered). */
export const PRICING_EXAMPLE_ROWS = [
  10_000, 15_000, 25_000, 30_000, 40_000, 50_000,
] as const;

export function getPricingExampleRow(monthlyRent: number) {
  const result = calculateAnnualManagementFee(monthlyRent);
  if (!result) return null;
  return {
    monthlyRent,
    ...result,
  };
}
