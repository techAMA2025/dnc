import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Custom Web Engineering & Design Agency",
  description: "Learn about Design N Code (DNC), a premium digital agency of creative engineers, designers, and e-commerce strategists building high-performance systems for global brands.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
