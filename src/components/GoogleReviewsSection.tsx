import type { ReactNode } from "react";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import GoogleReviewScore from "@/components/GoogleReviewScore";
import {
  GOOGLE_BUSINESS_PROFILE_URL,
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
  const reviewsLink = (
    <GoogleReviewsLink>{GOOGLE_REVIEW_COUNT} reviews</GoogleReviewsLink>
  );

  if (variant === "featured") {
    const review = reviews[0];
    if (!review) return null;

    return (
      <section className={className}>
        <div className="mb-6">
          <GoogleReviewScore link={reviewsLink} compact />
        </div>
        <GoogleReviewCard review={review} variant="featured" />
        <p className="mt-5 text-sm text-stone-500">
          <GoogleReviewsLink>Read more reviews on Google</GoogleReviewsLink>
        </p>
      </section>
    );
  }

  if (variant === "compact") {
    const compactReviews = reviews.slice(0, 3);

    return (
      <section
        className={`relative overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-gradient-to-br from-white via-stone-50 to-accent-50/30 p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] sm:p-8 ${className}`}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-200/30 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-stone-900 tracking-tight">
            Trusted by homeowners in Chennai
          </h2>
          <div className="mt-5">
            <GoogleReviewScore link={reviewsLink} compact />
          </div>

          <div className="mt-8 hidden gap-5 sm:grid sm:grid-cols-3">
            {compactReviews.map((review) => (
              <GoogleReviewCard key={review.id} review={review} compact />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <GoogleReviewCarousel reviews={compactReviews} autoPlayMs={6000} tight />
          </div>

          <p className="relative mt-6 text-sm text-stone-600">
            <GoogleReviewsLink>See all reviews on Google</GoogleReviewsLink>
          </p>
        </div>
      </section>
    );
  }

  const carouselReviews = reviews.filter((review) => review.id !== "google-highlight-service");

  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-stone-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-accent-100/40 blur-3xl"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">{description}</p>
            ) : null}
          </div>
          <GoogleReviewScore link={reviewsLink} />
        </div>

        <div className="mt-12 lg:mt-14">
          <GoogleReviewCarousel reviews={carouselReviews} />
        </div>

        <p className="mt-10 text-center text-sm text-stone-600">
          Reviews are from the public Google Business profile.{" "}
          <GoogleReviewsLink>Read all {GOOGLE_REVIEW_COUNT} reviews on Google</GoogleReviewsLink>
        </p>
      </div>
    </section>
  );
}
