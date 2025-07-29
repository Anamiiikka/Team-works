'use client';
import { useState } from 'react';

const ApplicationForm = ({ selectedJob, onClose }) => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setApplicationData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Application submitted:', applicationData);
    alert('Application submitted successfully!');
    onClose();
    setApplicationData({ name: '', email: '', phone: '', resume: null });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" 
             style={{ background: '#F6F5EF' }}>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onClose}
            className="mb-4 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            style={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontStyle: 'normal'
            }}
          >
            ← Back to Jobs
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontStyle: 'normal'
              }}>
            Apply for {selectedJob.title}
          </h1>
          <p className="text-gray-700"
             style={{
               fontFamily: 'Inter',
               fontWeight: 400,
               fontStyle: 'normal'
             }}>
            {selectedJob.department} • {selectedJob.location}
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
             style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={applicationData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={applicationData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={applicationData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Upload Resume *
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
              />
              <p className="text-sm text-gray-500 mt-1"
                 style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                Please upload your resume in PDF, DOC, or DOCX format (max 5MB)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-300"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontStyle: 'normal'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-200 px-6 py-3 rounded-full hover:opacity-90"
                style={{ 
                  background: '#5292E4',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontStyle: 'normal'
                }}
              >
                <span>Submit Application</span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center" style={{ transform: 'rotate(-40deg)' }}>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
