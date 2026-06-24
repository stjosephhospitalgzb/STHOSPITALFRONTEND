import React, { useState, useEffect, useRef, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api";

// --- IMPORT LOCAL SERVICE ICONS ---
import ambulanceIcon from "../assets/Icons/ambulance.png";
import anesthesiologyIcon from "../assets/Icons/Anesthesiology.png";
import audiometryIcon from "../assets/Icons/audiometry.png";
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
import banner from "../assets/hospitalimage/banner9.png";
import ayurvedaIcon from "../assets/Icons/ayurveda.png";

const defaultServiceIcon = generalWardIcon;

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("hc-services-styles")) return;
  const s = document.createElement("style");
  s.id = "hc-services-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Outfit', sans-serif; font-size: 16px; line-height: 1.5; }
    
    @media (max-width: 768px) {
      body { font-size: 14px; }
      .hc-container { padding: 0 16px; }
      .hc-hero-title { font-size: 2.2rem !important; line-height: 1.3 !important; }
      .hc-section-title { font-size: 1.8rem !important; }
      .hc-stat-num { font-size: 1.8rem !important; }
    }
    @media (max-width: 480px) {
      .hc-hero-title { font-size: 1.8rem !important; }
      .hc-section-title { font-size: 1.5rem !important; }
      .hc-stat-num { font-size: 1.5rem !important; }
    }

    @keyframes fadeInUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeInLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeInRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
    
    .hc-nav-link { text-decoration:none; transition:color .2s; position:relative; }
    .hc-nav-link::after { content:''; display:block; height:2px; width:0; background:#2563eb; transition:width .3s; }
    .hc-nav-link:hover::after,.hc-nav-link.active::after { width:100%; }
    .hc-nav-link:hover,.hc-nav-link.active { color:#2563eb !important; }
    .hc-btn-primary:hover { background:#1d4ed8 !important; transform:translateY(-2px) !important; box-shadow:0 8px 25px rgba(37,99,235,.4) !important; }
    .hc-btn-outline:hover { background:#2563eb !important; color:#fff !important; transform:translateY(-2px) !important; }
    .hc-filter-btn.active { background: #2563eb !important; color: white !important; border-color: #2563eb !important; }
    
    .hc-left-list-item { transition: all 0.2s ease; cursor: pointer; }
    .hc-left-list-item:hover { background: #eff6ff !important; border-color: #bfdbfe !important; transform: translateX(4px); }
    .hc-left-list-item.active { background: #2563eb !important; border-color: #2563eb !important; }
    .hc-left-list-item.active .service-title { color: white !important; }
    .hc-left-list-item.active .service-icon-img { filter: brightness(0) invert(1); }
    
    .hc-detail-img { transition: transform 0.5s ease; }
    .hc-detail-card:hover .hc-detail-img { transform: scale(1.03); }
    
    .hc-container { max-width: 1440px; margin: 0 auto; padding: 0 32px; }
    
    .hc-scrollable-list { max-height: 70vh; overflow-y: auto; padding-right: 8px; }
    .hc-scrollable-list::-webkit-scrollbar { width: 6px; }
    .hc-scrollable-list::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 4px; }
    .hc-scrollable-list::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
    .hc-scrollable-list::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    .hc-gallery-grid { display: none; }
    
    .hc-doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 16px; }
    @media (max-width: 640px) { 
      .hc-doctors-grid { grid-template-columns: 1fr; gap: 16px; } 
    }
    
    @media (max-width: 1024px) {
      .hc-two-columns { flex-direction: column !important; }
      .hc-left-panel { width: 100% !important; margin-bottom: 40px; }
      .hc-right-panel { width: 100% !important; }
    }
    
    @media (max-width: 1024px) {
      .hc-scrollable-list { 
        display: flex !important; 
        flex-direction: row !important; 
        overflow-x: auto !important; 
        overflow-y: hidden !important; 
        gap: 16px !important; 
        padding-bottom: 16px !important; 
        max-height: none !important; 
        -webkit-overflow-scrolling: touch; 
        scrollbar-width: thin;
      }
      .hc-scrollable-list::-webkit-scrollbar { height: 6px; }
      .hc-scrollable-list .hc-left-list-item { 
        flex: 0 0 auto !important; 
        width: 260px !important; 
        min-width: 240px; 
        margin-bottom: 0 !important; 
      }
    }
    
    .hc-feat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
    @media (max-width: 992px) {
      .hc-feat-row { grid-template-columns: repeat(2, 1fr) !important; gap: 16px; }
      .hc-feat-row > div { border-right: none !important; border-bottom: 1px solid #e2e8f0; }
    }
    @media (max-width: 640px) {
      .hc-feat-row { grid-template-columns: 1fr !important; }
    }
    
    .hc-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    @media (max-width: 768px) { 
      .hc-stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 16px; } 
    }
    @media (max-width: 540px) { 
      .hc-stats-row { grid-template-columns: 1fr !important; } 
    }
    
    .hc-choose-grid { display: grid; grid-template-columns: 380px 1fr; gap: 64px; align-items: center; }
    @media (max-width: 1024px) {
      .hc-choose-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
      .hc-choose-grid .hc-choose-left h2 { font-size: 2rem !important; }
      .hc-choose-left .hc-inline-badge { justify-content: center; }
    }
    
    .hc-hero-badges { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; }
    .hc-hero-badge { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); border-radius: 60px; padding: 8px 16px; backdrop-filter: blur(4px); font-size: 13px; font-weight: 600; color: white; }
    @media (max-width: 640px) {
      .hc-hero-badge { font-size: 11px; padding: 6px 12px; }
      .hc-hero-badge svg { width: 18px; height: 18px; }
    }
    
    .hc-filter-group { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-start; margin-bottom: 24px; }
    @media (max-width: 768px) {
      .hc-filter-group { justify-content: center; }
      .hc-filter-group button { padding: 6px 14px !important; font-size: 12px !important; }
    }
    @media (max-width: 480px) {
      .hc-filter-group button { flex: 1 0 auto; text-align: center; min-width: 110px; }
    }
    
    .hc-hero-img {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 60%;
      overflow: hidden;
      display: block;
    }
    @media (max-width: 768px) {
      .hc-hero-img { display: none !important; }
    }
    
    @media (max-width: 768px) {
      .hc-nav-links { display:none !important; }
      .hc-hamburger { display:flex !important; }
      .hc-footer-cols { grid-template-columns:1fr !important; gap:20px !important; }
      .hc-container { padding: 0 20px; }
      .stats-section { padding: 50px 16px !important; }
      .hc-detail-card { border-radius: 20px !important; }
      .hc-detail-card h2 { font-size: 1.5rem !important; }
    }
  `;
  document.head.appendChild(s);
};

// ─── HOOKS ──────────────────────────────────────────────────────────────
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

const useCounter = (target, duration = 1800, start = false) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setN(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return n;
};

const Anim = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, v] = useInView();
  const map = { up:"fadeInUp", left:"fadeInLeft", right:"fadeInRight" };
  return (
    <div ref={ref} style={{ opacity:v?1:0, animation:v?`${map[dir]} .65s ease ${delay}s both`:"none", ...style }}>
      {children}
    </div>
  );
};

const Ico = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
    {Array.isArray(d) ? d.map((p,i)=><path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);

const IC = {
  cross:   "M12 2v20M2 12h20",
  phone:   "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.45 4.36a1 1 0 01-.23 1.02L8.5 11a16 16 0 006.5 6.5l1.94-1.96a1 1 0 011.02-.23l4.36 1.45A1 1 0 0123 17.72V21a2 2 0 01-2 2A18 18 0 013 5z",
  calendar:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  search:  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  arrow:   "M17 8l4 4m0 0l-4 4m4-4H3",
  arrowR:  "M9 5l7 7-7 7",
  menu:    "M4 6h16M4 12h16M4 18h16",
  x:       "M6 18L18 6M6 6l12 12",
  shield:  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  users:   "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  heart:   "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  clock:   "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  bed:     "M3 12v6m18-6v6M3 18h18M3 6h18M7 12V6m10 6V6",
  smile:   "M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z",
  award:   "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

const getLocalServiceIcon = (title) => {
  const iconMap = {
    "General Medicine": generalMedicineIcon,
    "General Surgery": otIcon,
    "Gynecology / Obstetrics": gynecologyIcon,
    "Pediatrics": pediatricsIcon,
    "Pediatric Surgery": otIcon,
    "Anesthesiology": anesthesiologyIcon,
    "Intensive Care Unit": icuIcon,
    "Neonatal ICU": icuIcon,
    "PICU": icuIcon,
    "Medical and Surgical ICU": icuIcon,
    "Pathology": pathologyIcon,
    "X-Ray, ECG, 2D ECHO": radiologyIcon,
    "Ultrasound": ultrasoundIcon,
    "Mammography": mammographyIcon,
    "CT Scan": ctScanIcon,
    "EEG, EMG & NCV": imagingIcon,
    "ENT": entIcon,
    "Orthopedics": orthopedicsIcon,
    "Dental": dentalIcon,
    "Dermatology": dermatologyIcon,
    "Cardiology": cardiologyIcon,
    "Oncology": oncologyIcon,
    "Psychiatry": psychiatryIcon,
    "Uro Surgery": urosurgeryIcon,
    "Laparoscopic Surgery": otIcon,
    "Plastic Surgery": otIcon,
    "Neuro Surgery": neurologyIcon,
    "Nephrology": dialysisIcon,
    "Neurology": neurologyIcon,
    "Dialysis": dialysisIcon,
    "Physiotherapy": physiotherapyIcon,
    "24 Hours Emergency Services": emergencyIcon,
    "Pharmacy – 24 Hours": pharmacyIcon,
    "Billing Services – 24 Hours": canteenIcon,
    "Counseling": psychiatryIcon,
      "Ayurveda": ayurvedaIcon,
    "Audiometry": audiometryIcon,
    "Physiotherapy": physiotherapyIcon, 
  };
  return iconMap[title] || defaultServiceIcon;
};

// ─── SERVICE DATA (unchanged) ──────────────────────────────────────────
const SERVICES = [
  {
    title: "General Medicine",
    images: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&q=80"
    ],
    Overview: `General Medicine focuses on the prevention, diagnosis, and treatment of adult illnesses, ranging from common infections to chronic conditions. Our experienced physicians provide comprehensive and continuous care, ensuring effective disease management and overall well-being.`,
    details: `The Department of General Medicine serves as the backbone of healthcare, providing comprehensive medical care for adult patients. Our experienced physicians specialize in diagnosing and managing a wide spectrum of diseases, including infectious diseases, metabolic disorders, cardiovascular conditions, respiratory illnesses, and lifestyle-related diseases such as diabetes and hypertension.\nWe emphasize a holistic and preventive approach, ensuring early detection, proper diagnosis, and effective long-term management of chronic conditions. Our team coordinates with other specialties for integrated care, ensuring that every patient receives personalized treatment and continuous monitoring.`,
    category: "general",
  },
  {
    title: "General Surgery",
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80"
    ],
    Overview: `General Surgery offers a wide spectrum of surgical treatments using modern and minimally invasive techniques. Our team ensures safe procedures, precision care, and faster recovery, addressing both routine and complex surgical conditions.`,
    details: `The Department of General Surgery offers advanced surgical care for a wide range of conditions, including abdominal disorders, hernias, appendicitis, gallbladder diseases, and soft tissue conditions.\nWith a focus on minimally invasive (laparoscopic) techniques, we aim to reduce pain, minimize hospital stay, and promote faster recovery. Our surgical team follows strict safety protocols, advanced sterilization practices, and patient-centered care to ensure optimal outcomes.\nPre-operative evaluation, surgical precision, and post-operative care are all handled with utmost professionalism and compassion.`,
    category: "general",
  },
  {
    title: "Gynecology / Obstetrics",
    images: [
      "https://images.unsplash.com/photo-1584466977731-b6d6e6c8e2a5?w=600&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80"
    ],
    Overview: `Gynecology & Obstetrics provides complete care for women’s health, including pregnancy, childbirth, and reproductive health. We are committed to ensuring safe motherhood, personalized care, and advanced treatment solutions for women at every stage of life.`,
    details: `The Department of Gynecology & Obstetrics provides comprehensive healthcare for women at every stage of life, from adolescence to menopause and beyond.\nOur obstetric services include antenatal care, safe and painless delivery options, high-risk pregnancy management, and postnatal care, ensuring both mother and baby receive the highest level of attention.\nGynecological services cover menstrual disorders, infertility management, hormonal issues, infections, and minimally invasive surgeries.\nWe are committed to ensuring safe motherhood, reproductive health, and overall wellness, supported by modern technology and compassionate care.`,
    category: "general",
  },
  {
    title: "Pediatrics",
    images: [
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80",
      "https://images.unsplash.com/photo-1584466977731-b6d6e6c8e2a5?w=600&q=80"
    ],
    Overview: `Pediatrics focuses on the health and development of infants, children, and adolescents, offering preventive, diagnostic, and therapeutic care. Our child-friendly approach ensures healthy growth and timely medical attention.`,
    details: `The Pediatrics Department is dedicated to the health, growth, and development of children, from newborns to adolescents.\nOur services include routine check-ups, immunizations, nutritional guidance, developmental assessments, and treatment of acute and chronic illnesses. We create a child-friendly environment that reduces anxiety and ensures comfort.\nOur pediatricians work closely with parents, providing guidance on childcare, preventive health, and early detection of developmental issues, ensuring a healthy future for every child.`,
    category: "general",
  },
  {
    title: "Pediatric Surgery",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"
    ],
    Overview: `Pediatric Surgery specializes in surgical care for infants and children, addressing congenital and acquired conditions. Our team ensures safe, precise, and compassionate surgical care tailored to young patients.`,
    details: `The Pediatric Surgery Department provides specialized surgical care for infants, children, and adolescents, addressing both congenital and acquired conditions.\nProcedures include treatment for birth defects, abdominal conditions, hernias, urological issues, and emergency surgical conditions. Our approach combines precision, safety, and minimal invasiveness, ensuring quicker recovery and reduced discomfort.\nWe prioritize a child-centered approach, with dedicated facilities and trained staff to provide comfort, safety, and specialized care for young patients.`,
    category: "general",
  },
  {
    title: "Anesthesiology",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"
    ],
    Overview: `Anesthesiology plays a vital role in ensuring pain-free and safe surgical procedures. Our specialists provide advanced anesthesia care, pain management, and continuous monitoring throughout the surgical process.`,
    details: `The Department of Anesthesiology plays a critical role in ensuring safe, pain-free, and stress-free surgical experiences.\nOur anesthesiologists provide general, regional, and local anesthesia depending on the procedure and patient condition. They are responsible for continuous monitoring of vital functions before, during, and after surgery.\nAdditionally, the department offers pain management services, critical care support, and emergency response. Patient safety, comfort, and precision are our top priorities.`,
    category: "general",
  },
  {
    title: "Intensive Care Unit",
    images: [
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b21?w=600&q=80",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
    ],
    Overview: `The ICU provides critical care for patients with life-threatening conditions, equipped with advanced monitoring systems and expert medical teams. We ensure round-the-clock supervision and rapid intervention.`,
    details: `The Intensive Care Unit (ICU) is equipped to handle critically ill patients requiring constant monitoring and advanced life support.\nOur ICU is supported by state-of-the-art monitoring systems, ventilators, and highly trained intensivists and nursing staff, ensuring round-the-clock care.\nPatients with severe infections, organ failure, trauma, or post-surgical complications receive immediate and specialized care, with a focus on stabilization and recovery.`,
    category: "general",
  },
  {
    title: "Neonatal ICU",
    images: [
      "https://images.unsplash.com/photo-1584466977731-b6d6e6c8e2a5?w=600&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80"
    ],
    Overview: `The NICU is dedicated to the care of premature and critically ill newborns, offering specialized support with advanced neonatal technology and skilled caregivers to ensure the best possible start to life.`,
    details: `The Neonatal ICU is dedicated to the care of premature, low birth weight, and critically ill newborns.\nEquipped with advanced neonatal technology such as incubators, ventilators, and monitoring systems, our NICU ensures continuous care for vulnerable infants.\nOur neonatal specialists focus on respiratory support, infection control, nutritional management, and developmental care, giving newborns the best possible chance for healthy growth and survival.`,
    category: "general",
  },
  {
    title: "PICU",
    images: [
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b21?w=600&q=80"
    ],
    Overview: `The PICU offers specialized critical care for seriously ill infants and children, with advanced equipment and pediatric expertise to ensure continuous monitoring and comprehensive treatment.`,
    details: `The Pediatric ICU provides intensive care for critically ill infants and children, requiring specialized monitoring and treatment.\nOur PICU is equipped with advanced pediatric life-support systems and managed by a team of pediatric intensivists, nurses, and specialists.\nConditions such as severe infections, respiratory distress, trauma, neurological disorders, and post-operative care are managed with precision and compassion.`,
    category: "general",
  },
  {
    title: "Medical and Surgical ICU",
    images: [
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b21?w=600&q=80"
    ],
    Overview: `The Medical & Surgical ICU provides intensive care for patients recovering from major surgeries or severe medical conditions, ensuring specialized monitoring, multidisciplinary care, and optimal recovery support.`,
    details: `The Medical & Surgical ICU is designed to provide specialized care for patients with serious medical conditions and those recovering from major surgeries.\nThis unit integrates the expertise of multidisciplinary teams, including physicians, surgeons, and intensivists, offering a comprehensive approach to treatment.\nWith advanced equipment and continuous monitoring, we ensure timely intervention, complication management, and smooth recovery, maintaining the highest standards of critical care.`,
    category: "general",
  },
  // Contributory Facilities
  {
    title: "Pathology",
    images: [
      "https://media.istockphoto.com/id/519559505/photo/microscope.jpg?s=612x612&w=0&k=20&c=rAsZn6AYnxz7Zy1XASPTjY5jqRFZ8mj9k5fylazvnP8=",
      "https://www.news-medical.net/images/Article_Images/ImageForArticle_2146_1734704718618352.jpg"
    ],
    Overview: `The Pathology Department provides accurate and timely diagnostic testing services, playing a crucial role in disease detection, monitoring, and treatment planning.`,
    details: `Our Pathology Department is equipped with modern laboratory technology to conduct a wide range of tests including hematology, biochemistry, microbiology, and clinical pathology.\nWe ensure precision, reliability, and quick turnaround time, enabling doctors to make informed clinical decisions. Strict quality control measures are followed to maintain accuracy and consistency in all reports.\nOur team of skilled laboratory professionals is committed to delivering high-quality diagnostic services with patient safety and care as top priorities.`,
    category: "contributory",
  },
  {
    title: "X-Ray, ECG, 2D ECHO",
    images: [
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?w=600&q=80",
      "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?w=600&q=80"
    ],
    Overview: `This unit offers essential diagnostic services including X-ray imaging, heart rhythm analysis (ECG), and cardiac imaging (2D ECHO) to assess and monitor various health conditions.`,
    details: `• X-Ray: Provides quick imaging for detecting fractures, infections, lung conditions, and abnormalities.\n• ECG (Electrocardiogram): Measures the electrical activity of the heart to identify irregular heart rhythms and cardiac issues.\n• 2D ECHO (Echocardiography): A non-invasive ultrasound-based test that evaluates heart structure, function, and blood flow.\nThese services are performed using advanced equipment and expert supervision, ensuring accurate diagnosis and timely care for patients.`,
    category: "contributory",
  },
  {
    title: "Ultrasound",
    images: [
      "https://media.istockphoto.com/id/502384526/photo/ultrasound-exam.jpg?s=612x612&w=0&k=20&c=5_kxOBOd_aJYaY9HVjfHseAao2OimtgL6de-_NqQ2XA=",
      "https://img.freepik.com/free-photo/ultrasound-diagnostic-stomach-abdominal-woman-clinic-closeup-view-doctor-runs-ultrasound-sensor-patient-s-girl-tummy-looks-image-screen-diagnosis-internal-organs_657921-346.jpg"
    ],
    Overview: `Ultrasound is a safe, non-invasive imaging technique used to examine internal organs and monitor a wide range of medical conditions, providing valuable insights for accurate diagnosis and ongoing health evaluation.`,
    details: `Ultrasound uses high-frequency sound waves to generate real-time images of organs such as the liver, kidneys, uterus, and abdomen, helping doctors assess internal structures with clarity. It plays a vital role in pregnancy monitoring, detecting organ abnormalities, and guiding diagnostic and interventional procedures. Our facility ensures clear imaging, expert interpretation by skilled professionals, and maximum patient comfort, making ultrasound a reliable and essential tool for precise and timely diagnosis.`,
    category: "contributory",
  },
  {
    title: "Mammography",
    images: [
      "https://cdn.apollohospitals.com/health-library-prod/2021/04/3D-MAMMOGRAM-scaled.jpg",
      "https://media.istockphoto.com/id/1456761556/photo/senior-woman-having-mammography-scan-at-hospital-with-medical-technician-mammography.jpg?s=612x612&w=0&k=20&c=EwLmMcfeT9G_1IMjRfzkdKdNLClE-0vwsea3OIRK6Bs="
    ],
    Overview: `Mammography is a specialized imaging service used for the early detection and diagnosis of breast diseases, particularly breast cancer.`,
    details: `This low-dose X-ray technique helps identify abnormalities such as lumps, calcifications, and early-stage tumors before symptoms appear.\nRegular screening through mammography significantly improves early detection and treatment outcomes. Our advanced equipment ensures high-resolution imaging with minimal discomfort, while maintaining patient privacy and care.`,
    category: "contributory",
  },
  {
    title: "CT Scan",
    images: [
      "https://maxresolutionimaging.com/wp-content/uploads/2023/11/CT-Scan-Services-in-Richmond-Texas-1024x833.webp",
      "https://bizimages.withfloats.com/actual/6842756f9b1e12091a581dd0.jpg"
    ],
    Overview: `CT Scan provides detailed cross-sectional images of the body, aiding in accurate diagnosis of complex medical conditions.`,
    details: `Using advanced imaging technology, CT scans create detailed views of bones, organs, blood vessels, and soft tissues. It is widely used for:\n• Detecting injuries and internal bleeding\n• Diagnosing tumors and infections\n• Evaluating brain, chest, and abdominal conditions\nOur CT facility ensures fast scanning, precise imaging, and expert evaluation, enabling doctors to deliver effective treatment plans.`,
    category: "contributory",
  },
  {
    title: "EEG, EMG & NCV",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&q=80"
    ],
    Overview: `These advanced diagnostic tests evaluate brain activity, muscle function, and nerve conduction, helping diagnose neurological and muscular disorders.`,
    details: `• EEG (Electroencephalogram): Records brain activity to diagnose conditions such as epilepsy, seizures, and neurological disorders.\n• EMG (Electromyography): Assesses the health of muscles and detects neuromuscular abnormalities.\n• NCV (Nerve Conduction Velocity): Measures how quickly electrical signals move through nerves, helping diagnose nerve damage and neuropathies.\nOur specialized diagnostic setup ensures accurate testing, expert analysis, and patient comfort, supporting effective neurological care.`,
    category: "contributory",
  },
  // Speciality Services
  {
    title: "ENT",
    images: [
      "https://media.istockphoto.com/id/1325611798/photo/hearing-exam-for-elderly-citizen-people-otolaryngologist-doctor-checking-mature-womans-ear.jpg?s=612x612&w=0&k=20&c=pQ5IyYl64kwTCnsBp55cpPAe4fNXPve7avagagTs73A=",
      "https://media.istockphoto.com/id/1414417672/photo/audiometry-and-hearing-aid-diagnosis.jpg?s=612x612&w=0&k=20&c=DQsSXOR_10hf_6BDUo4rRzQ_v7ZRji1E-JmsO-xMHwg="
    ],
    Overview: `The ENT Department at St. Joseph Hospital offers comprehensive care for conditions related to the ear, nose, throat, and associated structures of the head and neck. With advanced diagnostic tools and expert specialists, the department focuses on delivering accurate diagnosis and effective treatment for patients of all age groups.`,
    details: `Our ENT specialists are highly experienced in managing a wide range of conditions, including hearing loss, ear infections, sinusitis, nasal allergies, tonsillitis, and throat disorders. The department also addresses voice-related problems, sleep-related breathing disorders, and infections affecting the upper respiratory tract. Patients benefit from both medical and surgical treatment options, depending on the severity and nature of their condition. With modern facilities and a patient-centric approach, the department ensures timely intervention, improved outcomes, and enhanced quality of life.`,
    category: "speciality",
  },
  {
    title: "Orthopedics",
    images: [
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
      "https://media.istockphoto.com/id/1435001168/photo/a-teen-girl-in-psychotherapy.jpg?s=612x612&w=0&k=20&c=A34KpyRI_m8CQxjfJHW9z-f3aMOY53EljP2zyXqMveM="
    ],
    Overview: `The Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of disorders related to the bones, joints, muscles, and spine. It is dedicated to restoring mobility, relieving pain, and improving overall physical function.`,
    details: `Our orthopedic team provides expert care for a wide range of musculoskeletal conditions, including fractures, joint disorders, arthritis, sports injuries, and spinal problems. Treatment approaches include both non-surgical and surgical methods tailored to the patient’s condition. Emphasis is placed on early diagnosis, pain management, and rehabilitation to ensure long-term recovery. By combining advanced medical techniques with personalized care, the department helps patients regain independence and return to their daily activities with confidence.`,
    category: "speciality",
  },
  {
    title: "Dental",
    images: [
      "https://images.unsplash.com/photo-1588776814546-ec7b9e3cf0b3?w=600&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"
    ],
    Overview: `The Dental Department provides comprehensive oral healthcare services, focusing on maintaining healthy teeth and gums while enhancing overall oral hygiene and aesthetics.`,
    details: `Our dental services cover preventive, restorative, and cosmetic treatments designed to address the needs of patients across all age groups. The department offers routine dental check-ups, cleaning, and treatment for cavities, along with advanced procedures such as root canal therapy, extractions, and dental restorations. Additionally, cosmetic treatments are available to improve the appearance of the smile. The emphasis is on maintaining strict hygiene standards and providing a comfortable, stress-free experience for every patient.`,
    category: "speciality",
  },
  {
    title: "Dermatology",
    images: [
      "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?w=600&q=80",
      "https://www.asterhospitals.in/sites/default/files/styles/webp/public/2024-09/woman-cosmetology-studio-laser-hair-removal%20%281%29.jpg.webp?itok=sMNQCGD5"
    ],
    Overview: `The Dermatology Department specializes in the diagnosis and treatment of skin, hair, and nail conditions, offering comprehensive solutions for both medical and cosmetic concerns.`,
    details: `Our dermatology services address a broad spectrum of conditions including acne, eczema, psoriasis, pigmentation disorders, infections, and hair-related problems. The department utilizes modern diagnostic techniques and treatment methods to deliver effective care. Patients receive individualized treatment plans aimed at improving skin health and overall appearance. With a focus on both clinical excellence and patient comfort, the department ensures long-term results and enhanced self-confidence.`,
    category: "speciality",
  },
 
  {
    title: "Cardiology",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
      "https://www.kolekarhospital.com/wp-content/uploads/2024/08/Cardiologist-in-Chembur.jpg"
    ],
    Overview: `The Cardiology Department offers comprehensive care for heart-related conditions, focusing on early detection, effective treatment, and prevention of cardiovascular diseases.`,
    details: `Our cardiology services include evaluation and management of conditions such as hypertension, coronary artery disease, heart rhythm disorders, and heart failure. Using advanced diagnostic tools, the department ensures accurate assessment of cardiac health. Treatment plans are personalized, focusing on both medical management and lifestyle modifications to improve heart health. The department is committed to providing timely intervention, reducing risk factors, and supporting patients in maintaining a healthy heart.`,
    category: "speciality",
  },
  {
    title: "Oncology",
    images: [
      "https://sttheresashospital.com/assets/img/sth-imgs/Medical-Oncology-Treatment.jpg",
      "https://aayush-hospitals.com/wp-content/uploads/2023/02/Oncology-Cancer-Treatment.png"
    ],
    Overview: `The Oncology Department provides comprehensive care for cancer patients, emphasizing early detection, accurate diagnosis, and effective treatment planning.`,
    details: `Our oncology services are designed to support patients throughout their cancer journey, from screening and diagnosis to treatment and follow-up care. The department adopts a multidisciplinary approach, coordinating with different specialties to deliver personalized care. Emphasis is placed on early detection, timely treatment, and supportive care to improve patient outcomes. With compassion and expertise, the department ensures that patients receive holistic care addressing both physical and emotional needs.`,
    category: "speciality",
  },
  {
    title: "Psychiatry",
    images: [
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
      "https://media.istockphoto.com/id/1389444855/photo/shot-of-an-attractive-young-woman-sitting-and-talking-to-her-psychologist-during-a.jpg?s=612x612&w=0&k=20&c=LpV9HmdD0_Udg4YlttvwoJyLZWJThxXq-IJKeiy3zbs="
    ],
    Overview: `The Psychiatry Department focuses on mental health and emotional well-being, offering professional support for a wide range of psychological and behavioral conditions.`,
    details: `Our psychiatry services address issues such as anxiety, depression, stress, mood disorders, and other mental health conditions. The department provides comprehensive evaluation, diagnosis, and treatment through a combination of therapy, counseling, and medication when required. Patient confidentiality and comfort are prioritized, ensuring a safe space for individuals to express their concerns. The goal is to enhance mental wellness, improve coping mechanisms, and support patients in leading balanced and fulfilling lives.`,
    category: "speciality",
  },
  // Super Speciality Services
  {
    title: "Uro Surgery",
    images: [
      "https://imdsl.co.in/wp-content/uploads/2021/09/treatment-scaled.jpg",
      "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/dialysis"
    ],
    Overview: `Uro Surgery focuses on the diagnosis and treatment of urinary tract and male reproductive system disorders, offering advanced and minimally invasive solutions for effective and long-lasting relief.`,
    details: `The Department of Uro Surgery provides specialized care for conditions affecting the kidneys, ureters, bladder, and prostate. Our experienced urologists manage a wide range of disorders including kidney stones, prostate enlargement, urinary infections, incontinence, and urological cancers.\nWe utilize modern endoscopic and minimally invasive surgical techniques, which ensure precision, reduced pain, shorter hospital stays, and faster recovery. Patient privacy, accurate diagnosis, and personalized treatment plans are at the heart of our care model.`,
    category: "super-speciality",
  },
  {
    title: "Laparoscopic Surgery",
    images: [
      "https://media.istockphoto.com/id/1139851278/photo/group-of-surgeons-in-operating-room.jpg?s=612x612&w=0&k=20&c=JlsjcyUM6bFPwEJxGn5c-JSouhAW1UHDdgwmLTVuDyM=",
      "https://media.istockphoto.com/id/864573868/photo/medical-team-performing-surgical-operation-in-modern-operating-room.jpg?s=612x612&w=0&k=20&c=zXF_9Ras9TchDAEksAbaUzsB3a6ObdUU8gZAAVb93OI="
    ],
    Overview: `Laparoscopic Surgery is a modern surgical technique that uses small incisions and advanced cameras to perform procedures with greater precision, less pain, and quicker recovery.`,
    details: `Also known as minimally invasive surgery, laparoscopic procedures are widely used for gallbladder removal, appendectomy, hernia repair, and gynecological surgeries.\nThe procedure involves inserting a tiny camera (laparoscope) and specialized instruments through small incisions, allowing surgeons to operate with enhanced visibility. Benefits include minimal scarring, reduced blood loss, shorter hospital stays, and quicker return to daily activities.\nOur surgeons are highly trained in advanced laparoscopic techniques, ensuring safe procedures and optimal patient outcomes.`,
    category: "super-speciality",
  },
  {
    title: "Plastic Surgery",
    images: [
      "https://media.istockphoto.com/id/1139851278/photo/group-of-surgeons-in-operating-room.jpg?s=612x612&w=0&k=20&c=JlsjcyUM6bFPwEJxGn5c-JSouhAW1UHDdgwmLTVuDyM=",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80"
    ],
    Overview: `Plastic Surgery combines reconstructive and cosmetic procedures to restore function and improve physical appearance.`,
    details: `The Plastic Surgery Department offers a range of procedures aimed at correcting defects, restoring function, and enhancing aesthetics.\nReconstructive surgeries include treatment of burn injuries, trauma, congenital deformities, and post-cancer reconstruction, while cosmetic procedures address facial and body enhancements.\nOur team ensures natural-looking results, advanced surgical precision, and patient-centric care, maintaining strict safety standards and ethical practices.`,
    category: "super-speciality",
  },
  {
    title: "Neuro Surgery",
    images: [
      "https://media.istockphoto.com/id/1139851278/photo/group-of-surgeons-in-operating-room.jpg?s=612x612&w=0&k=20&c=JlsjcyUM6bFPwEJxGn5c-JSouhAW1UHDdgwmLTVuDyM=",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"
    ],
    Overview: `Neurosurgery specializes in surgical treatment of disorders affecting the brain, spine, and nervous system, providing advanced care for complex neurological conditions.`,
    details: `The Neurosurgery Department manages critical conditions such as brain tumors, head injuries, spinal disorders, stroke complications, and nerve-related conditions.\nWith access to modern surgical technology and expert neurosurgeons, we ensure high precision and improved outcomes in both emergency and planned procedures.\nOur multidisciplinary approach, involving neurologists and ICU specialists, ensures comprehensive care from diagnosis to recovery.`,
    category: "super-speciality",
  },
  {
    title: "Nephrology",
    images: [
      "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/dialysis",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Patient_receiving_dialysis_03.jpg/960px-Patient_receiving_dialysis_03.jpg"
    ],
    Overview: `Nephrology focuses on the diagnosis, prevention, and management of kidney-related diseases, ensuring long-term kidney health.`,
    details: `The Department of Nephrology deals with conditions such as chronic kidney disease, kidney infections, hypertension-related kidney damage, and electrolyte imbalances.\nOur specialists emphasize early detection, lifestyle management, and preventive care, reducing the risk of disease progression.\nIn advanced cases, we provide integrated care including dialysis support and close monitoring, ensuring improved quality of life for patients.`,
    category: "super-speciality",
  },
  {
    title: "Neurology",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&q=80"
    ],
    Overview: `Neurology deals with disorders of the brain, spinal cord, and nervous system, offering comprehensive diagnosis and treatment.`,
    details: `Our Neurology Department treats a wide spectrum of neurological conditions including stroke, epilepsy, migraines, Parkinson’s disease, neuropathies, multiple sclerosis, and nerve disorders.\nUsing advanced diagnostic tools and evidence-based treatments, we focus on accurate diagnosis, early intervention, and long-term management.\nOur goal is to enhance patient functionality, independence, and overall quality of life through personalized care plans.`,
    category: "super-speciality",
  },
  {
    title: "Dialysis",
    images: [
      "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/dialysis",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Patient_receiving_dialysis_03.jpg/960px-Patient_receiving_dialysis_03.jpg"
    ],
    Overview: `Dialysis provides life-saving support for patients with kidney failure, helping to remove waste and excess fluid when kidneys are unable to function properly.`,
    details: `The Dialysis Unit is equipped with modern machines and strict hygiene protocols to deliver safe and effective treatment.\nWe offer regular hemodialysis sessions under expert supervision, ensuring proper filtration of blood and maintenance of body balance.\nOur focus is on patient comfort, safety, and consistent monitoring, helping individuals manage kidney disease and maintain a better quality of life.`,
    category: "super-speciality",
  },
  {
    title: "Physiotherapy",
    images: [
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
      "https://media.istockphoto.com/id/1435001168/photo/a-teen-girl-in-psychotherapy.jpg?s=612x612&w=0&k=20&c=A34KpyRI_m8CQxjfJHW9z-f3aMOY53EljP2zyXqMveM="
    ],
    Overview: `Physiotherapy focuses on rehabilitation, pain relief, and restoration of movement, helping patients regain strength and independence.`,
    details: `The Physiotherapy Department provides treatment for injuries, post-surgical recovery, neurological disorders, musculoskeletal conditions, and chronic pain.\nOur approach combines manual therapy, exercise programs, electrotherapy, and modern rehabilitation techniques to achieve effective recovery.\nEach patient receives a customized therapy plan, ensuring improved mobility, faster healing, and long-term physical wellness.`,
    category: "super-speciality",
  },
  // Emergency & Support
  {
    title: "24 Hours Emergency Services",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIFhoKbG1OCkK8qKJ-AXS4yj_sLvHbciJU_Q&s",
      "https://www.rand.org/content/rand/pubs/commentary/2024/08/bolstering-the-role-of-emergency-departments-as-part/_jcr_content/par/blogpost.crop.888x522.rm.jpeg/1724357198661.jpeg"
    ],
    Overview: `Our 24 Hours Emergency Services ensure immediate medical attention for critical and life-threatening situations, with round-the-clock availability of expert doctors and advanced care facilities.`,
    details: `The Emergency Department is fully equipped to handle medical, surgical, and trauma emergencies at any time of the day or night. Our team of trained emergency physicians, nurses, and support staff ensure rapid response, timely diagnosis, and immediate treatment.\nWe are supported by advanced life-saving equipment, ambulance services, ICU backup, and diagnostic facilities, enabling us to manage critical conditions such as accidents, cardiac emergencies, stroke, severe infections, and acute illnesses.\nOur priority is to provide quick stabilization, accurate assessment, and seamless transfer to specialized care, ensuring the best possible patient outcomes.`,
    category: "emergency",
  },
  {
    title: "Pharmacy – 24 Hours",
    images: [
      "https://media.istockphoto.com/id/1135284188/photo/if-you-need-its-here.jpg?s=612x612&w=0&k=20&c=2yfZHUqTEGW4-5r4Sc4pzWKx0DtubpdbTkX3h_w1AJg=",
      "https://cdn.pixabay.com/photo/2023/09/20/07/36/doctor-8264057_1280.jpg"
    ],
    Overview: `Our 24-hour pharmacy provides uninterrupted access to essential medicines, ensuring convenience and timely treatment for patients at all times.`,
    details: `The hospital pharmacy is fully stocked with a wide range of prescription medicines, life-saving drugs, and healthcare products, available round the clock.\nOur pharmacists ensure accurate dispensing, proper storage, and guidance on medication usage, helping patients understand their prescriptions clearly.\nWith a focus on quality, authenticity, and availability, we ensure that patients and their families have quick and reliable access to medicines, especially during emergencies.`,
    category: "emergency",
  },
  {
    title: "Billing Services – 24 Hours",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d2f?w=600&q=80"
    ],
    Overview: `Our 24-hour billing services ensure smooth, transparent, and hassle-free financial processing, available at any time for patient convenience.`,
    details: `The Billing Department is designed to provide efficient and patient-friendly services, handling admissions, discharge billing, insurance processing, and payment assistance.\nWe ensure clear communication, accurate billing, and transparency in all financial transactions, minimizing confusion and delays.\nAvailable 24/7, our team assists patients and families with queries, insurance coordination, and documentation, ensuring a smooth and stress-free experience.`,
    category: "emergency",
  },
  {
    title: "Counseling",
    images: [
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
      "https://media.istockphoto.com/id/1389444855/photo/shot-of-an-attractive-young-woman-sitting-and-talking-to-her-psychologist-during-a.jpg?s=612x612&w=0&k=20&c=LpV9HmdD0_Udg4YlttvwoJyLZWJThxXq-IJKeiy3zbs="
    ],
    Overview: `Counselling services provide emotional, psychological, and informational support to patients and their families throughout their healthcare journey.`,
    details: `Our Counselling Services focus on helping patients and caregivers cope with illness, stress, and medical decisions, offering guidance during challenging times.\nServices include pre- and post-treatment counselling, mental health support, patient education, and family guidance. Our trained counsellors work closely with medical teams to ensure holistic patient care.\nBy addressing emotional well-being alongside physical health, we aim to improve patient confidence, treatment adherence, and overall recovery experience.`,
    category: "emergency",
  },
  {
  title: "Ayurveda",
  images: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
  ],
  Overview: `Ayurveda is a traditional system of medicine that emphasizes natural healing, balance of body energies, and holistic wellness through herbal treatments, diet, and lifestyle modifications.`,
  details: `The Department of Ayurveda offers authentic Ayurvedic consultations and treatments for a wide range of health conditions. Our approach focuses on restoring the balance of the three doshas (Vata, Pitta, Kapha) using natural herbs, dietary recommendations, Panchakarma therapies, and lifestyle guidance.

We treat chronic ailments such as arthritis, digestive disorders, skin conditions, stress, and lifestyle-related diseases. Our experienced Ayurvedic physicians provide personalized treatment plans based on a thorough assessment of individual constitution and health concerns.

With a focus on prevention and natural healing, our department integrates traditional wisdom with modern diagnostic support to ensure safe and effective outcomes.`,
  category: "speciality",
},
{
  title: "Audiometry",
  images: [
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    "https://images.unsplash.com/photo-1584466977731-b6d6e6c8e2a5?w=600&q=80"
  ],
  Overview: `Audiometry is a specialized diagnostic service that assesses hearing ability and helps identify hearing loss, balance disorders, and ear-related conditions.`,
  details: `Our Audiometry Department provides comprehensive hearing evaluations using advanced equipment and testing techniques. We offer pure-tone audiometry, speech audiometry, and impedance testing to accurately diagnose hearing impairments.

These tests help in identifying the type and degree of hearing loss, guiding appropriate treatment options such as hearing aids, medical management, or surgical intervention. Our audiologists work closely with ENT specialists to provide complete ear and hearing care.

We also offer hearing screening programs and rehabilitation counseling to improve communication and quality of life for individuals with hearing difficulties.`,
  category: "speciality",
},
{
  title: "Physiotherapy",
  images: [
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
    "https://media.istockphoto.com/id/1435001168/photo/a-teen-girl-in-psychotherapy.jpg?s=612x612&w=0&k=20&c=A34KpyRI_m8CQxjfJHW9z-f3aMOY53EljP2zyXqMveM="
  ],
  Overview: `Physiotherapy focuses on rehabilitation, pain relief, and restoration of movement, helping patients regain strength and independence.`,
  details: `The Physiotherapy Department provides treatment for injuries, post-surgical recovery, neurological disorders, musculoskeletal conditions, and chronic pain.

Our approach combines manual therapy, exercise programs, electrotherapy, and modern rehabilitation techniques to achieve effective recovery.

Each patient receives a customized therapy plan, ensuring improved mobility, faster healing, and long-term physical wellness.`,
  category: "speciality",   // You can also keep it as "super-speciality" if you prefer
},
];

const FEATURES = [
  { icon:IC.shield, title:"Advanced Technology",    desc:"State-of-the-art facilities for accurate diagnosis & treatment" },
  { icon:IC.users,  title:"Expert Specialists",      desc:"Highly skilled doctors & healthcare professionals" },
  { icon:IC.heart,  title:"Patient Centered Care",   desc:"Personalized care and support at every step" },
  { icon:IC.clock,  title:"24/7 Availability",       desc:"Round-the-clock emergency & critical care services" },
];

const STATS = [
  { icon:IC.users,  val:50,   suffix:"+",  label:"Expert Doctors"     },
  { icon:IC.bed,    val:100,   suffix:"+",  label:"Hospital Beds"      },
  { icon:IC.smile,  val:50000000, suffix:"+",  label:"Happy Patients"     },
  { icon:IC.award,  val:35,    suffix:"+",  label:"Years of Excellence"},
];

const C = {
  blue:  "#2563eb",
  dark:  "#0f172a",
  navy:  "#0d1f3c",
  gray:  "#64748b",
  lgray: "#f8fafc",
  white: "#ffffff",
  border:"#e2e8f0",
};

const StatCounter = ({ val, suffix, label, icon, inView }) => {
  const n = useCounter(val, 2000, inView);
  return (
    <div style={{ textAlign:"center", padding:"24px 12px", transition:"all .3s" }}>
      <div style={{ width:60, height:60, borderRadius:16, background:`${C.blue}15`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <Ico d={icon} size={26} color={C.blue} />
      </div>
      <div className="hc-stat-num" style={{ fontWeight:900, fontSize:"2.2rem", color:C.dark }}>
        {n >= 1000 ? n.toLocaleString() : n}{suffix}
      </div>
      <div style={{ fontSize:14, color:C.gray, fontWeight:600, marginTop:6 }}>{label}</div>
    </div>
  );
};

// ─── UPDATED DoctorCard with fallback image ──────────────────────────
const DoctorCard = ({ doctor }) => {
  const imgSrc = doctor.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=fff&size=64`;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, padding:"12px", background:C.lgray, borderRadius:"16px", border:`1px solid ${C.border}`, transition:"all 0.2s" }}>
      <img src={imgSrc} alt={doctor.name} style={{ width:64, height:64, borderRadius:"50%", objectFit:"cover", border:`2px solid ${C.blue}` }} />
      <div>
        <div style={{ fontWeight:800, color:C.dark }}>{doctor.name}</div>
        <div style={{ fontSize:13, color:C.blue, fontWeight:600 }}>{doctor.qual || doctor.qualification || "MD"}</div>
        <div style={{ fontSize:12, color:C.gray }}>Exp: {doctor.exp || doctor.experience || "0"} yrs</div>
      </div>
    </div>
  );
};

