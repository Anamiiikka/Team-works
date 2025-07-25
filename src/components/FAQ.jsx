'use client';
import { useState } from 'react';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('General');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = {
    General: [
      {
        id: 1,
        category: 'General',
        question: 'Lorem ipsum dolor sit amet consectetur Netus?',
        answer: 'Lorem ipsum dolor sit amet consectetur. Amet molestie aenean pellentesque turpis est ornare. Mattis congue turpis cursus volutpat mauris ac facilisi.'
      },
      {
        id: 2,
        category: 'General',
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we provide comprehensive ongoing support to ensure your project continues to run smoothly and meets your evolving needs.'
      },
      {
        id: 3,
        category: 'General',
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we provide comprehensive ongoing support to ensure your project continues to run smoothly and meets your evolving needs.'
      }
    ],
    Features: [
      {
        id: 4,
        category: 'Features',
        question: 'What features are included in the basic plan?',
        answer: 'Our basic plan includes all essential features needed to get started with your project, including core functionality and basic support.'
      },
      {
        id: 5,
        category: 'Features',
        question: 'Can I upgrade my plan later?',
        answer: 'Yes, you can upgrade your plan at any time to access additional features and enhanced support options.'
      }
    ],
    Services: [
      {
        id: 6,
        category: 'Services',
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we provide comprehensive ongoing support including maintenance, updates, and technical assistance for all our services.'
      },
      {
        id: 7,
        category: 'Services',
        question: 'What services do you offer?',
        answer: 'We offer a wide range of services including web development, mobile applications, consulting, and digital transformation solutions.'
      }
    ]
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="w-full bg-[#F6F5EF] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1348px] mx-auto relative">
        {/* White rounded container for the entire FAQ section */}
        <div className="bg-white p-8 lg:p-12" style={{
          width: '100%',
          maxWidth: '1349px',
          height: '765px',
          opacity: 1,
          borderRadius: '40px'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Section - Title */}
            <div className="space-y-8">
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

            {/* Right Section - FAQ Content */}
            <div className="space-y-8">
              
              {/* Tab Navigation */}
              <div className="flex gap-4">
                {Object.keys(faqData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
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
                      maxWidth: '447px',
                      minHeight: expandedFAQ === faq.id ? 'auto' : '111px',
                      height: 'auto',
                      opacity: 1,
                      borderRadius: '16px',
                      borderWidth: '1px',
                      padding: '32px',
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      ...(expandedFAQ === faq.id ? {
                        background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)'
                      } : {
                        background: 'white'
                      })
                    }}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full h-full text-left transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 pr-6 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                          <h3 className={`text-lg font-semibold ${
                            expandedFAQ === faq.id ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            hyphens: 'auto'
                          }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedFAQ === faq.id ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              expandedFAQ === faq.id ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-200 hover:bg-gray-200">
                              <svg
                                className="w-5 h-5 text-gray-600"
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
                      <div className="pt-4 border-t border-white/20" style={{ marginTop: '16px' }}>
                        <p className="text-white/90 leading-relaxed" 
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
