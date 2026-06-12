import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bannerHero from "../assets/hospitalimage/banner7.png"; // Hero banner image (right-side image)

// Import all insurance logos (24 companies)
import adityaBirlaLogo from "../assets/TPA/Aditya.jpg";
import bharatLogo from "../assets/TPA/Bharat.jpg";
import cholaLogo from "../assets/TPA/CholaMandalam.png";
import familyHealthLogo from "../assets/TPA/FamilyHealth.png";
import generalCentralLogo from "../assets/TPA/Generali Central.jpg";
import goodHealthLogo from "../assets/TPA/GoodHealth.png";
import hdfcLogo from "../assets/TPA/HDFC.png";
import healthIndiaLogo from "../assets/TPA/Health India.jpg";
import iciciLogo from "../assets/TPA/ICICI.png";
import indusIndLogo from "../assets/TPA/IndusInd General Insurance.png";
import magmaLogo from "../assets/TPA/Magma General.jpg";
import manipalCignaLogo from "../assets/TPA/Manipal.png";
import mdIndiaLogo from "../assets/TPA/MDIndia.png";
import medSaveLogo from "../assets/TPA/MEDSave.png";
import naviLogo from "../assets/TPA/Navi.jpg";
import nivaBupaLogo from "../assets/TPA/Niva.png";
import paramountLogo from "../assets/TPA/Paramount.png";
import parkLogo from "../assets/TPA/PARK.png";
import sbiLogo from "../assets/TPA/SBI.jpg";
import starHealthLogo from "../assets/TPA/starhealth.jpg";
import tataAigLogo from "../assets/TPA/Tata AIG.png";
import universalSompoLogo from "../assets/TPA/UniversalSompo.jpg";
import vidalHealthLogo from "../assets/TPA/Vidal.jpg";
import voloLogo from "../assets/TPA/VOLO.png";

