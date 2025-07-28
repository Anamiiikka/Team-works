import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import servicesData from '../data/services.json';

const Services = () => {
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
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F6F5EF' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Left Side - Title */}
          <div className="lg:col-span-1">
            {/* Header with triangle icon */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
              </div>
              <span className="font-medium ml-2" style={{ color: '#000000' }}>Our services</span>
            </div>

            {/* Main heading */}
            <h2 
              className="font-semibold text-black"
              style={{
                width: '615px',
                height: '156px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '53px',
                lineHeight: '78px',
                letterSpacing: '-2%',
                opacity: 1
              }}
            >
              We provide consulting to strategic growth.
            </h2>
          </div>

          {/* Right Side - Description */}
          <div style={{ width: '580px', height: '207px' }} className="lg:col-span-2 lg:justify-self-end">
            <p style={{ color: '#6C7278', fontSize: '22px', lineHeight: '33px' }} className="font-normal">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nuncaliquet et.Ipsum dolor sit amet consectetur. Dolor pulvinar sed d.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
          {/* Render services from JSON data */}
          {servicesData.services.map(service => renderServiceCard(service))}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="w-full max-w-4xl mx-auto rounded-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0" style={{ background: 'linear-gradient(to right, #5292E4, #036DA9)' }}>
            {/* Left side with icon */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-20">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#6AF2A2', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#2F9E5F', stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                    <path d="M13 3L4 14h6v7l9-11h-6V3z" fill="url(#grad1)"/>
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