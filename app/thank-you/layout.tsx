import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Inquiry Received",
  description: "Thank you for reaching out to Design N Code. We have successfully received your inquiry and our technology team will review your project details and get back to you shortly.",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
