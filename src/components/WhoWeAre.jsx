import React from 'react';
import { ArrowRight } from 'lucide-react';
import whoWeAreData from '../data/whoweare.json';

const WhoWeAre = () => {
  // Function to render a card
  const renderCard = (card) => (
    <div key={card.id} className="flex-shrink-0 rounded-4xl p-8 text-white border relative" 
         style={{ 
           width: '383px', 
           height: '373px',
           backgroundColor: '#066FAB',
           borderWidth: '1px',
           borderColor: '#066FAB'
         }}>
      <div className="rounded-full flex items-center justify-center mb-4" style={{ 
        width: '84px',
        height: '84px',
        background: 'linear-gradient(180deg, #AAC5EA 0%, #2C87BB 100%)',
        opacity: 1
      }}>
        <img src={card.icon} alt={card.title} style={{ width: card.iconSize.width, height: card.iconSize.height }} />
      </div>
      
      <h3 className="font-semibold mb-3" style={{
        width: '330px',
        height: '43px',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '30px',
        lineHeight: '33px',
        letterSpacing: '0%',
        opacity: 1,
        color: '#FFFFFF'
      }}>{card.title}</h3>
      
      <p className="text-blue-100 mb-4 leading-relaxed" style={{
        width: '353px',
        height: '120px',
        opacity: 1,
        overflow: 'hidden'
      }}>
        {card.description}
      </p>
      
      <button className="text-white font-semibold hover:text-blue-200 transition-colors absolute bottom-8" style={{
        width: 'auto',
        height: '33px',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '19px',
        lineHeight: '33px',
        letterSpacing: '0%',
        opacity: 1,
        left: '32px',
        borderBottom: '1px solid white',
        borderWidth: '0 0 1px 0',
        paddingBottom: '1px',
        textAlign: 'left',
        background: 'none',
        textDecoration: 'none',
        cursor: 'pointer'
      }}>
        Read More
      </button>
    </div>
  );
  return (
    <div className="min-h-screen px-8 py-16" style={{ backgroundColor: '#f6f5ef' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative">
            <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
            <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
          </div>
          <span className="text-gray-700 text-lg font-medium ml-2">Who we are</span>
        </div>

        {/* Main Title */}
        <h1 className="text-center mb-16" style={{
          width: '811px',
          height: '156px',
          margin: '0 auto',
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '53px',
          lineHeight: '78px',
          letterSpacing: '-2%',
          textAlign: 'center',
          opacity: 1,
          color: '#000000'
        }}>
          Why We're the Right Partner for<br />You?
        </h1>

        {/* Cards Container with static white card and flowing blue cards */}
        <div className="flex gap-8 items-start">
          {/* Static 120M Active Clients Card */}
          <div className="relative flex-shrink-0" style={{ width: '543px' }}>
            {/* Background geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 border-4 border-gray-300 transform rotate-45"></div>
                <div className="absolute top-16 right-0 w-24 h-24 bg-gray-200 transform rotate-12"></div>
                <div className="absolute top-0 right-24 w-16 h-16 border-2 border-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="relative z-10 bg-white rounded-4xl p-8 shadow-lg" style={{ 
              width: '543px',
              height: '463px',
              opacity: 1,
              backgroundImage: 'url(/activeclients.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
              {/* Profile images */}
              <div className="flex -space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                    alt="Professional person 4" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-6xl font-bold mb-16" style={{ color: '#1A202C' }}>120M Active</div>
              <div className="text-6xl font-bold mb-16" style={{ color: '#1A202C' }}>Clients</div>

              <button className="text-white rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105" style={{
                width: '281.88623046875px',
                height: '60px',
                opacity: 1,
                position: 'absolute',
                bottom: '32px',
                left: '32px',
                background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                border: 'none',
                boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)',
                cursor: 'pointer'
              }}>
                <span style={{
                  opacity: 1,
                  fontSize: '23px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  Let's talk with us
                </span>
                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12" style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <ArrowRight className="w-5 h-5 transform rotate-[-45deg]" style={{ color: '#036DA9' }} />
                </div>
              </button>
            </div>
          </div>

          {/* Flowing Blue Cards Container */}
          <div className="relative w-full overflow-hidden">
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
  );
};

export default WhoWeAre;