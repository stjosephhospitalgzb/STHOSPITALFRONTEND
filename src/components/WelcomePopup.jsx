import React, { useState, useEffect } from 'react';

// ---- Style objects (inline) ----
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  opacity: 0,                     // start hidden
  transition: 'opacity 0.3s ease',
};

const overlayVisible = {
  ...overlayStyle,
  opacity: 1,
};

const cardStyle = {
  background: '#ffffff',
  borderRadius: '24px',
  maxWidth: '500px',
  width: '90%',
  padding: '2rem 2rem 1.8rem',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  position: 'relative',
  textAlign: 'center',
  transform: 'scale(0.95)',
  transition: 'transform 0.3s ease',
};

const cardVisible = {
  ...cardStyle,
  transform: 'scale(1)',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '12px',
  right: '16px',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#6b7280',
  transition: '0.2s',
};

const titleStyle = {
  color: '#1e3a8a',
  fontSize: '1.8rem',
  marginBottom: '0.2rem',
};

const subtitleStyle = {
  color: '#3b82f6',
  fontWeight: '400',
  marginTop: 0,
  marginBottom: '0.8rem',
};

const textStyle = {
  color: '#374151',
  fontSize: '1rem',
  lineHeight: '1.5',
  margin: '0.5rem 0',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1.2rem',
  margin: '1.2rem 0',
};

const langBtnStyle = {
  padding: '0.6rem 1.6rem',
  border: 'none',
  borderRadius: '40px',
  fontWeight: '600',
  fontSize: '1rem',
  cursor: 'pointer',
  background: '#e5e7eb',
  color: '#1f2937',
  transition: '0.2s',
};

const continueBtnStyle = {
  padding: '0.6rem 2.5rem',
  border: 'none',
  borderRadius: '40px',
  fontWeight: '600',
  fontSize: '1rem',
  cursor: 'pointer',
  background: '#2563eb',
  color: 'white',
  transition: '0.2s',
};

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('welcomePopupSeen');
    if (!hasSeen) {
      // small delay to trigger the fade-in animation
      setTimeout(() => setVisible(true), 50);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('welcomePopupSeen', 'true');
  };

  const handleLanguageSelect = (lang) => {
    localStorage.setItem('preferredLanguage', lang);
    handleClose();
  };

  if (!visible) return null; // don't render anything if hidden

  return (
    <div style={overlayVisible} onClick={handleClose}>
      <div style={cardVisible} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={handleClose}>✕</button>
        <div>
          <h2 style={titleStyle}>🏥 St. Joseph's Hospital</h2>
          <h3 style={subtitleStyle}>Ghaziabad</h3>
          <p style={textStyle}>
            Welcome to our hospital. We are committed to providing quality healthcare 
            services with compassion and excellence.
          </p>
          <p style={{ ...textStyle, fontWeight: '500' }}>
            Please select your preferred language:
          </p>
          <div style={buttonGroupStyle}>
            <button 
              style={langBtnStyle} 
              onMouseEnter={(e) => e.target.style.background = '#d1d5db'}
              onMouseLeave={(e) => e.target.style.background = '#e5e7eb'}
              onClick={() => handleLanguageSelect('hi')}
            >
              हिन्दी
            </button>
            <button 
              style={langBtnStyle} 
              onMouseEnter={(e) => e.target.style.background = '#d1d5db'}
              onMouseLeave={(e) => e.target.style.background = '#e5e7eb'}
              onClick={() => handleLanguageSelect('en')}
            >
              English
            </button>
          </div>
          <button 
            style={continueBtnStyle}
            onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.background = '#2563eb'}
            onClick={handleClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;