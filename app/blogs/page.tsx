'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ExpandableCardDemo = dynamic(
  () => import("@/components/ui/expandable-card-demo-standard").then((mod) => mod.ExpandableCardDemo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-zinc-50/50 animate-pulse flex items-center justify-center text-zinc-400">
        Loading Blogs...
      </div>
    )
  }
);

export default function BlogsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Blogs Section - With padding top (pt-32) to clear the absolute Navbar */}
      <section className="relative w-full pt-32 pb-16 md:pb-24 overflow-hidden bg-white">
        {/* Decorative background glow - matching homepage / about pages style */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(4,57,184,0.05) 0%, transparent 70%)' }} 
        />

        <div className="relative z-10 container mx-auto px-6 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Latest <span className="text-[#0439B8]">Insights</span>
            </h1>
            <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Explore our latest thoughts on web development, e-commerce, and digital growth strategies.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <ExpandableCardDemo />
        </div>
      </section>
    </main>
  );
}
