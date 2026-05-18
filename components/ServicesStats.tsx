'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { label: 'Projects Delivered', value: '800+' },
  { label: 'Years of Excellence', value: '10+' },
  { label: 'Clients Served', value: '500+' },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Extract the numeric portion and the rest of the string (e.g. "800" and "+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView) return;

    const node = ref.current;
    if (!node) return;

    // Smooth count animation with a premium easeOutExpo curve
    const controls = animate(0, targetNumber, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(latest) {
        node.textContent = Math.floor(latest).toLocaleString() + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, targetNumber, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function ServicesStats() {
  return (
    <section className="w-full bg-white py-12 px-2">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#010D48] text-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col justify-between min-h-[200px] md:min-h-[260px] group transition-transform hover:scale-[1.02]"
            >
              <div className="text-xs md:text-base font-medium opacity-80 tracking-wide uppercase">
                {stat.label}
              </div>
              <div className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-none">
                <AnimatedCounter value={stat.value} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
