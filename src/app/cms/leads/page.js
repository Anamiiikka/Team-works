// app/cms/leads/page.js
'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Updated to include credentials
async function getLeads(page = 1, sort = '-submittedAt', startDate = '', endDate = '') {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', '10');
  url.searchParams.append('sort', sort);
  if (startDate) url.searchParams.append('startDate', startDate);
  if (endDate) url.searchParams.append('endDate', endDate);
  
  const res = await fetch(url, { 
    cache: 'no-store',
    credentials: 'include' // Sends auth cookie
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Failed to fetch leads: ${res.status}`);
  }
  return res.json();
}

// Updated to include credentials
async function deleteLead(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include' // Sends auth cookie
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Failed to delete lead: ${res.status}`);
  }
  return res.json();
}

export default function Leads() {
  const { user: currentUser, loading: authLoading } = useAuth(); // Get current user's role
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('-submittedAt');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExportingAll, setIsExportingAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        const data = await getLeads(currentPage, sortOrder, startDate, endDate);
        setLeads(data.leads || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      }
    }
    // Only fetch data if the user is logged in and has permission
    if(currentUser && (currentUser.role === 'Admin' || currentUser.role === 'SuperAdmin')) {
      fetchData();
    }
  }, [currentPage, sortOrder, startDate, endDate, currentUser]);

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
            <p className="text-gray-600 mb-4">You don&apos;t have permission to view leads. Only Admins and Super Admins can access this section.</p>
            <p className="text-sm text-gray-500">Current role: {currentUser?.role || 'None'}</p>
          </div>
        </div>
      </div>
    );
  }  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const handleExportToExcel = () => {
    const dataToExport = leads.map(lead => ({
      Name: lead.name,
      Email: lead.email,
      Industry: lead.industry,
      Message: lead.message,
      'Request From': lead.requestFrom,
      'Submitted At': lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Leads_CurrentPage.xlsx');
  };

  const handleExportAllToExcel = async () => {
    setIsExportingAll(true);
    setError(null);
    try {
      // We need a separate fetching logic for all leads that doesn't rely on pagination state
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`);
      url.searchParams.append('sort', sortOrder);
      if (startDate) url.searchParams.append('startDate', startDate);
      if (endDate) url.searchParams.append('endDate', endDate);
      
      const res = await fetch(url, { cache: 'no-store', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch all records for export');
      const allData = await res.json();
      const allLeads = allData.leads || [];

      if (allLeads.length === 0) {
        alert('No records to export.');
        return;
      }

      const dataToExport = allLeads.map(lead => ({
        Name: lead.name,
        Email: lead.email,
        Industry: lead.industry,
        Message: lead.message,
        'Request From': lead.requestFrom,
        'Submitted At': lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A',
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Leads_AllRecords.xlsx');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExportingAll(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        const data = await getLeads(currentPage, sortOrder, startDate, endDate);
        setLeads(data.leads || []);
        setTotalPages(data.pagination?.totalPages || 1);
        if(data.leads.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg" style={{
            background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
          }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Lead Submissions</h2>
          </div>
          
          {/* Filters and Export - Mobile First */}
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

        {/* Error or No Data States */}
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
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{
              background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
            }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No leads available</h3>
            <p className="text-gray-600">There are currently no lead submissions to display.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead style={{
                    background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
                  }}>
                    <tr>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Industry</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Message</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Request From</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Submitted At</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {leads.map((lead, index) => (
                      <tr key={lead._id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{lead.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 break-all">
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                            {lead.email}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{lead.industry}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 max-w-xs truncate" title={lead.message}>
                          {lead.message}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{lead.requestFrom}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            disabled={currentUser?.role === 'Employee'}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                            title={currentUser?.role === 'Employee' ? 'Deletion not allowed' : 'Delete Lead'}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {leads.map((lead) => (
                <div key={lead._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">
                          {lead.name}
                        </h3>
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm break-all transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        disabled={currentUser?.role === 'Employee'}
                        className="ml-3 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200 flex-shrink-0 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        title={currentUser?.role === 'Employee' ? 'Deletion not allowed' : 'Delete Lead'}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Industry</p>
                        <p className="text-gray-900 font-medium">{lead.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Request From</p>
                        <p className="text-gray-900 font-medium">{lead.requestFrom}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Submitted</p>
                      <p className="text-gray-900">
                        {lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-900 text-sm leading-relaxed">
                          {lead.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {leads.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
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
