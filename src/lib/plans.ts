import "server-only";
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import {
  mergeTiersWithPrices,
  type SubscriptionTier,
  type SubscriptionTierPrice,
  type TierWithPrices,
} from "./plan-types";

export const PLANS_REVALIDATE_SECONDS = 3600;

async function fetchActiveSubscriptionTiersUncached(): Promise<
  TierWithPrices[] | null
> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  try {
    const supabase = createClient(url, anonKey);

    const { data: tierRows, error: tierError } = await supabase
      .from("subscription_tiers")
      .select("id, name, description, is_custom, is_active")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (tierError) {
      return null;
    }

    const tiersData = (tierRows ?? []) as SubscriptionTier[];
    if (tiersData.length === 0) {
      return [];
    }

    const { data: priceRows, error: priceError } = await supabase
      .from("subscription_tier_prices")
      .select("id, tier_id, city, amount, currency, is_active")
      .in(
        "tier_id",
        tiersData.map((tier) => tier.id),
      )
      .eq("is_active", true);

    if (priceError) {
      return null;
    }

    return mergeTiersWithPrices(
      tiersData,
      (priceRows ?? []) as SubscriptionTierPrice[],
    );
  } catch {
    return null;
  }
}

const getCachedActiveSubscriptionTiers = unstable_cache(
  async () => {
    const result = await fetchActiveSubscriptionTiersUncached();
    if (result === null) {
      throw new Error("UNCACHEABLE_PLANS_FAILURE");
    }
    return result;
  },
  ["active-subscription-plans"],
  { revalidate: PLANS_REVALIDATE_SECONDS },
);

/**
 * Public catalog of active subscription tiers.
 * Returns `[]` when none are active, `null` when the fetch fails.
 * Failures are not cached so a later request can recover.
 */
export async function getActiveSubscriptionTiers(): Promise<
  TierWithPrices[] | null
> {
  try {
    return await getCachedActiveSubscriptionTiers();
  } catch {
    return null;
  }
}
