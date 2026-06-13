import { useState, useEffect, useMemo } from 'react';
import API from '../api';
import * as XLSX from 'xlsx'; // ✅ For Excel export

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    qual: '',
    dept: '',
    exp: '',
    rating: '4.5',
    reviews: '0',
    about: '',
    opdTimings: '',
    roomNo: '',
  });

  // Department list (matching the public Doctors page)
  const departments = [
    "Gynecology",
    "Emergency ",
    "Neurology (Neurophysician)",
    "Homeopathy",
    "General Surgery",
    "General Medicine (Physician)",
    "Radiology",
    "Pediatrics",
    "Orthopedics",
    "Urology",
    "Pathology",
    "Neurosurgery",
    "Anesthesiology",
    "Ophthalmology",
    "Pediatric Surgery",
    "Plastic Surgery",
    "Dermatology",
    "Nephrology",
    "ENT",
    "Dentistry",
    "Pulmonology",
    "Cardiology",
    "Oncology",
    "Psychiatry",
    "RMO",
    "SMO",
   "AYURVEDA"
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filtered doctors based on search & department filter
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name?.toLowerCase().includes(term) ||
        doc.dept?.toLowerCase().includes(term) ||
        doc.qual?.toLowerCase().includes(term)
      );
    }
    if (deptFilter !== 'All') {
      filtered = filtered.filter(doc => doc.dept === deptFilter);
    }
    return filtered;
  }, [searchTerm, deptFilter, doctors]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await API.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load doctors');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!form.name || !form.dept || !form.exp || !form.opdTimings || !form.about || !form.roomNo) {
      setErrorMsg('Please fill all required fields (including Room No).');
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (imageFile) formData.append('image', imageFile);

      let res;
      if (editingId) {
        res = await API.put(`/admin/doctors/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await API.post('/admin/doctors', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setSuccessMsg(res.data.message);
      resetForm();
      fetchDoctors();
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
      name: '', qual: '', dept: '', exp: '', rating: '4.5', reviews: '0',
      about: '', opdTimings: '', roomNo: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  const editDoctor = (doc) => {
    setEditingId(doc._id);
    setForm({
      name: doc.name,
      qual: doc.qual,
      dept: doc.dept,
      exp: doc.exp,
      rating: doc.rating,
      reviews: doc.reviews,
      about: doc.about,
      opdTimings: doc.opdTimings,
      roomNo: doc.roomNo || '',
    });
    setImagePreview(doc.img);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Delete this doctor permanently? This action cannot be undone.')) return;
    try {
      await API.delete(`/admin/doctors/${id}`);
      fetchDoctors();
      setSuccessMsg('Doctor deleted successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Delete failed');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  // ✅ EXPORT TO EXCEL function – exports current filtered doctors
  const exportToExcel = () => {
    if (filteredDoctors.length === 0) {
      setErrorMsg('No doctors to export.');
      setTimeout(() => setErrorMsg(''), 2000);
      return;
    }

    // Prepare data for Excel: Full Name, Qualifications, Department, Experience, OPD Timings, Room No
    const exportData = filteredDoctors.map(doc => ({
      'Full Name': doc.name || '',
      'Qualifications': doc.qual || '',
      'Department': doc.dept || '',
      'Experience (years)': doc.exp || '',
      'OPD Timings': doc.opdTimings || '',
      'Room No': doc.roomNo || 'Not assigned',
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    // Auto-size columns (basic approach: set column widths)
    const maxWidths = [20, 30, 25, 15, 25, 15];
    worksheet['!cols'] = maxWidths.map(w => ({ wch: w }));

    // Create workbook and trigger download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doctors');
    XLSX.writeFile(workbook, `doctors_export_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.xlsx`);
    
    setSuccessMsg('Excel export completed!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Responsive styles injection (unchanged)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .admin-doctors-container {
          padding: 0.75rem !important;
        }
        .admin-doctors-form-grid {
          grid-template-columns: 1fr !important;
        }
        .admin-doctors-filters {
          flex-direction: column !important;
          align-items: stretch !important;
        }
        .admin-doctors-filters input,
        .admin-doctors-filters select {
          width: 100% !important;
        }
        .admin-doctors-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .admin-doctors-table th, 
        .admin-doctors-table td {
          padding: 8px 6px !important;
          font-size: 0.8rem !important;
        }
        .admin-doctors-action-btns {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-doctors-action-btns button {
          margin: 0 !important;
          width: 100%;
        }
      }
      @media (max-width: 480px) {
        .admin-doctors-table th,
        .admin-doctors-table td {
          font-size: 0.7rem !important;
          padding: 6px 4px !important;
        }
        .admin-doctors-table img {
          width: 35px !important;
          height: 35px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Styles object
  const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '1rem', fontFamily: "'Inter', system-ui, sans-serif" },
    heading: { fontSize: '1.8rem', marginBottom: '1rem', color: '#1f2937', fontWeight: 'bold' },
    alert: { padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '500' },
    success: { backgroundColor: '#d1fae5', color: '#065f46', borderLeft: '4px solid #10b981' },
    error: { backgroundColor: '#fee2e2', color: '#991b1b', borderLeft: '4px solid #ef4444' },
    form: { backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    label: { fontWeight: '600', fontSize: '0.9rem', color: '#374151' },
    input: { padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.9rem', transition: '0.2s' },
    textarea: { padding: '0.6rem', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '0.9rem', minHeight: '80px' },
    imagePreview: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px', marginTop: '8px', border: '1px solid #e5e7eb' },
    buttonPrimary: { backgroundColor: '#3b82f6', color: 'white', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.2s' },
    buttonSecondary: { backgroundColor: '#6b7280', marginLeft: '0.5rem' },
    buttonExcel: { backgroundColor: '#10b981', color: 'white', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.2s', marginLeft: '0.5rem' },
    filters: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' },
    searchInput: { flex: 2, minWidth: '200px', padding: '0.6rem 1rem', borderRadius: '40px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
    filterSelect: { padding: '0.6rem 1rem', borderRadius: '40px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer' },
    tableWrapper: { overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
    th: { padding: '12px', textAlign: 'left', backgroundColor: '#f3f4f6', fontWeight: '600', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' },
    doctorImg: { width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' },
    actionBtn: { padding: '0.3rem 0.8rem', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '500', marginRight: '0.5rem', fontSize: '0.8rem' },
    editBtn: { backgroundColor: '#f59e0b', color: 'white' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white' },
    loadingSpinner: { textAlign: 'center', padding: '2rem', color: '#6b7280' },
  };

  return (
    <div className="admin-doctors-container" style={styles.container}>
      <h2 style={styles.heading}>👨‍⚕️ Manage Doctors</h2>

      {successMsg && <div style={{ ...styles.alert, ...styles.success }}>{successMsg}</div>}
      {errorMsg && <div style={{ ...styles.alert, ...styles.error }}>{errorMsg}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="admin-doctors-form-grid" style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name *</label>
            <input style={styles.input} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Qualifications *</label>
            <input style={styles.input} value={form.qual} onChange={(e) => setForm({...form, qual: e.target.value})} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Department *</label>
            <select style={styles.input} value={form.dept} onChange={(e) => setForm({...form, dept: e.target.value})} required>
              <option value="">Select Department</option>
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Experience (years) *</label>
            <input type="number" step="1" style={styles.input} value={form.exp} onChange={(e) => setForm({...form, exp: e.target.value})} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" style={styles.input} value={form.rating} onChange={(e) => setForm({...form, rating: e.target.value})} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Reviews Count</label>
            <input type="number" step="1" style={styles.input} value={form.reviews} onChange={(e) => setForm({...form, reviews: e.target.value})} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>OPD Timings *</label>
            <input style={styles.input} value={form.opdTimings} onChange={(e) => setForm({...form, opdTimings: e.target.value})} placeholder="Mon-Fri: 9am-1pm" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Room No *</label>
            <input style={styles.input} value={form.roomNo} onChange={(e) => setForm({...form, roomNo: e.target.value})} placeholder="e.g., Room 201, Block A" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={styles.imagePreview} />}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>About / Bio *</label>
            <textarea style={styles.textarea} value={form.about} onChange={(e) => setForm({...form, about: e.target.value})} required />
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button type="submit" style={styles.buttonPrimary} disabled={submitting}>
            {submitting ? 'Saving...' : (editingId ? '✏️ Update Doctor' : '➕ Add Doctor')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{...styles.buttonPrimary, ...styles.buttonSecondary}}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="admin-doctors-filters" style={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Search by name, dept or qualification..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select style={styles.filterSelect} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 && 's'} found
        </span>
        {/* ✅ Export to Excel button */}
        <button onClick={exportToExcel} style={styles.buttonExcel}>
          📎 Export to Excel
        </button>
      </div>

      {loading ? (
        <div style={styles.loadingSpinner}>⏳ Loading doctors...</div>
      ) : (
        <div className="admin-doctors-table-wrapper" style={styles.tableWrapper}>
          <table className="admin-doctors-table" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Photo</th>
                <th style={styles.th}>Name & Qual</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Exp</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>OPD Timings</th>
                <th style={styles.th}>Room No</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(doc => (
                <tr key={doc._id}>
                  <td style={styles.td}>
                    <img src={doc.img} alt={doc.name} style={styles.doctorImg} />
                  </td>
                  <td style={styles.td}>
                    <strong>{doc.name}</strong><br />
                    <small style={{ color: '#6b7280' }}>{doc.qual}</small>
                  </td>
                  <td style={styles.td}>{doc.dept}</td>
                  <td style={styles.td}>{doc.exp} yrs</td>
                  <td style={styles.td}>⭐ {doc.rating} ({doc.reviews})</td>
                  <td style={styles.td}>{doc.opdTimings}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      display: 'inline-block', 
                      background: '#e0e7ff', 
                      color: '#4338ca', 
                      padding: '4px 8px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold' 
                    }}>
                      {doc.roomNo || 'Not assigned'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div className="admin-doctors-action-btns" style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      <button onClick={() => editDoctor(doc)} style={{...styles.actionBtn, ...styles.editBtn}}>Edit</button>
                      <button onClick={() => handleDelete(doc._id)} style={{...styles.actionBtn, ...styles.deleteBtn}}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    No doctors match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;