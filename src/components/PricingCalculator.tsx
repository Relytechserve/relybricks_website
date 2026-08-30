"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { submitToFormspree } from "@/lib/formspree";
import {
  GST_LABEL,
  MANAGEMENT_FEE_RATE_PERCENT,
  calculateAnnualManagementFee,
  formatInr,
} from "@/lib/pricing";
import {
  trackPricingCalculatorCalculate,
  trackPricingCalculatorView,
  trackPricingEstimateLeadSubmit,
} from "@/lib/pricing-analytics";

type PricingCalculatorProps = {
  className?: string;
  showLeadCapture?: boolean;
};

export default function PricingCalculator({
  className = "",
  showLeadCapture = true,
}: PricingCalculatorProps) {
  const inputId = useId();
  const [monthlyRentInput, setMonthlyRentInput] = useState("15000");
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    trackPricingCalculatorView();
  }, []);

  const monthlyRent = useMemo(() => {
    const parsed = Number(monthlyRentInput.replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : NaN;
  }, [monthlyRentInput]);

  const result = useMemo(() => {
    if (!Number.isFinite(monthlyRent) || monthlyRent <= 0) return null;
    return calculateAnnualManagementFee(monthlyRent);
  }, [monthlyRent]);

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!result) return;

    setLeadStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", "pricing_calculator");
    formData.set("monthly_rental_value", String(monthlyRent));
    formData.set("annual_rental_value", String(result.annualRentalValue));
    formData.set("estimated_annual_management_fee", String(result.annualManagementFee));
    formData.set("minimum_applied", result.minimumApplied ? "yes" : "no");

    try {
      const name = String(formData.get("name") || "Pricing estimate");
      await submitToFormspree(formData, {
        subject: `${name} - RelyBricks pricing estimate`,
      });
      trackPricingEstimateLeadSubmit();
      setLeadStatus("success");
      form.reset();
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <div
      className={`rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      <div>
        <label htmlFor={inputId} className="block text-sm font-semibold text-stone-900">
          Expected or current monthly rental value (₹)
        </label>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={1}
          step={500}
          value={monthlyRentInput}
          onChange={(e) => setMonthlyRentInput(e.target.value)}
          onBlur={() => {
            if (result) trackPricingCalculatorCalculate(result.minimumApplied);
          }}
          className="mt-3 w-full rounded-xl border border-stone-300 px-4 py-3 text-base text-stone-900 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          aria-describedby={`${inputId}-help`}
        />
        <p id={`${inputId}-help`} className="mt-2 text-xs text-stone-500">
          For vacant homes, use the agreed expected monthly rental value.
        </p>
      </div>

      {result ? (
        <div className="mt-8 rounded-2xl border border-accent-200 bg-accent-50/60 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
            Estimated annual management fee
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-stone-950">
            {formatInr(result.annualManagementFee)}{" "}
            <span className="text-lg font-semibold text-stone-600">+ {GST_LABEL}</span>
          </p>
          <dl className="mt-5 space-y-2 text-sm text-stone-700">
            <div className="flex justify-between gap-4">
              <dt>Annual rental value</dt>
              <dd className="font-medium text-stone-900">{formatInr(result.annualRentalValue)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Management rate</dt>
              <dd className="font-medium text-stone-900">{MANAGEMENT_FEE_RATE_PERCENT}%</dd>
            </div>
            {result.minimumApplied ? (
              <div className="rounded-lg bg-white/80 px-3 py-2 text-sm text-stone-700">
                Minimum annual management fee applies.
              </div>
            ) : null}
          </dl>
        </div>
      ) : (
        <p className="mt-6 text-sm text-stone-600">
          Enter a monthly rental value above zero to see your estimate.
        </p>
      )}

      <p className="mt-6 text-xs leading-relaxed text-stone-500">
        This estimate covers RelyBricks&apos; property management fee. Property works, third-party
        costs and the 15% project management fee for work undertaken are separate.
      </p>

      {showLeadCapture && result ? (
        <div className="mt-8 border-t border-stone-100 pt-6">
          {!leadOpen ? (
            <button
              type="button"
              onClick={() => setLeadOpen(true)}
              className="text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              Want us to send you this estimate?
            </button>
          ) : leadStatus === "success" ? (
            <p className="rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-800">
              Thank you — we&apos;ll send your estimate shortly.
            </p>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <p className="text-sm font-semibold text-stone-900">Want us to send you this estimate?</p>
              {leadStatus === "error" ? (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again or email info@relybricks.com.
                </p>
              ) : null}
              <div>
                <label htmlFor={`${inputId}-name`} className="block text-xs font-medium text-stone-700">
                  Name
                </label>
                <input
                  id={`${inputId}-name`}
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
              <div>
                <label htmlFor={`${inputId}-email`} className="block text-xs font-medium text-stone-700">
                  Email
                </label>
                <input
                  id={`${inputId}-email`}
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
              <div>
                <label htmlFor={`${inputId}-phone`} className="block text-xs font-medium text-stone-700">
                  Phone / WhatsApp <span className="text-stone-400">(optional)</span>
                </label>
                <input
                  id={`${inputId}-phone`}
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
              <div>
                <label
                  htmlFor={`${inputId}-location`}
                  className="block text-xs font-medium text-stone-700"
                >
                  Property location <span className="text-stone-400">(optional)</span>
                </label>
                <input
                  id={`${inputId}-location`}
                  name="property_location"
                  type="text"
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                  placeholder="e.g. Adyar, Chennai"
                />
              </div>
              <button
                type="submit"
                disabled={leadStatus === "loading"}
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-70"
              >
                {leadStatus === "loading" ? "Sending…" : "Send me my estimate"}
              </button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
