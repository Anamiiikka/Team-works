// hooks/useAuth.js
'use client';
import { useState, useEffect } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session', { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Failed to fetch session:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, []);

    return { user, loading };
}
