"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase";

type SubscriptionTier = {
  id: string;
  name: string;
  description: string | null;
  is_custom: boolean;
  is_active: boolean;
};

type SubscriptionTierPrice = {
  id: string;
  tier_id: string;
  city: string;
  amount: number;
  currency: string | null;
  is_active: boolean;
};

type TierWithPrices = SubscriptionTier & { prices: SubscriptionTierPrice[] };

const PLAN_COPY: Record<
  string,
  {
    badge: string;
    desc: string;
    features: string[];
  }
> = {
  Basic: {
    badge: "Up to 1000 sq. ft",
    desc: "BASIC package for apartments up to 1000 sq. ft. Includes bills, tenant management, yearly cleaning, pest control and pay-and-use services worth ₹1,000.",
    features: [
      "Paying utility bills & taxes",
      "Tenant management & rent collection",
      "1x general cleaning + 1x pest control per year",
      "2 property visits with photo/video updates",
      "Pay-and-use services worth ₹1,000",
    ],
  },
  Gold: {
    badge: "Up to 1500 sq. ft · Most popular",
    desc: "GOLD package for larger homes up to 1500 sq. ft. Adds more visits, more cleaning and higher pay-and-use coverage.",
    features: [
      "Everything in Basic",
      "2x general cleaning + 2x pest control per year",
      "Quarterly visits with detailed updates",
      "Pay-and-use services worth ₹2,000",
      "Account manager & priority support",
    ],
  },
  Premium: {
    badge: "For portfolios & estates",
    desc: "Tailored plans for bungalows, beach houses and combined properties.",
    features: [
      "Everything in Gold",
      "Sale / purchase preparation & coordination",
      "Land & plot maintenance",
      "Custom SLAs and reporting",
    ],
  },
};

function formatAmount(amount: number | null | undefined) {
  if (amount == null) return "Talk to us";
  return `₹${Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}/year`;
}

export default function PlansSection() {
  const [tiers, setTiers] = useState<TierWithPrices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setError(
        "We’re updating our subscription plans. Please check back shortly or contact us for pricing.",
      );
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { data: tierRows, error: tierError } = await supabase
          .from("subscription_tiers")
          .select("id, name, description, is_custom, is_active")
          .eq("is_active", true)
          .order("name", { ascending: true });

        if (tierError) {
          setError(
            "We're updating our subscription plans. Please check back shortly or contact us for pricing.",
          );
          return;
        }

        const tiersData = (tierRows ?? []) as SubscriptionTier[];
        if (tiersData.length === 0) {
          setTiers([]);
          return;
        }

        const tierIds = tiersData.map((t) => t.id);

        const { data: priceRows, error: priceError } = await supabase
          .from("subscription_tier_prices")
          .select("id, tier_id, city, amount, currency, is_active")
          .in("tier_id", tierIds)
          .eq("is_active", true);

        if (priceError) {
          setError(
            "We're updating our subscription plans. Please check back shortly or contact us for pricing.",
          );
          return;
        }

        const pricesData = (priceRows ?? []) as SubscriptionTierPrice[];
        const merged: TierWithPrices[] = tiersData.map((t) => ({
          ...t,
          prices: pricesData.filter((p) => p.tier_id === t.id),
        }));
        setTiers(merged);
      } catch {
        setError(
          "We're updating our subscription plans. Please check back shortly or contact us for pricing.",
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  if (loading && !tiers.length) {
    return (
      <p className="mt-6 text-xs sm:text-sm text-stone-300">
        Loading our subscription plans…
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-6 text-xs sm:text-sm text-stone-300">
        {error}
      </p>
    );
  }

  if (tiers.length === 0) {
    return (
      <p className="mt-6 text-xs sm:text-sm text-stone-300">
        We&apos;re finalising our subscription plans. Please contact us for the latest pricing.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
      {tiers.map((tier) => {
        const copy = PLAN_COPY[tier.name] ?? {
          badge: "Standard plan",
          desc: tier.description ?? "Subscription plan for property management.",
          features: [
            "Professional property management",
            "Transparent reporting",
            "Local vendor coordination",
          ],
        };

        const chennaiPrice = tier.prices.find(
          (p) => p.city.toLowerCase() === "chennai",
        );
        const bangalorePrice = tier.prices.find(
          (p) => p.city.toLowerCase() === "bangalore",
        );
        const highlight = tier.name.toLowerCase().includes("gold");
        const isCustomOrPremium =
          tier.is_custom || tier.name.toLowerCase().includes("premium");

        return (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-2xl border ${
              highlight
                ? "border-accent-400 bg-gradient-to-b from-accent-600 to-stone-900 shadow-2xl shadow-accent-500/20 md:scale-[1.02]"
                : "border-stone-700 bg-stone-800/80"
            } p-6 sm:p-7`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-stone-400">
                  {tier.name} Plan
                </p>
                <div className="mt-3 space-y-1 text-xs text-stone-200">
                  {isCustomOrPremium ? (
                    <p className="text-stone-200">
                      Contact us for pricing in Chennai, Bangalore and other cities.
                    </p>
                  ) : (
                    <>
                      {chennaiPrice && (
                        <p>
                          <span className="font-semibold text-white">Chennai:</span>{" "}
                          {formatAmount(chennaiPrice.amount)}
                        </p>
                      )}
                      {bangalorePrice && (
                        <p>
                          <span className="font-semibold text-white">Bangalore:</span>{" "}
                          {formatAmount(bangalorePrice.amount)}
                        </p>
                      )}
                      {!chennaiPrice && !bangalorePrice && (
                        <p className="text-stone-300">
                          City-based pricing available on request.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <span className="rounded-full bg-stone-800/80 px-3 py-1 text-[11px] font-medium text-stone-100">
                {copy.badge}
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-stone-300">{copy.desc}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-xs sm:text-sm text-stone-200">
              {copy.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckCircleIcon className="mt-0.5 h-3.5 w-3.5 text-accent-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide ${
                highlight
                  ? "bg-white text-stone-950 hover:bg-stone-100"
                  : "bg-stone-800 text-stone-50 hover:bg-stone-700"
              }`}
            >
              Talk to us about {tier.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

