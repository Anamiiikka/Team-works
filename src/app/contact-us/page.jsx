'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Phone, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';

const ContactUs = () => {
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
    ' Debt Syndication',
    ' Working Capital Management',
    ' Project Financing',
    'Capital Advisory',
    ' Business Restructuring & Turnaround Advisory',
  ];

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

  const handleSubmit = async () => {
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
          requestFrom: 'Contact Us Page', // Static value to identify source
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
    <>
      {/* Fixed Navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      
      {/* Contact Us Banner - Full coverage */}
      <div 
        className="relative h-[352px] w-full flex items-center overflow-hidden"
        style={{
          marginTop: '130px',
          backgroundImage: 'url(/handtwo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Partial Gradient Overlay - Only on left side */}
        <div 
          className="absolute inset-y-0 left-0 z-0"
          style={{
            width: '60%',
            background: 'linear-gradient(to right, rgba(3, 109, 169, 0.85) 0%, rgba(3, 109, 169, 0.6) 70%, transparent 100%)'
          }}
        ></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm mb-4 text-blue-100">
              <span className="hover:text-white cursor-pointer transition-colors">Home</span>
              <span className="mx-2">›</span>
              <span className="text-white">Contact us</span>
            </nav>
            
            {/* Main Heading */}
            <h1 className="text-7xl font-bold leading-none">
              Contact us
            </h1>
          </div>
        </div>
      </div>
      
      {/* Page Content with custom background */}
      <div className="py-16 px-8" style={{ backgroundColor: '#F6F5EF' }}>
        <div className="max-w-7xl mx-auto">
          {/* Contact Section with new form */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
                    <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
                  </div>
                  <span className="font-medium ml-2" style={{ color: '#000000' }}>Our Contact</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Let's work together
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-md">
                  Lorem ipsum dolor sit amet consectetur. Mortes sed ac imperdiet tellus hendrerit vel aliquet. Blandit et nisl dignissim odio enim nunc metus nunc scelerisque.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Call for Inquiry</p>
                    <p className="text-2xl font-bold text-gray-900">+000(222) 000 00</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Send us email</p>
                    <p className="text-2xl font-bold text-gray-900">info@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Need help for project!
                </h3>
                <p className="text-gray-600">
                  We are ready to help your next projects,It's work together
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    There was an error sending your message. Please check all required fields and try again.
                  </div>
                )}

                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name*"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email*"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 pr-12 text-gray-900"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Services Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between"
                  >
                    <span className={formData.service ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.service || 'Choose our services*'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {services.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full px-4 py-3 text-left text-black hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write a Message*"
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 resize-none text-gray-900"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`text-white font-medium px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${
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
                      <ArrowUpRight className="w-5 h-5" style={{ color: '#036DA9' }} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Head Office Section */}
        <div className="mt-16">
          <div 
            className="relative bg-blue-600 rounded-2xl overflow-hidden shadow-lg"
            style={{ background: '#036DA9' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
              {/* Left Side - Head Office Info */}
              <div className="p-12 flex flex-col justify-center text-white">
                <h3 className="text-3xl font-bold mb-6">HEAD OFFICE</h3>
                <div className="space-y-2 mb-8 text-lg">
                  <p>Team Works Inc.</p>
                  <p>Parkview Complex</p>
                  <p>LGF-1, 48, Hassanpur,</p>
                  <p>IP Extension, Delhi-110092</p>
                </div>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 w-fit">
                  CONTACT US
                </button>
              </div>

              {/* Right Side - Map and Timeline */}
              <div className="relative">
                {/* Map Section */}
                <div className="h-full relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Team+Works+Inc,+Parkview+Complex,+LGF-1,+48,+Hassanpur,+IP+Extension,+Delhi-110092&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  
                  {/* Timeline Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-1">2018</div>
                      <div className="text-sm font-medium text-gray-600">STARTED</div>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                        READ STORY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div 
                className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                style={{ background: '#024A7A' }}
              >
                1345 × 456
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="flex items-center gap-2 mb-4 justify-center" style={{ marginTop: '64px' }}>
          <div className="relative">
            <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
            <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
          </div>
          <span className="font-medium ml-2" style={{ color: '#000000' }}>Subscribe News Letter</span>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Newsletter Heading */}
            <h2 className="text-5xl font-bold text-black mb-2">
              Get <span style={{ color: '#036DA9' }}>Updated</span> News
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ac tincidunt urna at in aliquet facilisis. Aliquam 
              nunc lacus dis lacinia rutrum congue sollicitudin orci nec. Nunc et consectetur volutpat 
              quis et tristique consectetur magna. In quisque venenatis pellentesque morbi. Volutpat 
              viverra purus consequat est erat ut tristique.
            </p>
            
            {/* Email Subscription Form */}
            <div className="max-w-md mx-auto">
              <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-300">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 p-4 outline-none placeholder-gray-500 text-black"
                  required 
                />
                <button 
                  type="submit"
                  className="px-6 py-4 text-white font-medium transition-all duration-200 hover:opacity-90"
                  style={{ background: '#036DA9' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
