import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/logo.jpg";
import welcomeVideo from "../assets/WELCOME.mp4";
import API from "../api";

const WELCOME_TEXT = "नमस्ते!  सेंट  जोसेफ हॉस्पिटल (St. Joseph's Hospital) में आपका स्वागत है। गाज़ियाबाद में स्थित यह अस्पताल मरीजों को उच्च गुणवत्ता वाली स्वास्थ्य सेवाएँ और चिकित्सा सुविधाएँ प्रदान करने के लिए तत्पर है।";

// ─── Inject styles ──────────────────────────────────────────────────────────
const injectStyles = () => {
  const id = 'sjh-popup-styles';
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap');

    @keyframes sjhFadeUp {
      from { opacity:0; transform:translateY(20px) scale(0.96); }
      to   { opacity:1; transform:translateY(0)    scale(1);    }
    }
    @keyframes sjhBlink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes charAppear {
      from { opacity:0; transform:translateY(4px); }
      to   { opacity:1; transform:translateY(0);   }
    }
    @keyframes bannerShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes bannerFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%       { transform: scale(1.5); opacity: 0.5; }
    }
    @keyframes slideInRow {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes videoFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes sjhPulseRing {
      0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
      50%       { transform: scale(1.08); box-shadow: 0 0 0 10px rgba(255,255,255,0); }
    }
    .sjh-overlay { transition: opacity 0.3s ease; }
    .sjh-card { animation: sjhFadeUp 0.44s cubic-bezier(.22,.68,0,1.12) both; }
    .sjh-close-btn:hover { background: rgba(255,255,255,0.25) !important; }
    .sjh-leave-row:nth-child(even) { background: #f9fafb; }
    .sjh-leave-row:hover { background: #eff6ff !important; }
    .sjh-continue-btn:hover { background: #1e40af !important; }
    .sjh-continue-btn:active { transform: scale(0.98); }
    .sjh-welcome-banner {
      animation: bannerFadeIn 0.6s cubic-bezier(.22,.68,0,1.12) both;
      animation-delay: 0.15s;
    }
    .sjh-welcome-banner::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.45) 50%,
        transparent 100%
      );
      background-size: 400px 100%;
      animation: bannerShimmer 2.2s ease-in-out 0.3s 1;
      border-radius: 0 8px 8px 0;
      pointer-events: none;
    }
    .sjh-cursor {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background-color: #3b82f6;
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: sjhBlink 0.7s step-end infinite;
    }
    .sjh-cursor-hidden {
      opacity: 0;
      animation: none;
    }
    .sjh-char {
      display: inline-block;
      animation: charAppear 0.15s cubic-bezier(.22,.68,0,1.12) both;
    }
    .sjh-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ef4444;
      display: inline-block;
      animation: pulseDot 1.4s ease-in-out infinite;
      flex-shrink: 0;
    }
    .sjh-leave-row {
      animation: slideInRow 0.35s ease both;
    }

    /* ── Video header styles ── */
    .sjh-video-header {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    }
    .sjh-video-header video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      animation: videoFadeIn 0.6s ease both;
    }
    /* dark overlay so logo & close btn remain readable */
    .sjh-video-header::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(10, 30, 80, 0.45) 0%,
        rgba(10, 30, 80, 0.15) 60%,
        rgba(10, 30, 80, 0.55) 100%
      );
      pointer-events: none;
    }
    .sjh-header-controls {
      position: absolute;
      top: 0; left: 0; right: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1rem 1.25rem;
      z-index: 2;
    }

    @media (max-width: 520px) {
      .sjh-card {
        max-width: 100% !important;
        margin: 0.5rem;
        border-radius: 18px !important;
      }
      .sjh-body {
        padding: 1rem 1.25rem 1.5rem !important;
      }
      .sjh-welcome-banner {
        padding: 0.75rem 1rem !important;
        min-height: 100px !important;
      }
      .sjh-welcome-text {
        font-size: 0.85rem !important;
      }
      .sjh-doctor-name {
        font-size: 13px !important;
      }
      .sjh-doctor-dept {
        font-size: 11px !important;
      }
      .sjh-continue-btn {
        font-size: 0.9rem !important;
        padding: 0.7rem !important;
      }
      .sjh-logo {
        width: 44px !important;
        height: 44px !important;
      }
      .sjh-control-btn {
        width: 28px !important;
        height: 28px !important;
        font-size: 13px !important;
      }
      .sjh-video-header {
        height: 180px !important;
      }
    }
    @media (max-width: 400px) {
      .sjh-body {
        padding: 0.75rem 1rem 1.25rem !important;
      }
      .sjh-welcome-text {
        font-size: 0.8rem !important;
      }
      .sjh-doctor-name {
        font-size: 12px !important;
      }
      .sjh-doctor-dept {
        font-size: 10px !important;
        padding: 1px 8px !important;
      }
      .sjh-continue-btn {
        font-size: 0.85rem !important;
        padding: 0.6rem !important;
      }
      .sjh-video-header {
        height: 155px !important;
      }
    }
  `;
  document.head.appendChild(el);
};

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [displayedChars, setDisplayedChars] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [doctorsOnLeave, setDoctorsOnLeave] = useState([]);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false); // show "tap to unmute" overlay
  const closedRef = useRef(false); // Guard against double close

  useEffect(() => {
    injectStyles();
    fetchAbsentDoctors();
  }, []);

  const fetchAbsentDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      const absentList = data.filter(doc => doc.isOnLeave === true);
      const formattedList = absentList.map(doc => {
        const cleanName = doc.name.replace(/^(Dr\.|Dr|dr|DR)\.?\s*/i, "");
        const parts = cleanName.trim().split(" ");
        let initials = "DR";
        if (parts.length > 0 && parts[0]) initials = parts[0][0].toUpperCase();
        if (parts.length > 1 && parts[1]) initials += parts[1][0].toUpperCase();
        return {
          name: doc.name,
          dept: doc.dept || "Medical General",
          initials: initials.substring(0, 2)
        };
      });
      setDoctorsOnLeave(formattedList);
    } catch (err) {
      console.error("Failed to load doctor leave data:", err);
    }
  };

  // ─── Show popup after a short delay ────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setTimeout(() => setAnimated(true), 20));
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // ─── Play video; unmute if browser allows, else show tap overlay ─
  useEffect(() => {
    if (!animated || !videoRef.current) return;
    const vid = videoRef.current;

    // Try unmuted first
    vid.muted = false;
    vid.play()
      .then(() => {
        setIsMuted(false);
        setNeedsTap(false);
      })
      .catch(() => {
        // Browser blocked unmuted → play muted + show "tap to unmute" prompt
        vid.muted = true;
        setIsMuted(true);
        setNeedsTap(true);
        vid.play().catch(() => {});
      });
  }, [animated]);

  // ─── User taps the overlay → unmute & hide overlay ───────────────
  const handleTapToUnmute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    setIsMuted(false);
    setNeedsTap(false);
    // Restart from beginning so they hear it from the start
    vid.currentTime = 0;
    vid.play().catch(() => {});
  };

  // ─── Character‑by‑character typewriter ─────────────────────────
  const splitGraphemes = (str) => {
    const regex = /\P{M}\p{M}*/gu;
    return str.match(regex) || [];
  };

  useEffect(() => {
    const chars = splitGraphemes(WELCOME_TEXT);
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < chars.length) {
        setDisplayedChars(prev => [...prev, chars[idx]]);
        idx++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, 70);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const next = !isMuted;
    vid.muted = next;
    setIsMuted(next);
    if (!next) setNeedsTap(false);
    if (vid.ended && !next) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  };

  // ─── Close handler with guard ──────────────────────────────────
  const handleClose = () => {
    if (closedRef.current) return; // prevent double close
    closedRef.current = true;
    setAnimated(false);
    setTimeout(() => {
      setVisible(false);
      // Reset guard after popup is fully hidden (optional)
      // closedRef.current = false; // if we want to allow reopening
    }, 320);
  };

  const todayStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });

  const renderChar = (char, index) => (
    <span key={index} className="sjh-char">{char}</span>
  );

  if (!visible) return null;

  return (
    <div
      className="sjh-overlay"
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,23,42,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        opacity: animated ? 1 : 0,
      }}
    >
      <div
        className="sjh-card"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 28px 70px rgba(0,0,0,0.2)',
        }}
      >
        {/* ─── Video Header ──────────────────────────────────────── */}
        <div className="sjh-video-header">
          <video
            ref={videoRef}
            src={welcomeVideo}
            muted
            playsInline
            preload="auto"
            onEnded={handleClose}   // 👈 Auto‑close when video finishes
          />

          {/* Tap-to-unmute overlay — shown only when browser blocks autoplay with sound */}
          {needsTap && (
            <div
              onClick={handleTapToUnmute}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'rgba(10,20,60,0.45)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                animation: 'videoFadeIn 0.4s ease both',
              }}
            >
              <div style={{
                width: 56, height: 56,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                border: '2px solid rgba(255,255,255,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
                marginBottom: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                animation: 'sjhPulseRing 1.6s ease-in-out infinite',
              }}>
                🔊
              </div>
              <span style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.4px',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                Tap to play with sound
              </span>
            </div>
          )}

          {/* Logo + Close button + Sound toggle float above the video */}
          <div className="sjh-header-controls">
            <div
              className="sjh-logo"
              style={{
                width: 48, height: 48,
                borderRadius: '50%', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <img src={logo} alt="Hospital Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Sound toggle */}
              <button
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                title={isMuted ? 'Click to hear sound' : 'Click to mute'}
                style={{
                  background: isMuted ? 'rgba(255,255,255,0.15)' : 'rgba(59,130,246,0.75)',
                  border: `1px solid ${isMuted ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.9)'}`,
                  borderRadius: '50%',
                  width: 32, height: 32,
                  cursor: 'pointer', color: '#fff',
                  fontSize: 15, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, border 0.2s',
                  flexShrink: 0,
                }}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>

              {/* Close */}
              <button
                className="sjh-close-btn sjh-control-btn"
                onClick={handleClose}
                aria-label="Close"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  width: 32, height: 32,
                  cursor: 'pointer', color: '#fff',
                  fontSize: 14, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >✕</button>
            </div>
          </div>
        </div>

        {/* ─── Body ────────────────────────────────────────────── */}
        <div className="sjh-body" style={{ padding: '1.25rem 1.5rem 1.75rem' }}>
          <div
            className="sjh-welcome-banner"
            style={{
              background: '#eff6ff',
              borderLeft: '4px solid #3b82f6',
              borderRadius: '0 8px 8px 0',
              padding: '0.9rem 1.2rem',
              marginBottom: '1.25rem',
              minHeight: '110px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <p
              className="sjh-welcome-text"
              style={{
                color: '#1e293b', fontSize: '0.97rem',
                lineHeight: 1.75, margin: 0,
                fontWeight: 500, minHeight: '1.6em',
                fontFamily: "'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif",
                textAlign: 'justify', textJustify: 'inter-word',
              }}
            >
              {displayedChars.map((char, idx) => renderChar(char, idx))}
              <span className={isComplete ? 'sjh-cursor-hidden' : 'sjh-cursor'} />
            </p>
          </div>

          {/* Doctors on leave Section */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="sjh-pulse-dot" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  🩺 Doctors on leave today
                </span>
              </div>
              <span style={{
                background: doctorsOnLeave.length > 0 ? '#fef3c7' : '#dcfce7',
                color: doctorsOnLeave.length > 0 ? '#92400e' : '#15803d',
                fontSize: 10, fontWeight: 600,
                borderRadius: 20, padding: '2px 10px',
                border: doctorsOnLeave.length > 0 ? '1px solid #fde68a' : '1px solid #bbf7d0',
              }}>
                {doctorsOnLeave.length} absent
              </span>
            </div>

            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8, paddingLeft: 2, letterSpacing: '0.3px' }}>
              📅 {todayStr} &nbsp;·&nbsp;
            </div>

            <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
              {doctorsOnLeave.length > 0 ? (
                doctorsOnLeave.map((doc, i) => (
                  <div
                    key={i}
                    className="sjh-leave-row"
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '9px 12px',
                      borderBottom: i < doctorsOnLeave.length - 1 ? '1px solid #f3f4f6' : 'none',
                      transition: 'background 0.15s',
                      animation: 'slideInRow 0.35s ease both',
                      animationDelay: `${(i + 1) * 0.1}s`
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
                        color: '#3730a3', fontSize: 10, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, boxShadow: '0 1px 4px rgba(99,102,241,0.15)',
                      }}>
                        {doc.initials}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <span className="sjh-doctor-name" style={{ color: '#1f2937', fontSize: 13, fontWeight: 600 }}>{doc.name}</span>
                        <span style={{ fontSize: 10, color: '#9ca3af' }}>On leave</span>
                      </div>
                    </span>
                    <span
                      className="sjh-doctor-dept"
                      style={{
                        color: '#92400e', fontSize: 11, fontWeight: 500,
                        background: '#fef3c7', borderRadius: 6,
                        padding: '2px 8px', border: '1px solid #fde68a',
                      }}
                    >
                      {doc.dept}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', backgroundColor: '#f8fafc' }}>
                  😊 All Doctors are fully available today.
                </div>
              )}
            </div>
          </div>

          {/* Continue button */}
          <button
            className="sjh-continue-btn"
            onClick={handleClose}
            style={{
              width: '100%', padding: '0.7rem',
              border: 'none', borderRadius: 40,
              background: '#1e3a8a', color: '#fff',
              fontSize: '0.95rem', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'background 0.18s, transform 0.12s',
            }}
          >
            Continue to portal →
          </button>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '0.75rem', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500, letterSpacing: '0.3px' }}>
              @ St. Joseph's Hospital Ghaziabad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;