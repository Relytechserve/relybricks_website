import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | RelyBricks — Property Management Chennai",
  description:
    "Contact RelyBricks for property management in Chennai. Call +91 99520 04948 or email info@relybricks.com. We support NRIs and local homeowners.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact RelyBricks — Property Management Chennai",
    description:
      "Get in touch for tenant management, maintenance, and tech-enabled property care in Chennai.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
