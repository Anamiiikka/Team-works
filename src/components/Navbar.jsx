'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
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
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  About
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'services')}
                >
                  Services
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'testimonials')}
                >
                  Client
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'career')}
                >
                  Career
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold" 
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Contact us
                </button>
                
                <div className="pt-3 border-t border-gray-200">
                  <button 
                    className="w-full py-3 px-5 text-white rounded-lg font-medium text-base" 
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
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'home')}
                  >
                    Home
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'about')}
                  >
                    About
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'services')}
                  >
                    Services
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'testimonials')}
                  >
                    Client
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'career')}
                  >
                    Career
                  </button>
                  <button 
                    className="hover:text-blue-600 transition-colors font-bold" 
                    onClick={(e) => handleNavClick(e, 'contact')}
                  >
                    Contact us
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE: Free Consultation Button */}
              <div className="flex items-center">
                <button 
                  className="text-white font-medium text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200" 
                  style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
