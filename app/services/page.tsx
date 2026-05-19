import React from 'react';
import Navbar from '@/components/Navbar';
import ServicesHero from '@/components/ServicesHero';
import ServicesStats from '@/components/ServicesStats';
import ModularCTA from '@/components/ModularCTA';
import PixelCTA from '@/components/PixelCTA';

export const metadata = {
  title: 'Our Services | Custom Web, Shopify, WordPress & Marketing',
  description: 'Explore our range of digital solutions. Custom Next.js architectures, tailored Shopify storefront integrations, robust headless WordPress setups, and conversion-optimized organic SEO strategies.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServicesHero />
      <ServicesStats />
      <ModularCTA />
      <PixelCTA />
    </main>
  );
}
