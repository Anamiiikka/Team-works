import React from 'react';

// Main side card component
const SideCard = ({ imgUrl, title, description, overlayCard, className = "", positionStyle = {} }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Card - Fully Responsive */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden w-56 h-80 lg:w-56 lg:h-80 md:w-44 md:h-64 sm:w-36 sm:h-52">
        <div className="h-48 overflow-hidden lg:h-48 md:h-32 sm:h-26">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="p-5 md:p-3 sm:p-2">
          <h3 className="text-lg font-bold text-white mb-1 md:text-sm sm:text-xs">{title}</h3>
          <p className="text-white/80 text-sm md:text-xs sm:text-[8px]">{description}</p>
        </div>
      </div>
     
      {/* Overlay Card - Fully Responsive */}
      {overlayCard && (
        <div
          className="absolute bg-white/70 backdrop-blur-md rounded-lg p-4 shadow-xl w-44 z-10 border border-white/20 lg:w-44 lg:p-4 md:w-32 md:p-3 sm:w-24 sm:p-2"
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

// Hero Component
export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white relative overflow-hidden">
     
      {/* Background decorative elements - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl lg:w-96 lg:h-96 md:w-64 md:h-64 sm:w-32 sm:h-32 sm:top-10 sm:left-10"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl lg:w-96 lg:h-96 md:w-64 md:h-64 sm:w-32 sm:h-32 sm:bottom-10 sm:right-10"></div>
      </div>
     
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 lg:px-6 lg:py-20 md:px-4 md:py-12 sm:px-3 sm:py-8">
        {/* Content Container - Mobile First Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Mobile Layout (stacked) - UPDATED */}
          <div className="block lg:hidden space-y-8">
            
            {/* Mobile Center Content First */}
            <div className="text-center px-4">
              <h1 className="text-2xl font-bold mb-6 leading-tight text-gray-900 sm:text-xl">
                <span className="block">We're here to help you</span>
                <span className="block">achieve financial success</span>
              </h1>
             
              <p className="text-sm text-gray-600 mb-6 leading-relaxed sm:text-xs">
                Achieve financial success through personalized strategies and expert guidance tailored to your unique goals.
              </p>
             
              {/* Mobile Action buttons */}
              <div className="flex flex-col gap-3 items-center">
                <button className="w-full max-w-xs px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm">
                  Get Started
                </button>
                <button className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-sm">
                  Try Now
                </button>
              </div>
            </div>

            {/* Mobile Big Side Card - Analytics first */}
            <div className="flex justify-center px-4">
              <SideCard
                imgUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop"
                title="Analytics"
                description="Real-time insights and data"
                overlayCard={
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">Portfolio</p>
                      <p className="text-[8px] text-gray-500 mb-2">Active</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">$24,500</p>
                    <p className="text-xs text-green-600 font-medium">+12.5%</p>
                  </div>
                }
                positionStyle={{ bottom: '-0.75rem', right: '-0.75rem' }}
              />
            </div>

            {/* Mobile Horizontal Cards Below Big Card */}
            <div className="space-y-6 px-4">
              {/* Investments Card - Mobile Horizontal */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Investments</p>
                    <p className="text-xs text-gray-500">Diversified Portfolio</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-1">$45,890</p>
                <p className="text-sm text-green-600 font-medium">+15.3%</p>
              </div>

              {/* Ray S. Anderson Card - Mobile Horizontal */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Ray S. Anderson</p>
                    <p className="text-xs text-gray-500">Account Balance</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-1">$12,340</p>
                <p className="text-sm text-green-600 font-medium">+8.2%</p>
              </div>

              {/* Real-time Card - Mobile */}
              <div className="flex justify-center">
                <SideCard
                  imgUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop"
                  title="Real-time"
                  description="Analytics Data Dashboard"
                  overlayCard={
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center" 
                          alt="Analytics" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 mb-1">Analytics</p>
                        <p className="text-[8px] text-gray-500 mb-2">Real-time</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mb-1">94.2%</p>
                      <p className="text-xs text-green-600 font-medium">+2.1%</p>
                    </div>
                  }
                  positionStyle={{ bottom: '-0.75rem', left: '-0.75rem' }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout (grid) - UPDATED POSITIONING */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
           
            {/* Left Card - Desktop - Lower position */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end mt-40 relative z-50">
              <SideCard
                imgUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop"
                title="Analytics"
                description="Real-time insights and data"
                overlayCard={
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Portfolio</p>
                      <p className="text-xs text-gray-500 mb-2">Active</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1">$24,500</p>
                    <p className="text-sm text-green-600 font-medium">+12.5%</p>
                  </div>
                }
                positionStyle={{ bottom: '-1.5rem', right: '-1.5rem', zIndex: 100 }}
              />
            </div>
           
            {/* Center Content - Desktop */}
            <div className="lg:col-span-6 text-center px-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-gray-900 text-center max-w-4xl mx-auto">
                <span className="block whitespace-nowrap">We're here to help you</span>
                <span className="block whitespace-nowrap">achieve financial success</span>
              </h1>
             
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Achieve financial success through personalized strategies and expert guidance tailored to your unique goals and circumstances.
              </p>
             
              {/* Desktop Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-base">
                  Get Started
                </button>
                <button className="px-10 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-base">
                  Try Now
                </button>
              </div>
            </div>
           
            {/* Right Card - Desktop - Higher position */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start mt-24">
              <SideCard
                imgUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop"
                title="Real-time"
                description="Analytics Data Dashboard"
                overlayCard={
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center" 
                        alt="Analytics" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Analytics</p>
                      <p className="text-xs text-gray-500 mb-2">Real-time</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1">94.2%</p>
                    <p className="text-sm text-green-600 font-medium">+2.1%</p>
                  </div>
                }
                positionStyle={{ bottom: '-4rem', left: '-1.5rem' }}
              />
            </div>
          </div>
        </div>
       
        {/* Bottom Cards Row - Desktop Only */}
        <div className="hidden lg:block absolute bottom-4 left-0 right-0 z-30 lg:bottom-12 md:bottom-8">
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto sm:grid-cols-2 sm:gap-6">
             
              {/* Bottom Left Card - Desktop - Lower z-index */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/20 lg:p-5 md:p-4 relative z-20">
                <div className="flex items-center gap-2 mb-2 lg:gap-3 lg:mb-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center lg:w-8 lg:h-8">
                    <div className="w-3 h-3 bg-purple-500 rounded lg:w-4 lg:h-4"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">Investments</p>
                    <p className="text-xs text-gray-500 lg:text-sm">Diversified Portfolio</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1 lg:text-2xl">$45,890</p>
                <p className="text-sm text-green-600 font-medium lg:text-base">+15.3%</p>
              </div>
             
              {/* Bottom Right Card - Desktop */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/20 relative z-40 lg:p-5 md:p-4">
                <div className="flex items-center gap-2 mb-2 lg:gap-3 lg:mb-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                    <div className="w-3 h-3 bg-pink-500 rounded-full lg:w-4 lg:h-4"></div>
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
    </div>
  );
}