'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const playgroundItems = [
  { icon: '/about/Frame 572 1.svg', label: 'Mobile App' },
  { icon: '/about/Frame 572-2 1.svg', label: 'Web App' },
  { icon: '/about/Frame 572-3 1.svg', label: 'Website' },
  { icon: '/about/Frame 572-4 1.svg', label: 'Branding' },
  { icon: '/about/Frame 572-5 1.svg', label: 'Logo' },
  { icon: '/about/Frame 572-6 1.svg', label: 'No-Code\nWebsite' },
  { icon: '/about/Frame 572-7 1.svg', label: 'Pitch Deck' },
  { icon: '/about/Frame 572-8 1.svg', label: 'App Store' },
  { icon: '/about/Frame 572-9 1.svg', label: 'Animations' },
  { icon: '/about/Frame 572.svg', label: 'See all\nProjects' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CreativePlayground() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#010D48] text-center mb-16 md:mb-20"
        >
          Our Creative Playground
        </motion.h2>

        {/* Icon Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-3 sm:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14"
        >
          {playgroundItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              {/* Icon container */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                  src={item.icon}
                  alt={item.label.replace('\n', ' ')}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              {/* Label */}
              <span className="text-[#010D48] text-xs md:text-sm font-medium text-center leading-tight whitespace-pre-line">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
