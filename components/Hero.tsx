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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background with blue overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url(/image/SMBH.jpg)" }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-80 mix-blend-multiply"></div>
        {/* Subtle animated elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center h-full px-4 md:px-8 lg:px-16">
        {/* Text Content */}
        <div className="text-white text-center lg:text-left max-w-2xl lg:mt-40">
  <div className="mb-6">
    <div className="inline-block bg-blue-700 bg-opacity-60 px-4 py-2 rounded-lg mb-6">
      <span className="text-blue-200 text-sm font-semibold tracking-wide">LOGISTICS EXCELLENCE</span>
    </div>
  </div>
  
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
    Where <span className="text-blue-300">Efficiency</span> Meets <span className="text-white">Excellence</span>
  </h1>
  
  <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-lg mx-auto lg:mx-0">
    Your Gateway to Seamless Logistics and Supply Chain Solutions
  </p>
  
  {/* Added company text */}
  <div className="mt-4">
    <p className="text-blue-200 font-medium text-md">
      Jack Reno Ltd • Interstate Moving • Long Distance Moving • Canada • Saskatchewan
    </p>
  </div>
  
  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
      Get Free Quotes
    </button>
    <button className="bg-transparent border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
      Learn More
    </button>
  </div>
  
  {/* Stats Section */}
  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
    <div className="text-center p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
      <div className="text-2xl font-bold text-blue-300">15+</div>
      <div className="text-sm text-blue-100">Years Experience</div>
    </div>
    <div className="text-center p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
      <div className="text-2xl font-bold text-blue-300">500+</div>
      <div className="text-sm text-blue-100">Happy Clients</div>
    </div>
    <div className="text-center p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
      <div className="text-2xl font-bold text-blue-300">24/7</div>
      <div className="text-sm text-blue-100">Support</div>
    </div>
    <div className="text-center p-4 bg-blue-900 bg-opacity-40 rounded-lg backdrop-blur-sm">
      <div className="text-2xl font-bold text-blue-300">100%</div>
      <div className="text-sm text-blue-100">Reliability</div>
    </div>
  </div>
</div>
        
        {/* Calculator */}
        <div className={`mt-10 lg:mt-0 transform transition-all duration-500 ${isScrolling ? "scale-75 lg:scale-50 opacity-90" : "scale-100 opacity-100"} lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-8 xl:right-16`}>
          <MovingCalculator />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-blue-200 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;