import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Legal Service Agreements",
  description: "Read the Design N Code (DNC) Terms and Conditions. Our legal parameters governing website use, digital product design, and development service agreements.",
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
