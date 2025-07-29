
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import jobsData from '../data/jobs.json';
import ApplicationForm from './ApplicationForm';

const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

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

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden" 
             style={{ background: '#F6F5EF' }}>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontStyle: 'normal'
              }}>
            Current Job Openings
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto"
             style={{
               fontFamily: 'Inter',
               fontWeight: 400,
               fontStyle: 'normal'
             }}>
            Join our team and be part of a leading financial advisory firm. 
            Explore exciting career opportunities and grow with us.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid gap-6 md:gap-8">
          {jobsData.jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300"
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900"
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontStyle: 'normal'
                        }}>
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 text-white text-sm font-medium rounded-full"
                          style={{ 
                            background: '#7BB4FF',
                            fontFamily: 'Inter',
                            fontWeight: 500
                          }}>
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4"
                       style={{ fontFamily: 'Inter', fontWeight: 400 }}>
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
                  
                  <p className="text-gray-700 mb-4 line-clamp-2"
                     style={{
                       fontFamily: 'Inter',
                       fontWeight: 400,
                       fontStyle: 'normal'
                     }}>
                    {job.description}
                  </p>
                  
                  <p className="text-sm text-gray-500"
                     style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    Posted on {formatDate(job.postedDate)}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 lg:flex-shrink-0">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="inline-flex items-center justify-center gap-3 text-white font-medium transition-all duration-200 px-8 py-4 rounded-full hover:opacity-90"
                    style={{ 
                      background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontStyle: 'normal'
                    }}
                  >
                    <span>Apply Now</span>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center" style={{ transform: 'rotate(-40deg)' }}>
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
