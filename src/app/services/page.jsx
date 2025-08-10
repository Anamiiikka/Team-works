'use client';
import Image from 'next/image';
import Link from 'next/link';
import Top from '../../components/Top';
import Footer from '../../components/Footer';
import servicesData from '../../data/services.json';

export default function ServicesPage() {
  // Function to render a service card
  const renderServiceCard = (service) => (
    <div key={service.id} className="relative pt-12">
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #AAC5EA 0%, #2C87BB 100%)' }}>
            <Image 
              src={service.icon} 
              alt={service.alt} 
              width={48} 
              height={48}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 pt-20 text-center shadow-lg h-full min-h-[400px]">
        <h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#1F2937',
            marginBottom: '12px'
          }}
        >
          {service.title}
        </h3>
        <p 
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#6B7280'
          }}
          className="px-2"
        >
          {service.description}
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      {/* Top Section with Navbar and Hero */}
      <Top 
        title="All Services"
        locationTitle="Home >> Services"
      />

      {/* Services Content Section */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden -mt-6 md:-mt-8" style={{ backgroundColor: '#F6F5EF' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.map(service => renderServiceCard(service))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
