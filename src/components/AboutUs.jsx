import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Overlapping Images */}
          <div className="relative h-96 lg:h-[500px]">
            {/* Main background image - Office meeting */}
            <div className="absolute top-0 left-0 w-120 h-100 rounded-2xl shadow-xl z-10 border-4 border-white bg-white p-1">
              <img 
                src="/about2.png" 
                alt="Business meeting" 
                className="w-full h-full object-cover rounded-xl"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
            
            {/* Second overlapping image - Woman with tablet */}
            <div className="absolute top-52 right-8 w-78 h-68 rounded-2xl shadow-xl z-20 border-4 border-white bg-white p-1">
              <img 
                src="/about1.png" 
                alt="Professional woman with tablet" 
                className="w-full h-full object-cover rounded-xl"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
            
            {/* Team badge overlay */}
            <div className="absolute top-48 left-16 bg-white rounded-xl shadow-lg p-4 z-30 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-gray-800">Skilled Team</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
                </div>
                <div className="bg-yellow-300 text-black text-xs font-bold px-2 py-1 rounded-md">
                  9+
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - About Content */}
          <div className="space-y-8">
            {/* Header with overlapping arrows */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-l-blue-500 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-l-blue-400 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent opacity-70"></div>
                </div>
                <span className="text-gray-600 font-medium ml-2">About us</span>
              </div>
            </div>
            
            {/* Main heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Helping Millions Grow Better Since 2010
              </h1>
            </div>
            
            {/* Description text */}
            <div className="text-gray-600 text-lg leading-relaxed">
              syndication, working capital management, and capital advisory. With over 15 years of industry experience, our team brings unparalleled insights and strategic solutions tailored to meet the evolving financial needs of businesses. Having worked with leading financial institutions and Banks, we possess the expertise to navigate
            </div>
            
            {/* Learn more button */}
            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full flex items-center gap-3 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Learn more
                <div className="bg-white rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-blue-500" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;