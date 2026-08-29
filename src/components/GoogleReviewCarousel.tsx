"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import type { GoogleReview } from "@/data/google-reviews";

type GoogleReviewCarouselProps = {
  reviews: GoogleReview[];
  autoPlayMs?: number;
  cardVariant?: "default" | "featured";
  tight?: boolean;
};

export default function GoogleReviewCarousel({
  reviews,
  autoPlayMs = 7000,
  cardVariant = "default",
  tight = false,
}: GoogleReviewCarouselProps) {
  const count = reviews.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [paused, count, autoPlayMs]);

  if (count === 0) return null;

  const review = reviews[index];
  if (!review) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={`relative mx-auto max-w-4xl ${
          tight ? "px-10" : "px-12 sm:px-14"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <GoogleReviewCard review={review} variant={cardVariant} />
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md shadow-stone-900/5 transition hover:border-stone-300 hover:bg-stone-50"
              aria-label="Previous review"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md shadow-stone-900/5 transition hover:border-stone-300 hover:bg-stone-50"
              aria-label="Next review"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          {reviews.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(dotIndex)}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "w-8 bg-accent-600"
                  : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Go to review ${dotIndex + 1} of ${count}`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
