"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

const snappyTransition = {
  type: "spring" as const,
  stiffness: 480,
  damping: 38,
};

export interface ExpandableCardDemoProps {
  layout?: "list" | "grid";
}

export function ExpandableCardDemo({ layout = "grid" }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-[9998]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[9999]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              transition={snappyTransition}
              className="w-full max-w-[750px] h-full md:h-auto md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/5 relative"
            >
              <motion.button
                key={`close-${active.title}-${id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 z-50 flex items-center justify-center bg-black/60 hover:bg-black/85 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/90 text-white rounded-full h-9 w-9 backdrop-blur-sm transition-all shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(null);
                }}
                aria-label="Close modal"
              >
                <CloseIcon />
              </motion.button>
              <motion.div 
                layoutId={`image-${active.title}-${id}`} 
                transition={snappyTransition}
                className="relative h-64 md:h-80 w-full flex-shrink-0"
              >
                <Image
                  src={active.src}
                  alt={active.title}
                  fill
                  sizes="(max-width: 750px) 100vw, 750px"
                  className="sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col flex-grow overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0">
                  <div>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      transition={snappyTransition}
                      className="text-xs font-bold tracking-widest text-[#0439B8] dark:text-[#CDDCFF] uppercase"
                    >
                      {active.description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      transition={snappyTransition}
                      className="text-xl md:text-3xl font-extrabold text-black dark:text-white mt-1"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    transition={snappyTransition}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-6 py-3 text-sm rounded-full font-bold bg-[#0439B8] hover:bg-[#032e96] text-white whitespace-nowrap flex-shrink-0 transition-colors shadow-md"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[40vh] md:max-h-[45vh] flex-grow scrollbar-thin">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed flex flex-col gap-5 pb-6"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {layout === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-6 mt-12 relative z-10">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              transition={snappyTransition}
              className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Top Card Image Cover */}
              <div className="relative h-60 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                <motion.div 
                  layoutId={`image-${card.title}-${id}`} 
                  transition={snappyTransition}
                  className="relative w-full h-full"
                >
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                {/* Category & Metadata */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
                  <motion.span 
                    layoutId={`description-${card.description}-${id}`}
                    transition={snappyTransition}
                    className="px-3 py-1 bg-[#0439B8]/10 dark:bg-[#0439B8]/20 text-[#0439B8] dark:text-[#CDDCFF] rounded-full uppercase tracking-wider"
                  >
                    {card.description}
                  </motion.span>
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{card.date}</span>
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{card.readTime}</span>
                </div>

                {/* Title */}
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  transition={snappyTransition}
                  className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-[#0439B8] dark:group-hover:text-[#CDDCFF] transition-colors line-clamp-2 leading-tight mb-3"
                >
                  {card.title}
                </motion.h3>

                {/* Descriptive Excerpt */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                  {card.excerpt}
                </p>

                {/* Card Footer Actions */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[#0439B8] dark:text-[#CDDCFF] text-sm font-bold flex items-center gap-1 group-hover:underline">
                    <span>Read Full Article</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>

                  <motion.button
                    layoutId={`button-${card.title}-${id}`}
                    transition={snappyTransition}
                    className="px-4 py-2 text-xs rounded-full font-bold bg-[#F4F8FF] hover:bg-[#0439B8] hover:text-white dark:bg-zinc-800 dark:hover:bg-[#0439B8] dark:text-[#CDDCFF] dark:hover:text-white text-[#0439B8] whitespace-nowrap transition-colors"
                  >
                    {card.ctaText}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <ul className="max-w-2xl mx-auto w-full gap-4 relative z-10 mt-8">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              transition={snappyTransition}
              className="p-4 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-row items-center">
                <motion.div 
                  layoutId={`image-${card.title}-${id}`} 
                  transition={snappyTransition}
                  className="relative h-14 w-14 flex-shrink-0"
                >
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="56px"
                    className="rounded-lg object-cover object-center"
                  />
                </motion.div>
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    transition={snappyTransition}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-left"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    transition={snappyTransition}
                    className="text-neutral-600 dark:text-neutral-400 text-left text-sm"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                transition={snappyTransition}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-[#0439B8] hover:text-white text-black whitespace-nowrap flex-shrink-0 transition-colors"
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </ul>
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white md:text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Custom Development",
    title: "The Power of Web Solutions",
    src: "/blogs/custom-code.png",
    excerpt: "Learn how bespoke Next.js development and React Server Components eliminate the bundle bloating and slow load times of standard page builder templates.",
    date: "May 19, 2026",
    readTime: "6 min read",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4 text-left">
          <p className="text-zinc-600 dark:text-zinc-300">
            In an era where digital presence forms the cornerstone of commercial success, businesses face a critical architectural choice: build upon rigid templates or invest in a bespoke custom code solution. Standard page builders (like Wix, Squarespace, or Elementor templates) are excellent for getting started, but they carry hidden debts. Over-reliance on heavy third-party plugins, redundant render-blocking scripts, and lack of layout flexibility can slowly degrade performance, lower SEO rankings, and cap your long-term scalability.
          </p>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            Why Architecture Matters: Next.js & React Server Components
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            Our team builds exclusively with modern systems like Next.js and Tailwind. By using <strong>React Server Components (RSC)</strong>, we shift the heavy lifting of UI rendering from the visitor's device to high-performance edge networks. This means your visitors receive optimized static HTML instantaneously, drastically lowering your First Contentful Paint (FCP) and Cumulative Layout Shift (CLS) times.
          </p>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            Architectural Comparison: Custom Web Solutions vs. Standard Page Builders
          </h4>
          <div className="overflow-x-auto my-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-3 font-semibold text-neutral-700 dark:text-neutral-300">Metric</th>
                  <th className="p-3 font-semibold text-neutral-700 dark:text-neutral-300">Custom Next.js App</th>
                  <th className="p-3 font-semibold text-neutral-700 dark:text-neutral-300">Page Builders (Wix/Elementor)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                <tr>
                  <td className="p-3 font-medium">Core Web Vitals (INP)</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&lt; 50ms (Excellent)</td>
                  <td className="p-3 text-amber-600 dark:text-amber-500 font-semibold">200ms+ (Often delayed)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Integration Capability</td>
                  <td className="p-3">Unlimited API & SDK hooks</td>
                  <td className="p-3">Restricted to marketplace extensions</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Site Weight / Code bloat</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Minimized & Tree-shaken</td>
                  <td className="p-3">Heavy bundle (Redundant CSS/JS)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">IP Portability</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">100% Owned Codebase</td>
                  <td className="p-3">Platform lock-in</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            The Performance & SEO Correlation
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            Google's ranking algorithms heavily weigh speed indicators (LCP, CLS, INP). By tree-shaking dead code, optimizing image formats dynamically, and decoupling the database or CMS tier from your presentation layer, your custom-designed solution functions as a highly secure, high-conversion acquisition engine. In short, bespoke development isn't just about premium aesthetics—it is a measurable strategic advantage.
          </p>
        </div>
      );
    },
  },
  {
    description: "E-commerce Strategy",
    title: "Scaling Your Brand with Shopify",
    src: "/blogs/shopify.png",
    excerpt: "Discover the exact blueprints and conversion flow optimizations required to scale standard Shopify theme designs into high-converting storefront architectures.",
    date: "May 15, 2026",
    readTime: "5 min read",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4 text-left">
          <p className="text-zinc-600 dark:text-zinc-300">
            For online merchants, scaling up operations doesn’t simply mean adding more inventory or pushing traffic. Without an optimized platform, increased traffic acts like a magnifying glass on conversion leak points. Shopify provides a reliable, secure cloud hosting base, but unlocking real e-commerce growth demands specialized customization and checkout flow logic.
          </p>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            Dynamic Customization vs. Headless E-commerce
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            Standard storefront designs can look beautiful, but they often restrict your ability to personalize the customer's journey. Depending on your catalog size and operational complexity, you might choose:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>Theme Engine Tailoring (Liquid)</strong>: Building highly optimized, lightweight, responsive custom themes using Shopify's Liquid template engine, omitting bulky drag-and-drop page editor apps.</li>
            <li><strong>Headless Storefronts (Hydrogen & Oxygen)</strong>: Completely separating your frontend (using React/Remix) from the Shopify commerce engine. This delivers unmatched page load speeds, infinite layout customization, and localized experience options.</li>
          </ul>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            High-Converting E-commerce Blueprint
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            To scale your store and maximize Average Order Value (AOV), prioritize the following check points:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>One-Click Checkout & Apple Pay Integration</strong>: Minimize friction during payment to raise checkout completion by up to 25%.</li>
            <li><strong>Edge-Cached Personalization</strong>: Implement dynamic up-sells, custom collection filters, and cross-sells calculated on edge CDNs rather than bulky client-side scripts.</li>
            <li><strong>Dynamic Image Optimization</strong>: Ensure high-fidelity product imagery is delivered in WebP or AVIF format with correct responsive sizing attributes.</li>
          </ol>

          <p className="text-zinc-600 dark:text-zinc-300">
            By shifting from generic theme templates to custom theme development or a headless approach, e-commerce brands transform standard e-shops into high-velocity sales machinery, primed for viral traffic and seamless multi-channel scale.
          </p>
        </div>
      );
    },
  },
  {
    description: "CMS Excellence",
    title: "Modern WordPress for Business",
    src: "/blogs/wordpress.png",
    excerpt: "Uncover how decoupling the content engine (Headless WordPress) or clean theme development delivers enterprise security, speed, and editor flexibility.",
    date: "May 12, 2026",
    readTime: "5 min read",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4 text-left">
          <p className="text-zinc-600 dark:text-zinc-300">
            WordPress powers over 40% of all websites globally, solidifying its place as the world’s most adopted content management system. However, standard WordPress instances are plagued by a poor reputation: slow loading times, security vulnerabilities, and bloated page builder environments. We believe WordPress, when designed and engineered with modern methodologies, becomes a secure, enterprise-grade publishing powerhouse.
          </p>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            The Decoupled CMS Concept (Headless WordPress)
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            For organizations demanding unmatched frontend speed and security, we specialize in <strong>Headless WordPress</strong>. In this architecture, WordPress remains the content management interface for editors, but the public-facing storefront or website is built using modern serverless frameworks (like Next.js).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>GraphQL & REST APIs</strong>: Data flows securely via fast API endpoints to your lightning-fast React frontend, removing database bottlenecks.</li>
            <li><strong>Enhanced Security</strong>: Since the public cannot hit your WordPress dashboard or PHP back-end, SQL injections, brute-force exploits, and plugin exploits are effectively eliminated.</li>
          </ul>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            Performance Tuning Checklist for Traditional WordPress
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            If a traditional WordPress setup is chosen, we implement a robust optimization process:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>No Page Builders</strong>: We code themes from scratch or design custom Gutenberg Blocks directly to avoid block libraries that add massive runtime styles.</li>
            <li><strong>Database Cleanup & Indexing</strong>: Regular purging of transient options, revision cleanups, and key metadata index optimization to expedite SQL query response times.</li>
            <li><strong>Edge-level Page Caching</strong>: Distributing pages at the DNS/CDN level (e.g. Cloudflare Enterprise edge) so your site loads instantly for global visitors.</li>
          </ul>

          <p className="text-zinc-600 dark:text-zinc-300">
            Through clean custom architectures and advanced performance tooling, you can leverage the ease of content editing in WordPress while enjoying the responsiveness and security of a modern enterprise application.
          </p>
        </div>
      );
    },
  },
  {
    description: "Search Optimization",
    title: "Dominating Search in 2026",
    src: "/blogs/seo-marketing.png",
    excerpt: "A definitive breakdown of Core Web Vitals, semantic writing strategies, and search optimizations designed to drive organic authority in 2026.",
    date: "May 08, 2026",
    readTime: "7 min read",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4 text-left">
          <p className="text-zinc-600 dark:text-zinc-300">
            The search landscape is undergoing a massive evolutionary shift. With Google's continuous core updates, AI Overviews, and conversational engines like ChatGPT, SEO is no longer just about optimizing keywords or writing thin content. Dominating search requires technical excellence, strong brand authority, and a deep understanding of user search intent.
          </p>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            The Core Web Vitals Blueprint
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            Google directly tracks site quality through user experience signals. If your website is slow to load or jumps around as images render, search rankings will suffer:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>LCP (Largest Contentful Paint)</strong>: Speed of rendering the main visible content block. Should be under 2.5 seconds.</li>
            <li><strong>INP (Interaction to Next Paint)</strong>: The latency of all interactions on the page. Under 200ms is standard for great UX.</li>
            <li><strong>CLS (Cumulative Layout Shift)</strong>: Measure of visual stability. Should be less than 0.1 to avoid annoying page shifting.</li>
          </ul>

          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
            Our 4-Pillar Search Supremacy Strategy
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300">
            We integrate a multi-disciplinary SEO process:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><strong>Technical Foundation</strong>: Structured schemas, pristine robot.txt paths, dynamic sitemaps, and strict crawl-budget optimizations.</li>
            <li><strong>Entity-Based Semantic Writing</strong>: Crafting deep, authoritative resource hubs that answer secondary user search paths comprehensively.</li>
            <li><strong>Acquisition Channel Compounding</strong>: Pairing organic search dominance with strategic Google Search and Meta Ads to increase overall brand touchpoints and maximize conversions.</li>
            <li><strong>Generative Engine Optimization (GEO)</strong>: Optimizing code structure and textual semantics so your company is continuously cited inside AI search platforms.</li>
          </ol>

          <p className="text-zinc-600 dark:text-zinc-300">
            True search engine dominance is the ultimate defensive moat for modern brands. By combining ultra-fast technical performance with exceptional informational content, we help your business capture high-intent customers at the lowest acquisition cost.
          </p>
        </div>
      );
    },
  },
];
