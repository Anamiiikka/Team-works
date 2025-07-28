'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar"; 

export default function Hero() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-7">
      {/* Parent Container with specified dimensions and styling */}
      <div 
        className="relative mx-auto rounded-3xl overflow-hidden"
        style={{
          width: '1300px',
          height: '885px',
          background: '#036DA9',
          opacity: 1
        }}
      >
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full">
          {/* Main Heading with absolute positioning */}
          <h1 
            className="absolute text-white font-bold leading-tight"
            style={{
              width: '888px',
              height: '282px',
              top: '205px',
              left: '58px',
              opacity: 1,
              fontSize: '4rem'
            }}
          >
            We're here to helping
            <br />
            <span className="text-white">Grow </span><span style={{ color: '#5292E4' }}>Business</span>
            <br />
            Success
          </h1>

          {/* Let's talk with us button with absolute positioning */}
          <Link href="/contact-us">
            <button 
              className="absolute flex items-center justify-center gap-3 text-white font-medium transition-all duration-200"
              style={{
                width: '290px',
                height: '83px',
                top: '736px',
                left: '58px',
                borderRadius: '240px',
                opacity: 1,
                background: '#5292E4'
              }}
            >
            </button>
          </Link>

          {/* Let's talk with us text with absolute positioning */}
          <span 
            className="absolute text-white"
            style={{
              width: '183px',
              height: '20px',
              top: '768px',
              left: '76px',
              opacity: 1,
              fontFamily: 'Inter',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '23px',
              lineHeight: '20px',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}
          >
            Let's talk with us
          </span>

          {/* Arrow div with absolute positioning */}
          <div 
            className="absolute flex items-center justify-center bg-white rounded-full"
            style={{
              width: '70px',
              height: '70px',
              top: '743px',
              left: '270px',
              opacity: 1,
              transform: 'rotate(-45 deg)'
            }}
          >
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Lorem ipsum paragraph with absolute positioning */}
          <p 
            className="absolute text-white/90 leading-relaxed"
            style={{
              width: '514px',
              height: '207px',
              top: '498px',
              left: '62px',
              opacity: 1,
              fontSize: '18px'
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc aliquet et ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida tetur scelerisque faucibus scelerisque elementum mauris.
          </p>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-6" style={{ marginTop: '487px' }}>
                {/* Heading and paragraph are now positioned absolutely above */}
              </div>

              {/* Team Avatar and CTA Button */}
              <div className="flex items-center gap-6">
                {/* Team Avatar - removed */}

                {/* CTA Button - now positioned absolutely above */}
              </div>
            </div>

            {/* Right Content - Woman Image */}
            <div className="relative lg:justify-self-end">
              <div className="relative">
                {/* Main Woman Image */}
                <div className="relative z-20">
                  <Image 
                    src="/business-woman.jpg" 
                    alt="Professional business woman"
                    width={500}
                    height={600}
                    className="w-full max-w-md mx-auto object-cover"
                    priority
                  />
                </div>

                {/* Floating Development Badge */}
                <div className="absolute top-20 right-0 z-30 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-20 h-20 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="251" strokeDashoffset="60"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-800">DEVELOPMENT</div>
                        <div className="text-xs text-gray-600">DESIGN</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
