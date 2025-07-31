'use client';

import { useState } from 'react';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Password updated successfully!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.message || 'Password update failed.');
      }
    } catch {
      setMessage('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-black">Reset Password</h2>
      {message && (
        <div
          className="mb-4 text-center font-semibold text-lg text-black"
          role="alert"
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border p-2 rounded text-black placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border p-2 rounded text-black placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
