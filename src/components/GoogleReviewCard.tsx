import type { GoogleReview } from "@/data/google-reviews";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import StarRating from "@/components/StarRating";

type GoogleReviewCardProps = {
  review: GoogleReview;
  compact?: boolean;
};

export default function GoogleReviewCard({ review, compact = false }: GoogleReviewCardProps) {
  const showAuthor = review.author !== "Google reviewer";

  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border border-stone-200 bg-white shadow-sm ${
        compact ? "p-5" : "p-6 sm:p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <GoogleReviewBadge />
        <StarRating rating={review.rating} />
      </div>
      <blockquote
        className={`mt-4 flex-1 text-stone-700 leading-relaxed ${
          compact ? "text-sm" : "text-sm sm:text-base"
        }`}
      >
        “{review.quote}”
      </blockquote>
      {showAuthor ? (
        <figcaption className="mt-5 text-xs text-stone-500">
          <span className="font-semibold text-stone-900">{review.author}</span>
          {review.relativeDate ? (
            <>
              <span className="mx-1">·</span>
              {review.relativeDate}
            </>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
