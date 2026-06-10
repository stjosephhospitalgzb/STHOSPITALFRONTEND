import { useState, useEffect } from "react";
import API from '../api';
import banner6 from "../assets/hospitalimage/banner6.png";

// Import custom department icons
import medicalIcon from "../assets/Icons/gallery/medicalstaff.png";
import nursingIcon from "../assets/Icons/gallery/nurse.png";
import nonMedicalIcon from "../assets/Icons/gallery/nonMedicalstaff.png";
import Footer from "../components/Footer";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const values = [
  { icon: "❤️", title: "Compassion", desc: "We care with empathy and respect." },
  { icon: "🏅", title: "Excellence", desc: "We strive for the highest standards." },
  { icon: "🛡️", title: "Integrity", desc: "We act with honesty and transparency." },
  { icon: "👥", title: "Teamwork", desc: "We achieve more together." },
];

const testimonials = [
  {
    quote: '"HealthCare Hospital has given me the platform to grow, learn, and make a real difference in people\'s lives."',
    name: "Dr. Neha Sharma",
    role: "Cardiologist",
    years: "5 Years with Us",
    avatar: "👩‍⚕️",
  },
  {
    quote: '"The supportive environment and amazing team here make every day fulfilling and inspiring."',
    name: "Rahul Verma",
    role: "Senior Nurse",
    years: "4 Years with Us",
    avatar: "👨‍⚕️",
  },
  {
    quote: '"State-of-the-art facilities and continuous learning opportunities keep me motivated every single day."',
    name: "Dr. Meera Krishnamurthy",
    role: "Oncology Lead",
    years: "7 Years with Us",
    avatar: "👩‍⚕️",
  },
];

const getDepartmentIcon = (department) => {
  switch (department) {
    case "Medical": return medicalIcon;
    case "Nursing": return nursingIcon;
    case "Non-Medical": return nonMedicalIcon;
    default: return medicalIcon;
  }
};

