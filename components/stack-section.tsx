"use client";

import React from "react";

const stackItems = [
  { name: "Flutter", color: "bg-black", textColor: "text-white", icon: "/icons/flutter.svg", rotation: "-2deg" },
  { name: "ReactJS", color: "bg-[#0439B8]", textColor: "text-white", icon: "/icons/react.svg", rotation: "4deg" },
  { name: "WordPress", color: "bg-[#0439B8]", textColor: "text-white", icon: "/icons/wordpress.svg", rotation: "-3deg" },
  { name: "Tailwind", color: "bg-[#0439B8]", textColor: "text-white", icon: "/icons/tailwind.svg", rotation: "5deg" },
  { name: "Next.js", color: "bg-black", textColor: "text-white", icon: "/icons/nextjs.svg", rotation: "-1deg" },
  { name: "Shopify", color: "bg-[#0439B8]", textColor: "text-white", icon: "/icons/shopify.svg", rotation: "2deg" },
];

export function StackSection() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
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

        {/* Tech Pills (Staggered at bottom) */}
        <div className="mt-24 flex flex-wrap justify-center gap-6 md:gap-8">
          {stackItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color} ${item.textColor} px-8 py-4 rounded-full flex items-center gap-3 shadow-lg transition-transform hover:scale-110 cursor-default`}
              style={{
                transform: `rotate(${item.rotation})`,
              }}
            >
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                {/* Placeholder for icon - using initial for now as I don't have the SVG files yet */}
                <span className="text-xs font-bold">{item.name[0]}</span>
              </div>
              <span className="text-lg md:text-2xl font-bold tracking-tight">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
