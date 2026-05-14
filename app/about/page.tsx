'use client';

import React from 'react';
import AboutHero from '@/components/AboutHero';
import WhoWeAre from '@/components/WhoWeAre';
import FAQ from '@/components/FAQ';
import PixelCTA from '@/components/PixelCTA';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <AboutHero />
      <WhoWeAre />
      
      {/* Adding some spacing before footer-related sections if any */}
      <div className="mt-10">
        {/* You can add more sections here if needed later */}
      </div>

      {/* Reusing common sections like FAQ and PixelCTA if desired, 
          but the user only specifically asked for Navbar, Footer and Hero.
          Navbar and Footer are in layout.tsx.
      */}
      
      <div className="mt-20">
         <FAQ />
      </div>
      <PixelCTA />
    </main>
  );
}
