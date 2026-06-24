import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import API from "../api"; // adjust path if needed

// --- BANNER IMAGE (overlay hero) ---
import banner8 from "../assets/hospitalimage/banner8.png";

// --- IMPORT LOCAL SERVICE ICONS FROM ASSETS FOLDER ---
import ambulanceIcon from "../assets/Icons/ambulance.png";
import anesthesiologyIcon from "../assets/Icons/Anesthesiology.png";
import audiometryIcon from "../assets/Icons/audiometer.png";
import canteenIcon from "../assets/Icons/canteen.png";
import cardiologyIcon from "../assets/Icons/Cardiology.png";
import ctScanIcon from "../assets/Icons/ct-scan.png";
import dentalIcon from "../assets/Icons/Dental.png";
import dermatologyIcon from "../assets/Icons/Dermatology.png";
import dialysisIcon from "../assets/Icons/dialysis.png";
import emergencyIcon from "../assets/Icons/emergency.png";
import entIcon from "../assets/Icons/ENT.png";
import generalWardIcon from "../assets/Icons/general-ward.png";
import generalMedicineIcon from "../assets/Icons/GeneralMedicine.png";
import gynecologyIcon from "../assets/Icons/Gynecology.png";
import icuIcon from "../assets/Icons/icu.png";
import imagingIcon from "../assets/Icons/imaging.png";
import labIcon from "../assets/Icons/lab.png";
import laserIcon from "../assets/Icons/laser.png";
import mammographyIcon from "../assets/Icons/mammography.png";
import neurologyIcon from "../assets/Icons/neurology.png";
import oncologyIcon from "../assets/Icons/oncology.png";
import orthopedicsIcon from "../assets/Icons/Orthopedics.png";
import otIcon from "../assets/Icons/ot.png";
import pathologyIcon from "../assets/Icons/pathology.png";
import pediatricsIcon from "../assets/Icons/pediatrics.png";
import pharmacyIcon from "../assets/Icons/pharmacy.png";
import physiotherapyIcon from "../assets/Icons/physiotherapy.png";
import privateWardIcon from "../assets/Icons/private-ward.png";
import psychiatryIcon from "../assets/Icons/Psychiatry.png";
import radiologyIcon from "../assets/Icons/radiology.png";
import ultrasoundIcon from "../assets/Icons/ultrasound.png";
import urosurgeryIcon from "../assets/Icons/UroSurgery.png";
import vaccinationIcon from "../assets/Icons/vaccination.png";
import nephrologyIcon from "../assets/Icons/nephrology.png";
import pulmonologyIcon from "../assets/Icons/pulmonology.png";
import dentistryIcon from "../assets/Icons/Dental.png";
import homeopathyIcon from "../assets/Icons/homeopathy.png";
import ot from "../assets/Icons/ot.png";
import ayurvedaIcon from "../assets/Icons/ayurveda.png";
import Physiotherapy from "../assets/Icons/Physiotherapy.png";


const defaultDeptIcon = generalMedicineIcon;

// Extended icon map covering all departments
const departmentIconMap = {
  "Cardiology": cardiologyIcon,
  "Neurology": neurologyIcon,
  "Neurology (Neurophysician)": neurologyIcon,
  "Orthopedics": orthopedicsIcon,
  "Pediatrics": pediatricsIcon,
  "Gynecology": gynecologyIcon,
  "General Medicine": generalMedicineIcon,
  "General Medicine (Physician)": generalMedicineIcon,
  "Oncology": oncologyIcon,
  "Dermatology": dermatologyIcon,
  "ENT": entIcon,
  "Ophthalmology": imagingIcon,
  "Urology": urosurgeryIcon,
  "General Surgery": ot,
  "Radiology": radiologyIcon,
  "Pathology": pathologyIcon,
  "Neurosurgery": neurologyIcon,
  "Anesthesiology": anesthesiologyIcon,
  "Pediatric Surgery": pediatricsIcon,
  "Plastic Surgery": ot,
  "Nephrology": nephrologyIcon || defaultDeptIcon,
  "Dentistry": dentistryIcon || dentalIcon,
  "Pulmonology": pulmonologyIcon || defaultDeptIcon,
  "Psychiatry": psychiatryIcon,
  "Homeopathy": homeopathyIcon || defaultDeptIcon,
  "Ayurveda": ayurvedaIcon || defaultDeptIcon,
  "Audiometry": audiometryIcon || defaultDeptIcon,
    "Physiotherapy": Physiotherapy || defaultDeptIcon,

};

