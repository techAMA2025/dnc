'use client';

import Hero from "@/components/Hero";
import CircularGallery from "@/components/CircularGallery";
import { motion } from "framer-motion";
import DraggableCardDemo from "@/components/draggable-card-demo-2";
import { TestimonialsBackground } from "@/components/TestimonialsBackground";
import { ExpandableCardDemo } from "@/components/ui/expandable-card-demo-standard";
import FlowingMenu from "@/components/FlowingMenu";
import LanyardCTA from "@/components/LanyardCTA";
import PixelCTA from "@/components/PixelCTA";
import FAQ from "@/components/FAQ";

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
      <section className="relative w-full h-[110vh] py-24 overflow-hidden bg-white border-t border-black/5">
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

        <div className="w-full h-[85vh] -mt-20">
          <CircularGallery
            items={[
              { image: "/projects/project-1.jpg", text: "Innovation Hub" },
              { image: "/projects/project-2.jpg", text: "Cloud Core" },
              { image: "/projects/project-3.jpg", text: "Digital Nexus" },
              { image: "/projects/project-4.jpg", text: "Alpha Stream" },
              { image: "/projects/project-5.jpg", text: "Quantum Edge" },
              { image: "/projects/project-6.jpg", text: "Visionary Lab" },
              { image: "/projects/project-7.jpg", text: "Synth Wave" },
              { image: "/projects/project-8.jpg", text: "Pulse Design" },
              { image: "/projects/project-9.jpg", text: "Nexus Prime" },
              { image: "/projects/project-10.jpg", text: "Zenith Tech" },
            ]}
            bend={0}
            textColor="#000000"
            borderRadius={0.05}
            font="bold 30px Inter"
          />
        </div>
      </section>


      {/* What We Do Section */}
      <section className="relative w-full bg-white overflow-hidden border-t border-black/5">
        {/* Decorative background glow - same as Projects section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 container mx-auto px-6 text-center pt-24 -mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black mb-6">
              What We <span className="text-[#0439B8]">Do</span>
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Specializing in Custom Code, Shopify, and WordPress at the forefront, supported by high-impact SEO and Digital Marketing behind the scenes.
            </p>
          </motion.div>
        </div>

        <DraggableCardDemo />
      </section>
      <PixelCTA />





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
              Explore our latest thoughts on web development, e-commerce, and digital growth strategies.
            </p>
          </motion.div>
        </div>
        <ExpandableCardDemo />
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* New Pixel CTA Section */}



    </main>
  );
}
