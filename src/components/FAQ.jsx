'use client';
import { useState } from 'react';
import faqData from '../data/faq.json';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('General');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  // Calculate dynamic height based on FAQ count
  const calculateMobileHeight = () => {
    const faqCount = faqData[activeTab]?.length || 0;
    // More precise calculation: Base height + FAQ items + spacing
    // Each FAQ item: 80px + 12px gap, Tab nav: ~60px, Padding: ~48px
    return faqCount * 92 + 108; // Tighter fit to content
  };

  return (
    <div className="w-full bg-[#F6F5EF] py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract Geometric Background Elements - Inspired by AboutUs */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {/* Top area geometric elements */}
        <div className="absolute top-8 left-12 w-16 h-16 border border-blue-300/50 rounded-full"></div>
        <div className="absolute top-4 right-20 w-8 h-8 bg-blue-200/45 transform rotate-45"></div>
        <div className="absolute top-20 right-8 w-4 h-4 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-2 left-28 w-2 h-2 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-12 right-32 w-6 h-6 bg-blue-100/45 rounded-full"></div>
        <div className="absolute top-28 left-40 w-1 h-8 bg-blue-300/40 rounded-full transform rotate-30"></div>
        <div className="absolute top-32 right-48 w-4 h-4 border-2 border-blue-400/45 transform rotate-45"></div>
        <div className="absolute top-6 left-52 w-3 h-3 bg-blue-200/50 transform rotate-15"></div>
        <div className="absolute top-18 right-56 w-5 h-5 border border-blue-300/45 rounded-full"></div>
        
        {/* Header area abstract shapes */}
        <div className="absolute top-16 left-1/5 w-1 h-12 bg-blue-300/40 rounded-full transform rotate-12"></div>
        <div className="absolute top-24 right-1/4 w-5 h-5 border-2 border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-8 left-1/4 w-3 h-3 bg-blue-200/50 transform rotate-12"></div>
        <div className="absolute top-30 right-1/5 w-6 h-6 border border-blue-300/50 rounded-full"></div>
        <div className="absolute top-36 left-1/3 w-4 h-4 bg-blue-400/45 rounded-full"></div>
        
        {/* Side area enhancements - positioned outside main container */}
        <div className="absolute top-1/3 left-4 w-10 h-10 border border-blue-300/45 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-6 h-6 bg-blue-100/50 transform rotate-12"></div>
        <div className="absolute top-2/5 left-8 w-1 h-1 bg-blue-300/60 rounded-full"></div>
        <div className="absolute top-3/5 right-12 w-4 h-4 border border-blue-200/50 transform rotate-45"></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-blue-100/45 transform rotate-30"></div>
        <div className="absolute top-2/3 right-16 w-2 h-2 bg-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-4/5 left-12 w-7 h-7 bg-blue-300/50 transform rotate-25"></div>
        <div className="absolute top-1/4 right-20 w-3 h-3 border border-blue-400/50 rounded-full"></div>
        
        {/* Middle area additional elements */}
        <div className="absolute top-1/4 left-6 w-9 h-9 border border-blue-200/45 rounded-full"></div>
        <div className="absolute top-3/4 right-10 w-5 h-5 bg-blue-300/50 transform rotate-45"></div>
        <div className="absolute top-1/3 right-4 w-3 h-3 border-2 border-blue-400/55 rounded-full"></div>
        <div className="absolute top-2/3 left-16 w-1 h-9 bg-blue-200/45 rounded-full transform rotate-25"></div>
        <div className="absolute top-5/6 right-6 w-6 h-6 bg-blue-100/50 transform rotate-30"></div>
        
        {/* Bottom area geometric pattern */}
        <div className="absolute bottom-16 left-1/5 w-10 h-10 border-2 border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-24 right-1/5 w-2 h-12 bg-blue-300/45 rounded-full transform rotate-25"></div>
        <div className="absolute bottom-20 left-1/6 w-4 h-4 bg-blue-400/50 rounded-full"></div>
        <div className="absolute bottom-12 right-1/6 w-6 h-6 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute bottom-28 left-1/4 w-1 h-8 bg-blue-300/45 rounded-full transform rotate-40"></div>
        <div className="absolute bottom-18 right-1/4 w-7 h-7 border-2 border-blue-100/50 rounded-full"></div>
        <div className="absolute bottom-8 left-1/3 w-3 h-3 bg-blue-200/55 transform rotate-15"></div>
        <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-blue-400/50 rounded-full transform rotate-60"></div>
        <div className="absolute bottom-4 left-2/5 w-8 h-8 border border-blue-300/45 transform rotate-30"></div>
        <div className="absolute bottom-36 right-2/5 w-2 h-6 bg-blue-200/50 rounded-full transform rotate-45"></div>
        
        {/* Large background circles for depth */}
        <div className="absolute -top-16 -right-16 w-24 h-24 border border-blue-200/40 rounded-full"></div>
        <div className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-br from-blue-100/25 to-transparent rounded-full"></div>
        <div className="absolute -bottom-12 -right-6 w-18 h-18 border border-blue-100/45 rounded-full"></div>
        <div className="absolute top-1/5 -left-6 w-16 h-16 border border-blue-200/40 rounded-full"></div>
        <div className="absolute -bottom-8 left-1/4 w-22 h-22 bg-gradient-to-bl from-blue-50/20 to-transparent rounded-full"></div>
        <div className="absolute top-2/3 -right-10 w-14 h-14 border border-blue-300/35 rounded-full"></div>
        
        {/* Abstract scattered dots */}
        <div className="absolute top-32 left-3/4 w-1 h-1 bg-blue-400/60 rounded-full"></div>
        <div className="absolute top-48 left-1/8 w-1 h-1 bg-blue-300/55 rounded-full"></div>
        <div className="absolute bottom-32 left-2/3 w-1 h-1 bg-blue-200/50 rounded-full"></div>
        <div className="absolute top-40 right-1/8 w-1 h-1 bg-blue-400/55 rounded-full"></div>
        <div className="absolute top-56 left-1/4 w-1 h-1 bg-blue-300/60 rounded-full"></div>
        <div className="absolute bottom-40 right-2/3 w-1 h-1 bg-blue-200/55 rounded-full"></div>
        <div className="absolute top-64 right-1/4 w-1 h-1 bg-blue-400/50 rounded-full"></div>
        <div className="absolute bottom-48 left-1/4 w-1 h-1 bg-blue-300/55 rounded-full"></div>
        
        {/* Connecting lines for modern tech feel */}
        <div className="absolute top-20 left-1/3 w-16 h-0.5 bg-blue-200/45 transform rotate-15"></div>
        <div className="absolute bottom-1/4 right-1/3 w-12 h-0.5 bg-blue-300/40 transform -rotate-12"></div>
        <div className="absolute top-1/4 left-2/3 w-14 h-0.5 bg-blue-400/45 transform rotate-30"></div>
        <div className="absolute bottom-1/3 right-2/3 w-10 h-0.5 bg-blue-200/40 transform -rotate-25"></div>
        <div className="absolute top-3/4 left-1/2 w-8 h-0.5 bg-blue-300/45 transform rotate-45"></div>
        <div className="absolute bottom-2/3 right-1/2 w-12 h-0.5 bg-blue-400/40 transform -rotate-35"></div>
        
        {/* Additional geometric variety */}
        <div className="absolute top-1/5 right-1/6 w-4 h-4 border border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-1/5 left-1/6 w-5 h-1 bg-blue-300/45 rounded-full transform rotate-30"></div>
        <div className="absolute top-1/6 left-2/3 w-5 h-5 border-2 border-blue-400/50 transform rotate-60"></div>
        <div className="absolute bottom-1/6 right-2/3 w-2 h-5 bg-blue-200/45 rounded-full transform rotate-45"></div>
        <div className="absolute top-4/5 left-1/8 w-3 h-3 bg-blue-300/55 transform rotate-30"></div>
        <div className="absolute bottom-4/5 right-1/8 w-4 h-1 bg-blue-400/45 rounded-full transform rotate-15"></div>
        <div className="absolute top-5/6 right-3/4 w-6 h-6 border border-blue-200/50 rounded-full"></div>
        <div className="absolute bottom-5/6 left-3/4 w-2 h-7 bg-blue-300/50 rounded-full transform rotate-50"></div>
      </div>

      <div className="max-w-[1348px] mx-auto relative z-10">
        
        {/* Mobile Header - Outside white container */}
        <div className="lg:hidden text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
              <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
            </div>
            <span className="text-gray-700 ml-2" style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '25px',
              letterSpacing: '0%'
            }}>FAQ'S</span>
          </div>
          
          <h2 className="font-semibold text-gray-900" style={{
            width: '100%',
            maxWidth: '401px',
            height: '78px',
            opacity: 1,
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '39px',
            letterSpacing: '-2%',
            textAlign: 'center',
            margin: '0 auto 8px auto'
          }}>
            Most Popular Questions
          </h2>
        </div>

        {/* White rounded container for the entire FAQ section */}
        <div className="bg-white p-6 md:p-8 lg:p-12 lg:min-h-[600px]" style={{
          width: '100%',
          maxWidth: '1349px',
          height: 'auto',
          minHeight: `${calculateMobileHeight()}px`,
          opacity: 1,
          borderRadius: '20px'
        }}>
          <div className="flex flex-col lg:flex-row lg:items-start">
            
            {/* Desktop Header - Inside white container */}
            <div className="hidden lg:block space-y-8 lg:flex-shrink-0 lg:mr-8">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="text-gray-700 ml-2" style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '26px',
                  lineHeight: '33px',
                  letterSpacing: '0%'
                }}>FAQ'S</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Most<br />
                Popular<br />
                Questions
              </h2>
            </div>

            {/* FAQ Content Section */}
            <div className="space-y-6 lg:space-y-8 lg:flex-1">
              
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                {Object.keys(faqData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={activeTab === tab ? {
                      background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)'
                    } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
                {faqData[activeTab].map((faq) => (
                  <div
                    key={faq.id}
                    className={`border transition-all duration-300 ${
                      expandedFAQ === faq.id
                        ? 'border-blue-200'
                        : 'border-gray-200'
                    }`}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      height: expandedFAQ === faq.id ? 'auto' : '80px',
                      minHeight: '80px',
                      opacity: 1,
                      borderRadius: '12px',
                      borderWidth: '1px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      ...(expandedFAQ === faq.id ? {
                        background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                      } : {
                        background: 'white'
                      })
                    }}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex-1 text-left transition-colors duration-200 flex flex-col justify-center"
                    >
                      <div className="flex items-start justify-between w-full h-full">
                        <div className="flex-1 pr-3 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              expandedFAQ === faq.id
                                ? 'text-gray-700'
                                : 'text-white'
                            }`}
                            style={expandedFAQ === faq.id ? {
                              background: 'linear-gradient(193.06deg, #F1F0FB 5.92%, #EAE8FF 89.21%)'
                            } : {
                              background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)'
                            }}
                            >
                              {faq.category}
                            </span>
                          </div>
                          <h3 className={`font-semibold leading-tight ${
                            expandedFAQ === faq.id ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.3',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            hyphens: 'auto',
                            display: '-webkit-box',
                            WebkitLineClamp: expandedFAQ === faq.id ? 'unset' : 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: expandedFAQ === faq.id ? 'visible' : 'hidden'
                          }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedFAQ === faq.id ? (
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-all duration-200">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-200 hover:bg-gray-200">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {/* Expanded Content */}
                    {expandedFAQ === faq.id && (
                      <div className="pt-3 border-t border-white/20" style={{ marginTop: '12px' }}>
                        <p className="text-white/90 leading-relaxed text-sm" 
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto'
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}