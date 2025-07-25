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
              width: '380px',
              height: '380px'
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
              width: '380px',
              height: '380px'
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-black z-20 flex flex-col items-center">
              <h2 
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '62px',
                  lineHeight: '78px',
                  letterSpacing: '-2%',
                  textAlign: 'center',
                  maxWidth: '870px',
                  opacity: 1,
                  marginBottom: '24px'
                }}
              >
                Looking for job opportunity
              </h2>
              
              <p 
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '17px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  maxWidth: '562px',
                  opacity: 1,
                  marginBottom: '32px'
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Ullamcorper puruse et sit 
                rhoncus sed imperdiet eget. Varius mattis tortor magna vitae 
                magna.
              </p>

              {/* Get Started Button */}
              <button className="inline-flex items-center gap-3 bg-black text-white py-3 pr-6 pl-2 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                <div 
                  className="bg-white rounded-full flex items-center justify-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    opacity: 1
                  }}
                >
                  <svg 
                    className="w-5 h-5 text-black transform -rotate-45" 
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
