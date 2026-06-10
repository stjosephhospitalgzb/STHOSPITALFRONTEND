import React, { useState, useEffect } from 'react';
import API from '../api';  // ✅ Corrected path (from src/components to src/api.js)

const ParamedicalGalleryManager = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('All');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Institute');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchImages = async () => {
    try {
      const res = await API.get('/paramedical-gallery');
      setImages(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    setLoading(true);
    try {
      await API.post('/paramedical-gallery/admin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Image uploaded successfully');
      setTitle('');
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      setMessage('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await API.delete(`/paramedical-gallery/admin/${id}`);
        fetchImages();
        setMessage('Image deleted');
      } catch (err) {
        console.error(err);
        setMessage('Delete failed');
      }
    }
  };

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Paramedical Institute Gallery Manager</h2>
      {message && <div style={{ padding: '10px', marginBottom: '20px', background: '#e2e8f0', borderRadius: '8px' }}>{message}</div>}

      {/* Upload Form */}
      <form onSubmit={handleUpload} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '12px' }}>
        <h3>Add New Image</h3>
        <div style={{ marginBottom: '12px' }}>
          <label>Title: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ marginLeft: '10px', padding: '6px', width: '250px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: '10px', padding: '6px' }}>
            <option value="Institute">Institute</option>
            <option value="Lab">Lab</option>
            <option value="Events">Events</option>
          </select>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Image File: </label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading} style={{ background: '#2563eb', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'Institute', 'Lab', 'Events'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '30px',
              border: '1px solid #ccc',
              background: filter === cat ? '#2563eb' : '#fff',
              color: filter === cat ? '#fff' : '#333',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredImages.map(img => (
          <div key={img._id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
            <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '10px' }}>
              <div><strong>{img.title}</strong></div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>Category: {img.category}</div>
              <button 
                onClick={() => handleDelete(img._id)}
                style={{ marginTop: '8px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredImages.length === 0 && <p>No images found in this category.</p>}
    </div>
  );
};

export default ParamedicalGalleryManager;