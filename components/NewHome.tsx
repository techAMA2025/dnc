'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Alex_Brush, Onest } from 'next/font/google';
import { useState } from 'react';

const alexBrush = Alex_Brush({ weight: '400', subsets: ['latin'], display: 'swap' });
const onest = Onest({ subsets: ['latin'], display: 'swap' });

export default function NewHome() {
  const [activeService, setActiveService] = useState(0);

  const servicesData = [
    {
      id: "01",
      title: "UI/UX Systems",
      cardTitle: "UI/UX Design",
      desc: "We create intuitive user experiences and modern interfaces that make every interaction seamless. From research to final design, we craft digital products that are easy to use, engaging, and built to convert.",
      points: "• User Research • Wireframing • UI Design • UX Strategy • Prototyping",
      time: "1 - 3 weeks"
    },
    {
      id: "02",
      title: "Content & Growth Strategy",
      cardTitle: "Content Strategy",
      desc: "We build data-driven content strategies that amplify your brand's reach and engage your target audience effectively.",
      points: "• SEO Optimization • Content Planning • Growth Hacking • Analytics",
      time: "2 - 4 weeks"
    },
    {
      id: "03",
      title: "Web App Development",
      cardTitle: "Web Applications",
      desc: "We develop scalable, high-performance web applications using modern frameworks like React and Next.js, tailored to your business needs.",
      points: "• Frontend Dev • Backend Architecture • API Integration • Database Design",
      time: "6 - 12 weeks"
    },
    {
      id: "04",
      title: "Shopify Development",
      cardTitle: "Shopify E-Commerce",
      desc: "Custom Shopify storefronts optimized for conversions, speed, and seamless shopping experiences.",
      points: "• Custom Themes • App Integration • Checkout Optimization • Migration",
      time: "4 - 8 weeks"
    },
    {
      id: "05",
      title: "Wordpress Development",
      cardTitle: "WordPress Solutions",
      desc: "Robust and secure WordPress websites designed for easy content management and maximum performance.",
      points: "• Custom Themes • Plugin Development • Speed Optimization • Security",
      time: "3 - 6 weeks"
    },
    {
      id: "06",
      title: "App Development",
      cardTitle: "Mobile Applications",
      desc: "Cross-platform mobile apps built with React Native, delivering native-like experiences on both iOS and Android.",
      points: "• iOS App • Android App • App Store Optimization • UI/UX Design",
      time: "8 - 16 weeks"
    }
  ];

  const featuredProjects = [
    {
      title: "AMA LEGAL SOLUTIONS",
      desc: "Empowering Legal Expertise with Trusted Law Firm In India",
      image: "/project/1.svg",
      tags: ["Custom Code", "UI/UX Design"]
    },
    {
      title: "DELHI HOUSE",
      desc: "Modernizing the digital presence of a classic culinary experience.",
      image: "/project/2.svg",
      tags: ["Web Design", "Development"]
    },
    {
      title: "FAT COOKIE",
      desc: "A delightful e-commerce experience for sweet treats.",
      image: "/project/3.svg",
      tags: ["Shopify", "UI/UX Design"]
    },
    {
      title: "FOIRE",
      desc: "Elevating brand identity and user engagement.",
      image: "/project/4.svg",
      tags: ["Branding", "Web App"]
    },
    {
      title: "HOUSE OF NIHALKHERA",
      desc: "A seamless shopping platform for luxury apparel.",
      image: "/project/5.svg",
      tags: ["E-Commerce", "Custom Code"]
    },
    {
      title: "KAMAL MOTORS",
      desc: "Digital transformation for the automotive industry.",
      image: "/project/6.svg",
      tags: ["Web Design", "Strategy"]
    },
    {
      title: "SEXSEA",
      desc: "Bold branding and an immersive digital experience.",
      image: "/project/7.svg",
      tags: ["UI/UX Design", "Frontend"]
    },
    {
      title: "BLOOM",
      desc: "Cultivating growth through intuitive web platforms.",
      image: "/project/8.svg",
      tags: ["Web App", "UI/UX Design"]
    },
    {
      title: "KICHUN",
      desc: "Modern aesthetics meeting robust functional development.",
      image: "/project/9.svg",
      tags: ["Custom Code", "Shopify"]
    },
    {
      title: "BUNT",
      desc: "Streamlining digital interactions for modern brands.",
      image: "/project/10.svg",
      tags: ["Web App", "Frontend"]
    },
    {
      title: "PROJECT ELEVEN",
      desc: "Innovative digital solutions designed for conversion.",
      image: "/project/11.svg",
      tags: ["Strategy", "UI/UX Design"]
    },
    {
      title: "PROJECT TWELVE",
      desc: "Next-generation web applications for enterprises.",
      image: "/project/12.svg",
      tags: ["Development", "Web App"]
    },
    {
      title: "PROJECT THIRTEEN",
      desc: "Building a foundation for digital success.",
      image: "/project/13.svg",
      tags: ["Custom Code", "E-Commerce"]
    },
    {
      title: "PROJECT FOURTEEN",
      desc: "Where design meets seamless functionality.",
      image: "/project/14.svg",
      tags: ["Frontend", "UI/UX Design"]
    },
    {
      title: "PROJECT FIFTEEN",
      desc: "Transforming ideas into interactive experiences.",
      image: "/project/15.svg",
      tags: ["Web App", "Strategy"]
    },
    {
      title: "PROJECT SIXTEEN",
      desc: "Optimized web platforms tailored for growth.",
      image: "/project/16.svg",
      tags: ["Shopify", "Custom Code"]
    },
    {
      title: "PROJECT SEVENTEEN",
      desc: "Driving results with user-centric design.",
      image: "/project/17.svg",
      tags: ["UI/UX Design", "Frontend"]
    },
    {
      title: "PROJECT EIGHTEEN",
      desc: "Creating digital footprints that leave a mark.",
      image: "/project/18.svg",
      tags: ["Development", "Branding"]
    },
    {
      title: "HONK",
      desc: "A bold new take on modern digital platforms.",
      image: "/project/HONK.svg",
      tags: ["Custom Code", "UI/UX Design"]
    },
    {
      title: "OUD",
      desc: "Luxury digital experiences for premium brands.",
      image: "/project/Oud.svg",
      tags: ["E-Commerce", "Strategy"]
    }
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a] text-white overflow-x-clip">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {/* We use a placeholder image/gradient if video isn't available, but we can add video tag */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
          >
            <source src="/hero-vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)]"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-[4.63%] pt-20">
          <div className="flex flex-col gap-[30px] md:gap-[50px] items-start w-full">
            <div className={`flex flex-col font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dadada] ${onest.className}`}>
              <div className="flex items-center flex-wrap gap-x-4">
                <span className="text-6xl md:text-[144px] leading-[1.1] md:leading-[144px]">Design</span>
                <span className={`text-7xl md:text-[160px] leading-[1.1] md:leading-[144px] font-normal ${alexBrush.className}`}>&</span>
              </div>
              <div className="text-6xl md:text-[144px] leading-[1.1] md:leading-[144px] mt-2 md:mt-0">
                Digital Growth
              </div>
            </div>

            <div className="flex items-start gap-4 md:gap-[32px] mt-4 md:mt-8 max-w-[860px]">
              <img src="/hero/star.svg" alt="star" className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] shrink-0 md:mt-2" />
              <p className={`text-xl md:text-[28px] leading-snug md:leading-[32px] text-white font-medium ${onest.className}`}>
                We build brands, websites, and digital experiences that stand out and drive growth.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-12 md:bottom-[10%] left-6 md:left-[4.63%]"
          >
            <button className="flex items-center gap-[18px] bg-white rounded-[500px] p-[4px] pr-6 hover:scale-105 transition-transform group">
              <p className={`text-black text-lg md:text-[19px] font-normal pl-4 md:pl-6 whitespace-nowrap ${onest.className}`}>
                let’s work together
              </p>
              <img src="/hero/arrow-right.svg" alt="arrow" className="w-[40px] h-[40px] md:w-[54px] md:h-[54px] group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Inside DesignNcode Section */}
      <section className="relative w-full py-24 md:py-40 px-6 bg-[#f5f5f5] text-black">
        {/* Background Green Glow from Figma */}
        <div className="absolute top-[-350px] right-[-10%] md:right-0 h-[900px] w-[821px] pointer-events-none z-0 opacity-80">
          <div className="absolute inset-[26.04%_34.24%_15.63%_0]">
            <div className="absolute inset-[-20.15%_-19.58%]">
              <img alt="" className="block max-w-none size-full" src="/hero-green-shade.svg" />
            </div>
          </div>
          <div className="absolute inset-[33.85%_17.12%_7.81%_17.12%]">
            <div className="absolute inset-[-20.15%_-19.58%]">
              <img alt="" className="block max-w-none size-full" src="/hero-green-shade.svg" />
            </div>
          </div>
          <div className="absolute inset-[41.67%_0_0_34.24%]">
            <div className="absolute inset-[-20.15%_-19.58%]">
              <img alt="" className="block max-w-none size-full" src="/hero-green-shade.svg" />
            </div>
          </div>
          <div className="absolute inset-[0_34.24%_41.67%_0]">
            <div className="absolute inset-[-20.15%_-19.58%]">
              <img alt="" className="block max-w-none size-full" src="/hero-green-shade.svg" />
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-10">
            <img src="/hero/star-black.svg" alt="star" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            <span className={`text-xl md:text-[24px] font-normal tracking-wide ${onest.className}`}>Inside DesignNcode</span>
          </div>
          
          <h2 className={`text-5xl md:text-[76px] leading-[1.1] md:leading-[80px] font-semibold text-center max-w-5xl mb-20 ${onest.className}`}>
            Driven by <span className={`font-normal text-6xl md:text-[85px] ${alexBrush.className}`}>innovation</span>, powered by code. We build websites, web apps, and digital experiences that help businesses <span className={`font-normal text-6xl md:text-[85px] ${alexBrush.className}`}>grow</span> online.
          </h2>

          <div className="relative w-full max-w-[945px] mx-auto mb-8 mt-8">
            {/* The Image Container */}
            <div className="relative w-full p-4 md:p-[12px] bg-[#f5f5f5] rounded-[26px] border-[3px] border-white shadow-[inset_0px_4px_20.6px_0px_rgba(255,255,255,0.66)] flex flex-col items-center">
              <div className="relative w-full aspect-video md:h-[580px] bg-zinc-200 rounded-[16px] overflow-hidden mb-5 md:mb-6">
                <img src="/hero/laptop-work.png" alt="Workspace" className="w-full h-full object-cover" />
              </div>

              {/* let's work together button inside the container, below the image */}
              <div className="bg-[rgba(64,224,208,0.15)] rounded-[500px] p-[4px] pr-5 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform group mb-2">
                <p className={`text-black text-lg md:text-[19px] font-normal pl-4 md:pl-5 whitespace-nowrap ${onest.className}`}>
                  let’s work together
                </p>
                <img src="/hero/arrow-right.svg" alt="arrow" className="w-[40px] h-[40px] md:w-[54px] md:h-[54px] group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>

          <div className={`text-center max-w-3xl mt-12 md:mt-20 text-2xl md:text-[28px] leading-snug md:leading-[36px] text-black/60 ${onest.className}`}>
            We're more than developers. We're <span className="font-semibold text-black">digital builders</span>, problem-solvers, and growth partners. Combining <span className="font-semibold text-black">strategy</span>, design, and technology, we create websites and applications that drive <span className="font-semibold text-black">real results.</span>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative w-full bg-[#0a0a0a] text-white overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0">
          <img src="/hero/bg-texture.png" alt="Background Texture" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-[1728px] mx-auto px-6 md:px-[64px] py-12 md:py-[64px]">
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row mb-12 md:mb-[120px]">
            <div className="w-full lg:w-[498px] shrink-0 mb-8 lg:mb-0">
              <div className="flex items-center gap-[12px]">
                <img src="/hero/star-green.svg" alt="star" className="w-[24px] h-[24px]" />
                <span className={`text-[24px] font-normal leading-[24px] tracking-wide text-white ${onest.className}`}>What we do</span>
              </div>
            </div>
            <div className="flex-1 flex lg:justify-end">
              <h2 className={`text-6xl lg:text-[80px] xl:text-[96px] leading-[1.1] xl:leading-[104px] font-normal text-left lg:text-right text-white whitespace-nowrap ${onest.className}`}>
                Experiences that <br />
                <span className={`text-7xl lg:text-[88px] xl:text-[104px] ${alexBrush.className}`}>Inspire</span> Growth
              </h2>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col lg:flex-row items-start justify-between">
            {/* Services List */}
            <div className={`w-full lg:w-[516px] shrink-0 flex flex-col gap-[31px] ${onest.className}`}>
              {servicesData.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div key={index} onClick={() => setActiveService(index)} className="flex flex-col gap-[14px] cursor-pointer group w-fit">
                    <p className={`text-2xl md:text-[28px] leading-[28px] font-medium transition-colors ${isActive ? "text-[#00ffe5] drop-shadow-[0_1px_4.3px_#50c878]" : "text-white/55 group-hover:text-white/80"}`}>
                      <span className="font-normal mr-2">({service.id})</span>
                      {service.title}
                    </p>
                    <div className="w-full">
                      <div className={`h-[1px] ${isActive ? "bg-[#00ffe5] h-[2px]" : "bg-white/55 group-hover:bg-white/80"} transition-colors w-full`}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Card Preview */}
            <div className={`w-full lg:w-[738px] bg-black rounded-[16px] p-[8px] mt-12 lg:mt-0 flex flex-col lg:flex-row shadow-2xl relative shrink-0 ${onest.className}`}>
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-between p-[24px] md:p-[32px] md:pr-[16px] md:pl-[24px]">
                <div className="flex flex-col gap-[20px]">
                  <h4 className="text-[26px] md:text-[36px] leading-[36px] font-normal text-white">{servicesData[activeService].cardTitle}</h4>
                  <p className="text-xl md:text-[20px] text-white/55 font-light leading-[24px]">
                    {servicesData[activeService].desc}
                  </p>
                  <p className="text-lg md:text-[19px] text-white font-normal leading-[22px] mt-3">
                    {servicesData[activeService].points}
                  </p>
                </div>
                
                <div className="flex items-end gap-[16px] mt-10 lg:mt-0">
                  <div className="w-[24px] h-[24px] shrink-0 relative">
                    <img src="/hero/clock.svg" alt="clock" className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                  <p className="text-white/55 font-normal whitespace-nowrap leading-[19px]">
                    <span className="text-[19px]">{servicesData[activeService].time} </span>
                    <span className="text-[16px]">(Approximately)</span>
                  </p>
                </div>
              </div>

              {/* White image placeholder box */}
              <div className="w-full lg:w-[312px] h-[240px] lg:h-[396px] bg-white rounded-[8px] shrink-0 overflow-hidden">
                 {/* Video/Image goes here. Can add a placeholder image or leave white as in figma */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative w-full bg-white text-black overflow-hidden">
        <div className="relative z-10 w-full max-w-[1728px] mx-auto px-6 md:px-[80px] py-12 md:py-[80px]">
          <div className="flex items-center gap-[15px] mb-12">
            <img src="/hero/star-black.svg" alt="star" className="w-[30px] h-[30px]" />
            <span className={`text-[30px] font-normal tracking-wide text-black ${onest.className}`}>Featured Projects</span>
          </div>

          <div className="flex flex-col gap-[9px] mb-20 lg:mb-32">
            <h2 className={`text-[48px] md:text-[96px] leading-[1.1] md:leading-[104px] font-semibold text-black ${onest.className}`}>
              Projects <span className={`text-[58px] md:text-[104px] text-black/55 font-normal ${alexBrush.className}`}>&</span><br className="hidden md:block"/>
              Execution
            </h2>
            <p className={`text-2xl md:text-[35px] leading-snug md:leading-[40px] text-black/55 max-w-[1327px] ${onest.className}`}>
              From web apps to <span className="font-semibold text-black">high-performing</span> websites, every project is built with strategy, precision, and a <span className="font-semibold text-black">focus on results.</span>
            </p>
          </div>

          {/* Projects Carousel */}
          <div className="w-full relative bg-zinc-900 rounded-[30px] overflow-hidden mt-12 group shadow-2xl h-[700px] md:h-[866px]">
            {/* Background Blurry Image (Image Colors) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 z-0 overflow-hidden"
              >
                 <img src={featuredProjects[currentProjectIndex].image} alt="Project Background" className="w-full h-full object-cover blur-[40px] scale-110 opacity-70" />
                 {/* Light overlay for contrast without turning it black */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>

            {/* Foreground Project Image (Exact Fit) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex + "-img"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 z-10 p-0 md:p-[20px] pointer-events-none flex items-center justify-center"
              >
                 <img src={featuredProjects[currentProjectIndex].image} alt="Project Mockup" className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-2xl" />
              </motion.div>
            </AnimatePresence>

            {/* Foreground Content */}
            <div className="relative z-20 w-full h-full flex flex-col p-6 md:px-[60px] md:py-[50px] justify-between text-white pointer-events-none">
              
              {/* Top Section */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentProjectIndex + "-title"}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  <h3 className={`text-4xl md:text-[54px] font-bold text-white tracking-tight ${onest.className} leading-none drop-shadow-md`}>
                    {featuredProjects[currentProjectIndex].title}
                  </h3>
                  <p className="mt-4 text-white/80 text-lg md:text-xl max-w-lg font-medium drop-shadow-sm">
                    {featuredProjects[currentProjectIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Section (Tags + Button + Pagination) */}
              <div className="flex flex-col justify-end h-full">
                {/* Tags & Button */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentProjectIndex + "-tags"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-6 relative z-20 md:w-[350px] pointer-events-auto mb-10 md:mb-16"
                  >
                    <div className="flex flex-wrap gap-3">
                      {featuredProjects[currentProjectIndex].tags.map((tag, i) => (
                        <span key={i} className={`px-5 py-2 rounded-full border border-white/60 bg-black/10 backdrop-blur-md text-white font-medium text-[15px] ${onest.className}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="bg-white rounded-full p-[6px] pr-[6px] flex items-center justify-between gap-4 cursor-pointer hover:scale-105 transition-transform w-fit shadow-xl group/btn">
                      <p className={`text-black text-[18px] md:text-[20px] font-medium pl-5 md:pl-6 whitespace-nowrap ${onest.className}`}>
                        let’s work together
                      </p>
                      <div className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] bg-black rounded-full flex items-center justify-center group-hover/btn:-rotate-45 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Pagination / Nav */}
                <div className="flex items-center w-full z-20 pointer-events-auto mb-2 md:mb-4">
                  <svg onClick={prevProject} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity relative z-10"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  <div className="h-[2px] flex-grow bg-white opacity-80 -ml-[12px] relative z-0"></div>
                  <span className={`text-[24px] md:text-[30px] font-medium tracking-wide px-6 whitespace-nowrap ${onest.className}`}>
                    {String(currentProjectIndex + 1).padStart(2, '0')}/n
                  </span>
                  <div className="h-[2px] flex-grow bg-white opacity-80 -mr-[12px] relative z-0"></div>
                  <svg onClick={nextProject} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity relative z-10"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Vision to Impact / Process */}
      <section className="relative w-full py-24 px-6 md:px-[64px] bg-[#f5f5f5] text-black">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-5">
            <img src="/star-4-point.svg" alt="star" className="w-[30px] h-[30px]" />
            <span className={`text-[30px] font-normal ${onest.className}`}>From vision to impact</span>
          </div>

          <h2 className={`text-[36px] md:text-[45px] font-semibold text-center mb-16 leading-[1.2] md:leading-[55px] max-w-4xl ${onest.className}`}>
            Turning bold ideas into unforgettable digital experiences
          </h2>

          <div className="grid lg:grid-cols-3 gap-[20px] w-full max-w-[1567px]">
            {/* Step 1 */}
            <div className="flex flex-col bg-white p-[30px] rounded-[15px] shadow-sm items-center text-center lg:h-[519px] relative overflow-hidden">
              <div className="flex items-center justify-between w-full mb-10">
                <h3 className={`text-[28px] md:text-[35px] font-semibold leading-[35px] ${onest.className}`}>Discover & Define</h3>
                <div className="flex gap-[4px]">
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] opacity-20" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] opacity-20" />
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full mb-10 relative">
                 <img src="/process-compass.svg" alt="Discover" className="w-auto h-[180px] md:h-[240px] object-contain" />
              </div>

              <p className={`text-[20px] md:text-[24px] text-black leading-[1.4] md:leading-[30px] ${onest.className} w-full max-w-[436px]`}>
                We dive deep into your goals, audience, and brand to uncover insights and define a clear direction.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col bg-white p-[30px] rounded-[15px] shadow-sm items-center text-center lg:h-[519px] relative overflow-hidden">
              <div className="flex items-center justify-between w-full mb-10">
                <h3 className={`text-[28px] md:text-[35px] font-semibold leading-[35px] ${onest.className}`}>Design & Build</h3>
                <div className="flex gap-[4px]">
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] opacity-20" />
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full mb-10 relative">
                 <img src="/process-monitor.svg" alt="Design & Build" className="w-auto h-[150px] md:h-[200px] object-contain" />
              </div>

              <p className={`text-[20px] md:text-[24px] text-black leading-[1.4] md:leading-[30px] ${onest.className} w-full max-w-[436px]`}>
                With strategy in place, we craft stunning visuals and high-performing digital solutions tailored to your needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col bg-white p-[30px] rounded-[15px] shadow-sm items-center text-center lg:h-[519px] relative overflow-hidden">
              <div className="flex items-center justify-between w-full mb-10">
                <h3 className={`text-[28px] md:text-[35px] font-semibold leading-[35px] ${onest.className}`}>Launch & Grow</h3>
                <div className="flex gap-[4px]">
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  <img src="/star-4-point.svg" alt="star" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full mb-10 relative">
                 <img src="/process-rocket.svg" alt="Launch & Grow" className="w-auto h-[180px] md:h-[240px] object-contain" />
              </div>

              <p className={`text-[20px] md:text-[24px] text-black leading-[1.4] md:leading-[30px] ${onest.className} w-full max-w-[436px]`}>
                We bring your vision to life, optimize for performance, and support your ongoing success post-launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Graphic above footer */}
      <div className="w-full leading-none flex">
        <img src="/scale.svg" alt="Scale graphic" className="w-full h-auto block" />
      </div>

    </main>
  );
}
