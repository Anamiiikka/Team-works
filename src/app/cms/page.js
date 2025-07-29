// app/cms/page.js
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Users, Briefcase, Target, UserCog, FileText } from 'lucide-react';

// A reusable component for the stat cards on the dashboard
const StatCard = ({ title, value, icon: Icon, colorClass, loading }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transition-transform hover:scale-105">
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">
        {loading ? '...' : value}
      </p>
    </div>
    <div className={`p-3 rounded-full ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

export default function CmsDashboard() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({ leads: 0, careers: 0, users: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch dashboard stats when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const res = await fetch('/api/cms/stats', { credentials: 'include' });
        if (!res.ok) throw new Error('Could not fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Dashboard stats error:', error);
        // You can set an error state here to display a message on the dashboard if needed
      } finally {
        setStatsLoading(false);
      }
    };

    // Only fetch stats if the user is logged in
    if (currentUser) {
      fetchStats();
    }
  }, [currentUser]);

  // Display a loading state while the user session is being fetched
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* === Header Section === */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {currentUser?.name || 'User'}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here’s a quick summary of your application's activity.
          </p>
        </div>

        {/* === Stats Cards Section === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Leads"
            value={stats.leads}
            loading={statsLoading}
            icon={Target}
            colorClass="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Active Careers"
            value={stats.careers}
            loading={statsLoading}
            icon={Briefcase}
            colorClass="bg-green-100 text-green-600"
          />
          <StatCard
            title="Verified Users"
            value={stats.users}
            loading={statsLoading}
            icon={Users}
            colorClass="bg-purple-100 text-purple-600"
          />
        </div>

        {/* === Quick Actions Section === */}
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
                    <Link href="/cms/admin/users">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 cursor-pointer">
                            <UserCog className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Manage Users</h3>
                                <p className="text-gray-500 text-sm">Create, delete, or update user roles.</p>
                            </div>
                        </div>
                    </Link>
                )}

                <Link href="/cms/leads">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 cursor-pointer">
                        <FileText className="w-8 h-8 text-rose-600" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">View Leads</h3>
                            <p className="text-gray-500 text-sm">Review and export all lead submissions.</p>
                        </div>
                    </div>
                </Link>
                <Link href="/cms/careers">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 cursor-pointer">
                        <FileText className="w-8 h-8 text-rose-600" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">View Applicants</h3>
                            <p className="text-gray-500 text-sm">Review and export all applicant submissions.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