// ─── Improved department mapping with fallback ─────────────────────────
const serviceToDepartmentMap = {
  "General Medicine": ["General Medicine (Physician)", "General Medicine", "General Medicine (MD)"],
  "General Surgery": ["General Surgery", "General Surgery (MS)"],
  "Gynecology / Obstetrics": ["Gynecology", "Obstetrics & Gynecology"],
  "Pediatrics": ["Pediatrics", "Pediatrics (MD)"],
  "Pediatric Surgery": ["Pediatric Surgery"],
  "Anesthesiology": ["Anesthesiology"],
  "Intensive Care Unit": null,
  "Neonatal ICU": null,
  "PICU": null,
  "Medical and Surgical ICU": null,
  "Pathology": ["Pathology"],
  "X-Ray, ECG, 2D ECHO": ["Radiology", "Radiodiagnosis"],
  "Ultrasound": ["Radiology", "Radiodiagnosis"],
  "Mammography": null,
  "CT Scan": ["Radiology", "Radiodiagnosis"],
  "EEG, EMG & NCV": ["Neurology"],
  "ENT": ["ENT", "Otolaryngology"],
  "Orthopedics": ["Orthopedics", "Orthopaedics"],
  "Dental": ["Dentistry", "Dental Surgery"],
  "Dermatology": ["Dermatology"],
  "Cardiology": ["Cardiology"],
  "Oncology": ["Oncology"],
  "Psychiatry": ["Psychiatry"],
  "Uro Surgery": ["Urology", "Uro Surgery"],
  "Laparoscopic Surgery": ["General Surgery"],
  "Plastic Surgery": ["Plastic Surgery"],
  "Neuro Surgery": ["Neurosurgery", "Neuro Surgery"],
  "Nephrology": ["Nephrology"],
"Neurology": ["Neurology", "Neurology (Neurophysician)"],
  "Dialysis":null,
  "Physiotherapy": null,
  "24 Hours Emergency Services": null,
  "Pharmacy – 24 Hours": null,
  "Billing Services – 24 Hours": null,
  "Counseling": ["Psychiatry"],
    "Ayurveda": ["Ayurveda"],
  "Audiometry": ["Audiometry"],
  "Physiotherapy": ["Physiotherapy"],
};

