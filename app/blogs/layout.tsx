import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Insights | Web Solutions, Shopify Scale & SEO Blueprints",
  description: "Gain dynamic tech insights and business blueprints. Explore professional guides on custom code, Next.js architecture, headless WordPress CMS, Shopify custom apps, and 2026 organic search SEO strategies.",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
