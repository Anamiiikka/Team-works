import React from 'react';
import { Star, TrendingUp, User, BarChart3, Diamond } from 'lucide-react';

// Smart Finance Kicker - positioned below heading
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
          width: '240px',
          height: '42px',
          borderRadius: '12px',
          padding: '10px 20px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          position: 'relative',
          zIndex: 101
        }}
      >
        <Diamond className="w-5 h-5 text-blue-600" style={{ fill: 'currentColor' }} />
        <span style={{ color: '#374151', fontSize: '15px', fontWeight: '600' }}>
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

// Hero Component - Modified for normal document flow
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
                <button className="w-full max-w-xs px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm">
                  Get Started
                </button>
                <button className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-sm">
                  Try Now
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

            <div className="space-y-6 px-4">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Investments</p>
                    <p className="text-xs text-gray-500">Diversified Portfolio</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-1">$45,890</p>
                <p className="text-sm text-green-600 font-medium">+15.3%</p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Ray S. Anderson</p>
                    <p className="text-xs text-gray-500">Account Balance</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-1">$12,340</p>
                <p className="text-sm text-green-600 font-medium">+8.2%</p>
              </div>

              <div className="flex justify-center">
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
              
              {/* Main heading first - Desktop */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-none text-gray-900 text-center max-w-4xl mx-auto">
                <span className="block whitespace-nowrap">We're here to help you</span>
                <span className="block whitespace-nowrap">achieve financial success</span>
              </h1>

              {/* Smart Finance Kicker below heading - Desktop */}
              <SmartFinanceKicker />
             
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Achieve financial success through personalized strategies and expert guidance tailored to your unique goals and circumstances.
              </p>
             
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center -mt-2">
                <button className="px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-base">
                  Get Started
                </button>
                <button className="px-10 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-base">
                  Try Now
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
       
        <div className="hidden lg:block absolute bottom-4 left-0 right-0 z-30 lg:bottom-12 md:bottom-8">
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto sm:grid-cols-2 sm:gap-6">
             
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/30 lg:p-5 md:p-4 relative z-20">
                <div className="flex items-center gap-2 mb-2 lg:gap-3 lg:mb-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center lg:w-8 lg:h-8">
                    <TrendingUp className="w-3 h-3 text-purple-500 lg:w-4 lg:h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">Investments</p>
                    <p className="text-xs text-gray-500 lg:text-sm">Diversified Portfolio</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1 lg:text-2xl">$45,890</p>
                <p className="text-sm text-green-600 font-medium lg:text-base">+15.3%</p>
              </div>
             
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/30 relative z-40 lg:p-5 md:p-4">
                <div className="flex items-center gap-2 mb-2 lg:gap-3 lg:mb-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                    <User className="w-3 h-3 text-pink-500 lg:w-4 lg:h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">Ray S. Anderson</p>
                    <p className="text-xs text-gray-500 lg:text-sm">Account Balance</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1 lg:text-2xl">$12,340</p>
                <p className="text-sm text-green-600 font-medium lg:text-base">+8.2%</p>
              </div>
            </div>
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
