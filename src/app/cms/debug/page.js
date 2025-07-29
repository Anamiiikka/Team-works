// app/cms/debug/page.js
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function DebugPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [sessionData, setSessionData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Test session endpoint
    fetch('/api/auth/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSessionData(data))
      .catch(err => setErrors(prev => ({ ...prev, session: err.message })));

    // Test jobs endpoint
    fetch('/api/jobs?page=1&limit=1', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setJobsData(data))
      .catch(err => setErrors(prev => ({ ...prev, jobs: err.message })));

    // Test users endpoint
    fetch('/api/cms/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsersData(data))
      .catch(err => setErrors(prev => ({ ...prev, users: err.message })));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">useAuth Hook</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Loading:</strong> {authLoading.toString()}</p>
            <p><strong>User:</strong> {currentUser ? JSON.stringify(currentUser, null, 2) : 'null'}</p>
            <p><strong>Role:</strong> {currentUser?.role || 'none'}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Session API Response</h2>
          <div className="space-y-2 text-sm">
            {errors.session && <p className="text-red-500">Error: {errors.session}</p>}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(sessionData, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Jobs API Response</h2>
          <div className="space-y-2 text-sm">
            {errors.jobs && <p className="text-red-500">Error: {errors.jobs}</p>}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(jobsData, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Users API Response</h2>
          <div className="space-y-2 text-sm">
            {errors.users && <p className="text-red-500">Error: {errors.users}</p>}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(usersData, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Cookie Information</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Document Cookies:</strong></p>
          <pre className="bg-gray-100 p-2 rounded text-xs">
            {document.cookie || 'No cookies found'}
          </pre>
        </div>
      </div>
    </div>
  );
}
