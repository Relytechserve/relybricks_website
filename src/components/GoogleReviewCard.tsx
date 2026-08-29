import type { GoogleReview } from "@/data/google-reviews";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import StarRating from "@/components/StarRating";
import { getAuthorInitials, isNamedReviewer } from "@/lib/google-review-utils";

type GoogleReviewCardProps = {
  review: GoogleReview;
  compact?: boolean;
  variant?: "default" | "featured";
};

export default function GoogleReviewCard({
  review,
  compact = false,
  variant = "default",
}: GoogleReviewCardProps) {
  const showAuthor = isNamedReviewer(review);
  const isFeatured = variant === "featured";

  return (
    <figure
      className={`relative flex h-full flex-col overflow-hidden border border-stone-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] ring-1 ring-stone-900/5 ${
        isFeatured
          ? "rounded-[1.75rem] p-8 sm:p-10"
          : compact
            ? "rounded-2xl p-5"
            : "rounded-3xl p-7 sm:p-9"
      }`}
    >
      <span
        className={`pointer-events-none absolute font-serif leading-none text-accent-100 select-none ${
          isFeatured ? "right-8 top-6 text-8xl" : compact ? "right-4 top-3 text-5xl" : "right-6 top-5 text-7xl"
        }`}
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="relative flex items-start justify-between gap-3">
        <GoogleReviewBadge />
        <StarRating rating={review.rating} />
      </div>

      <blockquote
        className={`relative mt-5 flex-1 font-medium text-stone-700 leading-relaxed ${
          isFeatured
            ? "text-lg sm:text-xl"
            : compact
              ? "text-sm"
              : "text-base sm:text-lg"
        }`}
      >
        {review.quote}
      </blockquote>

      {showAuthor ? (
        <figcaption
          className={`relative mt-6 flex items-center gap-3 border-t border-stone-100 ${
            isFeatured ? "pt-6" : compact ? "pt-4" : "pt-5"
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-700 font-semibold text-white shadow-sm ${
              isFeatured ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs"
            }`}
            aria-hidden
          >
            {getAuthorInitials(review.author)}
          </div>
          <div className="min-w-0">
            <p className={`truncate font-semibold text-stone-900 ${compact ? "text-sm" : "text-base"}`}>
              {review.author}
            </p>
          </div>
        </figcaption>
      ) : null}
    </figure>
  );
}
