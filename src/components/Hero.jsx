import React from 'react';

// Main side card component
const SideCard = ({ imgUrl, title, description, overlayCard, className = "", positionStyle = {} }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl overflow-hidden w-64 h-80">
        <div className="h-48 overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
     
      {/* Overlay Card */}
      {overlayCard && (
        <div
          className="absolute bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-xl w-48 z-10 border border-white/20"
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
     
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"></div>
      </div>
     
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
         
          {/* Left Card with Overlay - Portfolio card */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end mt-24 relative z-40">
            <SideCard
              imgUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop"
              title="Analytics"
              description="Real-time insights and data"
              overlayCard={
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Portfolio</p>
                      <p className="text-xs text-gray-500">Active</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-1">$24,500</p>
                  <p className="text-sm text-green-600 font-medium">+12.5%</p>
                </div>
              }
              positionStyle={{ bottom: '-1.5rem', right: '-1.5rem' }}
            />
          </div>
         
          {/* Center Content */}
          <div className="lg:col-span-6 text-center px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900 text-center max-w-4xl mx-auto">
              <span className="block whitespace-nowrap">We're here to help you</span>
              <span className="block whitespace-nowrap">achieve financial success</span>
            </h1>
           
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Achieve financial success through personalized strategies and expert guidance tailored to your unique goals and circumstances.
            </p>
           
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-base">
                Get Started
              </button>
              <button className="px-10 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-base">
                Try Now
              </button>
            </div>
          </div>
         
          {/* Right Card with Overlay - Real-time Analytics card */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start mt-24">
            <SideCard
              imgUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop"
              title="Real-time"
              description="Analytics Data Dashboard"
              overlayCard={
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Analytics</p>
                      <p className="text-xs text-gray-500">Real-time</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-1">94.2%</p>
                  <p className="text-sm text-green-600 font-medium">+2.1%</p>
                </div>
              }
              positionStyle={{ bottom: '-1.5rem', left: '-1.5rem' }}
            />
          </div>
        </div>
       
        {/* Bottom Cards Row - Ray S. Anderson card with higher z-index */}
        <div className="absolute bottom-12 left-0 right-0 z-30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
             
              {/* Bottom Left Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-5 shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-base">Investments</p>
                    <p className="text-sm text-gray-500">Diversified Portfolio</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">$45,890</p>
                <p className="text-base text-green-600 font-medium">+15.3%</p>
              </div>
             
              {/* Bottom Right Card - Ray S. Anderson with higher z-index */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/20 relative z-40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-base">Ray S. Anderson</p>
                    <p className="text-sm text-gray-500">Account Balance</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">$12,340</p>
                <p className="text-base text-green-600 font-medium">+8.2%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}