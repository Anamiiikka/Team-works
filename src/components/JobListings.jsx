'use client';
import { useState } from 'react';
import Image from 'next/image';
import jobsData from '../data/jobs.json';

const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

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
    setShowApplicationForm(false);
    setApplicationData({ name: '', email: '', phone: '', resume: null });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (showApplicationForm && selectedJob) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" style={{ background: '#F6F5EF' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-8 left-12 w-16 h-16 border border-blue-300/50 rounded-full"></div>
          <div className="absolute top-4 right-20 w-8 h-8 bg-blue-200/45 transform rotate-45"></div>
          <div className="absolute top-20 right-8 w-4 h-4 bg-blue-400/50 rounded-full"></div>
          <div className="absolute bottom-16 left-1/5 w-10 h-10 border-2 border-blue-200/50 transform rotate-45"></div>
          <div className="absolute bottom-24 right-1/5 w-2 h-12 bg-blue-300/45 rounded-full transform rotate-25"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => setShowApplicationForm(false)}
              className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Jobs
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Apply for {selectedJob.title}
            </h1>
            <p className="text-gray-600">{selectedJob.department} • {selectedJob.location}</p>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={applicationData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={applicationData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={applicationData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Please upload your resume in PDF, DOC, or DOCX format (max 5MB)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" style={{ background: '#F6F5EF' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-8 left-12 w-16 h-16 border border-blue-300/50 rounded-full"></div>
        <div className="absolute top-4 right-20 w-8 h-8 bg-blue-200/45 transform rotate-45"></div>
        <div className="absolute top-20 right-8 w-4 h-4 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-2 left-28 w-2 h-2 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-12 right-32 w-6 h-6 bg-blue-100/45 rounded-full"></div>
        <div className="absolute top-28 left-40 w-1 h-8 bg-blue-300/40 rounded-full transform rotate-30"></div>
        <div className="absolute bottom-16 left-1/5 w-10 h-10 border-2 border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-24 right-1/5 w-2 h-12 bg-blue-300/45 rounded-full transform rotate-25"></div>
        <div className="absolute bottom-20 left-1/6 w-4 h-4 bg-blue-400/50 rounded-full"></div>
        <div className="absolute -top-16 -right-16 w-24 h-24 border border-blue-200/40 rounded-full"></div>
        <div className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-br from-blue-100/25 to-transparent rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Current Job Openings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our team and be part of a leading financial advisory firm. 
            Explore exciting career opportunities and grow with us.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid gap-6 md:gap-8">
          {jobsData.jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 8a1 1 0 011-1h4a1 1 0 011 1v4H7v-4z" clipRule="evenodd" />
                      </svg>
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <p className="text-sm text-gray-500">
                    Posted on {formatDate(job.postedDate)}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 lg:flex-shrink-0">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg"
                  >
                    Apply Now
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Don't see the right role?</h3>
            <p className="text-blue-100 mb-6">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
              Send Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
