// components/Sidebar.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook

export default function Sidebar() {
  const router = useRouter();
  const { user: currentUser } = useAuth(); // Get the current user's data

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      // On success, redirect the user to the login page
      router.push('/auth/login');
      router.refresh(); // Refresh the page to clear any cached user data
    } catch (error) {
      console.error('Failed to logout:', error);
      // You can add user-facing error handling here if needed
    }
  };

  return (
    <aside className="flex flex-col w-64 h-screen text-white p-4" style={{
      background: 'linear-gradient(90deg, #024A7A 0%, #3A6FB8 100%)',
      fontFamily: 'Inter'
    }}>
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">CMS</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/cms" className="block py-2 px-4 rounded hover:text-white hover:bg-blue-50/10 transition-colors">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/cms/careers" className="block py-2 px-4 rounded hover:text-white hover:bg-blue-50/10 transition-colors">
                Careers
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/cms/leads" className="block py-2 px-4 rounded hover:text-white hover:bg-blue-50/10 transition-colors">
                Leads
              </Link>
            </li>

            {/* Conditionally render the Uploads link */}
            {/* It will appear for Employee, Admin, and SuperAdmin users */}
            {(currentUser?.role === 'Employee' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
              <li className="mb-4">
                <Link href="/cms/uploads" className="block py-2 px-4 rounded hover:text-white hover:bg-blue-50/10 transition-colors">
                  Uploads
                </Link>
              </li>
            )}

            {/* Conditionally render the User Management link */}
            {/* It will only appear if the user's role is 'Admin' or 'SuperAdmin' */}
            {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
              <li className="mb-4">
                <Link href="/cms/admin/users" className="block py-2 px-4 rounded hover:text-white hover:bg-blue-50/10 transition-colors">
                  User Management
                </Link>
              </li>
            )}
            
          </ul>
        </nav>
      </div>

      {/* Logout button positioned at the bottom */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-white font-medium pl-6 pr-2 py-3 rounded-full flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105"
          style={{
            background: 'linear-gradient(90deg, #5292E4 0%, #036DA9 100%)',
            boxShadow: '0 8px 32px rgba(82, 146, 228, 0.3)'
          }}
        >
          Logout
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 ml-4 transition-transform duration-300 hover:rotate-12" style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <ArrowRight className="w-4 h-4 transform rotate-[-45deg]" style={{ color: '#036DA9' }} />
          </div>
        </button>
      </div>
    </aside>
  );
}
