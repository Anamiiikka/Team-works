'use client';
import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar"; 

export default function Index() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 800px 600px at center, #C5EAFF 0%, rgba(197, 234, 255, 0.4) 50%, transparent 70%),
            radial-gradient(ellipse at top left, #EFF1F5A8 0%, transparent 50%),
            radial-gradient(ellipse at top right, #EFF1F5A8 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, #EFF1F5A8 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, #EFF1F5A8 0%, transparent 50%)
          `
        }}
      />

      {/* The main container for the entire page */}
      <div className="relative z-10">
        
        <Navbar />

        {/* Main content layout - NOW FULLY RESPONSIVE */}
        <main className="relative z-10 grid grid-cols-[25%_auto_25%] sm:grid-cols-[20%_auto_20%] md:grid-cols-[22%_auto_22%] lg:grid-cols-[280px_minmax(auto,744px)_280px] gap-x-2 sm:gap-x-3 lg:gap-x-4 xl:gap-x-8 px-2 sm:px-4 lg:px-8 max-w-[1400px] mx-auto">
          
          {/* Left Decorative Column - NOW RESPONSIVE */}
          <div className="h-full relative z-30">
            <div className="sticky top-16 sm:top-20 lg:top-24 pt-12 sm:pt-16 lg:pt-20">
              <div className="absolute top-[100px] sm:top-[130px] lg:top-[160px] left-0 sm:left-2 lg:left-4 w-[80px] h-[120px] sm:w-[120px] sm:h-[180px] lg:w-[240px] lg:h-[320px] max-w-full">
                <Image src="/left.png" alt="Finance Dashboard" layout="fill" objectFit="contain" className="rounded-[6px] sm:rounded-[8px] lg:rounded-[10px]" />
              </div>
              <div
                className="absolute top-[220px] sm:top-[280px] lg:top-[300px] left-[40px] sm:left-[100px] lg:left-[170px] w-[120px] sm:w-[160px] lg:w-[240px] p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md max-w-full flex flex-col items-center text-center"
              >
                <Image 
                  src="/right.png"
                  alt="User Testimonial"
                  width={60}
                  height={60}
                  className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] lg:w-[60px] lg:h-[60px] rounded-full mb-1 sm:mb-1.5 lg:mb-2 object-cover"
                />
                <h3 className="text-black text-[8px] sm:text-[10px] lg:text-sm font-bold mb-1 lg:mb-2">
                  Excellent
                </h3>
                <div className="flex gap-0.5 sm:gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="#FFC81D">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-[6px] sm:text-[8px] lg:text-xs leading-tight sm:leading-relaxed mb-1 sm:mb-2 lg:mb-3">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 text-[6px] sm:text-[8px] lg:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-full shadow-md transition-colors flex items-center gap-1 lg:gap-1.5">
                  View all
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Center Content Column - NOW RESPONSIVE */}
          <div className="w-full flex flex-col items-center pt-8 sm:pt-12 lg:pt-16 px-1 sm:px-2 lg:px-4">
            
            {/* Hero Section */}
            <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-5 text-center">
              <div className="flex items-center gap-2 h-6 sm:h-7 lg:h-9 px-2 sm:px-2.5 lg:px-3 py-1 rounded-md sm:rounded-lg border border-gray-200 bg-white/50 shadow-lg backdrop-blur-md">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.85 1.83l4.65 13.34m4.65-13.34L8.5 15.17m-3.25-9.34l3.25-4m3.25 4l-3.25-4m4.65-2.34H3.85L1.83 5.83h13.34L13.15 1.83zM8.5 15.17L15.17 5.83H1.83L8.5 15.17z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-black">Smart Finance, smart living</span>
              </div>

              <h1 className="w-full text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight tracking-tighter max-w-3xl px-2 sm:px-4">
                We're here to help you achieve financial success
              </h1>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center mt-3 sm:mt-5 lg:mt-8 mb-4 sm:mb-6 lg:mb-12">
              <button className="text-white font-medium text-xs sm:text-sm lg:text-base px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}>
                  Get a Demo
              </button>
            </div>

            {/* RESPONSIVE Cards Container */}
            <div className="relative w-full max-w-3xl rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 bg-white/50 shadow-2xl p-1 sm:p-1.5 lg:p-2.5 mb-6 sm:mb-8 lg:mb-10 mt-3 sm:mt-5 lg:mt-16 backdrop-blur-md z-20">
              <div className="relative grid grid-cols-2 gap-1.5 sm:gap-3 lg:gap-5 h-full">
                {/* Card 1: Best Offer - RESPONSIVE */}
                <div className="rounded-lg sm:rounded-xl bg-gradient-to-br from-[#5FB5E5] to-[#2E8BC0] shadow-lg text-white flex flex-col transition-transform duration-300 hover:scale-105 min-h-[100px] sm:min-h-[140px] lg:min-h-[240px] relative overflow-hidden p-2 sm:p-3 lg:p-5">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-auto whitespace-nowrap">
                    <div className="bg-gray-800 text-white text-[8px] sm:text-[10px] lg:text-sm font-semibold px-2 sm:px-3 lg:px-6 py-0.5 sm:py-1 lg:py-2" style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}>
                      Best Offer
                    </div>
                  </div>
                  <div className="absolute inset-0 z-0 opacity-50" style={{
                    backgroundImage: `
                      radial-gradient(circle at 80% 20%, #6EE7B7 0px, #6EE7B7 4px, transparent 4px),
                      radial-gradient(circle at 25% 35%, #A7F3D0 0px, #A7F3D0 3px, transparent 3px),
                      radial-gradient(circle at 70% 80%, #6EE7B7 0px, #6EE7B7 5px, transparent 5px),
                      radial-gradient(circle at 40% 60%, #A7F3D0 0px, #A7F3D0 2px, transparent 2px),
                      radial-gradient(circle at 90% 50%, #6EE7B7 0px, #6EE7B7 6px, transparent 6px),
                      radial-gradient(circle at 10% 85%, #A7F3D0 0px, #A7F3D0 4px, transparent 4px),
                      radial-gradient(circle at 50% 50%, #6EE7B7 0px, #6EE7B7 8px, transparent 8px)
                    `,
                    backgroundSize: '100% 100%',
                  }}></div>
                  <div className="relative z-10 flex flex-col h-full pt-3 sm:pt-5 lg:pt-12">
                    <div className="flex-grow">
                      <div className="text-left">
                        <ul className="space-y-0.5 sm:space-y-1 text-[8px] sm:text-[10px] lg:text-sm my-1 sm:my-2 lg:my-4">
                          <li>Yearly</li>
                          <li>Save 50%</li>
                          <li>Get 7 Days free</li>
                        </ul>
                        <div className="my-1 sm:my-2 lg:my-4">
                          <span className="bg-[#3B82F6] text-white text-[7px] sm:text-[9px] lg:text-sm font-semibold px-1.5 sm:px-2 lg:px-4 py-0.5 sm:py-1 lg:py-2 rounded-md sm:rounded-lg">
                            Cash flow
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] sm:text-sm lg:text-2xl font-bold">Rs6000</p>
                    </div>
                  </div>
                </div>
                {/* Card 2: Buy Subscription - RESPONSIVE */}
                <div className="rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-lg shadow-lg border border-white/20 p-2 sm:p-3 lg:p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-105 min-h-[100px] sm:min-h-[140px] lg:min-h-[240px] relative">
                  <div>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 lg:mb-3 ml-6 sm:ml-8 lg:ml-9">
                      <span className="text-[7px] sm:text-[9px] lg:text-xs text-gray-700">All packs in one place</span>
                    </div>
                    <h3 className="text-black text-[10px] sm:text-xs lg:text-lg font-semibold mb-1 lg:mb-2">Buy Subscription</h3>
                    <p className="text-gray-600 text-[8px] sm:text-[9px] lg:text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                  <div className="mt-2 sm:mt-3 lg:mt-4 self-start">
                    <button className="bg-gray-900 hover:bg-gray-800 text-white text-[8px] sm:text-[9px] lg:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-colors duration-200 flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                      Learn More
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  {/* Credit Card Image - RESPONSIVE */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
                    <Image 
                      src="/Credit Card Rectangle.png" 
                      alt="Credit Card" 
                      width={20} 
                      height={10} 
                      className="w-3 h-auto sm:w-4 sm:h-auto lg:w-5 lg:h-auto object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Decorative Column - NOW RESPONSIVE */}
          <div className="h-full">
            <div className="sticky top-16 sm:top-20 lg:top-24 pt-12 sm:pt-16 lg:pt-20">
              <div className="absolute top-[80px] sm:top-[100px] lg:top-[120px] right-0 sm:right-2 lg:right-4 w-[80px] h-[120px] sm:w-[120px] sm:h-[180px] lg:w-[240px] lg:h-[320px] max-w-full">
                 <Image src="/right.png" alt="Analyze Performance" layout="fill" objectFit="contain" className="rounded-[6px] sm:rounded-[8px] lg:rounded-[10px]" />
              </div>
              <div className="absolute top-[200px] sm:top-[260px] lg:top-[340px] right-[30px] sm:right-[80px] lg:right-[150px] w-[100px] sm:w-[130px] lg:w-[200px] p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md max-w-full flex flex-col items-center z-10">
                <h3 className="text-black text-center text-[8px] sm:text-[10px] lg:text-lg font-medium leading-snug mb-1 lg:mb-2">
                  Watch your business grow
                </h3>
                <Image 
                  src="/Pie Chart.png" 
                  alt="Business Growth Pie Chart" 
                  width={160} 
                  height={160} 
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[160px] lg:h-[160px] object-contain"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}