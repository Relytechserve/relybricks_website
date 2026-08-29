import type { ReactNode } from "react";
import StarRating from "@/components/StarRating";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/google-reviews";

type GoogleReviewScoreProps = {
  link: ReactNode;
  compact?: boolean;
};

export default function GoogleReviewScore({ link, compact = false }: GoogleReviewScoreProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-3 rounded-xl border border-stone-200/80 bg-white px-4 py-2.5 shadow-sm">
        <span className="text-2xl font-display font-bold leading-none text-stone-900">
          {GOOGLE_RATING.toFixed(1)}
        </span>
        <div>
          <StarRating rating={GOOGLE_RATING} />
          <p className="mt-1 text-xs text-stone-500">
            on Google · {link}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white px-5 py-4 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)] ring-1 ring-stone-900/5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-xl font-display font-bold text-white shadow-inner">
        {GOOGLE_RATING.toFixed(1)}
      </div>
      <div>
        <StarRating rating={GOOGLE_RATING} className="[&_svg]:h-5 [&_svg]:w-5" />
        <p className="mt-1 text-sm text-stone-600">
          Rated on Google · {link}
        </p>
        <p className="text-xs text-stone-400">{GOOGLE_REVIEW_COUNT} owner reviews</p>
      </div>
    </div>
  );
}
