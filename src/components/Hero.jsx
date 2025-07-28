'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar"; 

export default function Hero() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-0 lg:p-7">
      <div 
        className="relative mx-auto rounded-none lg:rounded-3xl overflow-hidden min-h-screen lg:w-[1300px] lg:h-[885px]"
        style={{ background: '#036DA9' }}
      >
        {/* Navbar is now responsive via CSS */}
        <Navbar />
        
        {/* Mobile Layout - visible by default, hidden on lg+ */}
        <div className="lg:hidden px-4 py-6 text-center text-white space-y-6">
          {/* Mobile Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            We're here to helping
            <br />
            <span className="text-white">Grow </span>
            <span style={{ color: '#5292E4' }}>Business</span>
            <br />
            Success
          </h1>

          {/* Mobile Paragraph */}
          <p className="text-white/90 text-base leading-relaxed max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc aliquet et ipsum dolor sit amet consectetur.
          </p>

          {/* Mobile CTA Button */}
          <Link 
            href="/contact-us"
            className="inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-200 px-8 py-4 rounded-full"
            style={{ background: '#5292E4' }}
          >
            <span>Let's talk with us</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center" style={{ transform: 'rotate(-40deg)' }}>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* Mobile Image */}
          <div className="mt-8 relative max-w-sm mx-auto">
            <Image 
              src="/finman.png" 
              alt="Professional consultant"
              width={400}
              height={500}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* Desktop Layout - hidden by default, visible on lg+ */}
        <div className="hidden lg:block relative z-10 h-full">
          {/* Main Heading with absolute positioning */}
          <h1 
            className="absolute text-white font-bold leading-tight"
            style={{
              width: '888px',
              height: '282px',
              top: '205px',
              left: '58px',
              opacity: 1,
              fontSize: '4rem',
              zIndex: 15
            }}
          >
            We're here to helping
            <br />
            <span className="text-white">Grow </span><span style={{ color: '#5292E4' }}>Business</span>
            <br />
            Success
          </h1>

          {/* Let's talk with us button with absolute positioning */}
       <Link
  href="/contact-us"
  className="absolute flex items-center justify-start gap-3 text-white font-medium transition-all duration-200 px-6"
  style={{
    width: '290px',
    height: '83px',
    top: '780px',
    left: '58px',
    borderRadius: '240px',
    opacity: 1,
    background: '#5292E4',
    zIndex: 15
  }}
>
  <span 
    className="text-white"
    style={{
      fontFamily: 'Inter',
      fontWeight: 500,
      fontStyle: 'normal',
      fontSize: '23px',
      lineHeight: '20px',
      letterSpacing: '0%',
      verticalAlign: 'middle',
    }}
  >
    Let's talk with us
  </span>
</Link>


          {/* Arrow div with absolute positioning */}
          <div 
            className="absolute flex items-center justify-center bg-white rounded-full"
            style={{
              width: '70px',
              height: '70px',
              top: '787px',
              left: '270px',
              opacity: 1,
              transform: 'rotate(-40deg)',
              zIndex: 15
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
              fontSize: '18px',
              zIndex: 15
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc aliquet et ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida tetur scelerisque faucibus scelerisque elementum mauris.
          </p>

          {/* Right Content - Finance Image */}
          <div className="absolute" style={{
            width: '580px',
            height: '750px',
            top: '120px',
            left: '660px',
            opacity: 1,
            zIndex: 5
          }}>
            <Image 
              src="/finman.png" 
              alt="Professional consultant"
              width={580}
              height={750}
              className="w-full h-full object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
