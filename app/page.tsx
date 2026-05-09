'use client';

import Hero from "@/components/Hero";
import CircularGallery from "@/components/CircularGallery";
import { motion } from "framer-motion";
import DraggableCardDemo from "@/components/draggable-card-demo-2";
import { TestimonialsBackground } from "@/components/TestimonialsBackground";
import { ExpandableCardDemo } from "@/components/ui/expandable-card-demo-standard";
import FlowingMenu from "@/components/FlowingMenu";
import LanyardCTA from "@/components/LanyardCTA";

export default function Home() {
  const impactItems = [
    { link: "#", text: "Empowering Global Brands", image: "/impact/global.png" },
    { link: "#", text: "Driving Digital Evolution", image: "/impact/evolution.png" },
    { link: "#", text: "Scale Beyond Limits", image: "/impact/scaling.png" },
    { link: "#", text: "Design That Performs", image: "/impact/performance.png" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <Hero />

      {/* Projects Section */}
      <section className="relative w-full h-[90vh] py-24 overflow-hidden bg-white border-t border-black/5">
        {/* Decorative background glow - adjusted for white bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0439B8]/5 blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 container mx-auto px-6 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Featured <span className="text-[#0439B8]">Projects</span>
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              A curated selection of digital masterpieces that push the boundaries of what&apos;s possible on the web.
            </p>
          </motion.div>
        </div>

        <div className="w-full h-[60vh] mt-10">
          <CircularGallery
            items={[
              { image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", text: "Abstract Flow" },
              { image: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2670&auto=format&fit=crop", text: "Digital Wave" },
              { image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2535&auto=format&fit=crop", text: "Neon Grid" },
              { image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=2564&auto=format&fit=crop", text: "Modern Minimal" },
              { image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", text: "Cyberpunk City" },
              { image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop", text: "Ethereal Glow" },
            ]}
            bend={3}
            textColor="#000000"
            borderRadius={0.05}
            font="bold 30px Inter"
          />
        </div>
      </section>


      {/* What We Do Section */}
      <section className="relative w-full bg-white dark:bg-black overflow-hidden border-t border-black/5 dark:border-white/5">
        <div className="relative z-10 container mx-auto px-6 text-center pt-24 -mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
              What We <span className="text-[#0439B8]">Do</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We build immersive digital experiences that captivate, engage, and inspire.
            </p>
          </motion.div>
        </div>
        <DraggableCardDemo />
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full border-t border-white/5 bg-black">
        <TestimonialsBackground />
      </section>

      {/* Blogs Section */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
              Latest <span className="text-[#0439B8]">Insights</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Explore our latest thoughts on design, technology, and the future of digital experiences.
            </p>
          </motion.div>
        </div>
        <ExpandableCardDemo />
      </section>

      {/* CTA Section with Lanyard */}
      <LanyardCTA />

    </main>
  );
}
