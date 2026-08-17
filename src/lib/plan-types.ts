export type SubscriptionTier = {
  id: string;
  name: string;
  description: string | null;
  is_custom: boolean;
  is_active: boolean;
};

export type SubscriptionTierPrice = {
  id: string;
  tier_id: string;
  city: string;
  amount: number;
  currency: string | null;
  is_active: boolean;
};

export type TierWithPrices = SubscriptionTier & {
  prices: SubscriptionTierPrice[];
};

export const PLANS_UPDATING_MESSAGE =
  "We're updating our subscription plans. Please check back shortly or contact us for pricing.";

export const PLANS_MISSING_CLIENT_MESSAGE =
  "We’re updating our subscription plans. Please check back shortly or contact us for pricing.";

export const PLANS_EMPTY_MESSAGE =
  "We're finalising our subscription plans. Please contact us for the latest pricing.";

export const PLANS_LOADING_MESSAGE = "Loading our subscription plans…";

export function mergeTiersWithPrices(
  tiers: SubscriptionTier[],
  prices: SubscriptionTierPrice[],
): TierWithPrices[] {
  return tiers.map((tier) => ({
    ...tier,
    prices: prices.filter((price) => price.tier_id === tier.id),
  }));
}
