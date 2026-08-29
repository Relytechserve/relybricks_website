import type { GoogleReview } from "@/data/google-reviews";

export function getAuthorInitials(author: string): string {
  if (author === "Google reviewer") return "G";
  return author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function isNamedReviewer(review: GoogleReview): boolean {
  return review.author !== "Google reviewer";
}
