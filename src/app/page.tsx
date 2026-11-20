import type { Metadata } from "next";
import HomeFaqJsonLd from "@/components/HomeFaqJsonLd";
import { getGooglePlaceSummary } from "@/lib/google-place-summary";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

/** Matches GOOGLE_PLACE_REVALIDATE_SECONDS. ISR even before the Places key is set. */
export const revalidate = 21600;

export default async function HomePage() {
  const googlePlace = await getGooglePlaceSummary();

  return (
    <>
      <HomeFaqJsonLd />
      <HomePageContent googlePlace={googlePlace} />
    </>
  );
}