// ─────────────────────────────────────────────
// TPA Partners Data (All 24 companies with correct names and descriptions)
// ─────────────────────────────────────────────
const partnersData = [
  {
    id: 1,
    name: "Aditya Birla Health Insurance Co.",
    logo: adityaBirlaLogo,
    bgColor: "#c41e2a",
    textColor: "#fff",
    description: "Comprehensive health plans with wide coverage and smooth claim process.",
    contact: "1800-270-7000",
    website: "https://www.adityabirlacapital.com",
  },
  {
    id: 2,
    name: "Bharat Electronics Ltd. (BEL)",
    logo: bharatLogo,
    bgColor: "#fff",
    textColor: "#0f172a",
    description: "Corporate TPA services for BEL employees.",
    contact: "Hospital TPA Desk",
    website: "https://bel-india.in",
  },
  {
    id: 3,
    name: "Chola MS General Insurance Co.",
    logo: cholaLogo,
    bgColor: "#fff",
    textColor: "#d71920",
    description: "General insurance with cashless health claims.",
    contact: "1800-200-5544",
    website: "https://www.cholamsinsurance.com",
  },
  {
    id: 4,
    name: "Family Health Plan Insurance TPA Ltd. (FHPL)",
    logo: familyHealthLogo,
    bgColor: "#fff",
    textColor: "#2c6e2f",
    description: "Associated Insurance Companies: Future Generali, Universal Sompo, Royal Sundaram, Care Health, Liberty General, Bajaj Allianz, SBI General, Zurich Kotak, Go Digit, Star Health, Aditya Birla.",
    contact: "1800-419-1999",
    website: "https://www.fhpl.net",
  },
  {
    id: 5,
    name: "Generali Central Insurance Co. (Former Future Generali)",
    logo: generalCentralLogo,
    bgColor: "#fff",
    textColor: "#003a6b",
    description: "Health insurance with wide hospital network.",
    contact: "1800-266-8877",
    website: "https://www.generali.co.in",
  },
  {
    id: 6,
    name: "Good Health TPA",
    logo: goodHealthLogo,
    bgColor: "#fff",
    textColor: "#16a34a",
    description: "Only for Corporate Policies.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
  {
    id: 7,
    name: "HDFC Ergo General Insurance Co. Ltd.",
    logo: hdfcLogo,
    bgColor: "#e82c2e",
    textColor: "#fff",
    description: "Joint venture between HDFC Ltd. and ERGO International, fast claim settlements.",
    contact: "1800-266-9977",
    website: "https://www.hdfcergo.com",
  },
  {
    id: 8,
    name: "Health India Insurance TPA Services",
    logo: healthIndiaLogo,
    bgColor: "#fff",
    textColor: "#2563eb",
    description: "TPA services for various insurance providers.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
  {
    id: 9,
    name: "ICICI Lombard General Insurance Co.",
    logo: iciciLogo,
    bgColor: "#fff",
    textColor: "#004b8d",
    description: "One of India's leading general insurance companies.",
    contact: "1800-266-5566",
    website: "https://www.icicilombard.com",
  },
  {
    id: 10,
    name: "IndusInd General Insurance Co. Ltd. (Former Reliance General Insurance)",
    logo: indusIndLogo,
    bgColor: "#fff",
    textColor: "#1f3a93",
    description: "Comprehensive health insurance solutions.",
    contact: "1800-209-0050",
    website: "https://www.indusindinsurance.com",
  },
  {
    id: 11,
    name: "Manipal Cigna Health Insurance Co. Ltd.",
    logo: manipalCignaLogo,
    bgColor: "#fff",
    textColor: "#0057a3",
    description: "Joint venture between Manipal Group and Cigna.",
    contact: "1800-102-4462",
    website: "https://www.manipalcigna.com",
  },
  {
    id: 12,
    name: "Magma General Insurance Ltd.",
    logo: magmaLogo,
    bgColor: "#fff",
    textColor: "#b91c1c",
    description: "TPA Partners: Medi-Assist, MD India, Paramount, FHPL, Raksha, Vidal, Volo, Medsave, Health India, Good Health, Vipul, Safeway, Ericson, Link-K.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
  {
    id: 13,
    name: "MD India",
    logo: mdIndiaLogo,
    bgColor: "#fff",
    textColor: "#ea580c",
    description: "Note: National / Oriental Card not allowed.",
    contact: "Hospital TPA Desk",
    website: "https://www.mdindia.com",
  },
  {
    id: 14,
    name: "Med-Save Health Insurance TPA Pvt. Ltd.",
    logo: medSaveLogo,
    bgColor: "#fff",
    textColor: "#0891b2",
    description: "Only for Corporate. Note: Oriental, United, National Card not allowed.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
  {
    id: 15,
    name: "Navi General Insurance Co. Ltd.",
    logo: naviLogo,
    bgColor: "#fff",
    textColor: "#4f46e5",
    description: "Digital-first health insurance provider.",
    contact: "1800-120-1111",
    website: "https://www.navi.com",
  },
  {
    id: 16,
    name: "Niva Bupa Health Insurance Co. Ltd.",
    logo: nivaBupaLogo,
    bgColor: "#fff",
    textColor: "#f59e0b",
    description: "Joint venture between Bupa and Fettle Tone, known for transparent claim process.",
    contact: "1800-200-2448",
    website: "https://www.nivabupa.com",
  },
  {
    id: 17,
    name: "Paramount Health Services & TPA Pvt. Ltd.",
    logo: paramountLogo,
    bgColor: "#fff",
    textColor: "#7e22ce",
    description: "Note: Oriental, United, National Card not allowed.",
    contact: "Hospital TPA Desk",
    website: "https://www.paramounttpa.com",
  },
  {
    id: 18,
    name: "Park Mediclaim TPA Pvt. Ltd.",
    logo: parkLogo,
    bgColor: "#fff",
    textColor: "#b45309",
    description: "Note: Oriental, United, National, New India Card not allowed.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
  {
    id: 19,
    name: "SBI General Insurance Co. Ltd.",
    logo: sbiLogo,
    bgColor: "#fff",
    textColor: "#1d4ed8",
    description: "Health insurance with extensive network.",
    contact: "1800-102-1111",
    website: "https://www.sbigeneral.in",
  },
  {
    id: 20,
    name: "Star Health & Allied Insurance Co. Ltd.",
    logo: starHealthLogo,
    bgColor: "#fff",
    textColor: "#1a56db",
    description: "India's leading standalone health insurance provider.",
    contact: "1800-425-2255",
    website: "https://www.starhealth.in",
  },
  {
    id: 21,
    name: "Tata AIG General Insurance Co. Ltd.",
    logo: tataAigLogo,
    bgColor: "#fff",
    textColor: "#d42026",
    description: "Trusted health insurance with cashless facilities.",
    contact: "1800-266-7780",
    website: "https://www.tataaig.com",
  },
  {
    id: 22,
    name: "Universal Sompo General Insurance Co. Ltd.",
    logo: universalSompoLogo,
    bgColor: "#fff",
    textColor: "#0284c7",
    description: "Joint venture between Indian banks and Sompo Japan.",
    contact: "1800-102-8877",
    website: "https://www.universalsompo.com",
  },
  {
    id: 23,
    name: "Vidal Health Insurance TPA Pvt. Ltd.",
    logo: vidalHealthLogo,
    bgColor: "#fff",
    textColor: "#0d9488",
    description: "Associated Insurance Companies: Aditya Birla, Bajaj, Care, CholaMS, Zuno, Generali Central, GoDigit, HDFC, ICICI, Iffco Tokio, Liberty, Manipal Cigna, Magma, Navi, Niva, Reliance, Royal Sundaram, SBI General, Tata AIG, New India, National, United, Universal, Star, Life Insurance, Raheja QBE, Zurich Kotak.",
    contact: "Hospital TPA Desk",
    website: "https://www.vidalhealth.com",
  },
  {
    id: 24,
    name: "Volo Health Insurance PPA Pvt. Ltd. (Former East West Insurance)",
    logo: voloLogo,
    bgColor: "#fff",
    textColor: "#4338ca",
    description: "TPA services for various insurers.",
    contact: "Hospital TPA Desk",
    website: "#",
  },
];

// ─────────────────────────────────────────────
// TPA Partners Modal Component
// ─────────────────────────────────────────────
function PartnersModal({ isOpen, onClose, partners }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          maxWidth: "1000px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "24px",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            zIndex: 1,
          }}
        >
          ✕
        </button>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", color: "#1a56db" }}>
          All TPA Partners
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
          We are empanelled with {partners.length} leading TPAs across India
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "16px",
                background: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "contain",
                    background: partner.bgColor === "#fff" ? "#f8fafc" : partner.bgColor,
                    padding: "6px",
                    borderRadius: "10px",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/55x55?text=Logo";
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: partner.textColor, lineHeight: 1.3, margin: 0 }}>
                    {partner.name}
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: 1.5, marginBottom: "10px" }}>
                {partner.description.length > 120 ? partner.description.substring(0, 120) + "..." : partner.description}
              </p>
              <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px" }}>
                📞 {partner.contact}
              </div>
              {partner.website !== "#" && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "11px",
                    color: "#1a56db",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Visit Website →
                </a>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
          <button
            onClick={onClose}
            style={{
              background: "#1a56db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Helper SVG Icon
// ─────────────────────────────────────────────
const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const IC = {
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
};

// ─────────────────────────────────────────────
// Main TPA Service Page
// ─────────────────────────────────────────────
export default function TpaService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
    // Add keyframe animation and responsive CSS for mobile
    const style = document.createElement("style");
    style.textContent = `
      @keyframes heroGlow {
        0% { opacity: 0; transform: scale(0.98) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      .hero-animate {
        animation: heroGlow 0.9s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
      }
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .partner-marquee-track {
        animation: scrollLeft 40s linear infinite;
      }
      .partner-marquee-track:hover {
        animation-play-state: paused;
      }
      
      /* Mobile responsive fix for hero banner - LEFT ALIGNMENT */
      @media (max-width: 1024px) {
        .tpa-hero-right-image {
          display: none !important;
        }
        .tpa-hero-text-wrapper {
          max-width: 100% !important;
          text-align: left !important;
          padding: 40px 24px !important;
          margin: 0 !important;
        }
        .tpa-hero-buttons {
          justify-content: flex-start !important;
        }
        .tpa-trust-badge {
          justify-content: flex-start !important;
        }
        .tpa-hero-underline {
          margin-left: 0 !important;
          margin-right: auto !important;
        }
      }
      
      @media (max-width: 768px) {
        .step-arrow { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const features = [
    { icon: "🏥", title: "Cashless Treatment", desc: "Hassle-free admissions" },
    { icon: "⚡", title: "Quick Approvals", desc: "Faster claim processing" },
    { icon: "🌐", title: "Wide Network", desc: "Empanelled with top TPAs" },
    { icon: "📄", title: "Transparent Process", desc: "Clear & easy documentation" },
  ];

  const steps = [
    { icon: "🆔", title: "Submit Documents", desc: "Submit your Insurance Card & ID Proof (Aadhar & PAN Card) in TPA Department after admission." },
    { icon: "🏥", title: "TPA Formalities", desc: "TPA Department will complete the remaining formalities." },
    { icon: "⚠️", title: "Insurance Denial", desc: "If your Insurance Company denies paying the amount, patient will make full & final payments." },
    { icon: "🧪", title: "Non-Payable Charges", desc: "Patient must pay Test/Investigation charges not payable by TPA." },
  ];

  const whyChoose = [
    { icon: "👨‍💼", title: "Expert Assistance", desc: "Dedicated TPA team to assist you at every step." },
    { icon: "🛡️", title: "Maximum Coverage", desc: "Wide network of TPAs and insurance partners." },
    { icon: "⏱️", title: "Quick Turnaround", desc: "Faster approvals and claim settlements." },
    { icon: "📱", title: "Paperless Process", desc: "Minimal documentation, maximum convenience." },
  ];

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 2,
  };

  const handleBookAppointment = () => {
    window.location.href = "/appointment";
  };

  const handleExploreServices = () => {
    window.location.href = "/services";
  };

  // Ambulance contact numbers
  const ambulanceNumbers = ["9910878137", "85100075051"];

  const handleCallAmbulance = (number) => {
    window.location.href = `tel:${number}`;
  };

  // Images for trust badge (first three URLs provided)
  const trustImages = [
    "https://t4.ftcdn.net/jpg/06/13/28/69/360_F_613286945_BJ7rUxmhftMxfNtyyfnwDwuD2CxK8YQM.jpg",
    "https://thumbs.dreamstime.com/b/face-young-happy-indian-businesswoman-smiling-face-young-happy-indian-businesswoman-smiling-isolated-against-white-128979240.jpg",
    "https://media.istockphoto.com/id/2160830783/photo/positive-handsome-young-indian-man-head-shot-front-portrait.jpg?s=612x612&w=0&k=20&c=q8jNuQWO35W2-7luXuLdWGP2KKwKpdEUiVICJDjjku8="
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#1a1a2e", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO SECTION with mobile responsive fix (LEFT ALIGNMENT) ── */}
      <div style={{ background: "#0d1f3c", position: "relative", overflow: "hidden", minHeight: "70vh" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -60, left: 300, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)", zIndex: 0 }} />

        {/* Right-side image (hidden on mobile via CSS class) */}
        <div className="tpa-hero-right-image" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "65%", overflow: "hidden" }}>
          <img src={bannerHero} alt="TPA Services" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.95 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0d1f3c 15%, transparent 55%)" }} />
        </div>

        {/* Left text content - responsive wrapper with LEFT alignment on mobile */}
        <div style={containerStyle}>
          <div className="tpa-hero-text-wrapper" style={{ position: "relative", zIndex: 2, maxWidth: "620px", padding: "60px 0 80px" }}>
            <div className={heroAnimated ? "hero-animate" : ""} style={{ opacity: heroAnimated ? 1 : 0 }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee" }}></span>
                  SEAMLESS. TRANSPARENT. TRUSTED.
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 }}>
                TPA Services
              </h1>
              <div style={{ width: 70, height: 4, background: "#22d3ee", borderRadius: 2, marginBottom: 28, marginLeft: "auto", marginRight: "auto" }} className="tpa-hero-underline" />
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16 }}>
                Simplified Healthcare
              </p>
              <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
                Cashless treatment, quick approvals, and end-to-end assistance with all leading TPAs.
                We make your healthcare journey hassle-free.
              </p>
              <div className="tpa-hero-buttons" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 28px",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all .3s ease",
                  }}
                  onClick={() => window.location.href = 'http://103.47.16.55/Online_HIS/design/patientportal/onlinebooking.aspx'}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
                >
                  Book Appointment <Ico d={IC.arrow} size={18} color="#fff" />
                </button>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    color: "#fff",
                    border: "2px solid #fff",
                    borderRadius: 10,
                    padding: "12px 26px",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all .3s ease",
                  }}
                  onClick={handleExploreServices}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.borderColor = "#2563eb"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#fff"; }}
                >
                  Explore Services <Ico d={IC.arrow} size={18} color="#fff" />
                </button>
              </div>
              {/* Trust badge - now with actual images */}
              <div className="tpa-trust-badge" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex" }}>
                  {trustImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #1e3a5f, #1a56db)",
                        border: "2px solid #fff",
                        marginLeft: i > 0 ? -10 : 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`trusted patient ${i+1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>50,000+</div>
                  <div style={{ fontSize: 12, color: "#e2e8f0" }}>Patients Trust Us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES BAR ── */}
      <section style={{ background: "#fff", padding: "30px 0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={containerStyle}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-around" }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", flex: "1 1 160px", minWidth: 160, borderRight: i < features.length - 1 ? "1px solid #e5e7eb" : "none", borderBottom: window.innerWidth < 768 ? "1px solid #e5e7eb" : "none" }}>
                <div style={{ width: 40, height: 40, background: "#eff6ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                <div><div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{f.title}</div><div style={{ fontSize: 11, color: "#6b7280" }}>{f.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TPA PARTNERS (auto-scrolling left to right) ── */}
      <section style={{ padding: "50px 0", background: "#f8faff" }}>
        <div style={containerStyle}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 30 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a56db", letterSpacing: 2, marginBottom: 6 }}>OUR TPA PARTNERS</div>
              <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, margin: 0, lineHeight: 1.2 }}>Empanelled With<br />{partnersData.length} Leading TPAs</h2>
            </div>
            <div style={{ maxWidth: 320 }}>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 12 }}>
                We are partnered with India's leading TPAs to ensure you get the best care with cashless and smooth claim settlements.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{ background: "transparent", color: "#1a56db", border: "2px solid #1a56db", borderRadius: 8, padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                View All {partnersData.length} Partners →
              </button>
            </div>
          </div>

          {/* Auto-scrolling marquee left to right - showing all 24 companies */}
          <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <div className="partner-marquee-track" style={{ display: 'flex', width: 'max-content' }}>
              {[...partnersData, ...partnersData].map((partner, idx) => (
                <div
                  key={`${partner.id}-${idx}`}
                  style={{
                    flex: '0 0 auto',
                    marginRight: '20px',
                    background: partner.bgColor,
                    borderRadius: '14px',
                    padding: '6px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70px',
                    minWidth: '130px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                      maxHeight: '45px',
                      maxWidth: '110px',
                      objectFit: 'contain',
                      filter: partner.bgColor !== '#fff' ? 'brightness(0) invert(1)' : 'none'
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/110x45?text=Logo";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "50px 0", background: "#fff" }}>
        <div style={containerStyle}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a56db", letterSpacing: 2, marginBottom: 6 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 900, margin: 0 }}>Simple Steps for Cashless Treatment</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center", gap: 0 }}>
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ textAlign: "center", flex: "1 1 140px", maxWidth: 200, padding: "12px 10px" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "2px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 22 }}>{step.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ alignSelf: "flex-start", paddingTop: 20, fontSize: 18, color: "#93c5fd", flexShrink: 0 }} className="step-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: "24px", padding: "12px", background: "#fee2e2", borderRadius: "10px", borderLeft: "4px solid #dc2626", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "#991b1b" }}>
              Note: In case of denial, St. Joseph's Hospital Ghaziabad won't be responsible for anything.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "50px 0", background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#1a56db 100%)", color: "#fff" }}>
        <div style={containerStyle}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, alignItems: "center", justifyContent: "center" }}>
            <div style={{ flex: "1 1 280px", maxWidth: 380 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93c5fd", letterSpacing: 2, marginBottom: 10 }}>WHY CHOOSE US</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 14 }}>Your Health,<br />Our Priority</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24 }}>We ensure a smooth and stress-free experience so you can focus on what matters most — your recovery.</p>
              <button style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "10px 22px", fontSize: 12, fontWeight: 700, cursor: "pointer", backdropFilter: "blur(8px)" }}>Know More →</button>
            </div>
            <div style={{ flex: "1 1 260px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {whyChoose.map((w, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 16px", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{w.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (AMBULANCE ASSISTANCE) ── */}
      <section style={{ background: "linear-gradient(90deg,#1a56db,#1e40af)", padding: "28px 0" }}>
        <div style={containerStyle}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "1 1 240px" }}>
              <div style={{ fontSize: 42 }}>🚑</div>
              <div style={{ color: "#fff" }}>
                <div style={{ fontWeight: 800, fontSize: "clamp(14px,2vw,18px)" }}>Need Immediate Ambulance Assistance?</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
                  Call us 24/7 for emergency ambulance service
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", flex: "1 1 auto" }}>
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
            <button
              onClick={() => handleCallAmbulance(ambulanceNumbers[0])}
              style={{
                background: "#fff",
                color: "#1a56db",
                border: "none",
                borderRadius: 10,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                flexShrink: 0,
                transition: "all 0.2s ease"
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
              Call Ambulance Now →
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <PartnersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} partners={partnersData} />
    </div>
  );
}