import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/WELCOME.mp4";
import logo from "../assets/logo.jpg";
import API from "../api"; // 💡 Connects directly to your base Axios instance setup

// ─── Welcome text (full Hindi) ────────────────────────────────
const WELCOME_TEXT = "नमस्ते!  सेंट  जोसेफ हॉस्पिटल (St. Joseph's Hospital) में आपका स्वागत है। गाज़ियाबाद में स्थित यह अस्पताल मरीजों को उच्च गुणवत्ता वाली स्वास्थ्य सेवाएँ और चिकित्सा सुविधाएँ प्रदान करने के लिए तत्पर है।";

// ─── Inject styles ──────────────────────────────────────────────
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

    /* ─── Sound control button ─── */
    .sjh-sound-btn {
      position: absolute;
      bottom: 12px;
      right: 12px;
      z-index: 10;
      background: rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
    }
    .sjh-sound-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: scale(1.05);
    }
    .sjh-sound-btn.muted {
      opacity: 0.7;
    }

    /* ─── Responsive adjustments ─── */
    @media (max-width: 520px) {
      .sjh-card {
        max-width: 100% !important;
        margin: 0.5rem;
        border-radius: 18px !important;
      }
      .sjh-video-wrapper {
        height: 280px !important;
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
      .sjh-sound-btn {
        width: 32px !important;
        height: 32px !important;
        font-size: 14px !important;
        bottom: 10px !important;
        right: 10px !important;
      }
    }
    @media (max-width: 400px) {
      .sjh-video-wrapper {
        height: 220px !important;
      }
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
    }
  `;
  document.head.appendChild(el);
};

// ─── Play a gentle two‑tone chime ──────────────────────────────
const playWelcomeSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.value = 523.25;
    gain1.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.5);

    setTimeout(() => {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = 659.25;
      gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(audioCtx.currentTime);
      osc2.stop(audioCtx.currentTime + 0.6);
    }, 150);
  } catch (e) { /* ignore */ }
};

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [displayedChars, setDisplayedChars] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 🟢 Live state for real-time absent doctor records
  const [doctorsOnLeave, setDoctorsOnLeave] = useState([]);

  const videoRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const playAttemptRef = useRef(false);

  useEffect(() => { 
    injectStyles(); 
    fetchAbsentDoctors(); // 🟢 Trigger live collection query loop
  }, []);

  // ─── Fetch and Filter Absent Doctors ─────────────────────────
  const fetchAbsentDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      // Filter out only active database records explicitly on leave status
      const absentList = data.filter(doc => doc.isOnLeave === true);
      
      // Map structures to extract initials dynamically if missing from model
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
      console.error("Failed to load live doctor leave configurations on popup:", err);
    }
  };

  // ─── Open popup + play sound ───────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setTimeout(() => setAnimated(true), 20));
      
      try {
        playWelcomeSound();
      } catch (e) { /* sound will play on user interaction */ }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // ─── Video playback with sound ─────────────────────────────────
  const playVideoWithSound = async () => {
    const videoObj = videoRef.current;
    if (!videoObj) return;

    try {
      videoObj.muted = false;
      videoObj.volume = 1.0;
      await videoObj.play();
      setIsPlaying(true);
      setIsMuted(false);
      audioUnlockedRef.current = true;
    } catch (error) {
      console.log('Autoplay with sound blocked, playing muted');
      try {
        videoObj.muted = true;
        await videoObj.play();
        setIsPlaying(true);
        setIsMuted(true);
      } catch (e) {
        console.log('Video playback failed:', e);
      }
    }
  };

  // ─── Unlock audio on user interaction ──────────────────────────
  const unlockAudio = async () => {
    if (audioUnlockedRef.current) return;
    
    const videoObj = videoRef.current;
    if (!videoObj) return;

    try {
      if (window.AudioContext || window.webkitAudioContext) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }
      }

      videoObj.muted = false;
      videoObj.volume = 1.0;
      await videoObj.play();
      setIsMuted(false);
      audioUnlockedRef.current = true;
      setIsPlaying(true);
      
      try {
        playWelcomeSound();
      } catch (e) { /* ignore */ }
    } catch (error) {
      console.log('Audio unlock failed:', error);
    }
  };

  // ─── Toggle mute ──────────────────────────────────────────────
  const toggleMute = async () => {
    const videoObj = videoRef.current;
    if (!videoObj) return;

    if (isMuted) {
      try {
        videoObj.muted = false;
        videoObj.volume = 1.0;
        await videoObj.play();
        setIsMuted(false);
        audioUnlockedRef.current = true;
        setIsPlaying(true);
      } catch (error) {
        console.log('Unmute failed:', error);
      }
    } else {
      videoObj.muted = true;
      setIsMuted(true);
    }
  };

  // ─── Try autoplay when video is loaded ──────────────────────
  useEffect(() => {
    if (videoLoaded && videoRef.current && !playAttemptRef.current) {
      playAttemptRef.current = true;
      setTimeout(playVideoWithSound, 200);
    }
  }, [videoLoaded]);

  // ─── Global click listener to unlock audio ───────────────────
  useEffect(() => {
    const handleGlobalClick = async () => {
      if (!audioUnlockedRef.current) {
        await unlockAudio();
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('touchstart', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchstart', handleGlobalClick);
    };
  }, []);

  const handleVideoInteraction = async () => {
    await unlockAudio();
  };

  const splitGraphemes = (str) => {
    const regex = /\P{M}\p{M}*/gu;
    return str.match(regex) || [];
  };

  // ─── Character‑by‑character typewriter (slower: 70ms) ──────
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

  const handleLoadedData = () => {
    setVideoLoaded(true);
  };

  const handleError = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        playVideoWithSound();
      }
    }, 500);
  };

  const handleVideoEnded = () => {
    handleClose();
  };

  const handleClose = () => {
    setAnimated(false);
    setTimeout(() => setVisible(false), 320);
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
        {/* ─── Header with video ─── */}
        <div
          className="sjh-video-wrapper"
          style={{
            position: 'relative',
            height: '240px',
            overflow: 'hidden',
            background: '#0f172a'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            preload="auto"
            onClick={handleVideoInteraction}
            onEnded={handleVideoEnded}
            onLoadedData={handleLoadedData}
            onError={handleError}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              cursor: 'pointer',
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          {/* Sound control button */}
          <button
            className={`sjh-sound-btn ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Content on top of video */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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

            {isMuted && !audioUnlockedRef.current && (
              <div style={{
                alignSelf: 'center', background: 'rgba(0,0,0,0.5)',
                padding: '4px 12px', borderRadius: '20px',
                fontSize: '11px', color: '#fff',
                backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)',
                marginBottom: '8px', pointerEvents: 'none',
              }}>
                Tap to enable sound 🔊
              </div>
            )}
          </div>
        </div>

        {/* ─── Body ─── */}
        <div className="sjh-body" style={{ padding: '1.25rem 1.5rem 1.75rem' }}>

          {/* Welcome banner */}
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
            onClick={async () => {
              await unlockAudio();
            }}
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