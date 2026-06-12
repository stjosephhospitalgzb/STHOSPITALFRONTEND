import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import API from "../api";
import { Link } from "react-router-dom";

// Import local banner images
import banner1 from "../assets/hospitalimage/banner1.png";
import banner4 from "../assets/hospitalimage/banner4.png";
import banner2 from "../assets/hospitalimage/banner2.png";
import banner3 from "../assets/hospitalimage/banner3.png";

// Import PNG icons for services
import cardiologyIcon from "../assets/Icons/Cardiology.png";
import neurologyIcon from "../assets/Icons/neurology.png";
import oncologyIcon from "../assets/Icons/oncology.png";
import orthopedicsIcon from "../assets/Icons/Orthopedics.png";
import pediatricsIcon from "../assets/Icons/pediatrics.png";

// Why‑choose‑us images
import onlineAppointmentImg from "../assets/hospitalimage/Online Appointment.png";
import nabhAccreditedImg from "../assets/hospitalimage/NABH Accredited.png";
import advancedFacilitiesImg from "../assets/hospitalimage/Advanced Facilities.png";
import holisticPatientCareImg from "../assets/hospitalimage/Holistic Patient Care.png";

// Keyframe injection (with mobile pill & faces hidden, plus responsive fixes)
const injectKeyframes = () => {
  if (document.getElementById("hc-keyframes")) return;
  const style = document.createElement("style");
  style.id = "hc-keyframes";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', 'Outfit', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Desktop text size boost */
    @media (min-width: 1024px) {
      body {
        font-size: 18px;
      }
      .hc-hero-title {
        font-size: 4rem !important;
        line-height: 1.2 !important;
      }
      .hc-section-title {
        font-size: 2.8rem !important;
      }
      .hc-stat-card .stat-number {
        font-size: 1.8rem !important;
      }
      .hc-service-card .service-title {
        font-size: 1.3rem !important;
      }
      .hc-doctor-card .doctor-name {
        font-size: 1.2rem !important;
      }
      .hc-metrics-row .metric-number {
        font-size: 2.5rem !important;
      }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.05); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes borderGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,.4); }
      50%       { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
    }
    @keyframes marqueeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }

    /* Vertical slide up/down animation for news ticker */
    .news-slide-enter {
      opacity: 0;
      transform: translateY(20px);
    }
    .news-slide-enter-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 500ms, transform 500ms;
    }
    .news-slide-exit {
      opacity: 1;
      transform: translateY(0);
    }
    .news-slide-exit-active {
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 500ms, transform 500ms;
    }

    /* Carousel slide animations */
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .testimonial-slide-right {
      animation: slideInRight 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    .testimonial-slide-left {
      animation: slideInLeft 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }

    .hc-nav-link {
      font-weight: 600;
      letter-spacing: -0.2px;
    }
    .hc-nav-link:hover { color: #2563eb !important; }
    .hc-nav-link::after {
      content: ''; display: block; height: 2px; width: 0;
      background: #2563eb; transition: width .3s ease;
    }
    .hc-nav-link:hover::after { width: 100%; }

    .hc-btn-primary {
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    .hc-btn-primary:hover {
      background: #1d4ed8 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(37,99,235,.4) !important;
    }
    .hc-btn-outline {
      font-weight: 700;
    }
    .hc-btn-outline:hover {
      background: #2563eb !important;
      color: #fff !important;
      transform: translateY(-2px) !important;
    }
    .hc-stat-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 35px rgba(37,99,235,.15) !important;
    }
    .hc-service-card:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 16px 40px rgba(0,0,0,.25) !important;
      background: rgba(255,255,255,.12) !important;
    }
    .hc-doctor-card:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 16px 40px rgba(37,99,235,.2) !important;
    }
    .hc-feature-card:hover {
      background: #1e3a5f !important;
      transform: translateX(4px) !important;
    }
    .testimonial-card:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,.1) !important;
    }

    /* Carousel buttons and dots */
    .carousel-btn {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 999px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .carousel-btn:hover {
      background: #2563eb;
      border-color: #2563eb;
      color: white;
      transform: scale(1.05);
    }
    .carousel-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #cbd5e1;
      border: none;
      padding: 0;
      margin: 0 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .carousel-dot.active {
      background: #2563eb;
      width: 24px;
      border-radius: 12px;
    }

    /* Responsive adjustments */
    @media (max-width: 1200px) {
      .hc-container { padding: 0 24px !important; }
    }
    @media (max-width: 1024px) {
      .hc-hero-grid    { grid-template-columns: 1fr !important; text-align: center; }
      .hc-hero-img     { display: none !important; }
      .hc-appt-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
      .hc-whyus-grid  { grid-template-columns: repeat(2, 1fr) !important; }
      body { font-size: 15px; }
      .hc-hero-title { font-size: 2.5rem !important; }
      .hc-section-title { font-size: 2rem !important; }

      /* Fix services grid on tablet */
      .hc-services-main-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
        text-align: center;
      }
      .hc-services-heading {
        text-align: center !important;
        margin-bottom: 16px;
      }
    }

    /* Mobile-specific: hide pill and hero-faces, reduce hero text size, fix testimonials */
    @media (max-width: 768px) {
      .hero-pill {
        display: none !important;
      }
      .hero-faces {
        display: none !important;
      }

      .hc-services-row { grid-template-columns: repeat(2, 1fr) !important; }
      .hc-doctors-row  { grid-template-columns: repeat(2, 1fr) !important; }
      .hc-metrics-row  { grid-template-columns: repeat(3, 1fr) !important; }
      .hc-whyus-grid   { grid-template-columns: 1fr !important; }

      .hc-hero-title {
        font-size: 1.8rem !important;
        line-height: 1.3 !important;
      }
      .hero-text-inner p {
        font-size: 0.9rem !important;
      }
      .hero-text-inner .hc-btn-primary,
      .hero-text-inner .hc-btn-outline {
        padding: 10px 20px !important;
        font-size: 0.85rem !important;
      }

      .hc-stats-row {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      .hc-hero-section {
        min-height: 480px !important;
        height: 65vh !important;
      }

      .hc-carousel-slide {
        object-fit: cover;
        object-position: center 30%;
      }

      .testimonial-card {
        padding: 24px !important;
      }
      .testimonial-card p {
        font-size: 14px !important;
      }

      /* Hide desktop news ticker, show mobile version */
      .desktop-news-ticker {
        display: none !important;
      }
      .mobile-news-ticker {
        display: block !important;
        margin-top: 0;
        margin-bottom: 0;
        position: relative;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(8px);
        border-radius: 0;
        padding: 12px 20px;
      }

      .carousel-btn {
        width: 40px;
        height: 40px;
      }
    }

    @media (max-width: 640px) {
      .testimonial-card {
        padding: 20px !important;
      }
      .hc-stats-row {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 16px !important;
        justify-content: center !important;
      }
      .hc-stats-row .hc-stat-card {
        flex: 1 1 45% !important;
        min-width: auto !important;
      }
      .hc-hero-section {
        min-height: 420px !important;
        height: 60vh !important;
      }
      .hero-text-inner {
        max-width: 100% !important;
      }
      .testimonials-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 24px !important;
      }
      .testimonial-card {
        width: 100% !important;
        margin: 0 !important;
      }
      .hc-hero-title {
        font-size: 1.6rem !important;
      }
      .carousel-btn {
        width: 36px;
        height: 36px;
      }
    }

    @media (max-width: 480px) {
      .hc-stats-row .hc-stat-card {
        flex: 1 1 100% !important;
      }
      .hc-services-row { grid-template-columns: 1fr !important; }
      .hc-doctors-row  { grid-template-columns: 1fr !important; }
      .hc-metrics-row  { grid-template-columns: repeat(2, 1fr) !important; }
      .hc-nav-links    { display: none !important; }
      .hc-mobile-menu-btn { display: flex !important; }
      body { font-size: 14px; }
      .hc-hero-section {
        min-height: 380px !important;
        height: 55vh !important;
      }
      .hc-section-title {
        word-break: break-word !important;
      }
      .hc-carousel-slide {
        object-position: center 40%;
      }
      .testimonial-card p {
        font-size: 13px !important;
        line-height: 1.5 !important;
      }
      .testimonial-card {
        padding: 18px !important;
      }
    }

    /* Hero carousel fade animation */
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .hc-carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
    }
    .hc-carousel-slide.active {
      opacity: 1;
    }

    .hc-stats-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 24px;
      margin-top: 16px;
    }

    .hc-stats-row .hc-stat-card {
      width: 100%;
    }

    .hc-services-main-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 60px;
      align-items: start;
    }

    section:first-of-type {
      margin-top: 0;
      padding-top: 0;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
    @media (max-width: 768px) {
      .testimonials-grid {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
    }

    /* Mobile news ticker visibility */
    .mobile-news-ticker {
      display: none;
    }

    /* Contact & Map responsive */
    .hc-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    @media (max-width: 768px) {
      .hc-contact-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
      }
      .hc-contact-map {
        height: 280px !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// Intersection observer hook
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// SVG Icons
const Icon = ({ d, size = 24, color = "currentColor", stroke = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={stroke ? "none" : color}
    stroke={stroke ? color : "none"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.45 4.36a1 1 0 01-.23 1.02L8.5 11a16 16 0 006.5 6.5l1.94-1.96a1 1 0 011.02-.23l4.36 1.45A1 1 0 0123 17.72V21a2 2 0 01-2 2A18 18 0 013 5z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  brain: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M12 21v-1m0-16a7 7 0 100 14 7 7 0 000-14z",
  bone: "M15.5 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm0 7a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
  child: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  ribbon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  ai: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  robot: "M12 2a2 2 0 012 2v1a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm0 5v1M7 9h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm3 3h4m-4 3h4M9 12h.01M15 12h.01",
  file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  play: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  plus: "M12 4v16m8-8H4",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 18L18 6M6 6l12 12",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  cross: "M12 2v20M2 12h20",
  tech: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  chevronL: "M15 19l-7-7 7-7",
  chevronR: "M9 5l7 7-7 7",
  quote: "M8 12h-3v-2c0-2.21 1.79-4 4-4h1v4h-2v2zm10 0h-3v-2c0-2.21 1.79-4 4-4h1v4h-2v2z",
  mapPin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  award: "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z",
  stethoscope: "M4.5 12.5a8 8 0 0016 0m-8-8v4m-4-2h8M4 9a8 8 0 0116 0v3a8 8 0 01-16 0zM12 12h.01M12 16h.01",
  ambulance: "M13 9h4l2 4h-6M9 9h4v4H9zM7 13h2M15 13h2M7 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z",
  pill: "M12 8v8m-4-4h8M12 2a10 10 0 100 20 10 10 0 000-20z",
  heartbeat: "M12 4l-2 6H6l2 6h4l-1 4h4l2-6h4l-2-6h-4l1-4z",
};

// Reusable animated section wrapper
const AnimSection = ({ children, style = {}, delay = 0, direction = "up" }) => {
  const [ref, inView] = useInView(0.1);
  const animMap = { up: "fadeInUp", left: "fadeInLeft", right: "fadeInRight" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      animation: inView ? `${animMap[direction]} .7s ease ${delay}s both` : "none",
      ...style,
    }}>
      {children}
    </div>
  );
};

// Doctor Modal Component (popup)
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
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 2000, animation: "modalFadeIn 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: "white", maxWidth: 700, width: "90%", maxHeight: "85vh",
        borderRadius: 28, overflowY: "auto", position: "relative",
        animation: "modalZoom 0.3s cubic-bezier(0.2,0.9,0.4,1.1)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "sticky", top: 16, right: 16, float: "right",
          background: "rgba(0,0,0,0.6)", border: "none", width: 36, height: 36,
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(4px)", zIndex: 10,
        }}>
          <Icon d={icons.x} size={20} color="white" />
        </button>
        <div style={{ padding: "28px 32px 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", marginBottom: 28 }}>
            <img src={doctor.img} alt={doctor.name} style={{ width: 120, height: 120, borderRadius: "60px", objectFit: "cover", border: "4px solid #2563eb" }} />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginBottom: 6 }}>{doctor.name}</h3>
              <p style={{ fontSize: 15, color: "#2563eb", fontWeight: 700, marginBottom: 8 }}>{doctor.dept || doctor.department} | {doctor.qual}</p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14, color: "#64748b" }}>
                <span><Icon d={icons.clock} size={15} color="#64748b" /> {doctor.exp} years experience</span>
                <span><Icon d={icons.star} size={15} fill="#f59e0b" color="#f59e0b" /> {doctor.rating} ({doctor.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 28, background: "#f8fafc", borderRadius: 16, padding: "16px 20px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Icon d={icons.clock} size={18} color="#2563eb" />
              <h4 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", margin: 0 }}>OPD Timings</h4>
            </div>
            <p style={{ fontSize: 15, color: "#0f172a", fontWeight: 500 }}>{doctor.opdTimings || "Mon - Sat: 9:00 AM - 5:00 PM"}</p>
          </div>
          <div style={{ marginBottom: 28 }}>
            <h4 style={{ fontWeight: 800, fontSize: 20, marginBottom: 14, color: "#0f172a" }}>About</h4>
            <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7 }}>{doctor.about || "Experienced specialist dedicated to providing exceptional patient care with compassion and expertise."}</p>
          </div>
          <button onClick={openBooking} style={{
            display: "flex", alignItems: "center", gap: 8, background: "#2563eb",
            color: "white", border: "none", borderRadius: 12, padding: "14px 26px",
            fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", justifyContent: "center"
          }}>
            <Icon d={icons.calendar} size={18} color="white" /> Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const Home = () => {
  useEffect(() => { injectKeyframes(); }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeApptDept, setActiveApptDept] = useState("");
  const [activeApptDoc, setActiveApptDoc] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [departmentDoctors, setDepartmentDoctors] = useState({});

  // News ticker state (dynamic from API)
  const [newsItems, setNewsItems] = useState([]);
  const [newsIndex, setNewsIndex] = useState(0);
  const [newsAnim, setNewsAnim] = useState(true);

  // Fetch latest news from backend
  const fetchLatestNews = async () => {
    try {
      const { data } = await API.get("/news");
      if (data && data.length > 0) {
        setNewsItems(data.map(item => item.text));
      } else {
        // Fallback messages if no news from API
        setNewsItems([
          "🏥 New 24/7 Emergency Ward now open!",
          "🩺 Free Health Checkup Camp on 15th June",
          "💊 AI-powered diagnostics launched for early cancer detection",
        ]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsItems([
        "🏥 Welcome to St. Joseph's Hospital",
        "📞 24/7 Emergency: +91-120-1234567",
      ]);
    }
  };

  // Cycle through news items every 5 seconds with a smooth transition
  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setNewsAnim(false);
      setTimeout(() => {
        setNewsIndex((prev) => (prev + 1) % newsItems.length);
        setNewsAnim(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await API.get('/doctors');
        const data = response.data;
        setDoctors(data);

        // Use 'dept' field from API (as per AdminDoctors)
        const depts = [...new Set(data.map(doc => doc.dept).filter(Boolean))];
        setDepartmentsList(depts);

        const mapping = {};
        depts.forEach(dept => {
          mapping[dept] = data.filter(doc => doc.dept === dept).map(doc => doc.name);
        });
        setDepartmentDoctors(mapping);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        const fallbackDoctors = [
          { name: "Dr. Ananya Sharma", role: "Cardiologist", qual: "MD, DM Cardiology", exp: 12, rating: 4.9, reviews: 328, img: "https://randomuser.me/api/portraits/women/44.jpg", dept: "Cardiology", about: "Expert cardiologist with special interest in interventional cardiology.", opdTimings: "Mon, Wed, Fri: 10am - 1pm" },
          { name: "Dr. Rahul Verma", role: "Neurologist", qual: "MD, DM Neurology", exp: 15, rating: 4.8, reviews: 256, img: "https://randomuser.me/api/portraits/men/32.jpg", dept: "Neurology", about: "Expert neurologist specializing in stroke and epilepsy.", opdTimings: "Tue, Thu, Sat: 11am - 2pm" },
          { name: "Dr. Arjun Mehta", role: "Orthopedic Surgeon", qual: "MS Orthopedics", exp: 10, rating: 4.7, reviews: 189, img: "https://randomuser.me/api/portraits/men/45.jpg", dept: "Orthopedics", about: "Specialist in joint replacement and sports injuries.", opdTimings: "Mon - Sat: 9am - 5pm" },
          { name: "Dr. Priya Nair", role: "Pediatrician", qual: "MD Pediatrics", exp: 9, rating: 4.9, reviews: 412, img: "https://randomuser.me/api/portraits/women/68.jpg", dept: "Pediatrics", about: "Compassionate care for children of all ages.", opdTimings: "Mon, Thu, Fri: 9am - 12pm" },
          { name: "Dr. Suresh Kumar", role: "Gynecologist", qual: "MD Obstetrics & Gynecology", exp: 14, rating: 4.8, reviews: 298, img: "https://randomuser.me/api/portraits/men/52.jpg", dept: "Gynecology", about: "Expert in women's health and maternity care.", opdTimings: "Mon - Sat: 10am - 4pm" },
        ];
        setDoctors(fallbackDoctors);
        const depts = [...new Set(fallbackDoctors.map(doc => doc.dept))];
        setDepartmentsList(depts);
        const mapping = {};
        depts.forEach(dept => {
          mapping[dept] = fallbackDoctors.filter(doc => doc.dept === dept).map(doc => doc.name);
        });
        setDepartmentDoctors(mapping);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
    fetchLatestNews();
  }, []);

  // Function to handle "Find a Doctor" button click - opens modal if doctor selected
  const handleFindDoctor = () => {
    if (!activeApptDept || !activeApptDoc) {
      alert("Please select both department and doctor.");
      return;
    }
    const doctorObj = doctors.find(d => d.name === activeApptDoc && (d.dept === activeApptDept || d.department === activeApptDept));
    if (doctorObj) {
      setSelectedDoctor(doctorObj);
    } else {
      alert("Doctor details not found.");
    }
  };

  const [metricsRef, metricsInView] = useInView(0.3);
  const c1 = useCounter(5000000, 1000, metricsInView);
  const c2 = useCounter(40, 2000, metricsInView);
  const c3 = useCounter(35, 1500, metricsInView);
  const c4 = useCounter(8, 1500, metricsInView);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerImages = [banner1, banner4, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials Carousel State
  const testimonials = [
    {
      name: "palak goel",
      role: "Google Review",
      text: "I had a very good experience with Dr. Megha Sharma in St. Joseph Hospital.She has treated me through out my complicated pregnancy and post pregnancy period.With her experience and guidance, I had a very smooth normal delivery.Because of Dr. Megha Sharma ma'am, i am blessed with a baby girl.Saying thank you will not be enough.I strongly recommend her and can say that she is one of the best gynecologist in the Ghaziabad.",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjUDX9BILZzzh2_wr-Sz7MHTne0CBp0YSdrrJATNhSgOpz55SF2d=s36-c-rp-mo-br100"
    },
    {
      name: "kapil kulshrestha",
      role: "Google Review",
      text: "Hospital Nursing Staff and DoctorS are very helpful and surgical wards and Private room Nursing staff very take care of her patient and this is the first hospital here sisters blessing her patient our over all experience is very good. We recomend to all please visit once if you needed.",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjX1XapjeM94hSgDxSP6zl8FQZKs4fV6BFWIbN9cQY9qpnKbcN-3=s36-c-rp-mo-br100"
    },
    {
      name: "Mohit Binjola",
      role: "Google Review",
      text: "St Joseph hospital is one of the best hospital in ghaziabad... Hospital staff and nursed is very supportive and cooperative. Fees is very reasonable. Specially thanks to Gyne Dr Megha Sharma for her friendly nature and extra ordinary care for her patients as well as patient family. She is one of the best doctor with whom I meet. Again thanks to all hospital staff, administration staff and doctors. 🙏Thank you Dr Megha Sharma Mam and Dr Abhimaan Raghav sir",
      rating: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFH-5_P3FEF5xKoBSFRyN-HuKAZZhkgfGug&s", // Google logo fallback
      googleReview: true // Optional flag for styling
    },
    {
      name: "Cyril John",
      role: "Google Review",
      text: "I was admitted with acute COVID Pneumonia in St Joseph's Hospital for 9 days. I received excellent and prompt medical and nursing care and facilities. I must say that I never felt that I was a Corona positive patient. They never discriminated, the care was all the more personal.Above all this priests were visiting us daily with the Holy Communion, receiving spiritual food and healing. Came in with acute infection, going back healthy because of the healing I received in the hospital. What a holy, silent and selfless service. God bless this mission. Posted by Chevalier Cyril John, Retired Joint Secretary & Chief of Protocol, Lok Sabha, Parliament of India, New Delhi.",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjUXt7i-BMpBRWv3X5HrMNxmvQtFXfiyC49slijxondW6gNUcCw8=w72-h72-p-rp-mo-br100", // Google logo fallback
    },
    {
      name: "Kajal Mishra",
      role: "Google Review",
      text: "I went there for my pregnancy and it went so smoothly from starting to end. I was treated under Dr. Megha Sharma and she is very nice and sweet. She always treats you with a smile. First hospital I've seen where they force for a normal delivery. All went very well highly recommend hospital. And kudos to all the staff and nurses as well they were very supportive as well.",
      rating: 5,
      img: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
    },

    {
      name: "Shaloo Vishwakarma",
      role: "Google Review",
      text: "I had Bell's palsy. It was frightening. I showed it to the neurologist of St Joseph's hospital, and he recommended for physiotherapy. I met Dr. Vandna, who was not only pretty but also had a great attitude towards patients. It took me about 21 days to recover. I really appreciate the doctor and her staff. So, guys you must go for physiotherapy related disease.",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjXEwBV0dC1kEkntOVOKkyfzHQ7o_DKuQ3ib88bkcqlekydNtKI=w72-h72-p-rp-mo-br100"
    },
    {
      name: "Faiz Ahmad",
      role: "Google Review",
      text: "Excellent service and a very healthy environment for 1patients with well managed experienced Doctors and helpful staff. Had a wonderful experience here and very satisfied with the service we received. Made us believe that humanity still exists in the world✨Cheers to St Joseph team!!",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjW1XKGPRNKSSG-OuumuOYgfZDU5r-ye4pE-kuLek3KttMfFQqodEw=w72-h72-p-rp-mo-br100"
    },
    {
      name: "Himanshi Patel",
      role: "Google Review",
      text: "Very best Sevices at affordable prices My father was admitted in this hospital very good treatment Doctor VB Jindal is best doctor he treat my father very nicely and Nurses also very good and kind my get well I thaks to Doctor I highly recommend",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjWpCvBfvxlGqwXc39XNU6NqKQksMCxZJmAruJruaUiqrbV_aMvc=w72-h72-p-rp-mo-br100"
    },
    {
      name: "kamal pundir",
      role: "Google Review",
      text: " excellent hospital I came to show my mother to for surgery lab cholic dr ss. kothari I met front office mam name is kalyani sharma behavior is good she deal the patient properly she advised to show to gen surgen dr ss. kothari & apoorav goel she told the affordable charges & dr is behavioral also good & excellent highly recommend to my frnds & my all relatives & all staff are good is per my consult kalyani mam behavioral is very kind & very helpfull thanks all st. joseph hospital teams",
      rating: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFH-5_P3FEF5xKoBSFRyN-HuKAZZhkgfGug&s", // Google logo fallback
    },
    {
      name: "Rahul",
      role: "Google Review",
      text: " All types service are good and dr. Are excellent Specialy dr. megha sharma mam and Dr. Pallav are very brilliant dr.And inquiry courte and reception mam are very true guide and all charges and thanks to all staff",
      rating: 5,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjVIBBivkIeT50xNk4giM7sHUKqB3ljfK3rYVEAQPGnW8p8gbEvc2A=w72-h72-p-rp-mo-br100", // Google logo fallback
    },
  ];

  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const autoSlideIntervalRef = useRef(null);
  const carouselContainerRef = useRef(null);

  const nextTestimonial = () => {
    setSlideDirection('right');
    setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setSlideDirection('left');
    setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
    autoSlideIntervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Reset auto-slide timer on manual navigation
  const handleManualNext = () => {
    stopAutoSlide();
    nextTestimonial();
    startAutoSlide();
  };

  const handleManualPrev = () => {
    stopAutoSlide();
    prevTestimonial();
    startAutoSlide();
  };

  // Remove animation class after it completes
  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [slideDirection, currentTestimonialIdx]);

  // Palette
  const blue = "#2563eb";
  const dark = "#0f172a";
  const navy = "#1e3a5f";
  const white = "#ffffff";
  const gray = "#64748b";
  const lgray = "#f8fafc";

  // Shared styles
  const container = { maxWidth: 1440, margin: "0 auto", padding: "0 32px" };
  const sectionPy = { padding: "96px 0" };
  const pill = (bg, color) => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: bg, color, borderRadius: 999,
    padding: "6px 18px", fontSize: 13, fontWeight: 700,
    letterSpacing: 1, textTransform: "uppercase", marginBottom: 16,
  });
  const btnPrimary = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: blue, color: white, border: "none", borderRadius: 10,
    padding: "16px 32px", fontSize: 16, fontWeight: 700,
    cursor: "pointer", transition: "all .3s ease", textDecoration: "none",
  };
  const btnOutline = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: blue,
    border: `2px solid ${blue}`, borderRadius: 10,
    padding: "14px 30px", fontSize: 16, fontWeight: 700,
    cursor: "pointer", transition: "all .3s ease", textDecoration: "none",
  };

  // Hero content for 4 slides
const heroContent = {
  0: {
    pillText: "Trusted Healthcare Excellence.",
    title: "Caring for Life. Advancing Health Every Day",
    description: "Experience comprehensive healthcare backed by expert doctors, advanced medical technology, and patient-centered care designed to support your well-being at every stage of life.",
  },
  1: {
    pillText: "Patient First. Always.",
    title: "Healing with Compassion, Excellence, and Trust",
    description: "We are committed to delivering personalized healthcare experiences through quality treatment, ethical practices, and compassionate support for every patient.",
  },
  2: {
    pillText: "Specialized Medical & Surgical Care",
    title: "Expertise You Trust. Outcomes You Deserve",
    description: "Our experienced specialists provide advanced medical and surgical treatments using the latest techniques to ensure safer procedures and faster recovery.",
  },
  3: {
    pillText: "Emergency & Critical Care",
    title: "24×7 Emergency Support When Every Moment Matters",
    description: "Round-the-clock emergency services, critical care units, advanced life support systems, and dedicated medical professionals ready to respond immediately.",
  },
};

  const indianFaces = [
    "https://img.magnific.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg",
    "https://potokphotography.com/galleries/india/indian-faces/photos/indian-faces-1821.JPG",
    "https://t4.ftcdn.net/jpg/06/13/28/69/360_F_613286945_BJ7rUxmhftMxfNtyyfnwDwuD2CxK8YQM.jpg",
    "https://img.magnific.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg?semt=ais_hybrid&w=740&q=80",
  ];

 const statsData = [
  { 
    icon: icons.clock, 
    label: "Bed Capacity", 
    sub: "Modern and spacious inpatient beds", 
    val: "100+" 
  },
  { 
    icon: icons.heartbeat, 
    label: "Cured Patients", 
    sub: "Successfully treated and recovered lives", 
    val: "9M+" 
  },
  { 
    icon: icons.tech, 
    label: "Medical Apparatus", 
    sub: "Advanced and high-tech equipment units", 
    val: "110+" 
  },
  { 
    icon: icons.stethoscope, 
    label: "Dialysis Unit", 
    sub: "State-of-the-art renal care stations", 
    val: "5+" 
  },
  { 
    icon: icons.user, 
    label: "Expert Doctors", 
    sub: "Highly qualified specialists on duty", 
    val: "40+" 
  },
];

  const services = [
    { icon: cardiologyIcon, title: "Cardiology", desc: "Our cardiology services include evaluation and management of conditions such as hypertension, coronary artery disease, heart rhythm disorders, and heart failure. " },
    { icon: neurologyIcon, title: "Neurology", desc: "Neurology deals with disorders of the brain, spinal cord, and nervous system, offering comprehensive diagnosis and treatment." },
    { icon: orthopedicsIcon, title: "Orthopedics", desc: "The Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of disorders related to the bones, joints, muscles, and spine." },
    { icon: pediatricsIcon, title: "Pediatrics", desc: "Pediatrics focuses on the health and development of infants, children, and adolescents, offering preventive, diagnostic, and therapeutic care." },
    { icon: oncologyIcon, title: "Oncology", desc: "The Oncology Department provides comprehensive care for cancer patients, emphasizing early detection, accurate diagnosis, and effective treatment planning." },
  ];

  // Three feature cards (inline with the "Find a Doctor" section)
  const techFeatures = [
    { icon: icons.ambulance, title: "24/7 Emergency Care", desc: "Round-the-clock emergency services for critical healthcare needs." },
    { icon: icons.calendar, title: "Online Appointment Booking", desc: "Book consultations quickly and conveniently from anywhere." },
    { icon: icons.shield, title: "Cashless Insurance Support", desc: "Hassle-free treatment with leading insurance providers." },
  ];

  const metrics = [
    { val: c1, suffix: "+", label: "Happy Patients", icon: icons.user },
    { val: c2, suffix: "+", label: "Expert Doctors", icon: icons.shield },
    { val: c3, suffix: "+", label: "Years of Excellence", icon: icons.star },
    { val: c4, suffix: "+", label: "Medical Specialties", icon: icons.cross },
    { val: "100%", suffix: "", label: "Patient Satisfaction", icon: icons.heartbeat },
  ];

  // Why Choose Us
  const whyUs = [
    {
      image: onlineAppointmentImg,
      title: "Online Appointment",
      desc: "Book appointments quickly and conveniently from anywhere through our easy online scheduling system.",
    },
    {
      image: nabhAccreditedImg,
      title: "NABH Accredited",
      desc: "Committed to delivering quality healthcare and patient safety through NABH-accredited standards.",
    },
    {
      image: advancedFacilitiesImg,
      title: "Advanced Facilities",
      desc: "Modern medical technology and infrastructure ensuring accurate diagnosis and effective treatment.",
    },
    {
      image: holisticPatientCareImg,
      title: "Holistic Patient Care",
      desc: "Supporting physical, emotional, and overall well-being throughout every stage of recovery.",
    },
  ];

  const currentHero = heroContent[currentSlide];

  // Open external booking link
  const openBookingLink = () => {
    window.open("http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx", "_blank");
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif", background: white, color: dark, overflowX: "hidden" }}>
      <Navbar />
      {selectedDoctor && <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}

      {/* SCROLLING ALERT BANNER */}
      <div style={{
        background: "#dc2626",
        color: "white",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "12px 0",
        fontSize: "clamp(12px, 4vw, 15px)",
        fontWeight: 700,
        letterSpacing: "0.5px",
        position: "relative",
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <div>
          {/* Inline style tag for keyframes (only once) */}
          <style>{`
    @keyframes marqueeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }
  `}</style>

          {/* Your marquee div with inline style – slower speed (45s) */}
          <div style={{
            display: "inline-block",
            animation: "marqueeScroll 70s linear infinite",
            paddingLeft: "100%",
            whiteSpace: "nowrap"
          }}>
            ⚠️ ALERT: St. Joseph's Hospital, Ghaziabad (Mariam Hospital) does not accept any online payments for hospital services. All payments must be made only at the hospital's authorized payment counters. The hospital never requests payments, banking details, OTPs, or personal information through unofficial phone calls, text messages, emails, websites, or social media accounts. If you receive any such request claiming to be from the hospital, treat it as fraudulent. For your safety, please verify all information only through St. Joseph's Hospital, Ghaziabad (Mariam Hospital)'s official website or helpline numbers. Stay alert and report any suspicious communication. ⚠️

            ⚠️ ऑनलाइन धोखाधड़ी से सावधान रहें। सेंट जोसेफ अस्पताल, गाजियाबाद (मरियम अस्पताल) अस्पताल सेवाओं के लिए किसी भी प्रकार का ऑनलाइन भुगतान स्वीकार नहीं करता है। सभी भुगतान केवल अस्पताल के अधिकृत भुगतान काउंटरों पर ही किए जाएं। अस्पताल कभी भी अनौपचारिक फोन कॉल, संदेश, ईमेल, वेबसाइट या सोशल मीडिया के माध्यम से किसी भी प्रकार का भुगतान, बैंक विवरण, ओटीपी या व्यक्तिगत जानकारी नहीं मांगता है। यदि आपको अस्पताल के नाम पर ऐसा कोई अनुरोध प्राप्त होता है, तो उसे धोखाधड़ी मानें। आपकी सुरक्षा के लिए, किसी भी जानकारी की पुष्टि केवल सेंट जोसेफ अस्पताल, गाजियाबाद (मरियम अस्पताल) की आधिकारिक वेबसाइट या हेल्पलाइन नंबर के माध्यम से ही करें। कृपया सतर्क रहें और किसी भी संदिग्ध संपर्क की सूचना दें। ⚠️           </div>
        </div>
      </div>

      {/* HERO SECTION WITH CAROUSEL */}
      <section className="hc-hero-section" style={{
        position: "relative",
        height: "90vh",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: 0,
        paddingTop: 0,
      }}>
        {bannerImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Hospital banner ${idx + 1}`}
            className={`hc-carousel-slide ${idx === currentSlide ? "active" : ""}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "opacity 1.5s ease-in-out",
              opacity: idx === currentSlide ? 1 : 0,
            }}
          />
        ))}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)",
          zIndex: 1,
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 32px",
        }}>
          <div className="hero-text-inner" style={{
            maxWidth: 700,
            color: white,
            textAlign: "left",
          }}>
            <AnimSection delay={0}>
              <div className="hero-pill" style={pill("rgba(255,255,255,0.2)", white)}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: white }} />
                {currentHero.pillText}
              </div>
            </AnimSection>
            <AnimSection delay={0.1}>
              <h1 className="hc-hero-title" style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 16,
                letterSpacing: -1,
                color: white,
              }} dangerouslySetInnerHTML={{ __html: currentHero.title }} />
            </AnimSection>
            <AnimSection delay={0.2}>
              <p style={{ fontSize: "clamp(0.9rem, 4vw, 1.2rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
                {currentHero.description}
              </p>
            </AnimSection>
            <AnimSection delay={0.3}>
              <div className="hero-actions" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <button className="hc-btn-primary" style={btnPrimary} onClick={openBookingLink}>
                  Book Appointment <Icon d={icons.arrow} size={18} color={white} />
                </button>
                <Link to="/services" style={{ textDecoration: "none" }}>
                  <button
                    className="hc-btn-outline"
                    style={{ ...btnOutline, borderColor: white, color: white }}
                  >
                    Explore Services <Icon d={icons.arrow} size={18} color={white} />
                  </button>
                </Link>
              </div>
            </AnimSection>
            <AnimSection delay={0.4}>
              <div className="hero-faces" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 48 }}>
                <div style={{ display: "flex" }}>
                  {indianFaces.map((face, i) => (
                    <img key={i} src={face}
                      alt="patient" style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${white}`, marginLeft: i ? -12 : 0, objectFit: "cover" }} />
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: white }}>50,000+</div>
                  <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>Patients Trust Us</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>

        {/* VERTICAL NEWS SLIDER - Desktop version (absolute positioned) */}
        <div className="desktop-news-ticker" style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          width: "auto",
          minWidth: 360,
          maxWidth: "90%",
        }}>
          <div style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            borderRadius: 60,
            padding: "12px 28px",
            overflow: "hidden",
            height: "auto",
            width: "100%",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}>
            {newsItems.length > 0 && (
              <div
                key={newsIndex}
                style={{
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  opacity: newsAnim ? 1 : 0,
                  transform: newsAnim ? "translateY(0)" : "translateY(10px)",
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  fontWeight: 500,
                  color: "white",
                  padding: "4px 0",
                  lineHeight: 1.4,
                }}
              >
                {newsItems[newsIndex]}
              </div>
            )}
          </div>
        </div>

        <div style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          zIndex: 2,
        }}>
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background: idx === currentSlide ? white : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      </section>

      {/* MOBILE NEWS TICKER (visible only on mobile) */}
      <div className="mobile-news-ticker" style={{
        background: "#1e293b",
        padding: "14px 20px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: 40,
          padding: "8px 16px",
          maxWidth: "90%",
          margin: "0 auto",
        }}>
          {newsItems.length > 0 && (
            <div
              key={newsIndex}
              style={{
                transition: "opacity 0.4s ease, transform 0.4s ease",
                opacity: newsAnim ? 1 : 0,
                transform: newsAnim ? "translateY(0)" : "translateY(10px)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
                fontWeight: 500,
                color: "white",
                lineHeight: 1.4,
              }}
            >
              {newsItems[newsIndex]}
            </div>
          )}
        </div>
      </div>

      {/* REST OF THE COMPONENT (no further changes) */}
      {/* STATS BAR */}
      <section style={{ background: white, padding: "48px 0", borderBottom: `1px solid #e2e8f0` }}>
        <div style={container}>
          <div className="hc-stats-row">
            {statsData.map((s, i) => (
              <AnimSection key={i} delay={i * 0.05}>
                <div className="hc-stat-card" style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "20px 16px", borderRadius: 16,
                  background: lgray, border: "1px solid #e2e8f0",
                  transition: "all .3s ease", cursor: "default",
                  height: "100%",
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${blue}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon d={s.icon} size={22} color={blue} />
                  </div>
                  <div>
                    {s.val && <div className="stat-number" style={{ fontWeight: 900, fontSize: "1.2rem", color: dark }}>{s.val}</div>}
                    <div style={{ fontWeight: 800, fontSize: "0.9rem", color: dark }}>{s.label}</div>
                    <div style={{ fontSize: "0.75rem", color: gray, marginTop: 2 }}>{s.sub}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{ ...sectionPy, background: navy }}>
        <div style={container}>
          <div className="hc-services-main-grid" style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 60,
            alignItems: "start",
          }}>
            <AnimSection direction="left" className="hc-services-heading">
              <div style={pill("rgba(255,255,255,.15)", "#93c5fd")}>
                Our Services
              </div>
              <h2 className="hc-section-title" style={{
                fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
                fontWeight: 900,
                color: white,
                lineHeight: 1.35,
                marginBottom: 22,
                letterSpacing: "-0.4px",
                maxWidth: 260,
              }}>
                Comprehensive Care,
                <br />
                Tailored to You
              </h2>
              <Link to="/services" style={{ textDecoration: "none" }}>
                <button
                  className="hc-btn-outline"
                  style={{
                    ...btnOutline,
                    color: white,
                    borderColor: white,
                    fontSize: 14,
                    padding: "12px 18px",
                    whiteSpace: "nowrap",
                  }}
                >
                  View All Services
                  <Icon d={icons.arrow} size={16} color={white} />
                </button>
              </Link>
            </AnimSection>

            <div className="hc-services-row" style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 28,
            }}>
              {services.map((s, i) => (
                <AnimSection key={i} delay={i * 0.1}>
                  <div className="hc-service-card" style={{
                    background: "rgba(255,255,255,.07)",
                    borderRadius: 24,
                    padding: "32px 24px",
                    border: "1px solid rgba(255,255,255,.12)",
                    transition: "all .3s ease",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      background: "rgba(255,255,255,.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                      marginRight: "auto",
                    }}>
                      <img
                        src={s.icon}
                        alt={`${s.title} icon`}
                        style={{ width: 52, height: 52, objectFit: "contain" }}
                      />
                    </div>
                    <div className="service-title" style={{
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: white,
                      marginBottom: 14,
                      lineHeight: 1.4,
                    }}>
                      {s.title}
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,.7)",
                      lineHeight: 1.65,
                      marginBottom: 24,
                      flex: 1,
                    }}>
                      {s.desc}
                    </div>
                    <a href="/services" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#60a5fa",
                      textDecoration: "none",
                      marginTop: "auto",
                    }}>
                      Learn More
                      <Icon d={icons.arrow} size={14} color="#60a5fa" />
                    </a>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FIND A DOCTOR SECTION */}
      <section style={{ ...sectionPy, background: lgray, paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={container}>
          <div className="hc-appt-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr 320px", gap: 32, alignItems: "stretch" }}>
            {/* Left column: Find a Doctor form */}
            <AnimSection direction="left">
              <div style={{ background: white, borderRadius: 24, padding: "28px 28px", height: "100%", boxShadow: "0 8px 30px rgba(0,0,0,.06)", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, letterSpacing: -0.3 }}>
                  <span style={{ color: blue }}>Find a Doctor</span>
                </h3>
                <p style={{ fontSize: 14, color: gray, marginBottom: 24 }}>Schedule your visit in just a few clicks.</p>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                      <Icon d={icons.shield} size={18} color={gray} />
                    </div>
                    <select
                      value={activeApptDept}
                      onChange={e => { setActiveApptDept(e.target.value); setActiveApptDoc(""); }}
                      style={{
                        width: "100%", padding: "12px 16px 12px 44px",
                        border: "1.5px solid #e2e8f0", borderRadius: 12,
                        fontSize: 14, color: dark, background: lgray,
                        outline: "none", fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <option value="">Select Department</option>
                      {departmentsList.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                      <Icon d={icons.user} size={18} color={gray} />
                    </div>
                    <select
                      value={activeApptDoc}
                      onChange={e => setActiveApptDoc(e.target.value)}
                      disabled={!activeApptDept}
                      style={{
                        width: "100%", padding: "12px 16px 12px 44px",
                        border: "1.5px solid #e2e8f0", borderRadius: 12,
                        fontSize: 14, color: dark, background: activeApptDept ? lgray : "#f1f5f9",
                        outline: "none", fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <option value="">Select Doctor</option>
                      {activeApptDept && departmentDoctors[activeApptDept]?.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                    </select>
                  </div>
                </div>

                <button className="hc-btn-primary" style={{ ...btnPrimary, width: "100%", justifyContent: "center", marginTop: 12, fontSize: 15, padding: "12px 20px" }} onClick={handleFindDoctor}>
                  Find a Doctor <Icon d={icons.arrow} size={16} color={white} />
                </button>
              </div>
            </AnimSection>

            {/* Middle column: Healthcare Technology / Video */}
            <AnimSection>
              <div style={{
                borderRadius: 24, overflow: "hidden", position: "relative",
                minHeight: 360, background: navy,
                boxShadow: "0 16px 50px rgba(37,99,235,.25)",
                height: "100%",
              }}>
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                  alt="Healthcare Technology"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(15,23,42,.85) 100%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.95)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    animation: "pulse 2s ease-in-out infinite",
                    boxShadow: "0 0 0 20px rgba(255,255,255,.2)",
                  }}>
                    <Icon d={icons.play} size={36} color={blue} />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: white, marginBottom: 12, letterSpacing: -0.3 }}>Experience the Future of Healthcare</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", marginBottom: 16, lineHeight: 1.6 }}>
                    Discover how technology and compassion come together for better outcomes.
                  </p>
                  <button style={{ background: "none", border: "none", color: "#60a5fa", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}>
                    <Icon d={icons.play} size={16} color="#60a5fa" /> Watch Video
                  </button>
                </div>
              </div>
            </AnimSection>

            {/* Right column: Three feature cards */}
            <AnimSection direction="right">
              <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
                {techFeatures.map((f, i) => (
                  <div key={i} className="hc-feature-card" style={{
                    background: navy, borderRadius: 20, padding: "24px 20px",
                    flex: 1, display: "flex", gap: 18, alignItems: "flex-start",
                    transition: "all .3s ease", cursor: "default",
                    minHeight: "0",
                  }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon d={f.icon} size={24} color={white} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: white, marginBottom: 8 }}>{f.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - UPDATED WITH IMAGES */}
      <section style={{ ...sectionPy, background: white }}>
        <div style={container}>
          <AnimSection>
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 56px" }}>
              <div style={pill("#dbeafe", blue)}>WHY CHOOSE US</div>

              <h2
                className="hc-section-title"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: dark,
                  letterSpacing: -0.5,
                }}
              >
                Trusted Healthcare with{" "}
                <span style={{ color: blue }}>Compassion & Excellence</span>
              </h2>

              <p
                style={{
                  color: gray,
                  marginTop: 16,
                  fontSize: 16,
                  lineHeight: 1.7,
                }}
              >
                Providing quality healthcare through expert medical services,
                advanced facilities, and patient-centered care.
              </p>
            </div>
          </AnimSection>

          <div
            className="hc-whyus-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 28,
            }}
          >
            {whyUs.map((item, i) => (
              <AnimSection key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: lgray,
                    borderRadius: 24,
                    padding: "36px 28px",
                    textAlign: "center",
                    transition: "all .3s ease",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                  className="hc-stat-card"
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: `${blue}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: dark,
                      marginBottom: 12,
                      letterSpacing: -0.3,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: gray,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section style={{
        background: `linear-gradient(135deg, ${blue} 0%, #1d4ed8 100%)`,
        padding: "80px 0",
      }}>
        <div style={container}>
          <div ref={metricsRef}>
            <AnimSection>
              <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, color: white, marginBottom: 56, letterSpacing: -0.5 }}>
                Making a Difference Every Day
              </h2>
            </AnimSection>
            <div className="hc-metrics-row" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28 }}>
              {metrics.map((m, i) => (
                <AnimSection key={i} delay={i * 0.1}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                      <Icon d={m.icon} size={28} color={white} />
                    </div>
                    <div className="metric-number" style={{ fontWeight: 900, fontSize: "2.2rem", color: white, letterSpacing: -0.5 }}>
                      {typeof m.val === "number" ? m.val.toLocaleString() : m.val}{m.suffix}
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,.8)", marginTop: 8, fontWeight: 600 }}>{m.label}</div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS SECTION - Increased height for cards */}
      <section style={{ ...sectionPy, background: white }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <AnimSection direction="left">
              <div style={pill("#dbeafe", blue)}>Our Experts</div>
              <h2 className="hc-section-title" style={{ fontSize: "2.5rem", fontWeight: 900, color: dark, letterSpacing: -0.5 }}>
                Meet Our <span style={{ color: blue }}>Expert Doctors</span>
              </h2>
              <p style={{ color: gray, fontSize: 15, marginTop: 12 }}>Our specialists are here to provide the best care for you.</p>
            </AnimSection>
            <AnimSection direction="right">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <a href="/doctors" style={{ display: "flex", alignItems: "center", gap: 8, color: blue, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                  View All Doctors <Icon d={icons.arrow} size={16} color={blue} />
                </a>
              </div>
            </AnimSection>
          </div>
          {loadingDoctors ? (
            <div style={{ textAlign: "center", padding: 60 }}>Loading doctors...</div>
          ) : (
            <div className="hc-doctors-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
              {doctors.slice(0, 4).map((d, i) => (
                <AnimSection key={i} delay={i * 0.12}>
                  <div className="hc-doctor-card" style={{
                    background: white, borderRadius: 24, overflow: "hidden",
                    border: "1px solid #e2e8f0", transition: "all .35s ease",
                    boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                    display: "flex", flexDirection: "column",
                    height: "100%",
                  }}>
                    <div style={{ position: "relative" }}>
                      <img src={d.img} alt={d.name}
                        style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(15,23,42,.4) 100%)" }} />
                      <button
                        onClick={() => setSelectedDoctor(d)}
                        style={{
                          position: "absolute", bottom: 16, right: 16,
                          width: 40, height: 40, borderRadius: "50%",
                          background: blue, border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                        <Icon d={icons.plus} size={18} color={white} />
                      </button>
                    </div>
                    <div style={{ padding: "24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div className="doctor-name" style={{ fontWeight: 900, fontSize: 18, color: dark, marginBottom: 6, letterSpacing: -0.3 }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: gray, marginBottom: 5, fontWeight: 600 }}>{d.qual || d.role}</div>
                      <div style={{ fontSize: 14, color: blue, fontWeight: 700, marginBottom: 8 }}>{d.dept || d.department}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: gray, marginBottom: 12 }}>
                        <Icon d={icons.clock} size={14} color={gray} />
                        {d.exp} Years Experience
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                        <Icon d={icons.star} size={14} color="#f59e0b" fill="#f59e0b" />
                        <span style={{ fontWeight: 800, fontSize: 14, color: dark }}>{d.rating || 4.8}</span>
                        <span style={{ fontSize: 12, color: gray }}>({d.reviews || 150} Reviews)</span>
                      </div>
                      <button
                        onClick={() => setSelectedDoctor(d)}
                        className="hc-view-btn" style={{
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          width: "100%", background: "transparent", color: blue,
                          border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "12px 0",
                          fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .3s",
                          fontFamily: "'Inter', sans-serif", marginTop: "auto",
                        }}>
                        View Profile <Icon d={icons.arrow} size={14} color="inherit" />
                      </button>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION - AUTO-SCROLLING CAROUSEL */}
      <section style={{ ...sectionPy, background: lgray }} onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
        <div style={container}>
          <AnimSection>
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 56px" }}>
              <div style={pill("#dbeafe", blue)}>Testimonials</div>
              <h2 className="hc-section-title" style={{ fontSize: "2.5rem", fontWeight: 900, color: dark, letterSpacing: -0.5 }}>
                What Our <span style={{ color: blue }}>Patients Say</span>
              </h2>
              <p style={{ color: gray, marginTop: 16, fontSize: 16 }}>Real stories of healing and exceptional care</p>
            </div>
          </AnimSection>

          <div ref={carouselContainerRef} style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ overflow: "hidden", borderRadius: 24 }}>
              <div
                className={`testimonial-card ${slideDirection === 'right' ? 'testimonial-slide-right' : ''} ${slideDirection === 'left' ? 'testimonial-slide-left' : ''}`}
                style={{
                  background: white,
                  borderRadius: 24,
                  padding: "40px 48px",
                  boxShadow: "0 20px 35px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  margin: "0 auto",
                }}
                key={currentTestimonialIdx}
              >
                <Icon d={icons.quote} size={44} color={blue} style={{ opacity: 0.3, marginBottom: 28 }} />
                <p style={{ fontSize: "1.1rem", color: dark, lineHeight: 1.7, marginBottom: 32, fontStyle: "italic" }}>"{testimonials[currentTestimonialIdx].text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <img
                    src={testimonials[currentTestimonialIdx].img}
                    alt={testimonials[currentTestimonialIdx].name}
                    style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "3px solid #2563eb" }}
                  />
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: dark }}>{testimonials[currentTestimonialIdx].name}</div>
                    <div style={{ fontSize: 14, color: gray }}>{testimonials[currentTestimonialIdx].role}</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} d={icons.star} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="carousel-btn"
              onClick={handleManualPrev}
              style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
              aria-label="Previous testimonial"
            >
              <Icon d={icons.chevronL} size={24} color={dark} />
            </button>
            <button
              className="carousel-btn"
              onClick={handleManualNext}
              style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
              aria-label="Next testimonial"
            >
              <Icon d={icons.chevronR} size={24} color={dark} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40, gap: 8 }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${idx === currentTestimonialIdx ? 'active' : ''}`}
                  onClick={() => {
                    if (idx > currentTestimonialIdx) {
                      setSlideDirection('right');
                    } else if (idx < currentTestimonialIdx) {
                      setSlideDirection('left');
                    }
                    setCurrentTestimonialIdx(idx);
                    stopAutoSlide();
                    startAutoSlide();
                  }}
                  style={{ width: idx === currentTestimonialIdx ? 24 : 10, height: 10, borderRadius: idx === currentTestimonialIdx ? 12 : 10 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & MAP - Updated Address and Map */}
      <section style={{ ...sectionPy, background: lgray }}>
        <div style={container}>
          <div className="hc-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <AnimSection direction="left">
              <div>
                <div style={pill("#dbeafe", blue)}>Visit Us</div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: dark, marginBottom: 28, letterSpacing: -0.5 }}>
                  We're Here to <span style={{ color: blue }}>Help You</span>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${blue}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon d={icons.mapPin} size={24} color={blue} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: dark }}>Address</div>
                      <div style={{ fontSize: 14, color: gray, lineHeight: 1.5 }}>
                        Meerut Road, Mariam Nagar,<br />
                        Sewa Nagar, Ghaziabad,<br />
                        Uttar Pradesh – 201003
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${blue}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={icons.phone} size={24} color={blue} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: dark }}>24/7 Helpline</div>
                      <div style={{ fontSize: 14, color: gray }}>+91-120-1234567</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${blue}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={icons.mail} size={24} color={blue} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: dark }}>Admin Email</div>
                      <div style={{ fontSize: 14, color: gray }}>stjosephgzb@rediffmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>
            <AnimSection direction="right">
              <div className="hc-contact-map" style={{
                borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.1)",
                height: 340, background: "#e2e8f0",
              }}>
                <iframe
                  title="ST JOSEPH'S HOSPITAL Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2407662005257!2d77.41091687601781!3d28.6824435818113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1dfe7c7fead%3A0x12d59852c4390cad!2sST%20JOSEPH&#39;S%20HOSPITAL!5e0!3m2!1sen!2sin!4v1780472342782!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: navy, padding: "60px 0" }}>
        <div style={container}>
          <AnimSection>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <h3 style={{ fontSize: 28, fontWeight: 900, color: white, marginBottom: 16, letterSpacing: -0.5 }}>Stay Healthy, Stay Informed</h3>
              <p style={{ color: "rgba(255,255,255,.75)", marginBottom: 32, fontSize: 16 }}>
                Subscribe to our newsletter for health tips, updates, and exclusive offers.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1, minWidth: 280, padding: "16px 24px", borderRadius: 14,
                    border: "none", fontSize: 15, background: white, color: dark,
                    outline: "none", fontFamily: "'Inter', sans-serif",
                  }}
                />
                <button className="hc-btn-primary" style={{ ...btnPrimary, background: blue, padding: "16px 32px", fontSize: 15 }}>
                  Subscribe <Icon d={icons.arrow} size={16} color={white} />
                </button>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: lgray, padding: "80px 0", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ ...container, textAlign: "center" }}>
          <AnimSection>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: dark, marginBottom: 20, letterSpacing: -0.5 }}>
              Ready to Experience Better <span style={{ color: blue }}>Healthcare?</span>
            </h2>
            <p style={{ fontSize: 16, color: gray, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
              Book your appointment today and take the first step toward better health.
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="hc-btn-primary" style={btnPrimary} onClick={openBookingLink}>
                Book Appointment <Icon d={icons.arrow} size={18} color={white} />
              </button>
              <button
                className="hc-btn-outline"
                style={btnOutline}
                onClick={() => window.location.href = 'tel:+917827908598'}
              >
                <Icon d={icons.phone} size={18} color={blue} /> Call Us
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes modalZoom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          .carousel-btn {
            display: none !important;
          }
          .testimonial-card {
            padding: 28px !important;
          }
          .testimonial-card p {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;