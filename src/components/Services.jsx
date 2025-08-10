'use client';
 import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import servicesData from '../data/services.json';

const Services = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const nextService = () => {
    setCurrentServiceIndex((prev) => (prev + 1) % servicesData.services.length);
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => (prev - 1 + servicesData.services.length) % servicesData.services.length);
  };
  // Function to render a service card
  const renderServiceCard = (service) => (
    <div key={service.id} className="flex-shrink-0 relative pt-12" style={{ width: '300px' }}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #AAC5EA 0%, #2C87BB 100%)' }}>
            <Image 
              src={service.icon} 
              alt={service.alt} 
              width={48} 
              height={48}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full">
        <h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#1F2937',
            marginBottom: '12px'
          }}
        >
          {service.title}
        </h3>
        <p 
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '18px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#6B7280'
          }}
          className="px-2"
        >
          {service.description}
        </p>
      </div>
    </div>
  );
  return (
    <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#F6F5EF' }}>
      {/* Abstract Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Top area geometric elements */}
        <div className="absolute top-12 left-16 w-20 h-20 border border-blue-300/30 rounded-full"></div>
        <div className="absolute top-8 right-24 w-12 h-12 bg-blue-200/25 transform rotate-45"></div>
        <div className="absolute top-28 right-12 w-6 h-6 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-6 left-32 w-4 h-4 border border-blue-200/35 transform rotate-45"></div>
        <div className="absolute top-16 right-40 w-8 h-8 bg-blue-100/25 rounded-full"></div>
        <div className="absolute top-36 left-48 w-3 h-12 bg-blue-300/20 rounded-full transform rotate-30"></div>
        <div className="absolute top-44 right-64 w-6 h-6 border-2 border-blue-400/25 transform rotate-45"></div>
        
        {/* Additional top area elements for increased density */}
        <div className="absolute top-4 left-52 w-5 h-5 bg-blue-200/30 transform rotate-15"></div>
        <div className="absolute top-22 right-56 w-7 h-7 border border-blue-300/25 rounded-full"></div>
        <div className="absolute top-18 left-60 w-2 h-8 bg-blue-400/35 rounded-full transform rotate-20"></div>
        <div className="absolute top-32 right-68 w-9 h-9 bg-blue-100/20 transform rotate-45"></div>
        <div className="absolute top-2 left-68 w-3 h-3 border-2 border-blue-200/40 rounded-full"></div>
        <div className="absolute top-24 right-76 w-4 h-10 bg-blue-300/25 rounded-full transform rotate-35"></div>
        <div className="absolute top-40 left-72 w-6 h-6 border border-blue-400/30 transform rotate-60"></div>
        <div className="absolute top-10 right-80 w-8 h-2 bg-blue-200/25 rounded-full transform rotate-25"></div>
        <div className="absolute top-34 left-80 w-5 h-5 bg-blue-300/35 rounded-full"></div>
        <div className="absolute top-14 right-88 w-3 h-6 bg-blue-100/30 rounded-full transform rotate-40"></div>
        <div className="absolute top-42 left-84 w-7 h-7 border-2 border-blue-400/25 transform rotate-30"></div>
        <div className="absolute top-20 right-96 w-4 h-4 bg-blue-200/30 transform rotate-50"></div>
        <div className="absolute top-38 left-88 w-2 h-2 bg-blue-300/40 rounded-full"></div>
        <div className="absolute top-26 right-100 w-6 h-1 bg-blue-400/25 rounded-full transform rotate-15"></div>
        <div className="absolute top-46 left-96 w-8 h-8 border border-blue-200/25 rounded-full"></div>
        <div className="absolute top-30 right-108 w-3 h-7 bg-blue-300/30 rounded-full transform rotate-55"></div>
        <div className="absolute top-48 left-100 w-5 h-5 bg-blue-100/35 transform rotate-25"></div>
        <div className="absolute top-12 right-112 w-4 h-4 border-2 border-blue-400/30 rounded-full"></div>
        <div className="absolute top-4 left-104 w-2 h-5 bg-blue-200/35 rounded-full transform rotate-45"></div>
        <div className="absolute top-50 right-116 w-7 h-7 bg-blue-300/25 transform rotate-35"></div>
        
        {/* Header area abstract shapes */}
        <div className="absolute top-20 left-1/4 w-3 h-20 bg-blue-300/20 rounded-full transform rotate-12"></div>
        <div className="absolute top-32 right-1/3 w-8 h-8 border-2 border-blue-200/35 transform rotate-45"></div>
        <div className="absolute top-14 left-1/3 w-5 h-5 bg-blue-200/30 transform rotate-12"></div>
        <div className="absolute top-38 right-1/4 w-2 h-16 bg-blue-400/25 rounded-full transform rotate-45"></div>
        <div className="absolute top-48 left-2/5 w-10 h-10 border border-blue-300/30 rounded-full"></div>
        <div className="absolute top-26 right-2/5 w-4 h-4 bg-blue-100/35 rounded-full"></div>
        
        {/* Service card area enhancements */}
        <div className="absolute top-1/2 left-8 w-16 h-16 border border-gray-300/25 rounded-full"></div>
        <div className="absolute top-2/3 right-16 w-10 h-10 bg-blue-100/30 transform rotate-12"></div>
        <div className="absolute top-1/2 left-24 w-3 h-3 bg-blue-300/40 rounded-full"></div>
        <div className="absolute top-3/5 right-32 w-6 h-6 border border-blue-200/30 transform rotate-45"></div>
        <div className="absolute top-1/2 left-40 w-8 h-1 bg-blue-400/25 rounded-full transform rotate-20"></div>
        <div className="absolute top-3/4 right-48 w-12 h-12 border-2 border-blue-100/25 transform rotate-30"></div>
        <div className="absolute top-2/5 left-56 w-4 h-4 bg-blue-200/35 transform rotate-45"></div>
        <div className="absolute top-4/5 right-56 w-2 h-10 bg-blue-300/30 rounded-full transform rotate-15"></div>
        
        {/* Middle area additional elements */}
        <div className="absolute top-1/3 left-12 w-14 h-14 border border-blue-200/25 rounded-full"></div>
        <div className="absolute top-2/5 right-20 w-7 h-7 bg-blue-300/30 transform rotate-45"></div>
        <div className="absolute top-1/2 left-64 w-5 h-5 border-2 border-blue-400/35 rounded-full"></div>
        <div className="absolute top-3/5 right-72 w-3 h-14 bg-blue-200/25 rounded-full transform rotate-25"></div>
        <div className="absolute top-2/3 left-72 w-9 h-9 bg-blue-100/30 transform rotate-30"></div>
        
        {/* Bottom area geometric pattern */}
        <div className="absolute bottom-20 left-1/4 w-14 h-14 border-2 border-blue-200/30 transform rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-4 h-16 bg-blue-300/25 rounded-full transform rotate-25"></div>
        <div className="absolute bottom-28 left-1/5 w-6 h-6 bg-blue-400/30 rounded-full"></div>
        <div className="absolute bottom-16 right-1/5 w-8 h-8 border border-blue-200/35 transform rotate-45"></div>
        <div className="absolute bottom-36 left-1/3 w-3 h-12 bg-blue-300/25 rounded-full transform rotate-40"></div>
        <div className="absolute bottom-24 right-1/3 w-10 h-10 border-2 border-blue-100/30 rounded-full"></div>
        <div className="absolute bottom-12 left-2/5 w-5 h-5 bg-blue-200/35 transform rotate-15"></div>
        <div className="absolute bottom-40 right-2/5 w-2 h-8 bg-blue-400/30 rounded-full transform rotate-60"></div>
        
        {/* Large background circles for depth */}
        <div className="absolute -top-20 -right-20 w-40 h-40 border border-gray-200/20 rounded-full"></div>
        <div className="absolute top-1/3 -left-12 w-32 h-32 bg-gradient-to-br from-blue-100/15 to-transparent rounded-full"></div>
        <div className="absolute -bottom-16 -right-8 w-28 h-28 border border-blue-100/25 rounded-full"></div>
        <div className="absolute top-1/4 -left-8 w-24 h-24 border border-blue-200/20 rounded-full"></div>
        <div className="absolute -top-16 left-1/3 w-36 h-36 bg-gradient-to-bl from-blue-50/10 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 -right-12 w-30 h-30 border border-gray-200/15 rounded-full"></div>
        
        {/* Abstract service-related icons scattered */}
        <div className="absolute top-40 left-3/4 w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="absolute top-60 left-1/6 w-2 h-2 bg-blue-300/35 rounded-full"></div>
        <div className="absolute bottom-40 left-2/3 w-2 h-2 bg-blue-200/30 rounded-full"></div>
        <div className="absolute top-52 right-1/6 w-2 h-2 bg-blue-400/35 rounded-full"></div>
        <div className="absolute top-72 left-1/3 w-2 h-2 bg-blue-300/40 rounded-full"></div>
        <div className="absolute bottom-52 right-2/3 w-2 h-2 bg-blue-200/35 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-2 h-2 bg-blue-400/30 rounded-full"></div>
        <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-blue-300/35 rounded-full"></div>
        <div className="absolute top-88 left-2/5 w-2 h-2 bg-blue-200/40 rounded-full"></div>
        <div className="absolute bottom-68 right-2/5 w-2 h-2 bg-blue-400/35 rounded-full"></div>
        
        {/* Connecting lines for modern tech feel */}
        <div className="absolute top-24 left-1/2 w-24 h-0.5 bg-blue-200/25 transform rotate-15"></div>
        <div className="absolute bottom-1/3 right-1/2 w-16 h-0.5 bg-blue-300/20 transform -rotate-12"></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-0.5 bg-blue-400/25 transform rotate-30"></div>
        <div className="absolute bottom-1/2 right-1/3 w-18 h-0.5 bg-blue-200/20 transform -rotate-25"></div>
        <div className="absolute top-2/3 left-2/3 w-14 h-0.5 bg-blue-300/25 transform rotate-45"></div>
        <div className="absolute bottom-2/3 right-2/3 w-22 h-0.5 bg-blue-400/20 transform -rotate-35"></div>
        <div className="absolute top-1/4 left-3/4 w-12 h-0.5 bg-blue-200/30 transform rotate-60"></div>
        <div className="absolute bottom-1/4 right-3/4 w-16 h-0.5 bg-blue-300/25 transform -rotate-20"></div>
        
        {/* Additional geometric variety */}
        <div className="absolute top-1/4 right-1/5 w-6 h-6 border border-blue-200/30 transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/5 w-8 h-1 bg-blue-300/25 rounded-full transform rotate-30"></div>
        <div className="absolute top-1/5 left-3/5 w-7 h-7 border-2 border-blue-400/30 transform rotate-60"></div>
        <div className="absolute bottom-1/5 right-3/5 w-4 h-8 bg-blue-200/25 rounded-full transform rotate-45"></div>
        <div className="absolute top-3/4 left-1/6 w-5 h-5 bg-blue-300/35 transform rotate-30"></div>
        <div className="absolute bottom-3/4 right-1/6 w-6 h-2 bg-blue-400/25 rounded-full transform rotate-15"></div>
        <div className="absolute top-4/5 right-4/5 w-8 h-8 border border-blue-200/30 rounded-full"></div>
        <div className="absolute bottom-4/5 left-4/5 w-3 h-10 bg-blue-300/30 rounded-full transform rotate-50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center lg:text-left grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-8 lg:mb-16">
          {/* Left Side - Title */}
          <div className="lg:col-span-1">
            {/* Header with triangle icon */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <div className="relative">
                <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
              </div>
              <span className="font-medium ml-2" style={{ color: '#000000' }}>Our services</span>
            </div>

            {/* Main heading */}
            <h2 
              className="font-semibold text-black px-4 lg:px-0"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 'clamp(32px, 5vw, 53px)',
                lineHeight: 'clamp(40px, 6vw, 78px)',
                letterSpacing: '-2%',
                opacity: 1
              }}
            >
              We provide consulting to strategic growth
            </h2>
          </div>

          {/* Right Side - Description - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-2 lg:justify-self-end" style={{ width: '580px', height: '207px' }}>
            <p style={{ 
              color: '#6C7278', 
              fontSize: '22px', 
              lineHeight: '33px',
              textAlign: 'justify',
              textJustify: 'inter-word'
            }} className="font-normal text-justify">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nuncaliquet et.Ipsum dolor sit amet consectetur. Dolor pulvinar sed d.
            </p>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden text-center mb-8 px-4">
          <p style={{ 
            color: '#6C7278', 
            fontSize: '16px', 
            lineHeight: '24px',
            textAlign: 'justify',
            textJustify: 'inter-word'
          }} className="font-normal text-justify">
            Lorem ipsum dolor sit amet consectetur. At proin magnis volutpat suspendisse quis. Massa metus nec rhoncus massa dictum fermentum amet ultricies.Lorem ipsum dolor sit amet consectetur. At proin magnis volutpat
          </p>
        </div>

        {/* Services Section */}
        {/* Mobile: Single card with navigation */}
        <div className="lg:hidden relative mb-12">
          {/* Navigation Arrows */}
          <button 
            onClick={prevService}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 -ml-6"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={nextService}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 -mr-6"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Single Service Card */}
          <div className="px-8">
            <div className="relative pt-12">
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #AAC5EA 0%, #2C87BB 100%)' }}>
                    <Image 
                      src={servicesData.services[currentServiceIndex].icon} 
                      alt={servicesData.services[currentServiceIndex].alt} 
                      width={48} 
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg min-h-[300px] flex flex-col justify-center">
                <h3 
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '24px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    opacity: 1,
                    color: '#1F2937',
                    marginBottom: '12px'
                  }}
                >
                  {servicesData.services[currentServiceIndex].title}
                </h3>
                <p 
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    opacity: 1,
                    color: '#6B7280'
                  }}
                  className="px-2"
                >
                  {servicesData.services[currentServiceIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Service Indicator Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {servicesData.services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentServiceIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentServiceIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Services Grid */}
        <div className="hidden lg:block relative w-full overflow-hidden mb-16">
          <div 
            className="flex gap-8 animate-infinite-scroll"
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {/* Render services from JSON data */}
            {servicesData.services.map(service => renderServiceCard(service))}
            
            {/* Duplicate services for continuous animation */}
            {servicesData.services.map(service => renderServiceCard({...service, id: `${service.id}-duplicate`}))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          {/* Mobile CTA Button */}
          <div className="lg:hidden">
            <div className="w-full max-w-[401px] mx-auto rounded-full px-6 py-4 flex items-center relative" 
                 style={{ 
                   background: 'linear-gradient(to right, #5292E4, #036DA9)',
                   height: '67px'
                 }}>
              <a href="/services" className="absolute inset-0 z-10" style={{borderRadius: '9999px'}} aria-label="Know all Services"></a>
              {/* Left side with spark and circle */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Circle with spark icon */}
                <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center flex-shrink-0 relative">
                  {/* Spark icon */}
                  <svg width="17" height="26" viewBox="0 0 17 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="absolute">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#6AF2A2', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#2F9E5F', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <path d="M8.5 3L4 14h4.5v9l4.5-11H8.5V3z" fill="url(#grad1)"/>
                  </svg>
                </div>
              </div>
              
              {/* Text - taking full available space */}
              <span className="text-white font-medium flex-1 text-center pointer-events-none" 
                    style={{
                      fontSize: '17px',
                      lineHeight: '20px'
                    }}>
                Know all Services
              </span>
              
              {/* Arrow - no gap */}
              <div className="flex-shrink-0">
                <ArrowRight className="text-white" 
                           style={{
                             width: '24.92px',
                             height: '24.92px'
                           }} />
              </div>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex w-full max-w-4xl mx-auto rounded-full px-4 sm:px-6 py-3 flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0" style={{ background: 'linear-gradient(to right, #5292E4, #036DA9)' }}>
            {/* Left side with icon */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-20">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#6AF2A2', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#2F9E5F', stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                    <path d="M13 3L4 14h6v7l9-11h-6V3z" fill="url(#grad2)"/>
                </svg>
              </div>
              <div className="text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <span className="text-lg sm:text-xl font-medium">We strive to lead the way in the business</span>
                <div className="flex items-center gap-2 cursor-pointer">
                  <a href="/services" className="flex items-center gap-2 text-lg sm:text-xl font-medium underline text-white" aria-label="know all services">
                    know all services
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right side spacer for symmetry */}
            <div className="w-12 h-12 flex-shrink-0 hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;