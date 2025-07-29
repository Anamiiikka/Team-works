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

  const canUpload = currentUser && ['SuperAdmin', 'Admin'].includes(currentUser.role);

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
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">File Uploads</h2>
          
          {canUpload && (
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Upload File
            </button>
          )}
        </div>

        {/* Upload Form */}
        {showUploadForm && canUpload && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload New File</h3>
            
            {uploadStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
                File uploaded successfully!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Public">Public</option>
                  </select>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Maximum file size: 10MB</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4">
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-2 border rounded text-sm text-gray-600 bg-white"
          >
            <option value="-uploadedAt">Date (Newest First)</option>
            <option value="uploadedAt">Date (Oldest First)</option>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
          </select>
        </div>

        {/* Error or No Data States */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        ) : uploads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No files available</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {uploads.map((upload) => (
                      <tr key={upload._id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900 font-medium">{upload.title}</td>
                        <td className="py-4 px-4 text-sm text-gray-900 max-w-xs truncate" title={upload.description}>
                          {upload.description || 'No description'}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{formatFileSize(upload.fileSize)}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVisibilityBadgeColor(upload.visibilityLevel)}`}>
                            {upload.visibilityLevel}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {upload.uploadedBy ? upload.uploadedBy.name : 'Unknown'}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {upload.fileUrl ? (
                            <div className="flex items-center space-x-3">
                              <a 
                                href={upload.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-800" 
                                title="View File"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button 
                                onClick={() => handleDownloadFile(upload.fileUrl, upload.title)} 
                                className="text-blue-600 hover:text-blue-800" 
                                title="Download File"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {canUpload && (
                            <button
                              onClick={() => handleDeleteUpload(upload._id)}
                              className="text-red-600 hover:text-red-800"
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
                <div key={upload._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{upload.title}</h3>
                        <p className="text-sm text-gray-500">
                          Uploaded by: {upload.uploadedBy ? upload.uploadedBy.name : 'Unknown'}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVisibilityBadgeColor(upload.visibilityLevel)}`}>
                        {upload.visibilityLevel}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">File Size:</span>
                        <span className="ml-2 text-gray-900">{formatFileSize(upload.fileSize)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Upload Date:</span>
                        <span className="ml-2 text-gray-900">
                          {upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {upload.description && (
                      <div className="text-sm">
                        <span className="text-gray-500">Description:</span>
                        <div className="mt-1 p-2 bg-gray-50 rounded text-gray-900">
                          {upload.description}
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
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </a>
                          <button
                            onClick={() => handleDownloadFile(upload.fileUrl, upload.title)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500">No file available</span>
                      )}
                    </div>

                    {/* Admin Actions - Separate section */}
                    {canUpload && (
                      <div className="pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleDeleteUpload(upload._id)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
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
