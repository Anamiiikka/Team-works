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
  const { user: currentUser } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('-submittedAt');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExportingAll, setIsExportingAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      try {
        setError(null);
        const data = await getApplicants(currentPage, sortOrder, startDate, endDate);
        setApplicants(data.applicants || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [currentPage, sortOrder, startDate, endDate, currentUser]);

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
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Career Applicants</h2>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded text-sm text-gray-600 bg-white" placeholder="Start Date" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded text-sm text-gray-600 bg-white" placeholder="End Date" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)} className="p-2 border rounded text-sm text-gray-600 bg-white">
                <option value="-submittedAt">Date (Newest First)</option>
                <option value="submittedAt">Date (Oldest First)</option>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
              </select>
              <button onClick={handleExportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">Download Current Page</button>
              <button onClick={handleExportAllToExcel} disabled={isExportingAll} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-400">{isExportingAll ? 'Exporting...' : 'Download All Records'}</button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        ) : applicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No applicants available</p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applicants.map((applicant) => (
                      <tr key={applicant._id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm text-gray-900">{applicant.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{applicant.age}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{applicant.experience}</td>
                        <td className="py-4 px-6 text-sm">
                          {applicant.resumeUrl ? (
                            <div className="flex items-center space-x-3">
                              <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="View Resume"><Eye className="w-5 h-5" /></a>
                              <button onClick={() => handleDownloadResume(applicant.resumeUrl, applicant.name)} className="text-blue-600 hover:text-blue-800" title="Download Resume"><Download className="w-5 h-5" /></button>
                            </div>
                          ) : (<span className="text-gray-500">N/A</span>)}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">{applicant.jobId}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{new Date(applicant.submittedAt).toLocaleString()}</td>
                        <td className="py-4 px-6 text-sm">
                          {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
                            <button onClick={() => handleDeleteApplicant(applicant._id)} className="p-2 text-red-600 hover:text-red-800" title="Delete Applicant"><Trash2 className="w-5 h-5" /></button>
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
                <div key={applicant._id} className="bg-white rounded-lg shadow-md p-4">
                  {/* ... Mobile view card ... */}
                </div>
              ))}
            </div>
          </>
        )}

        {applicants.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-gray-700 text-sm">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors text-sm">Previous</button>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors text-sm">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
