import type { Metadata } from "next";
import HomeFaqJsonLd from "@/components/HomeFaqJsonLd";
import HomePageContent from "./HomePageContent";
import { getActiveSubscriptionTiers } from "@/lib/plans";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const initialTiers = await getActiveSubscriptionTiers();

  return (
    <>
      <HomeFaqJsonLd />
      <HomePageContent initialTiers={initialTiers} />
    </>
  );
}
