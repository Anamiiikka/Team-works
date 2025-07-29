'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar - Hidden on lg+ screens */}
      <div className="w-full px-4 py-3 lg:hidden">
        <nav className="bg-white shadow-lg border border-gray-100 rounded-3xl">
          <div className="px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Team Works Inc"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="pb-4 space-y-2">
                <Link href="/" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about-us" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/services" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
                <Link href="/testimonials" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>Client</Link>
                <Link href="/opportunity" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>Career</Link>
                <Link href="/contact-us" className="block py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium font-bold" onClick={() => setIsMobileMenuOpen(false)}>Contact us</Link>
                
                <div className="pt-3 border-t border-gray-200">
                  <Link href="/contact-us" legacyBehavior>
                    <button 
                      className="w-full py-3 px-5 text-white rounded-lg font-medium text-base" 
                      style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Free Consultation
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* Desktop Navbar - Hidden on mobile, shown on lg+ */}
      <div 
        className="hidden lg:block absolute z-50"
        style={{
          width: '1211px',
          height: '91px',
          top: '27px',
          left: '58px',
          opacity: 1
        }}
      >
        <nav className="relative w-full h-full bg-white shadow-lg border border-gray-100" style={{ borderRadius: '100px' }}>
          <div className="w-full h-full px-8 lg:px-12">
            <div className="flex h-full items-center justify-between">
              {/* LEFT SIDE: Logo and Navigation Links */}
              <div className="flex items-center gap-x-12">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0" >
                  <img 
                    src="/logo.png" 
                    alt="Team Works Inc"
                    className="h-12 w-auto"
                  />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center space-x-10 text-gray-700 font-medium text-base">
                  <Link href="/" className="hover:text-blue-600 transition-colors font-bold">Home</Link>
                  <Link href="/about-us" className="hover:text-blue-600 transition-colors font-bold">About</Link>
                  <Link href="/services" className="hover:text-blue-600 transition-colors font-bold">Services</Link>
                  <Link href="/testimonials" className="hover:text-blue-600 transition-colors font-bold">Client</Link>
                  <Link href="/opportunity" className="hover:text-blue-600 transition-colors font-bold">Career</Link>
                  <Link href="/contact-us" className="hover:text-blue-600 transition-colors font-bold">Contact us</Link>
                </div>
              </div>

              {/* RIGHT SIDE: Free Consultation Button */}
              <div className="flex items-center">
                <Link href="/contact-us" >
                  <button className="text-white font-medium text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200" style={{
                    background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)'
                  }}>
                    Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
