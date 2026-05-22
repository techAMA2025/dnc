"use client";

import React from "react";
import PhysicsBadges from "@/components/PhysicsBadges";
import { SiFlutter, SiReact, SiWordpress, SiTailwindcss, SiNextdotjs, SiShopify } from "react-icons/si";

const stackItems = [
  { 
    name: "Flutter", 
    color: "bg-black hover:bg-[#02569B]/10 border-black", 
    textColor: "text-white", 
    icon: <SiFlutter className="w-5 h-5 text-[#02569B] group-hover:scale-110 transition-transform duration-300" />, 
    rotation: "-2deg" 
  },
  { 
    name: "ReactJS", 
    color: "bg-[#0439B8] hover:bg-white border-[#0439B8]", 
    textColor: "text-white hover:text-[#0439B8]", 
    icon: <SiReact className="w-5 h-5 text-[#61DAFB] group-hover:rotate-180 transition-transform duration-700" />, 
    rotation: "4deg" 
  },
  { 
    name: "WordPress", 
    color: "bg-[#0439B8] hover:bg-white border-[#0439B8]", 
    textColor: "text-white hover:text-[#0439B8]", 
    icon: <SiWordpress className="w-5 h-5 text-[#21759B]" />, 
    rotation: "-3deg" 
  },
  { 
    name: "Tailwind", 
    color: "bg-[#0439B8] hover:bg-white border-[#0439B8]", 
    textColor: "text-white hover:text-[#0439B8]", 
    icon: <SiTailwindcss className="w-5 h-5 text-[#38BDF8]" />, 
    rotation: "5deg" 
  },
  { 
    name: "Next.js", 
    color: "bg-black hover:bg-white border-black", 
    textColor: "text-white hover:text-black", 
    icon: <SiNextdotjs className="w-5 h-5 text-white hover:text-black transition-colors duration-300" />, 
    rotation: "-1deg" 
  },
  { 
    name: "Shopify", 
    color: "bg-[#0439B8] hover:bg-white border-[#0439B8]", 
    textColor: "text-white hover:text-[#0439B8]", 
    icon: <SiShopify className="w-5 h-5 text-[#7AB55C]" />, 
    rotation: "2deg" 
  },
];

export function StackSection() {
  return (
    <section className="py-6 md:py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Heading & Subtext */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-[800px]">
            <h2 className="text-4xl md:text-7xl font-bold text-black leading-tight tracking-tight">
              <span className="text-[#0439B8] font-serif italic font-light">Stack:</span> Powering ideas with fast, scalable technologies.
            </h2>
          </div>
          
          <div className="max-w-[500px] md:mt-4">
            <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed">
              We use industry-leading technologies and tools to design, develop, and deliver high-performance digital experiences. From frontend frameworks to backend systems and design tools, every choice is made to ensure speed, scalability, and seamless user experience.
            </p>
          </div>
        </div>

        {/* Tech Pills Physics Arena */}
        <div className="mt-20">
          <PhysicsBadges trigger="scroll" restitution={0.6} gravity={1.2}>
            {stackItems.map((item, index) => (
              <div
                key={index}
                className={`physics-badge group ${item.color} ${item.textColor} px-8 py-4 rounded-full flex items-center gap-3 border shadow-md hover:shadow-xl transition-all duration-300 select-none cursor-grab active:cursor-grabbing`}
                style={{
                  transform: `rotate(${item.rotation})`,
                }}
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-lg md:text-2xl font-bold tracking-tight">{item.name}</span>
              </div>
            ))}
          </PhysicsBadges>
        </div>
      </div>
    </section>
  );
}

