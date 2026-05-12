'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FAQ from '@/components/FAQ';
import PixelCTA from '@/components/PixelCTA';
import Image from 'next/image';

const workItems = [
  {
    id: 1,
    title: 'Credsettle',
    category: 'loan Settlement',
    image: '/work/loan.png',
    type: 'Settlement'
  },
  {
    id: 2,
    title: 'Credsettle',
    category: 'loan Settlement',
    image: '/work/debt.png',
    type: 'Settlement'
  },
  {
    id: 3,
    title: 'Credsettle',
    category: 'loan Settlement',
    image: '/work/legal.png',
    type: 'Legal'
  },
  {
    id: 4,
    title: 'Credsettle',
    category: 'loan Settlement',
    image: '/work/loan.png',
    type: 'Settlement'
  }
];

const categories = ['All', 'Settlement', 'Legal', 'Consulting'];

export default function OurWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = activeCategory === 'All' 
    ? workItems 
    : workItems.filter(item => item.type === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        
        {/* Header / Filter Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative flex gap-2">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center bg-black text-white px-10 py-3 rounded-sm shadow-xl hover:bg-zinc-800 transition-all duration-300 min-w-[120px] justify-center"
            >
              <span className="text-sm font-medium tracking-widest">{activeCategory}</span>
            </button>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-black text-white p-3 rounded-sm shadow-xl hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-3 bg-white border border-zinc-100 shadow-2xl rounded-sm overflow-hidden z-20 min-w-[200px]"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-sm font-medium hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Card Container */}
              <div className="relative flex flex-col">
                
                {/* Image Section with Light Blue Padding */}
                <div className="bg-[#E2EDF8] p-4 rounded-t-sm">
                   <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-sm overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Overlay for premium feel */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-[#E2EDF8] px-5 py-5 rounded-b-sm flex justify-between items-center mt-[2px]">
                  <span className="text-black font-semibold text-xl tracking-tight">{item.title}</span>
                  <span className="text-zinc-500 text-sm font-medium">{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-40">
        <FAQ />
      </div>

      <PixelCTA />
    </main>
  );
}
