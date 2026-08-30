import { describe, expect, it } from "vitest";
import {
  MANAGEMENT_FEE_RATE,
  MINIMUM_ANNUAL_MANAGEMENT_FEE_INR,
  calculateAnnualManagementFee,
  formatInr,
  getPricingExampleRow,
} from "@/lib/pricing";

describe("pricing", () => {
  it("exposes locked commercial constants", () => {
    expect(MANAGEMENT_FEE_RATE).toBe(0.12);
    expect(MINIMUM_ANNUAL_MANAGEMENT_FEE_INR).toBe(21_000);
  });

  it("applies minimum fee for ₹10,000 monthly rent", () => {
    const result = calculateAnnualManagementFee(10_000);
    expect(result).toEqual({
      annualRentalValue: 120_000,
      calculatedFee: 14_400,
      annualManagementFee: 21_000,
      minimumApplied: true,
    });
  });

  it("calculates percentage fee above minimum for ₹15,000 monthly rent", () => {
    const result = calculateAnnualManagementFee(15_000);
    expect(result).toEqual({
      annualRentalValue: 180_000,
      calculatedFee: 21_600,
      annualManagementFee: 21_600,
      minimumApplied: false,
    });
  });

  it.each([
    [25_000, 300_000, 36_000],
    [30_000, 360_000, 43_200],
    [40_000, 480_000, 57_600],
    [50_000, 600_000, 72_000],
  ])("calculates ₹%i monthly as ₹%i annual fee", (monthly, annualRent, fee) => {
    const result = calculateAnnualManagementFee(monthly);
    expect(result?.annualRentalValue).toBe(annualRent);
    expect(result?.annualManagementFee).toBe(fee);
    expect(result?.minimumApplied).toBe(false);
  });

  it("returns null for invalid inputs", () => {
    expect(calculateAnnualManagementFee(0)).toBeNull();
    expect(calculateAnnualManagementFee(-1)).toBeNull();
    expect(calculateAnnualManagementFee(Number.NaN)).toBeNull();
    expect(calculateAnnualManagementFee(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("formats INR without decimals", () => {
    expect(formatInr(21600)).toBe("₹21,600");
  });

  it("builds pricing example rows", () => {
    const row = getPricingExampleRow(10_000);
    expect(row?.annualManagementFee).toBe(21_000);
    expect(row?.minimumApplied).toBe(true);
  });
});