const footerStyles = {
  container: { backgroundColor: "#0f172a", color: "#e2e8f0", marginTop: "40px" },
  inner: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px" },
  brand: { flex: "1", minWidth: "200px" },
  logo: { fontSize: "36px", display: "block", marginBottom: "12px" },
  brandName: { fontSize: "20px", fontWeight: "700", color: "#fff", display: "block" },
  tagline: { fontSize: "13px", color: "#94a3b8", marginTop: "8px" },
  links: { display: "flex", flexWrap: "wrap", gap: "48px" },
  linkGroup: { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" },
  copyright: { textAlign: "center", borderTop: "1px solid #1e293b", padding: "20px 20px", fontSize: "12px", color: "#64748b" },
};

const s = {
  page: { fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#1a1a2e", backgroundColor: "#ffffff", overflowX: "hidden", scrollBehavior: "smooth" },
  heroSection: { background: "#0d1f3c", position: "relative", overflow: "hidden", minHeight: "70vh" },
  heroDeco: { position: "absolute", zIndex: 0, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)" },
  heroRightImage: { position: "absolute", right: 0, top: 0, bottom: 0, width: "65%", overflow: "hidden" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.95 },
  heroImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)" },
  heroContainer: { position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  heroContent: { maxWidth: "620px", padding: "60px 0 80px" },
  heroPill: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 16 },
  heroPillDot: { width: 8, height: 8, borderRadius: "50%", background: "#22d3ee" },
  heroTitle: { fontSize: "clamp(2rem, 8vw, 3.8rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 },
  heroUnderline: { width: 70, height: 4, background: "#22d3ee", borderRadius: 2, marginBottom: 28 },
  heroSubtitle: { fontSize: "clamp(0.9rem, 4vw, 1.2rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: 16 },
  heroDesc: { fontSize: "clamp(0.85rem, 3.5vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 24 },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32, justifyContent: "flex-start" },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", border: "none", borderRadius: 40, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s ease" },
  btnOutline: { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "2px solid #fff", borderRadius: 40, padding: "10px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .3s ease" },
  teamBadge: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  avatarStack: { display: "flex" },
  avatar: { width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginLeft: "-8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  teamText: { fontSize: "13px" },
  teamNum: { fontWeight: "800", color: "#fff" },
  teamLabel: { color: "#cbd5e1" },

  jobsSection: { maxWidth: "1280px", margin: "0 auto", padding: "48px 20px" },
  jobsEyebrow: { fontSize: "11px", fontWeight: "700", color: "#facc15", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" },
  jobsTitle: { fontSize: "clamp(24px, 6vw, 36px)", fontWeight: "800", color: "#0f172a", marginBottom: "20px" },
  jobsSectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "12px" },
  viewAllLink: { display: "flex", alignItems: "center", gap: "6px", color: "#2563eb", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  searchBar: { display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" },
  searchInput: { flex: "2", minWidth: "180px", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "40px", fontSize: "14px", outline: "none" },
  selectInput: { flex: "1", minWidth: "130px", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "40px", fontSize: "14px", color: "#334155", backgroundColor: "#fff" },
  searchBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "40px", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" },

  jobsGrid: { display: "grid", gap: "20px", gridTemplateColumns: "1fr" },
  jobCard: { backgroundColor: "#fff", borderRadius: "20px", border: "1px solid #eef2ff", overflow: "hidden", transition: "all 0.25s", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
  cardHeader: { padding: "16px 20px 12px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" },
  cardIcon: { width: "48px", height: "48px", borderRadius: "16px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" },
  cardBadge: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" },
  categoryBadge: { backgroundColor: "#e0e7ff", color: "#1e40af", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" },
  dateBadge: { fontSize: "11px", color: "#64748b" },
  cardBody: { padding: "16px 20px" },
  jobTitle: { fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" },
  detailItem: { fontSize: "13px", color: "#475569", wordBreak: "break-word" },
  detailLabel: { fontWeight: "600", color: "#0f172a", marginRight: "6px" },
  description: { fontSize: "13px", color: "#64748b", lineHeight: "1.5", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" },
  cardFooter: { padding: "14px 20px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", backgroundColor: "#fafcff", flexWrap: "wrap", gap: "12px" },
  deptType: { fontSize: "12px", color: "#64748b" },
  applyBtn: { backgroundColor: "transparent", color: "#2563eb", border: "2px solid #2563eb", padding: "6px 20px", borderRadius: "40px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" },

  // NEW: Application form two-column layout styles
  applicationSection: { maxWidth: "1280px", margin: "32px auto 0", padding: "32px 20px" },
  appGrid: { display: "grid", gap: "32px", gridTemplateColumns: "1fr 1fr" },
  formCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "28px 24px 24px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", border: "1px solid #eef2ff" },
  infoCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "28px 24px 32px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", border: "1px solid #eef2ff" },
  sectionTitle: { fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "800", color: "#0f172a", marginBottom: "12px" },
  formIframe: { width: "100%", minHeight: "700px", border: "none", borderRadius: "16px" },
  contactCardGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", marginBottom: "24px" },
  contactCard: { border: "1px solid #eef2ff", borderRadius: "20px", padding: "20px", transition: "all 0.25s" },
  contactIconBox: { width: "44px", height: "44px", borderRadius: "14px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", fontSize: "22px" },
  contactTitle: { fontWeight: "800", fontSize: "15px", color: "#0f172a", marginBottom: "8px" },
  contactText: { fontSize: "13px", color: "#475569", lineHeight: "1.5" },
  stepBox: { backgroundColor: "#f8fafc", borderRadius: "18px", padding: "20px", marginTop: "20px" },
  stepTitle: { fontWeight: "800", fontSize: "15px", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" },

  // Values & Testimonials
  bottomSection: { maxWidth: "1280px", margin: "0 auto", padding: "0 20px 60px", display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" },
  valuesBlock: { flex: "1", minWidth: "200px" },
  sectionEyebrow: { fontSize: "11px", fontWeight: "700", color: "#facc15", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  valuesList: { marginTop: "24px", display: "flex", flexDirection: "column", gap: "24px" },
  valueItem: { display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" },
  valueIcon: { width: "48px", height: "48px", borderRadius: "20px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: "0" },
  valueTitle: { fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" },
  valueDesc: { fontSize: "13px", color: "#64748b", lineHeight: "1.4" },
  testimonialsBlock: { flex: "2", minWidth: "240px" },
  testimonialsGrid: { display: "grid", gap: "20px", gridTemplateColumns: "1fr", marginTop: "24px" },
  testimonialCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #eef2ff" },
  testimonialQuote: { fontSize: "14px", color: "#1e293b", lineHeight: "1.6", marginBottom: "20px", fontStyle: "italic" },
  testimonialAuthor: { display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" },
  testimonialAvatar: { width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  testimonialName: { fontSize: "15px", fontWeight: "700", color: "#0f172a" },
  testimonialRole: { fontSize: "13px", color: "#64748b" },
  testimonialYears: { fontSize: "12px", color: "#2563eb", fontWeight: "600", marginTop: "4px" },
};

// Google Form embed URL (using the provided link with embedded=true for cleaner display)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSduGPszjqpKRlPrXf5LiTwVRT4n6Xf7hBY-NJGiJuL9oGqOpA/viewform?embedded=true";

export default function HealthCareCareersPage() {
  const isMobile = useIsMobile();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    setHeroAnimated(true);
    const style = document.createElement("style");
    style.textContent = `
      @keyframes heroGlow {
        0% { opacity: 0; transform: scale(0.98) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      .hero-animate { animation: heroGlow 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards; }
      @media (max-width: 1024px) {
        .careers-hero-right-image { display: none !important; }
        .careers-hero-content-wrapper { max-width: 100% !important; text-align: left !important; padding: 40px 20px !important; margin: 0 auto !important; }
        .careers-hero-buttons { justify-content: center !important; }
        .careers-hero-badge { justify-content: center !important; }
        .careers-hero-underline { margin-left: 0 !important; margin-right: auto !important; }
      }
      @media (max-width: 768px) {
        .application-grid { grid-template-columns: 1fr !important; }
        .contact-card-grid { grid-template-columns: 1fr !important; }
        .jobs-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 640px) {
        .careers-hero-buttons { flex-direction: column; align-items: stretch; gap: 12px; }
        .btn-primary, .btn-outline { justify-content: center; }
        .search-bar { flex-direction: column; }
        .search-btn { width: 100%; }
        .card-header { flex-direction: column; align-items: flex-start; }
        .card-badge { align-items: flex-start; }
        .details-grid { grid-template-columns: 1fr; gap: 8px; }
        .apply-btn { width: 100%; text-align: center; }
        .values-list { align-items: center; }
        .value-item { flex-direction: column; align-items: center; text-align: center; }
        .testimonial-card { text-align: center; }
        .testimonial-author { justify-content: center; }
        .link-group { align-items: center; }
      }
      .btn-primary:hover { background-color: #1d4ed8 !important; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,99,235,.4); }
      .btn-outline:hover { background-color: #2563eb !important; color: #fff !important; transform: translateY(-2px); border-color: #2563eb !important; }
      .job-card:hover { transform: translateY(-4px); box-shadow: 0 20px 30px -12px rgba(0,0,0,0.1); }
      .apply-btn:hover { background-color: #2563eb; color: white; transform: translateY(-2px); }
      .contact-card:hover { transform: translateY(-3px); border-color: #bfdbfe !important; box-shadow: 0 12px 24px rgba(0,0,0,0.05); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Scroll to application form when "Apply Now" is clicked
  const handleApply = () => {
    const formSection = document.getElementById('application-form-section');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
  };

  const departments = ["All Departments", "Medical", "Nursing", "Non-Medical"];
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (job.category && job.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = departmentFilter === "All Departments" || job.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const jobsGridStyle = {
    ...s.jobsGrid,
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))"
  };

  return (
    <div style={s.page}>
      {/* Hero Section */}
      <div style={s.heroSection}>
        <div style={{ ...s.heroDeco, top: -80, left: -80, width: 360, height: 360 }} />
        <div style={{ ...s.heroDeco, bottom: -60, left: 300, width: 200, height: 200 }} />
        <div className="careers-hero-right-image" style={s.heroRightImage}>
          <img src={banner6} alt="Careers at HealthCare Hospital" style={s.heroImage} />
          <div style={s.heroImageOverlay} />
        </div>
        <div style={s.heroContainer}>
          <div className="careers-hero-content-wrapper" style={s.heroContent}>
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0 }}>
              <div style={s.heroPill}>
                <span style={s.heroPillDot}></span>
                Careers that heal
              </div>
              <h1 style={s.heroTitle}>
                Build Your Career.<br />
                Change Lives.
              </h1>
              <div className="careers-hero-underline" style={s.heroUnderline} />
              <p style={s.heroSubtitle}>
                Join a passionate team dedicated to exceptional care, innovation, and a healthier tomorrow — all in a supportive environment that helps you grow.
              </p>
              <div className="careers-hero-buttons" style={s.heroBtns}>
                <button className="btn-primary" style={s.btnPrimary} onClick={() => document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })}>
                  View Open Positions →
                </button>
                <button className="btn-outline" style={s.btnOutline} onClick={() => window.location.href = "/about"}>
                  About Us →
                </button>
              </div>
              <div className="careers-hero-badge" style={s.teamBadge}>
                <div style={s.avatarStack}>
                  {["👩‍⚕️", "👨‍⚕️", "👩‍⚕️", "👨‍⚕️"].map((a, i) => (
                    <div key={i} style={{ ...s.avatar, marginLeft: i === 0 ? "0" : "-8px" }}>{a}</div>
                  ))}
                </div>
                <div style={s.teamText}>
                  <div style={s.teamNum}>1000+</div>
                  <div style={s.teamLabel}>Healthcare Heroes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <section id="jobs" style={s.jobsSection}>
        <div style={s.jobsEyebrow}>Open Positions</div>
        <div style={s.jobsSectionHeader}>
          <h2 style={s.jobsTitle}>Shape the future of medicine</h2>
          <span className="view-all-link" style={s.viewAllLink}>View all opportunities →</span>
        </div>

        <div className="search-bar" style={s.searchBar}>
          <input
            className="search-input"
            style={s.searchInput}
            placeholder="🔍 Search by title, department or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="select-input" style={s.selectInput} value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            {departments.map(dept => <option key={dept}>{dept}</option>)}
          </select>
          <button className="search-btn" style={s.searchBtn}>Find Jobs</button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>No matching positions found. Try adjusting filters.</div>
        ) : (
          <div style={jobsGridStyle}>
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card" style={s.jobCard}>
                <div className="card-header" style={s.cardHeader}>
                  <div style={s.cardIcon}>
                    <img 
                      src={getDepartmentIcon(job.department)} 
                      alt={job.department}
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-badge" style={s.cardBadge}>
                    <span style={s.categoryBadge}>{job.category || "Medical"}</span>
                    <span style={s.dateBadge}>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                </div>
                <div style={s.cardBody}>
                  <h3 style={s.jobTitle}>{job.title}</h3>
                  <div className="details-grid" style={s.detailsGrid}>
                    <div style={s.detailItem}><span style={s.detailLabel}>🎓 Qualification:</span> {job.qualification || "Not specified"}</div>
                    <div style={s.detailItem}><span style={s.detailLabel}>👥 Vacancies:</span> {job.vacancies || 1}</div>
                    <div style={s.detailItem}><span style={s.detailLabel}>⏱️ Experience:</span> {job.experience}</div>
                    <div style={s.detailItem}><span style={s.detailLabel}>📍 Location:</span> {job.location || "Not specified"}</div>
                  </div>
                  {job.description && (
                    <div style={s.description}>
                      <span style={s.detailLabel}>📋 Description:</span> {job.description.substring(0, 120)}...
                    </div>
                  )}
                </div>
                <div className="card-footer" style={s.cardFooter}>
                  <div style={s.deptType}>
                    <div>{job.department}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{job.type}</div>
                  </div>
                  <button className="apply-btn" style={s.applyBtn} onClick={handleApply}>
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEW: Application Section with Embedded Google Form (like ContactUs page) */}
      <section id="application-form-section" style={s.applicationSection}>
        <div className="application-grid" style={s.appGrid}>
          {/* Left column: Google Form iframe */}
          <div style={s.formCard}>
            <h2 style={s.sectionTitle}>📄 Apply for a Position</h2>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
              Fill out the form below to start your application. Our recruitment team will review your details and contact you shortly.
            </p>
            <iframe
              className="google-form-iframe"
              src={GOOGLE_FORM_URL}
              title="Job Application Form"
              style={s.formIframe}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>

          {/* Right column: Contact info and application steps */}
          <div style={s.infoCard}>
            <h2 style={s.sectionTitle}>📋 Application Process</h2>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
              Complete the two-step process to ensure your application is received.
            </p>

            <div className="contact-card-grid" style={s.contactCardGrid}>
              <div className="contact-card" style={s.contactCard}>
                <div style={s.contactIconBox}>📝</div>
                <div style={s.contactTitle}>Step 1: Online Form</div>
                <div style={s.contactText}>Fill out the Google Form on the left with your personal and professional details.</div>
              </div>
              <div className="contact-card" style={s.contactCard}>
                <div style={s.contactIconBox}>✉️</div>
                <div style={s.contactTitle}>Step 2: Send Resume</div>
                <div style={s.contactText}>After submitting the form, email your updated CV to <strong>hr.sjhgzb@gmail.com</strong> with the job title in the subject line.</div>
              </div>
              <div className="contact-card" style={s.contactCard}>
                <div style={s.contactIconBox}>📞</div>
                <div style={s.contactTitle}>Need Help?</div>
                <div style={s.contactText}>Call our HR team at <strong>+91 7827 908 598</strong> (Mon–Sat, 10 AM – 5 PM)</div>
              </div>
              <div className="contact-card" style={s.contactCard}>
                <div style={s.contactIconBox}>💼</div>
                <div style={s.contactTitle}>What Happens Next?</div>
                <div style={s.contactText}>Shortlisted candidates will be contacted for an interview within 7–10 business days.</div>
              </div>
            </div>

            <div style={s.stepBox}>
              <div style={s.stepTitle}>
                <span>📧</span> Resume Submission Details
              </div>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "12px" }}>
                <strong>Email:</strong> <a href="mailto:hr.sjhgzb@gmail.com" style={{ color: "#2563eb", textDecoration: "none" }}>hr.sjhgzb@gmail.com</a><br />
                <strong>WhatsApp/Call:</strong> <a href="tel:+917827908598" style={{ color: "#2563eb", textDecoration: "none" }}>+91 7827 908 598</a>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: "12px", marginTop: "8px" }}>
                ⚠️ Please ensure you complete <strong>both steps</strong> (form + email) for your application to be considered complete.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values + Testimonials */}
      <section style={s.bottomSection}>
        <div style={s.valuesBlock}>
          <div style={s.sectionEyebrow}>Our Values</div>
          <div className="values-list" style={s.valuesList}>
            {values.map((v, i) => (
              <div key={i} className="value-item" style={s.valueItem}>
                <div style={s.valueIcon}>{v.icon}</div>
                <div>
                  <div style={s.valueTitle}>{v.title}</div>
                  <div style={s.valueDesc}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.testimonialsBlock}>
          <div style={s.sectionEyebrow}>What Our Team Says</div>
          <div style={s.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={s.testimonialCard}>
                <div style={s.testimonialQuote}>{t.quote}</div>
                <div style={s.testimonialAuthor}>
                  <div style={s.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <div style={s.testimonialName}>{t.name}</div>
                    <div style={s.testimonialRole}>{t.role}</div>
                    <div style={s.testimonialYears}>{t.years}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}