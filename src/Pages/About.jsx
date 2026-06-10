import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// ─── Images ───────────────────────────────────────────────────────────────
import hospitalHeroImg from "../assets/hospitalimage/hospitalimage.jpeg";
import aboutImg from "../assets/hospitalimage/about.png";
import founderImg from "../assets/hospitalimage/JosephPanjikaran.jpg";
import administratorImg from "../assets/hospitalimage/adminastator.png";

// ─── New Icons (PNG) – Replacing SVGs ────────────────────────────────────
import icon247Service from "../assets/Icons/Service.png";        // 24/7 Service
import iconTeamwork from "../assets/Icons/teamwork.png";              // Teamwork
import iconIntegrity from "../assets/Icons/integrity.png";            // Integrity
import iconExcellence from "../assets/Icons/excellence.png";          // Excellence
import iconRespect from "../assets/Icons/respect.png";                // Respect
import iconCompassion from "../assets/Icons/compassion.png";          // Compassion
import iconInauguration from "../assets/Icons/inauguration.png";      // inauguration
import iconBuildings from "../assets/Icons/buildings.png";            // buildings
import iconFoundation from "../assets/Icons/foundation.png";          // Foundation
import iconLand from "../assets/Icons/land.png";                      // Land
import iconOurCore from "../assets/Icons/Our-Core.png";               // Our-Core
import iconOurMission from "../assets/Icons/Our-Mission.png";         // Our-Mission
import iconOurVision from "../assets/Icons/Our-Vision.png";           // Our-Vision

