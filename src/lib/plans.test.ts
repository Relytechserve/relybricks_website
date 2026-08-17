import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({
  unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
}));

const createClient = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
  createClient: (...args: unknown[]) => createClient(...args),
}));

type QueryResult = { data: unknown; error: { message: string } | null };

function mockSupabase(tiers: QueryResult, prices?: QueryResult) {
  createClient.mockReturnValue({
    from(table: string) {
      if (table === "subscription_tiers") {
        return {
          select: () => ({
            eq: () => ({
              order: async () => tiers,
            }),
          }),
        };
      }
      return {
        select: () => ({
          in: () => ({
            eq: async () => prices ?? { data: [], error: null },
          }),
        }),
      };
    },
  });
}

describe("getActiveSubscriptionTiers", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  beforeEach(() => {
    vi.resetModules();
    createClient.mockReset();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-public-key";
  });

  afterEach(() => {
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
  });

  it("returns merged active tiers from the public anon client", async () => {
    mockSupabase(
      {
        data: [
          {
            id: "gold",
            name: "Gold",
            description: null,
            is_custom: false,
            is_active: true,
          },
        ],
        error: null,
      },
      {
        data: [
          {
            id: "p1",
            tier_id: "gold",
            city: "Chennai",
            amount: 16000,
            currency: "INR",
            is_active: true,
          },
        ],
        error: null,
      },
    );

    const { getActiveSubscriptionTiers } = await import("./plans");
    const result = await getActiveSubscriptionTiers();

    expect(createClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-public-key",
    );
    expect(createClient.mock.calls[0]).toHaveLength(2);
    expect(result).toEqual([
      {
        id: "gold",
        name: "Gold",
        description: null,
        is_custom: false,
        is_active: true,
        prices: [
          {
            id: "p1",
            tier_id: "gold",
            city: "Chennai",
            amount: 16000,
            currency: "INR",
            is_active: true,
          },
        ],
      },
    ]);
  });

  it("returns an empty array when there are no active tiers", async () => {
    mockSupabase({ data: [], error: null });
    const { getActiveSubscriptionTiers } = await import("./plans");
    await expect(getActiveSubscriptionTiers()).resolves.toEqual([]);
  });

  it("returns null when env or queries fail, without throwing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const { getActiveSubscriptionTiers } = await import("./plans");
    await expect(getActiveSubscriptionTiers()).resolves.toBeNull();

    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-public-key";
    mockSupabase({ data: null, error: { message: "denied" } });
    await expect(getActiveSubscriptionTiers()).resolves.toBeNull();
  });

  it("never references the service-role key", () => {
    const files = [
      "src/lib/plans.ts",
      "src/lib/plan-types.ts",
      "src/components/PlansSection.tsx",
      "src/app/page.tsx",
      "src/app/services/page.tsx",
      "src/app/HomePageContent.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
      expect(source).not.toContain("service_role");
    }
  });
});
