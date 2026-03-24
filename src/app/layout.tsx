import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import LayoutShell from "@/components/LayoutShell";
import RootJsonLd from "@/components/RootJsonLd";
import { getSiteUrl } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-5TQW60DTGZ";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const siteUrl = getSiteUrl();
const defaultTitle =
  "RelyBricks | Property Management in Chennai - Peace of Mind for Homeowners";
const defaultDescription =
  "We love helping homeowners maintain their valuable investment. Expert property management in Chennai: tenant management, maintenance, interior design, buying & selling. Digital solutions for peace of mind.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  keywords: [
    "property management Chennai",
    "tenant management",
    "home maintenance",
    "NRI property management",
    "rental management",
    "Chennai rental management",
    "property care India",
  ],
  authors: [{ name: "RelyBricks Property Management", url: siteUrl }],
  creator: "RelyBricks Property Management",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "RelyBricks",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "RelyBricks — property management Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "atDn9N8HrvjB3xEs5F-RMLm-LT57SzeE2soyuugYzac",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${sora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-stone-800 overflow-x-hidden">
        <RootJsonLd />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <LayoutShell>
          <Navigation />
          <main className="flex-1 w-full min-w-0">{children}</main>
          <Footer />
          <CookieConsent />
        </LayoutShell>
      </body>
    </html>
  );
}
