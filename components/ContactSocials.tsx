"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaFacebookF 
} from "react-icons/fa";

const ContactSocials = () => {
  const iconSize = 38;

  return (
    <section className="py-24 bg-white max-w-7xl mx-auto px-6 text-center">
      {/* Centered Heading and Subheading */}
      <div className="space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000B3D]">
          Reach Out <br /> Anytime
        </h2>
        <p className="text-zinc-500 text-base md:text-lg">
          We&apos;re just a call or message away.
        </p>
      </div>

      {/* Centered Social Widescreen Quadrant Grid */}
      <div className="relative w-full max-w-[720px] aspect-[3/2] mx-auto">
        
        {/* SVG Flared Cross */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 600 400" className="w-full h-full fill-[#000B3D]" xmlns="http://www.w3.org/2000/svg">
            <path d="
              M 290 40 
              C 295 50, 298.5 100, 298.5 185 
              C 298.5 193.5, 293.5 198.5, 285 198.5 
              C 200 198.5, 55 195, 40 190 
              C 42 195, 42 205, 40 210 
              C 55 205, 200 201.5, 285 201.5 
              C 293.5 201.5, 298.5 206.5, 298.5 215 
              C 298.5 300, 295 350, 290 360 
              C 295 358, 305 358, 310 360 
              C 301.5 350, 301.5 300, 301.5 215 
              C 301.5 206.5, 306.5 201.5, 315 201.5 
              C 400 201.5, 545 205, 560 210 
              C 558 205, 558 195, 560 190 
              C 545 195, 400 198.5, 315 198.5 
              C 306.5 198.5, 301.5 193.5, 301.5 185 
              C 301.5 100, 305 50, 310 40 
              C 305 37, 295 37, 290 40 Z
            " />
          </svg>
        </div>

        {/* Social Icons inside Quadrants */}
        
        {/* Top-Left Quadrant: Instagram */}
        <motion.a 
          href="https://www.instagram.com/design_n_code/" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="absolute top-[30%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-[#000B3D] transition-transform duration-300"
        >
          <FaInstagram size={iconSize} />
        </motion.a>

        {/* Top-Right Quadrant: WhatsApp */}
        <motion.a 
          href="https://wa.me/919220721921" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="absolute top-[30%] right-[28%] translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-[#000B3D] transition-transform duration-300"
        >
          <FaWhatsapp size={iconSize} />
        </motion.a>

        {/* Bottom-Left Quadrant: Email */}
        <motion.a 
          href="mailto:info@designncode.com"
          whileHover={{ scale: 1.15 }}
          className="absolute bottom-[30%] left-[28%] -translate-x-1/2 translate-y-1/2 flex items-center justify-center cursor-pointer text-[#000B3D] transition-transform duration-300"
        >
          <Mail size={iconSize} />
        </motion.a>

        {/* Bottom-Right Quadrant: Facebook */}
        <motion.a 
          href="https://www.facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="absolute bottom-[30%] right-[28%] translate-x-1/2 translate-y-1/2 flex items-center justify-center cursor-pointer text-[#000B3D] transition-transform duration-300"
        >
          <FaFacebookF size={iconSize} />
        </motion.a>

      </div>
    </section>
  );
};

export default ContactSocials;

