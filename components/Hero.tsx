"use client";

import { useEffect, useState } from "react";
import MovingCalculator from "./QuoteForm";


const HeroSection = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section className="relative pb-36 w-full min-h-screen h-auto lg:h-screen overflow-hidden">
      {/* Background with blue overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url(/image/SMBH.jpg)" }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-80 mix-blend-multiply"></div>
        {/* Subtle animated elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-5 sm:left-10 md:left-20 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-32 right-5 sm:right-10 md:right-20 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-16 left-10 sm:left-20 md:left-40 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-300 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Top Center Company Text */}
      <div className="relative z-10 w-full flex justify-center pt-8 sm:pt-10 lg:pt-12 px-3 sm:px-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 bg-opacity-90 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl shadow-2xl border border-blue-400 border-opacity-30 backdrop-blur-sm max-w-[95%] sm:max-w-[90%] md:max-w-max">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white tracking-wide text-center leading-tight sm:leading-normal">
            JAC RENO LTD • Provential Moving • Long Distance Moving • Canada • Saskatchewan
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center h-full min-h-[calc(100vh-120px)] lg:min-h-0 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-0">
        {/* Text Content */}
        <div className="text-white text-center lg:text-left w-full lg:max-w-2xl xl:max-w-3xl lg:mt-20 xl:mt-32 2xl:mt-40">
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div className="inline-block bg-blue-700 bg-opacity-60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg mb-4 sm:mb-5 md:mb-6">
              <span className="text-blue-200 text-xs sm:text-sm font-semibold tracking-wide">LOGISTICS EXCELLENCE</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-snug sm:leading-tight md:leading-tight lg:leading-tight">
            Where <span className="text-blue-300">Efficiency</span> Meets <span className="text-white">Excellence</span>
          </h1>
          
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-full sm:max-w-md md:max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Your Gateway to Seamless Logistics and Supply Chain Solutions
          </p>
          
          <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm sm:text-base">
              Get Free Quotes
            </button>
            <button className="bg-transparent border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base">
              Learn More
            </button>
          </div>
          
          {/* Stats Section */}
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-full sm:max-w-md md:max-w-xl">
            <div className="text-center p-3 sm:p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300">15+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Years Experience</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300">500+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Happy Clients</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300">24/7</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Support</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300">100%</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Reliability</div>
            </div>
          </div>
        </div>
        
        {/* Calculator */}
       <div className={`mt-8 sm:mt-10 md:mt-12 lg:mt-0 transform transition-all duration-500 w-full max-w-md mx-auto lg:mx-0 lg:w-auto ${
          isScrolling ? "scale-90 lg:scale-75 opacity-90" : "scale-100 opacity-100"
        } lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-4 xl:right-8 2xl:right-16`}>
          <div className="scale-90 sm:scale-95 md:scale-100 lg:scale-100">
            <MovingCalculator />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center">
          <span className="text-blue-200 text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-blue-400 rounded-full mt-1 sm:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Mobile spacing at bottom */}
      <div className="block lg:hidden h-8 sm:h-12"></div>
    </section>
  );
};

export default HeroSection;