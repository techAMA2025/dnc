import React from "react";
import ContactHero from "@/components/ContactHero";
import ContactSocials from "@/components/ContactSocials";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Contact Us - Premium Brand Design",
  description: "Reach out to us to make your brand look expensive. No boring websites, just clean visuals.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-24 bg-white relative z-10">
      <div className="bg-white">
        <ContactHero />
        <ContactSocials />
        <FAQ />
      </div>
    </main>
  );
}
