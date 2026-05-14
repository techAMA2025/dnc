"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo() {
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
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
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
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative h-80 lg:h-80 w-full">
                <Image
                  src={active.src}
                  alt={active.title}
                  fill
                  className="sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-[#0439B8] text-white whitespace-nowrap flex-shrink-0"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-row items-center">
              <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-14 w-14">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-[#0439B8] hover:text-white text-black whitespace-nowrap flex-shrink-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
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
      className="h-4 w-4 text-black"
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
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          In a world of cookie-cutter templates, custom web development stands out by providing
          tailored solutions that align perfectly with your business goals. Bespoke code ensures
          maximum performance, superior security, and a unique user experience that templates
          simply cannot match. <br /> <br />
          Our approach focuses on clean, scalable architecture using modern frameworks like
          Next.js and React. This not only improves search engine rankings through better
          Core Web Vitals but also provides the flexibility to grow your platform as your
          business evolves.
        </p>
      );
    },
  },
  {
    description: "E-commerce Strategy",
    title: "Scaling Your Brand with Shopify",
    src: "/blogs/shopify.png",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Shopify has evolved into a powerhouse for e-commerce brands of all sizes. From
          startup boutiques to enterprise-level stores, the platform offers a robust
          ecosystem for scaling sales and managing operations seamlessly. <br /> <br />
          We specialize in custom Shopify Liquid development and app integrations that
          transform standard stores into high-converting digital storefronts. By optimizing
          checkout flows, enhancing mobile responsiveness, and implementing advanced
          tracking, we help brands unlock their full potential in the global marketplace.
        </p>
      );
    },
  },
  {
    description: "CMS Excellence",
    title: "Modern WordPress for Business",
    src: "/blogs/wordpress.png",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          WordPress powers over 40% of the web, and for good reason. However, modern
          business needs go beyond basic blogging. We leverage WordPress as a high-performance
          content management system, often utilizing headless architectures for maximum speed. <br /> <br />
          Our WordPress solutions focus on security, speed, and ease of use for content
          editors. Whether it's a complex multi-site setup or a high-traffic news portal,
          we ensure your WordPress site is robust, fast, and optimized for the modern web
          standards.
        </p>
      );
    },
  },
  {
    description: "Search Optimization",
    title: "Dominating Search in 2024",
    src: "/blogs/seo-marketing.png",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          SEO is no longer just about keywords; it's about authority, relevance, and
          technical excellence. As search engines become more sophisticated, your
          digital strategy must adapt to stay ahead of the curve. <br /> <br />
          We combine technical SEO with data-driven digital marketing to drive
          meaningful traffic to your site. From performance optimization and
          structured data to comprehensive content strategies and PPC management,
          we provide the insights and execution needed to dominate your industry
          online.
        </p>
      );
    },
  },
];
