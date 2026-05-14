'use client';

import React from 'react';
import Image from 'next/image';
import PixelTransition from './PixelTransition';
import DecryptedText from './react-bits/DecryptedText';
import BlurText from './react-bits/BlurText';
import { motion } from 'framer-motion';

export default function PixelCTA() {
  return (
    <section className="relative w-full py-16 px-16 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#0439B8]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column - 70% Text */}
        <div className="w-full md:w-[70%] text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BlurText
              text="Ready To Build Something Amazing?"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6"
            />
            <p className="text-white text-lg md:text-2xl max-w-3xl font-light leading-relaxed">
              Let&apos;s create a website that looks premium, loads fast, and helps your business grow online.
            </p>
          </motion.div>
        </div>

        {/* Right Column - 30% Card */}
        <div className="w-full md:w-[30%] flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[300px] aspect-square group"
          >
            <PixelTransition
              firstContent={
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] border border-white/10 rounded-[20px] transition-colors group-hover:border-[#0439B8]/50 overflow-hidden relative">
                  <Image
                    src="/ctacat.jpg"
                    alt="Funny Cat"
                    fill
                    className="object-cover transition-all duration-500"
                  />
                </div>
              }
              secondContent={
                <div className="w-full h-full flex text-black flex-col items-center justify-center bg-[#ffffff] rounded-[20px] p-6 text-center cursor-pointer shadow-[0_0_50px_rgba(4,57,184,0.3)] text-5xl font-black tracking-tighter uppercase leading-none">
                  START YOUR PROJECT
                </div>
              }
              gridSize={12}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              autoTriggerInterval={5000}
              className="w-full h-full !w-full !border-0 !rounded-[20px]"
              aspectRatio="100%"
            />

            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#0439B8] rounded-tl-xl opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-100" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#0439B8] rounded-br-xl opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-100" />
          </motion.div>
        </div>
      </div>

      {/* Floating particles or something */}

    </section>
  );
}
