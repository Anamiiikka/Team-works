// app/cms/admin/users/page.js
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, XCircle, Trash2 } from 'lucide-react';

// --- New Component for the User Creation Form ---
const CreateUserForm = ({ currentUser, onUserCreated, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password || !role) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/cms/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to create user.');
            }
            onUserCreated();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-6 p-6 bg-gray-50 border rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Register New User</h2>
            <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded" required />
                    <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded" required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded" required minLength="6" />
                    <select value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded bg-white">
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                        {currentUser?.role === 'SuperAdmin' && <option value="SuperAdmin">SuperAdmin</option>}
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex items-center gap-4">
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
                        {loading ? 'Creating...' : 'Create User'}
                    </button>
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};


export default function UserManagementPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/users', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch users.');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchUsers();
  }, [currentUser]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch(`/api/cms/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
        credentials: 'include',
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to update role.');
    }
  };
  
  const handleDeleteUser = async (userId) => {
      if(window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
          try {
              const res = await fetch(`/api/cms/users/${userId}`, { method: 'DELETE', credentials: 'include' });
              if (!res.ok) {
                  const data = await res.json();
                  throw new Error(data.message || 'Failed to delete user.');
              }
              fetchUsers();
          } catch(err) {
              setError(err.message);
          }
      }
  };

  if (authLoading || loading) return <p className="text-center p-4 text-gray-900">Loading...</p>;
  if (error) return <p className="text-center text-red-500 p-4">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 text-gray-900">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
                {showCreateForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
                {showCreateForm ? 'Cancel' : 'Register New User'}
            </button>
        </div>

      {showCreateForm && (
          <CreateUserForm
              currentUser={currentUser}
              onUserCreated={() => {
                  setShowCreateForm(false);
                  fetchUsers();
              }}
              onCancel={() => setShowCreateForm(false)}
          />
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role || 'Not Assigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                  <select defaultValue={user.role || ''} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="p-2 border border-gray-300 rounded" disabled={(user.role === 'SuperAdmin' && currentUser?.role !== 'SuperAdmin') || user._id === currentUser?.userId}>
                    <option value="" disabled>Change role</option>
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    {currentUser?.role === 'SuperAdmin' && <option value="SuperAdmin">SuperAdmin</option>}
                  </select>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    title="Delete User"
                    disabled={
                        (user.role === 'SuperAdmin' && currentUser?.role !== 'SuperAdmin') || // Can't touch SuperAdmins unless you are one
                        user._id === currentUser?.userId || // Can't delete yourself
                        (currentUser?.role === 'Admin' && user.role === 'Admin') // An Admin can't delete another Admin
                    }
                  >
                      <Trash2 size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
