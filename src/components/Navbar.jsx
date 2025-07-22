'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 lg:px-8 lg:py-5 md:px-6 md:py-4">
        
        {/* Logo - Responsive */}
        <div className="flex items-center">
          <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mr-2 lg:mr-3 flex items-center justify-center">
            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-lg lg:text-xl font-bold text-gray-900">FinanceApp</span>
        </div>
        
        {/* Desktop Navigation Links - Hidden on Mobile */}
        <ul className="hidden lg:flex gap-6 xl:gap-8 text-gray-600 font-medium">
          <li>
            <Link href="/" className="hover:text-gray-900 transition-colors text-sm lg:text-base">
              Home
            </Link>
          </li>
          <li>
            <Link href="#features" className="hover:text-gray-900 transition-colors text-sm lg:text-base">
              Features
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors text-sm lg:text-base">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-gray-900 transition-colors text-sm lg:text-base">
              Contact
            </Link>
          </li>
        </ul>
        
        {/* Desktop Action Buttons - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <button className="px-3 py-1.5 lg:px-5 lg:py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base">
            Log In
          </button>
          <button className="px-4 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm lg:text-base">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-45' : ''}`} 
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

      {/* Mobile Menu Dropdown - Responsive */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link 
                href="/" 
                className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#features" 
                className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#contact" 
                className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button 
                className="w-full py-3 px-4 text-gray-700 hover:text-gray-900 font-medium transition-colors text-center border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </button>
              <button 
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
