'use client';

import React from 'react';
import PixelTransition from './PixelTransition';
import BlurText from './react-bits/BlurText';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WorkCTA() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#0439B8]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl">
        {/* Left Column - Text Content */}
        <div className="w-full lg:w-[65%] text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#0439B8] font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
              Start Your Journey
            </span>
            <BlurText
              text="Want to see your project featured here?"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
            />
            <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-10">
              We specialize in turning complex debt and legal challenges into success stories. Let&apos;s build your path to financial freedom together.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-sm hover:bg-[#0439B8] hover:text-white transition-all duration-300">
                Contact Us Now
              </Link>
              <Link href="/services" className="px-8 py-4 bg-transparent text-white border border-white/20 font-semibold rounded-sm hover:bg-white/10 transition-all duration-300">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Interactive Card */}
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[320px] aspect-square group"
          >
            <PixelTransition
              firstContent={
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] border border-white/10 rounded-sm transition-colors group-hover:border-[#0439B8]/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0439B8]/20 to-transparent z-10" />
                  <img
                    src="/work/loan.png"
                    alt="Work Preview"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              }
              secondContent={
                <div className="w-full h-full flex text-black flex-col items-center justify-center bg-white rounded-sm p-8 text-center cursor-pointer shadow-[0_0_50px_rgba(4,57,184,0.3)]">
                  <span className="text-sm font-bold tracking-widest text-[#0439B8] mb-4 uppercase">Let&apos;s Talk</span>
                  <span className="text-3xl font-bold leading-tight">GET A FREE CONSULTATION</span>
                </div>
              }
              gridSize={10}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              autoTriggerInterval={4000}
              className="w-full h-full !w-full !border-0"
              aspectRatio="100%"
            />

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-[#0439B8]/30 rounded-tr-3xl -z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-[#0439B8]/30 rounded-bl-3xl -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