export default function Services() {
  useEffect(() => { injectStyles(); }, []);

  const [statsRef, statsInView] = useInView(0.3);
  const [filter, setFilter] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get('/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to load doctors", err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  const enhancedServices = useMemo(() => {
    return SERVICES.map(service => {
      const deptNames = serviceToDepartmentMap[service.title];
      let serviceDoctors = [];
      if (deptNames && Array.isArray(deptNames)) {
        serviceDoctors = doctors.filter(doc => 
          deptNames.some(dept => doc.dept && doc.dept.toLowerCase() === dept.toLowerCase())
        );
      }
      return { ...service, doctors: serviceDoctors };
    });
  }, [doctors]);

  const filteredServices = enhancedServices.filter(svc => {
    if (filter === "all") return true;
    return svc.category === filter;
  });

  // ─── FIX: Keep selected service in sync with updated list ──────────
  useEffect(() => {
    if (filteredServices.length > 0) {
      // Try to keep the same service by title, or fallback to first
      const matched = filteredServices.find(s => s.title === selectedService?.title);
      setSelectedService(matched || filteredServices[0]);
    } else {
      setSelectedService(null);
    }
  }, [filter, filteredServices, selectedService?.title]);

  return (
    <div style={{ fontFamily:"'Inter', 'Outfit', sans-serif", background:C.white, color:C.dark, overflowX:"hidden" }}>
      <Navbar />

      {/* Hero Section - fully responsive */}
      <section style={{ background:C.navy, position:"relative", overflow:"hidden", minHeight:"60vh", padding:"40px 0 60px" }}>
        <div style={{ position:"absolute", top:-80, left:-80, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-40, left:200, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)" }} />
        
        <div className="hc-hero-img">
          <img src={banner} alt="Hospital banner" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", opacity:0.9 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, #0d1f3c 20%, transparent 60%)" }} />
        </div>
        
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 20px", position:"relative", zIndex:1 }}>
          <div style={{ padding:"20px 0 20px", maxWidth:620 }}>
            <Anim delay={0}>
              <div style={{ marginBottom:16 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", color:"white", borderRadius:40, padding:"5px 14px", fontSize:12, fontWeight:700, letterSpacing:1 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"#22d3ee" }}></span>
                  Excellence in Healthcare
                </span>
              </div>
              <h1 className="hc-hero-title" style={{ fontSize:"3.5rem", fontWeight:900, color:C.white, lineHeight:1.2, marginBottom:16, letterSpacing:-0.5 }}>
                Our Services
              </h1>
              <div style={{ width:60, height:4, background:"#22d3ee", borderRadius:2, marginBottom:24 }} />
            </Anim>
            <Anim delay={0.1}>
              <p style={{ fontSize:"1rem", lineHeight:1.6, color:"rgba(255,255,255,.9)", marginBottom:12 }}>
                Comprehensive healthcare services designed to meet your needs with compassion, innovation, and excellence.
              </p>
              <p style={{ fontSize:"0.9rem", lineHeight:1.6, color:"rgba(255,255,255,.7)", marginBottom:16 }}>
                From preventive care to advanced surgical interventions, we offer a full spectrum of medical specialties 
                under one roof. Our dedicated team of experts uses cutting-edge technology to ensure the best outcomes for every patient.
              </p>
            </Anim>

            <Anim delay={0.2}>
              <div className="hc-hero-badges">
                <div className="hc-hero-badge">
                  <Ico d={IC.users} size={18} color="#22d3ee" />
                  <span>9M+ Cured Patients</span>
                </div>
                <div className="hc-hero-badge">
                  <Ico d={IC.bed} size={18} color="#22d3ee" />
                  <span>100+ Beds</span>
                </div>
                <div className="hc-hero-badge">
                  <Ico d={IC.clock} size={18} color="#22d3ee" />
                  <span>24/7 Emergency</span>
                </div>
                <div className="hc-hero-badge">
                  <Ico d={IC.award} size={18} color="#22d3ee" />
                  <span>NABH Accredited</span>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* Features grid - responsive */}
      <section style={{ background:C.white, padding:"0 16px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Anim delay={0.05}>
            <div className="hc-feat-row" style={{ display:"grid", gap:0, background:C.white, borderRadius:20, boxShadow:"0 8px 30px rgba(37,99,235,.1)", border:`1px solid ${C.border}`, transform:"translateY(-30px)", overflow:"hidden" }}>
              {FEATURES.map((f,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"20px 16px", borderRight: i<FEATURES.length-1 ? `1px solid ${C.border}` : "none", transition:"all .3s ease", background:C.white }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${C.blue}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico d={f.icon} size={22} color={C.blue} />
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:"0.9rem", color:C.dark, marginBottom:4 }}>{f.title}</div>
                    <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </section>

      {/* Main Services Section - responsive two-column */}
      <section style={{ padding:"20px 16px 60px", maxWidth:1440, margin:"0 auto" }}>
        <div className="hc-two-columns" style={{ display:"flex", gap:32, alignItems:"flex-start" }}>
          
          {/* Left Panel */}
          <div className="hc-left-panel" style={{ width:"32%", flexShrink:0 }}>
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:"1.4rem", fontWeight:800, color:C.dark, marginBottom:12 }}>Departments & Services</h3>
              <div className="hc-filter-group">
                <button onClick={() => setFilter("all")} className={`hc-filter-btn ${filter === "all" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "all" ? C.white : C.dark, backgroundColor:filter === "all" ? C.blue : "transparent" }}>All</button>
                <button onClick={() => setFilter("general")} className={`hc-filter-btn ${filter === "general" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "general" ? C.white : C.dark, backgroundColor:filter === "general" ? C.blue : "transparent" }}>🏥 General</button>
                <button onClick={() => setFilter("contributory")} className={`hc-filter-btn ${filter === "contributory" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "contributory" ? C.white : C.dark, backgroundColor:filter === "contributory" ? C.blue : "transparent" }}>🔬 Contributory</button>
                <button onClick={() => setFilter("speciality")} className={`hc-filter-btn ${filter === "speciality" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "speciality" ? C.white : C.dark, backgroundColor:filter === "speciality" ? C.blue : "transparent" }}>⭐ Specialities</button>
                <button onClick={() => setFilter("super-speciality")} className={`hc-filter-btn ${filter === "super-speciality" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "super-speciality" ? C.white : C.dark, backgroundColor:filter === "super-speciality" ? C.blue : "transparent" }}>🚀 Super</button>
                <button onClick={() => setFilter("emergency")} className={`hc-filter-btn ${filter === "emergency" ? "active" : ""}`} style={{ padding:"6px 16px", borderRadius:40, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", color:filter === "emergency" ? C.white : C.dark, backgroundColor:filter === "emergency" ? C.blue : "transparent" }}>🚨 24/7</button>
              </div>
            </div>

            <div className="hc-scrollable-list">
              {filteredServices.map((svc, idx) => (
                <div key={idx} onClick={() => setSelectedService(svc)} className={`hc-left-list-item ${selectedService?.title === svc.title ? "active" : ""}`} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:16, border:`1px solid ${selectedService?.title === svc.title ? C.blue : C.border}`, background: selectedService?.title === svc.title ? C.blue : C.white, cursor:"pointer", transition:"all 0.25s", boxShadow: selectedService?.title === svc.title ? "0 4px 12px rgba(37,99,235,.2)" : "none", marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background: selectedService?.title === svc.title ? "rgba(255,255,255,0.2)" : `${C.blue}10`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <img src={getLocalServiceIcon(svc.title)} alt={svc.title} className="service-icon-img" style={{ width:24, height:24, objectFit:"contain" }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div className="service-title" style={{ fontWeight:700, fontSize:"0.85rem", color: selectedService?.title === svc.title ? C.white : C.dark }}>{svc.title}</div>
                  </div>
                </div>
              ))}
              {filteredServices.length === 0 && <div style={{ textAlign:"center", padding:30, color:C.gray, background:C.lgray, borderRadius:20 }}>No services match selected filter.</div>}
            </div>
          </div>

          {/* Right Panel - Blue header with white text, justified content */}
          <div className="hc-right-panel" style={{ width:"68%", flexShrink:0 }}>
            {selectedService ? (
              <Anim dir="right" key={selectedService.title}>
                <div className="hc-detail-card" style={{ background:C.white, borderRadius:24, overflow:"hidden", border:`1px solid ${C.border}`, boxShadow:"0 12px 28px -8px rgba(0,0,0,0.1)" }}>
                  {/* Blue header */}
                  <div style={{
                    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap"
                  }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <img
                        src={getLocalServiceIcon(selectedService.title)}
                        alt={selectedService.title}
                        style={{ width: 34, height: 34, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                    <div>
                      {selectedService.category === "emergency" && (
                        <div style={{
                          display: "inline-block",
                          background: "#dc2626",
                          color: "white",
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "3px 12px",
                          borderRadius: 40,
                          letterSpacing: 1,
                          marginBottom: 6
                        }}>
                          🚨 24/7 Emergency
                        </div>
                      )}
                      <h2 style={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        color: "white",
                        letterSpacing: "-0.5px",
                        margin: 0,
                        lineHeight: 1.2
                      }}>
                        {selectedService.title}
                      </h2>
                    </div>
                  </div>

                  <div style={{ padding: "20px 24px 24px" }}>
                    {selectedService.Overview && (
                      <>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.dark, marginBottom: 10, marginTop: 4 }}>Overview</h4>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: C.gray, marginBottom: 20, textAlign: "justify" }}>
                          {selectedService.Overview}
                        </p>
                      </>
                    )}
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.dark, marginBottom: 10 }}>Description</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: C.gray, marginBottom: 20, textAlign: "justify", whiteSpace: "pre-line" }}>
                      {selectedService.details}
                    </p>

                    {/* Doctors Section */}
                    {!loadingDoctors && selectedService.doctors && selectedService.doctors.length > 0 && (
                      <div style={{ marginTop: 28 }}>
                        <h4 style={{ fontWeight: 800, color: C.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                          <Ico d={IC.users} size={16} color={C.blue} /> Our Expert Doctors
                        </h4>
                        <div className="hc-doctors-grid">
                          {selectedService.doctors.map((doctor, idx) => (
                            <DoctorCard key={idx} doctor={doctor} />
                          ))}
                        </div>
                      </div>
                    )}
                    {!loadingDoctors && selectedService.doctors && selectedService.doctors.length === 0 && (
                      <div style={{ marginTop: 28, padding: 16, background: C.lgray, borderRadius: 12, textAlign: "center", color: C.gray }}>
                        <p style={{ margin: 0, fontSize: "0.9rem" }}>
                          No doctors are currently assigned to this department.
                        </p>
                      </div>
                    )}
                    {loadingDoctors && (
                      <div style={{ marginTop: 24, textAlign: "center", color: C.gray }}>Loading doctors...</div>
                    )}
                  </div>
                </div>
              </Anim>
            ) : (
              <div style={{ background: C.lgray, borderRadius: 24, padding: 40, textAlign: "center", border: `1px solid ${C.border}` }}>
                <Ico d={IC.search} size={40} color={C.gray} style={{ marginBottom: 16, opacity: 0.5 }} />
                <h3 style={{ fontSize: "1.4rem", color: C.dark, marginBottom: 8 }}>Select a department</h3>
                <p style={{ color: C.gray, fontSize: "0.85rem" }}>Please choose a service from the left panel to view detailed information.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section - responsive */}
      <section className="stats-section" style={{ background: C.lgray, padding: "60px 16px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="hc-choose-grid">
            <div className="hc-choose-left">
              <Anim dir="left">
                <div className="hc-inline-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, justifyContent: "center" }}>
                  <div style={{ width: 24, height: 2, background: C.blue }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: "uppercase" }}>Why Choose Us?</span>
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: C.dark, lineHeight: 1.2, marginBottom: 10, letterSpacing: -0.5 }}>Exceptional Care<br />You Can Trust</h2>
                <div style={{ width: 50, height: 3, background: C.blue, borderRadius: 2, marginBottom: 20 }} />
                <p style={{ fontSize: "0.85rem", color: C.gray, lineHeight: 1.7, marginBottom: 20, maxWidth: "100%" }}>
                  We are committed to providing exceptional healthcare with a focus on quality, safety, and patient satisfaction.
                </p>
              </Anim>
            </div>
            <div ref={statsRef}>
              <div className="hc-stats-row">
                {STATS.map((s, i) => (
                  <Anim key={i} delay={i * 0.08} dir="right">
                    <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                      <StatCounter val={s.val} suffix={s.suffix} label={s.label} icon={s.icon} inView={statsInView} />
                    </div>
                  </Anim>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}