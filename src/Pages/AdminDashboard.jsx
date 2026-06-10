import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const styles = {
    container: { display: 'flex', minHeight: '100vh', position: 'relative' },
    hamburger: {
      display: isMobile ? 'block' : 'none',
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 1100,
      background: '#1f2937',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    sidebar: {
      width: isMobile ? (sidebarOpen ? '250px' : '0') : '250px',
      backgroundColor: '#1f2937',
      color: 'white',
      minHeight: '100vh',
      padding: isMobile ? (sidebarOpen ? '1rem' : '0') : '1rem',
      transition: 'width 0.3s ease, padding 0.3s ease',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: 0,
      zIndex: 1000,
      height: '100vh',
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      opacity: sidebarOpen || !isMobile ? 1 : 0,
      transition: 'opacity 0.2s',
      whiteSpace: 'nowrap',
    },
    nav: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    link: {
      display: 'block',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.25rem',
      textDecoration: 'none',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      whiteSpace: 'nowrap',
    },
    linkHover: { backgroundColor: '#374151' },
    button: {
      width: '100%',
      textAlign: 'left',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.25rem',
      marginTop: '1rem',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    main: {
      flex: 1,
      padding: isMobile ? '4rem 1rem 1rem 1rem' : '1.5rem',
      transition: 'padding 0.3s',
      width: '100%',
      overflowX: 'auto',
    },
    overlay: isMobile && sidebarOpen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
    } : {},
  };

  return (
    <div style={styles.container}>
      {isMobile && (
        <button style={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
      )}
      {isMobile && sidebarOpen && <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>Admin Panel</h2>
        <nav style={styles.nav}>
          <Link
            to="/admin"
            style={{ ...styles.link, ...(hoveredItem === 'dashboard' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('dashboard')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/doctors"
            style={{ ...styles.link, ...(hoveredItem === 'doctors' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('doctors')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            👨‍⚕️ Doctors
          </Link>
          <Link
            to="/admin/news"
            style={{ ...styles.link, ...(hoveredItem === 'news' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('news')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            📰 Latest News
          </Link>
          <Link
            to="/admin/gallery"
            style={{ ...styles.link, ...(hoveredItem === 'gallery' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('gallery')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            🖼️ Gallery
          </Link>
          <Link
            to="/admin/paramedical-gallery"
            style={{ ...styles.link, ...(hoveredItem === 'paramedicalGallery' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('paramedicalGallery')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            🏥 Paramedical Gallery
          </Link>
          <Link
            to="/admin/careers"
            style={{ ...styles.link, ...(hoveredItem === 'careers' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('careers')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            💼 Careers
          </Link>
          <button
            onClick={logout}
            style={{ ...styles.button, ...(hoveredItem === 'logout' && styles.linkHover) }}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;