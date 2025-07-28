'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar"; 

export default function Hero() {
  return (
    <div className="w-full bg-gray-100 p-4 lg:p-7">
      <div 
        className="relative mx-auto rounded-none lg:rounded-3xl overflow-hidden lg:w-[1300px] py-10 lg:py-20"
        style={{ background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)' }}
      >
        {/* Navbar is now responsive via CSS */}
        <Navbar />
        
        <div className="relative z-10">
          {/* Mobile Layout - visible by default, hidden on lg+ */}
          <div className="lg:hidden px-4 py-6 text-center text-white space-y-6">
            {/* Mobile Heading */}
            <h1 className="font-bold leading-tight px-1"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  lineHeight: 'clamp(40px, 9vw, 56px)',
                  letterSpacing: '-2%',
                  textAlign: 'center'
                }}>
              <span className="block text-white mb-1">We're here to helping</span>
              <span className="block">
                <span className="text-white">Grow </span>
                <span style={{ 
                  color: '#7BB4FF',
                  fontSize: 'clamp(36px, 9vw, 54px)',
                  fontWeight: 700
                }}>Business</span>
              </span>
              <span className="block text-white mt-1">Success</span>
            </h1>

            {/* Mobile Paragraph */}
            <p className="text-white/90 text-base leading-relaxed max-w-full mx-auto px-1">
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
            <div className="mt-8 relative max-w-full mx-auto px-1">
              <Image 
                src="/Remove background fr.png" 
                alt="Professional consultant"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Desktop Layout - hidden by default, visible on lg+ */}
          <div className="hidden lg:block relative h-[800px]">
            {/* Main Heading with absolute positioning */}
            <h1 
              className="absolute text-white font-bold leading-tight"
              style={{
                width: '888px',
                height: '282px',
                top: '100px',
                left: '58px',
                opacity: 1,
                fontFamily: 'Inter',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '75px',
                lineHeight: '94px',
                letterSpacing: '-4%',
                zIndex: 15
              }}
            >
              We're here to helping
              <br />
              <span className="text-white">Grow </span><span style={{ 
                color: '#7BB4FF',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '89px',
                lineHeight: '94px',
                letterSpacing: '-4%'
              }}>Business</span>
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
                top: '650px',
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
                top: '657px',
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
                top: '400px',
                left: '62px',
                opacity: 1,
                fontFamily: 'Inter',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '22px',
                lineHeight: '33px',
                letterSpacing: '0%',
                zIndex: 15
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc aliquet et ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida tetur scelerisque faucibus scelerisque elementum mauris.
            </p>

            {/* Right Content - Finance Image */}
            <div className="absolute" style={{
              width: '580px',
              height: '750px',
              top: '0px',
              left: '660px',
              opacity: 1,
              zIndex: 5
            }}>
              <Image 
                src="/Remove background fr.png" 
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
    </div>
  );
}
