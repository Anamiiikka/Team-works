// components/Sidebar.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      background: 'linear-gradient(180deg, #3A7BD5 0%, #024A7A 100%)'
    }}>
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">CMS</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/cms" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/cms/careers" className="block py-2 px-4 rounded hover:bg-gray-700">
                Careers
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/cms/leads" className="block py-2 px-4 rounded hover:bg-gray-700">
                Leads
              </Link>
            </li>

            {/* Conditionally render the Uploads link */}
            {/* It will appear for Employee, Admin, and SuperAdmin users */}
            {(currentUser?.role === 'Employee' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
              <li className="mb-4">
                <Link href="/cms/uploads" className="block py-2 px-4 rounded hover:bg-gray-700">
                  Uploads
                </Link>
              </li>
            )}

            {/* Conditionally render the User Management link */}
            {/* It will only appear if the user's role is 'Admin' or 'SuperAdmin' */}
            {(currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin') && (
              <li className="mb-4">
                <Link href="/cms/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
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
          className="w-full text-left py-2 px-4 rounded bg-red-600 hover:bg-red-700 font-bold transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
