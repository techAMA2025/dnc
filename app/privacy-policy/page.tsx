'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, RefreshCw, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-[#0439B8]" />,
      title: "1. Information We Collect",
      content: "At Design N Code, we collect information that you directly provide to us when interacting with our platform, submitting project inquiries, or engaging with our digital resources. This includes personally identifiable information such as your name, corporate email address, business telephone number, and company name. We also automatically gather standard analytical metadata, including device type, operating system, IP address, referral sources, and browse duration, to evaluate application performance and speed configurations."
    },
    {
      icon: <Lock className="w-6 h-6 text-[#0439B8]" />,
      title: "2. How We Use Your Information",
      content: "The gathered datasets are processed exclusively to optimize your business engagement and deliver state-of-the-art web products. We use your data to respond to customized software requests, send project updates, process transactions, perform system diagnostic analyses, and improve client-side interactivity on our Next.js platforms. We do not sell, rent, or lease your private personal details to third-party brokers under any circumstances."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0439B8]" />,
      title: "3. Data Retention & Security",
      content: "We implement robust enterprise-grade security protocols, including Transport Layer Security (TLS/HTTPS) encryption, to safeguard all data inputs. Your personal database records are retained only for as long as necessary to fulfill the legal requirements of your custom service agreements or to resolve technical audits. Client source files, design layouts, and production code bases are securely isolated and protected from unauthorized external access."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#0439B8]" />,
      title: "4. Third-Party Integrations",
      content: "Our services utilize standard third-party tools (such as Google Analytics, Vercel performance monitoring, and secure payment processing gateways) to maintain site scalability. These tools handle data strictly in accordance with their respective compliance policies. If you interact with our integrated WhatsApp community linkages, your phone number and chat identifiers are governed directly by WhatsApp's native security policies."
    },
    {
      icon: <Mail className="w-6 h-6 text-[#0439B8]" />,
      title: "5. Contact & Regulatory Rights",
      content: "You hold the absolute right to request access to, correction of, or erasure of any personal records stored within our databases. If you wish to execute your data protection rights, or if you have questions regarding this Privacy Policy statement, please contact our data compliance officer directly at info@designncode.com. We will respond to and address your requests within 10 business days."
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-neutral-950 pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0439B8]/5 dark:bg-[#0439B8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CDDCFF]/5 dark:bg-[#0439B8]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Document Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left border-b border-zinc-200 dark:border-neutral-800 pb-10 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0439B8]/10 dark:bg-[#0439B8]/20 text-[#0439B8] dark:text-[#CDDCFF] rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Legal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            Privacy <span className="text-[#0439B8]">Policy</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-2xl">
            Learn how Design N Code collects, manages, processes, and protects your corporate data inputs. Last revised: May 19, 2026.
          </p>
        </motion.div>

        {/* Introduction Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-neutral-900/50 border border-zinc-100 dark:border-neutral-800/80 rounded-3xl p-6 md:p-10 shadow-sm mb-12 text-left"
        >
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white mb-4">Our Commitment to Your Privacy</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg">
            At <strong>Design N Code</strong>, trust is the foundation of our engineering partnerships. We build state-of-the-art digital storefronts, Next.js applications, and custom enterprise portals with security as a native, non-negotiable architectural layer. This Privacy Policy documents how we process customer information when you use our website, custom client dashboards, or consult with our development team.
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
          <p>© 2026 Design N Code. All corporate rights reserved. Registered data handler ID: DNC-COMP-2026-V1.</p>
        </motion.div>
      </div>
    </main>
  );
}
