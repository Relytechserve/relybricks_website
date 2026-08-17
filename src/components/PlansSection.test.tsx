/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PLANS_EMPTY_MESSAGE,
  PLANS_LOADING_MESSAGE,
  PLANS_UPDATING_MESSAGE,
  type TierWithPrices,
} from "@/lib/plan-types";

const createClient = vi.fn();

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/lib/supabase", () => ({
  createClient: () => createClient(),
}));

import PlansSection from "./PlansSection";

const goldTier: TierWithPrices = {
  id: "gold-1",
  name: "Gold",
  description: null,
  is_custom: false,
  is_active: true,
  prices: [
    {
      id: "p-chennai",
      tier_id: "gold-1",
      city: "Chennai",
      amount: 16000,
      currency: "INR",
      is_active: true,
    },
    {
      id: "p-blr",
      tier_id: "gold-1",
      city: "Bangalore",
      amount: 18000,
      currency: "INR",
      is_active: true,
    },
  ],
};

const basicTier: TierWithPrices = {
  id: "basic-1",
  name: "Basic",
  description: null,
  is_custom: false,
  is_active: true,
  prices: [
    {
      id: "p-basic",
      tier_id: "basic-1",
      city: "Chennai",
      amount: 16000,
      currency: "INR",
      is_active: true,
    },
  ],
};

function mockBrowserCatalog(tiers: TierWithPrices[]) {
  createClient.mockReturnValue({
    from(table: string) {
      if (table === "subscription_tiers") {
        return {
          select: () => ({
            eq: () => ({
              order: async () => ({
                data: tiers.map(({ prices: _prices, ...tier }) => tier),
                error: null,
              }),
            }),
          }),
        };
      }
      return {
        select: () => ({
          in: () => ({
            eq: async () => ({
              data: tiers.flatMap((tier) => tier.prices),
              error: null,
            }),
          }),
        }),
      };
    },
  });
}

afterEach(() => {
  cleanup();
  createClient.mockReset();
});

describe("PlansSection", () => {
  it("renders plan names, prices and PLAN_COPY features from server data immediately", () => {
    render(<PlansSection initialTiers={[basicTier, goldTier]} />);

    expect(screen.getByText("Basic Plan")).toBeTruthy();
    expect(screen.getByText("Gold Plan")).toBeTruthy();
    expect(screen.getAllByText("₹16,000/year").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("₹18,000/year")).toBeTruthy();
    expect(screen.getByText("Paying utility bills & taxes")).toBeTruthy();
    expect(screen.getByText("Quarterly visits with detailed updates")).toBeTruthy();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("does not client-fetch when the server returned an empty catalog", () => {
    render(<PlansSection initialTiers={[]} />);
    expect(screen.getByText(PLANS_EMPTY_MESSAGE)).toBeTruthy();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("shows the updating fallback for a server error, then retries once on the client", async () => {
    mockBrowserCatalog([goldTier]);
    render(<PlansSection initialTiers={null} />);

    expect(screen.getByText(PLANS_UPDATING_MESSAGE)).toBeTruthy();
    expect(createClient).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Gold Plan")).toBeTruthy();
    });
    expect(screen.getByText("₹16,000/year")).toBeTruthy();
    expect(createClient.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  it("keeps the fallback when the single client retry also fails", async () => {
    createClient.mockReturnValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            order: async () => ({ data: null, error: { message: "fail" } }),
          }),
        }),
      }),
    });

    render(<PlansSection initialTiers={null} />);
    expect(screen.getByText(PLANS_UPDATING_MESSAGE)).toBeTruthy();

    await waitFor(() => {
      expect(createClient).toHaveBeenCalled();
    });
    expect(screen.getByText(PLANS_UPDATING_MESSAGE)).toBeTruthy();
    expect(screen.queryByText("Gold Plan")).toBeNull();
  });

  it("uses the original loading path when initialTiers is undefined", () => {
    createClient.mockReturnValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => new Promise(() => {}),
          }),
        }),
      }),
    });

    render(<PlansSection />);
    expect(screen.getByText(PLANS_LOADING_MESSAGE)).toBeTruthy();
    expect(createClient).toHaveBeenCalled();
  });
});
