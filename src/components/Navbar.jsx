'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 bg-gray-50 rounded-t-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 pl-0 pr-0 ml-0 mr-0 h-20 flex items-center relative">
        {/* Logo */}
        <div className="flex items-center h-14">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Team Works Inc"
              className="h-full w-auto object-contain drop-shadow-md"
              style={{ maxHeight: '56px', filter: 'drop-shadow(0 2px 8px rgba(65,152,201,0.15))' }}
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden lg:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <Link href="/client" className="hover:text-blue-600 transition-colors">Client</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact us</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex space-x-3 items-center ml-auto mr-0">
          <button className="text-gray-600 hover:text-blue-700 font-medium text-base px-5 py-2 rounded-full border border-blue-200 bg-white">
            Sign In
          </button>
          <button className="text-white font-medium text-base px-5 py-2 rounded-full shadow-md" style={{
            background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)'
          }}>
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-3">
              <Link href="/" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/services" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link href="/client" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Client</Link>
              <Link href="/contact" className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact us</Link>
            </div>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="w-full py-4 px-5 text-gray-700 hover:text-gray-900 font-medium text-base border border-gray-200 rounded-lg hover:bg-gray-50">Sign In</button>
              <button className="w-full py-4 px-5 text-white rounded-lg font-medium text-base" style={{ background: 'linear-gradient(135.72deg, #4198C9 5.3%, #036DA9 115.18%)' }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full border-t border-gray-900/10"></div> {/* Light black line added here */}
    </nav>
  );
}