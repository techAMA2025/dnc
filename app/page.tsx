'use client';

import NewHome from "@/components/NewHome";
/* 
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => <div className="w-full h-[85vh] bg-zinc-50/50 animate-pulse flex items-center justify-center text-zinc-400">Loading Gallery...</div>
});
const DraggableCardDemo = dynamic(() => import("@/components/draggable-card-demo-2"), {
  ssr: false,
  loading: () => <div className="w-full h-[100vh] bg-white animate-pulse" />
});
const ExpandableCardDemo = dynamic(
  () => import("@/components/ui/expandable-card-demo-standard").then((mod) => mod.ExpandableCardDemo),
  {
    ssr: false,
    loading: () => <div className="w-full h-96 bg-zinc-50 animate-pulse" />
  }
);
const PixelCTA = dynamic(() => import("@/components/PixelCTA"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-[#0439B8]/10 animate-pulse" />
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  ssr: false,
});
*/

export default function Home() {
  return <NewHome />;
}

/*
export default function OldHome() {
  const impactItems = [
    { link: "#", text: "Empowering Global Brands", image: "/impact/global.png" },
    { link: "#", text: "Driving Digital Evolution", image: "/impact/evolution.png" },
    { link: "#", text: "Scale Beyond Limits", image: "/impact/scaling.png" },
    { link: "#", text: "Design That Performs", image: "/impact/performance.png" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <Hero />

      {/* Projects Section *\/}
      <section className="relative w-full min-h-[110vh] min-h-[110dvh] py-6 md:py-12 overflow-hidden bg-white border-t border-black/5">
        {/* Decorative background glow - uses gradient instead of blur for iOS performance *\/}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at center, rgba(4,57,184,0.05) 0%, transparent 70%)' }} />

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

        <div className="w-full h-[85vh] h-[85dvh] -mt-20">
          <CircularGallery
            items={[
              { image: "/projects/ama.png", text: "AMA Mobile" },
              { image: "/projects/ama-web.png", text: "AMA Web" },
              { image: "/projects/bunt.png", text: "BUNT" },
              { image: "/projects/delhi-house.png", text: "Delhi House" },
              { image: "/projects/fat-cookie.png", text: "Fat Cookie" },
              { image: "/projects/foire.png", text: "Foire" },
              { image: "/projects/houseof-nihalkhera.png", text: "House of Nihalkhera" },
              { image: "/projects/kamal-motors.png", text: "Kamal Motors" },
              { image: "/projects/sex-sea.png", text: "SexSea" },
              { image: "/projects/bloom.png", text: "Bloom" },
              { image: "/projects/kichun.png", text: "Kichun" },
            ]}
            bend={0}
            textColor="#000000"
            borderRadius={0.05}
            font="bold 30px Inter"
          />
        </div>

        <div className="relative z-10 flex justify-center mt-6 md:mt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/ourwork">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: '#0439B8',
                  boxShadow: '0 10px 30px rgba(4, 57, 184, 0.25)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg flex items-center gap-2 group"
              >
                <span>View Our Work</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>


      {/* What We Do Section *\/}
      <section className="relative w-full bg-white overflow-hidden border-t border-black/5">
        {/* Decorative background glow - uses gradient instead of blur for iOS performance *\/}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at center, rgba(4,57,184,0.03) 0%, transparent 70%)' }} />

        <div className="relative z-10 container mx-auto px-6 text-center pt-6 md:pt-12 -mb-20">
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





      {/* Blogs Section *\/}
      <section className="py-6 md:py-12 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6 mb-12 text-center">
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
        <ExpandableCardDemo layout="list" />
      </section>

      {/* FAQ Section *\/}
      <FAQ />

      {/* New Pixel CTA Section *\/}



    </main>
  );
}
*/
