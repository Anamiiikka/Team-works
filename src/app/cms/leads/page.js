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
  const { user: currentUser } = useAuth(); // Get current user's role
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
    // Only fetch data if the user is logged in
    if(currentUser) {
        fetchData();
    }
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
    const dataToExport = leads.map(lead => ({
      'First Name': lead.firstName,
      'Last Name': lead.lastName,
      Email: lead.email,
      Company: lead.company || 'N/A',
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
        'First Name': lead.firstName,
        'Last Name': lead.lastName,
        Email: lead.email,
        Company: lead.company || 'N/A',
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
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Lead Submissions</h2>
          
          {/* Filters and Export - Mobile First */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border rounded text-sm text-gray-600 bg-white"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded text-sm text-gray-600 bg-white"
                placeholder="End Date"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border rounded text-sm text-gray-600 bg-white"
              >
                <option value="-submittedAt">Date (Newest First)</option>
                <option value="submittedAt">Date (Oldest First)</option>
                <option value="firstName">First Name (A-Z)</option>
                <option value="-firstName">First Name (Z-A)</option>
                <option value="lastName">Last Name (A-Z)</option>
                <option value="-lastName">Last Name (Z-A)</option>
              </select>
              <button
                onClick={handleExportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Download Current Page
              </button>
              <button
                onClick={handleExportAllToExcel}
                disabled={isExportingAll}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-300"
              >
                {isExportingAll ? 'Exporting...' : 'Download All Records'}
              </button>
            </div>
          </div>
        </div>

        {/* Error or No Data States */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No leads available</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request From</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900">{lead.firstName}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">{lead.lastName}</td>
                        <td className="py-4 px-4 text-sm text-gray-900 break-all">
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-800">
                            {lead.email}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{lead.company || 'N/A'}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">{lead.industry}</td>
                        <td className="py-4 px-4 text-sm text-gray-900 max-w-xs truncate" title={lead.message}>
                          {lead.message}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{lead.requestFrom}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            disabled={currentUser?.role === 'Employee'}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                <div key={lead._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="text-blue-600 hover:text-blue-800 text-sm break-all"
                        >
                          {lead.email}
                        </a>
                      </div>
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        disabled={currentUser?.role === 'Employee'}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex-shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        title={currentUser?.role === 'Employee' ? 'Deletion not allowed' : 'Delete Lead'}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Company:</span>
                        <span className="ml-2 text-gray-900">{lead.company || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Industry:</span>
                        <span className="ml-2 text-gray-900">{lead.industry}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Request From:</span>
                        <span className="ml-2 text-gray-900">{lead.requestFrom}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Submitted:</span>
                        <span className="ml-2 text-gray-900">
                          {lead.submittedAt ? new Date(lead.submittedAt).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-gray-500">Message:</span>
                      <div className="mt-1 p-2 bg-gray-50 rounded text-gray-900">
                        {lead.message}
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
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-gray-700 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
