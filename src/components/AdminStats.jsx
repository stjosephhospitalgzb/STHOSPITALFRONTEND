import React, { useState, useEffect } from 'react';
import API from '../api'; // your axios instance with interceptors

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/stats'); // adjust endpoint
      setStats(res.data);
    } catch (err) {
      console.error('Stats error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      {/* render stats */}
    </div>
  );
};

export default AdminStats;