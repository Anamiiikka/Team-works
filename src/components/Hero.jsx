'use client';
import { useState } from "react";
import Image from "next/image";
// FIX: Ensure you are importing the correct Navbar component you just created.
import Navbar from "./Navbar"; 

export default function Index() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    // The main container for the entire page
    <div className="w-full min-h-screen bg-white relative overflow-x-hidden">
      
      {/* FIX: The Navbar is placed here at the very top, outside the main content flow. */}
      <Navbar />

      {/* Background elements are now separate and behind the content */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        {/* You can place your large SVG background pattern here if needed */}
      </div>

      {/* Main content layout */}
      <main className="relative z-10 lg:grid lg:grid-cols-[1fr_minmax(auto,744px)_1fr] lg:gap-x-8 xl:gap-x-12 px-4 sm:px-6 lg:px-8">
        
        {/* Left Decorative Column */}
        <div className="hidden lg:block relative h-full">
          <div className="sticky top-24 pt-20">
            <div className="absolute top-[160px] left-0 w-[250px] h-[353px]">
              <Image src="/left.png" alt="Finance Dashboard" layout="fill" objectFit="contain" className="rounded-[10px]" />
            </div>50
            <div
              className="absolute top-[320px] left-[100px] w-[240px] p-5 rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md"
            >
              <h3 className="text-black text-center text-xl font-medium leading-snug mb-2">
                Watch your Business Grow
              </h3>
              <div className="w-40 h-40 mx-auto bg-gray-200/50 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">941</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content Column */}
        {/* FIX: Added top padding (pt-16) to this column to create space BELOW the navbar */}
        <div className="w-full flex flex-col items-center pt-16 sm:pt-24">
          
          {/* Hero Section */}
          <div className="w-full flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex items-center gap-2 h-9 px-3 py-1 rounded-lg border border-gray-200 bg-white/50 shadow-lg backdrop-blur-md">
                <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.85 1.83l4.65 13.34m4.65-13.34L8.5 15.17m-3.25-9.34l3.25-4m3.25 4l-3.25-4m4.65-2.34H3.85L1.83 5.83h13.34L13.15 1.83zM8.5 15.17L15.17 5.83H1.83L8.5 15.17z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-sm font-medium text-black">Smart Finance, smart living</span>
            </div>

            <h1 className="w-full text-black text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter max-w-3xl">
              We're here to help you achieve financial success
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center mt-8 mb-12">
            <button className="text-white font-medium text-base px-8 py-3 rounded-full shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}>
                Get a Demo
            </button>
          </div>

          {/* Middle Container with Two Cards */}
          <div className="w-full rounded-2xl border border-white/20 bg-white/50 shadow-2xl p-2.5 mb-10 backdrop-blur-md">
            <div className="relative flex flex-col md:flex-row gap-5 h-full">
              <div className="flex-1 rounded-xl bg-gradient-to-br from-[#5FB5E5] to-[#2E8BC0] shadow-lg text-white p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:z-20 min-h-[240px]">
                <div>
                  <div className="bg-white/20 text-xs px-2 py-0.5 rounded-full inline-block mb-3">Best Offer</div>
                  <h3 className="text-xl font-semibold mb-2">Cash Flow Management</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Track and optimize your cash flow with real-time insights.</p>
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-white/90 backdrop-blur-lg shadow-lg border border-white/20 p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:z-20 min-h-[240px]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-700">All packs in one place</span>
                  </div>
                  <h3 className="text-black text-lg font-semibold mb-2">Buy Subscription</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Decorative Column */}
        <div className="hidden lg:block relative h-full">
          <div className="sticky top-24 pt-20">
            <div className="absolute top-[120px] right-0 w-[269px] h-[350px]">
               <Image src="/right.png" alt="Analyze Performance" layout="fill" objectFit="contain" className="rounded-[10px]" />
            </div>
            <div className="absolute top-[320px] right-[150px] w-[246px] p-5 rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md">
              <h3 className="text-black text-center text-xl font-medium leading-snug mb-2">
                Analyze Your Performance
              </h3>
              <div className="w-40 h-40 mx-auto bg-gray-200/50 rounded-full flex items-center justify-center">
                 <span className="text-4xl font-bold text-gray-800">941</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
