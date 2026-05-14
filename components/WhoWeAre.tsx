'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  return (
    <section className="py-24 bg-white text-[#000B3D]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#010D48]">
            Who We Are
          </h2>
        </div>

        <div className="space-y-10 text-xl md:text-4xl font-medium leading-tight text-[#000B3D]/90">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            <span>Designncode is run by one person</span>
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden inline-block align-middle border-[1.5px] border-[#010D48]">
              <Image
                src="/about/one-person.svg"
                alt="One person"
                fill
                className="object-cover"
              />
            </div>
            <span>who probably spends way too</span>
            <span>much time adjusting padding by 2px.</span>
            <div className="relative w-16 h-8 md:w-28 md:h-14 inline-block align-middle transform rotate-12">
               <Image
                src="/about/2px.svg"
                alt="2px ruler"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            <span>Designer first. Coffee addict</span>
            <div className="relative w-10 h-10 md:w-14 md:h-14 inline-block align-middle">
              <Image
                src="/about/cofffee.svg"
                alt="Coffee addict"
                fill
                className="object-contain"
              />
            </div>
            <span>second.</span>
          </div>

          {/* Row 3 */}
          <div className="space-y-3">
            <p>
              We build websites that are fast, scroll-worthy, and impossible to ignore.
            </p>
            <p>
              The kind that make people say "wait... this is cool."
            </p>
          </div>

          {/* Row 4 */}
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-x-2">
                <span>Tiny team. </span>
                <div className="relative w-10 h-10 md:w-14 md:h-14 inline-block align-middle">
                  <Image
                    src="/about/tiny-team.svg"
                    alt="Tiny team"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span>Huge attention to detail.</span>
            </div>
            <p>Mild obsession with animations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
