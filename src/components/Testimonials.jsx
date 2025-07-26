'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import testimonialData from '../data/testimonials.json';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const originals = testimonialData.testimonials;
    setTestimonials([...originals, ...originals]); // Duplicate for infinite scroll
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-blue-300 fill-blue-300' : 'text-gray-300'}`}
      />
    ));

  if (!testimonials.length) return null;

  const avatarsOnMap = [
    { src: '/p2.png', alt: 'Client', style: { top: '5%', left: '15%', width: '93px', height: '95px' } },
    { src: '/p4.png', alt: 'Client', style: { top: '15%', left: '40%', width: '63px', height: '64px' } },
    { src: '/p1.png', alt: 'Client', style: { top: '10%', right: '20%', width: '75px', height: '76px' } },
    { src: '/p3.png', alt: 'Client', style: { top: '25%', right: '10%', width: '63px', height: '64px' } },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#F6F5EF' }}>
      {/* Background Map */}
      <div 
        className="absolute z-0"
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
          <Image src="/map.png" fill objectFit="contain" alt="Map" className="opacity-40" />
        </div>
      </div>

      {/* Floating Avatars */}
      <div className="absolute inset-0 z-30 pointer-events-none">
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
          {avatarsOnMap.map((avatar, index) => (
            <div
              key={index}
              className="absolute rounded-full shadow-lg"
              style={{ ...avatar.style, position: 'absolute' }}
            >
              <div className="relative w-full h-full">
                <Image src={avatar.src} alt={avatar.alt} fill objectFit="cover" className="rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
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
        </div>

        {/* Testimonial Carousel */}
        <div className="relative z-20 overflow-hidden max-w-[90vw] mx-auto">
          <div className="flex animate-infinite-scroll">
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
                  <div className="p-8 text-white flex flex-col justify-center items-center w-2/5 relative" style={{ backgroundColor: '#5292E4' }}>
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
