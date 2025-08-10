'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar"; 
import { HiTrendingUp } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="w-full p-4 lg:p-0" style={{ background: 'linear-gradient(180deg, #E6F0F5 0%, #FFFFFF 100%)' }}>
      <div 
        className="relative mx-auto rounded-none lg:rounded-b-3xl overflow-hidden lg:w-full py-10 lg:py-0"
        style={{ background: 'linear-gradient(180deg, #D5E5F0 0%, #FFFFFF 100%)' }}
      >
        <Navbar />
        
        <div className="relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden px-4 py-6 text-center text-gray-800 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/70 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <HiTrendingUp className="text-blue-500" size={20} />
              <span>Where finance meets innovation</span>
            </div>
            <h1 className="font-bold leading-tight text-black"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 10vw, 52px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                }}>
              We're here to help you achieve financial success
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc posuere neque laoreet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
                Get Started
                <FaPaperPlane />
              </Link>
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-medium px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Get a Demo
              </Link>
            </div>
            <div className="mt-8 relative max-w-full mx-auto">
              <Image 
                src="/heroo.png" 
                alt="Financial Success Illustration"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex h-[850px] items-center justify-between px-20">
            <div className="w-1/2 space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/70 rounded-full px-5 py-3 text-base font-medium text-gray-700 shadow-sm">
                <HiTrendingUp className="text-blue-500" size={24} />
                <span>Where finance meets innovation</span>
              </div>
              <h1 
                className="font-bold leading-tight text-black"
                style={{
                  fontSize: '64px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                }}
              >
                We're here to help you achieve financial success
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc posuere neque laoreet. Mscelerisris interdumullamcorper sed posuere.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link href="/contact-us" className="inline-flex items-center justify-center gap-3 bg-black text-white font-medium px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
                  Get Started
                  <FaPaperPlane />
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-medium px-8 py-4 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Get a Demo
                </Link>
              </div>
            </div>
            
            <div className="w-1/2 h-full flex items-center justify-center relative">
              <Image 
                src="/heroo.png" 
                alt="Financial Success Illustration"
                width={700}
                height={700}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
