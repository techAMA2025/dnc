"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The attention to detail and smooth animations are world-class. It's completely transformed our user experience.",
    name: "Sarah Chen",
    role: "Design Lead @ TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    quote: "Implementing these components was a breeze. The performance is top-notch even with complex physics.",
    name: "Marcus Rodriguez",
    role: "Senior Engineer @ Nexa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    quote: "The best UI library I've used in years. It feels premium and looks stunning out of the box.",
    name: "Elena Gilbert",
    role: "Product Manager @ Lumina",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    quote: "Our conversion rates spiked by 40% after we revamped our landing page with these interactive elements.",
    name: "James Wilson",
    role: "Founder @ GrowthScale",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    quote: "A game-changer for modern web development. The dragging physics feel incredibly natural.",
    name: "Aisha Patel",
    role: "UX Researcher @ Innovate",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    quote: "The aesthetics are unmatched. It gives our brand a sophisticated and high-tech feel.",
    name: "David Park",
    role: "Creative Director @ Prism",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 7,
    quote: "Finally, a library that understands the balance between form and function. Pure excellence.",
    name: "Sophie Laurent",
    role: "Frontend Architect @ CloudNine",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    id: 8,
    quote: "The interactive testimonials are a hit! Our clients love playing with the cards while reading reviews.",
    name: "Michael Scott",
    role: "Regional Manager @ DunderMifflin",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
  }
];

export function TestimonialsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag state for the entire canvas
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring for the drag values
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Randomly distribute cards on a larger canvas
  const cardPositions = useMemo(() => {
    return testimonials.map((_, i) => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      rotate: (Math.random() - 0.5) * 20,
    }));
  }, []);

  // Function to center a specific card
  const centerCard = (cardX: number, cardY: number) => {
    x.set(-cardX);
    y.set(-cardY);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[800px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background Grid - Parallax effect */}
      <motion.div 
        className="absolute inset-[-1000px] z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          x: useTransform(smoothX, (v) => v * 0.2),
          y: useTransform(smoothY, (v) => v * 0.2),
        }}
      />

      {/* Draggable Canvas */}
      <motion.div
        drag
        dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
        dragElastic={0.1}
        style={{ x, y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {testimonials.map((testimonial, i) => (
          <TestimonialCard 
            key={testimonial.id}
            testimonial={testimonial}
            initialX={cardPositions[i].x}
            initialY={cardPositions[i].y}
            initialRotate={cardPositions[i].rotate}
            canvasX={smoothX}
            canvasY={smoothY}
            onSelect={() => centerCard(cardPositions[i].x, cardPositions[i].y)}
          />
        ))}
      </motion.div>

      {/* Static Center Content */}
      <div className="relative z-10 pointer-events-none text-center px-4 max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Trusted by Industry Leaders
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl">
          Drag to explore what our clients have to say about our innovative solutions.
        </p>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
}

function TestimonialCard({ 
  testimonial, 
  initialX, 
  initialY, 
  initialRotate,
  canvasX,
  canvasY,
  onSelect
}: { 
  testimonial: Testimonial; 
  initialX: number; 
  initialY: number; 
  initialRotate: number;
  canvasX: any;
  canvasY: any;
  onSelect: () => void;
}) {
  const cardX = useTransform(canvasX, (val: number) => val + initialX);
  const cardY = useTransform(canvasY, (val: number) => val + initialY);
  
  const distance = useTransform([cardX, cardY], ([cx, cy]) => {
    const d = Math.sqrt((cx as number) ** 2 + (cy as number) ** 2);
    return d;
  });

  const scale = useTransform(distance, [0, 400], [1.1, 0.75]);
  const opacity = useTransform(distance, [0, 800], [1, 0.05]);
  const blur = useTransform(distance, [0, 600], ["0px", "8px"]);
  const zIndex = useTransform(distance, [0, 400], [50, 0]);

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        x: initialX,
        y: initialY,
        rotate: initialRotate,
        scale,
        opacity,
        filter: blur,
        zIndex,
      }}
      whileHover={{ scale: 1.15, zIndex: 100, transition: { duration: 0.2 } }}
      className="absolute p-6 w-[350px] bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto cursor-pointer"
    >
      <div className="flex flex-col gap-4">
        <div className="text-neutral-200 text-lg font-medium leading-relaxed italic">
          "{testimonial.quote}"
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-10 h-10 rounded-full object-cover border border-neutral-700 shadow-sm"
          />
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">{testimonial.name}</div>
            <div className="text-neutral-500 text-xs">{testimonial.role}</div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
