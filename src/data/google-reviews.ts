export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  quote: string;
  relativeDate?: string;
};

/** Live Google Business profile — Relybricks Property Management, Chennai. */
export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://www.google.com/maps/place/Relybricks+Property+Management/@13.016304,80.243796,17z/data=!4m8!3m7!1s0x3a525de7a8af7037:0xd6b3324bf3b4d0e5!8m2!3d13.016304!4d80.243796!9m1!1b1!16s%2Fg%2F11hdc4hhnh";

export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = 28;

/** Verbatim quotes from the public Google Business profile (Aug 2026). */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "renga-sankar",
    author: "Renga Sankar",
    rating: 5,
    quote:
      "A very professional and prompt service. Highly recommended. I have been using Relybricks for my Chennai properties and they have been very helpful and professional in maintaining and tenanting these properties.",
    relativeDate: "7 years ago",
  },
  {
    id: "niranjan-reddy",
    author: "Niranjan Reddy",
    rating: 5,
    quote:
      "Very proactive, informative, reliable and reasonable. I stay in USA and was worried about managing my property back in Chennai. They did a lot of pending work and kept me updated on my community and real estate developments. I strongly recommend them.",
    relativeDate: "8 years ago",
  },
  {
    id: "srinivasalu-selvapandian",
    author: "Srinivasalu Selvapandian",
    rating: 5,
    quote:
      "I have been using their services for managing my house at Bollineni Hillside near Sholinganallur. We have complete faith in them. They maintain the house and sort out any issues that arise, as with any properties.",
    relativeDate: "5 years ago",
  },
  {
    id: "google-highlight-recommend",
    author: "Google reviewer",
    rating: 5,
    quote: "I have no hesitation in recommending their services.",
  },
  {
    id: "google-highlight-service",
    author: "Google reviewer",
    rating: 5,
    quote: "Their personal assistance and the service is too good.",
  },
];

/** Featured on the NRI commercial page — overseas owner angle. */
export const NRI_FEATURED_GOOGLE_REVIEW_ID = "niranjan-reddy";

export function getGoogleReviewById(id: string): GoogleReview | undefined {
  return GOOGLE_REVIEWS.find((review) => review.id === id);
}
