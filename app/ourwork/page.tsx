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
    tech: 'Custom Code',
    link: 'https://sexsea.in/'
  },
  {
    id: 11,
    title: 'Bunt India',
    category: 'Fashion',
    image: '/project/11.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://buntindia.com/'
  },
  {
    id: 10,
    title: 'The Fat Cookie Chef',
    category: 'Food & Beverage',
    image: '/project/10.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://thefatcookiechef.com/'
  },
  {
    id: 9,
    title: 'Kamal Motors',
    category: 'Automotive',
    image: '/project/9.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://kamalmotors.in/'
  },
  {
    id: 8,
    title: 'Bloom Cafes',
    category: 'Hospitality',
    image: '/project/8.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://bloomcafes.com/'
  },
  {
    id: 7,
    title: 'Kichun Studio',
    category: 'Creative Studio',
    image: '/project/7.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://kichunstudio.com/'
  },
  {
    id: 6,
    title: 'AMA Legal Solutions',
    category: 'Legal',
    image: '/project/6.svg',
    type: 'Legal',
    tech: 'Custom Code',
    link: 'https://www.amalegalsolutions.com/'
  },
  {
    id: 5,
    title: 'Foire',
    category: 'E-commerce',
    image: '/project/5.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://foire.in/'
  },
  {
    id: 4,
    title: 'Delhi House Cafe',
    category: 'Hospitality',
    image: '/project/4.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://www.delhihousecafe.com/'
  },
  {
    id: 3,
    title: 'Upstage Collect',
    category: 'Management',
    image: '/project/3.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://upstagecollect.com/'
  },
  {
    id: 2,
    title: 'Mamajama',
    category: 'Retail',
    image: '/project/2.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://mamajama.in/'
  },
  {
    id: 1,
    title: 'Credsettle',
    category: 'Fintech',
    image: '/project/1.svg',
    type: 'Settlement',
    tech: 'Custom Code',
    link: 'https://www.credsettle.com/'
  },
  {
    id: 18,
    title: 'Farzi Cafe',
    category: 'Hospitality',
    image: '/project/18.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://www.farzicafe.com/'
  },
  {
    id: 17,
    title: 'Aerolume',
    category: 'Lifestyle',
    image: '/project/17.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://aerolume.in/'
  },
  {
    id: 16,
    title: 'Bo-Tai',
    category: 'Hospitality',
    image: '/project/16.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://www.bo-tai.co.in/'
  },
  {
    id: 15,
    title: 'Pure Asvaa',
    category: 'E-commerce',
    image: '/project/15.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://pureasvaa.com/'
  },
  {
    id: 14,
    title: 'Anyadha',
    category: 'Fashion',
    image: '/project/14.svg',
    type: 'Consulting',
    tech: 'Shopify',
    link: 'https://anyadha.in/'
  },
  {
    id: 13,
    title: 'Adorno Casa',
    category: 'Home Decor',
    image: '/project/13.svg',
    type: 'Consulting',
    tech: 'WordPress',
    link: 'https://adornocasa.com/'
  }
];

const categories = ['All', 'Shopify', 'WordPress', 'Custom Code'];

export default function OurWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = activeCategory === 'All' 
    ? workItems 
    : workItems.filter(item => item.tech === activeCategory);

  // Dynamically calculate the ideal split index to keep grids visually balanced
  const getSplitIndex = (total: number) => {
    if (total <= 2) return total;
    const half = Math.floor(total / 2);
    // Prefer an even split index so that the first grid has complete rows (2 columns)
    return half % 2 === 0 ? half : Math.max(2, half - 1);
  };

  const splitIndex = getSplitIndex(filteredItems.length);
  const firstHalf = filteredItems.slice(0, splitIndex);
  const secondHalf = filteredItems.slice(splitIndex);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      {/* First Grid Section */}
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        
        {/* Header / Filter Section */}
        <div className="flex flex-row items-center justify-between gap-4 mb-16 border-b border-zinc-100 pb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-black text-left"
          >
            OUR WORK
          </motion.h1>

          <div className="relative z-20 flex justify-end">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-full text-black hover:border-black hover:bg-zinc-50 transition-all duration-300 font-semibold"
            >
              <span>{activeCategory === 'All' ? 'All Tech' : activeCategory}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 bg-white border border-zinc-100 shadow-2xl rounded-xl overflow-hidden z-25 min-w-[220px]"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-6 py-4 text-center text-sm font-medium transition-colors border-b border-zinc-50 last:border-0 text-black hover:bg-zinc-50 ${activeCategory === cat ? 'bg-zinc-50 font-bold text-[#0439B8]' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid Section - Part 1 */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          {firstHalf.map((item, index) => (
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

      {/* Pixel CTA - Inserted between projects */}
      {secondHalf.length > 0 && (
        <div className="my-20">
          <PixelCTA />
        </div>
      )}

      {/* Second Grid Section */}
      {secondHalf.length > 0 && (
        <div className="container mx-auto px-6 md:px-16 max-w-7xl mt-16 md:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
            {secondHalf.map((item, index) => (
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
      )}

      {/* FAQ Section */}
      <div className="mt-40">
        <FAQ />
      </div>

      {/* Fallback CTA if second half is empty */}
      {secondHalf.length === 0 && <PixelCTA />}
    </main>
  );
}
