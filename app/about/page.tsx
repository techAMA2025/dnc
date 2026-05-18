'use client';

import React from 'react';
import AboutHero from '@/components/AboutHero';
import WhoWeAre from '@/components/WhoWeAre';
import CreativePlayground from '@/components/CreativePlayground';
import FAQ from '@/components/FAQ';
import PixelCTA from '@/components/PixelCTA';
import {StackSection} from '@/components/stack-section';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <AboutHero />
      <WhoWeAre />
      {/* <CreativePlayground /> */}
      <StackSection />

      {/* Reusing common sections like FAQ and PixelCTA if desired, 
          but the user only specifically asked for Navbar, Footer and Hero.
          Navbar and Footer are in layout.tsx.
      */}
      
      <div className="mt-6 md:mt-20">
         <FAQ />
      </div>
      <PixelCTA />
    </main>
  );
}
