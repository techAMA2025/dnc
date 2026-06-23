import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C15 8.28427 21.7157 15 30 15C21.7157 15 15 21.7157 15 30C15 21.7157 8.28427 15 0 15C8.28427 15 15 8.28427 15 0Z" fill="#50C878"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#EAF4F1] w-full pt-16 pb-8 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col flex-1 max-w-[850px]">
            {/* Top decorative line */}
            <div className="flex items-center w-full max-w-[500px] mb-8">
              <div className="h-[6px] w-14 bg-[#50C878]" />
              <div className="h-[1px] flex-1 bg-black/10" />
            </div>

            <p className="text-[22px] md:text-[28px] text-black/55 font-semibold leading-tight mb-6">
              Designs that inspire, websites<br className="hidden md:block" /> that perform.
            </p>
            
            <div className="flex flex-col mb-10">
              <h1 className="text-[56px] md:text-[80px] lg:text-[104px] font-black leading-none tracking-tight">
                <span className="text-[#50C878]">Design</span>
                <span className="text-black">Ncode</span>
              </h1>
            </div>

            <div className="flex items-center gap-6 mb-20 flex-wrap sm:flex-nowrap">
              <div className="bg-black rounded-[300px] h-[75px] w-[160px] flex items-center justify-center shrink-0 overflow-hidden relative">
                <video 
                  src="/builder.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <p className="text-[14px] md:text-[18px] text-black leading-snug max-w-[400px]">
                A creative agency specializing in UI/UX design, web development, branding, and digital growth for modern businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <SparkleIcon />
                  <span className="text-[16px] md:text-[19px] text-black uppercase tracking-wide font-medium">MAIL US AT</span>
                </div>
                <a href="mailto:hello@designncode.com" className="text-[18px] md:text-[22px] text-black hover:text-[#50C878] transition-colors">
                  hello@designncode.com
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <SparkleIcon />
                  <span className="text-[16px] md:text-[19px] text-black uppercase tracking-wide font-medium">CONTACT US AT</span>
                </div>
                <a href="tel:+919220721921" className="text-[18px] md:text-[22px] text-black hover:text-[#50C878] transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col lg:w-[450px] shrink-0 pt-4">
            <div className="flex flex-row justify-between gap-8 mb-20">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <SparkleIcon />
                  <span className="text-[16px] md:text-[19px] text-black uppercase tracking-wide font-medium">NAVIGATE</span>
                </div>
                {['Home', 'Services', 'Projects', 'About Us', 'Contact'].map((link) => (
                  <Link key={link} href="#" className="text-[18px] md:text-[21px] text-black hover:text-[#50C878] transition-colors">
                    {link}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <SparkleIcon />
                  <span className="text-[16px] md:text-[19px] text-black uppercase tracking-wide font-medium">LINKS</span>
                </div>
                {['Terms & Conditions', 'Privacy Policy', 'Careers', 'Start a Project'].map((link) => (
                  <Link key={link} href="#" className="text-[18px] md:text-[21px] text-black hover:text-[#50C878] transition-colors">
                    {link}
                  </Link>
                ))}
              </div>

            </div>

            <div className="flex flex-col gap-10 mt-auto">
              <div className="flex items-center gap-3 mb-6">
                <SparkleIcon />
                <span className="text-[19px] md:text-[26px] text-black tracking-wide">Let's Build Something Amazing</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
                <span className="text-[19px] md:text-[24px] text-black">Follow us on socials</span>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-[#50C878] hover:scale-110 transition-transform">
                    <FaXTwitter size={28} />
                  </a>
                  <a href="#" className="text-[#50C878] hover:scale-110 transition-transform">
                    <FaInstagram size={32} />
                  </a>
                  <a href="#" className="text-[#50C878] hover:scale-110 transition-transform">
                    <FaLinkedinIn size={32} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="w-full mt-24 text-center">
          <p className="text-[14px] md:text-[18px] text-black/55">
            © 2026 DesignNCode — Crafted with creativity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
