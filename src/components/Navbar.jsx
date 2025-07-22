// src/components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <div className="flex items-center">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mr-3 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">FinanceApp</span>
        </div>
                
        <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
          <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
          <li><Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link></li>
          <li><Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
          <li><Link href="#contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
        </ul>
                
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Log In
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}