import { useEffect, useState } from 'react';
import API from '../api';

const AdminStats = () => {
  const [stats, setStats] = useState({ doctors: 0, gallery: 0, careers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;

  const styles = {
    container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' },
    card: {
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      textAlign: 'center',
      borderTop: '4px solid #3b82f6',
    },
    number: { fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' },
    label: { fontSize: '1rem', color: '#6b7280' },
    icon: { fontSize: '2rem', marginBottom: '0.5rem' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>👨‍⚕️</div>
        <div style={styles.number}>{stats.doctors}</div>
        <div style={styles.label}>Total Doctors</div>
      </div>
      <div style={styles.card}>
        <div style={styles.icon}>🖼️</div>
        <div style={styles.number}>{stats.gallery}</div>
        <div style={styles.label}>Gallery Images</div>
      </div>
      <div style={styles.card}>
        <div style={styles.icon}>💼</div>
        <div style={styles.number}>{stats.careers}</div>
        <div style={styles.label}>Career Applications</div>
      </div>
    </div>
  );
};

export default AdminStats;