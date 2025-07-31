import React from 'react';
import Navbar from '@/components/Navbar';

const ContactUs = () => {
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="relative">
              <div className="w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#036DA9' }}></div>
              <div className="absolute -right-3 top-0 w-0 h-0 border-l-[20px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" style={{ borderLeftColor: '#AAC5EA' }}></div>
            </div>
            <span className="font-medium ml-2" style={{ color: '#000000' }}>Our Contact</span>
          </div>
          {/* Get in Touch Card */}
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
            <div className="text-center mb-12">
              {/* Get in Touch Heading with custom typography */}
              <h2 
                className="text-gray-800 mb-4"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontStyle: 'normal',
                  fontSize: '88px',
                  lineHeight: '95px',
                  letterSpacing: '0%'
                }}
              >
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            
            {/* Contact Form */}
            <form className="max-w-2xl mx-auto space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-black text-black"
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-black text-black"
                  required 
                />
              </div>
              
              {/* Phone Number and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-black text-black"
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-black text-black"
                  required 
                />
              </div>
              
              {/* Message */}
              <textarea 
                placeholder="Message" 
                rows="6"
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-black text-black"
                required
              ></textarea>
              
              {/* Submit Button */}
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-200 px-8 py-4 rounded-full cursor-pointer hover:opacity-90"
                  style={{ background: '#5292E4' }}
                >
                  <span>Send Message</span>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center" style={{ transform: 'rotate(-40deg)' }}>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </form>
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
                  <p>B-25, 3rd Floor, B</p>
                  <p>Block Sector - 2,</p>
                  <p>Noida, Uttar</p>
                  <p>Pradesh</p>
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
                    src="https://maps.google.com/maps?q=B-25,+3rd+Floor,+B+Block,+Sector+2,+Noida,+Uttar+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
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