'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-black/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <Plus className={`w-4 h-4 ${isOpen ? 'text-black' : 'text-[#0439B8]'}`} />
          </motion.div>
          <span className="text-lg md:text-xl font-light text-black group-hover:text-black/80 transition-colors">
            {question}
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-12 pr-4 text-zinc-600 text-base leading-relaxed max-w-2xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What platforms do you specialize in?",
      answer: "We are experts in Custom Web Development (React, Next.js), Shopify, and WordPress. Whether you need a bespoke application or a powerful e-commerce store, we have the specialized knowledge to deliver premium results."
    },
    {
      question: "Do you offer custom coding services?",
      answer: "Absolutely. We pride ourselves on our 'Custom Code' first approach. While we use platforms like Shopify and WordPress, we often build custom themes, plugins, and integrations from scratch to ensure your site is unique and high-performing."
    },
    {
      question: "How long does a typical website project take?",
      answer: "A standard project typically takes 4-8 weeks depending on complexity. Custom web applications or complex e-commerce migrations might take 10-12 weeks. We prioritize quality and performance in every line of code we write."
    },
    {
      question: "Do you provide ongoing maintenance and SEO?",
      answer: "Yes, we offer comprehensive support packages that include technical maintenance, performance optimization, and data-driven SEO strategies to ensure your website continues to grow and rank well after launch."
    },
    {
      question: "Can you migrate my existing store to Shopify?",
      answer: "We specialize in seamless migrations from platforms like WooCommerce, Magento, or custom setups to Shopify. We ensure all your data, products, and SEO rankings are preserved during the transition."
    },
    {
      question: "What is your design process?",
      answer: "Our process is highly collaborative. It starts with strategic discovery, followed by high-fidelity UI/UX design, custom development, rigorous testing, and finally, a smooth deployment. We focus on creating designs that not only look stunning but also convert."
    }
  ];

  return (
    <section className="relative z-10 w-full py-12 px-6 md:px-16 bg-white overflow-hidden border-t border-black/5">
      {/* Background decoration - gradient instead of blur for iOS performance */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(4,57,184,0.05) 0%, transparent 70%)' }} />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Column - Heading */}
        <div className="flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-[1.1]">
              Frequently asked<br />questions
            </h2>
          </motion.div>
        </div>

        {/* Right Column - FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
