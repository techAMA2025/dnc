import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function DraggableCardDemo() {
  const items = [
    {
      title: "SEO",
      description: "Boost your organic visibility and drive targeted traffic with our comprehensive search engine optimization services.",
      image: "/seo.png",
      className: "absolute bottom-[22%] right-[25%] md:right-[32%] rotate-[3deg]",
      gradient: "from-red-500/20 to-rose-500/20",
      border: "border-red-500/30",
      accent: "bg-red-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      title: "Digital Marketing",
      description: "Scale your brand with data-driven strategies that engage and convert your target audience across all digital channels.",
      image: "/digital_marketing.png",
      className: "absolute bottom-[20%] left-[25%] md:left-[32%] rotate-[-5deg]",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      accent: "bg-purple-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      title: "UI/UX Design",
      description: "User-centric design that focuses on creating intuitive, engaging, and visually stunning digital interfaces.",
      image: "/uiux.png",
      className: "absolute top-[40%] right-[15%] md:right-[20%] rotate-[-4deg]",
      gradient: "from-fuchsia-500/20 to-purple-500/20",
      border: "border-fuchsia-500/30",
      accent: "bg-fuchsia-500",
      glowColor: "rgba(217, 70, 239, 0.5)",
    },
    {
      title: "Custom Code",
      description: "Fast, scalable development for high-performing web experiences tailored to your unique needs.",
      image: "/custom_Code.png",
      className: "absolute top-[15%] left-[20%] md:left-[28%] rotate-[-6deg]",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      accent: "bg-blue-500",
      glowColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      title: "Shopify",
      description: "High-performing Shopify stores optimized for sales, speed, and a smooth customer journey.",
      image: "/shopify.png",
      className: "absolute top-[25%] left-[32%] md:left-[38%] rotate-[4deg]",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      accent: "bg-green-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
    },
    {
      title: "WordPress",
      description: "Flexible, scalable WordPress websites that are easy to manage and built to grow with your business.",
      image: "/wordpress.png",
      className: "absolute top-[18%] right-[20%] md:right-[28%] rotate-[8deg]",
      gradient: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
      accent: "bg-orange-500",
      glowColor: "rgba(249, 115, 22, 0.5)",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden py-20">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-4xl md:text-8xl font-black text-black/[0.2] dark:text-white/[1] tracking-tighter text-center max-w-5xl px-6">
          More than just pretty pixels
        </h2>
      </div>

      {items.map((item, index) => (
        <DraggableCardBody
          key={item.title}
          glowColor={item.glowColor}
          className={cn(
            item.className,
            "border-[3px] bg-white dark:bg-white shadow-xl p-0 overflow-hidden min-h-fit",
            item.border.replace("/30", "/60"), // Increase border opacity for better visibility
            index === 0 && "z-[10]",
            index === 1 && "z-[20]",
            index === 2 && "z-[30]",
            index === 3 && "z-[40]",
            index === 4 && "z-[50]",
            index === 5 && "z-[60]"
          )}
        >
          <div className="relative z-10">
            {/* Content Container */}
            <div className="p-6 flex flex-col">
              {item.image && (
                <div className="mb-6 rounded-lg overflow-hidden border border-black/5 relative h-32">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="mb-2 text-2xl font-bold text-neutral-900">
                {item.title}
              </h3>



              <p className="text-neutral-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );

}

