import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
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

  // Helper to check if a link is active
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { path: '/admin/news', label: 'Latest News', icon: '📰' },
    { path: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/admin/paramedical-gallery', label: 'Paramedical Gallery', icon: '🏥' },
    { path: '/admin/careers', label: 'Careers', icon: '💼' },
  ];

  const styles = {
    container: { display: 'flex', minHeight: '100vh', position: 'relative', background: '#f8fafc' },
    hamburger: {
      display: isMobile ? 'block' : 'none',
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 1100,
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '8px 12px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'all 0.2s',
    },
    sidebar: {
      width: isMobile ? (sidebarOpen ? '260px' : '0') : '260px',
      backgroundColor: '#1e293b',
      color: 'white',
      minHeight: '100vh',
      padding: isMobile ? (sidebarOpen ? '1.5rem 1rem' : '0') : '1.5rem 1rem',
      transition: 'width 0.3s ease, padding 0.3s ease',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: 0,
      zIndex: 1000,
      height: '100vh',
      boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      opacity: sidebarOpen || !isMobile ? 1 : 0,
      transition: 'opacity 0.2s',
      whiteSpace: 'nowrap',
      background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.3px',
    },
    nav: { display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 },
    link: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      textDecoration: 'none',
      color: active ? '#ffffff' : '#cbd5e1',
      backgroundColor: active ? '#3b82f6' : 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
      fontWeight: active ? '600' : '500',
      fontSize: '0.95rem',
    }),
    linkHover: { backgroundColor: '#334155', color: '#f1f5f9' },
    button: {
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      marginTop: 'auto',
      background: 'none',
      border: 'none',
      color: '#cbd5e1',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
      fontWeight: '500',
    },
    buttonHover: { backgroundColor: '#334155', color: '#f1f5f9' },
    main: {
      flex: 1,
      padding: isMobile ? '5rem 1rem 1.5rem 1rem' : '2rem',
      transition: 'padding 0.3s',
      width: '100%',
      overflowX: 'auto',
      background: '#f8fafc',
    },
    overlay: isMobile && sidebarOpen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      backdropFilter: 'blur(2px)',
    } : {},
    footerText: {
      fontSize: '0.7rem',
      textAlign: 'center',
      color: '#64748b',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #334155',
      whiteSpace: 'nowrap',
    },
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
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={styles.link(active)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={logout}
            style={{
              ...styles.button,
              ...(hoveredItem === 'logout' ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span style={{ fontSize: '1.2rem' }}>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
        <div style={styles.footerText}>v1.0 | Secure Access</div>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;