import type { ReactNode } from "react";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import StarRating from "@/components/StarRating";
import {
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEW_COUNT,
  type GoogleReview,
} from "@/data/google-reviews";

type GoogleReviewsSectionProps = {
  variant?: "default" | "compact" | "featured";
  reviews?: GoogleReview[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

function GoogleReviewsLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={GOOGLE_BUSINESS_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent-700 underline decoration-accent-200 underline-offset-4 hover:text-accent-600"
    >
      {children}
    </a>
  );
}

export default function GoogleReviewsSection({
  variant = "default",
  reviews = GOOGLE_REVIEWS,
  eyebrow = "Google reviews",
  title = "What owners say about RelyBricks",
  description,
  className = "",
}: GoogleReviewsSectionProps) {
  const aggregate = (
    <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
      <StarRating rating={GOOGLE_RATING} />
      <span>
        <span className="font-semibold text-stone-900">{GOOGLE_RATING.toFixed(1)}</span> on Google
      </span>
      <span className="text-stone-400">·</span>
      <GoogleReviewsLink>{GOOGLE_REVIEW_COUNT} reviews</GoogleReviewsLink>
    </div>
  );

  if (variant === "featured") {
    const review = reviews[0];
    if (!review) return null;

    return (
      <section className={className}>
        <div className="mb-6">{aggregate}</div>
        <GoogleReviewCard review={review} />
        <p className="mt-4 text-sm text-stone-500">
          <GoogleReviewsLink>Read more reviews on Google</GoogleReviewsLink>
        </p>
      </section>
    );
  }

  if (variant === "compact") {
    const compactReviews = reviews.slice(0, 3);

    return (
      <section className={`rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8 ${className}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-stone-900 tracking-tight">
          Trusted by homeowners in Chennai
        </h2>
        <div className="mt-4">{aggregate}</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {compactReviews.map((review) => (
            <GoogleReviewCard key={review.id} review={review} compact />
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-600">
          <GoogleReviewsLink>See all reviews on Google</GoogleReviewsLink>
        </p>
      </section>
    );
  }

  const carouselReviews = reviews.filter((review) => review.id !== "google-highlight-service");

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-sm sm:text-base text-stone-600">{description}</p>
            ) : null}
          </div>
          <div className="shrink-0">{aggregate}</div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
          {carouselReviews.map((review) => (
            <div key={review.id} className="min-w-[85%] snap-start sm:min-w-[70%] md:min-w-0">
              <GoogleReviewCard review={review} />
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-stone-600">
          Reviews are from the public Google Business profile.{" "}
          <GoogleReviewsLink>Read all {GOOGLE_REVIEW_COUNT} reviews on Google</GoogleReviewsLink>
        </p>
      </div>
    </section>
  );
}
