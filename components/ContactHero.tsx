"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Okay, let's make your brand look expensive",
    description: "No boring websites. No cookie-cutter designs. Just clean visuals, smooth vibes & conversion energy",
    image: "/cat-hero.png"
  },
  {
    id: 2,
    title: "Strategy that drives real growth",
    description: "Data-backed decisions paired with world-class design to ensure your brand doesn't just look good, but performs.",
    image: "/strategy.png"
  },
  {
    id: 3,
    title: "Execution with precision and style",
    description: "From concept to launch, we handle every detail with surgical precision and a relentless focus on quality.",
    image: "/execution.png"
  }
];

const ContactHero = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentStep];

  return (
    <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 max-w-[1300px] mx-auto p-8 md:px-16 md:py-10"
      >
        {/* Step Indicator Inside Card */}
        <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto">
          <div className="flex items-center w-full">
            {slides.map((slide, index) => (
              <React.Fragment key={slide.id}>
                <div className="relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index === currentStep 
                        ? "bg-[#000B3D] border-4 border-white shadow-[0_0_0_2px_#000B3D]" 
                        : index < currentStep 
                          ? "bg-[#000B3D]" 
                          : "bg-gray-200"
                    }`}
                  >
                    {index === 0 && index === currentStep ? (
                      <div className="w-5 h-5 rounded-full border-[2.5px] border-white"></div>
                    ) : (
                      <span className={`font-medium text-base ${index <= currentStep ? "text-white" : "text-gray-500"}`}>
                        {slide.id}
                      </span>
                    )}
                  </div>
                </div>
                {index < slides.length - 1 && (
                  <div className="flex-1 h-px border-t-2 border-dashed border-gray-300 mx-4"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px] md:min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="flex-[1.2] space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000B3D] leading-[1.1] tracking-tight">
                  {activeSlide.title}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
                  {activeSlide.description}
                </p>
              </div>
              
              <div className="flex-1 relative w-full">
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl h-[320px] relative">
                  <Image 
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-end mt-8">
          <button 
            onClick={handleNext}
            className="bg-[#000B3D] text-white px-12 py-3.5 rounded-full font-bold text-base hover:bg-[#000B3D]/90 transition-all shadow-xl active:scale-95"
          >
            {currentStep === slides.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
