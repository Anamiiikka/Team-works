'use client'
import React, { useState } from 'react';
import { Star, TrendingUp, User, BarChart3, Diamond } from 'lucide-react';

// Smart Finance Kicker - positioned below heading with one-line text
const SmartFinanceKicker = () => {
  return (
    <div 
      className="smart-finance-kicker-wrapper" 
      style={{ 
        margin: '16px 0 32px 0', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 100
      }}
    >
      <div 
        className="inline-flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
        style={{
          width: '260px',
          height: '42px',
          borderRadius: '12px',
          padding: '10px 20px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          position: 'relative',
          zIndex: 101,
          whiteSpace: 'nowrap'
        }}
      >
        <Diamond className="w-5 h-5 text-blue-600" style={{ fill: 'currentColor' }} />
        <span style={{ 
          color: '#374151', 
          fontSize: '15px', 
          fontWeight: '600',
          whiteSpace: 'nowrap'
        }}>
          Smart Finance, smart living
        </span>
      </div>
    </div>
  );
};

// Main side card component
const SideCard = ({ imgUrl, overlayCard, className = "", positionStyle = {} }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden w-56 h-80 lg:w-56 lg:h-80 md:w-44 md:h-64 sm:w-36 sm:h-52">
        <div className="h-full overflow-hidden">
          <img
            src={imgUrl}
            alt="Card background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
     
      {overlayCard && (
        <div
          className="absolute bg-white/40 backdrop-blur-sm rounded-lg p-4 shadow-xl w-52 z-10 border border-white/30 lg:w-52 lg:p-4 md:w-40 md:p-3 sm:w-32 sm:p-2"
          style={{
            ...positionStyle,
          }}
        >
          {overlayCard}
        </div>
      )}
    </div>
  );
};

const CombinedCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div 
      className="relative bg-white/60 backdrop-blur-sm rounded-[20px] shadow-xl border-[1.31px] border-white/30 overflow-hidden"
      style={{
        width: '680px', // Expanded from 520px
        height: '180px',
        minWidth: '340px', // Adjusted proportionally
        padding: '8px',
        gap: '8px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.5) 100%)',
        position: 'relative',
        marginTop: '80px' // Shifted downward
      }}
    >
      <div className="flex gap-2 h-full">
        {/* Blue Cash Flow Management Card */}
        <div 
          className="relative overflow-hidden shadow-2xl flex-1 cursor-pointer transition-all duration-300 ease-in-out transform"
          style={{
            borderRadius: '10px',
            border: '1.31px solid rgba(255, 255, 255, 0.2)',
            background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2E5984 100%)',
            zIndex: hoveredCard === 'cashflow' ? 20 : 10,
            transform: hoveredCard === 'cashflow' ? 'scale(1.02) translateZ(0)' : 'scale(1) translateZ(0)'
          }}
          onMouseEnter={() => setHoveredCard('cashflow')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Decorative circles */}
          <div className="absolute inset-0">
            <div className="absolute top-4 right-8 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-8 right-4 w-8 h-8 bg-white/8 rounded-full"></div>
            <div className="absolute bottom-6 right-12 w-6 h-6 bg-white/6 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 rounded-full"></div>
            {/* Additional circles for wider card */}
            <div className="absolute top-6 right-20 w-4 h-4 bg-white/5 rounded-full"></div>
            <div className="absolute bottom-8 right-24 w-5 h-5 bg-white/7 rounded-full"></div>
          </div>

          {/* Best Offer Badge */}
          <div 
            className="absolute top-2 right-2 text-white text-xs font-medium px-2 py-1 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Best Offer
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-white text-lg font-semibold mb-2">Yearly</h2>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span className="text-xs">Save 50%</span>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span className="text-xs">Get 7 Days free</span>
                </div>
              </div>
            </div>

            <div>
              <div 
                className="inline-block px-3 py-1.5 rounded-md mb-2 text-white text-xs font-medium"
                style={{
                  background: 'rgba(138, 43, 226, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Cash flow management
              </div>
              
              <div className="text-white">
                <span className="text-lg font-bold">Rs6000</span>
                <span className="text-sm ml-1 opacity-80">Yearly</span>
              </div>
            </div>
          </div>
        </div>

        {/* White Buy Subscription Card */}
        <div 
          className="relative bg-white rounded-[12px] flex-1 p-4 cursor-pointer transition-all duration-300 ease-in-out transform shadow-lg"
          style={{
            zIndex: hoveredCard === 'subscription' ? 20 : 10,
            transform: hoveredCard === 'subscription' ? 'scale(1.02) translateZ(0)' : 'scale(1) translateZ(0)'
          }}
          onMouseEnter={() => setHoveredCard('subscription')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-semibold text-sm leading-tight">All your paid packs in one place</p>
              </div>
            </div>
            
            <h3 className="text-gray-900 text-lg font-bold mb-2">Buy Subscription</h3>
            
            <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur. Dolor pulvinar sed dui gravida ligula nunc posuere neque laoreet. Massa consectetur scelerisque fauc et.
            </p>
            
            <div className="mt-auto">
              <button className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1">
                Learn More
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Component
export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white overflow-hidden relative">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl lg:w-96 lg:h-96 md:w-64 md:h-64 sm:w-32 sm:h-32 sm:top-10 sm:left-10"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl lg:w-96 lg:h-96 md:w-64 md:h-64 sm:w-32 sm:h-32 sm:bottom-10 sm:right-10"></div>
      </div>
     
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 lg:px-6 lg:py-24 md:px-4 md:py-20 sm:px-3 sm:py-16" style={{ paddingTop: '120px' }}>
        <div className="relative max-w-7xl mx-auto w-full">
          
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-8">
            <div className="text-center px-4">
              
              {/* Main heading first - Mobile */}
              <h1 className="text-2xl font-bold mb-4 leading-none text-gray-900 sm:text-xl">
                <span className="block">We're here to help you</span>
                <span className="block">achieve financial success</span>
              </h1>

              {/* Smart Finance Kicker below heading - Mobile */}
              <SmartFinanceKicker />
             
              <p className="text-sm text-gray-600 mb-4 leading-relaxed sm:text-xs">
                Achieve financial success through personalized strategies and expert guidance tailored to your unique goals.
              </p>
             
              <div className="flex flex-col gap-3 items-center -mt-1">
                <button 
                  className="bg-black text-white font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center relative"
                  style={{
                    width: '120px',        // Reduced from 150px
                    height: '40px',        // Reduced from 51px
                    borderRadius: '240px',
                    opacity: 1,
                    fontSize: '12px',      // Reduced from 14px
                    fontWeight: '600'
                  }}
                >
                  {/* Icon with adjusted positioning */}
                  <div
                    className="absolute"
                    style={{
                      width: '32px',         // Reduced from 40px
                      height: '32px',        // Reduced from 40px
                      top: '4px',            // Adjusted from 6px
                      left: '6px',           // Adjusted from 7px
                      opacity: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </div>
                  
                  {/* Button text - adjusted for smaller icon space */}
                  <span style={{ marginLeft: '16px' }}>Get Started</span>
                </button>
                
                <button 
                  className="bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                  style={{
                    width: '120px',        // Reduced from 150px
                    height: '40px',        // Reduced from 51px
                    borderRadius: '240px',
                    opacity: 1,
                    fontSize: '12px',      // Reduced from 14px
                    fontWeight: '600'
                  }}
                >
                  Get a Demo
                </button>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="flex justify-center px-4">
              <SideCard
                imgUrl="/left.png"
                overlayCard={
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full overflow-hidden bg-blue-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">Growth Analytics</p>
                      <p className="text-[8px] text-gray-500 mb-2">Financial Success</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">↗ 28.4%</p>
                    <p className="text-xs text-green-600 font-medium">+$15.2K</p>
                  </div>
                }
                positionStyle={{ bottom: '-2rem', right: '-0.75rem' }}
              />
            </div>

            {/* Mobile Combined Card */}
            <div className="px-4 flex justify-center">
              <div className="w-full max-w-sm">
                <CombinedCard />
              </div>
            </div>

            <div className="flex justify-center px-4">
              <SideCard
                imgUrl="/right.png"
                overlayCard={
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full overflow-hidden bg-green-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">Performance</p>
                      <p className="text-[8px] text-gray-500 mb-2">Real-time</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">94.2%</p>
                    <p className="text-xs text-green-600 font-medium">+2.1%</p>
                  </div>
                }
                positionStyle={{ bottom: '-2rem', left: '-0.75rem' }}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
           
            <div className="lg:col-span-3 flex justify-center lg:justify-end mt-32 relative z-50">
              <SideCard
                imgUrl="/left.png"
                overlayCard={
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden bg-blue-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Growth Analytics</p>
                      <p className="text-xs text-gray-500 mb-2">Financial Success</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1">↗ 28.4%</p>
                    <p className="text-sm text-green-600 font-medium">+$15.2K</p>
                  </div>
                }
                positionStyle={{ bottom: '-3rem', right: '-1.5rem', zIndex: 100 }}
              />
            </div>
           
            <div className="lg:col-span-6 text-center px-6 pt-0">
              <SmartFinanceKicker />
              {/* Main heading first - Desktop */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-none text-gray-900 text-center max-w-4xl mx-auto">
                <span className="block whitespace-nowrap">We're here to help you</span>
                <span className="block whitespace-nowrap">achieve financial success</span>
              </h1>
             
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Achieve financial success through personalized strategies and expert guidance tailored to your unique goals and circumstances.
              </p>
             
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center -mt-2">
                <button 
                  className="bg-black text-white font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center relative"
                  style={{
                    width: '120px',        // Reduced from 150px
                    height: '40px',        // Reduced from 51px
                    borderRadius: '240px',
                    opacity: 1,
                    fontSize: '12px',      // Reduced from 14px
                    fontWeight: '600'
                  }}
                >
                  {/* Icon with adjusted positioning */}
                  <div
                    className="absolute"
                    style={{
                      width: '32px',         // Reduced from 40px
                      height: '32px',        // Reduced from 40px
                      top: '4px',            // Adjusted from 6px
                      left: '6px',           // Adjusted from 7px
                      opacity: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </div>
                  
                  {/* Button text - adjusted for smaller icon space */}
                  <span style={{ marginLeft: '16px' }}>Get Started</span>
                </button>
                
                <button 
                  className="bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                  style={{
                    width: '120px',        // Reduced from 150px
                    height: '40px',        // Reduced from 51px
                    borderRadius: '240px',
                    opacity: 1,
                    fontSize: '12px',      // Reduced from 14px
                    fontWeight: '600'
                  }}
                >
                  Get a Demo
                </button>
              </div>
            </div>
           
            <div className="lg:col-span-3 flex justify-center lg:justify-start mt-16">
              <SideCard
                imgUrl="/right.png"
                overlayCard={
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden bg-green-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Performance</p>
                      <p className="text-xs text-gray-500 mb-2">Real-time</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1">94.2%</p>
                    <p className="text-sm text-green-600 font-medium">+2.1%</p>
                  </div>
                }
                positionStyle={{ bottom: '-5rem', left: '-1.5rem' }}
              />
            </div>
          </div>
        </div>
       
        {/* Desktop Combined Card */}
        <div className="hidden lg:block absolute bottom-4 left-0 right-0 z-30 lg:bottom-12 md:bottom-8">
          <div className="max-w-5xl mx-auto px-4 lg:px-6 flex justify-center">
            <CombinedCard />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 leading-tight text-gray-900">
            <span className="block">Trusted By Over <span className="text-blue-600">+10,000</span> Industry leaders</span>
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">N</span>
              </div>
              <span className="font-medium text-gray-700">Notion</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              </div>
              <span className="font-medium text-gray-700">Slack</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              </div>
              <span className="font-medium text-gray-700">Linear</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">A</span>
              </div>
              <span className="font-medium text-gray-700">algoway</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              </div>
              <span className="font-medium text-gray-700">monday</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-red-500 w-1.5 h-1.5"></div>
                  <div className="bg-green-500 w-1.5 h-1.5"></div>
                  <div className="bg-blue-500 w-1.5 h-1.5"></div>
                  <div className="bg-yellow-500 w-1.5 h-1.5"></div>
                </div>
              </div>
              <span className="font-medium text-gray-700">Microsoft</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
