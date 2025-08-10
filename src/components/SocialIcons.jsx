'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function SocialIcons() {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-4">
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
        <FaFacebookF size={20} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
        <FaTwitter size={20} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
        <FaInstagram size={20} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
        <FaLinkedinIn size={20} />
      </a>
    </div>
  );
}
