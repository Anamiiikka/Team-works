'use client';
import Image from 'next/image';
import Link from 'next/link';
import Top from '../../components/Top';
import Footer from '../../components/Footer';
import servicesData from '../../data/services.json';

export default function ServicesPage() {
  // Function to generate slug from service title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  };

  // Function to render a service card
  const renderServiceCard = (service) => (
    <Link 
      key={service.id} 
      href={`/services/${generateSlug(service.title)}`}
      className="relative pt-12 block group cursor-pointer"
    >
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
      <div className="bg-white rounded-2xl p-8 pt-20 text-center shadow-lg h-full min-h-[450px] group-hover:shadow-xl transition-shadow duration-300">
        <h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#1F2937',
            marginBottom: '16px'
          }}
        >
          {service.title}
        </h3>
        <p 
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            textAlign: 'center',
            opacity: 1,
            color: '#6B7280'
          }}
          className="px-2"
        >
          {service.description}
        </p>
        
        {/* Learn More Button */}
        <div className="mt-6 pt-4">
          <span className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <main className="min-h-screen">
      {/* Top Section with Navbar and Hero */}
      <Top 
        title="All Services"
        locationTitle="Home >> Services"
      />

      {/* Services Content Section */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden -mt-12 md:-mt-16" style={{ backgroundColor: '#F6F5EF' }}>
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
