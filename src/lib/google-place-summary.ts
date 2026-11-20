import "server-only";

import { getSiteUrl } from "@/lib/site";
import {
  GOOGLE_PLACE_FALLBACK,
  type GooglePlaceSummary,
} from "@/data/google-reviews";

/**
 * Cached Place Details lookup for the Relybricks Google listing.
 *
 * Request (Places API New), Enterprise SKU only — do not add `reviews`
 * or the call moves to Enterprise + Atmosphere:
 *   GET https://places.googleapis.com/v1/places/{PLACE_ID}
 *   X-Goog-FieldMask: rating,userRatingCount
 *
 * Server env (never NEXT_PUBLIC_):
 *   GOOGLE_PLACES_API_KEY
 *   GOOGLE_PLACE_ID — a ChIJ place id, not the Maps feature id or CID
 *
 * The public listing is:
 *   feature id 0x3a525de7a8af7037:0xd6b3324bf3b4d0e5
 *   CID 15470764446740435173
 *   https://g.page/relybricks/review
 * Those identifiers are not valid Place Details place ids, and the ChIJ
 * id is not in the public Maps HTML. Look it up before setting
 * GOOGLE_PLACE_ID, then confirm the result is this Chennai listing:
 *   - Place ID finder:
 *     https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *   - or Text Search Essentials (IDs Only), field mask `places.id` only:
 *     POST https://places.googleapis.com/v1/places:searchText
 *     {"textQuery":"Relybricks Property Management Chennai"}
 *
 * There is no JSON-LD aggregateRating on the site. Organization and
 * Service schema intentionally omit ratings (see src/lib/jsonld.ts).
 */

/** Keep page `export const revalidate` values in sync with this. */
export const GOOGLE_PLACE_REVALIDATE_SECONDS = 21600;

const PLACES_FIELD_MASK = "rating,userRatingCount";
/** ChIJ-style ids include letters. A numeric CID or hex feature id must not be sent. */
const PLACE_ID_PATTERN = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{10,255}$/;

export function normalizeGooglePlaceId(raw: string | undefined): string | null {
  if (!raw) return null;
  const placeId = raw.trim().replace(/^places\//, "");
  if (!PLACE_ID_PATTERN.test(placeId)) return null;
  return placeId;
}

export function readGooglePlaceSummary(payload: unknown): GooglePlaceSummary | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as { rating?: unknown; userRatingCount?: unknown };
  const { rating, userRatingCount } = record;
  if (typeof rating !== "number" || !Number.isFinite(rating) || rating < 1 || rating > 5) {
    return null;
  }
  if (typeof userRatingCount !== "number" || !Number.isInteger(userRatingCount) || userRatingCount < 0) {
    return null;
  }
  return { rating, reviewCount: userRatingCount };
}

function fallbackSummary(): GooglePlaceSummary {
  return {
    rating: GOOGLE_PLACE_FALLBACK.rating,
    reviewCount: GOOGLE_PLACE_FALLBACK.reviewCount,
  };
}

export async function getGooglePlaceSummary(): Promise<GooglePlaceSummary> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = normalizeGooglePlaceId(process.env.GOOGLE_PLACE_ID);
  if (!apiKey || !placeId) {
    if (process.env.GOOGLE_PLACE_ID?.trim() && !placeId) {
      console.warn(
        "GOOGLE_PLACE_ID is not a Places API place id (expected a ChIJ id). Showing the fallback rating.",
      );
    }
    return fallbackSummary();
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PLACES_FIELD_MASK,
          Referer: `${getSiteUrl()}/`,
        },
        next: { revalidate: GOOGLE_PLACE_REVALIDATE_SECONDS },
      },
    );
    if (!response.ok) {
      console.warn(
        `Google Places rating lookup failed (${response.status}). Showing the fallback rating.`,
      );
      return fallbackSummary();
    }
    const summary = readGooglePlaceSummary(await response.json());
    if (!summary) {
      console.warn("Google Places rating lookup returned an unusable payload. Showing the fallback rating.");
      return fallbackSummary();
    }
    return summary;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.warn(`Google Places rating lookup failed (${message}). Showing the fallback rating.`);
    return fallbackSummary();
  }
}
