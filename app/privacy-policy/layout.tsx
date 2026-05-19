import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Compliance & Data Security Guidelines",
  description: "Read the Design N Code (DNC) Privacy Policy. Understand how we manage, encrypt, and secure your personal corporate data points on our platforms.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
