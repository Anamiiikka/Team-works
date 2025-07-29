'use client';
import { useState } from 'react';

const ApplicationForm = ({ selectedJob, onClose }) => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    age: '',
    experience: '',
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

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

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!applicationData.name || !applicationData.age || !applicationData.experience || !applicationData.resume) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('name', applicationData.name);
      formData.append('age', applicationData.age);
      formData.append('experience', applicationData.experience);
      formData.append('resume', applicationData.resume);
      formData.append('jobId', selectedJob._id || selectedJob.id || 'default-job-id');

      const response = await fetch('/api/join-team', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form on success
        setApplicationData({
          name: '',
          age: '',
          experience: '',
          resume: null
        });
        
        // Close form after showing success message for 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
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
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
              Thank you! Your application has been submitted successfully. We'll review it and get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              There was an error submitting your application. Please check all required fields and try again.
            </div>
          )}

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
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                max="100"
                value={applicationData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                placeholder="Enter your age"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2"
                     style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Years of Experience *
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                required
                min="0"
                max="50"
                value={applicationData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                placeholder="Enter years of experience"
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
                disabled={isSubmitting}
                className={`flex-1 inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-200 px-6 py-3 rounded-full hover:opacity-90 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                style={{ 
                  background: '#5292E4',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontStyle: 'normal'
                }}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
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
