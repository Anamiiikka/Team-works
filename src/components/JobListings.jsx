
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApplicationForm from './ApplicationForm';

const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/public/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data.jobs || []);
        setDepartments(data.departments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
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
      <ApplicationForm 
        selectedJob={selectedJob} 
        onClose={handleCloseForm} 
      />
    );
  }

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" 
               style={{ background: '#F6F5EF' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>Loading job opportunities...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" 
               style={{ background: '#F6F5EF' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p style={{ fontFamily: 'Inter' }}>Error loading jobs: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      
      {/* Abstract Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-12 left-16 w-18 h-18 border border-blue-300/50 rounded-full"></div>
        <div className="absolute top-8 right-24 w-10 h-10 bg-blue-200/45 transform rotate-45"></div>
        <div className="absolute top-28 right-12 w-5 h-5 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-6 left-32 w-3 h-3 border border-blue-200/55 transform rotate-45"></div>
        <div className="absolute top-16 right-40 w-7 h-7 bg-blue-100/45 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-blue-200/50 transform rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-3 h-14 bg-blue-300/45 rounded-full transform rotate-25"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 'clamp(40px, 6vw, 56px)',
                letterSpacing: '-0.02em'
              }}>
            Current Job Openings
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto"
             style={{
               fontFamily: 'Inter',
               fontWeight: 400,
               fontStyle: 'normal',
               fontSize: 'clamp(16px, 2.5vw, 20px)',
               lineHeight: 'clamp(24px, 3.5vw, 30px)',
               color: '#6C7278'
             }}>
            Join our team and be part of a leading financial advisory firm. 
            Explore exciting career opportunities and grow with us.
          </p>
        </div>

        {/* Job Listings Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2" 
                style={{ 
                  fontFamily: 'Inter',
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  fontWeight: 600
                }}>
              No job openings found
            </h3>
            <p className="text-gray-600" 
               style={{ 
                 fontFamily: 'Inter',
                 fontSize: 'clamp(14px, 2.5vw, 16px)',
                 color: '#6C7278'
               }}>
              We don't have any open positions at the moment. Check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {jobs.map((job) => (
            <div 
              key={job._id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl hover:bg-white transition-all duration-300 border border-gray-100"
              style={{ 
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-bold text-gray-900"
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontStyle: 'normal',
                          fontSize: 'clamp(20px, 3vw, 28px)',
                          lineHeight: 'clamp(28px, 4vw, 36px)',
                          letterSpacing: '-0.01em'
                        }}>
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-mono font-medium">
                      {job.jobId}
                    </span>
                    <span className="px-4 py-2 text-white text-sm font-medium rounded-full"
                          style={{ 
                            background: 'linear-gradient(90deg, #93C5FD 0%, #60A5FA 100%)',
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            boxShadow: '0 4px 12px rgba(147, 197, 253, 0.3)'
                          }}>
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4"
                       style={{ 
                         fontFamily: 'Inter', 
                         fontWeight: 400,
                         fontSize: 'clamp(14px, 2.5vw, 16px)',
                         color: '#6C7278'
                       }}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)' }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 8a1 1 0 011-1h4a1 1 0 011 1v4H7v-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)' }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)' }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2"
                     style={{
                       fontFamily: 'Inter',
                       fontWeight: 400,
                       fontStyle: 'normal',
                       fontSize: 'clamp(14px, 2.5vw, 16px)',
                       lineHeight: 'clamp(21px, 3.5vw, 24px)',
                       color: '#6C7278',
                       textAlign: 'justify'
                     }}>
                    {job.description}
                  </p>
                  
                  <p className="text-sm"
                     style={{ 
                       fontFamily: 'Inter', 
                       fontWeight: 400,
                       color: '#9CA3AF',
                       fontSize: '14px'
                     }}>
                    Posted on {formatDate(job.postedDate)}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 lg:flex-shrink-0">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-300 px-8 py-4 rounded-full hover:shadow-lg hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)',
                      fontSize: '16px'
                    }}
                  >
                    <span>Apply Now</span>
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12" 
                         style={{ 
                           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                           transform: 'rotate(-45deg)'
                         }}>
                      <svg className="w-4 h-4" style={{ color: '#036DA9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
