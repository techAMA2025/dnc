import React from 'react';
import Navbar from '@/components/Navbar';
import ServicesHero from '@/components/ServicesHero';
import ServicesStats from '@/components/ServicesStats';
import ModularCTA from '@/components/ModularCTA';
import PixelCTA from '@/components/PixelCTA';

export const metadata = {
  title: 'Our Services | Digital Solutions',
  description: 'Explore our range of digital services including UI/UX Design, Shopify, WordPress, Custom Code, and Digital Marketing.',
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
