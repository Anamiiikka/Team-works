'use client';
import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import whoWeAreData from '../data/whoweare.json';

const WhoWeAre = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % whoWeAreData.cards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + whoWeAreData.cards.length) % whoWeAreData.cards.length);
  };

  // Function to render a card
  const renderCard = (card) => (
    <div 
      key={card.id} 
      className="flex-shrink-0 rounded-4xl p-8 text-white border relative bg-[#066FAB] border-[#066FAB]"
      style={{ width: '383px', height: '373px' }}
    >
      <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center mb-4 bg-gradient-to-b from-[#AAC5EA] to-[#2C87BB]">
        <img 
          src={card.icon} 
          alt={card.title} 
          className="object-contain"
          style={{ 
            width: parseInt(card.iconSize.width), 
            height: parseInt(card.iconSize.height) 
          }} 
        />
      </div>
      
      <h3 className="font-semibold mb-3 text-white font-inter text-[30px] leading-[33px] tracking-normal w-[330px] min-h-[43px] overflow-visible">
        {card.title}
      </h3>
      
      <p className="text-blue-100 mb-4 leading-relaxed w-[353px] h-[120px] overflow-hidden">
        {card.description}
      </p>
      
      <button className="text-white font-semibold hover:text-blue-200 transition-colors absolute bottom-8 left-8 font-inter text-[19px] leading-[33px] tracking-normal border-b border-white pb-0.5 bg-transparent cursor-pointer">
        Read More
      </button>
    </div>
  );
  return (
    <div className="min-h-screen px-4 md:px-8 py-8 md:py-16 bg-[#f6f5ef]">
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          <div className="relative">
            <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[#036DA9]"></div>
            <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[#AAC5EA]"></div>
          </div>
          <span className="text-gray-700 text-lg font-medium ml-2">Who we are</span>
        </div>

        {/* Main Title */}
        <h1 className="text-center mb-8 md:mb-16 px-4 max-w-[811px] mx-auto font-inter font-semibold text-black opacity-100" 
            style={{
              fontSize: 'clamp(28px, 5vw, 53px)',
              lineHeight: 'clamp(36px, 6vw, 78px)',
              letterSpacing: '-2%'
            }}>
          <span className="block md:inline">Why We're the Right Partner</span>
          <span className="block md:inline"> for You?</span>
        </h1>

        {/* Cards Container - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Static 120M Active Clients Card */}
          <div className="relative w-full lg:flex-shrink-0 lg:w-[543px]">
            {/* Background geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 opacity-10">
                <div className="absolute top-4 md:top-8 right-4 md:right-8 w-16 md:w-32 h-16 md:h-32 border-2 md:border-4 border-gray-300 transform rotate-45"></div>
                <div className="absolute top-8 md:top-16 right-0 w-12 md:w-24 h-12 md:h-24 bg-gray-200 transform rotate-12"></div>
                <div className="absolute top-0 right-12 md:right-24 w-8 md:w-16 h-8 md:h-16 border md:border-2 border-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="relative z-10 bg-white rounded-2xl lg:rounded-4xl p-6 lg:p-8 shadow-lg w-full lg:w-[543px] lg:h-[463px] min-h-[350px] bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: 'url(/activeclients.jpeg)' }}>
              {/* Profile images */}
              <div className="flex -space-x-2 md:-space-x-3 mb-4 md:mb-6">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 4" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-[#1A202C]">120M Active</div>
              <div className="text-4xl md:text-6xl font-bold mb-12 md:mb-12 text-[#1A202C]">Clients</div>

              <button className="text-white rounded-full flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 w-[213px] md:w-[281.89px] h-[53px] md:h-[83.89px] absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-gradient-to-r from-[#5292E4] to-[#036DA9] border-0 cursor-pointer font-medium"
                      style={{ 
                        boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)',
                        borderRadius: '100px'
                      }}>
                <span className="whitespace-nowrap flex items-center justify-center text-center w-[136px] md:w-[183px] h-5 font-medium font-inter align-middle text-[17px] md:text-[23px] leading-5 md:leading-5"
                      style={{ letterSpacing: '0%' }}>
                  Let's talk with us
                </span>
                <div className="w-[47.24px] h-[47.24px] md:w-[59.83px] md:h-[59.83px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12"
                     style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transform rotate-[-45deg] text-[#036DA9]" />
                </div>
              </button>
            </div>
          </div>

          {/* Blue Cards Container - Mobile: Single Card with Navigation, Desktop: Horizontal Scroll */}
          <div className="relative w-full">
            {/* Mobile: Single card with navigation */}
            <div className="lg:hidden relative">
              {/* Navigation Arrows */}
              <button 
                onClick={prevCard}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 -ml-5"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button 
                onClick={nextCard}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 -mr-5"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Single Card Display */}
              <div className="px-6">
                <div className="rounded-2xl p-6 text-white border relative w-full transition-all duration-300 min-h-[300px] bg-[#066FAB] border-[#066FAB]">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-b from-[#AAC5EA] to-[#2C87BB]">
                    <img 
                      src={whoWeAreData.cards[currentCardIndex].icon} 
                      alt={whoWeAreData.cards[currentCardIndex].title} 
                      className="object-contain"
                      style={{ 
                        width: Math.min(parseInt(whoWeAreData.cards[currentCardIndex].iconSize.width) * 0.8, 40), 
                        height: Math.min(parseInt(whoWeAreData.cards[currentCardIndex].iconSize.height) * 0.8, 40) 
                      }} 
                    />
                  </div>
                  
                  <h3 className="font-semibold mb-3 font-inter text-white text-2xl leading-7 tracking-normal">
                    {whoWeAreData.cards[currentCardIndex].title}
                  </h3>
                  
                  <p className="text-blue-100 mb-6 leading-5 text-sm">
                    {whoWeAreData.cards[currentCardIndex].description}
                  </p>
                  
                  <button className="text-white font-semibold hover:text-blue-200 transition-colors absolute bottom-6 left-6 font-inter text-base leading-6 tracking-normal border-b border-white pb-0.5 bg-transparent cursor-pointer">
                    Read More
                  </button>
                </div>
              </div>

              {/* Card Indicator Dots */}
              <div className="flex justify-center mt-4 gap-2">
                {whoWeAreData.cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentCardIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Horizontal scroll layout */}
            <div className="hidden lg:block relative w-full overflow-hidden">
              <div className="flex gap-8 animate-infinite-scroll">
                {/* Render cards from JSON data */}
                {whoWeAreData.cards.map(card => renderCard(card))}
                
                {/* Duplicate cards for continuous animation */}
                {whoWeAreData.cards.map(card => renderCard({...card, id: `${card.id}-duplicate`}))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;