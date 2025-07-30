'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import testimonialData from '../data/testimonials.json';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const originals = testimonialData.testimonials;
    setTestimonials([...originals, ...originals]); 
    
    // Check if screen is mobile/tablet
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-blue-300 fill-blue-300' : 'text-gray-300'}`}
      />
    ));

  if (!testimonials.length) return null;

  const mapPlaces = [
    { name: 'Delhi', style: { top: '28%', left: '45%' } },
    { name: 'Lucknow', style: { top: '35%', left: '52%' } },
    { name: 'Arunachal Pradesh', style: { top: '30%', right: '10%' } },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#F6F5EF' }}>
      {/* Background Map */}
      <div 
        className={`absolute z-0 ${isMobile ? 'hidden' : 'block'}`}
        style={{
          width: '949px',
          height: '949px',
          top: '50%',
          left: '50%',
          transform: 'translate(-20%, -50%)',
          position: 'absolute',
        }}
      >
        <div className="relative w-full h-full">
          <Image 
            src="/map.png" 
            fill 
            sizes="949px"
            style={{ objectFit: 'contain' }}
            alt="Map" 
            className="opacity-40" 
          />
        </div>
      </div>
      {/* Place Names on Map */}
      <div className={`absolute inset-0 z-10 pointer-events-none ${isMobile ? 'hidden' : 'block'}`}>
        <div
          className="absolute"
          style={{
            width: '949px',
            height: '949px',
            top: '50%',
            left: '50%',
            transform: 'translate(-20%, -50%)',
          }}
        >
          {mapPlaces.map((place, index) => (
            <div
              key={index}
              className="absolute"
              style={{ ...place.style, position: 'absolute' }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-900">{place.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Header */}
        {isMobile ? (
          // Mobile Header
          (<div className="mb-8">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div
                    className="w-0 h-0 border-l-[15px] border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent"
                    style={{ borderLeftColor: '#036DA9' }}
                  ></div>
                  <div
                    className="absolute -right-2 top-0 w-0 h-0 border-l-[15px] border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent"
                    style={{ borderLeftColor: '#AAC5EA' }}
                  ></div>
                </div>
                <span className="font-medium ml-2 text-sm" style={{ color: '#000000' }}>Testimonial</span>
              </div>
              <h2
                className="font-semibold text-black text-2xl md:text-3xl leading-tight"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                What our clients say about our services
              </h2>
            </div>
          </div>)
        ) : (
          // Desktop Header (Original)
          (<div className="mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative">
                  <div
                    className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"
                    style={{ borderLeftColor: '#036DA9' }}
                  ></div>
                  <div
                    className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"
                    style={{ borderLeftColor: '#AAC5EA' }}
                  ></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#000000' }}>Testimonial</span>
              </div>
              <h2
                className="font-semibold text-black text-5xl leading-tight"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                What our clients say<br /> about our services
              </h2>
            </div>
          </div>)
        )}

        {/* Testimonial Carousel */}
        {isMobile ? (
          // Mobile Carousel
          (<div className="relative z-20 overflow-hidden max-w-[95vw] mx-auto">
            <div 
              className="flex animate-infinite-scroll"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-[280px] sm:w-[400px] md:w-[500px] flex-shrink-0 px-2 sm:px-3 relative pt-6">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                      <div className="p-2 rounded-md relative" style={{backgroundColor: '#A9C4E9'}}>
                          <Quote className="w-5 h-5" style={{color: '#036DA9'}}/>
                          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px]" style={{borderTopColor: '#A9C4E9'}}></div>
                      </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ minHeight: '250px' }}>
                    {/* Blue Profile Section - Mobile */}
                    <div className="p-4 text-white flex flex-col justify-center items-center w-full relative" style={{ backgroundColor: '#066FAB' }}>
                      <h3 className="text-lg font-bold text-center">{testimonial.name}</h3>
                      <p className="text-blue-100 text-sm text-center mt-1">{testimonial.position}</p>
                    </div>
                    {/* Testimonial Content - Mobile */}
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <div className="flex mb-3 justify-center">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed text-center">{testimonial.testimonial}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>)
        ) : (
          // Desktop Carousel (Original)
          (<div className="relative z-20 overflow-hidden max-w-[90vw] mx-auto">
            <div 
              className="flex animate-infinite-scroll"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-[672px] flex-shrink-0 px-4 relative pt-10">
                  <div className="absolute top-0 left-[55%] -translate-x-1/2 z-10">
                      <div className="p-4 rounded-md relative" style={{backgroundColor: '#A9C4E9'}}>
                          <Quote className="w-8 h-8" style={{color: '#036DA9'}}/>
                          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]" style={{borderTopColor: '#A9C4E9'}}></div>
                      </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex" style={{ minHeight: '466px' }}>
                    {/* Blue Profile Section */}
                    <div className="p-8 text-white flex flex-col justify-center items-center w-2/5 relative" style={{ backgroundColor: '#066FAB' }}>
                      <div
                        className="absolute bottom-0 left-0 w-full h-1/3 bg-black opacity-10"
                        style={{ clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)' }}
                      ></div>
                      <h3 className="text-2xl font-bold text-center">{testimonial.name}</h3>
                      <p className="text-blue-100 text-md text-center mt-2">{testimonial.position}</p>
                    </div>
                    {/* Testimonial Content */}
                    <div className="flex-1 p-10 flex flex-col justify-center">
                      <div className="flex mb-5">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-500 text-lg leading-relaxed">{testimonial.testimonial}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>)
        )}
      </div>
    </section>
  );
};

export default Testimonials;
