'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

const services = [
  { 
    id: '01', 
    title: 'UI/UX Design',
    description: 'Clean and intuitive interfaces designed to improve usability, elevate user journeys, and create seamless digital interactions.',
    tags: ['Mobile App UI', 'Dashboard Design', 'User Experience', 'Wireframes'],
    image1: '/services/UX.png',
    image2: '/laptop_mockup_2.png'
  },
  { 
    id: '02', 
    title: 'Shopify',
    description: 'Custom Shopify solutions tailored to your brand, ensuring high conversion rates and a premium shopping experience.',
    tags: ['Store Setup', 'Theme Customization', 'App Integration', 'Performance'],
    image1: '/services/Shopify.png',
    image2: '/laptop_mockup_2.png'
  },
  { 
    id: '03', 
    title: 'WordPress',
    description: 'Powerful and flexible WordPress websites built with clean code and high scalability in mind.',
    tags: ['Custom Themes', 'Plugin Dev', 'Elementor/Divi', 'Site Speed'],
    image1: '/services/Wordpress.png',
    image2: '/laptop_mockup_2.png'
  },
  { 
    id: '04', 
    title: 'Custom Code',
    description: 'High-performance web applications built from scratch using modern frameworks like React, Next.js, and Node.',
    tags: ['Fullstack Dev', 'API Design', 'Cloud Apps', 'Database Architecture'],
    image1: '/services/Custom Code.png',
    image2: '/laptop_mockup_2.png'
  },
  { 
    id: '05', 
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies that help your brand reach the right audience and scale effectively.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Email Marketing'],
    image1: '/services/Marketing.png',
    image2: '/laptop_mockup_2.png'
  },
];

export default function ServicesHero() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8
  } as const;

  return (
    <section className="relative w-full bg-white pt-32 pb-6 md:pb-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full mb-8"
            >
              <div className="w-5 h-5 rounded-full bg-[#CDDCFF] flex items-center justify-center">
                <Plus className="w-3 h-3 text-[#0439B8]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-black uppercase">SERVICES</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tighter leading-none text-black"
            >
              OUR DIGITAL <br />
              <span className="text-[#0182FC]">SOLUTIONS.</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-[450px]"
          >
            <p className="text-zinc-600 text-base sm:text-lg md:text-xl leading-relaxed">
              We’re a team of designers, developers, and strategists creating modern digital experiences that help brands grow, connect, and stand out online.
            </p>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-4 mt-12 items-end">
          <div className="w-full md:w-[70%] flex flex-col gap-4">
            {services.map((service) => {
              const isExpanded = expandedId === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  transition={springTransition}
                  onClick={() => !isExpanded && setExpandedId(service.id)}
                  className={`group relative overflow-hidden cursor-pointer will-change-transform ${
                    isExpanded 
                      ? 'bg-[#010D48] text-white rounded-[32px] md:rounded-[40px] p-6 md:p-10' 
                      : 'bg-[#F4F8FF] text-[#010D48] rounded-full p-4 md:p-6 hover:bg-[#E8F1FF]'
                  }`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header Row: Always parallel on mobile and desktop */}
                    <div className="flex flex-row justify-between items-start md:items-center">
                      {/* Left: ID, Bullet, Title */}
                      <motion.div layout="position" className="flex items-center gap-3 md:gap-6">
                        <motion.span layout="position" className={`font-bold transition-colors duration-300 ${isExpanded ? 'text-xl md:text-4xl' : 'text-lg md:text-2xl'}`}>
                          {service.id}
                        </motion.span>
                        <motion.span layout="position" className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isExpanded ? 'bg-white' : 'bg-black'}`}></motion.span>
                        <motion.h3 layout="position" className={`font-medium tracking-tight transition-colors duration-300 ${isExpanded ? 'text-xl md:text-4xl' : 'text-lg md:text-3xl'}`}>
                          {service.title}
                        </motion.h3>
                      </motion.div>

                      {/* Right: Toggle Icon */}
                      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                          {isExpanded ? (
                            <motion.button
                              key="close"
                              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                              }}
                              className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0439B8] flex items-center justify-center text-black shadow-lg z-20"
                            >
                              <X className="w-5 h-5 md:w-7 md:h-7" strokeWidth={3} />
                            </motion.button>
                          ) : (
                            <motion.div 
                              key="plus"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#010D48] flex items-center justify-center transition-transform duration-300 group-hover:rotate-90"
                            >
                              <Plus className="w-4 h-4 md:w-6 md:h-6 text-[#CDDCFF]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Expanded Content Area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start pt-6 md:pt-10">
                            <div className="flex-1 max-w-xl">
                              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                                {service.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 pb-4">
                                {service.tags.map((tag) => (
                                  <span 
                                    key={tag} 
                                    className="px-4 py-2 md:px-5 md:py-2.5 border border-white/20 rounded-full text-[10px] md:text-sm font-medium hover:bg-white hover:text-[#010D48] transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Mockup Image - Responsive positioning */}
                            <div className="relative mt-8 md:mt-0 w-full md:w-[320px] h-[180px] md:h-[240px] overflow-visible">
                              <motion.div 
                                initial={{ opacity: 0, rotate: 10, x: 50 }}
                                animate={{ opacity: 1, rotate: -5, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute top-0 right-0 w-[180px] md:w-[280px] h-[130px] md:h-[200px] rounded-2xl overflow-hidden z-10"
                              >
                                <Image 
                                  src={service.image1} 
                                  alt={service.title} 
                                  fill 
                                  className="object-contain"
                                />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
