'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Top from '../../../components/Top';
import Footer from '../../../components/Footer';
import FAQ from '../../../components/FAQ';
import servicesData from '../../../data/services.json';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Find the service based on slug
  const service = servicesData.services.find(s => 
    s.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') === slug
  );

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Top Section with Navbar and Hero */}
      <Top 
        title={service.title}
        locationTitle={`Home >> Services >> ${service.title}`}
      />

      {/* Main Content Section */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden -mt-12 md:-mt-16" style={{ backgroundColor: '#F6F5EF' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Finance Image Section - Right below top */}
          <div className="mb-16">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={service.image}
                alt={`${service.title} Finance Solutions`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Service Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#036DA9' }}>Our Services</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {service.title}
              </h1>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.description}
              </p>
              
              <div className="pt-6">
                <Link 
                  href="/contact-us"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  style={{ background: '#036DA9' }}
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <Image
                  src="/financeimg.avif"
                  alt={service.title}
                  width={600}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Service Features Grid - Data from JSON */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Outcomes Section - Data from JSON */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                  <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                </div>
                <span className="font-medium ml-2" style={{ color: '#036DA9' }}>Service Outcomes</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                What You Can Expect
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.outcomes.map((outcome, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
      
      <Footer />
    </main>
  );
}
