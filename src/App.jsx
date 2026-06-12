import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import Service from "./Pages/Service";
import About from "./Pages/About.jsx";
import ContactUs from "./Pages/Contactus";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminDoctors from "./components/AdminDoctors";
import AdminGallery from "./components/AdminGallery";
import AdminCareers from "./components/AdminCareers";
import AdminStats from './components/AdminStats';
import AdminNews from './components/AdminNews';
import OurInstitute from "./Pages/Ourinsititue";
import CareersPage from "./Pages/Carrer";
import Gallery from "./Pages/Gallery";
import TpaService from "./Pages/Tpa.jsx";
import Chatbot from "./components/Chatbot";
import ParamedicalGalleryManager from "./components/ParamedicalGalleryManager.jsx";

// Replace with your actual numbers
const AMBULANCE_PHONE = "+919910878137";
const EMERGENCY_PHONE = "+911234567890";

// Ambulance Button (only ambulance icon + text)
const AmbulanceButton = () => {
  return (
    <a
      href={`tel:${AMBULANCE_PHONE}`}
      className="right-action-btn ambulance-btn"
      aria-label="Call Ambulance"
      title="Ambulance"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M8 12h4" />
        <path d="M12 8v4" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M6 18h12" />
        <path d="M18 12h2" />
        <path d="M4 12h2" />
      </svg>
      <span>AMBULANCE</span>
    </a>
  );
};

// Emergency Button (phone icon + text)
const EmergencyButton = () => {
  return (
    <a
      href={`tel:${EMERGENCY_PHONE}`}
      className="right-action-btn emergency-btn"
      aria-label="Emergency Call"
      title="Emergency – Tap to Call"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      <span>EMERGENCY</span>
    </a>
  );
};

// Container for the two buttons (stacked vertically)
const RightSideButtons = () => {
  return (
    <div className="right-buttons-container">
      <AmbulanceButton />
      <EmergencyButton />
    </div>
  );
};

function App() {
  const token = localStorage.getItem('adminToken');

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/admin/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Service />} />
        <Route path="/ourinsitite" element={<OurInstitute />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tpaservices" element={<TpaService />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route index element={<AdminStats />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="paramedical-gallery" element={<ParamedicalGalleryManager />} />

        </Route>
      </Routes>

      <Chatbot />
      <RightSideButtons />

      <style>{`
        /* Container for the two right-side buttons */
        .right-buttons-container {
          position: fixed;
          right: 20px;
          bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1000;
        }

        /* Common button style */
        .right-action-btn {
          background: #dc2626;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(2px);
          white-space: nowrap;
        }
        .right-action-btn:hover {
          transform: scale(1.05);
          background: #b91c1c;
          box-shadow: 0 12px 28px rgba(220, 38, 38, 0.5);
        }
        /* Pulse animation only on the phone icon inside Emergency button */
        .emergency-btn svg {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .right-buttons-container {
            right: 16px;
            bottom: 20px;
            gap: 10px;
          }
          .right-action-btn {
            padding: 8px 14px;
            font-size: 0.75rem;
          }
          .right-action-btn svg {
            width: 20px;
            height: 20px;
          }
        }
        @media (max-width: 480px) {
          .right-buttons-container {
            right: 12px;
            bottom: 16px;
            gap: 8px;
          }
          .right-action-btn span {
            display: none;  /* hide text on very small screens, show only icons */
          }
          .right-action-btn {
            padding: 10px;
            border-radius: 40px;
          }
          .right-action-btn svg {
            width: 22px;
            height: 22px;
          }
        }

        /* Chatbot toggle button (left side) – already present in Chatbot component, 
           but we ensure it doesn't conflict */
        .chatbot-toggle-btn {
          position: fixed;
          left: 20px;
          bottom: 30px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 50px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 1001;
          transition: all 0.2s ease;
          border: 1px solid rgba(255,255,255,0.2);
          overflow: hidden;
        }
        .chatbot-toggle-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .chatbot-toggle-btn:hover {
          background-color: #1d4ed8;
          transform: scale(1.05);
        }
        @media (max-width: 640px) {
          .chatbot-toggle-btn {
            left: 16px;
            bottom: 20px;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </BrowserRouter>
  );
}

export default App;