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
    <div key={service.id} className="relative pt-12">
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
            fontSize: '29px',
            lineHeight: '30px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#1F2937',
            marginBottom: '16px'
          }}
        >
          {service.title}
        </h3>
        <p 
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '23px',
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
    <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F6F5EF' }}>
      <div className="max-w-7xl mx-auto">
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
            <p style={{ color: '#6C7278', fontSize: '22px', lineHeight: '33px' }} className="font-normal">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nuncaliquet et.Ipsum dolor sit amet consectetur. Dolor pulvinar sed d.
            </p>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden text-center mb-8 px-4">
          <p style={{ color: '#6C7278', fontSize: '16px', lineHeight: '24px' }} className="font-normal">
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
                    fontSize: '24px',
                    lineHeight: '30px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    opacity: 1,
                    color: '#1F2937',
                    marginBottom: '16px'
                  }}
                >
                  {servicesData.services[currentServiceIndex].title}
                </h3>
                <p 
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
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
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
          {/* Render services from JSON data */}
          {servicesData.services.map(service => renderServiceCard(service))}
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
              <span className="text-white font-medium flex-1 text-center" 
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
                  <span className="text-lg sm:text-xl font-medium underline">know all services</span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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