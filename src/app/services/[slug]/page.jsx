'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Top from '../../../components/Top';
import Footer from '../../../components/Footer';
import servicesData from '../../../data/services.json';

export default function ServiceDetailPage() {
  const params = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add form submission logic here
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
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-blue-100 transition-colors">
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
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      B-25, 3rd Floor, B Block, Sector 2, Noida, Uttar Pradesh
                    </p>
                  </div>

                  {/* Phone Contact */}
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Call for inquiry</p>
                    <p className="text-blue-600 font-bold text-lg">+000(222) 000 00</p>
                  </div>

                  {/* More Services Label */}
                  <h5 className="text-lg font-bold text-gray-800 mb-4">More Services</h5>
                  
                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-3 px-6 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      Submit now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>

              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Service Description */}
              <div className="space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We provide comprehensive project financing solutions tailored for infrastructure, 
                  industrial, and business expansion projects. From initial feasibility studies and 
                  financial modeling to debt-equity structuring and investor sourcing, we manage 
                  every step of the financing journey. Our team works closely with clients to 
                  understand project timelines, capital requirements, and risk parameters, while 
                  also advising on government subsidies, incentives, and compliance. With a deep 
                  understanding of sector dynamics and capital markets, we ensure your vision is 
                  adequately funded and strategically positioned for success.
                </p>
              </div>

              {/* Process Steps Section - 2x4 Grid */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Row 1 */}
                  {/* Step 1 - Initial Consultation */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">01</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Initial Consultation</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Feasibility Study */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">02</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Feasibility Study</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Row 2 */}
                  {/* Step 3 - Financial Modeling */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">03</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Financial Modeling</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Step 4 - Structuring Capital */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">04</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Structuring Capital</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Row 3 */}
                  {/* Step 5 - Investor Outreach */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">05</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Investor Outreach</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Step 6 - Due Diligence Support */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">06</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Due Diligence Support</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Row 4 */}
                  {/* Step 7 - Negotiation */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">07</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Negotiation</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>

                  {/* Step 8 - Financial Close */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-light text-gray-300 leading-none">08</div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Financial Close</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut sed sed ac vitae pulvinar. Sed risus tellus
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Outcomes */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Service Outcomes:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      In-depth assessment of technical, commercial, and financial feasibility.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      Development of robust financial models tailored to project scope.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      Identification of suitable domestic and international funding sources.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      Identification of applicable subsidies, tax benefits, and grants.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      Strategic advice leveraging deep sectoral expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
