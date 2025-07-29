// app/cms/jobs/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

async function getJobs(page = 1, sort = '-postedDate', search = '', department = '', isActive = '') {
  const url = new URL('/api/jobs', window.location.origin);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', '10');
  url.searchParams.append('sort', sort);
  if (search) url.searchParams.append('search', search);
  if (department) url.searchParams.append('department', department);
  if (isActive !== '') url.searchParams.append('isActive', isActive);
  
  const res = await fetch(url, { 
    cache: 'no-store',
    credentials: 'include'
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Failed to fetch jobs: ${res.status}`);
  }
  return res.json();
}

async function createJob(jobData) {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create job');
  }
  return res.json();
}

async function updateJob(jobData) {
  const res = await fetch('/api/jobs', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to update job');
  }
  return res.json();
}

async function deleteJob(id) {
  const res = await fetch('/api/jobs', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to delete job');
  }
  return res.json();
}

export default function JobManagement() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('-postedDate');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    jobId: '',
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    isActive: true
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const data = await getJobs(currentPage, sortOrder, searchTerm, selectedDepartment, activeFilter);
      setJobs(data.jobs || []);
      setDepartments(data.departments || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder, searchTerm, selectedDepartment, activeFilter]);

  useEffect(() => {
    if (currentUser) {
      fetchJobs();
    }
  }, [currentUser, fetchJobs]);

  if (authLoading || loading) {
    return (
      <div className="p-6 min-h-screen" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: 'Inter'
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
            <p className="text-gray-600">Loading job management...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentFilter = (dept) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
  };

  const handleActiveFilter = (active) => {
    setActiveFilter(active);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({
      jobId: '',
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      experience: '',
      description: '',
      requirements: [''],
      responsibilities: [''],
      isActive: true
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Filter out empty requirements and responsibilities
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        responsibilities: formData.responsibilities.filter(resp => resp.trim())
      };

      if (editingJob) {
        await updateJob({ ...cleanedData, id: editingJob._id });
      } else {
        await createJob(cleanedData);
      }
      
      resetForm();
      fetchJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      jobId: job.jobId || '',
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [''],
      isActive: job.isActive
    });
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        setLoading(true);
        await deleteJob(id);
        fetchJobs();
        if (jobs.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (error && (error.includes('Forbidden') || error.includes('permissions') || error.includes('401') || error.includes('403'))) {
    return (
      <div className="p-6 min-h-screen" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: 'Inter'
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-l-4 border-red-500">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don&apos;t have permission to manage jobs. Only Admins and Super Admins can access this section.</p>
            <div className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
              <p><strong>Error Details:</strong></p>
              <p>{error}</p>
              <p>User: {currentUser ? JSON.stringify(currentUser) : 'null'}</p>
              <p>Role: {currentUser?.role || 'none'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 min-h-screen" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter'
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg" style={{
            background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
          }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Job Management</h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                  boxShadow: '0 4px 16px rgba(82, 146, 228, 0.3)'
                }}
              >
                <Plus className="w-4 h-4" />
                Add New Job
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => handleDepartmentFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={activeFilter}
              onChange={(e) => handleActiveFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
            >
              <option value="-postedDate">Date (Newest First)</option>
              <option value="postedDate">Date (Oldest First)</option>
              <option value="title">Title (A-Z)</option>
              <option value="-title">Title (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <XCircle className="w-6 h-6 text-red-500 mr-3" />
              <p className="text-red-800 font-medium">Error: {error}</p>
            </div>
          </div>
        )}

        {/* Job Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job ID *</label>
                  <input
                    type="text"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleInputChange}
                    placeholder="e.g., JOB-001, DEV-2024-01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter a unique identifier for this job posting</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g., 2-3 years"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayInputChange(index, 'requirements', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                        placeholder="Enter requirement"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField(index, 'requirements')}
                          className="px-3 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('requirements')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Requirement
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities *</label>
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleArrayInputChange(index, 'responsibilities', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-gray-900"
                        placeholder="Enter responsibility"
                      />
                      {formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField(index, 'responsibilities')}
                          className="px-3 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('responsibilities')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Responsibility
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <label className="text-sm font-medium text-gray-700">Job is Active</label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: loading ? '#9ca3af' : 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                      boxShadow: loading ? 'none' : '0 4px 16px rgba(82, 146, 228, 0.3)'
                    }}
                  >
                    {loading ? 'Saving...' : (editingJob ? 'Update Job' : 'Create Job')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{
              background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)'
            }}>
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Start by creating your first job posting.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                boxShadow: '0 4px 16px rgba(82, 146, 228, 0.3)'
              }}
            >
              Create First Job
            </button>
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
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Job ID</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Job Title</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Department</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Location</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Posted Date</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {jobs.map((job, index) => (
                      <tr key={job._id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">
                            {job.jobId || 'N/A'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{job.title}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{job.department}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{job.location}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          {job.isActive ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center text-red-600">
                              <XCircle className="w-4 h-4 mr-1" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEdit(job)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                              title="Edit Job"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">
                            {job.jobId || 'N/A'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 truncate">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.department} • {job.location}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        {job.isActive ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Experience</p>
                        <p className="text-gray-900">{job.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Posted Date</p>
                        <p className="text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                      <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(job)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{
                          background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
                          boxShadow: '0 4px 12px rgba(82, 146, 228, 0.3)'
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{
                          background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
          </>
        )}
      </div>
    </div>
  );
}
