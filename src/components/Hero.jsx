'use client';
import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar"; 

export default function Index() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    // The main container for the entire page
    <div className="w-full min-h-screen bg-white relative overflow-x-hidden">
      
      <Navbar />

      {/* Background elements are now separate and behind the content */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        {/* You can place your large SVG background pattern here if needed */}
      </div>

      {/* Main content layout */}
      <main className="relative z-10 lg:grid lg:grid-cols-[280px_minmax(auto,744px)_280px] lg:gap-x-4 xl:gap-x-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* Left Decorative Column */}
        <div className="hidden lg:block relative h-full overflow-hidden">
          <div className="sticky top-24 pt-20">
            <div className="absolute top-[160px] left-4 w-[240px] h-[320px] max-w-full">
              <Image src="/left.png" alt="Finance Dashboard" layout="fill" objectFit="contain" className="rounded-[10px]" />
            </div>
            {/* FIX: The card and its internal elements have been resized to fit correctly */}
            <div
              className="absolute top-[280px] left-[90px] w-[220px] p-4 rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md max-w-full flex flex-col items-center text-center"
            >
              <Image 
                src="/right.png" // Using a placeholder for the testimonial image
                alt="User Testimonial"
                width={60}
                height={60}
                className="rounded-full mb-2"
              />
              <h3 className="text-black text-sm font-bold mb-2">
                Excellent
              </h3>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#FFC81D">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">
                Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula.
              </p>
              <button className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transition-colors flex items-center gap-1.5">
                View all
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Center Content Column */}
        <div className="w-full flex flex-col items-center pt-16 sm:pt-24 px-2 sm:px-4">
          
          {/* Hero Section */}
          <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex items-center gap-2 h-9 px-3 py-1 rounded-lg border border-gray-200 bg-white/50 shadow-lg backdrop-blur-md">
                <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.85 1.83l4.65 13.34m4.65-13.34L8.5 15.17m-3.25-9.34l3.25-4m3.25 4l-3.25-4m4.65-2.34H3.85L1.83 5.83h13.34L13.15 1.83zM8.5 15.17L15.17 5.83H1.83L8.5 15.17z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-sm font-medium text-black">Smart Finance, smart living</span>
            </div>

            <h1 className="w-full text-black text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tighter max-w-3xl px-4">
              We're here to help you achieve financial success
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center mt-8 mb-12">
            <button className="text-white font-medium text-base px-8 py-3 rounded-full shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}>
                Get a Demo
            </button>
          </div>

          {/* Middle Container with Two Cards - Shifted Downward */}
          <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-white/50 shadow-2xl p-2.5 mb-10 mt-16 backdrop-blur-md">
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
                <div className="mt-4 self-start">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2">
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Decorative Column */}
        <div className="hidden lg:block relative h-full overflow-hidden">
          <div className="sticky top-24 pt-20">
            <div className="absolute top-[120px] right-4 w-[240px] h-[320px] max-w-full">
               <Image src="/right.png" alt="Analyze Performance" layout="fill" objectFit="contain" className="rounded-[10px]" />
            </div>
            <div className="absolute top-[280px] right-[100px] w-[200px] p-4 rounded-xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md max-w-full flex flex-col items-center">
              <h3 className="text-black text-center text-lg font-medium leading-snug mb-2">
                Watch your business grow
              </h3>
              <svg className="w-auto h-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="paint0_linear_pie" x1="100.01" y1="18.3716" x2="100.01" y2="181.671" gradientUnits="userSpaceOnUse"><stop stopColor="#FF968E" /><stop offset="1" stopColor="#FF968E" stopOpacity="0.3" /></linearGradient>
                  <linearGradient id="paint1_linear_pie" x1="188.626" y1="96.6482" x2="40.9047" y2="156.375" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.58" /><stop offset="1" stopColor="white" stopOpacity="0.21" /></linearGradient>
                  <linearGradient id="paint2_linear_pie" x1="18.3691" y1="99.9998" x2="181.651" y2="99.9998" gradientUnits="userSpaceOnUse"><stop stopColor="#FF7EAB" /><stop offset="1" stopColor="#FF7EAB" stopOpacity="0.3" /></linearGradient>
                  <linearGradient id="paint3_linear_pie" x1="96.6376" y1="11.3746" x2="156.38" y2="159.103" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.58" /><stop offset="1" stopColor="white" stopOpacity="0.21" /></linearGradient>
                  <linearGradient id="paint4_linear_pie" x1="10.2051" y1="21.1318" x2="85.0428" y2="21.1318" gradientUnits="userSpaceOnUse"><stop stopColor="#6792FF" /><stop offset="1" stopColor="#6792FF" stopOpacity="0.3" /></linearGradient>
                  <linearGradient id="paint5_linear_pie" x1="15.2869" y1="126.195" x2="142.521" y2="30.2697" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.58" /><stop offset="1" stopColor="white" stopOpacity="0.21" /></linearGradient>
                  <linearGradient id="paint6_linear_pie" x1="178.849" y1="78.8675" x2="21.1283" y2="121.124" gradientUnits="userSpaceOnUse"><stop stopColor="#613CCB" /><stop offset="1" stopColor="#613CCB" stopOpacity="0" /></linearGradient>
                  <linearGradient id="paint7_linear_pie" x1="126.183" y1="184.732" x2="30.2419" y2="57.5046" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.58" /><stop offset="1" stopColor="white" stopOpacity="0.21" /></linearGradient>
                  <linearGradient id="paint8_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.3" /><stop offset="1" stopOpacity="0" /></linearGradient>
                  <linearGradient id="paint9_linear_pie" x1="100.01" y1="35.3818" x2="100.01" y2="164.66" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.3" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
                  <linearGradient id="paint10_linear_pie" x1="95.1866" y1="45.769" x2="143.591" y2="117.112" gradientUnits="userSpaceOnUse"><stop stopColor="#ED6B60" /><stop offset="1" stopColor="#E248E5" /></linearGradient>
                </defs>
                <path d="M181.651 100.021C181.651 117.995 175.721 135.467 164.781 149.726C153.84 163.986 138.5 174.237 121.141 178.889L114.801 155.229C126.953 151.972 137.691 144.797 145.349 134.815C153.008 124.833 157.159 112.603 157.159 100.021H181.651Z" fill="url(#paint0_linear_pie)" stroke="url(#paint1_linear_pie)" strokeWidth="1.53846" />
                <path d="M78.88 21.1322C90.9761 17.8908 103.656 17.4757 115.938 19.919C128.22 22.3623 139.775 27.5986 149.71 35.2227C159.645 42.8469 167.693 52.6546 173.232 63.8871C178.771 75.1195 181.651 87.4757 181.651 99.9998L157.159 99.9998C157.159 91.2329 155.143 82.5836 151.265 74.7209C147.388 66.8581 141.755 59.9928 134.8 54.6559C127.846 49.3189 119.757 45.6535 111.159 43.9432C102.562 42.2329 93.6863 42.5235 85.2191 44.7925L78.88 21.1322Z" fill="url(#paint2_linear_pie)" stroke="url(#paint3_linear_pie)" strokeWidth="1.53846" />
                <path d="M42.2814 42.2643C52.415 32.1297 65.0375 24.8414 78.8801 21.1318L85.2192 44.7921C75.5293 47.3888 66.6936 52.4906 59.6001 59.5848L42.2814 42.2643Z" fill="url(#paint4_linear_pie)" stroke="url(#paint5_linear_pie)" strokeWidth="1.53846" />
                <path d="M121.12 178.868C103.76 183.519 85.351 182.313 68.747 175.434C52.1431 168.556 38.2725 156.391 29.2865 140.825C20.3004 125.259 16.7012 107.163 19.0471 89.3426C21.3929 71.5225 29.5526 54.9744 42.2607 42.265L59.5794 59.5855C50.6838 68.4821 44.9719 80.0657 43.3299 92.5398C41.6878 105.014 44.2072 117.681 50.4974 128.577C56.7876 139.473 66.4971 147.989 78.1199 152.804C89.7426 157.619 102.629 158.464 114.781 155.207L121.12 178.868Z" fill="url(#paint6_linear_pie)" stroke="url(#paint7_linear_pie)" strokeWidth="1.53846" />
                <path d="M100.01 34.9971C135.918 34.9972 165.026 64.1099 165.026 100.021C165.026 135.933 135.918 165.045 100.01 165.045C64.1018 165.045 34.9924 135.933 34.9922 100.021C34.9922 64.1098 64.1017 34.9971 100.01 34.9971Z" fill="url(#paint8_linear_pie)" fillOpacity="0.7" stroke="url(#paint9_linear_pie)" strokeWidth="0.769231" />
                <text x="66.0668" y="99.3145" fill="url(#paint10_linear_pie)" fontSize="40" fontWeight="600" letterSpacing="-0.04em">941</text>
                <text x="62.207" y="128.136" fill="black" fillOpacity="0.6" fontSize="13" letterSpacing="-0.4px">Transactions</text>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}