// app/cms/careers/page.js
'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Eye, Download, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

async function getApplicants(page = 1, sort = '-submittedAt', startDate = '', endDate = '') {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', '10');
  url.searchParams.append('sort', sort);
  if (startDate) url.searchParams.append('startDate', startDate);
  if (endDate) url.searchParams.append('endDate', endDate);
  
  const res = await fetch(url, { cache: 'no-store', credentials: 'include' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || `Failed to fetch applicants: ${res.status}`);
  }
  return res.json();
}

export default function Careers() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('-submittedAt');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExportingAll, setIsExportingAll] = useState(false);

  // Check if user has permission to access this page
  if (authLoading) {
    return (
      <div className="p-6 min-h-screen" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: 'Inter'
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
            <p className="text-gray-600">Checking permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role === 'Employee') {
    return (
      <div className="p-6 min-h-screen" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: 'Inter'
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-l-4 border-red-500">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to view career applicants. Only Admins and Super Admins can access this section.</p>
            <p className="text-sm text-gray-500">Current role: {currentUser?.role || 'None'}</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const handleExportToExcel = () => {
    const dataToExport = applicants.map(applicant => ({
      Name: applicant.name,
      Age: applicant.age,
      'Experience (Years)': applicant.experience,
      'Resume URL': applicant.resumeUrl || 'N/A',
      'Job ID': applicant.jobId,
      'Submitted At': applicant.submittedAt ? new Date(applicant.submittedAt).toLocaleString() : 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Applicants_CurrentPage.xlsx');
  };

  const handleExportAllToExcel = async () => {
      setIsExportingAll(true);
      try {
          const data = await getApplicants(1, sortOrder, startDate, endDate, true); // Assuming 'all=true' fetches all
          const allApplicants = data.applicants || [];
          
          const dataToExport = allApplicants.map(applicant => ({
              Name: applicant.name,
              Age: applicant.age,
              'Experience (Years)': applicant.experience,
              'Resume URL': applicant.resumeUrl || 'N/A',
              'Job ID': applicant.jobId,
              'Submitted At': applicant.submittedAt ? new Date(applicant.submittedAt).toLocaleString() : 'N/A',
          }));

          const worksheet = XLSX.utils.json_to_sheet(dataToExport);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'Applicants_AllRecords.xlsx');
      } catch(err) {
          setError(err.message);
      } finally {
          setIsExportingAll(false);
      }
  };

  const handleDownloadResume = async (resumeUrl, applicantName) => {
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Failed to download resume');
      const blob = await response.blob();
      const fileName = `${applicantName}_resume.${resumeUrl.split('.').pop()}`;
      saveAs(blob, fileName);
    } catch (error) {
      setError('Failed to download resume.');
    }
  };

  const handleDeleteApplicant = async (id) => {
    if (window.confirm('Are you sure you want to delete this applicant?')) {
      try {
        const res = await fetch(`/api/careers`, { // Target the main route
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }), // Send the ID in the body
          credentials: 'include',
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to delete applicant.');
        }
        setApplicants(prev => prev.filter(app => app._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 min-h-screen" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg" style={{
            background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
          }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Career Applicants</h2>
          </div>
          
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
            <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 lg:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-xl text-sm text-gray-600 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all" 
                  placeholder="Start Date" 
                />
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-xl text-sm text-gray-600 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all" 
                  placeholder="End Date" 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <select 
                  value={sortOrder} 
                  onChange={(e) => handleSortChange(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-xl text-sm text-gray-600 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="-submittedAt">Date (Newest First)</option>
                  <option value="submittedAt">Date (Oldest First)</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="-name">Name (Z-A)</option>
                </select>
                <button 
                  onClick={handleExportToExcel} 
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                    boxShadow: '0 4px 16px rgba(82, 146, 228, 0.3)'
                  }}
                >
                  Download Current Page
                </button>
                <button 
                  onClick={handleExportAllToExcel} 
                  disabled={isExportingAll} 
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{
                    background: isExportingAll ? '#9ca3af' : 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                    boxShadow: isExportingAll ? 'none' : '0 4px 16px rgba(82, 146, 228, 0.3)'
                  }}
                >
                  {isExportingAll ? 'Exporting...' : 'Download All Records'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-800 font-medium">Error: {error}</p>
              </div>
            </div>
          </div>
        ) : applicants.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{
              background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
            }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No applicants available</h3>
            <p className="text-gray-600">There are currently no job applications to display.</p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead style={{
                    background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
                  }}>
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Age</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Experience</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Resume</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Job ID</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Submitted</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {applicants.map((applicant, index) => (
                      <tr key={applicant._id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{applicant.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{applicant.age}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{applicant.experience}</td>
                        <td className="py-4 px-6 text-sm">
                          {applicant.resumeUrl ? (
                            <div className="flex items-center space-x-3">
                              <a 
                                href={applicant.resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200" 
                                title="View Resume"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button 
                                onClick={() => handleDownloadResume(applicant.resumeUrl, applicant.name)} 
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200" 
                                title="Download Resume"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">N/A</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">{applicant.jobId}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{new Date(applicant.submittedAt).toLocaleString()}</td>
                        <td className="py-4 px-6 text-sm">
                          {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
                            <button 
                              onClick={() => handleDeleteApplicant(applicant._id)} 
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200" 
                              title="Delete Applicant"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden space-y-4">
              {applicants.map((applicant) => (
                <div key={applicant._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{applicant.name}</h3>
                    <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{
                      background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)'
                    }}>
                      ID: {applicant.jobId}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Age</p>
                      <p className="text-gray-900">{applicant.age}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Experience</p>
                      <p className="text-gray-900">{applicant.experience} years</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Submitted</p>
                    <p className="text-gray-900">{new Date(applicant.submittedAt).toLocaleString()}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-between items-center">
                    {applicant.resumeUrl ? (
                      <div className="flex space-x-2">
                        <a 
                          href={applicant.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </a>
                        <button 
                          onClick={() => handleDownloadResume(applicant.resumeUrl, applicant.name)} 
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic text-sm">No resume available</span>
                    )}
                    
                    {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
                      <button 
                        onClick={() => handleDeleteApplicant(applicant._id)} 
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {applicants.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: currentPage === 1 ? '#d1d5db' : 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)',
                    boxShadow: currentPage === 1 ? 'none' : '0 4px 16px rgba(2, 74, 122, 0.3)'
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: currentPage === totalPages ? '#d1d5db' : 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)',
                    boxShadow: currentPage === totalPages ? 'none' : '0 4px 16px rgba(2, 74, 122, 0.3)'
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
