import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F6F5EF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Overlapping Images */}
          <div className="relative h-96 lg:h-[500px]">
            {/* Main background image - Office meeting */}
            <div className="absolute top-0 left-0 w-100 h-100 rounded-2xl shadow-xl z-10 border-1 border-white bg-white" style={{ padding: '2px' }}>
              <img 
                src="/about2.png" 
                alt="Business meeting" 
                className="w-full h-full rounded-xl"
                style={{ borderRadius: '0.5rem' }}
              />
            </div>
            
            {/* Second overlapping image - Woman with tablet */}
            <div className="absolute top-54 right-4 w-78 h-84 rounded-4xl shadow-xl z-20 " style={{ padding: '2px' }}>
              <img 
                src="/about1.png" 
                alt="Professional woman with tablet" 
                className="w-full h-full rounded-xl"
                
              />
            </div>
            
            {/* Skilled Team image at intersection */}
            <div className="absolute top-88 left-50 z-30">
              <img 
                src="/skilled.png" 
                alt="Skilled Team" 
                className="w-32 h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Right Side - About Content */}
          <div className="space-y-8">
            {/* Header with overlapping arrows */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#000000' }}>About us</span>
              </div>
            </div>
            
            {/* Main heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Helping Millions Grow Better Since 2010
              </h1>
            </div>
            
            {/* Description text */}
            <div 
              className="font-normal" 
              style={{ 
                width: '682px',
                height: '293px',
                padding: '10px',
                gap: '10px',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '28px',
                lineHeight: '42px',
                letterSpacing: '0%',
                color: '#6C7278'
              }}
            >
              syndication, working capital management, and capital advisory. With over 15 years of industry experience, our team brings unparalleled insights and strategic solutions tailored to meet the evolving financial needs of businesses. Having worked with leading financial institutions and Banks, we possess the expertise to navigate
            </div>
            
            {/* Learn more button */}
            <div>
              <button className="text-white font-medium pl-6 pr-2 py-3 rounded-full flex items-center justify-between transition-colors duration-200 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#5292E4' }}>
                Learn more
                <div className="bg-white rounded-full p-2.5 ml-4">
                  <ArrowRight className="w-4 h-4 transform rotate-[-45deg]" style={{ color: '#5292E4' }} />
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