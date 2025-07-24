import React from 'react';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F6F5EF' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Side - Title */}
          <div>
            {/* Header with triangle icon */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
              </div>
              <span className="font-medium ml-2" style={{ color: '#000000' }}>Our services</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              We provide consulting to strategic growth.
            </h2>
          </div>

          {/* Right Side - Description */}
          <div className="lg:pt-12">
            <p style={{ color: '#6C7278', fontSize: '22px', lineHeight: '33px', maxWidth: '580px' }} className="font-normal">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nuncaliquet et.Ipsum dolor sit amet consectetur. Dolor pulvinar sed d.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
          {/* Debt Syndication */}
          <div className="relative pt-12">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7BB3E0' }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-landmark"
                    >
                        <line x1="3" x2="21" y1="22" y2="22" />
                        <line x1="6" x2="6" y1="18" y2="11" />
                        <line x1="10" x2="10" y1="18" y2="11" />
                        <line x1="14" x2="14" y1="18" y2="11" />
                        <line x1="18" x2="18" y1="18" y2="11" />
                        <polygon points="12 2 20 7 4 7" />
                    </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Debt Syndication</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We specialize in structuring and arranging debt financing solutions to support business growth, expansion, and restructuring. Our strategic relationships with banks, NBFCs, and financial institutions allow us to offer customized funding solutions, including
              </p>
            </div>
          </div>

          {/* Project Financing */}
          <div className="relative pt-12">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7BB3E0' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-file-text"
                        >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" x2="8" y1="13" y2="13" />
                            <line x1="16" x2="8" y1="17" y2="17" />
                            <line x1="10" x2="8" y1="9" y2="9" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Project Financing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We provide end-to-end project financing solutions, ensuring that businesses secure the required capital for infrastructure, industrial, and business expansion projects.
              </p>
            </div>
          </div>

          {/* Venture Capital */}
          <div className="relative pt-12">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7BB3E0' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-rocket"
                        >
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.33.04-3.18S5.21 15.66 4.5 16.5z" />
                            <path d="m12 15-3-3a2.25 2.25 0 0 1 0-3l3-3a2.25 2.25 0 0 1 3 0l3 3a2.25 2.25 0 0 1 0 3l-3 3a2.25 2.25 0 0 1-3 0z" />
                            <path d="m15 12-3-3" />
                            <path d="M9 9 4.5 4.5" />
                            <path d="M19.5 4.5 15 9" />
                            <path d="m21.5 16.5-5.5-5.5" />
                            <path d="m4.5 19.5 5.5-5.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Venture Capital</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We help startups and small businesses raise venture capital and secure funding for growth and expansion. Our services includeVenture Capital & Angel Investment Advisory MSME Business Loans & Credit
              </p>
            </div>
          </div>

          {/* Capital Advisory */}
          <div className="relative pt-12">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7BB3E0' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lightbulb"
                        >
                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                            <path d="M9 18h6" />
                            <path d="M10 22h4" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Capital Advisory</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Strategic capital structuring is essential for maximizing growth potential. We assist in evaluating capital requirements and structuring financial instruments that align with business objectives
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="rounded-3xl p-8 flex items-center justify-between" style={{ backgroundColor: '#5292E4' }}>
            {/* Left side with icon */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3L4 14h6v7l9-11h-6V3z"/>
                </svg>
              </div>
              <div className="text-white">
                <span className="text-xl font-medium">We strive to lead the way in the business </span>
                <span className="text-xl font-medium underline cursor-pointer">know all services</span>
              </div>
            </div>

            {/* Right side arrow */}
            <div className="hidden md:block">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;