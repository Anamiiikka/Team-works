'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Top({ 
  title = "Looking for job opportunity", 
  locationTitle = "",
  description = "Lorem ipsum dolor sit amet consectetur. Ullamcorper puruse et sit rhoncus sed imperdiet eget. Varius mattis tortor magna vitae magna.",
  buttonText = "Get Started",
  buttonLink = "/opportunity",
  showDescription = false,
  showButton = false
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scrolling to section on page load if there's a hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the '#'
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, []);

  const scrollToSection = (sectionId) => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
        setIsMobileMenuOpen(false); // Close mobile menu after clicking
      }
    } else {
      // If we're on a different page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <section className="w-full relative overflow-hidden px-4 md:px-6 lg:px-8" style={{ background: '#F6F5EF' }}>
      {/* Navbar Section */}
      <>
        {/* Mobile Navbar - Hidden on lg+ screens */}
        <div className="w-full px-4 py-3 lg:hidden">
          <nav className="bg-white shadow-lg border border-gray-100 rounded-2xl sm:rounded-3xl">
            <div className="px-4 sm:px-6">
              <div className="flex h-14 sm:h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Team Works Inc"
                    className="h-7 sm:h-8 w-auto"
                  />
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                  className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg"
                >
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6" 
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
                <div className="pb-3 sm:pb-4 space-y-1 sm:space-y-2">
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    Home
                  </button>
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'about')}
                  >
                    About
                  </button>
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'services')}
                  >
                    Services
                  </button>
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'testimonials')}
                  >
                    Client
                  </button>
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'career')}
                  >
                    Career
                  </button>
                  <button 
                    className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base" 
                    onClick={(e) => handleNavClick(e, 'contact')}
                  >
                    Contact us
                  </button>
                  
                  <div className="pt-2 sm:pt-3 border-t border-gray-200">
                    <button 
                      className="w-full py-2.5 sm:py-3 px-4 sm:px-5 text-white rounded-lg font-medium text-sm sm:text-base" 
                      style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}
                      onClick={(e) => handleNavClick(e, 'contact')}
                    >
                      Free Consultation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </>

      {/* Main Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative">
        {/* Abstract Geometric Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          {/* Top area geometric elements */}
          <div className="absolute top-8 left-12 w-16 h-16 border border-blue-300/50 rounded-full"></div>
          <div className="absolute top-4 right-20 w-8 h-8 bg-blue-200/45 transform rotate-45"></div>
          <div className="absolute top-20 right-8 w-4 h-4 bg-blue-400/50 rounded-full"></div>
          <div className="absolute top-2 left-28 w-2 h-2 border border-blue-200/55 transform rotate-45"></div>
          <div className="absolute top-12 right-32 w-6 h-6 bg-blue-100/45 rounded-full"></div>
          <div className="absolute top-28 left-40 w-1 h-8 bg-blue-300/40 rounded-full transform rotate-30"></div>
          <div className="absolute top-32 right-48 w-4 h-4 border-2 border-blue-400/45 transform rotate-45"></div>
          
          {/* Header area abstract shapes */}
          <div className="absolute top-16 left-1/5 w-1 h-12 bg-blue-300/40 rounded-full transform rotate-12"></div>
          <div className="absolute top-24 right-1/4 w-5 h-5 border-2 border-blue-200/55 transform rotate-45"></div>
          <div className="absolute top-8 left-1/4 w-3 h-3 bg-blue-200/50 transform rotate-12"></div>
          <div className="absolute top-30 right-1/5 w-6 h-6 border border-blue-300/50 rounded-full"></div>
          
          {/* Side area enhancements - positioned outside main container */}
          <div className="absolute top-1/3 left-4 w-10 h-10 border border-blue-300/45 rounded-full"></div>
          <div className="absolute top-1/2 right-8 w-6 h-6 bg-blue-100/50 transform rotate-12"></div>
          <div className="absolute top-2/5 left-8 w-1 h-1 bg-blue-300/60 rounded-full"></div>
          <div className="absolute top-3/5 right-12 w-4 h-4 border border-blue-200/50 transform rotate-45"></div>
          <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-blue-100/45 transform rotate-30"></div>
          <div className="absolute top-2/3 right-16 w-2 h-2 bg-blue-200/55 transform rotate-45"></div>
          
          {/* Middle area additional elements */}
          <div className="absolute top-1/4 left-6 w-9 h-9 border border-blue-200/45 rounded-full"></div>
          <div className="absolute top-3/4 right-10 w-5 h-5 bg-blue-300/50 transform rotate-45"></div>
          <div className="absolute top-1/3 right-4 w-3 h-3 border-2 border-blue-400/55 rounded-full"></div>
          <div className="absolute top-2/3 left-12 w-1 h-9 bg-blue-200/45 rounded-full transform rotate-25"></div>
          
          {/* Bottom area geometric pattern */}
          <div className="absolute bottom-16 left-1/5 w-10 h-10 border-2 border-blue-200/50 transform rotate-45"></div>
          <div className="absolute bottom-24 right-1/5 w-2 h-12 bg-blue-300/45 rounded-full transform rotate-25"></div>
          <div className="absolute bottom-20 left-1/6 w-4 h-4 bg-blue-400/50 rounded-full"></div>
          <div className="absolute bottom-12 right-1/6 w-6 h-6 border border-blue-200/55 transform rotate-45"></div>
          <div className="absolute bottom-28 left-1/4 w-1 h-8 bg-blue-300/45 rounded-full transform rotate-40"></div>
          <div className="absolute bottom-18 right-1/4 w-7 h-7 border-2 border-blue-100/50 rounded-full"></div>
          <div className="absolute bottom-8 left-1/3 w-3 h-3 bg-blue-200/55 transform rotate-15"></div>
          <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-blue-400/50 rounded-full transform rotate-60"></div>
          
          {/* Large background circles for depth */}
          <div className="absolute -top-16 -right-16 w-24 h-24 border border-blue-200/40 rounded-full"></div>
          <div className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-br from-blue-100/25 to-transparent rounded-full"></div>
          <div className="absolute -bottom-12 -right-6 w-18 h-18 border border-blue-100/45 rounded-full"></div>
          <div className="absolute top-1/5 -left-6 w-16 h-16 border border-blue-200/40 rounded-full"></div>
          <div className="absolute -bottom-8 left-1/4 w-22 h-22 bg-gradient-to-bl from-blue-50/20 to-transparent rounded-full"></div>
          
          {/* Abstract scattered dots */}
          <div className="absolute top-32 left-3/4 w-1 h-1 bg-blue-400/60 rounded-full"></div>
          <div className="absolute top-48 left-1/8 w-1 h-1 bg-blue-300/55 rounded-full"></div>
          <div className="absolute bottom-32 left-2/3 w-1 h-1 bg-blue-200/50 rounded-full"></div>
          <div className="absolute top-40 right-1/8 w-1 h-1 bg-blue-400/55 rounded-full"></div>
          <div className="absolute top-56 left-1/4 w-1 h-1 bg-blue-300/60 rounded-full"></div>
          <div className="absolute bottom-40 right-2/3 w-1 h-1 bg-blue-200/55 rounded-full"></div>
          
          {/* Connecting lines for modern tech feel */}
          <div className="absolute top-20 left-1/3 w-16 h-0.5 bg-blue-200/45 transform rotate-15"></div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-0.5 bg-blue-300/40 transform -rotate-12"></div>
          <div className="absolute top-1/4 left-2/3 w-14 h-0.5 bg-blue-400/45 transform rotate-30"></div>
          <div className="absolute bottom-1/3 right-2/3 w-10 h-0.5 bg-blue-200/40 transform -rotate-25"></div>
          
          {/* Additional geometric variety */}
          <div className="absolute top-1/5 right-1/6 w-4 h-4 border border-blue-200/50 transform rotate-45"></div>
          <div className="absolute bottom-1/5 left-1/6 w-5 h-1 bg-blue-300/45 rounded-full transform rotate-30"></div>
          <div className="absolute top-1/6 left-2/3 w-5 h-5 border-2 border-blue-400/50 transform rotate-60"></div>
          <div className="absolute bottom-1/6 right-2/3 w-2 h-5 bg-blue-200/45 rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 left-1/8 w-3 h-3 bg-blue-300/55 transform rotate-30"></div>
          <div className="absolute bottom-3/4 right-1/8 w-4 h-1 bg-blue-400/45 rounded-full transform rotate-15"></div>
        </div>

        <div className="max-w-[1348px] mx-auto relative z-10">
          {/* Main Container with Gradient Background */}
          <div 
            className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[390px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg"
            style={{
              background: 'radial-gradient(54.49% 161.07% at 44.25% 37.5%, #A4C7FD 0%, #036DA9 91.19%)',
            }}
          >
            {/* Desktop Navbar - Positioned inside the blue container */}
            <div 
              className="hidden lg:block absolute z-50 w-full h-[91px] top-0 left-0"
            >
              <nav 
                className="relative w-full h-full bg-transparent" 
                style={{ 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
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
                      <div className="hidden lg:flex items-center space-x-10 text-black">
                        <button 
                          className="hover:text-blue-600 transition-colors" 
                          onClick={(e) => handleNavClick(e, 'home')}
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Home
                        </button>
                        <button 
                          className="hover:text-blue-600 transition-colors" 
                          onClick={(e) => handleNavClick(e, 'about')}
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          About
                        </button>
                        <button 
                          className="hover:text-blue-600 transition-colors" 
                          onClick={(e) => handleNavClick(e, 'services')}
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Services
                        </button>
                        <button 
                          className="hover:text-blue-600 transition-colors" 
                          onClick={(e) => handleNavClick(e, 'testimonials')}
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Client
                        </button>
                        <button 
                          className="hover:text-blue-600 transition-colors" 
                          onClick={(e) => handleNavClick(e, 'contact')}
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Contact us
                        </button>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Sign In and Sign Up Buttons */}
                    <div className="flex items-center gap-2">
                      <Link href="/auth/login">
                        <button 
                          className="px-4 py-2 text-white hover:text-blue-200 transition-colors rounded-full"
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Sign In
                        </button>
                      </Link>
                      <Link href="/auth/signup">
                        <button 
                          className="px-4 py-2 text-white transition-all duration-200 hover:shadow-lg rounded-full"
                          style={{
                            background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)',
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                          }}
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
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
                {/* Location Title (Breadcrumb) */}
                {locationTitle && (
                  <div
                    className="text-lg sm:text-xl mb-3 sm:mb-4"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      letterSpacing: '0%',
                      textAlign: 'center',
                      color: '#000000',
                      opacity: 1
                    }}
                  >
                    {locationTitle}
                  </div>
                )}
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mb-4 md:mb-6 px-2"
                  style={{
                    fontFamily: 'Inter',
                    letterSpacing: '-2%',
                    maxWidth: '870px',
                    opacity: 1
                  }}
                >
                  {title}
                </h2>
                
                {showDescription && (
                  <p 
                    className="text-sm sm:text-base md:text-lg font-medium mb-6 md:mb-8 px-2"
                    style={{
                      fontFamily: 'Inter',
                      letterSpacing: '0%',
                      maxWidth: '562px',
                      opacity: 1
                    }}
                  >
                    {description}
                  </p>
                )}

                {/* Get Started Button */}
                {showButton && (
                  <Link href={buttonLink}>
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
                      {buttonText}
                    </button>
                  </Link>
                )}
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
      </div>
    </section>
  );
}
