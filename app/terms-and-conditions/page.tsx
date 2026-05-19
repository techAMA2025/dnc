'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, CreditCard, Scale, HelpCircle } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-[#0439B8]" />,
      title: "1. Agreement to Terms",
      content: "By accessing our website, contracting our software development services, or registering for client portals provided by Design N Code, you agree to be fully bound by these Terms & Conditions. If you do not agree to all provisions within this document, you are explicitly prohibited from using our site and services and must cease interaction immediately."
    },
    {
      icon: <Award className="w-6 h-6 text-[#0439B8]" />,
      title: "2. Intellectual Property Rights",
      content: "Unless otherwise specified in custom project agreement riders, all creative assets, proprietary source codebases, visual elements, graphics, user interface designs, and architectural frameworks engineered by Design N Code are our exclusive intellectual property. Client deliverables (such as compiled final HTML, CSS, custom Next.js builds, or Shopify configurations) are transferred to client ownership only upon receipt of complete and final project milestone payments."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#0439B8]" />,
      title: "3. Payment Milestones & Fees",
      content: "Client projects are executed under standard milestone-based payment schedules. Retainers and deposit fees are strictly non-refundable and serve to reserve engineering bandwidth. Subsequent payments must be settled within 14 calendar days of milestone completion. Late payments are subject to a standard 1.5% compounding monthly surcharge, and we reserve the right to temporarily suspend project hosting or active support in the event of default."
    },
    {
      icon: <Scale className="w-6 h-6 text-[#0439B8]" />,
      title: "4. Limitation of Liability",
      content: "Under no circumstances shall Design N Code, its developers, directors, or partners be liable for any indirect, consequential, special, or punitive damages—including lost business profits, data leakage, hosting service disruptions, or hardware malfunctions—arising from the use of our services or developed code bases. Our absolute maximum cumulative liability shall not exceed the total fees paid by the client under their respective service contract."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-[#0439B8]" />,
      title: "5. Dispute Resolution & Governing Law",
      content: "These Terms & Conditions are governed by and construed in accordance with the laws of the jurisdiction of our corporate registration. Any legal disputes, claims, or regulatory disagreements arising from these provisions shall be settled exclusively through binding corporate arbitration before courts of competent jurisdiction, with the prevailing party entitled to recover reasonable legal and attorney fees."
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-neutral-950 pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0439B8]/5 dark:bg-[#0439B8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#CDDCFF]/5 dark:bg-[#0439B8]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Document Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left border-b border-zinc-200 dark:border-neutral-800 pb-10 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0439B8]/10 dark:bg-[#0439B8]/20 text-[#0439B8] dark:text-[#CDDCFF] rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            Terms & <span className="text-[#0439B8]">Conditions</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-2xl">
            Read the corporate regulations, intellectual property protections, and service agreements governing our software partnership. Last revised: May 19, 2026.
          </p>
        </motion.div>

        {/* Introduction Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-neutral-900/50 border border-zinc-100 dark:border-neutral-800/80 rounded-3xl p-6 md:p-10 shadow-sm mb-12 text-left"
        >
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white mb-4">Service Agreement Principles</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg">
            Welcome to the development services platform of <strong>Design N Code</strong>. By contracting our team for custom Next.js development, e-commerce engineering, headless architectures, or user experience design, you consent to comply with the terms set forth below. These terms regulate our delivery standards, code handoff conditions, payment structures, and legal rights.
          </p>
        </motion.div>

        {/* Policy Sections Grid */}
        <div className="flex flex-col gap-8 text-left">
          {sections.map((sec, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.05 }}
              className="bg-white dark:bg-neutral-900/50 border border-zinc-100 dark:border-neutral-800/80 rounded-3xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0439B8]/5 dark:bg-[#0439B8]/10 flex items-center justify-center flex-shrink-0">
                  {sec.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                  {sec.title}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed pl-2 md:pl-16">
                {sec.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Corporate Note Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 pt-8 border-t border-zinc-200 dark:border-neutral-800 text-center text-xs text-zinc-500 dark:text-zinc-500"
        >
          <p>© 2026 Design N Code. All corporate rights reserved. Registered development partner code: DNC-TERMS-2026-V1.</p>
        </motion.div>
      </div>
    </main>
  );
}