// ─── Enhanced Global Styles + Animations + Hero Banner Styles ────────────────
const injectStyles = () => {
  if (document.getElementById("hc-about-styles")) return;

  const s = document.createElement("style");
  s.id = "hc-about-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      background: #fff;
    }

    img {
      display: block;
      max-width: 100%;
    }

    /* --- Keyframe Animations --- */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes heroGlow {
      0% { opacity: 0; transform: scale(0.98) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }

    .hero-animate {
      animation: heroGlow 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }

    /* --- Hero Banner (identical to Doctors page) --- */
    .hc-about-hero-section {
      background: #0d1f3c;
      position: relative;
      overflow: hidden;
      min-height: 70vh;
    }
    .hc-hero-right-image {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 65%;
      overflow: hidden;
    }
    .hc-hero-right-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      opacity: 0.95;
    }
    .hc-hero-right-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, #0d1f3c 15%, transparent 55%);
    }
    .hc-hero-text-content {
      position: relative;
      z-index: 2;
      max-width: 620px;
      padding: 60px 0 80px;
    }

    @media (max-width: 1024px) {
      .hc-hero-right-image {
        display: none !important;
      }
      .hc-hero-text-content {
        padding: 60px 24px !important;
        text-align: left !important;
        max-width: 100%;
      }
    }
    @media (max-width: 768px) {
      .hc-about-hero-section {
        min-height: 60vh;
      }
      .hc-hero-text-content {
        padding: 50px 20px !important;
      }
      .hc-hero-text-content h1 {
        font-size: 2rem !important;
      }
    }
    @media (max-width: 480px) {
      .hc-about-hero-section {
        min-height: 55vh;
      }
      .hc-hero-text-content {
        padding: 40px 16px !important;
      }
      .hc-hero-text-content h1 {
        font-size: 1.8rem !important;
      }
    }

    /* --- Hover Effects & Transitions --- */
    .hover-card {
      transition: all 0.35s ease-in-out;
    }
    .hover-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.12);
    }
    .value-card, .milestone-card, .why-card, .vmv-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .value-card:hover, .milestone-card:hover, .why-card:hover, .vmv-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 25px -12px rgba(37, 99, 235, 0.15);
    }
    .image-zoom {
      overflow: hidden;
      border-radius: 28px;
    }
    .image-zoom img {
      transition: transform 0.5s ease;
    }
    .image-zoom:hover img {
      transform: scale(1.05);
    }

    /* --- Responsive Layouts --- */
    .hc-full-height-img {
      width: 100%;
      max-width: 100%;
      height: 500px;
      border-radius: 24px;
      overflow: hidden;
    }
    .hc-full-height-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .journey-grid, .milestone-grid {
      display: grid;
      gap: 32px;
    }
    .journey-grid {
      grid-template-columns: 1fr 1fr;
    }
    .milestone-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1200px) {
      .hc-values-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
      .hc-why-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      .milestone-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 1024px) {
      .hc-who-grid,
      .hc-founder-grid,
      .hc-admin-grid {
        grid-template-columns: 1fr !important;
      }
      .hc-values-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      .hc-why-grid {
        grid-template-columns: 1fr !important;
      }
      .hc-vmv-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem;
      }
      .hc-full-height-img {
        max-width: 100%;
        height: 380px;
      }
      .journey-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem;
      }
    }
    @media (max-width: 768px) {
      section {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
      .hc-values-grid {
        grid-template-columns: 1fr !important;
      }
      .hc-full-height-img {
        height: 320px;
      }
      .hc-section-title {
        font-size: 2rem !important;
      }
      .milestone-grid {
        grid-template-columns: 1fr !important;
      }
      .founder-quote {
        padding: 20px !important;
      }
    }
    @media (max-width: 560px) {
      section {
        padding-left: 18px !important;
        padding-right: 18px !important;
      }
      .hc-full-height-img {
        height: 260px;
      }
      .hc-values-grid > div {
        padding: 20px !important;
      }
      .admin-message {
        padding: 24px !important;
      }
      .founder-quote p {
        font-size: 0.95rem;
      }
    }
    @media (max-width: 480px) {
      .hc-full-height-img {
        height: 240px;
      }
      .hc-values-grid > div {
        padding: 16px !important;
      }
    }

    html {
      scroll-behavior: smooth;
    }
  `;
  document.head.appendChild(s);
};

// ─── Animation Hook ──────────────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold, rootMargin: "0px 0px -20px 0px" }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
};

const Anim = ({ children, delay = 0, dir = "up" }) => {
  const [ref, v] = useInView();
  const map = { up: "fadeInUp", left: "fadeInLeft", right: "fadeInRight" };
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        animation: v ? `${map[dir]} 0.7s ease ${delay}s both` : "none",
      }}
    >
      {children}
    </div>
  );
};

// ─── Icons (SVG for sections without PNG replacements) ────────────────────
const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const IC = {
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  award: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  handshake: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3h6m-5 4h4M7 7v4a2 2 0 002 2h6a2 2 0 002-2V7",
  community: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  steth: "M4.5 6.5a5 5 0 009.5 2.1M4.5 6.5V4a2 2 0 014 0v2.5M9 17a5 5 0 0010 0v-5",
  pray: "M12 6v12M9 9l3-3 3 3M9 15l3 3 3-3",
  quote: "M10 11h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1zM19 11h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1z",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  clock: "M12 8v4l3 3M12 2a10 10 0 1010 10A10 10 0 0012 2z",
  hospital: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M3 10h18 M7 10v11 M12 10v11",
  badge: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

// ─── Colors ───────────────────────────────────────────────────────────────
const C = {
  blue: "#2563eb",
  dark: "#0f172a",
  navy: "#0d1f3c",
  gray: "#64748b",
  lgray: "#f8fafc",
  white: "#ffffff",
  border: "#e2e8f0",
};

// ─── Data (with PNG icon assignments) ─────────────────────────────────────
const VALUES = [
  { icon: iconCompassion, title: "Compassion", desc: "We serve every patient with kindness and empathy." },
  { icon: iconRespect, title: "Respect for Life", desc: "We value the dignity and worth of every person." },
  { icon: iconExcellence, title: "Excellence", desc: "We strive for the highest standards in healthcare." },
  { icon: iconIntegrity, title: "Integrity", desc: "We uphold honesty and ethical medical practices." },
  { icon: iconTeamwork, title: "Teamwork", desc: "Collaborative care leads to better healing." },
  { icon: icon247Service, title: "Service", desc: "Selfless commitment to improving lives." },
];

const WHY_CHOOSE = [
  { icon: IC.user, text: "Experienced & compassionate medical professionals" },
  { icon: IC.steth, text: "Advanced diagnostic and treatment facilities" },
  { icon: IC.heart, text: "Patient-centered & ethical healthcare practices" },
  { icon: IC.check, text: "Affordable and accessible medical services" },
  { icon: IC.shield, text: "Safe, clean, and caring environment" },
  { icon: IC.pray, text: "Holistic healing – body, mind, and spirit" },
];

const VISION_MISSION_VALUES = [
  { 
    title: "01. Our Vision", 
    icon: iconOurVision, 
    content: "Be an angel of consolation to extend the compassionate love of Christ to bring about healing and wholeness." 
  },
  { 
    title: "02. Our Mission", 
    icon: iconOurMission, 
    content: "To provide ethical, affordable & quality care. To ensure preventive, promotive, curative and rehabilitative care, especially to the poor and marginalized." 
  },
  { 
    title: "03. Our Core Values", 
    icon: iconOurCore, 
    content: "Respect for life • Deliver compassionate care • Patient focused • Team work • Ethics and integrity" 
  },
];

const MILESTONES = [
  { year: "1985", title: "Land purchased", desc: "Land identified in Ghukna village", icon: iconLand },
  { year: "14 Feb 1988", title: "Foundation Stone", desc: "Blessed by Bishop Patrick Nair", icon: iconFoundation },
  { year: "Feb 1990", title: "Building Completed", desc: "First phase ready with departments", icon: iconBuildings },
  { year: "9 June 1990", title: "Hospital Inaugurated", desc: "Serving community with faith", icon: iconInauguration },
];

// ─── Main Component with Hero matching Doctors page style ─────────────────
export default function AboutUs() {
  useEffect(() => {
    injectStyles();
  }, []);

  const [heroAnimated, setHeroAnimated] = useState(false);
  useEffect(() => {
    setHeroAnimated(true);
  }, []);

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: C.blue,
    color: C.white,
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .3s ease",
    textDecoration: "none",
  };

  const btnOutline = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: C.white,
    border: `2px solid ${C.white}`,
    borderRadius: 10,
    padding: "12px 26px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .3s ease",
    textDecoration: "none",
  };

  // Extra hero highlights data
  const heroHighlights = [
    { icon: IC.clock, label: "24/7 Emergency", desc: "Round-the-clock care" },
    { icon: IC.badge, label: "NABH Accredited", desc: "Quality assured" },
    { icon: IC.user, label: "40+ Doctors", desc: "Expert specialists" },
    { icon: IC.hospital, label: "100+ Beds", desc: "Modern infrastructure" },
  ];

  return (
    <div style={{ background: "#fff", color: C.dark, fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* HERO SECTION — with extra content below buttons */}
      <div className="hc-about-hero-section">
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -60, left: 300, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)", zIndex: 0 }} />

        {/* Right-side image (hidden on tablets/mobile) */}
        <div className="hc-hero-right-image">
          <img src={aboutImg} alt="St. Joseph's Hospital" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)" }} />
        </div>

        {/* Left text content */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <div className="hc-hero-text-content">
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0 }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee" }}></span>
                  Our Legacy Since 1990
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: C.white, lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 }}>
                St. Joseph’s Hospital
              </h1>
              <div style={{ width: 70, height: 4, background: "#22d3ee", borderRadius: 2, marginBottom: 28 }} />
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,.9)", lineHeight: 1.7, marginBottom: 16 }}>
                A Legacy of Healing, Faith & Compassion
              </p>
              <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1rem)", color: "rgba(255,255,255,.75)", lineHeight: 1.7, marginBottom: 24 }}>
                A multi-specialty, NABH-accredited institution dedicated to providing compassionate, 
                ethical, and high-quality healthcare to all — especially the poor and marginalized.
              </p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
                <button
                  className="hc-btn-primary"
                  style={btnPrimary}
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Us <Ico d={IC.arrow} size={18} color={C.white} />
                </button>
                <button
                  className="hc-btn-outline"
                  style={btnOutline}
                  onClick={() => window.location.href = "/services"}
                >
                  Our Services <Ico d={IC.arrow} size={18} color={C.white} />
                </button>
              </div>

              {/* ✨ EXTRA CONTENT IN BANNER: Key Highlights */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
                gap: "20px",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: "28px",
                marginTop: "8px"
              }}>
                {heroHighlights.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 12, 
                      background: "rgba(255,255,255,0.1)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}>
                      <Ico d={item.icon} size={22} color="#22d3ee" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{item.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections remain unchanged */}
      
      {/* WHO WE ARE SECTION (with Vision, Mission, Core) */}
      <section style={{ padding: "90px 32px", marginTop: "30px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="hc-who-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center" }}>
            <Anim dir="left">
              <div className="image-zoom" style={{ borderRadius: 28, height: "500px" }}>
                <img src={hospitalHeroImg} alt="Hospital modern facility" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Anim>
            <Anim dir="right">
              <h2 className="hc-section-title" style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: 24 }}>
                Healing with Compassion, Serving with Faith
              </h2>
              <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                St. Joseph’s Hospital, Ghaziabad, is a multi-specialty, NABH-accredited institution inspired by the vision of Rev. Fr.
                Joseph Panjikaran. We deliver compassionate, ethical, and high-quality healthcare with modern medical excellence and a deeply human approach.
              </p>
              <div className="hc-vmv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                {VISION_MISSION_VALUES.map((item, i) => (
                  <div key={i} className="vmv-card hover-card" style={{ background: C.lgray, borderRadius: 20, padding: 22, border: `1px solid ${C.border}`, transition: "transform 0.3s, box-shadow 0.3s" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <img src={item.icon} alt={item.title} style={{ width: 28, height: 28, objectFit: "contain" }} />
                    </div>
                    <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{item.title}</h4>
                    <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7 }}>{item.content}</p>
                  </div>
                ))}
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY - DREAM & BEGINNING */}
      <section style={{ padding: "80px 32px", background: C.lgray }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Anim dir="up">
            <h2 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 900, marginBottom: 20 }}>
              Our Journey – A Dream of Service
            </h2>
            <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 60px", color: C.gray, fontSize: 18 }}>
              From a humble beginning in Ghukna village to a trusted healthcare institution — rooted in faith and service.
            </p>
          </Anim>
          <div className="journey-grid">
            <Anim dir="left">
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 24 }}>Beginning in Ghaziabad</h3>
                <p style={{ color: C.gray, lineHeight: 1.8, marginBottom: 16 }}>
                  In the 1980s, Ghaziabad was growing rapidly, but many rural areas had very limited medical facilities.
                  The sisters searched for a suitable place to build a hospital and identified land in Ghukna village in 1985.
                </p>
                <p style={{ color: C.gray, lineHeight: 1.8 }}>
                  Despite challenges — no proper roads, difficult transportation, undeveloped surroundings — the congregation
                  moved forward with faith and determination.
                </p>
              </div>
            </Anim>
            <Anim dir="right">
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 24 }}>Construction & Growth</h3>
                <p style={{ color: C.gray, lineHeight: 1.8, marginBottom: 16 }}>
                  The foundation stone for the first phase was blessed on <strong>14 February 1988</strong>. By February 1990,
                  the hospital building was ready after overcoming many difficulties.
                </p>
                <p style={{ color: C.gray, lineHeight: 1.8 }}>
                  Sisters and staff worked tirelessly to arrange beds, equipment, departments, recruit doctors and nurses.
                  The hospital was officially inaugurated on <strong>9 June 1990</strong>.
                </p>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* MILESTONE TIMELINE */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Anim dir="up">
            <h2 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 900, marginBottom: 60 }}>
              Important Milestones
            </h2>
          </Anim>
          <div className="milestone-grid" style={{ display: "grid", gap: 24 }}>
            {MILESTONES.map((m, idx) => (
              <Anim key={idx} dir="up" delay={idx * 0.1}>
                <div className="milestone-card hover-card" style={{ background: C.lgray, borderRadius: 24, padding: 28, textAlign: "center", border: `1px solid ${C.border}`, transition: "all 0.3s ease" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <img src={m.icon} alt={m.title} style={{ width: 32, height: 32, objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.blue, marginBottom: 8 }}>{m.year}</div>
                  <h4 style={{ fontWeight: 800, marginBottom: 10 }}>{m.title}</h4>
                  <p style={{ color: C.gray, fontSize: 14 }}>{m.desc}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER BIOGRAPHY (Enhanced Quote) */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="hc-founder-grid" style={{ display: "grid", gridTemplateColumns: "450px 1fr", gap: 50, alignItems: "start" }}>
            <Anim dir="left">
              <div className="image-zoom" style={{ height: "550px", borderRadius: 28 }}>
                <img src={founderImg} alt="Founder Rev. Fr. Joseph Panjikaran" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Anim>
            <Anim dir="right">
              <h3 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 20 }}>Servant of God: Rev. Fr. Joseph Panjikaran</h3>
              <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 16 }}>
                Born on September 10, 1888 in the village of Uzhuva near Cherthala town, Kerala. After post-graduation from St. Joseph’s College, Thiruchirappilly, he joined the minor seminary of Ernakulam in 1913. He later pursued clerical studies at the prestigious Central Seminary in Kandy, Sri Lanka, and was ordained priest on December 21, 1918.
              </p>
              <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 16 }}>
                Returning to Kerala, he stood out for his sacred expertise, eloquence, leadership, and universal love. In 1925, he represented India in the World Mission Exhibition in Rome and earned recognition from Pope Pius XI. He later obtained his doctorate in Philosophy, Theology, and Canon Law from Angelicum, Rome.
              </p>
              <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 16 }}>
                In 1934, he founded Dharmagiri Hospital, the first Catholic hospital in Kerala. In 1944, he founded the Congregation of the Medical Sisters of St. Joseph (MSJ). Pope Pius XI honored him as Papal Chamberlain in 1936 for his charitable work.
              </p>
              <div className="founder-quote" style={{ background: C.lgray, padding: "24px 28px", borderRadius: 24, borderLeft: `6px solid ${C.blue}`, marginTop: 24, marginBottom: 24 }}>
                <Ico d={IC.quote} size={28} color={C.blue} style={{ marginBottom: 12 }} />
                <p style={{ fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, color: C.dark }}>
                  “The service of the sick is the service of God. It is through loving care and compassionate healing that we reflect the light of Christ to the world. Let this hospital not be merely a place of treatment, but a home of hope, faith, and dignity for every soul that walks through its doors. May we treat not only the illness but the person, with tenderness, truth, and selfless love.”
                </p>
                <p style={{ marginTop: 12, fontWeight: 700, color: C.blue }}>— Rev. Fr. Joseph Panjikaran</p>
              </div>
              <p style={{ color: C.gray, lineHeight: 1.9 }}>
                He spent his final days at Dharmagiri, where he passed away on November 4, 1949. His remains rest at Dharmagiri Cemetery, Thankalam, Kothamangalam. The faithful still visit his tomb and seek his intercession.
              </p>
            </Anim>
          </div>
        </div>
      </section>

      {/* VALUES (Principles That Guide Us) */}
      <section style={{ padding: "90px 32px", background: C.lgray }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 900, marginBottom: 60 }}>
            The Principles That Guide Us
          </h2>
          <div className="hc-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={i} className="value-card hover-card" style={{ border: `1px solid ${C.border}`, borderRadius: 22, padding: 28, textAlign: "center", background: "#fff", transition: "all 0.3s ease" }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <img src={v.icon} alt={v.title} style={{ width: 40, height: 40, objectFit: "contain" }} />
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{v.title}</h4>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMINISTRATOR MESSAGE */}
      <section style={{ padding: "80px 32px" }}>
        <div className="hc-admin-grid" style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "450px 1fr", gap: 50, alignItems: "center" }}>
          <Anim dir="left">
            <div className="image-zoom" style={{ height: "500px", borderRadius: 28 }}>
              <img src={administratorImg} alt="Hospital Administrator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Anim>
          <Anim dir="right">
            <div className="admin-message" style={{ background: C.lgray, borderRadius: 28, padding: 40, transition: "transform 0.2s" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 20 }}>Administrator’s Message</h3>
              <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                At St. Joseph’s Hospital, Ghaziabad, we believe healing goes beyond medicine—it begins with compassion.
                Inspired by the love of Christ, our vision is to be an angel of consolation to every soul that walks through our doors.
                We are not just treating illnesses; we are restoring hope, dignity, and life itself.
              </p>
              <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                Our mission is deeply rooted in service—ethical, affordable, and quality care for all, especially the poor and marginalized.
                From prevention to rehabilitation, every step of our care is centered on the well-being of the whole person—body, mind, and spirit.
              </p>
              <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                What sets us apart is not just our medical excellence, but the heart with which we serve.
                Our core values—respect for life, compassionate care, patient focus, teamwork, ethics, and integrity—are not mere words,
                but the foundation of every decision and action. In a world that often feels rushed and impersonal, we choose to be present,
                to listen, and to serve with humility and grace. It is our privilege to walk beside each patient on their journey to healing.
              </p>
              <div style={{ width: 80, height: 2, background: C.blue, marginBottom: 16 }} />
              <p style={{ color: C.blue, fontWeight: 800, fontSize: 16 }}>Mini Sebastian (Sr. Sachita MSJ)</p>
              <p style={{ color: C.gray, fontSize: 14, marginTop: 6 }}>
                Hospital Administrator
                <br />
                St. Joseph’s Hospital, Ghaziabad
              </p>
            </div>
          </Anim>
        </div>
      </section>

      {/* WHY CHOOSE ST. JOSEPH'S */}
      <section style={{ padding: "90px 32px", background: C.lgray }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 900, marginBottom: 20 }}>
            Why Choose St. Joseph’s?
          </h2>
          <p style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px", color: C.gray, lineHeight: 1.8 }}>
            We combine clinical excellence with compassionate, faith-driven care to serve you and your family.
          </p>
          <div className="hc-why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="why-card hover-card" style={{ background: "#fff", borderRadius: 20, padding: "22px 24px", display: "flex", alignItems: "center", gap: 16, transition: "all 0.3s ease" }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ico d={item.icon} size={24} color={C.blue} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}