const getDeptIcon = (deptName) => {
  return departmentIconMap[deptName] || defaultDeptIcon;
};

// ─── Keyframe + global styles injection ────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("hc-doctors-styles")) return;
  const s = document.createElement("style");
  s.id = "hc-doctors-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', 'Outfit', sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }

    @media (min-width: 1200px) {
      body { font-size: 18px; }
      .hc-hero-title { font-size: 3.8rem !important; line-height: 1.2 !important; }
      .hc-section-title { font-size: 2.8rem !important; }
      .hc-doctor-card .doctor-name { font-size: 1.2rem !important; }
      .hc-doctor-card .doctor-qual { font-size: 0.9rem !important; }
      .hc-doctor-card .doctor-dept { font-size: 0.95rem !important; }
      .hc-stat-num { font-size: 2.2rem !important; }
    }

    @keyframes fadeInUp    { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeInLeft  { from { opacity:0; transform:translateX(-30px) } to { opacity:1; transform:translateX(0) } }
    @keyframes fadeInRight { from { opacity:0; transform:translateX(30px) } to { opacity:1; transform:translateX(0) } }
    @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes pulse       { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
    @keyframes borderGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.4)} 50%{box-shadow:0 0 0 8px rgba(37,99,235,0)} }
    @keyframes heartbeat   { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(1.04)} }
    @keyframes modalFadeIn { from { opacity:0; backdrop-filter:blur(0); } to { opacity:1; backdrop-filter:blur(4px); } }
    @keyframes modalZoom   { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
    @keyframes heroGlow    { 0%{opacity:0;transform:scale(0.98) translateY(20px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

    .hero-animate {
      animation: heroGlow 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }

    .hc-nav-link { text-decoration:none; transition:color .2s; position:relative; }
    .hc-nav-link::after { content:''; display:block; height:2px; width:0; background:#2563eb; transition:width .3s; }
    .hc-nav-link:hover::after { width:100%; }
    .hc-nav-link:hover { color:#2563eb !important; }
    .hc-nav-link.active { color:#2563eb !important; }
    .hc-nav-link.active::after { width:100%; }

    .hc-btn-primary:hover { background:#1d4ed8 !important; transform:translateY(-2px) !important; box-shadow:0 8px 25px rgba(37,99,235,.4) !important; }
    .hc-btn-outline:hover { background:#2563eb !important; color:#fff !important; transform:translateY(-2px) !important; }

    .hc-dept-item:hover { background:#eff6ff !important; color:#2563eb !important; cursor:pointer; }
    .hc-dept-item.active { background:#eff6ff !important; color:#2563eb !important; font-weight:800 !important; }

    .hc-mobile-filter {
      display: none;
      margin-bottom: 24px;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: thin;
      padding-bottom: 8px;
      gap: 12px;
    }
    .hc-mobile-filter::-webkit-scrollbar {
      height: 4px;
    }
    .hc-filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: 1.5px solid #e2e8f0;
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      transition: all 0.2s;
      cursor: pointer;
      white-space: nowrap;
    }
    .hc-filter-chip.active {
      background: #2563eb;
      border-color: #2563eb;
      color: white;
    }
    .hc-filter-chip.active img {
      filter: brightness(0) invert(1);
    }
    .hc-filter-chip img {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }

    .hc-doctor-card { transition:all .35s ease !important; }
    .hc-doctor-card:hover { transform:translateY(-6px) !important; box-shadow:0 20px 50px rgba(37,99,235,.18) !important; }
    .hc-doctor-card:hover .hc-view-btn { background:#2563eb !important; color:#fff !important; border-color:#2563eb !important; }

    .hc-wish-btn:hover { background:#2563eb !important; }
    .hc-wish-btn:hover svg { stroke:#fff !important; }

    .hc-sort-select:focus { outline:none; border-color:#2563eb !important; }

    .hc-modal-overlay {
      position:fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.7);
      backdrop-filter:blur(4px);
      display:flex; align-items:center; justify-content:center;
      z-index:2000;
      animation:modalFadeIn 0.2s ease;
    }
    .hc-modal-content {
      background:white;
      max-width:700px;
      width:90%;
      max-height:85vh;
      border-radius:28px;
      overflow-y:auto;
      position:relative;
      animation:modalZoom 0.3s cubic-bezier(0.2,0.9,0.4,1.1);
      box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);
    }
    .hc-modal-close {
      position:sticky;
      top:16px;
      right:16px;
      float:right;
      background:rgba(0,0,0,0.6);
      border:none;
      width:36px;
      height:36px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      backdrop-filter:blur(4px);
      z-index:10;
      transition:all 0.2s;
    }
    .hc-modal-close:hover { background:#2563eb; transform:scale(1.05); }

    /* Hero banner */
    .hc-doctors-hero-section {
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
    /* Trust badges styling */
    .hc-badge-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 28px;
    }
    .hc-trust-badge {
      background: rgba(255,255,255,0.12);
      border-radius: 40px;
      padding: 6px 16px;
      font-size: 13px;
      font-weight: 600;
      color: white;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      backdrop-filter: blur(2px);
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
      .hc-doctors-hero-section {
        min-height: 60vh;
      }
      .hc-hero-text-content {
        padding: 50px 20px !important;
      }
      .hc-hero-text-content h1 {
        font-size: 2rem !important;
      }
      .hc-container {
        padding: 0 20px !important;
      }
      .hc-badge-group {
        gap: 8px;
      }
      .hc-trust-badge {
        font-size: 11px;
        padding: 4px 12px;
      }
    }
    @media (max-width: 640px) {
      .hc-modal-content {
        width: 95%;
        max-height: 90vh;
        border-radius: 24px;
      }
      .hc-modal-close {
        top: 12px;
        right: 12px;
      }
      .hc-modal-content > div:first-of-type {
        padding: 20px !important;
      }
    }
    @media (max-width: 480px) {
      .hc-doctors-hero-section {
        min-height: 55vh;
      }
      .hc-hero-text-content h1 {
        font-size: 1.8rem !important;
      }
      .hc-hero-text-content {
        padding: 40px 16px !important;
      }
      .hc-container {
        padding: 0 16px !important;
      }
    }
    .hc-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 32px;
    }
    @media (max-width: 1200px) {
      .hc-container { padding: 0 24px; }
    }
    @media (max-width: 1024px) {
      .hc-main-grid { grid-template-columns:1fr !important; }
      .hc-sidebar { display:none !important; }
      .hc-mobile-filter { display: flex !important; }
      .hc-doctors-grid { grid-template-columns:repeat(2,1fr) !important; }
    }
    @media (max-width: 768px) {
      .hc-doctors-grid { grid-template-columns:repeat(2,1fr) !important; }
      .hc-footer-grid { grid-template-columns:1fr !important; gap:24px !important; text-align:center; }
      .hc-nav-links { display:none !important; }
      .hc-hamburger { display:flex !important; }
      .hc-section-title { font-size: 1.8rem !important; }
      .hc-appointment-band {
        flex-direction: column !important;
        text-align: center;
      }
      .hc-appointment-band .hc-divider {
        display: none !important;
      }
      .hc-appointment-left {
        flex-direction: column !important;
        text-align: center;
      }
      .hc-appointment-left > div:first-child {
        margin: 0 auto;
      }
      .hc-stats-container {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
    }
    @media (max-width: 480px) {
      .hc-doctors-grid { grid-template-columns:1fr !important; }
      .hc-stats-container {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      .hc-filter-chip {
        padding: 6px 14px;
        font-size: 12px;
      }
      /* Stack OPD and Room No vertically on mobile in modal */
      .hc-modal-timing-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(s);
};

// ─── Intersection Observer hook ─────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ─── Animated wrapper ───────────────────────────────────────────────────
const Anim = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, v] = useInView();
  const anims = { up: "fadeInUp", left: "fadeInLeft", right: "fadeInRight" };
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      animation: v ? `${anims[dir]} .65s ease ${delay}s both` : "none",
      ...style,
    }}>
      {children}
    </div>
  );
};

// ─── SVG Icon ───────────────────────────────────────────────────────────
const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

// ─── Icon paths ─────────────────────────────────────────────────────────
const IC = {
  cross: "M12 2v20M2 12h20",
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.45 4.36a1 1 0 01-.23 1.02L8.5 11a16 16 0 006.5 6.5l1.94-1.96a1 1 0 011.02-.23l4.36 1.45A1 1 0 0123 17.72V21a2 2 0 01-2 2A18 18 0 013 5z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  arrowR: "M9 5l7 7-7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 18L18 6M6 6l12 12",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  brain: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M12 21v-1m-6.364-1.636l.707-.707",
  bone: "M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25",
  child: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  award: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  chevD: "M19 9l-7 7-7-7",
  ribbon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  time: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  check: "M5 13l4 4L19 7",
  verified: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
};

// ─── DEPARTMENT LIST ────────────────────────────────────────────────────
const DEPARTMENTS = [
  { label: "All Departments" },
  { label: "General Medicine (Physician)" },
  { label: "Gynecology" },
  { label: "Neurology (Neurophysician)" },
  { label: "Homeopathy" },
  { label: "General Surgery" },
  { label: "Radiology" },
  { label: "Pediatrics" },
  { label: "Orthopedics" },
  { label: "Urology" },
  { label: "Pathology" },
  { label: "Neurosurgery" },
  { label: "Anesthesiology" },
  { label: "Ophthalmology" },
  { label: "Pediatric Surgery" },
  { label: "Plastic Surgery" },
  { label: "Dermatology" },
  { label: "Nephrology" },
  { label: "ENT" },
  { label: "Dentistry" },
  { label: "Pulmonology" },
  { label: "Cardiology" },
  { label: "Oncology" },
  { label: "Psychiatry" },
  { label: "Ayurveda" },
  { label: "Audiometry" },
  { label: "Physiotherapy" },
];

const C = {
  blue: "#2563eb",
  dark: "#0f172a",
  navy: "#1e3a5f",
  gray: "#64748b",
  lgray: "#f8fafc",
  white: "#ffffff",
  border: "#e2e8f0",
};

// ─── Modal Component (with external booking link and Room No side by side) ───────────────────────
const DoctorModal = ({ doctor, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!doctor) return null;

  const openBooking = () => {
    window.open("http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx", "_blank");
  };

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>
          <Ico d={IC.x} size={20} color="white" />
        </button>
        <div style={{ padding: "28px 32px 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", marginBottom: 28 }}>
            <img src={doctor.img} alt={doctor.name} style={{ width: 120, height: 120, borderRadius: "60px", objectFit: "cover", border: `4px solid ${C.blue}` }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: C.dark, marginBottom: 6 }}>{doctor.name}</h3>
              <p style={{ fontSize: 15, color: C.blue, fontWeight: 700, marginBottom: 8 }}>{doctor.dept} | {doctor.qual}</p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14, color: C.gray }}>
                <span><Ico d={IC.clock} size={15} color={C.gray} style={{ display: "inline", marginRight: 6 }} /> {doctor.exp} years experience</span>
                <span><Ico d={IC.star} size={15} fill="#f59e0b" color="#f59e0b" style={{ display: "inline", marginRight: 6 }} /> {doctor.rating} ({doctor.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* OPD Timings and Room Number Side by Side */}
          <div className="hc-modal-timing-grid" style={{ 
            marginBottom: 28, 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 20,
            background: C.lgray, 
            borderRadius: 16, 
            padding: "16px 20px", 
            border: `1px solid ${C.border}`
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Ico d={IC.time} size={18} color={C.blue} />
                <h4 style={{ fontWeight: 800, fontSize: 18, color: C.dark, margin: 0 }}>OPD Timings</h4>
              </div>
              <p style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{doctor.opdTimings}</p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Ico d={IC.location} size={18} color={C.blue} />
                <h4 style={{ fontWeight: 800, fontSize: 18, color: C.dark, margin: 0 }}>Room Number</h4>
              </div>
              <p style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{doctor.roomNo || "Not assigned"}</p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h4 style={{ fontWeight: 800, fontSize: 20, marginBottom: 14, color: C.dark }}>About</h4>
            <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.7 }}>{doctor.about}</p>
          </div>

          {/* Single Book Appointment Button - External Link */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={openBooking}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: C.blue,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "'Inter', 'Outfit', sans-serif",
                width: "100%",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={(e) => e.currentTarget.style.background = C.blue}
            >
              <Ico d={IC.calendar} size={18} color="white" /> Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────
export default function Doctors() {
  useEffect(() => { injectStyles(); }, []);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDept, setActiveDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Experienced");
  const [wished, setWished] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await API.get('/doctors');
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError("Unable to load doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Safe filtering: use optional chaining and provide fallback empty string
  const filtered = doctors
    .filter(doc => activeDept === "All Departments" || (doc.dept && doc.dept === activeDept))
    .filter(doc =>
      (doc.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (doc.dept?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "Most Experienced") return (b.exp || 0) - (a.exp || 0);
      if (sortBy === "Highest Rated") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "Most Reviews") return (b.reviews || 0) - (a.reviews || 0);
      return 0;
    });

  const toggleWish = (id) => setWished(prev => ({ ...prev, [id]: !prev[id] }));

  const btnPrimary = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: C.blue, color: C.white, border: "none", borderRadius: 10,
    padding: "14px 28px", fontSize: 15, fontWeight: 700,
    cursor: "pointer", transition: "all .3s ease", fontFamily: "'Inter', 'Outfit', sans-serif",
  };

  // External booking link function
  const openBookingLink = () => {
    window.open("http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx", "_blank");
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif", background: C.white, color: C.dark, overflowX: "hidden" }}>
      {/* MODAL */}
      {selectedDoctor && <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}

      {/* HERO SECTION with extra content (trust badges only) */}
      <div className="hc-doctors-hero-section">
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -60, left: 300, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)", zIndex: 0 }} />

        <div className="hc-hero-right-image">
          <img src={banner8} alt="Doctors at St. Joseph's Hospital Ghaziabad" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)" }} />
        </div>

        <div className="hc-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hc-hero-text-content">
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0 }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee" }}></span>
                  Meet Our Specialists
                </span>
              </div>
              <h1 className="hc-hero-title" style={{ fontSize: "3.8rem", fontWeight: 900, color: C.white, lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 }}>
                Our Doctors
              </h1>
              <div style={{ width: 70, height: 4, background: "#22d3ee", borderRadius: 2, marginBottom: 28 }} />
              <p style={{ fontSize: 18, color: "rgba(255,255,255,.9)", lineHeight: 1.7, marginBottom: 16 }}>
                Expert. Compassionate. Dedicated to Your Health.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.7, marginBottom: 24 }}>
                Our team of highly qualified and experienced doctors is dedicated to providing exceptional healthcare with compassion, expertise, and cutting-edge technology.
              </p>

              {/* ✨ TRUST BADGES ONLY (kept) ✨ */}
              <div className="hc-badge-group">
                <span className="hc-trust-badge">
                  <Ico d={IC.check} size={14} color="#22d3ee" /> 50+ Expert Doctors
                </span>
                <span className="hc-trust-badge">
                  <Ico d={IC.verified} size={14} color="#22d3ee" /> 100% Verified Profiles
                </span>
                <span className="hc-trust-badge">
                  <Ico d={IC.heart} size={14} color="#22d3ee" /> 8M+  Happy Patients
                </span>
                <span className="hc-trust-badge">
                  <Ico d={IC.star} size={14} color="#ffc107" fill="#ffc107" /> 4.6/5 Patient Rating
                </span>
              </div>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <button className="hc-btn-primary" style={{ ...btnPrimary, background: C.blue }} onClick={openBookingLink}>
                  Book Appointment <Ico d={IC.arrow} size={18} color={C.white} />
                </button>
                <button className="hc-btn-outline" style={{ ...btnPrimary, background: "transparent", border: `2px solid ${C.white}`, color: C.white }} onClick={() => window.location.href = "/services"}>
                  Explore Services <Ico d={IC.arrow} size={18} color={C.white} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <section style={{ padding: "70px 32px 50px", textAlign: "center", maxWidth: 1440, margin: "0 auto" }}>
        <Anim>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 2, background: C.blue }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: C.blue, letterSpacing: 2, textTransform: "uppercase" }}>Meet Our Specialists</span>
            <div style={{ width: 28, height: 2, background: C.blue }} />
          </div>
          <h2 className="hc-section-title" style={{ fontSize: "2.5rem", fontWeight: 900, color: C.dark, marginBottom: 16, letterSpacing: -0.5 }}>
            Experienced. Compassionate. Dedicated.
          </h2>
          <p style={{ fontSize: 16, color: C.gray, maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
            Our doctors bring together years of expertise and a patient-first approach to deliver the best possible care across a wide range of specialties.
          </p>
        </Anim>
      </section>

      {/* MAIN CONTENT (filter, search, grid) */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px 100px" }}>
        {/* Search Bar */}
        <div style={{ marginBottom: 32, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
              <Ico d={IC.search} size={18} color={C.gray} />
            </div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search doctors by name or department..."
              style={{ width: "100%", padding: "14px 20px 14px 48px", border: `1.5px solid ${C.border}`, borderRadius: 40, fontSize: 15, color: C.dark, background: C.white, outline: "none", fontFamily: "'Inter', sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              onFocus={e => e.target.style.borderColor = C.blue}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
        </div>

        {/* Sort bar */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.gray }}>Sort by:</span>
            <div style={{ position: "relative" }}>
              <select className="hc-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ appearance: "none", padding: "10px 40px 10px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 600, color: C.dark, background: C.white, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "border-color .2s" }}>
                <option>Most Experienced</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
              </select>
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <Ico d={IC.chevD} size={15} color={C.gray} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter */}
        <div className="hc-mobile-filter">
          {DEPARTMENTS.map((dept, idx) => (
            <div
              key={idx}
              className={`hc-filter-chip ${activeDept === dept.label ? "active" : ""}`}
              onClick={() => setActiveDept(dept.label)}
            >
              {dept.label !== "All Departments" ? (
                <img src={getDeptIcon(dept.label)} alt={dept.label} />
              ) : (
                <Ico d={IC.users} size={14} color={activeDept === dept.label ? "white" : C.gray} />
              )}
              {dept.label}
            </div>
          ))}
        </div>

        <div className="hc-main-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 32 }}>
          {/* Sidebar (desktop) */}
          <div className="hc-sidebar">
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,.04)" }}>
              <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: C.dark }}>Filter by Department</span>
              </div>
              {DEPARTMENTS.map((d, i) => (
                <div key={i}
                  className={`hc-dept-item${activeDept === d.label ? " active" : ""}`}
                  onClick={() => setActiveDept(d.label)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", fontSize: 14, fontWeight: activeDept === d.label ? 800 : 600, color: activeDept === d.label ? C.blue : C.gray, borderBottom: i < DEPARTMENTS.length - 1 ? `1px solid #f1f5f9` : "none", transition: "all .2s", userSelect: "none" }}>
                  <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {d.label === "All Departments" ? (
                      <Ico d={IC.users} size={16} color={activeDept === d.label ? C.blue : C.gray} />
                    ) : (
                      <img src={getDeptIcon(d.label)} alt={d.label} style={{ width: 20, height: 20, objectFit: "contain", filter: activeDept === d.label ? "brightness(0) saturate(100%) invert(31%) sepia(98%) saturate(1741%) hue-rotate(212deg) brightness(97%) contrast(101%)" : "grayscale(0.5)" }} />
                    )}
                  </div>
                  {d.label}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: C.lgray, borderRadius: 20, padding: 24, border: `1px solid ${C.border}` }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.blue}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Ico d={IC.users} size={24} color={C.blue} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 10 }}>Can't find the right doctor?</div>
              <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.6, marginBottom: 16 }}>We're here to help you find the best specialist for your needs.</p>
              <button className="hc-btn-outline" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s", fontFamily: "'Inter', sans-serif" }}>
                Get Help <Ico d={IC.arrow} size={14} color={C.blue} />
              </button>
            </div>
          </div>

          {/* Doctors Grid */}
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: C.gray }}>
                <div style={{ width: 48, height: 48, border: `4px solid ${C.border}`, borderTopColor: C.blue, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }}></div>
                <p>Loading doctors...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "red" }}>
                <p>{error}</p>
                <button onClick={fetchDoctors} style={{ ...btnPrimary, padding: "8px 20px", marginTop: 16 }}>Retry</button>
              </div>
            ) : (
              <>
                <div className="hc-doctors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
                  {filtered.map((doc, i) => (
                    <Anim key={doc._id} delay={i * 0.07}>
                      <div className="hc-doctor-card" style={{
                        background: C.white, borderRadius: 22, overflow: "hidden",
                        border: `1px solid ${C.border}`,
                        boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                      }}>
                        <div style={{ position: "relative" }}>
                          <img src={doc.img} alt={doc.name}
                            style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "top", display: "block" }} />
                          <div style={{ position: "absolute", top: 14, right: 14, width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,.12)" }}>
                            <img src={getDeptIcon(doc.dept)} alt={doc.dept} style={{ width: 24, height: 24, objectFit: "contain" }} />
                          </div>
                          <button className="hc-wish-btn" onClick={() => toggleWish(doc._id)}
                            style={{ position: "absolute", top: 14, left: 14, width: 36, height: 36, borderRadius: 10, background: wished[doc._id] ? C.blue : "rgba(255,255,255,.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,.1)", transition: "background .3s" }}>
                            <Ico d={IC.heart} size={16} color={wished[doc._id] ? C.white : C.blue} fill={wished[doc._id] ? C.white : "none"} />
                          </button>
                        </div>

                        <div style={{ padding: "20px 20px 22px" }}>
                          <div className="doctor-name" style={{ fontWeight: 900, fontSize: 16, color: C.dark, marginBottom: 4 }}>{doc.name}</div>
                          <div className="doctor-qual" style={{ fontSize: 12, color: C.gray, marginBottom: 5, fontWeight: 600 }}>{doc.qual}</div>
                          <div className="doctor-dept" style={{ fontSize: 13, color: C.blue, fontWeight: 800, marginBottom: 12 }}>{doc.dept}</div>
                          <div style={{ fontSize: 13, color: C.gray, marginBottom: 8, fontWeight: 600 }}>
                            <span style={{ color: C.dark, fontWeight: 800 }}>{doc.exp}</span> Years Experience
                          </div>
                          {doc.roomNo && (
                            <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 12 }}>
                              📍 {doc.roomNo}
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                            <Ico d={IC.star} size={14} color="#f59e0b" fill="#f59e0b" />
                            <span style={{ fontWeight: 800, fontSize: 14, color: C.dark }}>{doc.rating}</span>
                            <span style={{ fontSize: 12, color: C.gray }}>({doc.reviews} Reviews)</span>
                          </div>

                          <button className="hc-view-btn hc-btn-outline" onClick={() => setSelectedDoctor(doc)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "transparent", color: C.blue, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s", fontFamily: "'Inter', sans-serif" }}>
                            View Profile <Ico d={IC.arrow} size={14} color="inherit" />
                          </button>
                        </div>
                      </div>
                    </Anim>
                  ))}
                </div>

                {filtered.length === 0 && !loading && (
                  <div style={{ textAlign: "center", padding: "80px 0", color: C.gray }}>
                    <Ico d={IC.search} size={48} color={C.border} />
                    <p style={{ marginTop: 16, fontSize: 16, fontWeight: 700 }}>No doctors found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* APPOINTMENT + STATS BAND */}
      <section style={{ maxWidth: 1440, margin: "0 auto 80px", padding: "0 32px" }}>
        <Anim>
          <div className="hc-appointment-band" style={{ background: C.lgray, border: `1px solid ${C.border}`, borderRadius: 28, padding: "36px 40px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 36 }}>
            <div className="hc-appointment-left" style={{ display: "flex", alignItems: "center", gap: 24, flex: "0 0 auto" }}>
              <div style={{ width: 68, height: 68, borderRadius: 20, background: `linear-gradient(135deg,${C.blue},#1d4ed8)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "pulse 3s ease-in-out infinite" }}>
                <Ico d={IC.calendar} size={30} color={C.white} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20, color: C.dark, marginBottom: 6 }}>Book an Appointment</div>
                <p style={{ fontSize: 14, color: C.gray, maxWidth: 280, lineHeight: 1.6 }}>Schedule a consultation with our expert doctors and take the first step towards better health.</p>
                <button className="hc-btn-primary" style={{ ...btnPrimary, marginTop: 16, fontSize: 14, padding: "12px 24px" }} onClick={openBookingLink}>
                  Book Appointment <Ico d={IC.arrow} size={15} color={C.white} />
                </button>
              </div>
            </div>
            <div className="hc-divider" style={{ width: 1, height: 90, background: C.border, flexShrink: 0 }} />
            <div className="hc-stats-container" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", flex: 1, gap: 24 }}>
              {[
                { icon: IC.users, val: "50+", label: "Expert Doctors" },
                { icon: IC.award, val: "20+", label: "Specializations" },
                { icon: IC.heart, val: "5M+", label: "Happy Patients" },
                { icon: IC.star, val: "35+", label: "Years of Excellence" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Ico d={s.icon} size={24} color={C.blue} />
                  </div>
                  <div className="hc-stat-num" style={{ fontWeight: 900, fontSize: "1.8rem", color: C.dark }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: C.gray, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Anim>
      </section>

      <Footer />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}