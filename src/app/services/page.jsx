'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Debt Syndication",
      description: "At Team Work Advisors Pvt Ltd, we specialize in designing and executing customized debt solutions that support business growth, expansion, and restructuring. Whether you're looking for long-term term loans, structured finance, ECBs, or asset-based lending, our team brings the financial structuring expertise and market access needed to secure the best possible funding options. With strong relationships across banks, NBFCs, and financial institutions, we handle the entire syndication process—from proposal preparation and lender negotiations to disbursement and compliance—ensuring a smooth and strategic flow of capital.",
      punchline: "Strategic Capital. Structured Solutions. Delivered Right."
    },
    {
      id: 2,
      title: "Working Capital Management",
      description: "Effective working capital management is critical to maintaining liquidity, meeting short-term obligations, and sustaining smooth business operations. Our experts assess your current cash cycle and identify areas for optimization, helping you unlock capital tied up in receivables and inventories. We assist in securing fund-based and non-fund-based facilities such as overdrafts, invoice financing, supply chain finance, and trade credit. Through careful financial planning and execution, we help businesses maintain financial agility and operational efficiency in a competitive environment.",
      punchline: "Fueling Day-to-Day Operations with Smart Capital Solutions."
    },
    {
      id: 3,
      title: "Project Financing",
      description: "We provide comprehensive project financing solutions tailored for infrastructure, industrial, and business expansion projects. From initial feasibility studies and financial modeling to debt-equity structuring and investor sourcing, we manage every step of the financing journey. Our team works closely with clients to understand project timelines, capital requirements, and risk parameters, while also advising on government subsidies, incentives, and compliance. With a deep understanding of sector dynamics and capital markets, we ensure your vision is adequately funded and strategically positioned for success.",
      punchline: "Transforming Ambitious Projects into Funded Realities."
    },
    {
      id: 4,
      title: "Capital Advisory",
      description: "Capital is the foundation of business growth, and structuring it strategically is essential for maximizing returns and maintaining control. At Team Work Advisors, we help businesses evaluate their capital structure, forecast future funding requirements, and identify the most efficient financing instruments—whether it's equity issuance, convertible instruments, or private placements. Our team provides insightful guidance on dilution, cost of capital, and long-term planning to ensure financial stability and scalability.",
      punchline: "Empowering Business Growth Through Smarter Capital Architecture."
    },
    {
      id: 5,
      title: "Business Restructuring & Turnaround Advisory",
      description: "In times of financial stress, businesses need a reliable partner to restore balance and drive recovery. Our restructuring and turnaround advisory services are designed to help organizations reconfigure their financial strategy, renegotiate debt, improve cash flows, and return to profitability. We conduct detailed risk assessments, develop actionable restructuring plans, advise on asset monetization, and guide clients through insolvency processes if required. Our aim is to restore financial health, protect stakeholder interests, and reposition the business for sustainable growth.",
      punchline: "From Financial Distress to Strategic Recovery—We Make It Happen."
    },
    {
      id: 6,
      title: "Venture Capital & MSME Funding",
      description: "We understand the challenges startups and MSMEs face when seeking early-stage and growth capital. Our specialized advisory services are designed to help emerging businesses become investor-ready, prepare compelling business plans, and connect with the right network of venture capitalists, angel investors, and financial institutions. We also facilitate access to government-backed schemes and MSME loan programs. From pitch to closure, we stay engaged throughout the fundraising journey to ensure your growth plans are well-capitalized and future-ready.",
      punchline: "Backing Innovation and MSMEs with the Right Capital at the Right Time."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F5EF' }}>
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          
          {/* Large background circles for depth */}
          <div className="absolute -top-20 -right-20 w-40 h-40 border border-gray-200/20 rounded-full"></div>
          <div className="absolute top-1/3 -left-12 w-32 h-32 bg-gradient-to-br from-blue-100/15 to-transparent rounded-full"></div>
          <div className="absolute -bottom-16 -right-8 w-28 h-28 border border-blue-100/25 rounded-full"></div>
          <div className="absolute top-1/4 -left-8 w-24 h-24 border border-blue-200/20 rounded-full"></div>
          <div className="absolute -top-16 left-1/3 w-36 h-36 bg-gradient-to-bl from-blue-50/10 to-transparent rounded-full"></div>
          
          {/* Connecting lines for modern tech feel */}
          <div className="absolute top-24 left-1/2 w-24 h-0.5 bg-blue-200/25 transform rotate-15"></div>
          <div className="absolute bottom-1/3 right-1/2 w-16 h-0.5 bg-blue-300/20 transform -rotate-12"></div>
          <div className="absolute top-1/3 left-1/3 w-20 h-0.5 bg-blue-400/25 transform rotate-30"></div>
          <div className="absolute bottom-1/2 right-1/3 w-18 h-0.5 bg-blue-200/20 transform -rotate-25"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Header with overlapping arrows */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="relative">
                <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
              </div>
              <span className="font-medium ml-2" style={{ color: '#000000' }}>Our Services</span>
            </div>
            
            {/* Main heading */}
            <h1 className="font-bold text-gray-900 leading-tight mb-6"
                style={{
                  fontSize: 'clamp(32px, 5vw, 53px)',
                  lineHeight: 'clamp(40px, 6vw, 78px)',
                  letterSpacing: '-2%'
                }}>
              Services We Offer
            </h1>
            
            {/* Description */}
            <p className="font-normal max-w-4xl mx-auto text-justify"
               style={{ 
                 fontFamily: 'Inter',
                 fontWeight: 600,
                 fontSize: 'clamp(16px, 2.5vw, 22px)',
                 lineHeight: 'clamp(24px, 3.5vw, 33px)',
                 letterSpacing: '0%',
                 color: '#6C7278',
                 textAlign: 'center'
               }}>
              We provide comprehensive financial advisory services designed to fuel your business growth and navigate complex financial landscapes with strategic expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={service.id} className="relative">
                {/* Service Number and Title */}
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mr-6" 
                       style={{ background: 'linear-gradient(180deg, #AAC5EA 0%, #2C87BB 100%)' }}>
                    <span className="text-white font-bold text-xl">{service.id}</span>
                  </div>
                  <h3 className="font-bold text-gray-900"
                      style={{
                        fontSize: 'clamp(24px, 4vw, 36px)',
                        lineHeight: 'clamp(28px, 4.5vw, 42px)',
                        color: '#1F2937'
                      }}>
                    {service.title}
                  </h3>
                </div>
                
                {/* Service Description */}
                <div className="ml-20">
                  <p className="font-normal mb-6 text-justify"
                     style={{ 
                       fontFamily: 'Inter',
                       fontWeight: 400,
                       fontSize: 'clamp(20px, 2.5vw, 18px)',
                       lineHeight: 'clamp(24px, 3.5vw, 28px)',
                       letterSpacing: '0%',
                       color: 'black',
                       textAlign: 'justify',
                       textJustify: 'inter-word'
                     }}>
                    {service.description}
                  </p>
                  
                  {/* Punchline */}
                  <div className="border-l-4 border-blue-500 pl-6 mb-8">
                    <p className="font-semibold italic"
                       style={{
                         fontSize: 'clamp(16px, 2.8vw, 20px)',
                         lineHeight: 'clamp(20px, 3.2vw, 26px)',
                         color: '#036DA9'
                       }}>
                      "{service.punchline}"
                    </p>
                  </div>
                </div>
                
                {/* Separator Line (except for last item) */}
                {index < services.length - 1 && (
                  <div className="mt-12 mb-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl text-center relative overflow-hidden">
            {/* Background geometric elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-4 right-4 w-16 h-16 border border-blue-300/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-100/40 rounded-full"></div>
              <div className="absolute top-1/2 left-8 w-8 h-8 bg-blue-200/50 transform rotate-45"></div>
              <div className="absolute top-8 left-1/3 w-12 h-12 border border-blue-400/30 transform rotate-12"></div>
            </div>
            
            <div className="relative z-10">
              {/* CTA Header */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#000000' }}>Ready to Transform Your Business?</span>
              </div>
              
              {/* CTA Title */}
              <h2 className="font-bold text-gray-900 leading-tight mb-6"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    lineHeight: 'clamp(36px, 5vw, 52px)'
                  }}>
                Let's Build Your Financial Future Together
              </h2>
              
              
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact-us">
                  <button className="text-white font-medium px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto" 
                    style={{
                      background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                      boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)',
                      minWidth: '200px'
                    }}
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                
              </div>
              
              {/* Contact Info */}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;