'use client';

import { motion } from 'framer-motion';
import PixelSnow from './react-bits/PixelSnow';
import LogoLoop from './react-bits/LogoLoop';

import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiReact, 
  SiFramer, 
  SiVercel, 
  SiTypescript, 
  SiThreedotjs, 
  SiGreensock 
} from 'react-icons/si';

const partnerLogos = [
  { node: <SiNextdotjs size={80} className="text-white/90 px-4" /> },
  { node: <SiTailwindcss size={80} className="text-white/90 px-4" /> },
  { node: <SiReact size={80} className="text-white/90 px-4" /> },
  { node: <SiFramer size={80} className="text-white/90 px-4" /> },
  { node: <SiVercel size={80} className="text-white/90 px-4" /> },
  { node: <SiTypescript size={80} className="text-white/90 px-4" /> },
  { node: <SiThreedotjs size={80} className="text-white/90 px-4" /> },
  { node: <SiGreensock size={80} className="text-white/90 px-4" /> },
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
      {/* Pixel Snow Background */}
      <div className="absolute inset-0 z-0">
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/70"
          >
            Digital Excellence Redefined
          </motion.div>

          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
            We Build Websites So Good, Your <span className="text-[#0439B8]">Competitors</span> Start Taking Notes
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed font-light">
            Crafting high-performance digital experiences that command attention and drive growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#032e96' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#0439B8] text-white rounded-full font-bold text-lg shadow-2xl shadow-[#0439B8]/20 transition-all"
            >
              Build & Flex
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg backdrop-blur-md transition-all"
            >
              Our Strategy
            </motion.button>
          </div>

          {/* Logo Loop Slider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-full max-w-4xl mt-20"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-8 font-bold">
              Trusted by industry leaders
            </p>
            <LogoLoop 
              logos={partnerLogos}
              speed={40}
              gap={100}
              logoHeight={80}
              fadeOut={true}
              fadeOutColor="black"
              pauseOnHover={true}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
