"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ContactHero = () => {
  const router = useRouter();
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

  const handleInputChange = (stateKey: keyof typeof formData, value: string) => {
    let processedValue = value;
    if (stateKey === "name") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (stateKey === "phone") {
      processedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    } else if (stateKey === "budget") {
      processedValue = value.replace(/[^0-9]/g, "");
    }
    setFormData(prev => ({ ...prev, [stateKey]: processedValue }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    if (!formData.services.trim()) {
      alert("Please tell us what services you are interested in.");
      return;
    }
    if (!formData.budget.trim()) {
      alert("Please tell us your budget.");
      return;
    }

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

      if (response.ok) {
        router.push("/thank-you");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-6 md:py-24 px-4 md:px-8 max-w-[1440px] mx-auto bg-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#000B3D] text-white rounded-[2.5rem] p-16 max-w-2xl mx-auto shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">Thanks for cooking with us!</h2>
          <p className="text-gray-300 text-lg mb-8">We've received your request and our team will reach out to you shortly to start the glow-up.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-10 py-4 bg-white text-[#000B3D] rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10 px-6 md:px-12 lg:px-20 bg-white max-w-[1400px] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12 md:space-y-18">
        
        {/* SECTION 1: Welcome Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-4 text-left order-1 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-[#000B3D]">
              Okay, let&apos;s make your brand look expensive
            </h1>
            <p className="text-zinc-500 text-sm md:text-base font-normal leading-relaxed max-w-xl">
              No boring websites. No cookie-cutter designs. Just clean visuals, smooth vibes &amp; conversion energy
            </p>
          </div>
          {/* Right: Yellow Cat Image */}
          <div className="w-full relative aspect-[16/7.5] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-zinc-100 order-2 md:order-2">
            <Image 
              src="/cat-hero.png"
              alt="Brand Look Expensive"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* SECTION 2: Name, Email & Phone Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Desk Cooking Cat Image */}
          <div className="w-full relative aspect-[16/7.5] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-zinc-100 order-2 md:order-1">
            <Image 
              src="/cooking.png"
              alt="Cooking Cat"
              fill
              className="object-cover"
            />
          </div>
          {/* Right: Text and Inputs */}
          <div className="space-y-5 text-left order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-[#000B3D]">
              Wait... who are we cooking for?
            </h2>
            <div className="space-y-5 max-w-xl">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#000B3D] pl-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-[3px] border-[#93C5FD] focus:border-[#000B3D] focus:ring-4 focus:ring-blue-100/50 transition-all outline-none text-[#000B3D] font-medium shadow-[0_4px_12px_rgba(147,197,253,0.1)]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#000B3D] pl-2">
                  Email Address
                </label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-[3px] border-[#93C5FD] focus:border-[#000B3D] focus:ring-4 focus:ring-blue-100/50 transition-all outline-none text-[#000B3D] font-medium shadow-[0_4px_12px_rgba(147,197,253,0.1)]"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#000B3D] pl-2">
                  Phone Number
                </label>
                <input 
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="10-digit number"
                  className="w-full px-6 py-4 rounded-full border-[3px] border-[#93C5FD] focus:border-[#000B3D] focus:ring-4 focus:ring-blue-100/50 transition-all outline-none text-[#000B3D] font-medium shadow-[0_4px_12px_rgba(147,197,253,0.1)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Services & Budget Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Text and Inputs */}
          <div className="space-y-5 text-left order-1 md:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-[#000B3D]">
              What kinda glow-up do you need?
            </h2>
            <div className="space-y-5 max-w-xl">
              {/* Services interested in */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#000B3D] pl-2">
                  What services are you interested in?*
                </label>
                <input 
                  type="text"
                  required
                  value={formData.services}
                  onChange={(e) => handleInputChange("services", e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-[3px] border-[#93C5FD] focus:border-[#000B3D] focus:ring-4 focus:ring-blue-100/50 transition-all outline-none text-[#000B3D] font-medium shadow-[0_4px_12px_rgba(147,197,253,0.1)]"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#000B3D] pl-2">
                  What is your budget?*
                </label>
                <input 
                  type="text"
                  required
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-[3px] border-[#93C5FD] focus:border-[#000B3D] focus:ring-4 focus:ring-blue-100/50 transition-all outline-none text-[#000B3D] font-medium shadow-[0_4px_12px_rgba(147,197,253,0.1)]"
                />
              </div>
            </div>
          </div>
          {/* Right: Phone Receiver Cat Image */}
          <div className="w-full relative aspect-[16/7.5] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-zinc-100 order-2 md:order-2">
            <Image 
              src="/glowup.png"
              alt="Glow Up Budget"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* SECTION 4: Center Submit Button */}
        <div className="pt-8 flex justify-center w-full">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-[#000B3D] hover:bg-[#000830] text-white font-bold text-xl rounded-full transition-all duration-300 shadow-xl shadow-[#000B3D]/10 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>

      </form>
    </section>
  );
};

export default ContactHero;
