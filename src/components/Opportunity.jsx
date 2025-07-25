'use client';
import Image from "next/image";

export default function Opportunity() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16" style={{ background: '#F6F5EF' }}>
      <div className="max-w-[1348px] mx-auto relative">
        {/* Main Container with Gradient Background */}
        <div 
          className="relative w-full h-[390px] rounded-3xl overflow-hidden"
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
              width: '300px',
              height: '380px'
            }}
          >
            <Image
              src="/cardl.png"
              alt="Left Card"
              fill
              className="object-contain"
            />
          </div>

          {/* Right Card */}
          <div 
            className="absolute z-10"
            style={{
              right: '0px',
              bottom: '0px',
              width: '300px',
              height: '380px'
            }}
          >
            <Image
              src="/cardr.png"
              alt="Right Card"
              fill
              className="object-contain"
            />
          </div>

          {/* Central Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-black px-8 max-w-3xl z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Looking for job opportunity
              </h2>
              
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur. Ullamcorper puruse et sit 
                rhoncus sed imperdiet eget. Varius mattis tortor magna vitae 
                magna.
              </p>

              {/* Get Started Button */}
              <button className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg 
                    className="w-3 h-3 text-black" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                Get Started
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Abstract shapes for visual enhancement */}
            <div className="absolute top-10 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/8 rounded-full blur-lg"></div>
            <div className="absolute top-1/3 right-20 w-24 h-24 bg-white/6 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
