import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#F6F5EF' }}>
      {/* Abstract Geometric Background Elements - Inspired by Services */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {/* Top area geometric elements */}
        <div className="absolute top-12 left-16 w-18 h-18 border border-blue-300/50 rounded-full"></div>
        <div className="absolute top-8 right-24 w-10 h-10 bg-blue-200/45 transform rotate-45"></div>
        <div className="absolute top-28 right-12 w-5 h-5 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-6 left-32 w-3 h-3 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-16 right-40 w-7 h-7 bg-blue-100/45 rounded-full"></div>
        <div className="absolute top-36 left-48 w-2 h-10 bg-blue-300/40 rounded-full transform rotate-30"></div>
        <div className="absolute top-44 right-64 w-5 h-5 border-2 border-blue-400/45 transform rotate-45"></div>
        <div className="absolute top-4 left-52 w-4 h-4 bg-blue-200/50 transform rotate-15"></div>
        <div className="absolute top-22 right-56 w-6 h-6 border border-blue-300/45 rounded-full"></div>
        <div className="absolute top-40 left-60 w-8 h-8 bg-blue-100/40 transform rotate-45"></div>
        
        {/* Header area abstract shapes */}
        <div className="absolute top-20 left-1/4 w-2 h-16 bg-blue-300/40 rounded-full transform rotate-12"></div>
        <div className="absolute top-32 right-1/3 w-6 h-6 border-2 border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-14 left-1/3 w-4 h-4 bg-blue-200/50 transform rotate-12"></div>
        <div className="absolute top-38 right-1/4 w-1 h-12 bg-blue-400/45 rounded-full transform rotate-45"></div>
        <div className="absolute top-48 left-2/5 w-8 h-8 border border-blue-300/50 rounded-full"></div>
        
        {/* Content area enhancements - positioned to avoid text overlap */}
        <div className="absolute top-1/2 left-8 w-12 h-12 border border-blue-300/45 rounded-full"></div>
        <div className="absolute top-2/3 right-16 w-8 h-8 bg-blue-100/50 transform rotate-12"></div>
        <div className="absolute top-1/2 left-24 w-2 h-2 bg-blue-300/60 rounded-full"></div>
        <div className="absolute top-3/5 right-32 w-5 h-5 border border-blue-200/50 transform rotate-45"></div>
        <div className="absolute top-1/2 right-48 w-10 h-10 border-2 border-blue-100/45 transform rotate-30"></div>
        <div className="absolute top-2/5 left-56 w-3 h-3 bg-blue-200/55 transform rotate-45"></div>
        
        {/* Middle area additional elements */}
        <div className="absolute top-1/3 left-12 w-11 h-11 border border-blue-200/45 rounded-full"></div>
        <div className="absolute top-2/5 right-20 w-6 h-6 bg-blue-300/50 transform rotate-45"></div>
        <div className="absolute top-1/2 left-64 w-4 h-4 border-2 border-blue-400/55 rounded-full"></div>
        <div className="absolute top-3/5 right-72 w-2 h-11 bg-blue-200/45 rounded-full transform rotate-25"></div>
        <div className="absolute top-2/3 left-72 w-7 h-7 bg-blue-100/50 transform rotate-30"></div>
        
        {/* Bottom area geometric pattern */}
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-3 h-14 bg-blue-300/45 rounded-full transform rotate-25"></div>
        <div className="absolute bottom-28 left-1/5 w-5 h-5 bg-blue-400/50 rounded-full"></div>
        <div className="absolute bottom-16 right-1/5 w-7 h-7 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute bottom-36 left-1/3 w-2 h-10 bg-blue-300/45 rounded-full transform rotate-40"></div>
        <div className="absolute bottom-24 right-1/3 w-8 h-8 border-2 border-blue-100/50 rounded-full"></div>
        <div className="absolute bottom-12 left-2/5 w-4 h-4 bg-blue-200/55 transform rotate-15"></div>
        <div className="absolute bottom-40 right-2/5 w-1 h-6 bg-blue-400/50 rounded-full transform rotate-60"></div>
        
        {/* Large background circles for depth */}
        <div className="absolute -top-20 -right-20 w-32 h-32 border border-blue-200/40 rounded-full"></div>
        <div className="absolute top-1/3 -left-12 w-28 h-28 bg-gradient-to-br from-blue-100/25 to-transparent rounded-full"></div>
        <div className="absolute -bottom-16 -right-8 w-24 h-24 border border-blue-100/45 rounded-full"></div>
        <div className="absolute top-1/4 -left-8 w-20 h-20 border border-blue-200/40 rounded-full"></div>
        <div className="absolute -top-16 left-1/3 w-30 h-30 bg-gradient-to-bl from-blue-50/20 to-transparent rounded-full"></div>
        
        {/* Abstract scattered dots */}
        <div className="absolute top-40 left-3/4 w-1 h-1 bg-blue-400/60 rounded-full"></div>
        <div className="absolute top-60 left-1/6 w-1 h-1 bg-blue-300/55 rounded-full"></div>
        <div className="absolute bottom-40 left-2/3 w-1 h-1 bg-blue-200/50 rounded-full"></div>
        <div className="absolute top-52 right-1/6 w-1 h-1 bg-blue-400/55 rounded-full"></div>
        <div className="absolute top-72 left-1/3 w-1 h-1 bg-blue-300/60 rounded-full"></div>
        <div className="absolute bottom-52 right-2/3 w-1 h-1 bg-blue-200/55 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-blue-400/50 rounded-full"></div>
        <div className="absolute bottom-60 left-1/4 w-1 h-1 bg-blue-300/55 rounded-full"></div>
        
        {/* Connecting lines for modern tech feel */}
        <div className="absolute top-24 left-1/2 w-20 h-0.5 bg-blue-200/45 transform rotate-15"></div>
        <div className="absolute bottom-1/3 right-1/2 w-14 h-0.5 bg-blue-300/40 transform -rotate-12"></div>
        <div className="absolute top-1/3 left-1/3 w-16 h-0.5 bg-blue-400/45 transform rotate-30"></div>
        <div className="absolute bottom-1/2 right-1/3 w-12 h-0.5 bg-blue-200/40 transform -rotate-25"></div>
        <div className="absolute top-2/3 left-2/3 w-10 h-0.5 bg-blue-300/45 transform rotate-45"></div>
        <div className="absolute bottom-2/3 right-2/3 w-18 h-0.5 bg-blue-400/40 transform -rotate-35"></div>
        
        {/* Additional geometric variety */}
        <div className="absolute top-1/4 right-1/5 w-5 h-5 border border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/5 w-6 h-1 bg-blue-300/45 rounded-full transform rotate-30"></div>
        <div className="absolute top-1/5 left-3/5 w-6 h-6 border-2 border-blue-400/50 transform rotate-60"></div>
        <div className="absolute bottom-1/5 right-3/5 w-3 h-6 bg-blue-200/45 rounded-full transform rotate-45"></div>
        <div className="absolute top-3/4 left-1/6 w-4 h-4 bg-blue-300/55 transform rotate-30"></div>
        <div className="absolute bottom-3/4 right-1/6 w-5 h-1 bg-blue-400/45 rounded-full transform rotate-15"></div>
        <div className="absolute top-4/5 right-4/5 w-6 h-6 border border-blue-200/50 rounded-full"></div>
        <div className="absolute bottom-4/5 left-4/5 w-2 h-8 bg-blue-300/50 rounded-full transform rotate-50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile: Content first, Desktop: Images first */}
          
          {/* About Content - Mobile: First, Desktop: Second */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Header with overlapping arrows */}
            <div className="relative">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#000000' }}>About us</span>
              </div>
            </div>
            
            {/* Main heading */}
            <div>
              <h1 className="font-bold text-gray-900 leading-tight px-4 lg:px-0"
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    lineHeight: 'clamp(36px, 6vw, 58px)'
                  }}>
                Helping Millions Grow Better Since 2010
              </h1>
            </div>
            
            {/* Description text */}
            <div className="font-normal px-4 lg:px-0 max-w-full lg:max-w-[682px] text-justify"
                 style={{ 
                   fontFamily: 'Inter',
                   fontWeight: 400,
                   fontSize: 'clamp(16px, 2.5vw, 28px)',
                   lineHeight: 'clamp(24px, 3.5vw, 42px)',
                   letterSpacing: '0%',
                   color: '#6C7278',
                   textAlign: 'justify',
                   textJustify: 'inter-word'
                 }}>
              Team Work Advisors Pvt Ltd is a premier investment banking and financial advisory firm with a deep-rooted expertise in debt syndication, working capital management, and capital advisory. With over 15 years of industry experience, our team brings unparalleled insights and strategic solutions tailored to meet the evolving financial needs of businesses. Having worked with leading financial institutions and Banks, we possess the expertise to navigate complex financial landscapes and drive business success.
            </div>
            
            {/* Learn more button */}
            <div className="flex justify-center lg:justify-start">
              <button className="text-white font-medium pl-6 pr-2 py-3 rounded-full flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105" style={{
                background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)'
              }}>
                Learn more
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 ml-4 transition-transform duration-300 hover:rotate-12" style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <ArrowRight className="w-4 h-4 transform rotate-[-45deg]" style={{ color: '#036DA9' }} />
                </div>
              </button>
            </div>
          </div>

          {/* Overlapping Images - Mobile: Second, Desktop: First */}
          <div className="order-2 lg:order-1 relative h-80 md:h-96 lg:h-[500px] w-full max-w-sm md:max-w-md lg:max-w-none mx-auto">
            {/* Main background image - Office meeting - Scaled for mobile */}
            <div className="absolute top-0 left-0 w-64 h-64 md:w-80 md:h-80 lg:w-100 lg:h-100 rounded-2xl shadow-xl z-10 border-1 border-white bg-white" style={{ padding: '2px' }}>
              <img 
                src="/about2.png" 
                alt="Business meeting" 
                className="w-full h-full rounded-xl object-cover"
                style={{ borderRadius: '0.5rem' }}
              />
            </div>
            
            {/* Second overlapping image - Woman with tablet - Scaled for mobile */}
            <div className="absolute top-40 right-2 w-48 h-52 md:top-48 md:right-3 md:w-60 md:h-64 lg:top-54 lg:right-4 lg:w-78 lg:h-84 rounded-2xl lg:rounded-4xl shadow-xl z-20" style={{ padding: '2px' }}>
              <img 
                src="/about1.png" 
                alt="Professional woman with tablet" 
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            
            {/* Skilled Team image at intersection - Scaled and positioned at intersection for all screen sizes */}
            <div className="absolute bottom-8 right-38 md:bottom-12 md:right-16 lg:top-88 lg:left-50 z-30">
              <img 
                src="/skilled.png" 
                alt="Skilled Team" 
                className="w-20 md:w-24 lg:w-32 h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;