import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | Premium UI/UX & High-Performance Web Portfolio",
  description: "Browse our project portfolio showcasing elite custom-engineered web experiences, high-converting custom Shopify storefront architectures, and professional headless CMS solutions.",
};

export default function OurWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
