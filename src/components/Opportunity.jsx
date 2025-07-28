'use client';
import Image from "next/image";

export default function Opportunity() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16" style={{ background: '#F6F5EF' }}>
      <div className="max-w-[1348px] mx-auto relative">
        {/* Main Container with Gradient Background */}
        <div 
          className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[390px] rounded-2xl lg:rounded-3xl overflow-hidden"
          style={{
            background: 'radial-gradient(54.49% 161.07% at 44.25% 37.5%, #A4C7FD 0%, #036DA9 91.19%)',
          }}
        >
          {/* Left Card */}
          <div 
            className="absolute z-10"
            style={{
              left: '0px',
              bottom: '0px',
              width: 'clamp(100px, 18vw, 380px)',
              height: 'clamp(100px, 18vw, 380px)'
            }}
          >
            <Image
              src="/cardl.png"
              alt="Left Card"
              fill
              className="object-bottom"
            />
          </div>

          {/* Right Card */}
          <div 
            className="absolute z-10"
            style={{
              right: '0px',
              bottom: '0px',
              width: 'clamp(100px, 18vw, 380px)',
              height: 'clamp(100px, 18vw, 380px)'
            }}
          >
            <Image
              src="/cardr.png"
              alt="Right Card"
              fill
              className="object-bottom"
            />
          </div>

          {/* Central Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-black z-20 flex flex-col items-center max-w-full">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mb-4 md:mb-6"
                style={{
                  fontFamily: 'Inter',
                  letterSpacing: '-2%',
                  maxWidth: '870px',
                  opacity: 1
                }}
              >
                Looking for job opportunity
              </h2>
              
              <p 
                className="text-sm sm:text-base md:text-lg font-medium mb-6 md:mb-8 px-2"
                style={{
                  fontFamily: 'Inter',
                  letterSpacing: '0%',
                  maxWidth: '562px',
                  opacity: 1
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Ullamcorper puruse et sit 
                rhoncus sed imperdiet eget. Varius mattis tortor magna vitae 
                magna.
              </p>

              {/* Get Started Button */}
              <button className="inline-flex items-center gap-2 md:gap-3 bg-black text-white py-2 md:py-3 pr-4 md:pr-6 pl-1 md:pl-2 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                <div 
                  className="bg-white rounded-full flex items-center justify-center"
                  style={{
                    width: 'clamp(32px, 5vw, 40px)',
                    height: 'clamp(32px, 5vw, 40px)',
                    opacity: 1
                  }}
                >
                  <svg 
                    className="w-4 h-4 md:w-5 md:h-5 text-black transform -rotate-45" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </div>
                Get Started
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Abstract shapes for visual enhancement - hidden on small screens */}
            <div className="hidden md:block absolute top-6 lg:top-10 left-1/4 w-12 lg:w-20 h-12 lg:h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="hidden md:block absolute bottom-6 lg:bottom-10 right-1/4 w-20 lg:w-32 h-20 lg:h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="hidden lg:block absolute top-1/2 left-6 lg:left-10 w-12 lg:w-16 h-12 lg:h-16 bg-white/8 rounded-full blur-lg"></div>
            <div className="hidden lg:block absolute top-1/3 right-12 lg:right-20 w-16 lg:w-24 h-16 lg:h-24 bg-white/6 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}