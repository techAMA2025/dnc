'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] mt-24 md:mt-32 overflow-hidden bg-white">
      {/* Desktop Hero Image */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src="/about/hero-desktop.svg"
          alt="About Hero Desktop"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Mobile Hero Image */}
      <div className="block md:hidden relative w-full h-full">
        <Image
          src="/about/hero-phone.svg"
          alt="About Hero Mobile"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};

export default AboutHero;
