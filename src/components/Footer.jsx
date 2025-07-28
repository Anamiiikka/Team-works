'use client';
import { Facebook, Twitter, Linkedin, Youtube, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="relative border-t border-blue-500 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundColor: "#000", 
        minHeight: "300px",      
      }}
    >
      <div className="container mx-auto px-6 py-8 bg-transparent">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* Left side - Logo and Social Icons */}
          <div className="flex flex-col space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/logof.png"
                alt="Team Works Logo" 
                className="w-45 h-12 rounded-full"
              />
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Newsletter Signup */}
          <div className="text-left max-w-md">
            <h3 className="text-white text-xl font-medium mb-4">
              Subscribe to the flow<br />
              Research collective's<br />
              newsletter
            </h3>
            <div className="relative w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent border border-gray-600 rounded-full py-3 pl-6 pr-20 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                }}
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 pt-6">
          <div className="flex flex-wrap justify-between lg:justify-between gap-8 text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="/services" className="hover:text-white transition-colors">Services</a>
            <a href="/about-us" className="hover:text-white transition-colors">About us</a>
            <a href="/testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="/contact-us" className="hover:text-white transition-colors">Contact us</a>
          </div>
        </nav>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Copyright & design by team works 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
