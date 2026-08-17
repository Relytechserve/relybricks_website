import { describe, expect, it } from "vitest";
import { mergeTiersWithPrices, type SubscriptionTier, type SubscriptionTierPrice } from "./plan-types";

describe("mergeTiersWithPrices", () => {
  it("attaches prices to the matching tier id only", () => {
    const tiers: SubscriptionTier[] = [
      {
        id: "basic",
        name: "Basic",
        description: null,
        is_custom: false,
        is_active: true,
      },
      {
        id: "gold",
        name: "Gold",
        description: null,
        is_custom: false,
        is_active: true,
      },
    ];
    const prices: SubscriptionTierPrice[] = [
      {
        id: "p1",
        tier_id: "gold",
        city: "Chennai",
        amount: 16000,
        currency: "INR",
        is_active: true,
      },
      {
        id: "p2",
        tier_id: "basic",
        city: "Bangalore",
        amount: 14000,
        currency: "INR",
        is_active: true,
      },
    ];

    const merged = mergeTiersWithPrices(tiers, prices);
    expect(merged[0].prices).toEqual([prices[1]]);
    expect(merged[1].prices).toEqual([prices[0]]);
  });
});
