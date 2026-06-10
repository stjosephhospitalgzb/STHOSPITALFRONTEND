import { useState, useEffect } from 'react';
import API from '../api';

const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    department: 'Medical',
    type: 'Full Time',
    experience: '',
    description: '',
    category: 'Medical',
    qualification: '',
    vacancies: 1,
    location: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const departments = ["Medical", "Nursing", "Non-Medical"];
  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load jobs');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'vacancies' ? parseInt(value) || 0 : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.department || !form.type || !form.experience) {
      setErrorMsg('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      let res;
      if (editingId) {
        res = await API.put(`/admin/jobs/${editingId}`, form);
      } else {
        res = await API.post('/admin/jobs', form);
      }
      setSuccessMsg(res.data.message);
      resetForm();
      fetchJobs();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Operation failed');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '', department: 'Medical', type: 'Full Time', experience: '', description: '',
      category: 'Medical', qualification: '', vacancies: 1, location: '',
    });
  };

  const editJob = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title,
      department: job.department,
      type: job.type,
      experience: job.experience,
      description: job.description || '',
      category: job.category || 'Medical',
      qualification: job.qualification || '',
      vacancies: job.vacancies || 1,
      location: job.location || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job permanently?')) return;
    try {
      await API.delete(`/admin/jobs/${id}`);
      setSuccessMsg('Job deleted');
      fetchJobs();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Delete failed');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '1rem' },
    heading: { fontSize: '1.8rem', marginBottom: '1rem', color: '#1f2937' },
    form: { backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    label: { fontWeight: '600', fontSize: '0.9rem' },
    input: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' },
    select: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' },
    textarea: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px' },
    button: { backgroundColor: '#3b82f6', color: 'white', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' },
    tableWrapper: { overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '12px', textAlign: 'left', backgroundColor: '#f3f4f6', fontWeight: '600' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' },
    actionBtn: { padding: '0.3rem 0.8rem', borderRadius: '30px', border: 'none', cursor: 'pointer', marginRight: '0.5rem', fontSize: '0.8rem' },
    editBtn: { backgroundColor: '#f59e0b', color: 'white' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white' },
    alert: { padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
    success: { backgroundColor: '#d1fae5', color: '#065f46' },
    error: { backgroundColor: '#fee2e2', color: '#991b1b' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💼 Manage Careers / Jobs</h2>
      {successMsg && <div style={{ ...styles.alert, ...styles.success }}>{successMsg}</div>}
      {errorMsg && <div style={{ ...styles.alert, ...styles.error }}>{errorMsg}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Title *</label>
            <input style={styles.input} name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Department *</label>
            <select style={styles.select} name="department" value={form.department} onChange={handleChange} required>
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select style={styles.select} name="category" value={form.category} onChange={handleChange}>
              {departments.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Type *</label>
            <select style={styles.select} name="type" value={form.type} onChange={handleChange}>
              {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Experience Required *</label>
            <input style={styles.input} name="experience" value={form.experience} onChange={handleChange} placeholder="e.g., 2-4 Years" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Qualification</label>
            <input style={styles.input} name="qualification" value={form.qualification} onChange={handleChange} placeholder="e.g., B.Sc Nursing, MBBS" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Vacancies</label>
            <input style={styles.input} name="vacancies" type="number" value={form.vacancies} onChange={handleChange} min="1" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Location</label>
            <input style={styles.input} name="location" value={form.location} onChange={handleChange} placeholder="e.g., Mau, Delhi, Mumbai" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description (optional)</label>
            <textarea style={styles.textarea} name="description" value={form.description} onChange={handleChange} />
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Saving...' : (editingId ? '✏️ Update Job' : '➕ Add Job')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ ...styles.button, backgroundColor: '#6b7280' }}>Cancel</button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title / Category</th>
                <th style={styles.th}>Dept / Type</th>
                <th style={styles.th}>Qualification</th>
                <th style={styles.th}>Vacancies</th>
                <th style={styles.th}>Experience</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Posted Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td style={styles.td}>
                    <strong>{job.title}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>{job.category}</div>
                  </td>
                  <td style={styles.td}>
                    {job.department}<br />
                    <span style={{ fontSize: '12px', color: '#666' }}>{job.type}</span>
                  </td>
                  <td style={styles.td}>{job.qualification || '-'}</td>
                  <td style={styles.td}>{job.vacancies || 1}</td>
                  <td style={styles.td}>{job.experience}</td>
                  <td style={styles.td}>{job.location || '-'}</td>
                  <td style={styles.td}>{formatDate(job.postedDate)}</td>
                  <td style={styles.td}>
                    <button onClick={() => editJob(job)} style={{...styles.actionBtn, ...styles.editBtn}}>Edit</button>
                    <button onClick={() => deleteJob(job._id)} style={{...styles.actionBtn, ...styles.deleteBtn}}>Delete</button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No jobs yet. Add one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;