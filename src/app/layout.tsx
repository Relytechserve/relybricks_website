import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "RelyBricks | Property Management in Chennai - Peace of Mind for Homeowners",
  icons: {
    icon: "/images/logo.png",
  },
  description:
    "We love helping homeowners maintain their valuable investment. Expert property management in Chennai: tenant management, maintenance, interior design, buying & selling. Digital solutions for peace of mind.",
  keywords: [
    "property management Chennai",
    "tenant management",
    "home maintenance",
    "NRI property management",
    "rental management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-stone-800 overflow-x-hidden">
        <Navigation />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
