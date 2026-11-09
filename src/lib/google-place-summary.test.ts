import { afterEach, describe, expect, it, vi } from "vitest";
import { GOOGLE_PLACE_FALLBACK } from "@/data/google-reviews";

vi.mock("server-only", () => ({}));

import {
  getGooglePlaceSummary,
  GOOGLE_PLACE_REVALIDATE_SECONDS,
  normalizeGooglePlaceId,
  readGooglePlaceSummary,
} from "./google-place-summary";

const FALLBACK = {
  rating: GOOGLE_PLACE_FALLBACK.rating,
  reviewCount: GOOGLE_PLACE_FALLBACK.reviewCount,
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("GOOGLE_PLACE_FALLBACK", () => {
  it("is the single offline rating and review count", () => {
    expect(FALLBACK).toEqual({ rating: 5, reviewCount: 36 });
  });
});

describe("normalizeGooglePlaceId", () => {
  it("accepts a ChIJ id and a places/ resource name", () => {
    expect(normalizeGooglePlaceId("ChIJtestplaceid123")).toBe("ChIJtestplaceid123");
    expect(normalizeGooglePlaceId("places/ChIJtestplaceid123")).toBe("ChIJtestplaceid123");
  });

  it("rejects the Maps feature id and CID", () => {
    expect(normalizeGooglePlaceId("0x3a525de7a8af7037:0xd6b3324bf3b4d0e5")).toBeNull();
    expect(normalizeGooglePlaceId("15470764446740435173")).toBeNull();
    expect(normalizeGooglePlaceId("")).toBeNull();
    expect(normalizeGooglePlaceId(undefined)).toBeNull();
  });
});

describe("readGooglePlaceSummary", () => {
  it("reads rating and userRatingCount", () => {
    expect(readGooglePlaceSummary({ rating: 5, userRatingCount: 36 })).toEqual({
      rating: 5,
      reviewCount: 36,
    });
    expect(readGooglePlaceSummary({ rating: 4.8, userRatingCount: 41 })).toEqual({
      rating: 4.8,
      reviewCount: 41,
    });
  });

  it("rejects partial or out-of-range payloads", () => {
    expect(readGooglePlaceSummary({ rating: 5 })).toBeNull();
    expect(readGooglePlaceSummary({ userRatingCount: 36 })).toBeNull();
    expect(readGooglePlaceSummary({ rating: 0, userRatingCount: 36 })).toBeNull();
    expect(readGooglePlaceSummary({ rating: 5.4, userRatingCount: 36 })).toBeNull();
    expect(readGooglePlaceSummary({ rating: 5, userRatingCount: 36.5 })).toBeNull();
    expect(readGooglePlaceSummary(null)).toBeNull();
  });
});

describe("getGooglePlaceSummary", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the fallback without calling Places when env is missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "");
    vi.stubEnv("GOOGLE_PLACE_ID", "");

    await expect(getGooglePlaceSummary()).resolves.toEqual(FALLBACK);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the fallback when the place id is the feature id", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "0x3a525de7a8af7037:0xd6b3324bf3b4d0e5");

    await expect(getGooglePlaceSummary()).resolves.toEqual(FALLBACK);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requests only rating and userRatingCount and keeps the key out of the URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ rating: 4.9, userRatingCount: 40 }),
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "places/ChIJtestplaceid123");

    await expect(getGooglePlaceSummary()).resolves.toEqual({
      rating: 4.9,
      reviewCount: 40,
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit & { next?: { revalidate: number } }];
    expect(url).toBe("https://places.googleapis.com/v1/places/ChIJtestplaceid123");
    expect(url).not.toContain("test-key");
    expect(init.headers).toMatchObject({
      "X-Goog-Api-Key": "test-key",
      "X-Goog-FieldMask": "rating,userRatingCount",
      Referer: "https://relybricks.com/",
    });
    expect(init.next).toEqual({ revalidate: GOOGLE_PLACE_REVALIDATE_SECONDS });
  });

  it("falls back when Places responds with an error, bad JSON, or a network failure", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "ChIJtestplaceid123");

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 403, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ rating: 5 }) })
      .mockRejectedValueOnce(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGooglePlaceSummary()).resolves.toEqual(FALLBACK);
    await expect(getGooglePlaceSummary()).resolves.toEqual(FALLBACK);
    await expect(getGooglePlaceSummary()).resolves.toEqual(FALLBACK);
  });
});
