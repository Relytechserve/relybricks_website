import type { Metadata } from "next";
import HomeFaqJsonLd from "@/components/HomeFaqJsonLd";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeFaqJsonLd />
      <HomePageContent />
    </>
  );
}
