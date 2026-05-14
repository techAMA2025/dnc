"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Okay, let's make your brand look expensive",
    description: "No boring websites. No cookie-cutter designs. Just clean visuals, smooth vibes & conversion energy",
    image: "/cat-hero.png",
    bgColor: "bg-white",
    textColor: "text-[#000B3D]",
    subTextColor: "text-gray-400",
    buttonText: "Next",
    isForm: false
  },
  {
    id: 2,
    title: "Wait... who are we cooking for?",
    fields: [
      { label: "Full Name", placeholder: "", type: "text" },
      { label: "Email Address", placeholder: "", type: "email" },
      { label: "Phone Number", placeholder: "", type: "tel" }
    ],
    image: "/cooking.png",
    bgColor: "bg-[#000B3D]",
    textColor: "text-white",
    subTextColor: "text-gray-300",
    buttonText: "Next",
    isForm: true
  },
  {
    id: 3,
    title: "What kinda glow-up do you need?",
    fields: [
      { label: "What services are you interested in?*", placeholder: "", type: "text" },
      { label: "What is your budget?*", placeholder: "", type: "text" },
      { label: "Any special message for us?", placeholder: "", type: "text" }
    ],
    image: "/glowup.png",
    bgColor: "bg-white",
    textColor: "text-[#000B3D]",
    subTextColor: "text-gray-400",
    buttonText: "Let's Build This",
    isForm: true
  }
];

const ContactHero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const fieldMap: { [key: string]: string } = {
      "Full Name": "name",
      "Email Address": "email",
      "Phone Number": "phone",
      "What services are you interested in?*": "services",
      "What is your budget?*": "budget",
      "Any special message for us?": "message"
    };
    
    const stateKey = fieldMap[field];
    if (!stateKey) return;

    let processedValue = value;
    if (stateKey === "name") {
      // Only alphabets and whitespaces allowed
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (stateKey === "phone") {
      // Only numerics allowed, max 10 characters
      processedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    }
    
    setFormData(prev => ({ ...prev, [stateKey]: processedValue }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = async () => {
    // Basic validation for current step
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        alert("Please enter your full name (alphabets and spaces only).");
        return;
      }
      if (!validateEmail(formData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!formData.phone || formData.phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.services.trim()) {
        alert("Please tell us what services you are interested in.");
        return;
      }
      if (!formData.budget.trim()) {
        alert("Please tell us your budget.");
        return;
      }
    }

    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: Submit the form
      setIsSubmitting(true);
      console.log("Submitting form data:", formData);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error("API error data:", errorData);
          alert(errorData.error || "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeSlide = slides[currentStep];

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto bg-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#000B3D] text-white rounded-[2.5rem] p-16 max-w-2xl mx-auto shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">Thanks for cooking with us!</h2>
          <p className="text-gray-300 text-lg mb-8">We've received your request and our team will reach out to you shortly to start the glow-up.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-10 py-4 bg-white text-[#000B3D] rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto bg-white">
      <motion.div 
        key={activeSlide.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${activeSlide.bgColor} rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 max-w-[1300px] mx-auto p-6 md:px-16 md:py-10 transition-colors duration-500`}
      >
        {/* Step Indicator Inside Card */}
        <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto">
          <div className="flex items-center w-full">
            {slides.map((slide, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const isDark = activeSlide.bgColor === "bg-[#000B3D]";
              
              return (
                <React.Fragment key={slide.id}>
                  <div className="relative">
                    <div 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? isDark ? "bg-white text-[#000B3D]" : "bg-[#000B3D] text-white border-4 border-white shadow-[0_0_0_2px_#000B3D]" 
                          : isPast 
                            ? isDark ? "bg-white text-[#000B3D]" : "bg-[#000B3D] text-white" 
                            : isDark ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index === 0 && isActive && activeSlide.id === 1 ? (
                        <div className="w-5 h-5 rounded-full border-[2.5px] border-white"></div>
                      ) : (
                        <span className="font-medium text-sm md:text-base">
                          {slide.id}
                        </span>
                      )}
                    </div>
                  </div>
                  {index < slides.length - 1 && (
                    <div className={`flex-1 h-px border-t-2 border-dashed mx-2 md:mx-4 ${isDark ? "border-white/30" : "border-gray-300"}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[420px] md:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            >
              <div className="flex-[1.2] space-y-6 w-full">
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${activeSlide.textColor} leading-[1.1] tracking-tight`}>
                  {activeSlide.title}
                </h1>
                
                {activeSlide.isForm ? (
                  <div className="space-y-6 max-w-2xl">
                    {activeSlide.fields?.map((field, idx) => {
                      const fieldMap: { [key: string]: keyof typeof formData } = {
                        "Full Name": "name",
                        "Email Address": "email",
                        "Phone Number": "phone",
                        "What services are you interested in?*": "services",
                        "What is your budget?*": "budget",
                        "Any special message for us?": "message"
                      };
                      const val = formData[fieldMap[field.label]];


                      return (
                        <div key={idx} className="space-y-2">
                          <label className={`block text-xs md:text-sm font-medium ${activeSlide.textColor}`}>
                            {field.label}
                          </label>
                          <input 
                            type={field.type}
                            value={val}
                            onChange={(e) => handleInputChange(field.label, e.target.value)}
                            placeholder={field.placeholder}
                            className={`w-full px-5 py-3 md:px-6 md:py-4 rounded-full border-2 transition-all outline-none ${
                              activeSlide.bgColor === "bg-[#000B3D]" 
                                ? "bg-white text-black border-transparent focus:ring-2 focus:ring-blue-400" 
                                : "bg-white text-black border-blue-100 focus:border-[#000B3D]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={`${activeSlide.subTextColor} text-base md:text-xl font-normal leading-relaxed max-w-xl`}>
                    {activeSlide.description}
                  </p>
                )}
              </div>
              
              <div className="flex-1 relative w-full block">
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl h-[240px] md:h-[320px] relative">
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
        
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handlePrev}
            disabled={isSubmitting}
            className={`font-bold text-lg transition-opacity ${currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-100"} ${activeSlide.textColor} disabled:opacity-50`}
          >
            Previous
          </button>
          
          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className={`px-8 py-3 md:px-12 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-all shadow-xl active:scale-95 flex items-center gap-2 ${
              activeSlide.bgColor === "bg-[#000B3D]" 
                ? "bg-white text-[#000B3D] hover:bg-white/90" 
                : "bg-[#000B3D] text-white hover:bg-[#000B3D]/90"
            } disabled:opacity-70`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              activeSlide.buttonText
            )}
          </button>
        </div>
      </motion.div>
    </section>

  );
};

export default ContactHero;
