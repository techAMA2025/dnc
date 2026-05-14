'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FAQ from '@/components/FAQ';
import PixelCTA from '@/components/PixelCTA';
import Image from 'next/image';

const workItems = [
  {
    id: 12,
    title: 'Sexsea',
    category: 'Lifestyle',
    image: '/project/12.svg',
    type: 'Consulting',
    link: 'https://sexsea.in/'
  },
  {
    id: 11,
    title: 'Bunt India',
    category: 'Fashion',
    image: '/project/11.svg',
    type: 'Consulting',
    link: 'https://buntindia.com/'
  },
  {
    id: 10,
    title: 'The Fat Cookie Chef',
    category: 'Food & Beverage',
    image: '/project/10.svg',
    type: 'Consulting',
    link: 'https://thefatcookiechef.com/'
  },
  {
    id: 9,
    title: 'Kamal Motors',
    category: 'Automotive',
    image: '/project/9.svg',
    type: 'Consulting',
    link: 'https://kamalmotors.in/'
  },
  {
    id: 8,
    title: 'Bloom Cafes',
    category: 'Hospitality',
    image: '/project/8.svg',
    type: 'Consulting',
    link: 'https://bloomcafes.com/'
  },
  {
    id: 7,
    title: 'Kichun Studio',
    category: 'Creative Studio',
    image: '/project/7.svg',
    type: 'Consulting',
    link: 'https://kichunstudio.com/'
  },
  {
    id: 6,
    title: 'AMA Legal Solutions',
    category: 'Legal',
    image: '/project/6.svg',
    type: 'Legal',
    link: 'https://www.amalegalsolutions.com/'
  },
  {
    id: 5,
    title: 'Foire',
    category: 'E-commerce',
    image: '/project/5.svg',
    type: 'Consulting',
    link: 'https://foire.in/'
  },
  {
    id: 4,
    title: 'Delhi House Cafe',
    category: 'Hospitality',
    image: '/project/4.svg',
    type: 'Consulting',
    link: 'https://www.delhihousecafe.com/'
  },
  {
    id: 3,
    title: 'Upstage Collect',
    category: 'Management',
    image: '/project/3.svg',
    type: 'Consulting',
    link: 'https://upstagecollect.com/'
  },
  {
    id: 2,
    title: 'Mamajama',
    category: 'Retail',
    image: '/project/2.svg',
    type: 'Consulting',
    link: 'https://mamajama.in/'
  },
  {
    id: 1,
    title: 'Credsettle',
    category: 'Fintech',
    image: '/project/1.svg',
    type: 'Settlement',
    link: 'https://www.credsettle.com/'
  },
  {
    id: 18,
    title: 'Farzi Cafe',
    category: 'Hospitality',
    image: '/project/18.svg',
    type: 'Consulting',
    link: 'https://www.farzicafe.com/'
  },
  {
    id: 17,
    title: 'Aerolume',
    category: 'Lifestyle',
    image: '/project/17.svg',
    type: 'Consulting',
    link: 'https://aerolume.in/'
  },
  {
    id: 16,
    title: 'Bo-Tai',
    category: 'Hospitality',
    image: '/project/16.svg',
    type: 'Consulting',
    link: 'https://www.bo-tai.co.in/'
  },
  {
    id: 15,
    title: 'Pure Asvaa',
    category: 'E-commerce',
    image: '/project/15.svg',
    type: 'Consulting',
    link: 'https://pureasvaa.com/'
  },
  {
    id: 14,
    title: 'Anyadha',
    category: 'Fashion',
    image: '/project/14.svg',
    type: 'Consulting',
    link: 'https://anyadha.in/'
  },
  {
    id: 13,
    title: 'Adorno Casa',
    category: 'Home Decor',
    image: '/project/13.svg',
    type: 'Consulting',
    link: 'https://adornocasa.com/'
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
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-6xl font-bold tracking-tighter mb-12 text-black text-center"
          >
            OUR WORK
          </motion.h1>

          <div className="relative flex gap-2">
    
            
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
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                {/* Card Container */}
                <div className="relative flex flex-col">
                  
                  {/* Image Section with Light Blue Padding */}
                  <div className="bg-[#E2EDF8] p-2 md:p-4 rounded-t-sm">
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
                  <div className="bg-[#E2EDF8] px-3 py-4 md:px-5 md:py-5 rounded-b-sm flex flex-col md:flex-row justify-between items-start md:items-center mt-[2px] gap-1 md:gap-0">
                    <span className="text-black font-semibold text-sm md:text-xl tracking-tight">{item.title}</span>
                    <span className="text-zinc-500 text-[10px] md:text-sm font-medium">{item.category}</span>
                  </div>
                </div>
              </a>
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
