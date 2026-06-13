import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// Import banner image from assets as requested
import bannerImage from "../assets/hospitalimage/banner10.png";

// ─── Global styles ─────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("hc-contact-styles")) return;
  const s = document.createElement("style");
  s.id = "hc-contact-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeInUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeInLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeInRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
    @keyframes heroGlow    { 0%{opacity:0;transform:scale(0.98) translateY(20px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes borderGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.4)} 50%{box-shadow:0 0 0 8px rgba(37,99,235,0)} }
    @keyframes float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes pulse       { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }

    .hc-nav-link { text-decoration:none; transition:color .2s; position:relative; }
    .hc-nav-link::after { content:''; display:block; height:2px; width:0; background:#2563eb; transition:width .3s; }
    .hc-nav-link:hover::after,.hc-nav-link.active::after { width:100%; }
    .hc-nav-link:hover,.hc-nav-link.active { color:#2563eb !important; }

    .hc-btn-primary:hover  { background:#1d4ed8 !important; transform:translateY(-2px) !important; box-shadow:0 8px 25px rgba(37,99,235,.4) !important; }
    .hc-btn-outline:hover  { background:#2563eb !important; color:#fff !important; transform:translateY(-2px) !important; }

    .hc-input-field { transition:border-color .2s, box-shadow .2s !important; }
    .hc-input-field:focus { outline:none; border-color:#2563eb !important; box-shadow:0 0 0 3px rgba(37,99,235,.1) !important; }

    .hc-contact-card:hover { border-color:#bfdbfe !important; transform:translateY(-3px) !important; box-shadow:0 10px 28px rgba(37,99,235,.1) !important; }
    .hc-hero-info-row:hover { background:rgba(255,255,255,.08) !important; }

    .hc-faq-item { transition:all .3s ease; }
    .hc-faq-item:hover { background:#f8fafc !important; }

    .hc-stat-item:hover .hc-stat-num { color:#93c5fd !important; }

    .google-form-iframe {
      width: 100%;
      min-height: 700px;
      border: none;
      border-radius: 12px;
      transition: all 0.2s;
    }

    /* Responsive overrides - no side gaps on mobile */
    @media (max-width: 1024px) {
      .hc-main-grid   { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hc-map-grid    { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hc-reach-grid  { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
      .google-form-iframe { min-height: 800px; }
      .hero-right-image { display: none !important; }
      .hero-content-wrapper { 
        max-width: 100% !important; 
        text-align: left !important; 
        padding: 40px 24px !important; 
        margin: 0 auto !important; 
      }
      section { padding-left: 16px !important; padding-right: 16px !important; }
      .hc-stats-row { gap: 12px !important; }
    }
    
    @media (max-width: 768px) {
      .hc-nav-links   { display: none !important; }
      .hc-hamburger   { display: flex !important; }
      .hc-hero-title  { font-size: 2rem !important; }
      .hc-stats-row   { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
      .hc-reach-grid  { grid-template-columns: 1fr !important; gap: 16px !important; }
      .google-form-iframe { min-height: 900px; }
      .hero-buttons   { flex-direction: column; align-items: stretch; gap: 12px !important; }
      .hero-buttons button { justify-content: center; width: 100%; }
      .hc-main-grid, .hc-map-grid { gap: 24px !important; }
      .hc-contact-card { padding: 16px !important; }
      .hero-content-wrapper { padding: 32px 20px !important; }
      section { padding-left: 12px !important; padding-right: 12px !important; }
      .stats-band { padding: 32px 12px !important; }
    }
    
    @media (max-width: 640px) {
      .hc-stats-row   { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
      .hero-content-wrapper { padding: 28px 16px !important; }
      section { padding-left: 8px !important; padding-right: 8px !important; }
      .hc-contact-card { padding: 14px !important; }
      .hc-contact-card div[style*="font-size: 14px"] { font-size: 13px !important; }
      .hc-contact-card div[style*="font-size: 13px"] { font-size: 12px !important; }
    }
    
    @media (max-width: 480px) {
      .google-form-iframe { min-height: 1000px; }
      .hero-title { font-size: 1.8rem !important; }
      .btn-primary, .btn-outline { padding: 10px 20px !important; font-size: 13px !important; }
      .hc-stat-num { font-size: 1.5rem !important; }
      .hc-stat-item div[style*="font-size: 13px"] { font-size: 11px !important; }
    }

    /* Ambulance section responsive */
    .ambulance-section {
      background: linear-gradient(90deg, #1a56db, #1e40af);
    }
    @media (max-width: 768px) {
      .ambulance-flex {
        flex-direction: column;
        text-align: center;
        gap: 16px !important;
      }
      .ambulance-numbers {
        justify-content: center;
      }
      .ambulance-call-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `;
  document.head.appendChild(s);
};

// ─── Hooks ─────────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

// ─── Animated wrapper ──────────────────────────────────────────────────────────
const Anim = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, v] = useInView();
  const map = { up: "fadeInUp", left: "fadeInLeft", right: "fadeInRight" };
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, animation: v ? `${map[dir]} .65s ease ${delay}s both` : "none", ...style }}>
      {children}
    </div>
  );
};

// ─── Icon Component ────────────────────────────────────────────────────────────
const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

// ─── Icon paths ────────────────────────────────────────────────────────────────
const IC = {
  cross: "M12 2v20M2 12h20",
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.45 4.36a1 1 0 01-.23 1.02L8.5 11a16 16 0 006.5 6.5l1.94-1.96a1 1 0 011.02-.23l4.36 1.45A1 1 0 0123 17.72V21a2 2 0 01-2 2A18 18 0 013 5z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  arrowR: "M9 5l7 7-7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 18L18 6M6 6l12 12",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  location: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  subject: "M4 6h16M4 10h16M4 14h10",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  headset: "M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
  fax: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-2.761 0-5 4.477-5 10s2.239 10 5 10 5-4.477 5-10-2.239-10-5-10zm-10 10h20",
  chevD: "M19 9l-7 7-7-7",
  chevU: "M5 15l7-7 7 7",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  award: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  steth: "M4.5 6.5a5 5 0 009.5 2.1M4.5 6.5V4a2 2 0 014 0v2.5M9 17a5 5 0 0010 0v-5",
  call24: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .92h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.37a16 16 0 006.72 6.72l1.72-1.34a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
};

// ─── FAQS (questions and answers) ──────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I book an appointment?",
    a: `Booking an appointment is simple. Click on the "Book Appointment" option on our website, fill in the required patient details, select your preferred doctor and available time slot, and submit your request. Before booking, you can view the doctor's consultation schedule and availability on our website to choose a convenient appointment time.

Please Note:
• No online payment is required through the website.
• Consultation fees are paid only at the hospital registration counter during your visit.
• First-time patients are required to pay the doctor's consultation fee plus a one-time registration charge of ₹100.
• If you are visiting our hospital for the first time, you can easily book your appointment yourself through the website.
• If you need any assistance or have questions while booking, our Enquiry Team will be happy to help you. Please contact the hospital reception or enquiry desk for support.`
  },
  {
    q: "What insurance plans do you accept?",
    a: `We are empanelled with 24+ leading Insurance Companies and Third-Party Administrators (TPAs) across India and offer cashless hospitalization facilities for eligible patients, subject to policy terms, conditions, and insurer approval. To avail cashless treatment, patients are required to submit a valid Health Insurance Card, Aadhaar Card, PAN Card, and any additional documents requested by the insurance provider at the time of admission. For insurance verification, pre-authorization, claim-related assistance, and eligibility confirmation, please contact our TPA Help Desk. Our dedicated team will guide you through the process and assist with documentation from admission to discharge.`
  },
  {
    q: "Does St. Joseph's Hospital accept online payments for appointments or hospital services?",
    a: `No. St. Joseph's Hospital, Ghaziabad does not accept any online payments for appointments, consultations, registrations, or hospital services through websites, phone calls, WhatsApp, social media, UPI IDs, QR codes, personal bank accounts, or any unofficial payment links. To protect patients from fraud and scammers, all payments are accepted only at the Hospital Billing Counter against a valid hospital receipt. If anyone requests payment online in the hospital's name, please contact the Hospital Enquiry Desk immediately for verification.`
  },
  {
    q: "How can I access my medical records?",
    a: `You can request your medical records through the Medical Records Department (MRD) by visiting the hospital with a valid ID proof and submitting a request. Our team will assist you in obtaining the required records as per hospital policy.`
  },
  {
    q: "What are your OPD and Visiting Hours?",
    a: `OPD Timings: 8:00 AM – 6:00 PM

ICU Visiting Hours:
• Morning: 10:30 AM – 11:00 AM
• Evening: 6:30 PM – 7:00 PM

Ward Visiting Hours:
• Morning: 10:30 AM – 11:00 AM
• Afternoon: 11:00 AM – 1:00 PM
• Evening: 6:00 PM – 8:00 PM

Visitor Guidelines:
• A maximum of two visitors are allowed to visit a patient at a time.
• All visitors must carry a valid Hospital Gate Pass while visiting.
• If the Gate Pass is lost, a non-refundable penalty of ₹50 will be charged for issuing a duplicate pass.
• Visiting hours and visitor policies may be modified by the hospital based on patient care requirements and infection control guidelines. Please contact the reception for the latest updates.`
  }
];

// ─── Color palette ─────────────────────────────────────────────────────────────
const C = {
  blue: "#2563eb",
  dark: "#0f172a",
  navy: "#0d1f3c",
  gray: "#64748b",
  lgray: "#f8fafc",
  white: "#ffffff",
  border: "#e2e8f0",
};

// ─── Hospital contact data (fully updated) ─────────────────────────────────────
const HOSPITAL = {
  name: "St. Joseph's Hospital",
  phone: "+91 7827-908-598",
  phone2: "+91 7827-908-595",
  landline1: "0120-2871146",
  landline2: "0120-2872246",
  emergency: "+91 7827-908-598",
  emailAdmin: "stjosephgzb@rediffmail.com",
  emailHR: "hr.sjhgzb@gmail.com",
  emailTPA: "sjhospital.tpa@gmail.com",
  address: "Meerut Road, Mariam Nagar, Ghaziabad - 201003",
  // ✅ CORRECTED Google Maps embed URL
  mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14000.963677332855!2d77.413492!3d28.682439!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1dfe7c7fead%3A0x12d59852c4390cad!2sST%20JOSEPH%27S%20HOSPITAL!5e0!3m2!1sen!2sin!4v1740000000000!5m2!1sen!2sin",
  opdTiming: "Monday – Saturday: 8:00 AM – 6:00 PM",
};

// ─── Reach cards (other contact methods) ──────────────────────────────────────
const REACH_CARDS = [
  { icon: IC.location, title: "Visit Us", lines: [HOSPITAL.address] },
  { icon: IC.headset, title: "Emergency Care", lines: ["24/7 Emergency Support", HOSPITAL.emergency] },
  { icon: IC.phone, title: "Call Us", lines: [`Cell: ${HOSPITAL.phone} , ${HOSPITAL.phone2}`, `Landline: ${HOSPITAL.landline1} , ${HOSPITAL.landline2}`] },
  { icon: IC.mail, title: "Email", lines: [`Admin: ${HOSPITAL.emailAdmin}`, `HR: ${HOSPITAL.emailHR}`, `TPA: ${HOSPITAL.emailTPA}`] },
];

// ─── Statistics (valid icons) ─────────────────────────────────────────────────
const STATS = [
  { icon: IC.users, val: "9M+", label: "Happy Patients" },
  { icon: IC.user, val: "50+", label: "Expert Doctors" },
  { icon: IC.award, val: "35+", label: "Years of Excellence" },
  { icon: IC.steth, val: "8+", label: "Medical Specialties" },
  { icon: IC.call24, val: "24/7", label: "Emergency Support" },
];

// ─── Google Form URL (replace with actual public form URL) ─────────────────────
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScA8zm9fcEhj1Z7KmIH_pwNkjq3FpF8Qk0HF3JwJClmOmJyjw/viewform?embedded=true";

// ─── Ambulance numbers (from TPA component) ────────────────────────────────────
const ambulanceNumbers = ["9910878137", "85100075051"];

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function ContactUs() {
  useEffect(() => { injectStyles(); }, []);
  const [openFaq, setOpenFaq] = useState(null);
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
  }, []);

  const btnPrimary = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: C.blue, color: C.white, border: "none", borderRadius: 40,
    padding: "12px 24px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", transition: "all .3s ease", fontFamily: "'Nunito',sans-serif",
  };

  const handleCallAmbulance = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.white, color: C.dark, overflowX: "hidden" }}>
      <Navbar />

      {/* ══ HERO SECTION (Careers page style) ═══════════════════════════════════ */}
      <section style={{ backgroundColor: C.navy, position: "relative", overflow: "hidden", minHeight: "70vh", padding: 0 }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -60, left: 300, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.12) 0%,transparent 70%)" }} />

        {/* Right side banner image */}
        <div className="hero-right-image" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "65%", overflow: "hidden" }}>
          <img src={bannerImage} alt="St. Joseph's Hospital" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.95 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div className="hero-content-wrapper" style={{ maxWidth: 620, padding: "60px 0 80px" }}>
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0, animation: heroAnimated ? "heroGlow 0.9s cubic-bezier(0.2,0.9,0.4,1.1) forwards" : "none" }}>
              {/* Pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee" }}></span>
                Contact Us
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.8rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 }}>
                We're Here to<br />
                <span style={{ color: "#22d3ee" }}>Help You</span>
              </h1>
              <div style={{ width: 70, height: 4, background: "#22d3ee", borderRadius: 2, marginBottom: 28 }} />
              <p style={{ fontSize: "clamp(0.9rem, 4vw, 1.2rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: 16 }}>
                Have questions or need assistance? Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
              </p>
              <div className="hero-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
                <button className="btn-primary" style={btnPrimary} onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
                  Send Message →
                </button>
                <button className="btn-outline" style={{ ...btnPrimary, background: "transparent", border: "2px solid #fff", color: "#fff" }} onClick={() => window.location.href = "/about"}>
                  About Hospital →
                </button>
              </div>

              {/* Contact info rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: IC.phone, label: "Call Us", val: HOSPITAL.phone },
                  { icon: IC.mail, label: "Email (Admin)", val: HOSPITAL.emailAdmin },
                  { icon: IC.calendar, label: "OPD Timings", val: HOSPITAL.opdTiming },
                ].map((item, i) => (
                  <div key={i} className="hc-hero-info-row" style={{
                    display: "inline-flex", alignItems: "center", gap: 16,
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                    borderRadius: 14, padding: "12px 20px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    maxWidth: 400, transition: "background .2s",
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico d={item.icon} size={20} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#cbd5e1" }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT (Google Form + Reach Cards) ════════════════════════════ */}
      <section id="contact-form" style={{ padding: "60px 20px", background: C.lgray }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 8px" }}>
          <div className="hc-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {/* LEFT: Google Form */}
            <Anim dir="left">
              <div style={{ background: C.white, borderRadius: 22, padding: "24px 24px 20px 24px", boxShadow: "0 6px 30px rgba(0,0,0,.06)", border: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: C.dark, marginBottom: 16 }}>Send Us a Message</h2>
                <iframe className="google-form-iframe" src={GOOGLE_FORM_URL} title="Google Form" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe>
                <p style={{ fontSize: 12, color: C.gray, textAlign: "center", marginTop: 16 }}>
                  This form is powered by Google Forms. Your data will be handled according to our privacy policy.
                </p>
              </div>
            </Anim>

            {/* RIGHT: Other Ways to Reach Us */}
            <Anim dir="right" delay={0.1}>
              <div style={{ background: C.white, borderRadius: 22, padding: "36px 36px", boxShadow: "0 6px 30px rgba(0,0,0,.06)", border: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: C.dark, marginBottom: 28 }}>Other Ways to Reach Us</h2>
                <div className="hc-reach-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {REACH_CARDS.map((card, i) => (
                    <div key={i} className="hc-contact-card" style={{ border: `1.5px solid ${C.border}`, borderRadius: 16, padding: "20px", transition: "all .3s ease", cursor: "default" }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${C.blue}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                        <Ico d={card.icon} size={22} color={C.blue} />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: C.dark, marginBottom: 6 }}>{card.title}</div>
                      {card.lines.map((l, j) => <div key={j} style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>{l}</div>)}
                    </div>
                  ))}
                </div>

                {/* OPD Schedule Block */}
                <div style={{ background: "#eff6ff", borderRadius: 18, padding: "20px 24px", marginBottom: 24, border: `1px solid #bfdbfe`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${C.blue}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d={IC.calendar} size={24} color={C.blue} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: "1.1rem", color: C.dark, marginBottom: 4 }}>OPD Timings</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.blue }}>{HOSPITAL.opdTiming}</div>
                    <div style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>Sunday Closed (Emergency services available 24/7)</div>
                  </div>
                </div>

                {/* Emergency CTA */}
                <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#4f46e5 100%)", padding: "28px 28px" }}>
                  <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: C.white, marginBottom: 10 }}>Need Immediate Assistance?</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.7, marginBottom: 20, maxWidth: 300 }}>
                      For life-threatening emergencies, please visit our nearest emergency room or call our 24/7 helpline.
                    </p>
                    <a href={`tel:${HOSPITAL.emergency}`} className="hc-btn-primary" style={{ ...btnPrimary, background: "rgba(255,255,255,.18)", border: "1.5px solid rgba(255,255,255,.35)", backdropFilter: "blur(6px)", animation: "pulse 2.5s ease-in-out infinite", textDecoration: "none" }}>
                      Call Emergency Hotline <Ico d={IC.clock} size={16} color={C.white} />
                    </a>
                  </div>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* ══ NEW: AMBULANCE ASSISTANCE SECTION (from TPA component) ═══════════════ */}
      <section className="ambulance-section" style={{ background: "linear-gradient(90deg,#1a56db,#1e40af)", padding: "32px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 8px" }}>
          <div className="ambulance-flex" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
            {/* Left icon + text */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "1 1 240px" }}>
              <div style={{ fontSize: 42 }}>🚑</div>
              <div style={{ color: "#fff" }}>
                <div style={{ fontWeight: 800, fontSize: "clamp(14px,2vw,18px)" }}>Need Immediate Ambulance Assistance?</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Call us 24/7 for emergency ambulance service</div>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="ambulance-numbers" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", flex: "1 1 auto" }}>
              {ambulanceNumbers.map((number, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>📞</span>
                  <div style={{ color: "#fff" }}>
                    <div style={{ fontWeight: 900, fontSize: "clamp(14px,2vw,20px)", letterSpacing: "0.5px" }}>{number}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>Ambulance Helpline</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call button */}
            <button
              className="ambulance-call-btn"
              onClick={() => handleCallAmbulance(ambulanceNumbers[0])}
              style={{
                background: "#fff",
                color: "#1a56db",
                border: "none",
                borderRadius: 40,
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                flexShrink: 0,
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f9ff";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Call Ambulance Now <Ico d={IC.arrow} size={16} color="#1a56db" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ MAP + FAQ (Ambulance section placed above FAQ as requested) ═══════════ */}
      <section style={{ padding: "60px 20px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 8px" }}>
          <div className="hc-map-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {/* MAP */}
            <Anim dir="left">
              <div style={{ background: C.white, borderRadius: 22, overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,.07)", border: `1px solid ${C.border}` }}>
                <div style={{ padding: "24px 28px 20px" }}>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: C.dark }}>Our Location</h2>
                </div>
                <div style={{ height: 300, background: "#e2e8f0" }}>
                  <iframe
                    title="St. Joseph's Hospital Ghaziabad Location"
                    src={HOSPITAL.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Ico d={IC.location} size={16} color={C.blue} />
                    <span style={{ fontSize: 13, color: C.gray, fontWeight: 600 }}>{HOSPITAL.address}</span>
                  </div>
                  <a href="https://maps.google.com/?q=ST+JOSEPH'S+HOSPITAL+Ghaziabad" target="_blank" rel="noopener noreferrer" className="hc-btn-outline" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s", fontFamily: "'Nunito',sans-serif", whiteSpace: "nowrap", textDecoration: "none" }}>
                    Get Directions <Ico d={IC.arrow} size={13} color={C.blue} />
                  </a>
                </div>
              </div>
            </Anim>

            {/* FAQ */}
            <Anim dir="right" delay={0.1}>
              <div style={{ background: C.white, borderRadius: 22, padding: "32px 32px 28px", boxShadow: "0 6px 30px rgba(0,0,0,.07)", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -10, bottom: 40, fontSize: 180, fontWeight: 900, color: `${C.blue}08`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>?</div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: C.dark, marginBottom: 24 }}>Frequently Asked Questions</h2>
                {FAQS.map((faq, i) => (
                  <div key={i} className="hc-faq-item" style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${C.border}` : "none", borderRadius: openFaq === i ? 10 : 0, overflow: "hidden", transition: "all .3s" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 12px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Nunito',sans-serif", textAlign: "left" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{faq.q}</span>
                      <Ico d={openFaq === i ? IC.chevU : IC.chevD} size={16} color={C.gray} />
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 12px 16px", fontSize: 13, color: C.gray, lineHeight: 1.7, animation: "fadeInUp .3s ease", whiteSpace: "pre-line" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: C.dark }}>Still have questions?</div>
                    <div style={{ fontSize: 13, color: C.gray, marginTop: 3 }}>Our support team is ready to help you.</div>
                  </div>
                  <a href={`mailto:${HOSPITAL.emailAdmin}`} className="hc-btn-outline" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .3s", fontFamily: "'Nunito',sans-serif", whiteSpace: "nowrap", textDecoration: "none" }}>
                    Contact Support <Ico d={IC.arrow} size={13} color={C.blue} />
                  </a>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ══════════════════════════════════════════════════════════ */}
      <section className="stats-band" style={{ background: `linear-gradient(135deg,${C.navy} 0%,#1e3a8a 50%,#1d4ed8 100%)`, padding: "48px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 8px" }}>
          <div className="hc-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {STATS.map((stat, i) => (
              <Anim key={i} delay={i * 0.09}>
                <div className="hc-stat-item" style={{ textAlign: "center", transition: "all .3s" }}>
                  <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <Ico d={stat.icon} size={24} color={C.white} />
                  </div>
                  <div className="hc-stat-num" style={{ fontWeight: 900, fontSize: "1.9rem", color: C.white, lineHeight: 1, transition: "color .3s" }}>{stat.val}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", fontWeight: 600, marginTop: 6 }}>{stat.label}</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}