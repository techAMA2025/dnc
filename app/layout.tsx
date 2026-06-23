import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Design N Code | Custom Web Development, Shopify & SEO Agency",
    template: "%s | Design N Code"
  },
  description: "Design N Code (DNC) is a premium digital agency crafting high-performance custom websites (React, Next.js), custom Shopify storefronts, robust WordPress CMS solutions, and high-impact SEO & digital marketing strategies.",
  metadataBase: new URL("https://designncode.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Design N Code",
    "DNC Agency",
    "Custom Web Development",
    "Next.js Development",
    "React Web Applications",
    "Shopify Store Development",
    "WordPress Custom Themes",
    "Premium Web Design",
    "High-Performance SEO",
    "Digital Growth Marketing",
    "Headless E-commerce Solutions"
  ],
  authors: [{ name: "Design N Code", url: "https://designncode.com" }],
  creator: "Design N Code",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designncode.com",
    title: "Design N Code | Custom Web Development, Shopify & SEO Agency",
    description: "We build premium, custom-coded web products, scale Shopify storefronts, customize WordPress publishing systems, and implement organic search SEO strategies to amplify business growth.",
    siteName: "Design N Code",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Design N Code Agency - Build N Launch N Grow",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Design N Code | Custom Web Development, Shopify & SEO Agency",
    description: "We build premium, custom-coded web products, scale Shopify storefronts, customize WordPress publishing systems, and implement organic search SEO strategies to amplify business growth.",
    images: ["/og-image.png"],
    creator: "@design_n_code"
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
    }
  },
  verification: {
    google: "google-site-verification-placeholder",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
