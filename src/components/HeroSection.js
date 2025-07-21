'use client'
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative flex items-start justify-start min-h-screen overflow-hidden" style={{ height: '100vh' }}>
      <Image
        src="/hero-bg.jpg" 
        alt="Business professional working on a laptop"
        fill
        priority
        loading="eager"
        className="object-cover z-[-1] blur-md" 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        onError={(e) => {
          console.error('Failed to load hero-bg.jpg, falling back to globe.svg');
          e.target.src = '/globe.svg';
        }}
      />

      {/* Text overlay directly on the image */}
      <div className="absolute top-1/4 left-8 md:left-16 text-left z-10 p-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Let's Initiate a new{' '}
          <span className="text-red-500">Business Venture</span>
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Valuqocapital is a full-service consultation firm with record of winning many successful campaigns.
        </p>
        <button
          className="bg-blue-600 text-white rounded-md px-6 py-2 text-base font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
          aria-label="Get Service"
        >
          Get Service
        </button>
      </div>
    </section>
  );
}