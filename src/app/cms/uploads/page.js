// app/cms/uploads/page.js
'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, Plus, Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useAuth } from '@/hooks/useAuth';

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

async function getUploads(page = 1, sort = '-uploadedAt') {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = new URL(`${baseUrl}/api/uploads`);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', '10');
  url.searchParams.append('sort', sort);
  
  const res = await fetch(url, { 
    cache: 'no-store',
    credentials: 'include'
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Failed to fetch uploads: ${res.status}`);
  }
  return res.json();
}

async function deleteUpload(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const res = await fetch(`${baseUrl}/api/uploads`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Failed to delete upload: ${res.status}`);
  }
  return res.json();
}

export default function Uploads() {
  const { user: currentUser } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('-uploadedAt');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    visibilityLevel: 'Employee'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const canUpload = currentUser && ['SuperAdmin', 'Admin', 'Employee'].includes(currentUser.role);
  const canDelete = currentUser && ['SuperAdmin', 'Admin'].includes(currentUser.role);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        const data = await getUploads(currentPage, sortOrder);
        setUploads(data.uploads || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      }
    }
    if(currentUser) {
        fetchData();
    }
  }, [currentPage, sortOrder, currentUser]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const handleDeleteUpload = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteUpload(id);
        const data = await getUploads(currentPage, sortOrder);
        setUploads(data.uploads || []);
        setTotalPages(data.pagination?.totalPages || 1);
        if(data.uploads.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDownloadFile = async (fileUrl, title) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to download file');
      const blob = await response.blob();
      const fileName = `${title}.${fileUrl.split('.').pop()}`;
      saveAs(blob, fileName);
    } catch (error) {
      setError('Failed to download file.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setUploadData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadData.title || !uploadData.file || !uploadData.visibilityLevel) {
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('file', uploadData.file);
      formData.append('visibilityLevel', uploadData.visibilityLevel);

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        setUploadData({
          title: '',
          description: '',
          file: null,
          visibilityLevel: 'Employee'
        });
        
        // Refresh uploads list
        const data = await getUploads(currentPage, sortOrder);
        setUploads(data.uploads || []);
        setTotalPages(data.pagination?.totalPages || 1);
        
        // Hide form after success
        setTimeout(() => {
          setShowUploadForm(false);
        }, 2000);
      } else {
        console.error('Upload Error:', result.error);
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
      
      setTimeout(() => {
        setUploadStatus(null);
      }, 5000);
    }
  };

  const getVisibilityBadgeColor = (level) => {
    const colors = {
      'SuperAdmin': 'bg-red-100 text-red-800',
      'Admin': 'bg-orange-100 text-orange-800',
      'Employee': 'bg-blue-100 text-blue-800',
      'Public': 'bg-green-100 text-green-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">File Uploads</h2>
              
              {canUpload && (
                <button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                    boxShadow: '0 4px 16px rgba(82, 146, 228, 0.3)'
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Upload File
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && canUpload && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload New File</h3>
            
            {uploadStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                File uploaded successfully!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Error uploading file. Please check all required fields and try again.
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={uploadData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="Enter file title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility Level *
                  </label>
                  <select
                    name="visibilityLevel"
                    value={uploadData.visibilityLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    required
                  >
                    <option value="Employee">Employee Level</option>
                    <option value="Admin">Admin Level</option>
                    <option value="SuperAdmin">SuperAdmin Level</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    Choose who can view this file: Employee (all users), Admin (admins and above), SuperAdmin (superadmins only)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={uploadData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="Enter file description (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File *
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">Maximum file size: 10MB</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: isUploading ? '#9ca3af' : 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                    boxShadow: isUploading ? 'none' : '0 4px 16px rgba(82, 146, 228, 0.3)'
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg">
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-3 border border-gray-200 rounded-xl text-sm text-gray-600 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="-uploadedAt">Date (Newest First)</option>
            <option value="uploadedAt">Date (Oldest First)</option>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
          </select>
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
        ) : uploads.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{
              background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
            }}>
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No files available</h3>
            <p className="text-gray-600">There are currently no files uploaded to display.</p>
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
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Title</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Size</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Visibility</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Uploaded By</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Upload Date</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">File</th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {uploads.map((upload, index) => (
                      <tr key={upload._id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{upload.title}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 max-w-xs truncate" title={upload.description}>
                          {upload.description || 'No description'}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{formatFileSize(upload.fileSize)}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVisibilityBadgeColor(upload.visibilityLevel)}`}>
                            {upload.visibilityLevel}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {upload.uploadedBy ? upload.uploadedBy.name : 'Unknown'}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {upload.fileUrl ? (
                            <div className="flex items-center space-x-3">
                              <a 
                                href={upload.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200" 
                                title="View File"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button 
                                onClick={() => handleDownloadFile(upload.fileUrl, upload.title)} 
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200" 
                                title="Download File"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">N/A</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {canDelete && (
                            <button
                              onClick={() => handleDeleteUpload(upload._id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                              title="Delete File"
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {uploads.map((upload) => (
                <div key={upload._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">{upload.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Uploaded by: {upload.uploadedBy ? upload.uploadedBy.name : 'Unknown'}
                        </p>
                      </div>
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getVisibilityBadgeColor(upload.visibilityLevel)}`}>
                        {upload.visibilityLevel}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">File Size</p>
                        <p className="text-gray-900 font-medium">{formatFileSize(upload.fileSize)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Upload Date</p>
                        <p className="text-gray-900">
                          {upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {upload.description && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <p className="text-gray-900 text-sm leading-relaxed">
                            {upload.description}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {upload.fileUrl ? (
                        <>
                          <a
                            href={upload.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                            style={{
                              background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                              boxShadow: '0 4px 12px rgba(82, 146, 228, 0.3)'
                            }}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </a>
                          <button
                            onClick={() => handleDownloadFile(upload.fileUrl, upload.title)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                            style={{
                              background: 'linear-gradient(90deg, #059669 0%, #047857 100%)',
                              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                            }}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 italic text-center py-3">No file available</span>
                      )}
                    </div>

                    {/* Admin Actions - Separate section */}
                    {canDelete && (
                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleDeleteUpload(upload._id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                          style={{
                            background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {uploads.length > 0 && (
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
