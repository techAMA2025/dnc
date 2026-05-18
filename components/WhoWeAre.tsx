'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  return (
    <section className="py-12 bg-white text-[#000B3D]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#010D48]">
              Who We Are
            </h2>
            <div className="absolute -bottom-4 left-0 w-full flex justify-center">
              <svg width="150" height="12" viewBox="0 0 150 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48 text-[#60A5FA]">
                <path d="M2 9.5C12.5 4.5 28.5 2.5 44.5 5.5C60.5 8.5 75.5 10.5 91.5 6.5C107.5 2.5 123.5 2.5 148 7.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto text-center">
          <p className="text-xl md:text-[32px] font-regular leading-[1.3] md:leading-[1.4] text-[#010D48] tracking-tight">
            Designncode is run by one person
            <span className="inline-flex relative w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden align-middle mx-2 border-2 border-[#010D48] -translate-y-1">
              <Image
                src="/about/one-person.svg"
                alt="One person"
                fill
                className="object-cover"
              />
            </span>
            who probably spends way too much time adjusting padding by 2px.
            <span className="inline-flex relative w-16 h-6 md:w-20 md:h-10 align-middle mx-2 rotate-12 -translate-y-1">
               <Image
                src="/about/2px.svg"
                alt="2px ruler"
                fill
                className="object-cover"
              />
            </span>
            Designer first. Coffee addict
            <span className="inline-flex relative w-10 h-10 md:w-16 md:h-16 align-middle mx-2 -translate-y-1">
              <Image
                src="/about/cofffee.svg"
                alt="Coffee addict"
                fill
                className="object-contain"
              />
            </span>
            second. We build websites that are fast, scroll-worthy, and impossible to ignore.
            The kind that make people say &quot;wait... this is cool.&quot;
            Tiny team.
            <span className="inline-flex relative w-10 h-10 md:w-16 md:h-16 align-middle mx-2 -translate-y-1">
              <Image
                src="/about/tiny-team.svg"
                alt="Tiny team"
                fill
                className="object-contain"
              />
            </span>
            Huge attention to detail. Mild obsession with animations
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
