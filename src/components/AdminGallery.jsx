import { useState, useEffect } from 'react';
import API from '../api';

const AdminGallery = () => {
  // ---- Images state ----
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageForm, setImageForm] = useState({ label: '', category: 'Facilities' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // ---- Videos state ----
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: '', youtubeId: '' });
  const [videoUrlInput, setVideoUrlInput] = useState(''); // raw URL from user
  const [videoThumbnail, setVideoThumbnail] = useState(''); // preview thumbnail

  // ---- Common UI state ----
  const [activeTab, setActiveTab] = useState('images');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const categories = ["Facilities", "Departments", "Patient Care", "Events", "Community"];

  // Fetch images and videos
  useEffect(() => {
    fetchImages();
    fetchVideos();
  }, []);

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const res = await API.get('/gallery');
      setImages(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load images');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setLoadingImages(false);
    }
  };

  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const res = await API.get('/videos');
      setVideos(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load videos');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setLoadingVideos(false);
    }
  };

  // ----- Helper: Extract YouTube ID from any URL -----
  const extractYouTubeID = (url) => {
    if (!url) return null;
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|(?:youtu\.be\/))([^&\n]{11})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  };

  // Handle URL input and auto-extract ID
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrlInput(url);
    const id = extractYouTubeID(url);
    if (id) {
      setVideoForm(prev => ({ ...prev, youtubeId: id }));
      setVideoThumbnail(`https://img.youtube.com/vi/${id}/mqdefault.jpg`);
      setErrorMsg('');
    } else if (url && url.trim() !== '') {
      setVideoThumbnail('');
      setErrorMsg('Invalid YouTube URL. Please paste a valid link (e.g., https://youtu.be/... or https://www.youtube.com/watch?v=...)');
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setVideoThumbnail('');
      setVideoForm(prev => ({ ...prev, youtubeId: '' }));
    }
  };

  // Video submission
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.youtubeId) {
      setErrorMsg('Title and a valid YouTube ID are required');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await API.post('/admin/videos', videoForm);
      setSuccessMsg(res.data.message);
      setVideoForm({ title: '', youtubeId: '' });
      setVideoUrlInput('');
      setVideoThumbnail('');
      fetchVideos();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to add video');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVideoDelete = async (id) => {
    if (!window.confirm('Delete this video permanently?')) return;
    try {
      await API.delete(`/admin/videos/${id}`);
      setSuccessMsg('Video deleted');
      fetchVideos();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Delete failed');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  // Image handlers (unchanged)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageForm.label || !imageForm.category || !imageFile) {
      setErrorMsg('Please fill all fields and select an image');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const formData = new FormData();
      formData.append('label', imageForm.label);
      formData.append('category', imageForm.category);
      formData.append('image', imageFile);
      const res = await API.post('/admin/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMsg(res.data.message);
      setImageForm({ label: '', category: 'Facilities' });
      setImageFile(null);
      setImagePreview('');
      fetchImages();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Upload failed');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageDelete = async (id) => {
    if (!window.confirm('Delete this image permanently?')) return;
    try {
      await API.delete(`/admin/gallery/${id}`);
      setSuccessMsg('Image deleted');
      fetchImages();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Delete failed');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  // Styles (unchanged)
  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '1rem' },
    heading: { fontSize: '1.8rem', marginBottom: '1rem', color: '#1f2937' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' },
    tab: (active) => ({
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      fontWeight: active ? '700' : '500',
      color: active ? '#2563eb' : '#6b7280',
      borderBottom: active ? '2px solid #2563eb' : 'none',
      cursor: 'pointer',
    }),
    form: { backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    label: { fontWeight: '600', fontSize: '0.9rem' },
    input: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' },
    select: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' },
    imagePreview: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' },
    button: { backgroundColor: '#3b82f6', color: 'white', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' },
    galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1rem', marginTop: '1rem' },
    card: { border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' },
    img: { width: '100%', height: '150px', objectFit: 'cover' },
    info: { padding: '0.75rem' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '20px', cursor: 'pointer', marginTop: '0.5rem' },
    alert: { padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
    success: { backgroundColor: '#d1fae5', color: '#065f46' },
    error: { backgroundColor: '#fee2e2', color: '#991b1b' },
    videoList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))', gap: '1rem', marginTop: '1rem' },
    videoCard: { backgroundColor: '#f9fafb', borderRadius: '12px', padding: '1rem', border: '1px solid #e5e7eb' },
    videoTitle: { fontWeight: 'bold', marginBottom: '0.5rem' },
    thumbnail: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📸 Gallery Manager</h2>
      {successMsg && <div style={{ ...styles.alert, ...styles.success }}>{successMsg}</div>}
      {errorMsg && <div style={{ ...styles.alert, ...styles.error }}>{errorMsg}</div>}

      <div style={styles.tabs}>
        <div style={styles.tab(activeTab === 'images')} onClick={() => setActiveTab('images')}>Images</div>
        <div style={styles.tab(activeTab === 'videos')} onClick={() => setActiveTab('videos')}>Videos</div>
      </div>

      {activeTab === 'images' && (
        <>
          <form onSubmit={handleImageSubmit} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Image Label *</label>
                <input style={styles.input} value={imageForm.label} onChange={(e) => setImageForm({...imageForm, label: e.target.value})} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category *</label>
                <select style={styles.select} value={imageForm.category} onChange={(e) => setImageForm({...imageForm, category: e.target.value})} required>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Image File *</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                {imagePreview && <img src={imagePreview} alt="Preview" style={styles.imagePreview} />}
              </div>
            </div>
            <button type="submit" style={styles.button} disabled={submitting}>{submitting ? 'Uploading...' : '➕ Add Image'}</button>
          </form>

          {loadingImages ? <p>Loading images...</p> : (
            <div style={styles.galleryGrid}>
              {images.map(img => (
                <div key={img._id} style={styles.card}>
                  <img src={img.imageUrl} alt={img.label} style={styles.img} />
                  <div style={styles.info}>
                    <strong>{img.label}</strong><br />
                    <small>{img.category}</small><br />
                    <button onClick={() => handleImageDelete(img._id)} style={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
              {images.length === 0 && <p>No images yet. Add some!</p>}
            </div>
          )}
        </>
      )}

      {activeTab === 'videos' && (
        <>
          <form onSubmit={handleVideoSubmit} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Video Title *</label>
                <input style={styles.input} value={videoForm.title} onChange={(e) => setVideoForm({...videoForm, title: e.target.value})} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>YouTube URL *</label>
                <input
                  style={styles.input}
                  value={videoUrlInput}
                  onChange={handleVideoUrlChange}
                  placeholder="Paste any YouTube link (e.g., https://youtu.be/... or https://www.youtube.com/watch?v=...)"
                  required
                />
                {videoThumbnail && (
                  <img src={videoThumbnail} alt="Preview" style={styles.imagePreview} />
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>YouTube ID (auto-filled)</label>
                <input style={styles.input} value={videoForm.youtubeId} readOnly disabled />
              </div>
            </div>
            <button type="submit" style={styles.button} disabled={submitting}>{submitting ? 'Saving...' : '➕ Add Video'}</button>
          </form>

          {loadingVideos ? <p>Loading videos...</p> : (
            <div style={styles.videoList}>
              {videos.map(video => (
                <div key={video._id} style={styles.videoCard}>
                  <img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt={video.title} style={styles.thumbnail} />
                  <div style={styles.videoTitle}>{video.title}</div>
                  <small>ID: {video.youtubeId}</small><br />
                  <button onClick={() => handleVideoDelete(video._id)} style={styles.deleteBtn}>Delete</button>
                </div>
              ))}
              {videos.length === 0 && <p>No videos yet. Add some!</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminGallery;