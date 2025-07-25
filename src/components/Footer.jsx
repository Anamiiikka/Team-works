'use client';
import { Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-blue-500" style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="container mx-auto px-6 py-8">
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
              <a href="#" className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Right side - Newsletter Signup */}
          <div className="text-right max-w-md">
            <h3 className="text-white text-lg font-medium mb-4">
              Subscribe to the flow<br />
              Research collective's<br />
              newsletter
            </h3>
            <div className="flex rounded-full overflow-hidden border border-gray-600 w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter email"
                className="border-0 rounded-none bg-black/50 text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none flex-1 px-6 py-3 text-base"
              />
              <button className="rounded-none bg-blue-600 hover:bg-blue-700 px-6 py-3 border-0 flex items-center justify-center">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap justify-between lg:justify-between gap-8 text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">About us</a>
            <a href="#" className="hover:text-white transition-colors">Reviews</a>
            <a href="#" className="hover:text-white transition-colors">Contact us</a>
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