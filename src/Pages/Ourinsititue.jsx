import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import bannerImg from "../assets/Insititue/banner1.png";
import API from "../api"; // Adjust path if your api.js is elsewhere (e.g., "../services/api")

// Import PDF file for application form
import applicationFormPdf from "../assets/application_form.pdf";

const styles = {
  // ── PAGE WRAPPER ──────────────────────────────────────────────
  page: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    color: "#0f172a",
    backgroundColor: "#ffffff",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    width: "100%",
  },

  // ── HERO BANNER (TWO-COLUMN WITH RIGHT SHADOW) ────────────────
  hero: {
    position: "relative",
    width: "100%",
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(105deg, rgba(10, 25, 47, 0.85) 0%, rgba(15, 43, 92, 0.75) 55%, rgba(37, 99, 235, 0.65) 100%)",
    zIndex: 1,
  },
  heroContainer: (isMobile) => ({
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1440,
    margin: "0 auto",
    padding: isMobile ? "40px 20px" : "0 48px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? "40px" : "32px",
  }),
  heroLeft: {
    flex: "1.2",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  heroRight: {
    flex: "0.8",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "28px",
    padding: "24px 20px",
    border: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 25px 40px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.1)",
    transition: "box-shadow 0.3s ease",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "6px 16px",
    borderRadius: "40px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#e0f2fe",
    letterSpacing: "0.5px",
    border: "1px solid rgba(255,255,255,0.3)",
    width: "fit-content",
  },
  heroTitle: {
    fontSize: "clamp(32px, 6vw, 68px)",
    fontWeight: "800",
    lineHeight: "1.1",
    color: "#ffffff",
    maxWidth: "800px",
    letterSpacing: "-0.02em",
  },
  heroHighlight: {
    color: "#90d5ff",
    borderBottom: "3px solid #3b82f6",
    display: "inline-block",
  },
  heroSubtitle: {
    fontSize: "clamp(14px, 2vw, 18px)",
    color: "#f1f5f9",
    maxWidth: "600px",
    lineHeight: "1.5",
    fontWeight: "400",
    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  heroBtnPrimary: {
    backgroundColor: "#ffffff",
    color: "#1e3a8a",
    border: "none",
    padding: "10px 24px",
    borderRadius: "40px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  heroBtnSecondary: {
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    color: "#ffffff",
    border: "1.5px solid rgba(255,255,255,0.6)",
    padding: "10px 24px",
    borderRadius: "40px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  rightTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "16px",
    borderLeft: "4px solid #3b82f6",
    paddingLeft: "12px",
  },
  rightStatList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
  },
  rightStatItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  rightStatIcon: {
    width: "36px",
    height: "36px",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#b9d0ff",
  },
  rightStatText: {
    flex: 1,
  },
  rightStatValue: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#fff",
    lineHeight: "1.2",
  },
  rightStatLabel: {
    fontSize: "10px",
    color: "#cbd5e6",
  },
  rightCta: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "40px",
    fontWeight: "600",
    fontSize: "13px",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  // ── STATS BAR ────────────────────────────────────────────────
  statsBar: {
    background: "linear-gradient(115deg, #1e2b6e 0%, #0f2b5c 100%)",
    backdropFilter: "blur(2px)",
  },
  statItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    flex: "1",
    minWidth: "180px",
    transition: "transform 0.2s ease",
  },
  statIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b9d0ff",
    fontSize: "20px",
    flexShrink: "0",
    transition: "all 0.2s",
  },
  statText: {
    color: "#fff",
    flex: 1,
  },
  statLabel: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "4px",
    color: "#f0f4ff",
    lineHeight: "1.3",
  },
  statDesc: {
    fontSize: "11px",
    color: "#b9d0ff",
    lineHeight: "1.4",
  },

  // ── ABOUT SECTION ─────────────────────────────────────────────
  about: {
    backgroundColor: "#fff",
  },
  aboutLeft: {
    flex: "1",
    minWidth: "220px",
  },
  sectionEyebrow: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  aboutTitle: {
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: "800",
    lineHeight: "1.2",
    color: "#0f172a",
  },
  aboutTitleBlue: {
    color: "#2563eb",
    display: "block",
  },
  aboutMid: {
    flex: "2",
    minWidth: "260px",
  },
  aboutDesc: {
    fontSize: "14px",
    color: "#334155",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  aboutExtraContent: {
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #e2e8f0",
  },
  aboutBulletList: {
    listStyle: "none",
    padding: 0,
    margin: "12px 0 0 0",
  },
  aboutBulletItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#1e293b",
  },
  aboutStats: {
    flex: "1",
    minWidth: "220px",
    display: "grid",
    gap: "20px",
  },
  aboutStatCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "transform 0.2s",
  },
  aboutStatIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "#eff6ff",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2563eb",
    fontSize: "20px",
    flexShrink: "0",
  },
  aboutStatNum: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
  },
  aboutStatLabel: {
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "500",
  },

  // ── PROGRAMS SECTION ─────────────────────────────────────────
  programs: {
    background: "linear-gradient(145deg, #f9fbfe 0%, #ffffff 100%)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "clamp(24px, 3.5vw, 34px)",
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: "-0.01em",
  },
  viewAllLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "gap 0.2s ease",
  },
  programsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  programCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)",
    transition: "all 0.35s cubic-bezier(0.2, 0, 0, 1)",
    cursor: "pointer",
  },
  programImg: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  },
  programBody: {
    padding: "16px 16px 20px",
  },
  programTitle: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
    lineHeight: "1.3",
  },
  programDuration: {
    fontSize: "12px",
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: "10px",
    letterSpacing: "0.3px",
  },
  programDesc: {
    fontSize: "12px",
    color: "#5b6e8c",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  learnMore: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "none",
    transition: "gap 0.2s",
  },

  // ── GALLERY SECTION ──────────────────────────────────────────
  gallery: {
    backgroundColor: "#f8fafc",
  },
  filterTabs: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  filterTab: (active, current) => ({
    padding: "6px 20px",
    borderRadius: "40px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: active === current ? "#2563eb" : "#fff",
    color: active === current ? "#fff" : "#334155",
    border: "1px solid",
    borderColor: active === current ? "#2563eb" : "#e2e8f0",
    boxShadow: active === current ? "0 4px 12px rgba(37,99,235,0.2)" : "none",
  }),
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  galleryCard: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  galleryImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  galleryCaption: {
    padding: "12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    borderTop: "1px solid #f1f5f9",
  },

  // ── ADMISSION SECTION ─────────────────────────────────────────
  admission: {
    borderRadius: "28px",
    background: "radial-gradient(circle at 10% 30%, #1e3a8a, #0f2b6d)",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)",
  },
  admissionBg: {
    position: "absolute",
    right: "-80px",
    bottom: "-80px",
    width: "300px",
    height: "300px",
    opacity: "0.1",
    background: "radial-gradient(circle, #ffffff 20%, transparent 70%)",
    pointerEvents: "none",
  },
  admissionLeft: {
    flex: "1",
    minWidth: "240px",
    position: "relative",
    zIndex: "2",
  },
  admissionEyebrow: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#b9d0ff",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  admissionTitle: {
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: "800",
    color: "#fff",
    lineHeight: "1.2",
    marginBottom: "14px",
  },
  admissionDesc: {
    fontSize: "13px",
    color: "#cbdffc",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  admissionRight: {
    flex: "2",
    minWidth: "260px",
    position: "relative",
    zIndex: "2",
  },
  admissionProcessTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "24px",
  },
  stepsRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    flex: "1",
    minWidth: "90px",
    position: "relative",
  },
  stepIconWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: "12px",
  },
  stepConnector: {
    position: "absolute",
    top: "50%",
    left: "calc(50% + 28px)",
    width: "calc(100% - 56px)",
    height: "2px",
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: "translateY(-50%)",
  },
  stepIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "28px",
    backgroundColor: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "22px",
    position: "relative",
    zIndex: "1",
    flexShrink: "0",
  },
  stepNum: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    width: "22px",
    height: "22px",
    borderRadius: "30px",
    backgroundColor: "#3b82f6",
    border: "2px solid #fff",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "4px",
  },
  stepDesc: {
    fontSize: "9px",
    color: "#cddfff",
    lineHeight: "1.4",
    maxWidth: "90px",
  },

  // ── WHY CHOOSE ───────────────────────────────────────────────
  whyChoose: {
    background: "linear-gradient(125deg, #0f2b5c, #1e3a8a)",
  },
  whyLeft: {
    flex: "1",
    minWidth: "200px",
  },
  whyTitle: {
    fontSize: "clamp(26px, 4vw, 36px)",
    fontWeight: "800",
    color: "#fff",
    lineHeight: "1.2",
  },
  whyRight: {
    flex: "3",
    minWidth: "260px",
    display: "grid",
    gap: "28px",
  },
  whyFeature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "12px",
    transition: "transform 0.2s ease",
  },
  whyIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "28px",
    backgroundColor: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#bfdbff",
    fontSize: "24px",
    transition: "all 0.2s",
  },
  whyLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#f0f7ff",
    lineHeight: "1.3",
  },

  // ── CTA STRIP ────────────────────────────────────────────────
  ctaStrip: {
    backgroundColor: "#fff",
    borderTop: "1px solid #eef2ff",
  },
  ctaLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  ctaIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "40px",
    background: "linear-gradient(145deg, #2563eb, #1d4ed8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "22px",
    flexShrink: "0",
    boxShadow: "0 12px 28px rgba(37,99,235,0.3)",
  },
  ctaTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
  },
  ctaDesc: {
    fontSize: "12px",
    color: "#64748b",
  },
  ctaBtn: {
    backgroundColor: "transparent",
    color: "#2563eb",
    border: "2px solid #2563eb",
    padding: "8px 20px",
    borderRadius: "14px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    transition: "all 0.25s ease",
  },

  // ── INNER CONTAINER ──
  innerContainer: (isMobile) => ({
    maxWidth: 1440,
    margin: "0 auto",
    padding: isMobile ? "0 16px" : "0 32px",
  }),

  // ── BUTTON PRIMARY ──
  btnPrimary: {
    padding: "10px 20px",
    borderRadius: "40px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  // ── ADDITIONAL SECTIONS (FEE, PRINCIPAL MSG) ──
  feeTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  feeRow: {
    borderBottom: "1px solid #e2e8f0",
  },
  feeCell: {
    padding: "10px 6px",
    textAlign: "left",
    color: "#334155",
  },
  principalMessage: {
    backgroundColor: "#f9fbfe",
    borderRadius: "24px",
    padding: "32px 20px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

// Updated data arrays based on St. Joseph's Paramedical Institute
const programHighlights = [
  {
    title: "Hematology & Clinical Chemistry",
    duration: "Core Module",
    desc: "Comprehensive training in blood analysis, chemical diagnostics, and lab instrumentation.",
    imgUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
    alt: "Hematology lab analysis",
  },
  {
    title: "Microbiology & Immunology",
    duration: "Core Module",
    desc: "Study of pathogens, culture techniques, serology, and immune response diagnostics.",
    imgUrl: "https://images.unsplash.com/photo-1581595219315-b187dd3c2e7a?w=600&h=400&fit=crop",
    alt: "Microscope and samples",
  },
  {
    title: "Blood Banking & Histopathology",
    duration: "Core Module",
    desc: "Hands-on training in blood component separation, cross-matching, and tissue analysis.",
    imgUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
    alt: "Blood banking equipment",
  },
];

const admissionSteps = [
  { icon: "📝", num: "1", title: "Application", desc: "Fill form (in person/download) with ₹350/₹400 fee." },
  { icon: "📋", num: "2", title: "Entrance Test", desc: "Written exam in July: English, Science, GK." },
  { icon: "🗣️", num: "3", title: "Interview", desc: "Personal interview for shortlisted candidates." },
  { icon: "✅", num: "4", title: "Enrollment", desc: "Medical check-up & document verification." },
];

const whyFeatures = [
  { icon: "🏛️", label: "UP State Medical Faculty Recognized" },
  { icon: "🏥", label: "Clinical Training at St. Joseph's Hospital" },
  { icon: "👩‍🏫", label: "Experienced Faculty & Mentors" },
  { icon: "💼", label: "Placement Assistance" },
  { icon: "💰", label: "Affordable Fee Structure" },
  { icon: "🤝", label: "Holistic Development Focus" },
  { icon: "🎓", label: "Merit-based Scholarships" },
  { icon: "🏘️", label: "Safe Girls Hostel" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

function getAcademicYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  return `${currentYear}-${currentYear + 1}`;
}

export default function HealthCareInstitutePage() {
  const isMobile = useIsMobile();
  useScrollAnimation();

  // --- Gallery dynamic state ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setGalleryLoading(true);
        const res = await API.get('/paramedical-gallery');
        setGalleryImages(res.data);
        setGalleryError(false);
      } catch (err) {
        console.error("Failed to load gallery:", err);
        setGalleryError(true);
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages =
    galleryFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === galleryFilter);

  const containerPadding = styles.innerContainer(isMobile);
  
  const statsBarLayout = {
    ...containerPadding,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: isMobile ? "24px" : "40px",
    paddingTop: isMobile ? "32px" : "36px",
    paddingBottom: isMobile ? "32px" : "36px",
    flexDirection: isMobile ? "column" : "row",
  };
  
  const aboutLayout = {
    ...containerPadding,
    display: "flex",
    alignItems: "flex-start",
    gap: isMobile ? "28px" : "40px",
    flexWrap: "wrap",
    paddingTop: isMobile ? "40px" : "60px",
    paddingBottom: isMobile ? "40px" : "60px",
    flexDirection: isMobile ? "column" : "row",
  };
  
  const aboutStatsGrid = {
    ...styles.aboutStats,
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "1fr 1fr",
    gap: isMobile ? "16px" : "28px",
  };
  
  const whyRightGrid = {
    ...styles.whyRight,
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(150px, 1fr))",
    gap: isMobile ? "20px" : "32px",
  };
  
  const admissionInnerLayout = {
    display: "flex",
    gap: isMobile ? "32px" : "40px",
    alignItems: "center",
    flexWrap: "wrap",
    padding: isMobile ? "28px 20px" : "56px 56px",
  };
  
  const stepsRowLayout = {
    ...styles.stepsRow,
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "20px" : "8px",
    alignItems: isMobile ? "stretch" : "flex-start",
  };
  
  const ctaStripLayout = {
    ...containerPadding,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? "24px" : "24px",
    flexWrap: "wrap",
    paddingTop: isMobile ? "32px" : "40px",
    paddingBottom: isMobile ? "32px" : "40px",
    flexDirection: isMobile ? "column" : "row",
    textAlign: isMobile ? "center" : "left",
  };
  
  const ctaLeftLayout = {
    ...styles.ctaLeft,
    flexDirection: isMobile ? "column" : "row",
    textAlign: isMobile ? "center" : "left",
    gap: isMobile ? "12px" : "20px",
  };
  
  const scrollToPrograms = () => {
    document.getElementById("programs-section")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAdmission = () => {
    document.getElementById("admission-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const academicYear = getAcademicYear();
  const currentYear = new Date().getFullYear();

  return (
    <div style={styles.page}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; padding: 0; overflow-x: hidden; }
        
        /* Scroll Reveal Animation */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Hover Effects */
        .primary-btn:hover {
          background-color: #1d4ed8 !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 28px -8px rgba(37,99,235,0.4) !important;
        }
        .secondary-btn:hover {
          background-color: #eff6ff !important;
          transform: translateY(-2px);
          border-color: #1d4ed8 !important;
        }
        .cta-btn:hover {
          background-color: #2563eb !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -8px #2563eb66;
        }
        .program-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 25px 35px -12px rgba(0,0,0,0.15) !important;
        }
        .program-card:hover .program-img { transform: scale(1.03); }
        .stat-item:hover .stat-icon {
          background-color: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -12px rgba(0,0,0,0.15) !important;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.03);
        }
        .why-feature:hover { transform: translateY(-5px); }
        .why-feature:hover .why-icon {
          background-color: rgba(255,255,255,0.2);
          color: white;
        }
        .view-all-link:hover { gap: 10px; }
        .learn-more-link:hover { gap: 10px; }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
          background-color: #f8fafc;
        }
        .hero-btn-secondary:hover {
          background-color: rgba(255,255,255,0.25);
          border-color: white;
          transform: translateY(-3px);
        }
        .hero-cta-right:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
        }
        .breadcrumb-link:hover {
          color: #ffffff !important;
        }
        .filter-tab:hover {
          background-color: #eef2ff;
        }
        .filter-tab-active:hover {
          background-color: #1d4ed8;
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .stats-bar-mobile .stat-item {
            width: 100%;
          }
          .why-choose-mobile {
            text-align: center;
          }
        }
      `}</style>

      <Navbar />

      {/* HERO BANNER */}
      <section style={styles.hero} className="scroll-reveal">
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContainer(isMobile)}>
          <div style={styles.heroLeft}>
            <div style={styles.heroBadge}>St. Joseph’s Paramedical Institute | Recognized by UP State Medical Faculty</div>
            <h1 style={styles.heroTitle}>
              Shaping Skilled <span style={styles.heroHighlight}>Healthcare Professionals</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Run by Medical Sisters of St. Joseph, we offer recognized DMLT program with hospital-based training,
              experienced faculty, and a mission of compassionate healing.
            </p>
            <div style={styles.heroButtons}>
              <button className="hero-btn-primary" style={styles.heroBtnPrimary} onClick={scrollToPrograms}>
                Explore DMLT Program <span>→</span>
              </button>
              <button className="hero-btn-secondary" style={styles.heroBtnSecondary} onClick={scrollToAdmission}>
                Apply Now <span>📋</span>
              </button>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.rightTitle}>Why St. Joseph's?</div>
            <div style={styles.rightStatList}>
              <div style={styles.rightStatItem}>
                <div style={styles.rightStatIcon}>🏛️</div>
                <div style={styles.rightStatText}>
                  <div style={styles.rightStatValue}>UP State Medical Faculty</div>
                  <div style={styles.rightStatLabel}>Recognized DMLT Course</div>
                </div>
              </div>
              <div style={styles.rightStatItem}>
                <div style={styles.rightStatIcon}>🏥</div>
                <div style={styles.rightStatText}>
                  <div style={styles.rightStatValue}>Hospital-Based Training</div>
                  <div style={styles.rightStatLabel}>St. Joseph's Hospital, Ghaziabad</div>
                </div>
              </div>
              <div style={styles.rightStatItem}>
                <div style={styles.rightStatIcon}>📄</div>
                <div style={styles.rightStatText}>
                  <div style={styles.rightStatValue}>Letter No. 1504/71-4-2020</div>
                  <div style={styles.rightStatLabel}>UPSMF Recognition (20th Nov 2020)</div>
                </div>
              </div>
            </div>
            <button 
              className="hero-cta-right" 
              style={styles.rightCta}
              onClick={scrollToAdmission}
            >
              Get Application Form → 
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={styles.statsBar} className="scroll-reveal">
        <div style={statsBarLayout}>
          {[
            { icon: "🎓", label: "Quality Education", desc: "Recognized by UP State Medical Faculty." },
            { icon: "🔬", label: "Modern Labs", desc: "State-of-the-art equipment & clinical exposure." },
            { icon: "👩‍🏫", label: "Experienced Faculty", desc: "Qualified educators & healthcare professionals." },
            { icon: "💼", label: "Career Support", desc: "Placement assistance in leading hospitals." },
            { icon: "🏘️", label: "Girls Hostel", desc: "Safe & secure on-campus accommodation." },
          ].map((s, i) => (
            <div key={i} className="stat-item" style={styles.statItem}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={styles.statText}>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statDesc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section style={styles.about} className="scroll-reveal">
        <div style={aboutLayout}>
          <div style={styles.aboutLeft}>
            <div style={styles.sectionEyebrow}>About Institute</div>
            <h2 style={styles.aboutTitle}>
              St. Joseph’s Paramedical Institute
              <span style={styles.aboutTitleBlue}> Mariam Nagar, Ghaziabad</span>
            </h2>
          </div>
          <div style={styles.aboutMid}>
            <p style={styles.aboutDesc}>
              Established in 2020, St. Joseph Paramedical Institute, Ghaziabad, is dedicated to excellence in healthcare education and professional training. 
              It is run by the Medical Sisters of St. Joseph, Little Flower Province, Lucknow – a religious congregation that strives to bring the vision 
              of its Founder, Venerable Joseph Panjikaran, into reality through compassionate service, quality education, and the promotion of human dignity.
            </p>
            <p style={styles.aboutDesc}>
              The institute is committed to the holistic development of students through quality education, hands-on laboratory training, and strong ethical values. 
              More than 100 students have successfully completed their training, and many are serving in government institutions, reputed hospitals, 
              and other healthcare organizations. With a focus on academic excellence, professional competence, and compassionate care, the institute prepares 
              skilled healthcare professionals to meet the growing needs of society.
            </p>
            <div style={styles.aboutExtraContent}>
              <p style={{ ...styles.aboutDesc, marginBottom: "10px" }}>
                <strong>Recognition:</strong> This Course is recognized by Uttar Pradesh State Medical Faculty Lucknow 
                (Letter No. – 1504 / 71 – 4 –2020– N – 8 / 2016, 20th November 2020). Our DMLT program provides rigorous theoretical knowledge 
                and real-life laboratory experience. Students train under experienced faculty and pathologists at St. Joseph's Hospital, 
                making them job-ready for diagnostic labs, blood banks, and healthcare institutions.
              </p>
              <ul style={styles.aboutBulletList}>
                <li style={styles.aboutBulletItem}>✅ Recognized by U.P. State Medical Faculty – Letter No. 1504/71-4-2020</li>
                <li style={styles.aboutBulletItem}>🏥 Clinical rotations at 200+ bed multi-specialty hospital</li>
                <li style={styles.aboutBulletItem}>📅 Annual workshops & advanced lab training</li>
                <li style={styles.aboutBulletItem}>🎓 Affordable fees with scholarship opportunities</li>
                <li style={styles.aboutBulletItem}>🙏 Values-driven education – Respect for life, Justice, Reconciliation</li>
                <li style={styles.aboutBulletItem}>👩‍⚕️ 100+ students trained & placed in reputed healthcare organizations</li>
              </ul>
            </div>
          </div>
          <div style={aboutStatsGrid}>
            {[
              { icon: "⏳", num: "2020", label: "Year of Establishment" },
              { icon: "👩‍🎓", num: "100+", label: "Students Trained" },
              { icon: "📜", num: "Recognized", label: "UP State Medical Faculty" },
              { icon: "✅", num: "2 Years", label: "Full-time DMLT" },
            ].map((s, i) => (
              <div key={i} style={styles.aboutStatCard}>
                <div style={styles.aboutStatIcon}>{s.icon}</div>
                <div>
                  <div style={styles.aboutStatNum}>{s.num}</div>
                  <div style={styles.aboutStatLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs-section" style={styles.programs} className="scroll-reveal">
        <div style={{ ...containerPadding, paddingTop: isMobile ? "40px" : "60px", paddingBottom: isMobile ? "40px" : "60px" }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Diploma in Medical Laboratory Technician (DMLT)</h2>
            <span className="view-all-link" style={styles.viewAllLink}>
              2-Year Full-time Program <span>→</span>
            </span>
          </div>
          <div style={styles.programsGrid}>
            {programHighlights.map((p, idx) => (
              <div key={idx} className="program-card" style={styles.programCard}>
                <img
                  src={p.imgUrl}
                  alt={p.alt}
                  className="program-img"
                  style={styles.programImg}
                  loading="lazy"
                />
                <div style={styles.programBody}>
                  <div style={styles.programTitle}>{p.title}</div>
                  <div style={styles.programDuration}>{p.duration}</div>
                  <div style={styles.programDesc}>{p.desc}</div>
                  <span className="learn-more-link" style={styles.learnMore}>
                    Learn More <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEE STRUCTURE SECTION */}
      <section className="scroll-reveal" style={{ backgroundColor: "#f8fafc", padding: isMobile ? "40px 0" : "60px 0" }}>
        <div style={containerPadding}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={styles.sectionTitle}>Fee Structure (As per Prospectus {academicYear})</h2>
            <p style={{ color: "#475569", marginTop: "10px", fontSize: isMobile ? "13px" : "14px" }}>Affordable, transparent fees with installment options.</p>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "24px" : "32px", justifyContent: "center" }}>
            {/* Year 1 */}
            <div style={{ flex: 1, background: "#fff", borderRadius: "20px", padding: isMobile ? "20px" : "28px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", borderLeft: "4px solid #2563eb", paddingLeft: "12px" }}>1st Year Fees</h3>
              <table style={styles.feeTable}>
                <tbody>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Admission Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹2,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Affiliation Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹2,700</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Breakage Deposit (Non-Refundable)</td><td style={{...styles.feeCell, textAlign:"right"}}>₹500</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Tuition Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹50,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Library Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹1,300</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Printing & Stationery</td><td style={{...styles.feeCell, textAlign:"right"}}>₹500</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Establishment Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹4,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Student Welfare</td><td style={{...styles.feeCell, textAlign:"right"}}>₹1,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Practical Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹12,000</td></tr>
                  <tr style={{ fontWeight: "800", backgroundColor: "#f1f5f9" }}><td style={styles.feeCell}>Total</td><td style={{...styles.feeCell, textAlign:"right", fontWeight:"800"}}>₹74,000</td></tr>
                </tbody>
              </table>
            </div>
            {/* Year 2 */}
            <div style={{ flex: 1, background: "#fff", borderRadius: "20px", padding: isMobile ? "20px" : "28px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", borderLeft: "4px solid #2563eb", paddingLeft: "12px" }}>2nd Year Fees</h3>
              <table style={styles.feeTable}>
                <tbody>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Affiliation Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹2,700</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Tuition Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹50,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Library Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹1,300</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Printing & Stationery</td><td style={{...styles.feeCell, textAlign:"right"}}>₹500</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Establishment Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹5,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Student Welfare</td><td style={{...styles.feeCell, textAlign:"right"}}>₹1,000</td></tr>
                  <tr style={styles.feeRow}><td style={styles.feeCell}>Practical Fees</td><td style={{...styles.feeCell, textAlign:"right"}}>₹13,000</td></tr>
                  <tr style={{ fontWeight: "800", backgroundColor: "#f1f5f9" }}><td style={styles.feeCell}>Total</td><td style={{...styles.feeCell, textAlign:"right", fontWeight:"800"}}>₹73,500</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: "24px", fontSize: "12px", color: "#64748b", textAlign: "center" }}>
            *Hostel fee (girls only): ₹12,000/year | Mess fee: ₹27,600/year (changeable). Payment via DD/NEFT only. Second-year fees due by 30th September.
          </p>
        </div>
      </section>

      {/* GALLERY SECTION - DYNAMIC */}
      <section style={styles.gallery} className="scroll-reveal">
        <div style={{ ...containerPadding, paddingTop: isMobile ? "40px" : "60px", paddingBottom: isMobile ? "40px" : "60px" }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Gallery</h2>
            <span className="view-all-link" style={styles.viewAllLink}>
              View More <span>→</span>
            </span>
          </div>
          {/* Filter Tabs */}
          <div style={styles.filterTabs}>
            {["All", "Institute", "Lab", "Events"].map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${galleryFilter === filter ? "filter-tab-active" : ""}`}
                style={styles.filterTab(galleryFilter, filter)}
                onClick={() => setGalleryFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          {/* Gallery Grid */}
          {galleryLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading images...</div>
          ) : galleryError ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#dc2626" }}>
              Failed to load gallery. Please try again later.
            </div>
          ) : (
            <div style={styles.galleryGrid}>
              {filteredImages.map((image) => (
                <div key={image._id} className="gallery-card" style={styles.galleryCard}>
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="gallery-img"
                    style={styles.galleryImg}
                    loading="lazy"
                  />
                  <div style={styles.galleryCaption}>{image.title}</div>
                </div>
              ))}
              {filteredImages.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "32px", color: "#64748b" }}>
                  No images found in this category.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ADMISSION SECTION */}
      <section id="admission-section" style={{ margin: isMobile ? "32px 0" : "60px 0" }} className="scroll-reveal">
        <div style={containerPadding}>
          <div style={styles.admission}>
            <div style={styles.admissionBg}></div>
            <div style={admissionInnerLayout}>
              <div style={styles.admissionLeft}>
                <div style={styles.admissionEyebrow}>
                  <span style={{ width: "16px", height: "2px", backgroundColor: "#93c5fd", display: "inline-block" }}></span>
                  Admissions {academicYear} | Last Date: 15th July {currentYear}
                </div>
                <h2 style={styles.admissionTitle}>Begin Your Journey in Healthcare</h2>
                <p style={styles.admissionDesc}>
                  <strong>Eligibility:</strong> 10+2 (PCB) with first attempt, minimum 40% aggregate marks. Age 17+ as of 30th December. 
                  Candidate must be physically and mentally fit. Limited seats – 30 per year. Apply now for merit-based admission.
                </p>
                <p style={{ ...styles.admissionDesc, marginBottom: "14px", fontSize: "12px" }}>
                  <strong>Mode of Application:</strong> Obtain application form and prospectus from institute office on payment of ₹350/- in person 
                  or ₹400/- by Demand Draft in favour of <strong>“St. Joseph’s Paramedical Institute”</strong> payable at Ghaziabad. 
                  You can also download the form below and submit along with DD.
                </p>
                <p style={{ ...styles.admissionDesc, marginBottom: "20px", fontSize: "12px" }}>
                  <strong>Entrance Exam:</strong> Written test conducted in July based on +2 syllabus (English, Science, GK). Shortlisted candidates will be called for personal interview.
                </p>
                <a
                  href={applicationFormPdf}
                  download
                  className="primary-btn"
                  style={{
                    ...styles.btnPrimary,
                    backgroundColor: "#fff",
                    color: "#2563eb",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                    textDecoration: "none",
                    marginBottom: "16px",
                  }}
                >
                  Download Application Form & Prospectus (PDF) →
                </a>
                <p style={{ fontSize: "11px", color: "#cbdffc" }}>
                  <strong>Note:</strong> Fill the form in candidate's own handwriting. Attach all required documents. 
                  Submit before deadline to: <em>St. Joseph’s Paramedical Institute, Mariam Nagar, Meerut Road, Ghaziabad, UP 201003</em>
                </p>
              </div>

              <div style={styles.admissionRight}>
                <div style={styles.admissionProcessTitle}>Admission Process</div>
                <div style={stepsRowLayout}>
                  {admissionSteps.map((s, i) => (
                    <div key={i} style={styles.stepItem}>
                      <div style={styles.stepIconWrap}>
                        {!isMobile && i < admissionSteps.length - 1 && <div style={styles.stepConnector}></div>}
                        <div style={{ position: "relative" }}>
                          <div style={styles.stepIcon}>{s.icon}</div>
                          <div style={styles.stepNum}>{s.num}</div>
                        </div>
                      </div>
                      <div style={styles.stepTitle}>{s.title}</div>
                      <div style={styles.stepDesc}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED SECTION */}
      <section className="scroll-reveal" style={{ margin: isMobile ? "24px 0" : "40px 0" }}>
        <div style={containerPadding}>
          <div style={{ ...styles.admission, background: "radial-gradient(circle at 90% 20%, #1e3a8a, #0f2b6d)" }}>
            <div style={styles.admissionBg}></div>
            <div style={{ padding: isMobile ? "28px 20px" : "56px 56px", position: "relative", zIndex: 2 }}>
              <div style={styles.admissionEyebrow}>
                <span style={{ width: "16px", height: "2px", backgroundColor: "#93c5fd", display: "inline-block" }}></span>
                Required Documents Checklist
              </div>
              <h2 style={styles.admissionTitle}>Documents to be enclosed with Application Form</h2>
              <p style={{ color: "#cbdffc", marginBottom: "28px", fontSize: "13px" }}>
                Filled application form must accompany the following self-attested photocopies. Incomplete applications will be rejected.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "20px" : "28px" }}>
                {/* Column 1 */}
                <div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>a)</span> Mark Sheets & Sanad (Pass Certificate) of High School / Metric and Intermediate or equivalent
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>b)</span> Photocopy of Aadhar Card, Caste Certificate, Residence Certificate & Income Certificate of father
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>c)</span> School Leaving Certificate showing Date of Birth (T.C.)
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>d)</span> Character Certificate from Principal of last attended college
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>e)</span> Character Certificate from Parish Priest (for Christians) / from an unrelated known person (for non-Christians)
                    </li>
                  </ul>
                </div>
                {/* Column 2 */}
                <div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>f)</span> Baptism Certificate (mandatory for Christians)
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>g)</span> Medical Fitness Certificate from a registered medical officer
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>h)</span> Merit Certificates of Extracurricular Activities (if any)
                    </li>
                    <li style={{ marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px", color: "#e0f2fe", fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>i)</span> Recent Passport Size Photographs – 2 copies
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: "28px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
                <a
                  href={applicationFormPdf}
                  download
                  className="primary-btn"
                  style={{
                    ...styles.btnPrimary,
                    backgroundColor: "#fff",
                    color: "#2563eb",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                    textDecoration: "none",
                  }}
                >
                  Download Application Form & Prospectus (PDF) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL'S MESSAGE */}
      <section className="scroll-reveal" style={{ padding: isMobile ? "32px 0 40px" : "40px 0 60px", backgroundColor: "#f9fbfe" }}>
        <div style={containerPadding}>
          <div style={styles.principalMessage}>
            <div style={{ fontSize: isMobile ? "40px" : "48px", marginBottom: "12px" }}>📖</div>
            <h3 style={{ fontSize: isMobile ? "24px" : "28px", fontWeight: "800", marginBottom: "16px", color: "#0f172a" }}>Message from the Principal</h3>
            <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#334155", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic" }}>
              “Welcome to St. Joseph’s Paramedical Institute. We combine medical knowledge with compassion and discipline. 
              Through our DMLT program, students receive strong academics and real-time hospital training. We believe every student 
              has the potential to make a difference in someone’s life.”
            </p>
            <p style={{ fontWeight: "700", color: "#0f172a" }}>— Sr. Neha, Principal</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section style={styles.whyChoose} className="scroll-reveal">
        <div style={{ ...containerPadding, display: "flex", alignItems: "center", gap: isMobile ? "28px" : "40px", flexWrap: "wrap", paddingTop: isMobile ? "40px" : "60px", paddingBottom: isMobile ? "40px" : "60px", flexDirection: isMobile ? "column" : "row" }}>
          <div style={styles.whyLeft}>
            <h2 style={styles.whyTitle}>Why Choose St. Joseph's?</h2>
          </div>
          <div style={whyRightGrid}>
            {whyFeatures.map((f, i) => (
              <div key={i} className="why-feature" style={styles.whyFeature}>
                <div className="why-icon" style={styles.whyIcon}>{f.icon}</div>
                <div style={styles.whyLabel}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP with Contact & Address */}
      <section style={styles.ctaStrip} className="scroll-reveal">
  <div style={ctaStripLayout}>
    <div style={ctaLeftLayout}>
      <div style={styles.ctaIconWrap}>📞</div>
      <div>
        <div style={styles.ctaTitle}>Have Questions? Contact Our Admission Office</div>
        <div style={styles.ctaDesc}>
          📞 +91 95827-39411 | +91 78279-08615 | ✉️ stjosephparamedicalgzb@gmail.com<br />
          🏥 Address: Mariam Nagar, Meerut Road, Ghaziabad, UP 201003
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      <button 
        className="cta-btn" 
        style={styles.ctaBtn} 
        onClick={() => window.location.href = "tel:+919582739411"}
      >
        📞 Call Us →
      </button>
      <button 
        className="cta-btn" 
        style={{ ...styles.ctaBtn, backgroundColor: '#ffffff' }} 
        onClick={() => window.location.href = "mailto:stjosephparamedicalgzb@gmail.com"}
      >
        ✉️ Email Us →
      </button>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}