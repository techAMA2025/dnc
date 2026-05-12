"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaWhatsapp, 
  FaFacebookF 
} from "react-icons/fa";

const ContactSocials = () => {
  const iconSize = 32;
  const color = "#000B3D";

  const socialItems = [
    { id: 1, icon: <FaInstagram size={iconSize} color={color} />, row: 1, col: 2 },
    { id: 2, icon: <FaLinkedinIn size={iconSize} color={color} />, row: 1, col: 3 },
    { id: 3, icon: <FaTwitter size={iconSize} color={color} />, row: 2, col: 1 },
    { id: 4, icon: <Mail size={iconSize} color={color} />, row: 2, col: 2 },
    { id: 5, icon: <FaWhatsapp size={iconSize} color={color} />, row: 2, col: 3 },
    { id: 6, icon: <Phone size={iconSize} color={color} />, row: 3, col: 1 },
    { id: 7, icon: <FaFacebookF size={iconSize} color={color} />, row: 3, col: 2 },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="mb-12 md:mb-0">
          <h2 className="text-5xl font-bold text-[#000B3D] mb-4">
            Reach Out <br /> Anytime
          </h2>
          <p className="text-gray-500 text-xl">
            We're just a call or message away.
          </p>
        </div>

        <div className="flex flex-col items-end w-full">
          <div className="grid grid-cols-3 w-fit">
            {/* Row 1 */}
            <div className="w-24 h-24 md:w-32 md:h-32 items-center justify-center flex"></div>
            <a 
              href="https://www.instagram.com/design_n_code/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-24 h-24 md:w-32 md:h-32 border-t border-l border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <FaInstagram size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </a>
            <div className="w-24 h-24 md:w-32 md:h-32 border-t border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <FaLinkedinIn size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </div>

            {/* Row 2 */}
            <div className="w-24 h-24 md:w-32 md:h-32 border-t border-l border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <FaTwitter size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </div>
            <a 
              href="mailto:info@designncode.com"
              className="w-24 h-24 md:w-32 md:h-32 border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <Mail size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </a>
            <div className="w-24 h-24 md:w-32 md:h-32 border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <FaWhatsapp size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </div>

            {/* Row 3 */}
            <a 
              href="tel:+919220721921"
              className="w-24 h-24 md:w-32 md:h-32 border-l border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <Phone size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </a>
            <div className="w-24 h-24 md:w-32 md:h-32 border-r border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <FaFacebookF size={iconSize} color={color} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 items-center justify-center flex"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSocials;
