'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Top from '../../../components/Top';
import Footer from '../../../components/Footer';
import FAQ from '../../../components/FAQ';
import servicesData from '../../../data/services.json';

export default function ServiceDetailPage() {
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const services = [
    'Debt Syndication',
    'Working Capital Management',
    'Project Financing',
    'Capital Advisory',
    'Business Restructuring & Turnaround Advisory',
    'Venture Capital & MSME Funding'
  ];

  // Function to generate slug from service title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  };

  // Find the service based on slug
  const service = servicesData.services.find(s => 
    generateSlug(s.title) === params.slug
  );

  if (!service) {
    return (
      <main className="min-h-screen">
        <Top 
          title="Service Not Found"
          locationTitle="Services >> Service Listing"
        />
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Service not found</h2>
          <Link href="/services" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Back to Services
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({
      ...prev,
      service: service
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          industry: formData.service, // Map service to industry
          message: formData.message,
          requestFrom: `Service Page - ${service.title}`, // Dynamic source identification
          isSubscribed: true // Default to true for newsletter subscription
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        console.error('API Error:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Top Section with Navbar and Hero */}
      <Top 
        title={service.title}
        locationTitle="Services >> Service Listing"
      />

      {/* Main Content Section */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative -mt-12 md:-mt-16" style={{ backgroundColor: '#F6F5EF' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Finance Image Section - Full width below top component */}
          <div className="mb-8">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/finance.png"
                alt={`${service.title} Finance Solutions`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Sidebar (More Services & Contact) */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* More Services */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">More services</h4>
                  <div className="space-y-4">
                    {servicesData.services
                      .filter(s => s.id !== service.id)
                      .slice(0, 6)
                      .map(relatedService => (
                        <Link
                          key={relatedService.id}
                          href={`/services/${generateSlug(relatedService.title)}`}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                                boxShadow: '0 4px 12px rgba(82, 146, 228, 0.3)',
                                padding: '6px'
                              }}
                            >
                              <Image 
                                src={relatedService.icon} 
                                alt={relatedService.title} 
                                width={20} 
                                height={20}
                                className="object-contain"
                              />
                            </div>
                            <span className="text-gray-800 group-hover:text-blue-600 transition-colors font-medium">
                              {relatedService.title}
                            </span>
                          </div>
                          <svg className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))
                    }
                  </div>
                </div>

                {/* Contact with us */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Contact with us</h4>
                  
                  {/* Address */}
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium text-center">
                     Team works inc.
Parkview complex
Lgf-1, 48, Hassanpur,
Ip extension, Delhi-110092
                    </p>
                  </div>

                  {/* Phone Contact */}
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                          boxShadow: '0 4px 12px rgba(82, 146, 228, 0.3)'
                        }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Call for inquiry</p>
                    <p className="text-blue-600 font-bold text-lg">+91 11 4052 1844</p>
                  </div>
                </div>

                {/* Contact Form Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h5 className="text-lg font-bold text-gray-800 mb-4">More Services</h5>
                  
                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                        There was an error sending your message. Please check all required fields and try again.
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name*"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                    
                    {/* Services Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent text-left flex items-center justify-between"
                      >
                        <span className={formData.service ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.service || 'Choose our services*'}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          {services.map((service, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleServiceSelect(service)}
                              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <textarea
                        name="message"
                        placeholder="Write a Message*"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent resize-none text-gray-900 placeholder-gray-500"
                        required
                      ></textarea>
                    </div>
                    
                    {/* Submit Button - Inspired by ContactUs */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white font-medium px-6 py-3 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        style={{
                          background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                          boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)'
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send a message'}
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full group-hover:bg-white transition-all duration-300" style={{
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                          <ArrowUpRight className="w-4 h-4" style={{ color: '#036DA9' }} />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Service Description */}
              <div className="space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {service.detailedDescription || service.description}
                </p>
              </div>

              {/* Process Steps Section - 2x4 Grid */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {service.processSteps && service.processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-6xl font-light text-gray-300 leading-none">{step.stepNumber}</div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Outcomes */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Service Outcomes:</h3>
                <div className="space-y-4">
                  {service.outcomes && service.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '25px',
                            lineHeight: '44px',
                            letterSpacing: '0',
                            margin: 0,
                            color: '#232323',
                          }}
                        >
                          {outcome}
                        </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finance Images - positioned within the right content area */}
              <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
                <div className="flex-shrink-0" style={{ width: '390px', height: '290px' }}>
                  <img 
                    src="/finance1.png" 
                    alt="Finance Solution 1" 
                    className="w-full h-full object-contain"
                    style={{ 
                      borderRadius: '22px',
                      opacity: 1,
                      background: '#fff',
                      padding: '12px'
                    }}
                  />
                </div>
                <div className="flex-shrink-0" style={{ width: '390px', height: '290px' }}>
                  <img 
                    src="/finance2.png" 
                    alt="Finance Solution 2" 
                    className="w-full h-full object-contain"
                    style={{ 
                      borderRadius: '22px',
                      opacity: 1,
                      background: '#fff',
                      padding: '12px'
                    }}
                  />
                </div>
              </div>
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
