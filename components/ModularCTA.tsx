'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Mail } from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6';

export default function ModularCTA() {
  return (
    <section className="w-full bg-[#010D48] py-12 md:py-20 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Large Feature Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-12 flex flex-col justify-between min-h-[350px] md:min-h-[420px]"
          >
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-full mb-6">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#CDDCFF] flex items-center justify-center">
                  <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#0439B8]" />
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-black uppercase">START A PROJECT</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#010D48] mb-4">
                Let&apos;s Build <br /> Something Great.
              </h2>
              
              {/* Description */}
              <p className="text-[#4B5563] text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                Have an idea in mind? We&apos;re ready to transform it into a bold and meaningful digital experience.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 self-start group flex items-center gap-4 md:gap-6 bg-[#010D48] text-white pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full transition-shadow hover:shadow-2xl hover:shadow-blue-900/20"
            >
              <span className="text-base md:text-lg font-bold tracking-tight">Start Your Project</span>
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#0439B8] flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </motion.button>
          </motion.div>

          {/* Right Column - Social/Contact Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: <FaInstagram size={24} className="md:w-7 md:h-7" />, delay: 0.1 },
              { icon: <FaWhatsapp size={24} className="md:w-7 md:h-7" />, delay: 0.2 },
              { icon: <Mail size={24} className="md:w-7 md:h-7" />, delay: 0.3 },
              { icon: <FaFacebookF size={24} className="md:w-7 md:h-7" />, delay: 0.4 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white aspect-[4/3] rounded-[24px] md:rounded-[40px] flex items-center justify-center text-[#010D48] cursor-pointer transition-all hover:bg-[#F4F8FF] hover:shadow-xl group"
              >
                <div className="transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
