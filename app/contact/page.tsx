import React from "react";
import ContactHero from "@/components/ContactHero";
import ContactSocials from "@/components/ContactSocials";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Contact Us | Get In Touch & Start Your Project",
  description: "Ready to make your brand look premium? Reach out to Design N Code for elite custom web development, high-converting e-commerce sites, and technical SEO consultations.",
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
